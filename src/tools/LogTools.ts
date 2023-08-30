import { inspect } from 'util';
import chalk from 'chalk';
import { fn } from 'swiss-ak';

//<!-- DOCS: 600 -->
/**<!-- DOCS: LogTools ##! -->
 * LogTools
 *
 * A collection of tools for logging
 */
export namespace LogTools {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: LogTools.getLogStr ### -->
   * getLogStr
   *
   * - `LogTools.getLogStr`
   * - `getLogStr`
   *
   * Get a string for a given object as it would be printed by console.log
   *
   * ```typescript
   * getLogStr(true); // true
   * getLogStr(1); // 1
   * getLogStr('foobar'); // foobar
   * getLogStr({ test: 'test' }); // { test: 'test' }
   * getLogStr(['a', 'b', 'c']); // [ 'a', 'b', 'c' ]
   *
   * getLogStr([
   *   [
   *     [
   *       ['a', 'b', 'c'],
   *       ['d', 'e', 'f']
   *     ],
   *     [
   *       ['g', 'h', 'i'],
   *       ['j', 'k', 'l']
   *     ]
   *   ],
   *   [
   *     [
   *       ['m', 'n', 'o']
   *     ]
   *   ]
   * ]);
   * // [
   * //   [
   * //     [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ] ],
   * //     [ [ 'g', 'h', 'i' ], [ 'j', 'k', 'l' ] ]
   * //   ],
   * //   [ [ [ 'm', 'n', 'o' ] ] ]
   * // ]
   * ```
   */
  export const getLogStr = (item: any): string => {
    const inspectList = ['object', 'boolean', 'number'];
    if (inspectList.includes(typeof item) && !(item instanceof Date)) {
      return inspect(item, { colors: false, depth: null });
    } else {
      return item + '';
    }
  };

  /**<!-- DOCS: LogTools.processLogContents ### -->
   * processLogContents
   *
   * - `LogTools.processLogContents`
   * - `processLogContents`
   *
   * Process an item to be logged
   */
  export const processLogContents = (prefix: string, wrapper: Function = fn.noact, ...args: any[]): string =>
    args
      .map(getLogStr)
      .join(' ')
      .split('\n')
      .map((line, index) => chalk.bold(index ? ' '.repeat(prefix.length) : prefix) + ' ' + wrapper(line))
      .join('\n');

  /**<!-- DOCS: LogTools.getLog ### -->
   * getLog
   *
   * - `LogTools.getLog`
   * - `getLog`
   *
   * Get a log function for a given prefix
   */
  export const getLog =
    (prefix: string, wrapper: Function = fn.noact) =>
    (...args: any[]) => {
      console.log(processLogContents(prefix, wrapper, ...args));
    };
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

/**<!-- DOCS-ALIAS: LogTools.getLogStr -->*/
export const getLogStr = LogTools.getLogStr;

/**<!-- DOCS-ALIAS: LogTools.processLogContents -->*/
export const processLogContents = LogTools.processLogContents;

/**<!-- DOCS-ALIAS: LogTools.getLog -->*/
export const getLog = LogTools.getLog;
