import chalk from 'chalk';
import { ArrayTools, ProgressBarOptions } from 'swiss-ak';

import { out } from './out';

//<!-- DOCS: 800 -->
/**<!-- DOCS: progressBarTools ##! -->
 * progressBarTools
 *
 * A collection of tools for working with progress bars (from swiss-ak)
 */
export namespace progressBarTools {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: progressBarTools.getColouredProgressBarOpts ### @ -->
   * getColouredProgressBarOpts
   *
   * - `progressBarTools.getColouredProgressBarOpts`
   *
   * Helper for providing a consistent set of options for a progress bar, and colouring them appropriately
   *
   * ```typescript
   * const progOpts = progressBarTools.getColouredProgressBarOpts({
   *   showCount: true,
   *   showPercent: true,
   * });
   * // later...
   * const progressBar = getProgressBar(numThings, progOpts('Things'));
   * progressBar.update();
   * ```
   */
  export const getColouredProgressBarOpts = (opts: ProgressBarOptions, randomise: boolean = false) => {
    // let wrapperFns = [chalk.blueBright, chalk.cyanBright, chalk.greenBright, chalk.yellowBright, chalk.magentaBright, chalk.redBright];
    // let wrapperFns = [chalk.yellowBright, chalk.magenta];
    let wrapperFns = [chalk.yellowBright, chalk.magenta, chalk.blueBright, chalk.cyanBright, chalk.greenBright, chalk.redBright];
    if (randomise) {
      wrapperFns = ArrayTools.randomise(wrapperFns);
    }
    let index = 0;
    return (prefix: string = '', override: ProgressBarOptions = {}, resetColours: boolean = false): ProgressBarOptions => {
      if (resetColours) {
        index = 0;
      }
      const result = {
        ...opts,
        prefix,
        ...override
      };
      if (!result.wrapperFn) {
        result.wrapperFn = wrapperFns[index % wrapperFns.length];
        index++;
      }

      if (result.prefix && result.prefixWidth) {
        result.prefix = out.truncate(result.prefix, result.prefixWidth, '…');
      }

      return result;
    };
  };
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
