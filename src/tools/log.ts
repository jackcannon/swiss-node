// TODO logs

import util from 'util';
import chalk, { ChalkInstance } from 'chalk';
import { out } from './out';
import { KeysOnly, ObjectUtils, OfType } from 'swiss-ak';

export interface LogOptions {
  /**
   * Default: false
   */
  showDate?: boolean;

  /**
   * Default: true
   */
  showTime?: boolean;

  /**
   * Default: true
   */
  enableColours?: boolean;
}

const defaultOptions: LogOptions = {
  showDate: false,
  showTime: true,
  enableColours: true
};

export interface LogConfigs {
  [key: string]: LogConfig;
}

export interface LogConfig {
  name: string;
  nameColour?: ChalkInstance;
  showDate?: boolean;
  showTime?: boolean;
  contentColour?: ChalkInstance;
}

const defaultConfigs = {
  blank: {
    name: '',
    nameColour: chalk,
    showDate: false,
    showTime: false
  } as LogConfig,
  log: {
    name: 'LOG',
    nameColour: chalk.bgWhite.black
  } as LogConfig,
  out: {
    name: 'OUT',
    nameColour: chalk.bgWhite.black
  } as LogConfig,
  normal: {
    name: 'LOG',
    nameColour: chalk.bgWhite.black
  } as LogConfig,
  verbose: {
    name: 'LOG',
    nameColour: chalk.bgWhite.black
  } as LogConfig,
  debug: {
    name: 'DBUG',
    nameColour: chalk.bgMagenta.whiteBright
  } as LogConfig,
  info: {
    name: 'INFO',
    nameColour: chalk.bgBlue.whiteBright
  } as LogConfig,
  warn: {
    name: 'WARN',
    nameColour: chalk.bgYellowBright.black
  } as LogConfig,
  error: {
    name: 'ERRR',
    nameColour: chalk.bgRed.whiteBright
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

  const dateWrapper = enableColours ? chalk.dim : (str: string) => str;
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

export const createLogger = <T extends LogConfigs>(extraConfigs: T = {} as T, options: LogOptions = {}): Logger<T> => {
  const completeOptions = { ...defaultOptions, ...options };
  const allConfigs = { ...defaultConfigs, ...extraConfigs };

  const longestName = Math.max(0, ...Object.values(allConfigs).map((p) => p.name.length));

  return ObjectUtils.mapValues(allConfigs, (key, config: LogConfig) => {
    const func: LogFunction = (...args: any[]) => {
      const log = formatLog(args, config, completeOptions, longestName);
      console.log(log);
    };
    return func;
  }) as Logger<T>;
};

export const log = createLogger({}) as DefaultLogger;
