import { getDeferred, second, seconds, StringTools, wait } from 'swiss-ak';

import { getKeyListener } from './keyListener';
import { LineCounter, ansi, getLineCounter, out } from './out';
import { Breadcrumb } from './out/breadcrumb';

import * as basicInput from './ask/basicInput';
import * as customiseOptions from './ask/basicInput/customise';
import * as dateAsk from './ask/datetime';
import * as fileExplorerAsk from './ask/fileExplorer';
import * as imitateAsk from './ask/imitate';
import * as sectionAsk from './ask/section';
import * as tableAsk from './ask/table';
import { trim as trimAsk } from './ask/trim';
import { colr, WrapFn, WrapSet } from './colr';
import { itemsFormatters } from './ask/basicInput/formatters';

export { AskTableDisplaySettings } from './ask/table';

//<!-- DOCS: 100 -->
/**<!-- DOCS: ask ##! -->
 * ask
 *
 * A collection of functions to ask the user for input.
 */
export namespace ask {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS-ALIAS: ask.text --> */
  export const text = basicInput.text;

  /**<!-- DOCS-ALIAS: ask.autotext --> */
  export const autotext = basicInput.autotext;

  /**<!-- DOCS-ALIAS: ask.number --> */
  export const number = basicInput.number;

  /**<!-- DOCS-ALIAS: ask.boolean --> */
  export const boolean = basicInput.boolean;

  /**<!-- DOCS-ALIAS: ask.booleanYN --> */
  export const booleanYN = basicInput.booleanYN;

  /**<!-- DOCS-ALIAS: ask.select --> */
  export const select = basicInput.select;

  /**<!-- DOCS-ALIAS: ask.multiselect --> */
  export const multiselect = basicInput.multiselect;

  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------

  //<!-- DOCS: 110 -->

  /**<!-- DOCS-ALIAS: ask.date -->*/
  export const date = dateAsk.date;
  /**<!-- DOCS-ALIAS: ask.time -->*/
  export const time = dateAsk.time;
  /**<!-- DOCS-ALIAS: ask.datetime -->*/
  export const datetime = dateAsk.datetime;
  /**<!-- DOCS-ALIAS: ask.dateRange -->*/
  export const dateRange = dateAsk.dateRange;

  //<!-- DOCS: 115 -->

  /**<!-- DOCS-ALIAS: ask.fileExplorer -->*/
  export const fileExplorer = fileExplorerAsk.fileExplorer;
  /**<!-- DOCS-ALIAS: ask.multiFileExplorer -->*/
  export const multiFileExplorer = fileExplorerAsk.multiFileExplorer;
  /**<!-- DOCS-ALIAS: ask.saveFileExplorer -->*/
  export const saveFileExplorer = fileExplorerAsk.saveFileExplorer;

  //<!-- DOCS: 120 -->

  /**<!-- DOCS-ALIAS: ask.table -->*/
  export namespace table {
    /**<!-- DOCS-ALIAS: ask.table.select -->*/
    export const select = tableAsk.select;

    /**<!-- DOCS-ALIAS: ask.table.multiselect -->*/
    export const multiselect = tableAsk.multiselect;
  }

  //<!-- DOCS: 125 -->

  /**<!-- DOCS-ALIAS: ask.trim -->*/
  export const trim = trimAsk;

  //<!-- DOCS: 130 -->

  /**<!-- DOCS: ask.ExtraHeader ### @ -->
   * Extra
   *
   * These are ask functions that don't prompt the user, but can help manage or organise how you use prompts
   */

  //<!-- DOCS: 131 -->

  /**<!-- DOCS-ALIAS: ask.customise --> */
  export const customise = customiseOptions.customise;

  //<!-- DOCS: 135 -->

  /**<!-- DOCS: ask.loading #### @ -->
   * loading
   *
   * - `ask.loading`
   *
   * Display an animated loading indicator that imitates the display of a prompt
   *
   * Intended to be indicate a question is coming, but something is loading first. For general 'loading' indicators, use `out.loading`.
   *
   * ```typescript
   * const loader = ask.loading('What is your name?');
   * // ...
   * loader.stop();
   * ```
   * @param {string | Breadcrumb} question - The question to display
   * @param {boolean} [isComplete=false] - Whether the loading is complete
   * @param {boolean} [isError=false] - Whether the loading is in an error state
   * @param {LineCounter} [lc] - Line counter
   * @returns {{ stop: () => void; }} - Loader object with a `stop` method
   */
  export const loading = (
    question: string | Breadcrumb,
    isComplete: boolean = false,
    isError: boolean = false,
    lc?: LineCounter
  ): { stop: () => void } => {
    // Generate the formatted output once, and just update the loading text later
    const theme = customiseOptions.getAskOptionsForState(isComplete, isError);
    const imitated = imitateAsk.getImitateOutput(question, `◐`, isComplete, isError);
    const numLines = imitated.split('\n').length;

    const loader = out.loading(
      (s) => {
        process.stdout.write(ansi.cursor.hide);
        return imitated.replace('◐', theme.colours.loadingIcon(s));
      },
      numLines,
      ['◐', '◓', '◑', '◒']
    );

    process.stdout.write(ansi.cursor.show);
    return loader;
  };

