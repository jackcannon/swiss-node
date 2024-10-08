import { ObjOfType, getDeferred } from 'swiss-ak';
import { ask } from '../../ask';
import { KeyListener, getKeyListener } from '../../keyListener';
import { Breadcrumb, LineCounter, ansi, out } from '../../out';
import { getErrorInfoFromValidationResult } from '../errorValidation';
import { getAskOptions, getAskOptionsForState } from './customise';
import { PromptChoiceFull, getFullChoices } from './getFullChoices';
import { getScrolledItems } from './getScrolledItems';

const getPrinter = <V extends unknown, I extends unknown, O extends unknown>(
  question: string,
  baseOptions: AskItemisedInputOptionsBase<V, I, O>,
  valueOptions?: AskItemisedInputOptionsValues<V, I, O>,
  itemsOptions?: AskItemisedInputOptionsItems<V, I, O>
): ((
  value: string | undefined,
  itemsData: AskItemData<I> | undefined,
  cursorOffset: number,
  errorMessage: string | undefined,
  isComplete: boolean,
  isExit: boolean
) => void) => {
  let lastPrint = '';
  let lastScrollIndex: number | undefined = undefined;

  const askOptions = getAskOptions();

  // Won't change after initialisation, so pre-calculate
  const themes = {
    normal: getAskOptionsForState(false, false),
    error: getAskOptionsForState(false, true),
    done: getAskOptionsForState(true, false)
  };

  // 'reset' the cursor saved position
  process.stdout.write(ansi.cursor.save + ansi.cursor.restore + ansi.cursor.setShow(baseOptions.showCursor));

  const getOutputString = (
    isComplete: boolean,
    value: string | undefined,
    itemsData: AskItemData<I> | undefined,
    errorMessage: string | undefined,
    isExit: boolean
  ): string => {
    const theme = isComplete ? themes.done : errorMessage !== undefined ? themes.error : themes.normal;

    let itemsText: string | undefined = undefined;
    if (itemsOptions && itemsData) {
      let { items, hovered, selected } = itemsData;

      const scrolledItems = getScrolledItems(items, hovered, lastScrollIndex, askOptions.general.maxItemsOnScreen, askOptions.general.scrollMargin);
      itemsText = askOptions.formatters.formatItems(items, scrolledItems, selected, itemsOptions.selectType, theme, isExit);
      lastScrollIndex = scrolledItems.startingIndex;
    }
    return out.wrap(
      askOptions.formatters.formatPrompt(question, (value ?? ansi.null) + ansi.cursor.save, itemsText, errorMessage, theme, isComplete, isExit)
    );
  };

  const print = async (
    value: string | undefined,
    itemsData: AskItemData<I> | undefined,
    cursorOffset: number,
    errorMessage: string | undefined,
    isComplete: boolean,
    isExit: boolean = false
  ) => {
    const lastPrintLines = lastPrint.split('\n');
    const numLinesLastPrint = lastPrintLines.length;

    const lastPrintHasSave = lastPrint.includes(ansi.cursor.save);
    const numLinesAfter = lastPrintHasSave ? (lastPrint.split(ansi.cursor.save)[1] || '').split('\n').length : 1;

    const output = getOutputString(isComplete, value, itemsData, errorMessage, isExit);
    const outputLines = output.split('\n');
    const numLinesOutput = outputLines.length;
    const outputHasSave = output.includes(ansi.cursor.save);

    let writeOutput = '';

    // return to the end of last print
    writeOutput += ansi.cursor.down(numLinesAfter - 1);

    // 'erase' previous print
    if (numLinesLastPrint > numLinesOutput) {
      writeOutput += ansi.erase.lines(numLinesLastPrint - numLinesOutput) + ansi.cursor.up(numLinesOutput - 1);
    } else {
      writeOutput += ansi.cursor.up(numLinesLastPrint - 1);
    }
    writeOutput += ansi.cursor.lineStart;

    // reserve the lines (otherwise causes issues with the cursor when at bottom of terminal screen)
    writeOutput += ansi.erase.reserve(numLinesOutput);

    // print the new output
    writeOutput += output.replace(/\n/g, ansi.erase.lineEnd + '\n') + ansi.erase.lineEnd;

    if (!isComplete && !isExit) {
      writeOutput += ansi.cursor.setShow(baseOptions.showCursor);
      if (outputHasSave) writeOutput += ansi.cursor.restore + ansi.cursor.move(-cursorOffset);
    }

    process.stdout.write(writeOutput);
    lastPrint = output;

    if (isComplete || isExit) {
      askOptions.general.lc.add(outputLines.length);
      if (baseOptions.lc && baseOptions.lc !== askOptions.general.lc) baseOptions.lc.add(outputLines.length);
    }
  };

  return print;
};

