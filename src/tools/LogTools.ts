import { inspect } from 'util';
import chalk from 'chalk';
import { fn } from 'swiss-ak';

//<!-- DOCS: 600 -->
/**<!-- DOCS: ## -->
 * LogTools
 *
 * A collection of tools for logging
 */

/**<!-- DOCS: ### -->
 * getLogStr
 *
 * - `LogTools.getLogStr`
 * - `getLogStr`
 *
 * Get a string for a given object as it would be printed by console.log
 */
export const getLogStr = (item: any): string => {
  const inspectList = ['object', 'boolean', 'number'];
  if (inspectList.includes(typeof item) && !(item instanceof Date)) {
    return inspect(item, { colors: false, depth: null });
  } else {
    return item + '';
  }
};

/**<!-- DOCS: ### -->
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

/**<!-- DOCS: ### -->
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
