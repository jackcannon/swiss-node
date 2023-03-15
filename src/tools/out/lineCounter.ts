import { getLogStr } from '../LogTools';
import * as out from '../out';

//<!-- DOCS: 260 -->

const randomID = () => Math.random().toString(36).substring(2);

/**<!-- DOCS: ### -->
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
 * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 */
export const getLineCounter = (): LineCounter => {
  let lineCount: number = 0;
  const checkpoints: { [checkpointID: string]: number } = {};

  const log = (...args: any[]): number => {
    const added = out.utils.getNumLines(args.map(getLogStr).join(' '));
    lineCount += added;
    console.log(...args);
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

  const checkpoint = (checkpointID: string = randomID()): string => {
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
    clearBack
  };
  return lc;
};

/**<!-- DOCS: #### -->
 * LineCounter
 *
 * - `out.LineCounter`
 * - `LineCounter`
 *
 * Return type for getLineCounter
 */
export interface LineCounter {
  /**<!-- DOCS: ##### -->
   * lc.log
   *
   * Same as console.log, but adds to the lc counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
   * lc.add(1);
   * lc.get(); // 3
   * lc.clear();
   * ```
   */
  log(...args: any[]): number;

  /**<!-- DOCS: ##### -->
   * move
   *
   * Moves the cursor up by a given number of lines
   */
  move(lines: number): void;

  /**<!-- DOCS: ##### -->
   * lc.wrap
   *
   * Wraps a function, and adds a given number to the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
   * lc.add(1);
   * lc.get(); // 3
   * lc.clear();
   * ```
   */
  wrap: <T = any, A = any>(newLines: number, func: (...args: A[]) => number | T, ...args: A[]) => T;

  /**<!-- DOCS: ##### -->
   * lc.add
   *
   * Adds a given number to the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
   * lc.add(1);
   * lc.get(); // 3
   * lc.clear();
   * ```
   */
  add(newLines: number): void;

  /**<!-- DOCS: ##### -->
   * lc.get
   *
   * returns the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
   * lc.add(1);
   * lc.get(); // 3
   * lc.clear();
   * ```
   */
  get(): number;

  /**<!-- DOCS: ##### -->
   * getSince
   *
   * Returns the number of lines since a given checkpoint
   */
  getSince(checkpointID: string): number;

  /**<!-- DOCS: ##### -->
   * lc.clear
   *
   * clears the line counter, and moves the cursor up by the value of the line counter
   *
   * ```typescript
   * const lc = getLineCounter();
   * lc.log('hello'); // 1
   * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
   * lc.add(1);
   * lc.get(); // 3
   * lc.clear();
   * ```
   */
  clear(): void;

  /**<!-- DOCS: ##### -->
   * lc.clearBack
   *
   * Clears a given number of lines, and updates the line counter
   */
  clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): void;

  /**<!-- DOCS: ##### -->
   * lc.checkpoint
   *
   * Records a 'checkpoint' that can be returned to later
   */
  checkpoint(checkpointID?: string): string;

  /**<!-- DOCS: ##### -->
   * lc.clearToCheckpoint
   *
   * Clear lines up to a previously recorded checkpoint
   */
  clearToCheckpoint(checkpointID: string): void;
}
