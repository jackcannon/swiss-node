import { days, getDeferred, getTimer } from 'swiss-ak';
import { ActionBarConfig, getActionBar } from '../../utils/actionBar';
import { dateToDynDate, dateToDynTime, DynDate, dynDateToDate, DynTime } from '../../utils/dynDates';
import { getKeyListener } from '../keyListener';
import { getNumberInputter } from '../../utils/numberInputter';
import { ask } from '../ask';
import { LineCounter, out } from '../out';
import { Breadcrumb } from '../out/breadcrumb';
import { getLineCounter } from '../out/lineCounter';
import { dateHandler } from './datetime/date';
import { timeHandler } from './datetime/time';
import { DateTimeHandlerObj } from './datetime/types';
import { colr } from '../colr';
import { getAskOptions, getAskOptionsForState } from './basicInput/customise';
import { getImitateOutput } from './imitate';
import { ErrorInfo, getErrorInfoFromValidationResult } from './errorValidation';
import { valueDisplays } from './basicInput/valueDisplays';

//<!-- DOCS: 110 -->

type DateTimeSection = 'date' | 'time';

const DEBUG_TIMER = getTimer('DEBUG', false, colr.dark.red);
const IS_DEBUG = false;

const actionConfig: ActionBarConfig = {
  'tab-section': {
    keys: 'tab',
    label: 'switch section'
  },
  'tab-range': {
    keys: 'tab',
    label: 'switch start/end'
  },
  'nums-date': {
    keys: '0-9',
    label: 'enter date'
  },
  'nums-time': {
    keys: '0-9',
    label: 'enter numbers'
  },
  'move-date': {
    keys: '↑ ↓ ← →',
    label: 'move cursor'
  },
  'move-time-ver': {
    keys: '↑ ↓',
    label: 'change value'
  },
  'move-time-hor': {
    keys: '← →',
    label: 'switch hour/min'
  },
  'qead-date': {
    keys: 'Q / E / A / D',
    label: 'change year/month'
  }
};
const getDTActionBar = (isDateOn: boolean, isTimeOn: boolean, isRange: boolean, active: DateTimeSection, isError: boolean) => {
  const theme = getAskOptionsForState(false, isError);
  const keys = [
    isDateOn && !isTimeOn && isRange ? 'tab-range' : undefined,
    isDateOn && isTimeOn && !isRange ? 'tab-section' : undefined,
    ...(active === 'date' ? ['nums-date', 'move-date', 'qead-date'] : []),
    ...(active === 'time' ? ['nums-time', 'move-time-ver', 'move-time-hor'] : [])
  ].filter((id) => id && actionConfig[id]) as string[];
  return theme.colours.specialInfo(getActionBar(keys, actionConfig));
};

const getDTErrorLine = ({ isError, errorMessage }: ErrorInfo): string => {
  if (!isError) return '';
  const theme = getAskOptionsForState(false, isError);
  const maxWidth = out.utils.getTerminalWidth() - (out.getWidth(theme.symbols.specialErrorIcon) + 2) * 2;
  const icon = theme.colours.specialErrorIcon(theme.symbols.specialErrorIcon);
  const msg = out.truncate(errorMessage, maxWidth);
  const text = `${icon} ${msg} ${icon}`;
  return out.center(theme.colours.specialErrorMsg(text));
};

const getCurrDynDate = (): DynDate => dateToDynDate(new Date());
const getCurrDynTime = (): DynTime => {
  const now = new Date();
  return [now.getHours(), now.getMinutes()];
};

interface HandlersObj {
  date: DateTimeHandlerObj<[DynDate, DynDate]>;
  time: DateTimeHandlerObj<DynTime>;
}

const getStateDisplay = (
  handlers: HandlersObj,
  isDateOn: boolean,
  isTimeOn: boolean,
  isRange: boolean,
  isComplete: boolean,
  isError: boolean
): string => {
  const theme = getAskOptionsForState(isComplete, isError);
  const [start, end] = isDateOn ? handlers.date.getValue() : [[1970, 1, 1] as DynDate];
  const time = isTimeOn ? handlers.time.getValue() : undefined;

  if (isRange) {
    const [startOut, endOut] = [start, end].map((d) => valueDisplays.date(dynDateToDate(d, time), isComplete, isError, isDateOn, isTimeOn));
    const separator = theme.colours.decoration(' → ');
    return `${startOut}${separator}${endOut}`;
  }
  return valueDisplays.date(dynDateToDate(start, time), isComplete, isError, isDateOn, isTimeOn);
};

interface ValueSet {
  date: [DynDate, DynDate];
  time: DynTime;
}

