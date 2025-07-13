import { ArrayTools } from 'swiss-ak';

import { out } from './out';
import { colr } from './colr';
import { progressBar } from './progressBar';

//<!-- DOCS: 899 -->
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
   * @param {progressBar.ProgressBarOptions} opts
   * @param {boolean} [randomise=false]
   * @returns {(prefix?: string, override?: any, resetColours?: boolean) => any}
   */
  export const getColouredProgressBarOpts = (opts: progressBar.ProgressBarOptions, randomise: boolean = false) => {
    // let wrapperFns = [colr.blue, colr.cyan, colr.green, colr.yellow, colr.magenta, colr.red];
    // let wrapperFns = [colr.yellow, colr.dark.magenta];
    let wrapperFns = [colr.yellow, colr.dark.magenta, colr.blue, colr.cyan, colr.green, colr.red];
    if (randomise) {
      wrapperFns = ArrayTools.randomise(wrapperFns);
    }
    let index = 0;
    return (prefix: string = '', override: progressBar.ProgressBarOptions = {}, resetColours: boolean = false): progressBar.ProgressBarOptions => {
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
