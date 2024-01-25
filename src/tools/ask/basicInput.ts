import { fn } from 'swiss-ak';
import { ask } from '../ask';
import { Breadcrumb, LineCounter } from '../out';
import { AskItemData, AskValueData, KeyPressActions, getAskInput } from './basicInput/getAskInput';
import { getSearchSuggestions } from './basicInput/getSearchSuggestions';
import { PromptChoiceFull } from './basicInput/getFullChoices';
import { getAskOptions } from './basicInput/customise';
import { LOG } from '../../DELETEME/LOG';
import { valueDisplays } from './basicInput/valueDisplays';

//<!-- DOCS: 101 -->

/**<!-- DOCS: ask.text ### @ -->
 * text
 *
 * - `ask.text`
 *
 * Get a text input from the user.
 *
 * ```typescript
 * const name = await ask.text('What is your name?'); // 'Jack'
 * ```
 * @param {string | Breadcrumb} question
 * @param {string} [initial]
 * @returns {Promise<string>}
 */
export const text = async (
  question: string | Breadcrumb,
  initial?: string,
  validate?: (value: string) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<string> => {
  const textActions: KeyPressActions<string, undefined, string> = {
    // most key presses
    key(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) +
        rawValue +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      print(false);
    },
    space(...args) {
      this.key(...args);
    },
    // Ctrl-C
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      submit(valueData.value, valueData.value);
    },
    backspace(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset - 1) +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      print(false);
    },
    delete(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset + 1);
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.cursorOffset = Math.min(valueData.value.length, valueData.cursorOffset + 1);
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.cursorOffset = Math.max(0, valueData.cursorOffset - 1);
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {},
    down(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {}
  };
  return getAskInput<string, undefined, string>(
    {
      lc,
      question,
      showCursor: true,
      actions: textActions,
      validate: (valueData) => {
        if (!validate) return true;
        return validate(valueData.value);
      }
    },
    {
      initialValue: initial || '',
      displayTransformer: (v) => v,
      submitTransformer: (v) => v
    }
  );
};

/**<!-- DOCS: ask.autotext ### @ -->
 * autotext
 *
 * - `ask.autotext`
 *
 * Get a text input from the user, with auto-completion.
 *
 * ```typescript
 * const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
 * ```
 * @param {string | Breadcrumb} question
 * @param {ask.PromptChoice<T>[]} choices
 * @param {T | string} [initial]
 * @returns {Promise<T>}
 */
export const autotext = async <T = string>(
  question: string | Breadcrumb,
  choices: ask.PromptChoice<T>[],
  initial?: T | string,
  validate?: (item: T, index: number, typedValue: string) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T> => {
  const computeItems = (valueData: AskValueData<string>, itemsData: AskItemData<T>) => {
    const value = valueData.value;
    const items = itemsData.originalItems;

    const searchResults = getSearchSuggestions(value, items, (i) => i.title, 1);
    itemsData.items = searchResults;
    itemsData.hovered = 0;
  };

  const autotextActions: KeyPressActions<string, T, T> = {
    initial(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      computeItems(valueData, itemsData);
      print(false);
    },
    // most key presses
    key(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) +
        rawValue +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      computeItems(valueData, itemsData);
      print(false);
    },
    space(...args) {
      this.key(...args);
    },
    // Ctrl-C
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    backspace(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset - 1) +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      computeItems(valueData, itemsData);
      print(false);
    },
    delete(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset + 1);
      computeItems(valueData, itemsData);
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.cursorOffset = Math.min(valueData.value.length, valueData.cursorOffset + 1);
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.cursorOffset = Math.max(0, valueData.cursorOffset - 1);
      print(false);
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      itemsData.hovered = (itemsData.hovered + 1) % itemsData.items.length;
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      itemsData.hovered = (itemsData.items.length + itemsData.hovered - 1) % itemsData.items.length;
      print(false);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      submit(itemsData.items[itemsData.hovered].value, itemsData.items[itemsData.hovered].title);
    }
  };

  return getAskInput<string, T, T>(
    {
      lc,
      question,
      showCursor: true,
      actions: autotextActions,
      validate: (valueData, itemsData) => {
        if (!validate) return true;
        return validate(itemsData.items[itemsData.hovered].value, itemsData.hovered, valueData.value);
      }
    },
    {
      initialValue: typeof initial === 'string' ? initial : '',
      displayTransformer: (v) => v,
      submitTransformer: (v) => v as unknown as T // not actually used
    },
    {
      selectType: 'single',
      items: choices,
      initialHoveredIndex: 0,
      initialSelectedIndexes: []
    }
  );
};