export const getAskInput = <V extends unknown, I extends unknown, O extends unknown>(
  baseOptions: AskItemisedInputOptionsBase<V, I, O>,
  valueOptions?: AskItemisedInputOptionsValues<V, I, O>,
  itemsOptions?: AskItemisedInputOptionsItems<V, I, O>
): Promise<O> => {
  const deferred = getDeferred<O>();
  const askOptions = getAskOptions();

  const valueData: AskValueData<V> = {
    value: valueOptions ? valueOptions.initialValue : (undefined as V),
    cursorOffset: 0
  };

  const fullChoices = itemsOptions ? getFullChoices<I>(itemsOptions.items) : [];
  const itemsData: AskItemData<I> = {
    items: fullChoices,
    originalItems: [...fullChoices],
    hovered: itemsOptions ? itemsOptions.initialHoveredIndex ?? 0 : 0,
    selected: itemsOptions ? itemsOptions.initialSelectedIndexes ?? [] : []
  };

  const questionText = typeof baseOptions.question === 'string' ? baseOptions.question : baseOptions.question.get();

  const printer = getPrinter<V, I, O>(questionText, baseOptions, valueOptions, itemsOptions);

  const operation = {
    setup: () => {
      if (baseOptions.actions.initial) {
        baseOptions.actions.initial('', '', valueData, itemsData, kl, operation.validate, operation.display, userActions.submit, userActions.exit);
      }
    },
    validate: (newValue?: V) => {
      const testValueData: AskValueData<V> = {
        ...valueData,
        value: newValue ?? valueData.value
      };
      const validateResult = baseOptions.validate(testValueData, itemsData);
      return getErrorInfoFromValidationResult(validateResult);
    },

    display: (isComplete: boolean, isExit: boolean = false) => {
      let valueText;
      let itemsOut;

      let { isError, errorMessage } = operation.validate();
      if (!errorMessage && isExit) errorMessage = '';

      if (valueOptions) {
        valueText = valueOptions.displayTransformer(valueData.value, isError, errorMessage, isComplete, isExit);
      }

      if (itemsOptions) {
        if (isComplete || isExit) {
          valueText = valueData.value;
        }
        if (!isComplete || isExit) {
          itemsOut = itemsData;
        }
      }

      printer(valueText, itemsOut, valueData.cursorOffset, errorMessage, isComplete, isExit);
    }
  };

  const userActions = {
    submit: (output: O, newValue: V = output as unknown as V) => {
      valueData.value = newValue;
      if (!operation.validate().isError) {
        operation.display(true);
        process.stdout.write('\n');
        kl.stop();
        const transformedValue = valueOptions?.submitTransformer(newValue) ?? output;
        return deferred.resolve(transformedValue);
      } else {
        if (askOptions.general.beeps) process.stdout.write(ansi.beep);
        operation.display(false);
      }
    },

    exit: async (forceNewValue?: string) => {
      if (forceNewValue) {
        valueData.value = forceNewValue as unknown as V;
      }
      operation.display(false, true);
      process.stdout.write('\n' + ansi.cursor.show);
      kl.stop();
      process.exit();
    }
  };

  const kl = getKeyListener((keyName: string, rawValue: string) => {
    if (keyName === rawValue) keyName = 'key';
    if (baseOptions.actions[keyName]) {
      const actionFn: KeyPressAction<V, I, O> = baseOptions.actions[keyName];
      actionFn(rawValue, keyName, valueData, itemsData, kl, operation.validate, operation.display, userActions.submit, userActions.exit);
    }
  });

  operation.setup();
  operation.display(false);

  return deferred.promise;
};

// Config types

export type KeyPressAction<V, I, O> = (
  rawValue: string,
  keyName: string,
  valueData: AskValueData<V>,
  itemsData: AskItemData<I>,
  kl: KeyListener,
  validate: (newValue?: V) => { isError: boolean; errorMessage?: string },
  print: (isComplete: boolean, isExit?: boolean) => void,
  submit: (output: O, newValue: V) => void,
  exit: (forceNewValue?: string) => void
) => void;

export type KeyPressActions<V, I, O> = ObjOfType<KeyPressAction<V, I, O>>;

interface AskItemisedInputOptionsBase<V, I, O> {
  lc: LineCounter;
  question: string | Breadcrumb;
  actions: KeyPressActions<V, I, O>;
  showCursor: boolean;
  validate: (valueData: AskValueData<V>, itemsData: AskItemData<I>) => ask.ValidationResponse;
}

interface AskItemisedInputOptionsValues<V, I, O> {
  initialValue: V;
  displayTransformer: (value: V, isError: boolean, errorMessage: string | undefined, isComplete: boolean, isExit: boolean) => string;
  submitTransformer: (value: V) => O;
}

interface AskItemisedInputOptionsItems<V, I, O> {
  items: ask.PromptChoice<I>[];
  selectType: 'single' | 'multi';
  initialHoveredIndex: number;
  initialSelectedIndexes: number[];
}

// Internal types

export interface AskValueData<V> {
  value: V;
  cursorOffset: number;
}

export interface AskItemData<I> {
  items: PromptChoiceFull<I>[];
  originalItems: PromptChoiceFull<I>[];
  hovered: number;
  selected: number[];
}
