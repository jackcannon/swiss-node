import { ArrayTools, fn, ObjectTools, QueueManager, safe, wait } from 'swiss-ak';
import { option, optionalOption } from '../utils/optionUtils';
import { out } from './out';

//<!-- DOCS: 800 -->

/**
 * Returned by `getProgressBar`
 */
export interface ProgressBar {
  /** <!-- DOCS-ALIAS: progressBar.progressBar.next  --> */
  next: () => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.set  --> */
  set: (newCurrent: number) => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.reset  --> */
  reset: () => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.getBar  --> */
  getBar: (applyWrap?: boolean) => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.update  --> */
  update: () => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.start  --> */
  start: () => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.finish  --> */
  finish: () => string;
  /** <!-- DOCS-ALIAS: progressBar.progressBar.max  --> */
  readonly max: number;
}

// Used internally only
interface ProgressBarManagerPackage {
  bar: ManagedProgressBar;
  isFinished: boolean;
  lastOutput: string;
  fullOptions: progressBar.ProgressBarOptionsFull;
  onUpdate: (outputLine: string) => void;
  onStart: () => void;
  onFinish: () => void;
  onSet: (value: number) => void;
  onNext: (value: number) => void;
}

// Used internally only
interface ManagedProgressBar extends ProgressBar {
  _registerManager: (pack: ProgressBarManagerPackage, overrideOptions: progressBar.ProgressBarOptions) => progressBar.ProgressBarOptionsFull;
  _unregisterManager: (pack: ProgressBarManagerPackage) => void;
}

/**
 * Returned by `getMultiBarManager`
 */
export interface MultiBarManager {
  /** <!-- DOCS-ALIAS: progressBar.MultiBarManager.add  --> */
  add: (bar: ProgressBar, removeWhenFinished?: boolean) => void;
  /** <!-- DOCS-ALIAS: progressBar.MultiBarManager.addNew  --> */
  addNew: (max?: number, options?: progressBar.ProgressBarOptions) => ProgressBar;
  /** <!-- DOCS-ALIAS: progressBar.MultiBarManager.remove  --> */
  remove: (bar: ProgressBar) => void;
  /** <!-- DOCS-ALIAS: progressBar.MultiBarManager.update  --> */
  update: () => void;
  /** <!-- DOCS-ALIAS: progressBar.MultiBarManager.getBars  --> */
  getBars: () => ProgressBar[];
}

/**<!-- DOCS: progressBar ##! -->
 * progressBar
 *
 * A progress bar that can be used in the terminal.
 */
export namespace progressBar {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  const getCharWidth = (num: number, max: number, width: number) => Math.round(width * (Math.max(0, Math.min(num / max, 1)) / 1));
  const getBarString = (current: number, max: number, width: number, opts: ProgressBarOptionsFull) => {
    const { progChar, emptyChar, startChar, endChar, showCurrent, currentChar } = opts;
    const numProgChars = getCharWidth(current, max, width);
    const numNextChars = getCharWidth(current + 1, max, width);
    const numCurrentChars = showCurrent ? numNextChars - numProgChars : 0;
    const numEmptyChars = width - numProgChars - numCurrentChars;

    const prog = opts.barProgWrapFn(progChar.repeat(numProgChars));
    const curr = opts.barCurrentWrapFn(currentChar.repeat(numCurrentChars));
    const empt = opts.barEmptyWrapFn(emptyChar.repeat(numEmptyChars));

    const body = opts.barWrapFn(`${prog}${curr}${empt}`);

    return `${startChar}${body}${endChar}`;
  };

  const getSuffix = (current: number, maxNum: number, isMaxKnown: boolean, opts: ProgressBarOptionsFull) => {
    let plainItems: string[] = [];
    let wrappedItems: string[] = [];
    if (opts.showCount) {
      const pad = Math.max(maxNum.toString().length, opts.countWidth);
      const countSuff = `[${current.toString().padStart(pad, ' ')} / ${(isMaxKnown ? maxNum.toString() : '?').padStart(pad, ' ')}]`;
      plainItems.push(countSuff);
      wrappedItems.push(opts.countWrapFn(countSuff));
    }
    if (opts.showPercent) {
      const percent = Math.round((current / Math.max(1, maxNum)) * 100);
      const percentSuff = `(${percent.toString().padStart('100'.toString().length, ' ')}%)`;
      plainItems.push(percentSuff);
      wrappedItems.push(opts.percentWrapFn(percentSuff));
    }
    const plain = plainItems.filter((x) => x).join(' ');
    const wrapped = wrappedItems.filter((x) => x).join(' ');
    return [plain.length ? ' ' + plain : '', wrapped.length ? ' ' + wrapped : ''];
  };

  /**<!-- DOCS: progressBar.progressBarHeading ### -->
   * Progress Bar
   */