/**<!-- DOCS: ask.number ### @ -->
 * number
 *
 * - `ask.number`
 *
 * Get a number input from the user.
 *
 * ```typescript
 * const age = await ask.number('How old are you?'); // 30
 * ```
 * @param {string | Breadcrumb} question
 * @param {number} [initial=1]
 * @returns {Promise<number>}
 */
export const number = async (
  question: string | Breadcrumb,
  initial?: number,
  validate?: (value: number) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<number> => {
  const numberActions: KeyPressActions<string, undefined, number> = {
    space(...args) {
      this.key(...args);
    },
    // Ctrl-C
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      submit(Number(valueData.value), valueData.value);
    },
    backspace(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset - 1) +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      print(false);
    },
    delete(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value =
        valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) +
        valueData.value.slice(valueData.value.length - valueData.cursorOffset + 1);
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.cursorOffset = Math.min(valueData.value.length, valueData.cursorOffset + 1);
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.cursorOffset = Math.max(0, valueData.cursorOffset - 1);
      print(false);
    },
    key(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      const value = valueData.value;
      const doesntRepeatDecPoint = !value.includes('.') || !/[.]/.test(rawValue);
      const firstChar = value === '' && /^[\-+]?[0-9.]*?$/.test(rawValue);
      const normalChar = value !== '' && /^[0-9.]+?$/.test(rawValue);

      if (doesntRepeatDecPoint && (firstChar || normalChar)) {
        valueData.value = value.slice(0, value.length - valueData.cursorOffset) + rawValue + value.slice(value.length - valueData.cursorOffset);
        print(false);
      }
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      const numberValue = Number(valueData.value);
      if (!Number.isNaN(numberValue)) {
        const increment = Math.pow(10, valueData.cursorOffset);
        valueData.value = '' + (numberValue - 1);
        print(false);
      }
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      const numberValue = Number(valueData.value);
      if (!Number.isNaN(numberValue)) {
        valueData.value = '' + (numberValue + 1);
        print(false);
      }
    }
  };

  const normaliseNumber = (value: string | number): number => {
    const num = Number(value);

    if (value === '' || Number.isNaN(num)) return 0;
    return num;
  };

  return getAskInput<string, undefined, number>(
    {
      lc,
      question,
      showCursor: true,
      actions: numberActions,
      validate: (valueData) => {
        if (!validate) return true;
        return validate(normaliseNumber(valueData.value));
      }
    },
    {
      initialValue: initial !== undefined ? '' + initial : '',
      displayTransformer: (v, isError, errMsg, isComplete) => valueDisplays.number(v, isComplete, isError),
      submitTransformer: (v) => normaliseNumber(v)
    }
  );
};

/**<!-- DOCS: ask.boolean ### @ -->
 * boolean
 *
 * - `ask.boolean`
 *
 * Get a boolean input from the user (yes or no)
 *
 * ```typescript
 * const isCool = await ask.boolean('Is this cool?'); // true
 * ```
 * @param {string | Breadcrumb} question
 * @param {boolean} [initial=true]
 * @returns {Promise<boolean>}
 */
