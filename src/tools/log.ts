import util from 'util';
import { ObjectTools, OfType } from 'swiss-ak';

import { out } from './out';
import { colr } from './colr';

//<!-- DOCS: 600 -->
/**<!-- DOCS: log ##! -->
 * Logger
 */

const defaultOptions: LogOptions = {
  showDate: false,
  showTime: true,
  enableColours: true,
  nameWidth: undefined
};

const defaultConfigs = {
  blank: {
    name: '',
    nameColour: colr,
    showDate: false,
    showTime: false
  } as LogConfig,
  log: {
    name: 'LOG',
    nameColour: colr.darkBg.whiteBg.black
  } as LogConfig,
  out: {
    name: 'OUT',
    nameColour: colr.darkBg.whiteBg.black
  } as LogConfig,
  normal: {
    name: 'LOG',
    nameColour: colr.darkBg.whiteBg.black
  } as LogConfig,
  verbose: {
    name: 'LOG',
    nameColour: colr.darkBg.whiteBg.black
  } as LogConfig,
  debug: {
    name: 'DBUG',
    nameColour: colr.darkBg.magentaBg.white
  } as LogConfig,
  info: {
    name: 'INFO',
    nameColour: colr.darkBg.blueBg.white
  } as LogConfig,
  warn: {
    name: 'WARN',
    nameColour: colr.yellowBg.black
  } as LogConfig,
  error: {
    name: 'ERRR',
    nameColour: colr.darkBg.redBg.white
  } as LogConfig
} as const;

type LogFunction = (...args: any[]) => void;
export type DefaultLogger = OfType<typeof defaultConfigs, LogFunction>;
export type Logger<T> = OfType<typeof defaultConfigs & T, LogFunction>;

const getStr =
  (enableColours: boolean) =>
  (item: any): string => {
    const inspect = ['object', 'boolean', 'number'];
    if (inspect.includes(typeof item) && !(item instanceof Date)) {
      return util.inspect(item, { colors: enableColours, depth: null });
    } else {
      return item + '';
    }
  };

const getDatePrefix = (now: Date, addDate: boolean, addTime: boolean, showDate: boolean, showTime: boolean) => {
  if (!addDate && !addTime) return '';

  let date = addDate ? now.toISOString().substring(0, 10) : '';
  let time = addTime ? now.toISOString().substring(11, 23) : '';

  const dateStr = `[${[showDate ? date : ' '.repeat(date.length), showTime ? time : ' '.repeat(time.length)].filter((s) => s).join(' ')}]`;

  if ((!showDate && !showTime) || (!showDate && !addTime) || (!addDate && !showTime)) return ' '.repeat(dateStr.length);

  return dateStr;
};

const formatLog = (args: any[], config: LogConfig, completeOptions: LogOptions, nameWidth: number = 1): string => {
  const now = new Date();

  const { showDate: addDate, showTime: addTime, enableColours } = completeOptions;
  const { name, nameColour, contentColour, showDate, showTime } = config;

  const dateWrapper = enableColours ? colr.dim : (str: string) => str;
  const nameWrapper = !enableColours ? (str: string) => `[${str}]` : nameColour ? nameColour : (str: string) => str;
  const contentWrapper = enableColours && contentColour ? contentColour : (str: string) => str;

  const dateStr = getDatePrefix(now, addDate, addTime, showDate !== false, showTime !== false);
  const nameStr = out.limitToLength(` ${out.center(out.limitToLength(`${name}`, nameWidth), nameWidth)} `, nameWidth + 2);
  let prefixRaw = `${dateStr} ${nameStr} `;
  let prefix = `${dateWrapper(dateStr)} ${nameWrapper(nameStr)} `;
  if (nameWidth < 0) {
    prefixRaw = `${dateStr} `;
    prefix = `${dateWrapper(dateStr)} `;
  }
  if (prefixRaw === ' ') {
    prefixRaw = '';
    prefix = '';
  }

  return args
    .map(getStr(enableColours))
    .join(' ')
    .split('\n')
    .map((line, index) => (index ? ' '.repeat(prefixRaw.length) : prefix) + contentWrapper(line))
    .join('\n');
};

/**<!-- DOCS: log.createLogger ### 601 -->
 * createLogger
 *
 * - `createLogger`
 *
 * Create a logger with custom configs
 *
 * ```typescript
 * const log = createLogger({
 *   myLog: {
 *     // Display name
 *     name: 'MYLOG',
 *
 *     // Wrapper (or colr) function to apply to the display name
 *     nameColour: colr.dark.magenta,
 *
 *     // Wrapper (or colr) function to apply to the main log content
 *     contentColour: colr.yellow
 *
 *     // Whether to show the date (overridden by options.showDate)
 *     showDate: false,
 *
 *     // Whether to show the time (overridden by options.showTime)
 *     showTime: true,
 *
 *     // Only log this message if PRINT_DEBUG_LOGS is true
 *     filter: (...args: any[]) => PRINT_DEBUG_LOGS === true
 *
 *     // Process the arguments before logging
 *     process: (...args: any[]) => args.map((arg) => arg + '!')
 *
 *     // Additional action to perform when logging
 *     action: (...args: any[]) => addToDebugCount()
 *   }
 * });
 *
 * log.myLog('Hello World'); // [12:00:00.123]  MYLOG  Hello World
 * ```
 * @param {T} [extraConfigs={} as T] - Configs for extra log functions to add to the logger
 * @param {LogOptions} [options={}] - Options for the logger
 * @returns {Logger<T>} - Logger object
 */
