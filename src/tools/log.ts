import util from 'util';
import { ObjectTools, OfType } from 'swiss-ak';

import { out } from './out';
import { colr, WrapFn } from './colr';

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
    nameColour: colr.darkBg.magentaBg.white,
    type: 'debug'
  } as LogConfig,
  info: {
    name: 'INFO',
    nameColour: colr.darkBg.blueBg.white,
    type: 'info'
  } as LogConfig,
  warn: {
    name: 'WARN',
    nameColour: colr.yellowBg.black,
    type: 'warn'
  } as LogConfig,
  error: {
    name: 'ERRR',
    nameColour: colr.darkBg.redBg.white,
    type: 'error'
  } as LogConfig
} as const;

type LogFunction = (...args: any[]) => void;
export type Logger<T> = OfType<typeof defaultConfigs & T, LogFunction> & { getPrefixWidth: () => number };
export type DefaultLogger = Logger<{}>;

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

const formatLog = (args: any[], config: LogConfig, completeOptions: LogOptions, nameWidth: number = 1): [string, number] => {
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
  const prefixWidth = out.getWidth(prefixRaw);

  const result = args
    .map(getStr(enableColours))
    .join(' ')
    .split('\n')
    .map((line, index) => (index ? ' '.repeat(prefixWidth) : prefix) + contentWrapper(line))
    .join('\n');

  return [result, prefixWidth];
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
 *     // Which console method to use
 *     type: 'debug',
 *
 *     // Only log this message if PRINT_DEBUG_LOGS is true
 *     filter: (...args: any[]) => PRINT_DEBUG_LOGS === true
 *
 *     // Process the arguments before logging
 *     process: (...args: any[]) => args.map((arg) => arg + '!')
 *
 *     // Process the output before logging
 *     processOutput: (output: string, prefixWidth: number) => output.split('\n').map((line) => `[x] ${line} (${prefixWidth})`).join('\n')
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

  const resultLogger = ObjectTools.mapValues(allConfigs, (key, config: LogConfig) => {
    const func: LogFunction = (...originalArgs: any[]) => {
      if (config.filter && !config.filter(...originalArgs)) return;
      const args = config.process ? config.process(...originalArgs) : originalArgs;

      const [originalLog, prefixWidth] = formatLog(args, config, completeOptions, nameWidth);
      const processedLog = config.processOutput ? config.processOutput(originalLog, prefixWidth) : originalLog;

      switch (config.type) {
        case 'info':
          console.info(processedLog);
          break;
        case 'warn':
          console.warn(processedLog);
          break;
        case 'error':
          console.error(processedLog);
          break;
        case 'debug':
          console.debug(processedLog);
          break;
        case 'log':
        default:
          console.log(processedLog);
          break;
      }

      if (config.action) config.action(...args);
    };
    return func;
  }) as Logger<T>;

  resultLogger.getPrefixWidth = () => {
    const [_, prefixWidth] = formatLog([], Object.values(allConfigs)[0] as LogConfig, completeOptions, nameWidth);
    return prefixWidth;
  };
  return resultLogger;
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
 *
 * log.getPrefixWidth();           // Returns: 7
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
 * | type          | `string`   | `false`  | `'log'` | Which console method to use                       |
 * | filter        | `Function` | `false`  |         | Condition on whether to log                       |
 * | process       | `Function` | `false`  |         | Process the log arguments before logging          |
 * | processOutput | `Function` | `false`  |         | Process the log output before logging             |
 * | action        | `Function` | `false`  |         | Additional action to perform when logging         |
 */
export interface LogConfig {
  /** Display name */
  name: string;
  /** Wrapper function to apply to the display name */
  nameColour?: WrapFn;
  /** Wrapper function to apply to the main log content */
  contentColour?: WrapFn;
  /** Whether to show the date */
  showDate?: boolean;
  /** Whether to show the time */
  showTime?: boolean;
  /** Which console method to use */
  type?: 'log' | 'info' | 'warn' | 'error' | 'debug';
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
   * Process the output before logging
   *
   * If present, the processOutput function will be run each time the log function is called
   * and the result will be used as the output for the log function
   *
   * The function receives the regular output string and the width of the prefix, and should return the final output string
   *
   * > *NOTE:* This is not the same as the `process` function, which processes the arguments before logging. Only use this if you need to process the output after it has been formatted.
   */
  processOutput?: (output: string, prefixWidth: number) => string;

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