  /**<!-- DOCS: progressBar.getProgressBar #### @ -->
   * getProgressBar
   *
   * - `getProgressBar`
   * - `progressBar.getProgressBar`
   *
   * Usage:
   * ```typescript
   * import chalk from 'chalk'
   * import {getProgressBar} from 'swiss-ak';
   *
   * console.log('-'.repeat(20) + ' < 20 Chars');
   *
   * const progress = getProgressBar(5, {
   *   prefix: 'ABC',
   *   maxWidth: 20,
   *   chalk,
   *   wrapperFn: chalk.green
   * });
   * for (let i = 1; i <= 5; i++) {
   *   progress.set(i);
   * }
   * progress.finish();
   * ```
   *
   * Output:
   * ```
   * -------------------- < 20 Chars
   * ABC ▕      ▏ [0 / 5]
   * ABC ▕█     ▏ [1 / 5]
   * ABC ▕██    ▏ [2 / 5]
   * ABC ▕████  ▏ [3 / 5]
   * ABC ▕█████ ▏ [4 / 5]
   * ABC ▕██████▏ [5 / 5]
   * ```
   * @param {number} [max]
   * @param {progressBar.ProgressBarOptions} [options={}]
   * @returns {ProgressBar}
   */
  export const getProgressBar = (max?: number, options: progressBar.ProgressBarOptions = {}): ProgressBar => {
    const args = {
      max: safe.num(max, true, -1, undefined, -1),
      options: safe.obj(options, false, {})
    };
    const originalOpts = getFullOptions(args.options);
    let opts = originalOpts;
    let managerPackage: ProgressBarManagerPackage = undefined;
    let current = 0;
    let finished = false;

    const isMaxKnown = args.max !== -1;

    /**<!-- DOCS: progressBar.progressBar.getBar ##### -->
     * getBar
     *
     * - `getProgressBar().getBar`
     *
     * Get the output string of the progress bar
     *
     * @param {boolean} [applyWrap=false] Whether or not to apply the wrapperFn to the output
     * @returns {string} The output string
     */
    const getBar = (applyWrap: boolean = false): string => {
      const [suffix, suffixWrapped] = getSuffix(current, args.max, isMaxKnown, opts);

      const idealMinBarWidth = Math.min(5, opts.maxWidth - [suffix, opts.startChar, opts.endChar].join('').length);
      const maxPrefixWidth =
        opts.maxPrefixWidth !== Infinity
          ? opts.maxPrefixWidth
          : opts.maxWidth - ([suffix, opts.startChar, opts.endChar].join('').length + idealMinBarWidth);

      const fullPrefix = opts.prefix.padEnd(opts.prefixWidth).substring(0, maxPrefixWidth);

      const barString = getBarString(
        current,
        Math.max(1, args.max),
        Math.max(0, opts.maxWidth - [fullPrefix, suffix, opts.startChar, opts.endChar].join('').length),
        opts
      );
      const output = `${opts.prefixWrapFn(fullPrefix)}${barString}${suffixWrapped}`;

      if (applyWrap) return opts.wrapperFn(output);
      return output;
    };

    /**<!-- DOCS: progressBar.progressBar.update ##### -->
     * update
     *
     * - `getProgressBar().update`
     *
     * Trigger the progress bar to update/rerender
     *
     * @returns {string} The output string
     */
    const update = (): string => {
      const output = getBar(true);
      if (managerPackage) {
        // managed progress bar
        managerPackage.onUpdate(output);
      } else {
        // stand-alone progress bar
        if (opts.print) opts.printFn(output);
      }
      return output;
    };

    /**<!-- DOCS: progressBar.progressBar.next ##### -->
     * next
     *
     * - `getProgressBar().next`
     *
     * Set the progress bar to the next value
     * @returns {string} The output string
     */
    const next = (): string => {
      if (finished) return '';
      current++;

      if (managerPackage) {
        // managed progress bar
        managerPackage.onNext(current);
      }

      return update();
    };

    /**<!-- DOCS: progressBar.progressBar.set ##### -->
     * set
     *
     * - `getProgressBar().set`
     *
     * Set the progress bar to a specific value
     * @param {number} newCurrent
     * @returns {string} The output string
     */
    const set = (newCurrent: number): string => {
      const args = {
        newCurrent: safe.num(newCurrent, true, 0, undefined)
      };
      if (finished) return '';
      current = args.newCurrent;

      if (managerPackage) {
        // managed progress bar
        managerPackage.onSet(args.newCurrent);
      }

      return update();
    };

    /**<!-- DOCS: progressBar.progressBar.reset ##### -->
     * reset
     *
     * - `getProgressBar().reset`
     *
     * Set the progress bar to 0
     * @returns {string} The output string
     */
    const reset = (): string => {
      return set(0);
    };

    /**<!-- DOCS: progressBar.progressBar.start ##### -->
     * start
     *
     * - `getProgressBar().start`
     *
     * Start displaying the progress bar
     * @returns {string} The output string
     */
    const start = (): string => {
      if (finished) return '';

      if (managerPackage) {
        // managed progress bar
        managerPackage.onStart();
      } else {
        // stand-alone progress bar
        if (opts.print) opts.printFn(); // blank/new line
      }

      return update();
    };

    /**<!-- DOCS: progressBar.progressBar.finish ##### -->
     * finish
     *
     * - `getProgressBar().finish`
     *
     * Stop displaying the progress bar
     * @returns {string} The output string
     */
    const finish = (): string => {
      finished = true;
      const output = update();

      if (managerPackage) {
        // managed progress bar
        managerPackage.onFinish();
      } else {
        // stand-alone progress bar
        if (opts.print) opts.printFn(); // blank/new line
      }

      return output;
    };

    const _registerManager: ManagedProgressBar['_registerManager'] = (
      pack: ProgressBarManagerPackage,
      overrideOptions: progressBar.ProgressBarOptions
    ): progressBar.ProgressBarOptionsFull => {
      managerPackage = pack;
      if (Object.keys(overrideOptions).length) {
        opts = getFullOptions({
          ...originalOpts,
          ...overrideOptions
        });
      }
      return opts;
    };
    const _unregisterManager: ManagedProgressBar['_unregisterManager'] = (pack: ProgressBarManagerPackage) => {
      managerPackage = undefined;
      opts = originalOpts;
    };

    return {
      next,
      set,
      reset,
      getBar,
      update,
      start,
      finish,

      /**<!-- DOCS: progressBar.progressBar.max ##### -->
       * max
       *
       * - `getProgressBar().max`
       *
       * Readonly number value of the max value (provided to getProgressBar as first argument)
       */
      max: args.max === -1 ? undefined : args.max,

      _registerManager, // hidden method for use by manager
      _unregisterManager // hidden method for use by manager
    } as ProgressBar;
  };