const overallHandler = <T extends unknown>(
  questionText: string | Breadcrumb = 'Please pick a date:',
  isDateOn: boolean,
  isTimeOn: boolean,
  isRange: boolean,
  initialDate: [DynDate, DynDate] = [getCurrDynDate(), isRange ? getCurrDynDate() : getCurrDynDate()],
  initialTime: DynTime = getCurrDynTime(),
  convertFn: (current: [[DynDate, DynDate], DynTime]) => T,
  validateFn?: (result: T) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T> => {
  // const originalLC = opts.general.lc;
  const tempLC = getLineCounter();
  // opts.general.lc = tempLC;

  const deferred = getDeferred<T>();

  const isSwitchable = isDateOn && isTimeOn;
  let activeHandler: DateTimeSection = isDateOn ? 'date' : 'time';

  // Set on value change only (to avoid spamming validation functions)
  let errorInfo: ErrorInfo = { isError: false, errorMessage: undefined };
  const getErrorInfo = () => errorInfo;

  const valueCache: ValueSet = {
    date: initialDate,
    time: initialTime
  };
  const onValueChange =
    <P extends 'date' | 'time'>(key: P) =>
    (newValue: ValueSet[P]) => {
      valueCache[key] = newValue;
      errorInfo = runValidation();
    };

  const getResult = (dateData: [DynDate, DynDate] = valueCache.date, timeData: DynTime = valueCache.time) => convertFn([dateData, timeData]);

  const runValidation = (dateData: [DynDate, DynDate] = valueCache.date, timeData: DynTime = valueCache.time) => {
    const validateResult = validateFn?.(getResult(dateData, timeData));
    const info = getErrorInfoFromValidationResult(validateResult);
    return info;
  };

  const displayCache: { date: string[]; time: string[] } = { date: [], time: [] };
  const onDisplay = (key: 'date' | 'time') => (lines: string[]) => {
    DEBUG_TIMER.start('overall display');
    displayCache[key] = lines;

    const { date, time } = displayCache;

    const { isError, errorMessage } = errorInfo;

    const sections = [];
    if (date.length) sections.push(date);
    if (date.length && time.length) sections.push(out.centerLines([''], 8));
    if (time.length) sections.push(date.length ? out.centerLines(['', '', ...time]) : time); // add 2 lines to top of time if date is on

    const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, false, isError);
    const outMain = out.center(out.utils.joinLines(sections.length ? out.concatLineGroups(...sections) : sections[0]), undefined, undefined, false);
    const outAction = getDTActionBar(isDateOn, isTimeOn, isRange, activeHandler, isError);
    const outError = getDTErrorLine(errorInfo);

    let output = '';
    output += getImitateOutput(questionText, outState, false, isError, undefined);
    output += '\n';
    output += '\n' + outMain;
    output += '\n' + outError;
    output += '\n' + outAction;

    tempLC.log(tempLC.ansi.clear() + output);

    if (IS_DEBUG) {
      tempLC.add(DEBUG_TIMER.log());
    }
    DEBUG_TIMER.reset();
  };

  const handlers: HandlersObj = {
    date:
      (isDateOn && dateHandler(activeHandler === 'date', initialDate, onValueChange('date'), getErrorInfo, onDisplay('date'), isRange)) || undefined,
    time: (isTimeOn && timeHandler(activeHandler === 'time', initialTime, onValueChange('time'), getErrorInfo, onDisplay('time'))) || undefined
  };
  const eachHandler = (cb: (key: string, handler: DateTimeHandlerObj<any>) => any) =>
    Object.entries(handlers)
      .filter(([key, handler]) => handler)
      .forEach(([key, handler]) => cb(key, handler));

  const switchActive = () => {
    if (isSwitchable) {
      activeHandler = activeHandler === 'date' ? 'time' : 'date';
      eachHandler((key, handler) => handler.setActive(key === activeHandler));
    }
  };

  const submit = () => {
    const dates = handlers.date?.getValue();
    const time = handlers.time?.getValue();

    const { isError } = runValidation(dates, time);
    if (isError) return;

    const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, true, isError);
    kl.stop();
    tempLC.clear();
    // opts.general.lc = originalLC;
    ask.imitate(questionText, outState, true, false, lc);
    deferred.resolve(convertFn([dates, time]));
  };

  const numberInputter = getNumberInputter();

  const kl = getKeyListener((key) => {
    DEBUG_TIMER.start('since keypress');
    switch (key) {
      case 'tab':
        numberInputter.reset();
        if (isDateOn && !isTimeOn && isRange && activeHandler === 'date') {
          return handlers.date.inputKey(key, undefined);
        }
        return switchActive();
      case 'return':
        numberInputter.reset();
        return submit();
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        return handlers[activeHandler].inputKey(undefined, numberInputter.input(Number(key)));
      case 'backspace':
        return handlers[activeHandler].inputKey(undefined, numberInputter.backspace());
      default:
        numberInputter.reset();
        return handlers[activeHandler].inputKey(key, undefined);
    }
  });

  eachHandler((key, handler) => handler.triggerDisplay());

  return deferred.promise;
};