export const createLogger = <T extends LogConfigs>(extraConfigs: T = {} as T, options: LogOptions = {}): Logger<T> => {
  const completeOptions = { ...defaultOptions, ...options };
  const allConfigs = { ...defaultConfigs, ...extraConfigs };

  const longestName = Math.max(0, ...Object.values(allConfigs).map((p) => p.name.length));
  const nameWidth = completeOptions.nameWidth ?? longestName;

  return ObjectTools.mapValues(allConfigs, (key, config: LogConfig) => {
    const func: LogFunction = (...originalArgs: any[]) => {
      if (config.filter && !config.filter(...originalArgs)) return;
      const args = config.process ? config.process(...originalArgs) : originalArgs;

      const log = formatLog(args, config, completeOptions, nameWidth);
      console.log(log);

      if (config.action) config.action(...args);
    };
    return func;
  }) as Logger<T>;
};

/**<!-- DOCS: log.log ### 600 -->
 * log
 *
 * - `log`
 *
 * A set of log functions
 *
 * ```typescript
 * log.blank('This is blank');     //                       This is blank
 * log.log('This is log');         // [12:00:00.123]  LOG   This is log
 * log.out('This is out');         // [12:00:00.123]  OUT   This is out
 * log.normal('This is normal');   // [12:00:00.123]  LOG   This is normal
 * log.verbose('This is verbose'); // [12:00:00.123]  LOG   This is verbose
 * log.debug('This is debug');     // [12:00:00.123]  DBUG  This is debug
 * log.info('This is info');       // [12:00:00.123]  INFO  This is info
 * log.warn('This is warn');       // [12:00:00.123]  WARN  This is warn
 * log.error('This is error');     // [12:00:00.123]  ERRR  This is error
 * ```
 */
export const log = createLogger({}) as DefaultLogger;

/**<!-- DOCS: log.LogOptions ### 650 -->
 * LogOptions
 *
 * - `LogOptions`
 *
 * Options for the log function
 *
 * | Property      | Type       | Required | Default | Description                |
 * |---------------|------------|----------|---------|----------------------------|
 * | showDate      | `boolean`  | `false`  | `false` | Whether to show the date   |
 * | showTime      | `boolean`  | `false`  | `true`  | Whether to show the time   |
 * | enableColours | `boolean`  | `false`  | `true`  | Whether to enable colours  |
 * | nameWidth     | `number`   | `false`  | Auto    | Width of the name          |
 */
export interface LogOptions {
  /** Whether to show the date */
  showDate?: boolean;
  /** Whether to show the time */
  showTime?: boolean;
  /** Whether to enable colours */
  enableColours?: boolean;
  /** Width of the name */
  nameWidth?: number;
}

interface LogConfigs {
  [key: string]: LogConfig;
}

/**<!-- DOCS: log.LogConfig ### 660 -->
 * LogConfig
 *
 * - `LogConfig`
 *
 * Configuration for the log function
 *
 * | Property      | Type       | Required | Default | Description                                       |
 * |---------------|------------|----------|---------|---------------------------------------------------|
 * | name          | `string`   | `true`   |         | Display name                                      |
 * | nameColour    | `WrapFn`   | `false`  |         | Wrapper function to apply to the display name     |
 * | contentColour | `WrapFn`   | `false`  |         | Wrapper function to apply to the main log content |
 * | showDate      | `boolean`  | `false`  | `false` | Whether to show the date                          |
 * | showTime      | `boolean`  | `false`  | `true`  | Whether to show the time                          |
 * | filter        | `Function` | `false`  |         | Condition on whether to log                       |
 * | process       | `Function` | `false`  |         | Process the log arguments before logging          |
 * | action        | `Function` | `false`  |         | Additional action to perform when logging         |
 */
export interface LogConfig {
  /** Display name */
  name: string;
  /** Wrapper function to apply to the display name */
  nameColour?: Function;
  /** Wrapper function to apply to the main log content */
  contentColour?: Function;
  /** Whether to show the date */
  showDate?: boolean;
  /** Whether to show the time */
  showTime?: boolean;
  /**
   * Condition on whether to log
   *
   * If present, the filter function will be run each time the log function is called
   * and if it doesn't return `true`, the log will not be performed
   *
   * Note: Function receives the original arguments, not the processed arguments
   */
  filter?: (...args: any[]) => boolean;
  /**
   * Process the log arguments before logging
   *
   * If present, the process function will be run each time the log function is called
   * and the result will be used as the arguments for the log function
   */
  process?: (...args: any[]) => any[];
  /**
   * Additional action to perform when logging
   *
   * If present, the action function will be run each time the log function is called.
   * It will have no impact on the logging step, but can be used to perform additional actions
   *
   * Note: Function receives the original arguments, not the processed arguments
   */
  action?: (...args: any[]) => void;
}
