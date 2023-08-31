import chalk from 'chalk';
import { ChalkFn } from '../utils/ChalkFn';
import { chlk } from './chlk';

//<!-- DOCS: 600 -->
/**<!-- DOCS: clr ##! -->
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
export namespace clr {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: clr.hl1 ### -->
   * hl1
   *
   * - `clr.hl1`
   *
   * Highlight 1
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const hl1 = chalk.yellowBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.hl2 ### -->
   * hl2
   *
   * - `clr.hl2`
   *
   * Highlight 2
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const hl2 = chalk.yellow as unknown as ChalkFn;

  /**<!-- DOCS: clr.approve ### -->
   * approve
   *
   * - `clr.approve`
   *
   * Approval colour (green)
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const approve = chalk.green.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.create ### -->
   * create
   *
   * - `clr.create`
   *
   * Create colour (greenBright)
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const create = chalk.greenBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.update ### -->
   * update
   *
   * - `clr.update`
   *
   * Update colour (yellow)
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const update = chalk.yellow.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.remove ### -->
   * remove
   *
   * - `clr.remove`
   *
   * Remove/delete colour (red)
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const remove = chalk.redBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.removeAll ### -->
   * removeAll
   *
   * - `clr.removeAll`
   *
   * Remove/delete all colour (red)
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const removeAll = chalk.redBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.blue ### -->
   * blue
   *
   * - `clr.blue`
   *
   * Alias for chalk.blueBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const blue = chalk.blueBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.cyan ### -->
   * cyan
   *
   * - `clr.cyan`
   *
   * Alias for chalk.cyanBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const cyan = chalk.cyanBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.green ### -->
   * green
   *
   * - `clr.green`
   *
   * Alias for chalk.greenBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const green = chalk.greenBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.magenta ### -->
   * magenta
   *
   * - `clr.magenta`
   *
   * Alias for chalk.magentaBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const magenta = chalk.magentaBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.red ### -->
   * red
   *
   * - `clr.red`
   *
   * Alias for chalk.redBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const red = chalk.redBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.yellow ### -->
   * yellow
   *
   * - `clr.yellow`
   *
   * Alias for chalk.yellowBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const yellow = chalk.yellowBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t1 ### -->
   * t1
   *
   * - `clr.t1`
   *
   * Theme 1
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const t1 = chalk.yellowBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t2 ### -->
   * t2
   *
   * - `clr.t2`
   *
   * Theme 2
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const t2 = chalk.magentaBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t3 ### -->
   * t3
   *
   * - `clr.t3`
   *
   * Theme 3
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const t3 = chalk.blueBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t4 ### -->
   * t4
   *
   * - `clr.t4`
   *
   * Theme 4
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const t4 = chalk.redBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t5 ### -->
   * t5
   *
   * - `clr.t5`
   *
   * Theme 5
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const t5 = chalk.greenBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t6 ### -->
   * t6
   *
   * - `clr.t6`
   *
   * Theme 6
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const t6 = chalk.cyanBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.gray0 ### -->
   * gray0
   *
   * - `chlk.gray0`
   * - `clr.gray0`
   *
   * Gray 0 (0-5). Equivalent to chalk.black
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray0 = chlk.gray0;

  /**<!-- DOCS: clr.gray1 ### -->
   * gray1
   *
   * - `chlk.gray1`
   * - `clr.gray1`
   *
   * Gray 1 (0-5). Equivalent to chalk.gray.dim
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray1 = chlk.gray1;

  /**<!-- DOCS: clr.gray2 ### -->
   * gray2
   *
   * - `chlk.gray2`
   * - `clr.gray2`
   *
   * Gray 2 (0-5). Equivalent to chalk.white.dim
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray2 = chlk.gray2;

  /**<!-- DOCS: clr.gray3 ### -->
   * gray3
   *
   * - `chlk.gray3`
   * - `clr.gray3`
   *
   * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray3 = chlk.gray3;

  /**<!-- DOCS: clr.gray4 ### -->
   * gray4
   *
   * - `chlk.gray4`
   * - `clr.gray4`
   *
   * Gray 4 (0-5). Equivalent to chalk.white
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray4 = chlk.gray4;

  /**<!-- DOCS: clr.gray5 ### -->
   * gray5
   *
   * - `chlk.gray5`
   * - `clr.gray5`
   *
   * Gray 5 (0-5). Equivalent to chalk.whiteBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray5 = chlk.gray5;
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

export type Colour = keyof typeof clr;