  /**
   * Same as `ProgressBarOptions` but with all properties required.
   *
   * Use `ProgressBarOptions` when possible.
   */
  export interface ProgressBarOptionsFull {
    /**
     * String to show to left of progress bar
     *
     * Default: `''`
     */
    prefix: string;
    /**
     * Min width of prefix
     *
     * Default: `0`
     */
    prefixWidth: number;
    /**
     * Max width of prefix
     *
     * Default: `Infinity`
     */
    maxPrefixWidth: number;
    /**
     * The maximum width the entire string may extend
     *
     * Default: `process.stdout.columns` or `100`
     */
    maxWidth: number;
    /**
     * Function to wrap the printed string (eg `chalk.cyan)`
     *
     * Default: nothing
     */
    wrapperFn: Function;
    /**
     * Function to wrap the bar
     *
     * Default: nothing
     */
    barWrapFn: Function;
    /**
     * Function to wrap the 'complete' segment of the bar
     *
     * Default: nothing
     */
    barProgWrapFn: Function;
    /**
     * Function to wrap the 'current' segment of the bar
     *
     * Default: nothing
     */
    barCurrentWrapFn: Function;
    /**
     * Function to wrap the empty/track part of the line
     *
     * Default: nothing
     */
    barEmptyWrapFn: Function;
    /**
     * Function to wrap the prefix
     *
     * Default: nothing
     */
    prefixWrapFn: Function;
    /**
     * Function to wrap the count
     *
     * Default: nothing
     */
    countWrapFn: Function;
    /**
     * Function to wrap the percent
     *
     * Default: nothing
     */
    percentWrapFn: Function;
    /**
     * Show numerical values of the count
     *
     * Default: `true`
     */
    showCount: boolean;
    /**
     * Show percentage completed
     *
     * Default: `false`
     */
    showPercent: boolean;
    /**
     * Min width of nums for showCount
     *
     * Default: `0`
     */
    countWidth: number;
    /**
     * Character to use for progress section of bar
     *
     * Default: `'█'`
     */
    progChar: string;
    /**
     * Character to use for empty (rail) section of bar
     *
     * Default: `' '`
     */
    emptyChar: string;
    /**
     * Character to start the progress bar with
     *
     * Default: `'▕'`
     */
    startChar: string;
    /**
     * Character to end the progress bar with
     *
     * Default: `'▏'`
     */
    endChar: string;
    /**
     * Show the 'current' segment of the bar seperately
     *
     * Default: `'▏'`
     */
    showCurrent: boolean;
    /**
     * Character to use the the 'current' segment
     *
     * Default: `'▏'`
     */
    currentChar: string;
    /**
     * Whether or not to print/output/log the progress bar
     *
     * Default: `true`
     */
    print: boolean;
    /**
     * Function to use to print the progress bar
     *
     * Default: progressBar.utils.printLn
     */
    printFn: any;
  }
  /**<!-- DOCS: progressBar.ProgressBarOptions #### -->
   * Options
   *
   * - `progressBar.ProgressBarOptions`
   *
   * All options are optional.
   *
   * | Property         | Default                           | Description                                            |
   * | ---------------- | --------------------------------- | ------------------------------------------------------ |
   * | prefix           | `''`                              | String to show to left of progress bar                 |
   * | prefixWidth      | `0`                               | Min width of prefix - `10` => `Example˽˽˽`             |
   * | maxPrefixWidth   | `Infinity`                        | Max width of prefix                                    |
   * | maxWidth         | `process.stdout.columns` or `100` | The maximum width the entire string may extend         |
   * | wrapperFn        | nothing                           | Function to wrap the printed string (eg `chalk.cyan)`  |
   * | barWrapFn        | nothing                           | Function to wrap the bar                               |
   * | barProgWrapFn    | nothing                           | Function to wrap the 'complete' segment of the bar     |
   * | barCurrentWrapFn | nothing                           | Function to wrap the 'current' segment of the bar      |
   * | barEmptyWrapFn   | nothing                           | Function to wrap the empty/track part of the line      |
   * | prefixWrapFn     | nothing                           | Function to wrap the prefix                            |
   * | countWrapFn      | nothing                           | Function to wrap the count                             |
   * | percentWrapFn    | nothing                           | Function to wrap the percent                           |
   * | showCount        | `true`                            | Show numerical values of the count - `[11 / 15]`       |
   * | showPercent      | `false`                           | Show percentage completed - `( 69%)`                   |
   * | countWidth       | `0`                               | Min width of nums for showCount - `3` => `[˽˽1 / ˽15]` |
   * | progChar         | `'█'`                             | Character to use for progress section of bar           |
   * | emptyChar        | `' '`                             | Character to use for empty (rail) section of bar       |
   * | startChar        | `'▕'`                             | Character to start the progress bar with               |
   * | endChar          | `'▏'`                             | Character to end the progress bar with                 |
   * | showCurrent      | `false`                           | Show the 'current' segment of the bar seperately       |
   * | currentChar      | `'▞'`                             | Character to use the the 'current' segment             |
   * | print            | `true`                            | Whether or not to print/output/log the progress bar    |
   * | printFn          | progressBar.utils.printLn         | Function to use to print the progress bar              |
   */
  export interface ProgressBarOptions extends Partial<ProgressBarOptionsFull> {}

