import chalk from 'chalk';
import { ChalkFn } from '../utils/ChalkFn';

//<!-- DOCS: 500 -->
/**<!-- DOCS: chlk.chlk ##! -->
 * chlk
 *
 * A collection of colours and styles for use in the console.
 */
export namespace chlk {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: chlk.gray0 ### -->
   * gray0
   *
   * - `chlk.gray0`
   * - `clr.gray0`
   *
   * Gray 0 (0-5). Equivalent to chalk.black
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray0 = chalk.black as unknown as ChalkFn;

  /**<!-- DOCS: chlk.gray1 ### -->
   * gray1
   *
   * - `chlk.gray1`
   * - `clr.gray1`
   *
   * Gray 1 (0-5). Equivalent to chalk.gray.dim
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray1 = chalk.gray.dim as unknown as ChalkFn;

  /**<!-- DOCS: chlk.gray2 ### -->
   * gray2
   *
   * - `chlk.gray2`
   * - `clr.gray2`
   *
   * Gray 2 (0-5). Equivalent to chalk.white.dim
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray2 = chalk.white.dim as unknown as ChalkFn;

  /**<!-- DOCS: chlk.gray3 ### -->
   * gray3
   *
   * - `chlk.gray3`
   * - `clr.gray3`
   *
   * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray3 = chalk.whiteBright.dim as unknown as ChalkFn;

  /**<!-- DOCS: chlk.gray4 ### -->
   * gray4
   *
   * - `chlk.gray4`
   * - `clr.gray4`
   *
   * Gray 4 (0-5). Equivalent to chalk.white
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray4 = chalk.white as unknown as ChalkFn;

  /**<!-- DOCS: chlk.gray5 ### -->
   * gray5
   *
   * - `chlk.gray5`
   * - `clr.gray5`
   *
   * Gray 5 (0-5). Equivalent to chalk.whiteBright
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const gray5 = chalk.whiteBright as unknown as ChalkFn;

  /**<!-- DOCS: chlk.grays ### -->
   * grays
   *
   * - `chlk.grays`
   *
   * Grays between 0 and 5.
   *
   * ```typescript
   * grays[2]; // gray2
   * ```
   * @param {...string} args Strings to be styled
   * @returns {string} Styled string
   */
  export const grays: ChalkFn[] = [
    // grays
    gray0,
    gray1,
    gray2,
    gray3,
    gray4,
    gray5
  ];

  /**<!-- DOCS: chlk.gray ### @ -->
   * gray
   *
   * - `chlk.gray`
   *
   * Grays between 0 and 5.
   *
   * ```typescript
   * gray(2); // gray2
   * ```
   */
  export const gray = (num: number) => grays[Math.max(0, Math.min(num, grays.length - 1))];

  /**<!-- DOCS: chlk.clear ### @ -->
   * clear
   *
   * - `chlk.clear`
   *
   * Removes ANSI colours. Not same as chalk.reset
   */
  export const clear = (str: string) => str.replace(new RegExp(`\\u001b\[[0-9]+m`, 'g'), '');

  /**<!-- DOCS: chlk.not ### @ -->
   * not
   *
   * - `chlk.not`
   *
   * Stops and restarts a style around a given string
   */
  export const not = (style: Function) => {
    const styled = style('**xxx**');
    const [after, before] = styled.split('**xxx**');
    return (item: string) => `${before}${item}${after}`;
  };

  /**<!-- DOCS: chlk.notUnderlined ### -->
   * notUnderlined
   *
   * - `chlk.notUnderlined`
   *
   * Dont underline a section of text
   */
  export const notUnderlined = not(chalk.underline);
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