const getDefaultDate = (isDateOn: boolean, isTimeOn: boolean, dateOffset: number = 0) => {
  let [date, time] = new Date(Date.now() + days(dateOffset)).toISOString().match(/([0-9]{4}-[0-9]{2}-[0-9]{2})|(?!T)([0-9]{2}:[0-9]{2})/g);

  if (!isTimeOn) time = '00:00';
  return new Date(date + ' ' + time);
};

/**<!-- DOCS: ask.date ### @ -->
 * date
 *
 * - `ask.date`
 *
 * Get a date input from the user.
 *
 * ```typescript
 * const date = await ask.date('Whats the date?');
 * // [Date: 2023-01-01T12:00:00.000Z] (user inputted date, always at 12 midday)
 * ```
 * @param {string | Breadcrumb} [questionText]
 * @param {Date} [initial]
 * @returns {Promise<Date>}
 */
export const date = async (
  questionText?: string | Breadcrumb,
  initial?: Date,
  validate?: (date: Date) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<Date> => {
  const initDateObj = initial || getDefaultDate(true, false);
  const initDate = dateToDynDate(initDateObj);

  const convertToDateObj = ([[ddate]]: [[DynDate, DynDate], DynTime]) => dynDateToDate(ddate);

  return overallHandler(questionText, true, false, false, [initDate, initDate], undefined, convertToDateObj, validate, lc);
};

/**<!-- DOCS: ask.time ### @ -->
 * time
 *
 * - `ask.time`
 *
 * Get a time input from the user.
 *
 * ```typescript
 * const time = await ask.time('Whats the time?');
 * // [Date: 2023-01-01T12:00:00.000Z] (user inputted time, with todays date)
 *
 * const time2 = await ask.time('Whats the time?', new Date('1999-12-31'));
 * // [Date: 1999-12-31T12:00:00.000Z] (user inputted time, with same date as initial)
 * ```
 * @param {string | Breadcrumb} [questionText]
 * @param {Date} [initial]
 * @returns {Promise<Date>}
 */
export const time = async (
  questionText?: string | Breadcrumb,
  initial?: Date,
  validate?: (date: Date) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<Date> => {
  const initDateObj = initial || getDefaultDate(false, true);
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);

  const convertToDateObj = ([_d, dtime]: [[DynDate, DynDate], DynTime]) => dynDateToDate(dateToDynDate(initDateObj), dtime);

  return overallHandler(questionText, false, true, false, [initDate, initDate], initTime, convertToDateObj, validate, lc);
};

/**<!-- DOCS: ask.datetime ### @ -->
 * datetime
 *
 * - `ask.datetime`
 *
 * Get a date and time input from the user.
 *
 * ```typescript
 * const when = await ask.datetime('Whats the date/time?');
 * // [Date: 2023-03-05T20:30:00.000Z] (user inputted time & date)
 * ```
 * @param {string | Breadcrumb} [questionText]
 * @param {Date} [initial]
 * @returns {Promise<Date>}
 */
export const datetime = async (
  questionText?: string | Breadcrumb,
  initial?: Date,
  validate?: (date: Date) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<Date> => {
  const initDateObj = initial || getDefaultDate(true, true);
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);

  const convertToDateObj = ([[ddate], dtime]: [[DynDate, DynDate], DynTime]) => dynDateToDate(ddate, dtime);

  return overallHandler(questionText, true, true, false, [initDate, initDate], initTime, convertToDateObj, validate, lc);
};

/**<!-- DOCS: ask.dateRange ### @ -->
 * dateRange
 *
 * - `ask.dateRange`
 *
 * Get a date range input from the user.
 *
 * ```typescript
const range = await ask.dateRange('When is the festival?');
// [
//   [Date: 2023-03-01T12:00:00.000Z],
//   [Date: 2023-03-31T12:00:00.000Z]
// ]
 * ```
 * @param {string | Breadcrumb} [questionText]
 * @param {Date} [initialStart]
 * @param {Date} [initialEnd]
 * @returns {Promise<[Date, Date]>}
 */
export const dateRange = async (
  questionText?: string | Breadcrumb,
  initialStart?: Date,
  initialEnd?: Date,
  validate?: (dates: [Date, Date]) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<[Date, Date]> => {
  const initDateObj1 = initialStart || getDefaultDate(true, false);
  const initDateObj2 = initialEnd || getDefaultDate(true, false, 1);
  const initDate = [dateToDynDate(initDateObj1), dateToDynDate(initDateObj2)] as [DynDate, DynDate];

  const convertToDateObjs = ([[ddate1, ddate2]]: [[DynDate, DynDate], DynTime]) => [dynDateToDate(ddate1), dynDateToDate(ddate2)] as [Date, Date];

  return overallHandler(questionText, true, false, true, initDate, undefined, convertToDateObjs, validate, lc);
};
