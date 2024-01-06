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
  enableColours: true
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

  const dateStr = `[${[showDate ? date : ' '.repeat(date.length), showTime ? time : ' '.repeat(time.length)].filter((s) => s).join(' ')}] `;

  if ((!showDate && !showTime) || (!showDate && !addTime) || (!addDate && !showTime)) return ' '.repeat(dateStr.length);

  return dateStr;
};

const formatLog = (args: any[], config: LogConfig, completeOptions: LogOptions, longestName: number = 1): string => {
  const now = new Date();

  const { showDate: addDate, showTime: addTime, enableColours } = completeOptions;
  const { name, nameColour, contentColour, showDate, showTime } = config;

  const dateWrapper = enableColours ? colr.dim : (str: string) => str;
  const nameWrapper = !enableColours ? (str: string) => `|${str}|` : nameColour ? nameColour : (str: string) => str;
  const contentWrapper = enableColours && contentColour ? contentColour : (str: string) => str;

  const dateStr = getDatePrefix(now, addDate, addTime, showDate !== false, showTime !== false);
  const nameStr = ` ${out.center(`${name}`, longestName)} `;
  const prefixRaw = `${dateStr}${nameStr} `;
  const prefix = `${dateWrapper(dateStr)}${nameWrapper(nameStr)} `;

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
 *     name: 'MYLOG',
 *     nameColour: colr.dark.magenta,
 *     showDate: false,
 *     showTime: true,
 *     contentColour: colr.yellow
 *   }
 * });
 *
 * log.myLog('Hello World'); // [12:00:00.123]  MYLOG  Hello World
 * ```
 * @param {T} [extraConfigs={} as T]
 * @param {LogOptions} [options={}]
 * @returns {Logger<T>}
 */
export const createLogger = <T extends LogConfigs>(extraConfigs: T = {} as T, options: LogOptions = {}): Logger<T> => {
  const completeOptions = { ...defaultOptions, ...options };
  const allConfigs = { ...defaultConfigs, ...extraConfigs };

  const longestName = Math.max(0, ...Object.values(allConfigs).map((p) => p.name.length));

  return ObjectTools.mapValues(allConfigs, (key, config: LogConfig) => {
    const func: LogFunction = (...args: any[]) => {
      const log = formatLog(args, config, completeOptions, longestName);
      console.log(log);
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
 */
export interface LogOptions {
  showDate?: boolean;
  showTime?: boolean;
  enableColours?: boolean;
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
 * See createLogger
 */
export interface LogConfig {
  name: string;
  nameColour?: Function;
  showDate?: boolean;
  showTime?: boolean;
  contentColour?: Function;
}