  /**<!-- DOCS: ask.countdown #### @ -->
   * countdown
   *
   * - `ask.countdown`
   *
   * Animated countdown for a given number of seconds
   *
   * ```typescript
   * await ask.countdown(5);
   * ```
   * @param {number} totalSeconds - Total number of seconds to countdown from
   * @param {(s: second) => string} [template] - Template function to format the countdown text
   * @param {boolean} [isComplete] - Whether the countdown is complete
   * @param {boolean} [isError] - Whether the countdown is in an error state
   * @returns {Promise<void>} - Promise that resolves when the countdown is complete
   */
  export const countdown = (totalSeconds: number, template?: (s: second) => string, isComplete?: boolean, isError?: boolean): Promise<void> => {
    const deferred = getDeferred<void>();
    const theme = customiseOptions.getAskOptionsForState(isComplete, isError);
    const tempLC = getLineCounter();

    let finished = false;

    const textTemplate = template || theme.text.countdown;
    let lines = textTemplate(totalSeconds).split('\n').length;

    const operation = {
      runLoop: async (secsRemaining: number) => {
        if (finished || secsRemaining <= 0) {
          return operation.finish();
        }
        const textValue = textTemplate(secsRemaining);

        lines = textValue.split('\n').length;
        const output = theme.colours.countdown(textValue);
        tempLC.overwrite(tempLC.ansi.moveHome() + ansi.cursor.hide + output);
        await wait(seconds(1));
        operation.runLoop(secsRemaining - 1);
      },
      finish: () => {
        if (finished) return;
        finished = true;
        kl.stop();
        tempLC.clear();
        process.stdout.write(ansi.cursor.show);
        deferred.resolve();
      }
    };

    const kl = getKeyListener((key) => {
      switch (key) {
        case 'esc':
          return operation.finish();
      }
    });

    operation.runLoop(totalSeconds);

    return deferred.promise;
  };

  /**<!-- DOCS: ask.pause #### @ -->
   * pause
   *
   * - `ask.pause`
   *
   * Pause the program until the user presses enter
   *
   * ```typescript
   * await ask.pause();
   * ```
   * @param {string | Breadcrumb} [text='Press enter to continue...'] - Text to display
   * @returns {Promise<void>} - Promise that resolves when the user presses enter
   */
  export const pause = async (text: string | Breadcrumb = 'Press enter to continue...'): Promise<void> => {
    const theme = customiseOptions.getAskOptionsForState(false, false);

    return new Promise((resolve) => {
      const message = typeof text === 'object' && (text as Breadcrumb).get ? (text as Breadcrumb).get() : text + '';
      console.log(ansi.cursor.hide + theme.colours.pause(message));

      const clear = () => {
        process.stdout.write(ansi.erase.lines(message.split('\n').length) + ansi.cursor.show);
      };

      const finish = () => {
        kl.stop();
        clear();
        resolve();
      };

      const exit = () => {
        kl.stop();
        clear();
        process.stdout.write(ansi.cursor.show);
        process.exit();
      };

      const kl = getKeyListener((key) => {
        switch (key) {
          case 'esc':
            return exit();
          case 'return':
            return finish();
        }
      });
    });
  };

  //<!-- DOCS: 140 -->

  /**<!-- DOCS-ALIAS: ask.imitate -->*/
  export const imitate = imitateAsk.imitate;

  //<!-- DOCS: 145 -->

  /**<!-- DOCS: ask.prefill #### @ -->
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
   * const name1 = ask.prefill('What is your name?', data.name,  ask.text); // User input
   *
   * data = {name: 'Jack'}
   * const name2 = ask.prefill('What is your name?', data.name,  ask.text); // Jack
   * ```
   * @param {string | Breadcrumb} question - Question to display
   * @param {T | undefined} value - Value to prefill
   * @param {(question: string | Breadcrumb, lc: LineCounter) => Promise<T> | T} askFn - Ask function to use if no value
   * @param {LineCounter} [lc] - Line counter
   * @returns {Promise<T>} - Promise that resolves with the prefilled or asked value
   */
  export const prefill = async <T extends unknown = string>(
    question: string | Breadcrumb,
    value: T | undefined,
    askFn: (question: string | Breadcrumb, lc: LineCounter) => Promise<T> | T,
    lc?: LineCounter
  ): Promise<T> => {
    if (value !== undefined) {
      imitate(question, value, true, false, undefined, lc);
      return value;
    }
    return askFn(question, lc);
  };

