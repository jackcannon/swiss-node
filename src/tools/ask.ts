import chalk from 'chalk';
import stringWidth from 'string-width';
import prompts from 'prompts';
import Fuse from 'fuse.js'; // fuzzy-search
import { second, seconds, wait, fn, symbols } from 'swiss-ak';

import { out } from './out';
import { clr } from './clr';
import { chlk } from './chlk';
import { Breadcrumb } from './out/breadcrumb';
import { getKeyListener } from './keyListener';

import { trim as trimAsk } from './ask/trim';
import * as fileExplorerAsk from './ask/fileExplorer';
import * as dateAsk from './ask/datetime';
import * as sectionAsk from './ask/section';
import * as tableAsk from './ask/table';

const PROMPT_VALUE_PROPERTY = 'SWISS_NODE_PROMPT_VALUE';

//<!-- DOCS: 100 -->
/**<!-- DOCS: ask ##! -->
 * ask
 *
 * A collection of functions to ask the user for input.
 */
export namespace ask {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  const promptsOptions = {
    onCancel() {
      process.exit(0);
    }
  };

  interface PromptChoiceObject<T = string> {
    title?: string;
    value?: T;
    selected?: boolean;
  }

  type PromptChoice<T = string> = string | PromptChoiceObject<T>;

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
  export const text = async (question: string | Breadcrumb, initial?: string): Promise<string> => {
    const message = typeof question === 'string' ? question : question.get();
    const response = await prompts(
      {
        type: 'text',
        name: PROMPT_VALUE_PROPERTY,
        message,
        initial
      },
      promptsOptions
    );

    return '' + response[PROMPT_VALUE_PROPERTY];
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
   * @param {PromptChoice<T>[]} choices
   * @param {T | string} [initial]
   * @param {number} [choiceLimit=10]
   * @returns {Promise<T>}
   */
  export const autotext = async <T = string>(
    question: string | Breadcrumb,
    choices: PromptChoice<T>[],
    initial?: T | string,
    choiceLimit: number = 10
  ): Promise<T> => {
    const message = typeof question === 'string' ? question : question.get();
    let response = {} as { [key: string]: T };
    const choiceObjs = choices.map((choice) => (typeof choice === 'object' ? choice : { title: choice, value: choice }));

    let initialId: number | string = 0;
    if (initial) {
      initialId = (choiceObjs || []).map((x) => (x && x.value ? x.value : x)).indexOf(initial);
      if (initialId < 0) initialId = typeof initial === 'string' ? initial : 0;
    }

    const fuzzy = new Fuse(choiceObjs, {
      includeScore: false,
      keys: ['title', 'value']
    });
    response = await prompts(
      {
        type: 'autocomplete',
        name: PROMPT_VALUE_PROPERTY,
        choices: choiceObjs,
        message,
        limit: choiceLimit,
        initial: initialId,
        suggest: async (text, ch) => {
          const filtered = fuzzy.search(text);
          const list = text ? filtered.map(({ item }) => item) : choiceObjs;
          return list;
        }
      },
      promptsOptions
    );

    return response[PROMPT_VALUE_PROPERTY];
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
  export const number = async (question: string | Breadcrumb, initial: number = 1): Promise<number> => {
    const message = typeof question === 'string' ? question : question.get();
    const response = await prompts(
      {
        type: 'number',
        name: PROMPT_VALUE_PROPERTY,
        message,
        initial
      },
      promptsOptions
    );
    return Number(response[PROMPT_VALUE_PROPERTY]);
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
   * @param {string} [yesTxt='yes']
   * @param {string} [noTxt='no']
   * @returns {Promise<boolean>}
   */
  export const boolean = async (
    question: string | Breadcrumb,
    initial: boolean = true,
    yesTxt: string = 'yes',
    noTxt: string = 'no'
  ): Promise<boolean> => {
    const message = typeof question === 'string' ? question : question.get();
    const response = await prompts(
      {
        type: 'toggle',
        name: PROMPT_VALUE_PROPERTY,
        message,
        initial: !initial,
        active: noTxt,
        inactive: yesTxt
      },
      promptsOptions
    );
    return !Boolean(response[PROMPT_VALUE_PROPERTY]);
  };

  /**<!-- DOCS: ask.booleanAlt ### @ -->
   * booleanAlt
   *
   * - `ask.booleanAlt`
   *
   * Get a boolean input from the user (yes or no)
   *
   * Alternative interface to ask.boolean
   *
   * ```typescript
   * const isCool = await ask.boolean('Is this cool?'); // true
   * ```
   * @param {string | Breadcrumb} question
   * @param {boolean} [initial=true]
   * @returns {Promise<boolean>}
   */
  export const booleanAlt = async (question: string | Breadcrumb, initial: boolean = true): Promise<boolean> => {
    const message = typeof question === 'string' ? question : question.get();
    const response = await prompts(
      {
        type: 'confirm',
        name: PROMPT_VALUE_PROPERTY,
        message,
        initial
      },
      promptsOptions
    );
    return Boolean(response[PROMPT_VALUE_PROPERTY]);
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
   * @param {PromptChoice<T>[]} choices
   * @param {T} [initial]
   * @returns {Promise<T>}
   */
  export const select = async <T = string>(question: string | Breadcrumb, choices: PromptChoice<T>[], initial?: T): Promise<T> => {
    const message = typeof question === 'string' ? question : question.get();
    const choiceObjs = choices.map((choice) => (typeof choice === 'object' ? choice : { title: choice, value: choice }));
    let initialId = 0;
    if (initial) {
      initialId = (choiceObjs || []).map((x) => (x && x.value ? x.value : x)).indexOf(initial);
      if (initialId < 0) initialId = 0;
    }

    const response = await prompts(
      {
        type: 'select',
        name: PROMPT_VALUE_PROPERTY,
        message,
        choices: choiceObjs,
        initial: initialId
      },
      promptsOptions
    );
    const value = response[PROMPT_VALUE_PROPERTY];
    return typeof value === 'number' ? choiceObjs[value] : value;
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
   * @param {PromptChoice<T>[]} choices
   * @param {PromptChoice<T> | PromptChoice<T>[]} [initial]
   * @param {boolean} [canSelectAll=false]
   * @returns {Promise<T[]>}
   */
  export const multiselect = async <T = string>(
    question: string | Breadcrumb,
    choices: PromptChoice<T>[],
    initial?: PromptChoice<T> | PromptChoice<T>[],
    canSelectAll: boolean = false
  ): Promise<T[]> => {
    const message = typeof question === 'string' ? question : question.get();
    if (!choices || choices.length === 0) {
      return [];
    }

    let choiceObjs = choices.map((choice) => (typeof choice === 'object' ? choice : { title: choice, value: choice }));
    if (initial) {
      const initialSelected = [initial].flat();
      choiceObjs = choiceObjs.map((choice) => ({
        selected: Boolean(initialSelected.find((x) => x === choice || x === choice.value)),
        ...choice
      }));
    }
    if (canSelectAll) {
      choiceObjs = [{ title: chlk.gray4('[Select all]'), value: '***SELECT_ALL***' }, ...choiceObjs];
    }

    const response = await prompts(
      {
        type: 'multiselect',
        name: PROMPT_VALUE_PROPERTY,
        instructions: false,
        message,
        choices: choiceObjs
      },
      promptsOptions
    );
    const result = response[PROMPT_VALUE_PROPERTY] ? response[PROMPT_VALUE_PROPERTY] : [];

    let selected = result.map((value) => (typeof value === 'number' ? choiceObjs[value] : value));
    if (selected.includes('***SELECT_ALL***')) {
      selected = choiceObjs.map((choice) => choice.value).filter((value) => !(value + '').startsWith('***') && !(value + '').endsWith('***'));
    }

    return selected;
  };

  export interface CRUDOptions {
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canDeleteAll: boolean;
  }
  export type CRUD = 'none' | 'create' | 'update' | 'delete' | 'delete-all';

  /**<!-- DOCS: ask.crud ### @ -->
   * crud
   *
   * - `ask.crud`
   *
   * Get the user to select a CRUD (**C**reate, **R**ead, **U**pdate and **D**elete) action
   *
   * Values returned are: 'none' | 'create' | 'update' | 'delete' | 'delete-all'
   *
   * ```typescript
   * const action = await ask.crud('What do you want to do next?'); // 'none'
   * ```
   * @param {string | Breadcrumb} question
   * @param {string} [itemName='item']
   * @param {any[]} [items]
   * @param {Partial<CRUDOptions>} [options={}]
   * @returns {Promise<CRUD>}
   */
  export const crud = async (
    question: string | Breadcrumb,
    itemName: string = 'item',
    items?: any[],
    options: Partial<CRUDOptions> = {}
  ): Promise<CRUD> => {
    const fullOptions: CRUDOptions = {
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      canDeleteAll: true,
      ...options
    };

    const opts = [{ title: chalk.dim(`${clr.approve(symbols.TICK)} [ Finished ]`), value: 'none' as CRUD }];
    if (fullOptions.canCreate) {
      opts.push({ title: `${clr.create(symbols.PLUS)} Add another ${itemName}`, value: 'create' as CRUD });
    }
    if (items.length > 0) {
      if (fullOptions.canUpdate) {
        opts.push({ title: `${clr.update(symbols.ARROW_ROTATE_CLOCK)} Change a ${itemName} value`, value: 'update' as CRUD });
      }
      if (fullOptions.canDelete) {
        opts.push({ title: `${clr.remove(symbols.CROSS)} Remove ${itemName}`, value: 'delete' as CRUD });
      }
      if (fullOptions.canDeleteAll) {
        opts.push({ title: `${clr.removeAll(symbols.TIMES)} Remove all`, value: 'delete-all' as CRUD });
      }
    }

    return await select(question, opts, 'none');
  };

  /**<!-- DOCS: ask.validate ### @ -->
   * validate
   *
   * - `ask.validate`
   *
   * Validate the result of an `ask` prompt
   *
   * ```typescript
   * const name = await ask.validate(
   *   () => ask.text('What is your name?'),
   *   (name) => name.length > 0
   * ); // 'Jack'
   * ```
   * @param {(initialValue?: T) => Promise<I> | I} askFunc
   * @param {(input: Awaited<I>) => boolean | string} validateFn
   * @returns {Promise<I>}
   */
  export const validate = async <T = string, I = string>(
    askFunc: (initialValue?: T) => Promise<I> | I,
    validateFn: (input: Awaited<I>) => boolean | string
  ): Promise<I> => {
    const runLoop = async (initial?: any, extraLines: number = 0) => {
      const input = await askFunc(initial);
      const validateResponse = await validateFn(input);
      if (validateResponse === true) {
        return input;
      } else {
        const message = validateResponse || '';
        out.moveUp(1 + extraLines);
        console.log(chalk.red(message));
        return runLoop(input, message.split('\n').length);
      }
    };
    return runLoop();
  };

  const imitateHighlight = chalk.cyanBright.bold.underline;
  const getImitateResultText = (result: any, isChild: boolean = false): string => {
    if (result instanceof Array) {
      if (result.length > 3) return `${result.length} selected`;
      return result.map((item) => getImitateResultText(item, true)).join(', ');
    }

    if (typeof result === 'object') {
      const usableProps = ['name', 'title', 'display', 'value'];
      for (let prop in usableProps) {
        if (result[prop]) return result[prop];
      }
    }

    if (typeof result === 'boolean') {
      if (isChild) return result + '';
      return result ? `${imitateHighlight('yes')} / no` : `yes / ${imitateHighlight('no')}`;
    }

    if (typeof result === 'number') {
      return result + '';
    }

    if (typeof result === 'string') {
      return result;
    }

    return 'done';
  };

  /**<!-- DOCS: ask.imitate ### @ -->
   * imitate
   *
   * - `ask.imitate`
   *
   * Imitate the display of a prompt
   *
   * ```typescript
   * imitate(true, 'What is your name?', 'Jack');
   *
   * ask.imitate(true, 'What is your name?', 'Jack');
   * ```
   * @param {boolean} done
   * @param {string | Breadcrumb} question
   * @param {any} [result]
   * @returns {number}
   */
  export const imitate = (done: boolean, question: string | Breadcrumb, result?: any): number => {
    const message = typeof question === 'string' ? question : question.get();
    const resultText = getImitateResultText(result);
    const prefix = done ? chalk.green('✔') : chalk.cyan('?');
    const questionText = chalk.whiteBright.bold(message);
    const joiner = resultText ? chalk.gray(done ? '… ' : '› ') : '';

    const mainLength = stringWidth(`${prefix} ${questionText} ${joiner}`);
    const maxLength = out.utils.getTerminalWidth() - mainLength - 1;

    let resultWrapper = out.utils.hasColor(resultText) ? fn.noact : done ? chalk.white : chalk.gray;

    const resultOut = resultText ? out.truncate(`${resultWrapper(resultText)}`, maxLength) : '';

    console.log(`${prefix} ${questionText} ${joiner}${resultOut}`);
    return 1;
  };

  /**<!-- DOCS: ask.prefill ### @ -->
   * prefill
   *
   * - `ask.prefill`
   *
   * Auto-fills an ask prompt with the provided value, if defined.
   *
   * Continues to display the 'prompt', but already 'submitted'
   *
   * Good for keeping skipping parts of forms, but providing context and keeping display consistent
   *
   * ```typescript
   * let data = {};
   * const name1 = ask.prefill(data.name, 'What is your name?', ask.text); // User input
   *
   * data = {name: 'Jack'}
   * const name2 = ask.prefill(data.name, 'What is your name?', ask.text); // Jack
   * ```
   * @param {T | undefined} value
   * @param {string | Breadcrumb} question
   * @param {(question: string | Breadcrumb) => Promise<T> | T} askFn
   * @returns {Promise<T>}
   */
  export const prefill = async <T extends unknown = string>(
    value: T | undefined,
    question: string | Breadcrumb,
    askFn: (question: string | Breadcrumb) => Promise<T> | T
  ): Promise<T> => {
    if (value !== undefined) {
      imitate(true, question, value);
      return value;
    }
    return askFn(question);
  };

  /**<!-- DOCS: ask.loading ### @ -->
   * loading
   *
   * - `ask.loading`
   *
   * Display an animated loading indicator that imitates the display of a prompt
   *
   * ```typescript
   * const loader = ask.loading('What is your name?');
   * // ...
   * loader.stop();
   * ```
   * @param {string | Breadcrumb} question
   * @returns {any}
   */
  export const loading = (question: string | Breadcrumb) => out.loading((s) => imitate(false, question, `[${s}]`));

  /**<!-- DOCS: ask.pause ### @ -->
   * pause
   *
   * - `ask.pause`
   *
   * Pause the program until the user presses enter
   *
   * ```typescript
   * await ask.pause();
   * ```
   * @param {string | Breadcrumb} [text='Press enter to continue...']
   * @returns {Promise<void>}
   */
  export const pause = async (text: string | Breadcrumb = 'Press enter to continue...'): Promise<void> => {
    return new Promise((resolve) => {
      const message = typeof text === 'string' ? text : text.get();
      console.log(chalk.gray(message));

      const finish = () => {
        kl.stop();
        resolve();
      };

      const kl = getKeyListener((key) => {
        switch (key) {
          case 'return':
            return finish();
        }
      });
    });
  };

  /**<!-- DOCS: ask.countdown ### @ -->
   * countdown
   *
   * - `ask.countdown`
   *
   * Animated countdown for a given number of seconds
   *
   * ```typescript
   * await ask.countdown(5);
   * ```
   * @param {number} totalSeconds
   * @param {(s: second) => string} [template=(s) => `Starting in ${s}s...`]
   * @param {string} [complete]
   * @returns {Promise<void>}
   */
  export const countdown = async (
    totalSeconds: number,
    template: (s: second) => string = (s) => `Starting in ${s}s...`,
    complete?: string
  ): Promise<void> => {
    console.log();

    let lines = 1;
    for (let s = totalSeconds; s > 0; s--) {
      const textValue = template(s);
      out.moveUp(lines);
      lines = textValue.split('\n').length;
      console.log(chalk.blackBright(textValue));
      await wait(seconds(1));
    }
    out.moveUp(lines);
    if (complete) {
      console.log(complete);
    }
  };

  /**<!-- DOCS: ask.wizard ### @ -->
   * wizard
   *
   * - `ask.wizard`
   *
   * Create a wizard object that can be used to build up a complex object
   *
   * ```typescript
   * interface Example {
   *   foo: string;
   *   bar: number;
   *   baz: string;
   * }
   *
   * const base: Partial<Example> = {
   *   baz: 'baz'
   * };
   *
   * const wiz = ask.wizard<Example>(base);
   *
   * const foo = await ask.text('What is foo?'); // User input: foo
   * wiz.add({ foo });
   *
   * const bar = await ask.number('What is bar?'); // User input: 123
   * wiz.add({ bar });
   *
   * const result = wiz.get(); // { baz: 'baz', foo: 'foo', bar: 123 }
   * ```
   * @param {Partial<T>} [startObj={}]
   * @returns {{ add(partial: Partial<T>): void; getPartial(): Partial<T>; get(): T; }}
   */
  export const wizard = <T extends unknown>(startObj: Partial<T> = {}) => {
    let obj: Partial<T> = { ...startObj };
    const history: Partial<T>[] = [];
    history.push(obj);

    return {
      add(partial: Partial<T>) {
        obj = {
          ...obj,
          ...partial
        };
        history.push(obj);
      },
      getPartial(): Partial<T> {
        return obj;
      },
      get(): T {
        return obj as T;
      }
    };
  };

  /**<!-- DOCS-ALIAS: ask.date -->*/
  export const date = dateAsk.date;
  /**<!-- DOCS-ALIAS: ask.time -->*/
  export const time = dateAsk.time;
  /**<!-- DOCS-ALIAS: ask.datetime -->*/
  export const datetime = dateAsk.datetime;
  /**<!-- DOCS-ALIAS: ask.dateRange -->*/
  export const dateRange = dateAsk.dateRange;

  /**<!-- DOCS-ALIAS: ask.fileExplorer -->*/
  export const fileExplorer = fileExplorerAsk.fileExplorer;
  /**<!-- DOCS-ALIAS: ask.multiFileExplorer -->*/
  export const multiFileExplorer = fileExplorerAsk.multiFileExplorer;
  /**<!-- DOCS-ALIAS: ask.saveFileExplorer -->*/
  export const saveFileExplorer = fileExplorerAsk.saveFileExplorer;

  /**<!-- DOCS-ALIAS: ask.table -->*/
  export namespace table {
    /**<!-- DOCS-ALIAS: ask.table.select -->*/
    export const select = tableAsk.select;

    /**<!-- DOCS-ALIAS: ask.table.multiselect -->*/
    export const multiselect = tableAsk.multiselect;
  }

  /**<!-- DOCS-ALIAS: ask.trim -->*/
  export const trim = trimAsk;

  /**<!-- DOCS-ALIAS: ask.separator -->*/
  export const separator = sectionAsk.separator;
  /**<!-- DOCS-ALIAS: ask.section -->*/
  export const section = sectionAsk.section;

  /**<!-- DOCS: ask.utils 199 ### -->
   * utils
   */
  export namespace utils {
    // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

    type TitleFn<T> = (item: T, index: number, arr: T[]) => string;
    /**<!-- DOCS: ask.utils.itemsToPromptObjects #### 199 @ -->
     * itemsToPromptObjects
     *
     * - `ask.utils.itemsToPromptObjects`
     *
     * Take an array of items and convert them to an array of prompt objects
     *
     * ```typescript
     * ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'])
     * // [
     * //   { title: 'lorem', value: 'lorem' },
     * //   { title: 'ipsum', value: 'ipsum' },
     * //   { title: 'dolor', value: 'dolor' }
     * // ]
     *
     * ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'], ['Lorem', 'Ipsum', 'Dolor'])
     * // [
     * //   { title: 'Lorem', value: 'lorem' },
     * //   { title: 'Ipsum', value: 'ipsum' },
     * //   { title: 'Dolor', value: 'dolor' }
     * // ]
     *
     * ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'], undefined, (s) => s.toUpperCase())
     * // [
     * //   { title: 'LOREM', value: 'lorem' },
     * //   { title: 'IPSUM', value: 'ipsum' },
     * //   { title: 'DOLOR', value: 'dolor' }
     * // ]
     * ```
     * @param {T[]} items
     * @param {string[]} [titles=[]]
     * @param {TitleFn<T>} [titleFn]
     * @returns {{ title: string; value: T; }[]}
     */
    export const itemsToPromptObjects = <T = string>(items: T[], titles: string[] = [], titleFn?: TitleFn<T>): { title: string; value: T }[] => {
      return items.map((item, index, arr) => ({ title: (titleFn && titleFn(item, index, arr)) || titles[index] || item + '', value: item as T }));
    };
  } // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
