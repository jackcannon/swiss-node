import { inspect } from 'util';
import { fn } from 'swiss-ak';
import { colr } from './colr';

//<!-- DOCS: 600 -->
/**<!-- DOCS: LogTools ##! -->
 * LogTools
 *
 * A collection of tools for logging
 */
export namespace LogTools {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: LogTools.getLogStr ### @ -->
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
   * @param {any} item
   * @returns {string}
   */
  export const getLogStr = (item: any): string => {
    const inspectList = ['object', 'boolean', 'number'];
    if (inspectList.includes(typeof item) && !(item instanceof Date)) {
      return inspect(item, { colors: true, depth: 3, compact: false });
    } else {
      return item + '';
    }
  };

  /**<!-- DOCS: LogTools.processLogContents ### @ -->
   * processLogContents
   *
   * - `LogTools.processLogContents`
   * - `processLogContents`
   *
   * Process an item to be logged
   *
   * ```typescript
   * LogTools.processLogContents('prefix:', colr.bold); // 'prefix: hello'
   * ```
   * @param {string} prefix
   * @param {Function} [wrapper=fn.noact]
   * @param {...any} [args]
   * @returns {string}
   */
  export const processLogContents = (prefix: string, wrapper: Function = fn.noact, ...args: any[]): string =>
    args
      .map(getLogStr)
      .join(' ')
      .split('\n')
      .map((line, index) => colr.bold(index ? ' '.repeat(prefix.length) : prefix) + ' ' + wrapper(line))
      .join('\n');

  /**<!-- DOCS: LogTools.getLog ### @ -->
   * getLog
   *
   * - `LogTools.getLog`
   * - `getLog`
   *
   * Get a log function for a given prefix
   *
   * ```typescript
   * const log = LogTools.getLog('prefix:');
   * log('hello'); // 'prefix: hello'
   * ```
   * @param {string} prefix
   * @param {Function} [wrapper=fn.noact]
   * @returns {(...args: any[]) => void}
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