export const boolean = async (
  question: string | Breadcrumb,
  initial: boolean = true,
  validate?: (value: boolean) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<boolean> => {
  const options = getAskOptions();
  const booleanActions: KeyPressActions<boolean, undefined, boolean> = {
    key(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      if (options.general.boolTrueKeys.includes(rawValue)) {
        valueData.value = true;
        print(false);
      }
      if (options.general.boolFalseKeys.includes(rawValue)) {
        valueData.value = false;
        print(false);
      }
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value = true;
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      valueData.value = false;
      print(false);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      submit(valueData.value, valueData.value);
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    }
  };

  return getAskInput<boolean, undefined, boolean>(
    {
      lc,
      question,
      showCursor: false,
      actions: booleanActions,
      validate: (valueData) => {
        if (!validate) return true;
        return validate(valueData.value);
      }
    },
    {
      initialValue: initial,
      displayTransformer: (v, isError, errorMessage, isComplete) => {
        return valueDisplays.boolean(v, isComplete, isError);
      },
      submitTransformer: (v) => !!v
    }
  );
};

/**<!-- DOCS: ask.booleanYN ### @ -->
 * booleanYN
 *
 * - `ask.booleanYN`
 *
 * Get a boolean input from the user (yes or no)
 *
 * Alternative interface to ask.boolean
 *
 * ```typescript
 * const isCool = await ask.booleanYN('Is this cool?'); // true
 * ```
 * @param {string | Breadcrumb} question
 * @returns {Promise<boolean>}
 */
export const booleanYN = async (
  question: string | Breadcrumb,
  validate?: (value: boolean) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<boolean> => {
  const options = getAskOptions();
  const booleanYNActions: KeyPressActions<boolean, undefined, boolean> = {
    key(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      if (options.general.boolTrueKeys.includes(rawValue)) {
        submit(true, true);
      }
      if (options.general.boolFalseKeys.includes(rawValue)) {
        submit(false, false);
      }
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit();
    }
  };
  return getAskInput<string | boolean, undefined, boolean>(
    {
      lc,
      question,
      showCursor: true,
      actions: booleanYNActions,
      validate: (valueData) => {
        if (!validate) return true;
        if (typeof valueData.value !== 'boolean') return true;
        return validate(valueData.value);
      }
    },
    {
      initialValue: '',
      displayTransformer: (v, isError, errorMsg, isComplete, isExit) => {
        return valueDisplays.booleanYN(v, isComplete, isError);
      },
      submitTransformer: (v) => !!v
    }
  );
};

/**<!-- DOCS: ask.select ### @ -->
 * select
 *
 * - `ask.select`
 *
 * Get the user to select an option from a list.
 *
 * ```typescript
 * const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
 * ```
 * @param {string | Breadcrumb} question
 * @param {ask.PromptChoice<T>[]} choices
 * @param {T} [initial]
 * @returns {Promise<T>}
 */
export const select = async <T = string>(
  question: string | Breadcrumb,
  choices: ask.PromptChoice<T>[],
  initial?: ask.PromptChoice<T> | number,
  validate?: (item: T, index: number) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T> => {
  const selectActions: KeyPressActions<string, T, T> = {
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit(itemsData.items[itemsData.hovered].title);
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      exit(itemsData.items[itemsData.hovered].title);
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      itemsData.hovered = (itemsData.hovered + 1) % itemsData.items.length;
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      itemsData.hovered = (itemsData.items.length + itemsData.hovered - 1) % itemsData.items.length;
      print(false);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      submit(itemsData.items[itemsData.hovered].value, itemsData.items[itemsData.hovered].title);
    }
  };

  let initialHoveredIndex = 0;
  if (initial !== undefined) {
    initialHoveredIndex = choices.indexOf(initial as any);
    if (initialHoveredIndex === -1)
      initialHoveredIndex = choices
        .map((item: { title?: string; value: T; selected?: boolean }) => (typeof item === 'object' && item.value !== undefined ? item.value : item))
        .indexOf(initial as any);
    if (initialHoveredIndex === -1 && typeof initial === 'number' && initial >= 0 && initial < choices.length) initialHoveredIndex = initial;
    if (initialHoveredIndex === -1) initialHoveredIndex = 0;
  }

  return getAskInput<string, T, T>(
    {
      lc,
      question,
      showCursor: false,
      actions: selectActions as KeyPressActions<string, T, T>,
      validate: (valueData, itemsData) => {
        if (!validate) return true;
        return validate(itemsData.items[itemsData.hovered].value, itemsData.hovered);
      }
    },
    undefined,
    {
      selectType: 'single',
      items: choices,
      initialHoveredIndex,
      initialSelectedIndexes: []
    }
  );
};

/**<!-- DOCS: ask.multiselect ### @ -->
 * multiselect
 *
 * - `ask.multiselect`
 *
 * Get the user to select multiple opts from a list.
 *
 * ```typescript
 * const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
 * ```
 * @param {string | Breadcrumb} question
 * @param {ask.PromptChoice<T>[]} choices
 * @param {ask.PromptChoice<T> | ask.PromptChoice<T>[]} [initial]
 * @returns {Promise<T[]>}
 */
export const multiselect = async <T = string>(
  question: string | Breadcrumb,
  choices: ask.PromptChoice<T>[],
  initial?: ask.PromptChoice<T> | ask.PromptChoice<T>[] | number | number[],
  validate?: (items: T[], indexes: number[]) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T[]> => {
  const SELECT_ALL = Symbol.for('SWISS.NODE.ASK.SELECT.ALL');

  const getIsAllSelected = (itemsData: AskItemData<T>) =>
    itemsData.items
      .filter((item) => item.value !== SELECT_ALL)
      .every((item: PromptChoiceFull<T>, index: number) => itemsData.selected.includes(index + 1));
  const computeItems = (itemsData: AskItemData<T>) => {
    const isAllSelected = getIsAllSelected(itemsData);

    LOG('computeItems', { isAllSelected, itemsData });

    if (isAllSelected && !itemsData.selected.includes(0)) itemsData.selected.unshift(0);
    if (!isAllSelected && itemsData.selected.includes(0)) itemsData.selected = itemsData.selected.filter((i) => i !== 0);
  };
  const toggleAll = (value: boolean, itemsData: AskItemData<T>) => {
    if (value) {
      itemsData.selected = itemsData.items.map((v, i) => i);
    } else {
      itemsData.selected = [];
    }
  };

  const multiselectActions: KeyPressActions<string, T, T[]> = {
    exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      const { isError } = validate();
      exit(valueDisplays.multiselect(itemsData, false, isError));
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      multiselectActions.exit(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit);
    },
    key(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      LOG('key', rawValue);
      if ('Aa'.includes(rawValue)) {
        toggleAll(!getIsAllSelected(itemsData), itemsData);
        print(false);
      }
    },
    space(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      const hoveredItem = itemsData.items[itemsData.hovered];

      if (hoveredItem.value === SELECT_ALL) {
        toggleAll(!itemsData.selected.includes(itemsData.hovered), itemsData);
      } else {
        if (itemsData.selected.includes(itemsData.hovered)) {
          itemsData.selected = itemsData.selected.filter((i) => i !== itemsData.hovered);
        } else {
          itemsData.selected.push(itemsData.hovered);
        }
        computeItems(itemsData);
      }

      print(false);
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      itemsData.hovered = (itemsData.hovered + 1) % itemsData.items.length;
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      itemsData.hovered = (itemsData.items.length + itemsData.hovered - 1) % itemsData.items.length;
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      LOG('left', itemsData);
      multiselectActions.space(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      LOG('right', itemsData);
      multiselectActions.space(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate, print, submit, exit) {
      const { isError } = validate();
      const display = valueDisplays.multiselect(itemsData, !isError, isError);

      submit(
        itemsData.selected.map((i) => itemsData.items[i].value),
        display
      );
    }
  };

  const options = getAskOptions();

  const allChoices = [{ title: options.text.selectAll, value: SELECT_ALL as T }, ...choices];

  let initialSelectedIndexes: number[] = [];

  // Add items that have 'selected' property set to truthy
  allChoices.forEach((item: { title?: string; value: T; selected?: boolean }, index) => {
    if (typeof item === 'object' && item.selected) initialSelectedIndexes.push(index);
  });

  const initialArray = [initial].flat() as ask.PromptChoice<T>[] | number[];
  // Add items that are in the initial array
  const extractValue = (item) => (typeof item === 'object' && item.value !== undefined ? item.value : item);
  const searchChoices = allChoices.map(extractValue);
  const initialItems = initialArray.map(extractValue);
  initialItems.forEach((item) => {
    const index = searchChoices.indexOf(item);
    if (index !== -1) initialSelectedIndexes.push(index);
  });

  if (initialSelectedIndexes.length === 0 && initialArray.length && typeof initialArray[0] === 'number') {
    initialSelectedIndexes = initialArray as number[];
  }

  // Remove duplicates
  initialSelectedIndexes = initialSelectedIndexes.filter(fn.dedupe);

  const initialHoveredIndex = initialSelectedIndexes[0] ?? 0;

  LOG('initial', { initialSelectedIndexes });

  let result = await getAskInput<string, T, T[]>(
    {
      lc,
      question,
      showCursor: false,
      actions: multiselectActions as KeyPressActions<string, T, T[]>,
      validate: (valueData, itemsData) => {
        if (!validate) return true;
        return validate(
          itemsData.selected.map((i) => itemsData.items[i].value),
          itemsData.selected
        );
      }
    },
    undefined,
    {
      selectType: 'multi',
      items: allChoices,
      initialHoveredIndex,
      initialSelectedIndexes
    }
  );

  result = result.filter((v) => v !== SELECT_ALL);

  return result;
};
