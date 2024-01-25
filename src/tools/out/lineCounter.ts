import { StringTools } from 'swiss-ak';
import { getLogStr } from '../LogTools';
import { out } from '../out';
import { ansi } from './ansi';
//<!-- DOCS: 260 -->

/**<!-- DOCS: out.getLineCounter ### -->
 * getLineCounter
 *
 * - `out.getLineCounter`
 * - `getLineCounter`
 *
 * Get line counter for counter output lines
 *
 * ```typescript
 * const lc = getLineCounter();
 * lc.log('hello'); // 1
 * lc.wrap(undefined, () => console.log('a single line')); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 * @returns {LineCounter}
 */
export const getLineCounter = (): LineCounter => {
  let lineCount: number = 0;
  const checkpoints: { [checkpointID: string]: number } = {};

  const log = (...args: any[]): number => {
    const output = args.map(getLogStr).join(' ');
    const added = out.utils.getNumLines(output);
    lineCount += added;
    console.log(output);
    return added;
  };

  const move = (lines: number) => {
    if (lines > 0) {
      log('\n'.repeat(lines - 1));
    }
    if (lines < 0) {
      clearBack(-lines);
    }
  };

  const wrap = <T = any, A = any>(newLines: number = 1, func: (...args: A[]) => T | number, ...args: A[]): T => {
    const result = func(...args);
    lineCount += newLines;
    return result as T;
  };

  const add = (newLines: number): void => {
    lineCount += newLines;
  };

  const get = (): number => {
    return lineCount;
  };

  const getSince = (checkpointID: string): number => {
    const checkpointValue = checkpoints[checkpointID];
    if (checkpointValue === undefined) return 0;
    const diff = lineCount - checkpointValue;
    return diff > 0 ? diff : 0;
  };

  const checkpoint = (checkpointID: string = StringTools.randomId()): string => {
    checkpoints[checkpointID] = lineCount;
    return checkpointID;
  };

  const clearToCheckpoint = (checkpointID: string): void => {
    const checkpointValue = checkpoints[checkpointID];
    if (checkpointValue === undefined) return;
    const diff = lineCount - checkpointValue;
    if (diff > 0) {
      clearBack(diff);
    }
  };

  const clearBack = (linesToMoveBack: number, limitToRecordedLines: boolean = true): void => {
    if (limitToRecordedLines) linesToMoveBack = Math.min(lineCount, linesToMoveBack);
    out.moveUp(linesToMoveBack);
    lineCount -= linesToMoveBack;
  };

  const clear = (): void => {
    out.moveUp(lineCount);
    lineCount = 0;
  };

  const ansiFns = {
    move: (lines: number): string => {
      if (lines > 0) {
        add(lines);
        return '\n'.repeat(lines - 1);
      }
      if (lines < 0) {
        return ansiFns.clearBack(-lines);
      }
    },
    clearToCheckpoint: (checkpointID: string): string => {
      const checkpointValue = checkpoints[checkpointID];
      if (checkpointValue === undefined) return;
      const diff = lineCount - checkpointValue;
      if (diff > 0) {
        return ansiFns.clearBack(diff);
      }
      return '';
    },

    clearBack: (linesToMoveBack: number, limitToRecordedLines: boolean = true): string => {
      if (limitToRecordedLines) linesToMoveBack = Math.min(lineCount, linesToMoveBack);
      const result = ansi.erase.lines(linesToMoveBack);
      lineCount -= linesToMoveBack;
      return result;
    },

    clear: (): string => {
      const result = ansi.erase.lines(lineCount);
      lineCount = 0;
      return result;
    }
  };

  const lc: LineCounter = {
    log,
    move,
    wrap,
    add,
    get,
    getSince,
    checkpoint,
    clearToCheckpoint,
    clear,
    clearBack,
    ansi: ansiFns
  };
  return lc;
};

/**<!-- DOCS: out.LineCounter #### -->
 * LineCounter
 *
 * - `out.LineCounter`
 * - `LineCounter`
 *
 * Return type for getLineCounter
 *
 * ```typescript
 * const lc = getLineCounter();
 * lc.log('hello'); // 1
 * lc.wrap(1, () => console.log('a single line')); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 */
export interface LineCounter {
  /**<!-- DOCS: out.LineCounter.log ##### -->
   * lc.log
   *
   * Same as console.log, but adds to the lc counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * ```
   * @param {...any} args The arguments to log
   * @returns {number} The number of lines added
   */
  log(...args: any[]): number;

  /**<!-- DOCS: out.LineCounter.move ##### -->
   * lc.move
   *
   * Moves the cursor down by a given number of lines
   *
   * Can be negative to move up
   *
   * @param {number} lines The number of lines to move
   * @returns {void}
   */
  move(lines: number): void;

  /**<!-- DOCS: out.LineCounter.wrap ##### -->
   * lc.wrap
   *
   * Wraps a function, and adds a given number to the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.wrap(1, () => console.log('a single line')); // 1
   * ```
   * @param {number} newLines The number of lines to add
   * @param {(...args: A[]) => number | T} func The function to wrap
   * @param {...A} args The arguments to pass to the function
   * @returns {T} The result of the function
   */
  wrap: <T = any, A = any>(newLines: number, func: (...args: A[]) => number | T, ...args: A[]) => T;