  /**<!-- DOCS: progressBar.getFullOptions ##### @ -->
   * getFullOptions
   *
   * - `progressBar.getFullOptions`
   *
   * Fill in any missing Progress Bar options with defaults.
   *
   * Not needed for `getProgressBar` as it calls this internally.
   *
   * ```typescript
   * progressBar.getFullOptions({});
   * // {
   * //   prefix: "",
   * //   prefixWidth: 0,
   * //   maxPrefixWidth: Infinity,
   * //   maxWidth: 214,
   * //   wrapperFn: [Function],
   * //   barWrapFn: [Function],
   * //   barProgWrapFn: [Function],
   * //   barCurrentWrapFn: [Function],
   * //   barEmptyWrapFn: [Function],
   * //   prefixWrapFn: [Function],
   * //   countWrapFn: [Function],
   * //   percentWrapFn: [Function],
   * //   showCount: true,
   * //   showPercent: false,
   * //   countWidth: 0,
   * //   progChar: "█",
   * //   emptyChar: " ",
   * //   startChar: "▕",
   * //   endChar: "▏",
   * //   showCurrent: false,
   * //   currentChar: "▞",
   * //   print: true,
   * //   printFn: [Function],
   * // }
   * ```
   * @param {ProgressBarOptions} [opts={}]
   * @returns {ProgressBarOptionsFull}
   */
  export const getFullOptions = (opts: ProgressBarOptions = {}): ProgressBarOptionsFull => ({
    prefix: option(opts.prefix, '', (v, dflt) => safe.str(v, true, dflt)),
    prefixWidth: option(opts.prefixWidth, 0, (v, dflt) => safe.num(v, true, 0, undefined, dflt)),
    maxPrefixWidth: option(opts.maxPrefixWidth, Infinity, (v, dflt) => safe.num(v, true, 0, undefined, dflt)),
    maxWidth: option(opts.maxWidth, process?.stdout?.columns !== undefined ? process.stdout.columns : 100, (v, dflt) =>
      safe.num(v, true, 0, undefined, dflt)
    ),
    wrapperFn: option(opts.wrapperFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    barWrapFn: option(opts.barWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    barProgWrapFn: option(opts.barProgWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    barCurrentWrapFn: option(opts.barCurrentWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    barEmptyWrapFn: option(opts.barEmptyWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    prefixWrapFn: option(opts.prefixWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    countWrapFn: option(opts.countWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    percentWrapFn: option(opts.percentWrapFn, fn.noact, (v, dflt) => safe.func(v, dflt)),
    showCount: option(opts.showCount, true, (v, dflt) => safe.bool(v, dflt)),
    showPercent: option(opts.showPercent, false, (v, dflt) => safe.bool(v, dflt)),
    countWidth: option(opts.countWidth, 0, (v, dflt) => safe.num(v, true, 0, undefined, dflt)),
    progChar: option(opts.progChar, '█', (v, dflt) => safe.str(v, false, dflt)),
    emptyChar: option(opts.emptyChar, ' ', (v, dflt) => safe.str(v, false, dflt)),
    startChar: option(opts.startChar, '▕', (v, dflt) => safe.str(v, false, dflt)),
    endChar: option(opts.endChar, '▏', (v, dflt) => safe.str(v, false, dflt)),
    showCurrent: option(opts.showCurrent, false, (v, dflt) => safe.bool(v, dflt)),
    currentChar: option(opts.currentChar, '▞', (v, dflt) => safe.str(v, false, dflt)),
    print: option(opts.print, true, (v, dflt) => safe.bool(v, dflt)),
    printFn: option(opts.printFn, progressBar.utils.printLn, (v, dflt) => safe.func(v, dflt))
  });

  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------

  /**<!-- DOCS: progressBar.multiBarManagerHeading ### -->
   * Multi-Bar Manager
   */
  /**<!-- DOCS: progressBar.getMultiBarManager #### @ -->
   * getMultiBarManager
   *
   * - `getMultiBarManager`
   * - `progressBar.getMultiBarManager`
   *
   * Returns a manager for multiple progress bars.
   *
   * ```typescript
   * const manager = getMultiBarManager({});
   *
   * const bar1 = manager.addNew(100, { prefix: 'Bar 1' });
   * const bar2 = manager.addNew(100, { prefix: 'Bar 2' });
   * const bar3 = manager.addNew(100, { prefix: 'Bar 3' });
   *
   * bar1.set(25);
   * bar2.set(50);
   * bar3.set(75);
   *
   * // Bar 1▕██████████████                                          ▏ [ 25 / 100]
   * // Bar 2▕████████████████████████████                            ▏ [ 50 / 100]
   * // Bar 3▕██████████████████████████████████████████              ▏ [ 75 / 100]
   * ```
   * @param {progressBar.MultiBarManagerOptions} [options={}]
   * @returns {MultiBarManager}
   */
  export const getMultiBarManager = (options: progressBar.MultiBarManagerOptions = {}): MultiBarManager => {
    const args = {
      options: safe.obj(options, false, {})
    };
    const opts = getFullMultiBarManagerOptions(args.options);

    const { minSlots, maxSlots } = opts;

    const barPacks: ProgressBarManagerPackage[] = [];
    let totalCount: number = 0;
    let previousDrawnLines: number = 0;
    let previousUpdateTime: number = 0;
    let bumpLines: number = 0; // track how many lines to bump the output down by
    const q = new QueueManager();
    q.setDefaultPauseTime(0);

    /**<!-- DOCS: progressBar.MultiBarManager.add ##### -->
     * add
     *
     * - `getMultiBarManager().add`
     *
     * Add a given progress bar to the manager
     *
     * ```typescript
     * const manager = getMultiBarManager({ overrideOptions: { maxWidth: 75 } });
     *
     * const bar1 = getProgressBar(100, { prefix: 'Bar 1' });
     * manager.add(bar1);
     * const bar2 = getProgressBar(100, { prefix: 'Bar 2' });
     * manager.add(bar2);
     * const bar3 = getProgressBar(100, { prefix: 'Bar 3' });
     * manager.add(bar3);
     *
     * bar1.set(25);
     * bar2.set(50);
     * bar3.set(75);
     *
     * // Bar 1▕██████████████                                          ▏ [ 25 / 100]
     * // Bar 2▕████████████████████████████                            ▏ [ 50 / 100]
     * // Bar 3▕██████████████████████████████████████████              ▏ [ 75 / 100]
     * ```
     *
     * @param {ProgressBar} bar
     * @param {boolean} [removeWhenFinished=opts.removeFinished]
     * @returns {void}
     */
    const add: MultiBarManager['add'] = (bar: ProgressBar, removeWhenFinished: boolean = opts.removeFinished): void => {
      const args2 = {
        bar: safe.obj(bar) as ManagedProgressBar,
        removeWhenFinished: safe.bool(removeWhenFinished, false)
      };
      if (!args2.bar._registerManager) return;

      const barIndex = totalCount;
      totalCount += 1;

      const varOpts: ProgressBarOptions = ObjectTools.mapValues(
        opts.variableOptions,
        (key, value: any[] | ((bar?: ProgressBar, uniqueBarIndex?: number, currentIndex?: number, bars?: ProgressBar[]) => any)) => {
          if (!value) return undefined;
          if (Array.isArray(value)) {
            return value[barIndex % value.length];
          }
          if (typeof value === 'function') {
            const currentBars = [...getBars(), args2.bar];
            return value(args2.bar, barIndex, currentBars.indexOf(args2.bar), currentBars);
          }
          return undefined;
        }
      );

      const overrideOpts: progressBar.ProgressBarOptions = {
        ...opts.overrideOptions,
        ...varOpts
      };

      const barPack: ProgressBarManagerPackage = {
        bar: args2.bar,
        isFinished: false,
        lastOutput: '',
        fullOptions: overrideOpts as progressBar.ProgressBarOptionsFull,
        onUpdate: (outputString: string) => {
          barPack.lastOutput = outputString;
          update();
        },
        onStart: () => {},
        onFinish: () => {
          barPack.isFinished = true;

          if (args2.removeWhenFinished) {
            remove(args2.bar);
          }
        },
        onSet: () => {},
        onNext: () => {}
      };
      barPacks.push(barPack);
      barPack.fullOptions = args2.bar._registerManager(barPack, overrideOpts);
      bumpLines = Math.max(0, bumpLines - 1);
      barPack.lastOutput = barPack.bar.getBar(true);
      update();
    };

    /**<!-- DOCS: progressBar.MultiBarManager.addNew ##### -->
     * addNew
     *
     * - `getMultiBarManager().addNew`
     *
     * Create a new progress bar and add it to the manager
     *
     * ```typescript
     * const manager = getMultiBarManager({});
     *
     * const bar1 = manager.addNew(100, { prefix: 'Bar 1' });
     * const bar2 = manager.addNew(100, { prefix: 'Bar 2' });
     * const bar3 = manager.addNew(100, { prefix: 'Bar 3' });
     *
     * bar1.set(25);
     * bar2.set(50);
     * bar3.set(75);
     *
     * // Bar 1▕██████████████                                          ▏ [ 25 / 100]
     * // Bar 2▕████████████████████████████                            ▏ [ 50 / 100]
     * // Bar 3▕██████████████████████████████████████████              ▏ [ 75 / 100]
     * ```
     *
     * @param {number} [max]
     * @param {progressBar.ProgressBarOptions} [options={}]
     * @returns {ProgressBar}
     */
    const addNew: MultiBarManager['addNew'] = (max?: number, options: progressBar.ProgressBarOptions = {}): ProgressBar => {
      const args2 = {
        max: safe.num(max, true, -1, undefined, -1),
        options: safe.obj(options, false, {})
      };
      const bar = getProgressBar(args2.max, args2.options);
      add(bar);
      return bar;
    };

    /**<!-- DOCS: progressBar.MultiBarManager.remove ##### -->
     * remove
     *
     * - `getMultiBarManager().remove`
     *
     * Remove a given progress bar from the manager
     *
     * ```typescript
     * const manager = getMultiBarManager({ overrideOptions: { maxWidth: 75 } });
     *
     * const bar1 = manager.addNew(100, { prefix: 'Bar 1' });
     * const bar2 = manager.addNew(100, { prefix: 'Bar 2' });
     * const bar3 = manager.addNew(100, { prefix: 'Bar 3' });
     *
     * bar1.set(25);
     * bar2.set(50);
     * bar3.set(75);
     *
     * manager.remove(bar2);
     *
     * // Bar 1▕██████████████                                          ▏ [ 25 / 100]
     * // Bar 3▕██████████████████████████████████████████              ▏ [ 75 / 100]
     * ```
     *
     * @param {ProgressBar} bar
     * @returns {void}
     */
    const remove: MultiBarManager['remove'] = (bar: ProgressBar): void => {
      const args2 = {
        bar: safe.obj(bar) as ManagedProgressBar
      };
      if (!args2.bar._registerManager) return;

      const index = barPacks.findIndex((pack) => pack.bar === args2.bar);
      if (index === -1) return;

      barPacks.splice(index, 1);
      bumpLines += 1;
      update();
    };

    /**<!-- DOCS: progressBar.MultiBarManager.update ##### -->
     * update
     *
     * - `getMultiBarManager().update`
     *
     * Re-render the progress bars
     *
     * ```typescript
     * const manager = getMultiBarManager({ overrideOptions: { maxWidth: 75 } });
     *
     * const bar1 = manager.addNew(100, { prefix: 'Bar 1' });
     * const bar2 = manager.addNew(100, { prefix: 'Bar 2' });
     *
     * bar1.set(25);
     * bar2.set(50);
     *
     * manager.update();
     *
     * // Bar 1▕██████████████                                          ▏ [ 25 / 100]
     * // Bar 2▕████████████████████████████                            ▏ [ 50 / 100]
     * ```
     *
     * @returns {void}
     */
    const update: MultiBarManager['update'] = (): void => {
      const result = [];
      let count = 0;
      barPacks.slice(0, maxSlots).forEach((pack, index) => {
        const wrappedBar = pack.lastOutput || pack.bar.getBar(true);
        result.push(wrappedBar);
        count++;
      });
      if (count < minSlots) {
        const emptySlots = minSlots - barPacks.length;
        result.push(...ArrayTools.repeat(emptySlots, ''));
        count += emptySlots;
      }

      if (!opts.alignBottom) {
        bumpLines = 0;
      }

      count += bumpLines;
      if (opts.print) {
        const timeSinceLastUpdate = Date.now() - previousUpdateTime;

        // debounce updates to prevent clashing with other updates
        if (timeSinceLastUpdate > 15) {
          q.add('print', async () => {
            opts.printFn(previousDrawnLines, `\n`.repeat(bumpLines) + result.join('\n'));
            previousDrawnLines = count;
            previousUpdateTime = Date.now();
            return wait(0);
          });
        }
      }
    };

    /**<!-- DOCS: progressBar.MultiBarManager.getBars ##### -->
     * getBars
     *
     * - `getMultiBarManager().getBars`
     *
     * Get an array of all the progress bars currently managed by the manager
     *
     * ```typescript
     * const manager = getMultiBarManager({ overrideOptions: { maxWidth: 75 } });
     *
     * const bar1 = manager.addNew(100, { prefix: 'Bar 1' });
     * const bar2 = manager.addNew(100, { prefix: 'Bar 2' });
     * const bar3 = manager.addNew(100, { prefix: 'Bar 3' });
     *
     * bar1.set(25);
     * bar2.set(50);
     * bar3.set(75);
     *
     * console.log(manager.getBars()); // [ bar1, bar2, bar3 ]
     *
     * manager.remove(bar2);
     *
     * console.log(manager.getBars()); // [ bar1, bar3 ]
     * ```
     *
     * @returns {ProgressBar[]}
     */
    const getBars: MultiBarManager['getBars'] = (): ProgressBar[] => {
      return barPacks.map((pack) => pack.bar);
    };

    return {
      add,
      addNew,
      remove,
      update,
      getBars
    };
  };

  // type MultiBarVariableOptionsConfigEntry<T> = T[] | ((bar?: ProgressBar, uniqueBarIndex?: number, currentIndex?: number, bars?: ProgressBar[]) => T);
  type MultiBarVariableOptionsConfig<T = progressBar.ProgressBarOptions> = {
    [K in keyof T]?: T[K][] | ((bar?: ProgressBar, uniqueBarIndex?: number, currentIndex?: number, bars?: ProgressBar[]) => T[K]);
  };

  /**
   * Same as `MultiBarManagerOptions` but with all properties required.
   *
   * Use `MultiBarManagerOptions` when possible.
   */
  export interface MultiBarManagerOptionsFull {
    /**
     * Shorthand for setting both minSlots and maxSlots
     *
     * Default: `undefined`
     */
    numSlots: number;
    /**
     * The min number of lines to print at a time
     *
     * Default: `0`
     */
    minSlots: number;
    /**
     * The max number of lines to print at a time
     *
     * Default: `Infinity`
     */
    maxSlots: number;
    /**
     * Remove progress bars from the manager when they finish
     *
     * Default: `false`
     */
    removeFinished: boolean;
    /**
     * Align the bars to the bottom of the print space
     *
     * Default: `false`
     */
    alignBottom: boolean;

    /**
     * Override the options of the progress bars
     *
     * Default: `{}` (No overrides)
     */
    overrideOptions: progressBar.ProgressBarOptions;

    /**
     * Override options differently for each bar
     *
     * For a given option,
     *  - if the value is an array, it will be rotated between the bars
     *  - if the value is a function, it will be called with the bar, index, and array of bars
     *
     * Default: `{}` (No variable options)
     */
    variableOptions: MultiBarVariableOptionsConfig;

    /**
     * Whether or not to print the bars
     *
     * Default: `true`
     */
    print: boolean;

    /**
     * The function to use to print the bars
     *
     * Default: progressBar.utils.multiPrintFn
     */
    printFn: (previousDrawnLines: number, output: string) => void;
  }

  /**<!-- DOCS: progressBar.MultiBarManagerOptions #### -->
   * Options
   *
   * - `progressBar.MultiBarManagerOptions`
   *
   * The options for MultiBar Managers
   *
   * All options are optional.
   *
   * | Property          | Default                        | Description                                            |
   * | ----------------- | ------------------------------ | ------------------------------------------------------ |
   * | numSlots          | `undefined`                    | Shorthand for setting both minSlots and maxSlots       |
   * | minSlots          | `0`                            | The min number of lines to print at a time             |
   * | maxSlots          | `Infinity`                     | The max number of lines to print at a time             |
   * | removeFinished    | `false`                        | Remove progress bars from the manager when they finish |
   * | alignBottom       | `false`                        | Align the bars to the bottom of the print space        |
   * | overrideOptions   | `{}` (No overrides)            | Override the options of the progress bars              |
   * | variableOptions   | `{}` (No variable options)     | Override options differently for each bar              |
   * | print             | `true`                         | Whether or not to print the bars                       |
   * | printFn           | progressBar.utils.multiPrintFn | The function to use to print the bars                  |
   */
  export interface MultiBarManagerOptions extends Partial<MultiBarManagerOptionsFull> {}

  /**<!-- DOCS: progressBar.getFullMultiBarManagerOptions ##### @ -->
   * getFullMultiBarManagerOptions
   *
   * - `progressBar.getFullMultiBarManagerOptions`
   *
   * Fill in any missing MultiBar Manager options with defaults.
   *
   * Not needed for `getMultiBarManager` as it calls this internally.
   *
   * ```typescript
   * progressBar.getFullMultiBarManagerOptions({});
   * // {
   * //   numSlots: null,
   * //   minSlots: 0,
   * //   maxSlots: Infinity,
   * //   removeFinished: false,
   * //   alignBottom: false,
   * //   overrideOptions: {},
   * //   variableOptions: {},
   * //   print: true,
   * //   printFn: [Function],
   * // }
   * ```
   * @param {MultiBarManagerOptions} opts
   * @returns {MultiBarManagerOptionsFull}
   */
  export const getFullMultiBarManagerOptions = (opts: MultiBarManagerOptions): MultiBarManagerOptionsFull => {
    // ensure safe nums before using as defaults, etc
    const numSlots = optionalOption(opts.numSlots, undefined, (v, d) => safe.num(v, true, 0, undefined, d));
    let minSlots = optionalOption(opts.minSlots, undefined, (v, d) => safe.num(v, true, 0, undefined, d));
    let maxSlots = optionalOption(opts.maxSlots, undefined, (v, d) => (v === Infinity ? Infinity : safe.num(v, true, 0, undefined, d)));

    // if minSlots is greater than maxSlots, swap them
    if (minSlots !== undefined && maxSlots !== undefined && minSlots > maxSlots) {
      let temp = minSlots;
      minSlots = maxSlots;
      maxSlots = temp;
    }

    const result: MultiBarManagerOptionsFull = {
      numSlots: option(numSlots, null, (v, d) => safe.num(v, true, 0, undefined, d)),
      minSlots: option(minSlots, numSlots ?? 0, (v, d) => safe.num(v, true, 0, maxSlots, d)),
      maxSlots: option(maxSlots, numSlots ?? Infinity, (v, d) => (v === Infinity ? Infinity : safe.num(v, true, minSlots, undefined, d))),
      removeFinished: option(opts.removeFinished, false, (v, d) => safe.bool(v, d)),
      alignBottom: option(opts.alignBottom, false, (v, d) => safe.bool(v, d)),
      overrideOptions: option(opts.overrideOptions, {}, (v, d) => safe.obj(v, false, d)),
      variableOptions: option(opts.variableOptions, {}, (v, d) => safe.obj(v, false, d)),
      print: option(opts.print, true, (v, d) => safe.bool(v, d)),
      printFn: option(opts.printFn, progressBar.utils.multiPrintFn, (v, d) => safe.func(v, d))
    };

    return result;
  };

  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------------------------

  /**<!-- DOCS: progressBar.utils ### -->
   * utils
   *
   * - `progressBar.utils`
   *
   * Small helper functions may help when using progress bars
   */
  export namespace utils {
    // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

    /**<!-- DOCS: progressBar.printLn #### @ -->
     * printLn
     *
     * - `progressBar.printLn`
     *
     * Can use instead of console.log
     *
     * Overwrites the previous line if possible (i.e. node);
     *
     * Usage
     * ```javascript
     * import { printLn } from 'swiss-ak';
     *
     * printLn('A');
     * printLn('B'); // Replaces the 'A' line
     * printLn('C'); // Replaces the 'B' line
     * printLn(); // Jumps a line
     * printLn('D'); // Replaces the empty line
     * ```
     *
     * Output
     * ```
     * C
     * D
     * ```
     * @param {...any} [text]
     * @returns {void}
     */
    export const printLn = (...text: any[]) => {
      const args = {
        text: safe.arrOf.str(text)
      };
      if (process?.stdout?.clearLine && process?.stdout?.cursorTo) {
        if (!args.text.length) {
          process.stdout.write('\n');
        } else {
          const output = args.text.map((item) => item.toString()).join(' ');
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.moveCursor(0, -1);
          process.stdout.clearLine(0);
          process.stdout.write(output);
          process.stdout.write('\n');
        }
      } else {
        console.log(...args.text);
      }
    };

    /**<!-- DOCS: progressBar.multiPrintFn #### @ -->
     * multiPrintFn
     *
     * - `progressBar.multiPrintFn`
     *
     * The default printFn for MultiBarManagers
     *
     * Clears previously printed lines and prints the output in their place
     *
     * ```typescript
     * const manager = getMultiBarManager({ printFn: progressBar.utils.multiPrintFn });
     *
     * const bar1 = manager.addNew(100, { prefix: 'Bar 1' });
     * const bar2 = manager.addNew(100, { prefix: 'Bar 2' });
     * ```
     * @param {number} previousDrawnLines
     * @param {string} output
     * @returns {void}
     */
    export const multiPrintFn = (previousDrawnLines: number, output: string): void => {
      const args = {
        previousDrawnLines: safe.num(previousDrawnLines, true, 0),
        output: safe.str(output, true, '')
      };
      const hasProcessFns = process?.stdout?.clearLine && process?.stdout?.cursorTo && process?.stdout?.moveCursor;
      if (hasProcessFns) {
        let removeLines = args.previousDrawnLines;

        const outputLines = args.output.split('\n').length;

        if (outputLines > args.previousDrawnLines) {
          const extraLines = outputLines - args.previousDrawnLines;
          process.stdout.write('=========\n'.repeat(extraLines));
          removeLines += extraLines;
        }

        let printOutput = '';

        printOutput += out.ansi.cursor.up(removeLines);
        printOutput += args.output;
        printOutput += '\n';

        process.stdout.write(printOutput);
      } else {
        console.log(args.output);
      }
    };
  } // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

/** <!-- DOCS-ALIAS: progressBar.getProgressBar  --> */
export const getProgressBar = progressBar.getProgressBar;

/** <!-- DOCS-ALIAS: progressBar.getMultiBarManager  --> */
export const getMultiBarManager = progressBar.getMultiBarManager;