  /**<!-- DOCS: ask.wizard #### -->
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
   * await wiz.add('foo', ask.text('What is foo?')); // User input: foo
   *
   * await wiz.add('bar', ask.number('What is bar?')); // User input: 123
   *
   * const result = wiz.get(); // { baz: 'baz', foo: 'foo', bar: 123 }
   * ```
   * @param {Partial<T>} [startObj={}] - Initial object to start with
   * @returns {ask.Wizard<T>} - Wizard object
   */
  export const wizard = <T extends unknown>(startObj: Partial<T> = {}): ask.Wizard<T> => {
    let obj: Partial<T> = { ...startObj };
    const history: Partial<T>[] = [];
    history.push(obj);

    return {
      async add<P extends keyof T>(propName: P, value: T[P] | Promise<T[P]>) {
        const resolvedValue = await value;
        this.addPartial({ [propName]: resolvedValue });
        return resolvedValue;
      },
      addPartial(partial: Partial<T>) {
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
    } as ask.Wizard<T>;
  };

  /**
   * Wizard<T>
   *
   * Returned by `ask.wizard`
   */
  export interface Wizard<T> {
    // TODO: Add JSDoc for each method
    add<P extends keyof T>(propName: P, value: T[P] | Promise<T[P]>): Promise<T[P]>;
    addPartial(partial: Partial<T>): void;
    getPartial(): Partial<T>;
    get(): T;
  }

  /**<!-- DOCS: ask.menu #### @ -->
   * menu
   *
   * - `ask.menu`
   *
   * Wrapper for `ask.select` that styles the output as a menu, with icons and colours, and supports nested submenus
   *
   * ```typescript
   * // Example 1
   * const menuItems: ask.MenuItem<string>[] = [
   *   { value: 'done', title: colr.dim(`[ Finished ]`), icon: '✔', colour: colr.dark.green.bold },
   *   { value: 'create', title: `${colr.bold('Create')} a new thing`, icon: '+', colour: colr.black.greenBg },
   *   { value: 'duplicate', title: `${colr.bold('Duplicate')} a thing`, icon: '⌥', colour: colr.black.cyanBg },
   *   { value: 'edit', title: `${colr.bold('Edit')} a thing`, icon: '↻', colour: colr.black.yellowBg },
   *   { value: 'delete', title: `${colr.bold('Remove')} thing(s)`, icon: '×', colour: colr.black.redBg },
   *   { value: 'delete-all', title: colr.bold(`Remove all`), icon: '✖', colour: colr.black.darkBg.redBg }
   * ];
   * const result = await ask.menu('Pick a menu item', menuItems, 'edit'); // 'duplicate' (or other value)
   *
   * // Example 2 - Submenus
   * const actions = (itemType: string) => ({
   *   items: [
   *     { title: 'Find', icon: '⌕', colour: colr.sets.blue, value: `find-${itemType}` },
   *     { title: 'Add', icon: '✚', colour: colr.sets.green, value: `add-${itemType}` },
   *     { title: 'Edit', icon: '✎', colour: colr.sets.yellow, value: `edit-${itemType}` },
   *     { title: 'Delete', icon: '⨯', colour: colr.sets.red, value: `delete-${itemType}` }
   *   ]
   * });
   * const menuItems: ask.MenuItem<string>[] = [
   *   { title: 'Task', icon: '⚑', colour: colr.darkBg.cyanBg, submenu: actions('task') },
   *   { title: 'Project', icon: '⎔', colour: colr.darkBg.magentaBg, submenu: actions('project') },
   *   { title: 'Milestone', icon: '◈', colour: colr.darkBg.yellowBg, submenu: actions('milestone') },
   *   { title: 'Permission', icon: '⚷', colour: colr.light.greyBg, submenu: actions('permission') }
   * ];
   * const result = await ask.menu('What do you want to work with?', menuItems);
   * ```
   * @param {string | Breadcrumb} question - Question to display
   * @param {MenuItem<T>[]} items - Menu items
   * @param {MenuItem<T> | T | number} [initial] - Initial item to select
   * @param {(value: T, index: number) => ask.ValidationResponse} [validate] - Validation function
   * @param {LineCounter} [lc] - Line counter
   * @returns {Promise<T>} - Promise that resolves with the selected item
   */
  export const menu = async <T extends unknown>(
    question: string | Breadcrumb,
    items: MenuItem<T>[],
    initial?: MenuItem<T> | T | number,
    validate?: (value: T, index: number) => ask.ValidationResponse,
    lc?: LineCounter
  ): Promise<T> => {
    const tempLC = getLineCounter();

    const options = customiseOptions.getAskOptions();

    // override the items formatter to use simple (or simpleAlt if using an 'alt' formatter already)
    const originalFormatItems = options.formatters.formatItems;
    options.formatters.formatItems = [itemsFormatters.simpleAlt, itemsFormatters.blockAlt].includes(originalFormatItems)
      ? itemsFormatters.simpleAlt
      : itemsFormatters.simple;

    let initialIndex = 0;
    if (initial !== undefined) {
      const found = items.findIndex((item) => item.value === initial || item === initial);
      if (found !== -1) {
        initialIndex = found;
      } else if (typeof initial === 'number') {
        initialIndex = initial;
      }
    }

    const hasIcons = items.some((item) => item.icon !== undefined);

    const submenuIDs: T[] = [];

    const choices = items.map((item, index) => {
      const title = item.title || item.value + '';
      let icon = '';
      if (hasIcons) {
        icon = ` ${item.icon || ''} `;
        if (item.colour) {
          const wrapFn = typeof item.colour === 'function' ? item.colour : (item.colour as WrapSet).bg;
          icon = colr.black(wrapFn(icon));
        }
        icon += ' ';
      }
      let value = item.value;
      if (item.submenu) {
        const uniqueId = StringTools.randomId('submenu-') as T;
        submenuIDs.push(uniqueId);
        value = uniqueId;
      }
      return {
        title: `${icon}${title}`,
        value: value,
        submenu: item.submenu
      };
    });

    const result = await basicInput.select<T>(question, choices, initialIndex, validate, tempLC);
    options.formatters.formatItems = originalFormatItems;

    if (submenuIDs.includes(result)) {
      const submenu = choices.find((choice) => choice.value === result)?.submenu;
      if (submenu) {
        tempLC.clear();
        return ask.menu(submenu.question || question, submenu.items, submenu.initial ?? initial, validate, lc);
      }
    }

    lc?.add(tempLC.get());
    return result;
  };

  /**
   * MenuItem<T>
   *
   * Used by `ask.menu`
   */
  export interface MenuItem<T> {
    icon?: string;
    title?: string;
    colour?: WrapSet | WrapFn;
    value?: T;
    submenu?: {
      question?: string | Breadcrumb;
      initial?: MenuItem<T> | T | number;
      items: MenuItem<T>[];
    };
  }

  //<!-- DOCS: 150 -->

  /**<!-- DOCS-ALIAS: ask.section -->*/
  export const section = sectionAsk.section;

  /**<!-- DOCS-ALIAS: ask.separator -->*/
  export const separator = sectionAsk.separator;

  //<!-- DOCS: 155 -->

  /**<!-- DOCS: ask.utils 180 ### -->
   * utils
   */
  export namespace utils {
    // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

    type TitleFn<T> = (item: T, index: number, arr: T[]) => string;
    /**<!-- DOCS: ask.utils.itemsToPromptObjects #### 180 @ -->
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
     * @param {T[]} items - Items to convert
     * @param {string[]} [titles=[]] - Titles to use
     * @param {TitleFn<T>} [titleFn] - Function to generate titles
     * @returns {{ title: string; value: T; }[]} - Array of prompt objects
     */
    export const itemsToPromptObjects = <T = string>(items: T[], titles: string[] = [], titleFn?: TitleFn<T>): { title: string; value: T }[] => {
      return items.map((item, index, arr) => ({ title: (titleFn && titleFn(item, index, arr)) || titles[index] || item + '', value: item as T }));
    };
  } // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

  /**<!-- DOCS: ask.PromptChoice ### 196 -->
   * PromptChoice
   *
   * - `ask.PromptChoice<T>`
   *
   * A choice for a prompt
   *
   * Equivalent to ``T | { title?: string; value?: T; selected?: boolean; }``
   */
  export type PromptChoice<T = string> = T | { title?: string; value: T; selected?: boolean };

  /**<!-- DOCS: ask.ValidationResponse ### 196 -->
   * ValidationResponse
   *
   * - `ask.ValidationResponse`
   *
   * Response type for ask validation functions.
   *
   * | Response             | Type      | Result        | Error Message |
   * |----------------------|-----------|---------------|---------------|
   * | `new Error('error')` | Error     | ❌ - Rejected | `'error'`     |
   * | `'error'`            | string    | ❌ - Rejected | `'error'`     |
   * | `false`              | boolean   | ❌ - Rejected | None          |
   * | `true`               | boolean   | ✅ - Accepted | *N/A*         |
   * | `null`               | null      | ✅ - Accepted | *N/A*         |
   * | `undefined`          | undefined | ✅ - Accepted | *N/A*         |
   *
   * Equivalent to `Error | string | boolean | void`
   */
  export type ValidationResponse = Error | string | boolean | void;
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