  /**<!-- DOCS: out.LineCounter.add ##### -->
   * lc.add
   *
   * Adds a given number to the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.add(1);
   * ```
   * @param {number} newLines The number of lines to add
   * @returns {void}
   */
  add(newLines: number): void;

  /**<!-- DOCS: out.LineCounter.get ##### -->
   * lc.get
   *
   * returns the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.wrap(1, () => console.log('a single line')); // 1
   * lc.add(1);
   * lc.get(); // 3
   * ```
   * @returns {number} The line counter
   */
  get(): number;

  /**<!-- DOCS: out.LineCounter.getSince ##### -->
   * lc.getSince
   *
   * Returns the number of lines since a given checkpoint
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.checkpoint('test-a');
   * lc.wrap(1, () => console.log('a single line')); // 1
   * lc.checkpoint('test-b');
   * lc.add(1);
   * lc.getSince('test-a'); // 2
   * lc.getSince('test-b'); // 1
   * ```
   * @param {string} checkpointID The checkpoint to check
   * @returns {number} The number of lines since the checkpoint
   */
  getSince(checkpointID: string): number;

  /**<!-- DOCS: out.LineCounter.clear ##### -->
   * lc.clear
   *
   * clears the line counter, and moves the cursor up by the value of the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.clear();
   * ```
   * @returns {void}
   */
  clear(): void;

  /**<!-- DOCS: out.LineCounter.clearBack ##### -->
   * lc.clearBack
   *
   * Clears a given number of lines, and updates the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('line 1'); // 1
   * lc.log('line 2'); // 1
   * lc.log('line 3'); // 1
   * lc.log('line 4'); // 1
   * lc.clearBack(2); // ('line 3' and 'line 4' are cleared)
   * ```
   * @param {number} linesToMoveBack The number of lines to clear
   * @param {boolean} [limitToRecordedLines] Whether to limit the number of lines to clear to the number of lines recorded
   * @returns {void}
   */
  clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): void;

  /**<!-- DOCS: out.LineCounter.checkpoint ##### -->
   * lc.checkpoint
   *
   * Records a 'checkpoint' that can be returned to later
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.checkpoint('test-a');
   * lc.wrap(1, () => console.log('a single line')); // 1
   * lc.checkpoint('test-b');
   * lc.add(1);
   * lc.getSince('test-a'); // 2
   * lc.getSince('test-b'); // 1
   * ```
   * @param {string} [checkpointID] The checkpoint to record
   * @returns {string} The checkpointID
   */
  checkpoint(checkpointID?: string): string;

  /**<!-- DOCS: out.LineCounter.clearToCheckpoint ##### -->
   * lc.clearToCheckpoint
   *
   * Clear lines up to a previously recorded checkpoint
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('line 1'); // 1
   * lc.log('line 2'); // 1
   * lc.checkpoint('test');
   * lc.log('line 3'); // 1
   * lc.log('line 4'); // 1
   * lc.clearToCheckpoint('test'); // ('line 3' and 'line 4' are cleared)
   * ```
   * @param {string} checkpointID The checkpoint to clear to
   * @returns {void}
   */
  clearToCheckpoint(checkpointID: string): void;

  /**<!-- DOCS: out.LineCounter.ansi ##### -->
   * lc.ansi
   *
   * Get ansi codes for clear/erase functions, and update the line counter in the process.
   */
  ansi: {
    /**<!-- DOCS: out.LineCounter.ansi.move ###### -->
     * lc.move
     *
     * Moves the cursor up by a given number of lines
     * @param {number} lines The number of lines to move
     * @returns {string}
     */
    move(lines: number): string;

    /**<!-- DOCS: out.LineCounter.ansi.clear ###### -->
     * lc.clear
     *
     * clears the line counter, and moves the cursor up by the value of the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * process.stdout.write(lc.ansi.clear());
     * ```
     * @returns {string}
     */
    clear(): string;

    /**<!-- DOCS: out.LineCounter.ansi.clearBack ###### -->
     * lc.clearBack
     *
     * Clears a given number of lines, and updates the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('line 1'); // 1
     * lc.log('line 2'); // 1
     * lc.log('line 3'); // 1
     * lc.log('line 4'); // 1
     * process.stdout.write(lc.ansi.clearBack(2)); // ('line 3' and 'line 4' are cleared)
     * ```
     * @param {number} linesToMoveBack The number of lines to clear
     * @param {boolean} [limitToRecordedLines] Whether to limit the number of lines to clear to the number of lines recorded
     * @returns {string}
     */
    clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): string;

    /**<!-- DOCS: out.LineCounter.ansi.clearToCheckpoint ###### -->
     * lc.clearToCheckpoint
     *
     * Clear lines up to a previously recorded checkpoint
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('line 1'); // 1
     * lc.log('line 2'); // 1
     * lc.checkpoint('test');
     * lc.log('line 3'); // 1
     * lc.log('line 4'); // 1
     * process.stdout.write(lc.ansi.clearToCheckpoint('test')); // ('line 3' and 'line 4' are cleared)
     * ```
     * @param {string} checkpointID The checkpoint to clear to
     * @returns {string}
     */
    clearToCheckpoint(checkpointID: string): string;
  };
}
