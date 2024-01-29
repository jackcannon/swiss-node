import { second, seconds, wait, fn, symbols, StringTools } from 'swiss-ak';

import { LineCounter, ansi, out } from './out';
import { Breadcrumb } from './out/breadcrumb';
import { getKeyListener } from './keyListener';

import * as basicInput from './ask/basicInput';
import * as customiseOptions from './ask/basicInput/customise';
import { trim as trimAsk } from './ask/trim';
import * as fileExplorerAsk from './ask/fileExplorer';
import * as dateAsk from './ask/datetime';
import * as sectionAsk from './ask/section';
import * as tableAsk from './ask/table';
import * as imitateAsk from './ask/imitate';

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
   * @param {string | Breadcrumb} question
   * @returns {any}
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
   * @param {number} totalSeconds
   * @param {(s: second) => string} [template=(s) => `Starting in ${s}s...`]
   * @param {string} [complete]
   * @returns {Promise<void>}
   */
  export const countdown = async (totalSeconds: number, template?: (s: second) => string, isComplete?: boolean, isError?: boolean): Promise<void> => {
    const theme = customiseOptions.getAskOptionsForState(isComplete, isError);
    console.log();

    const textTemplate = template || theme.text.countdown;

    let lines = textTemplate(totalSeconds).split('\n').length;
    for (let s = totalSeconds; s > 0; s--) {
      const textValue = textTemplate(s);

      process.stdout.write(ansi.erase.lines(lines) + ansi.cursor.hide);

      lines = textValue.split('\n').length;
      console.log(theme.colours.countdown(textValue));
      await wait(seconds(1));
    }
    process.stdout.write(ansi.erase.lines(lines) + ansi.cursor.show);
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
   * @param {string | Breadcrumb} [text='Press enter to continue...']
   * @returns {Promise<void>}
   */
  export const pause = async (text: string | Breadcrumb = 'Press enter to continue...'): Promise<void> => {
    const theme = customiseOptions.getAskOptionsForState(false, false);

    return new Promise((resolve) => {
      const message = typeof text === 'object' && (text as Breadcrumb).get ? (text as Breadcrumb).get() : text + '';
      console.log(ansi.cursor.hide + theme.colours.pause(message));

      const finish = () => {
        kl.stop();
        process.stdout.write(ansi.erase.lines(message.split('\n').length) + ansi.cursor.show);
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
    question: string | Breadcrumb,
    value: T | undefined,
    askFn: (question: string | Breadcrumb, lc: LineCounter) => Promise<T> | T,
    lc?: LineCounter
  ): Promise<T> => {
    if (value !== undefined) {
      imitate(question, value, true, false, lc);
      return value;
    }
    return askFn(question, lc);
  };

  /**<!-- DOCS: ask.wizard #### @ -->
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
   * @param {Partial<T>} [startObj={}]
   * @returns {{ add(partial: Partial<T>): void; getPartial(): Partial<T>; get(): T; }}
   */
  export const wizard = <T extends unknown>(startObj: Partial<T> = {}) => {
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
    };
  };

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
     * @param {T[]} items
     * @param {string[]} [titles=[]]
     * @param {TitleFn<T>} [titleFn]
     * @returns {{ title: string; value: T; }[]}
     */
    export const itemsToPromptObjects = <T = string>(items: T[], titles: string[] = [], titleFn?: TitleFn<T>): { title: string; value: T }[] => {
      return items.map((item, index, arr) => ({ title: (titleFn && titleFn(item, index, arr)) || titles[index] || item + '', value: item as T }));
    };
  } // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

  /**<!-- DOCS: ask.PromptChoice ### 199 -->
   * PromptChoice
   *
   * - `ask.PromptChoice<T>`
   *
   * A choice for a prompt
   *
   * Equivalent to ``T | { title?: string; value?: T; selected?: boolean; }``
   */
  export type PromptChoice<T = string> = T | { title?: string; value: T; selected?: boolean };
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
