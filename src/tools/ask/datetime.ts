import { days, getDeferred } from 'swiss-ak';
import { ActionBarConfig, getActionBar } from '../../utils/actionBar';
import { DynDate, DynTime, dateToDynDate, dateToDynTime, dynDateToDate } from '../../utils/dynDates';
import { getNumberInputter } from '../../utils/numberInputter';
import { ask } from '../ask';
import { getKeyListener } from '../keyListener';
import { LineCounter, ansi, out } from '../out';
import { Breadcrumb } from '../out/breadcrumb';
import { getLineCounter } from '../out/lineCounter';
import { getAskOptions, getAskOptionsForState } from './basicInput/customise';
import { valueDisplays } from './basicInput/valueDisplays';
import { dateHandler } from './datetime/date';
import { timeHandler } from './datetime/time';
import { DateTimeHandlerObj } from './datetime/types';
import { ErrorInfo, getErrorInfoFromValidationResult } from './errorValidation';
import { getImitateOutput } from './imitate';

//<!-- DOCS: 110 -->

type DateTimeSection = 'date' | 'time';

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
  validateFn?: (result: T) => ask.ValidationResponse,
  lc?: LineCounter
): Promise<T> => {
  const deferred = getDeferred<T>();
  const tempLC = getLineCounter();
  const askOptions = getAskOptions();

  const isSwitchable = isDateOn && isTimeOn;
  let activeHandler: DateTimeSection = isDateOn ? 'date' : 'time';

  // Set on value change only (to avoid spamming validation functions)
  let errorInfo: ErrorInfo = { isError: false, errorMessage: undefined };
  const getErrorInfo = () => errorInfo;

  const displayCache: { date: string[]; time: string[] } = { date: [], time: [] };
  const valueCache: ValueSet = {
    date: initialDate,
    time: initialTime
  };

  const operation = {
    onValueChange:
      <P extends 'date' | 'time'>(key: P) =>
      (newValue: ValueSet[P]) => {
        valueCache[key] = newValue;
        errorInfo = operation.runValidation();
      },

    getResult: (dateData: [DynDate, DynDate] = valueCache.date, timeData: DynTime = valueCache.time) => convertFn([dateData, timeData]),

    runValidation: (dateData: [DynDate, DynDate] = valueCache.date, timeData: DynTime = valueCache.time) => {
      const validateResult = validateFn?.(operation.getResult(dateData, timeData));
      const info = getErrorInfoFromValidationResult(validateResult);
      return info;
    },

    onDisplay: (key: 'date' | 'time') => (lines: string[]) => {
      displayCache[key] = lines;
      operation.display();
    },
    display: () => {
      const { date, time } = displayCache;

      const { isError } = errorInfo;

      const sections = [];
      if (date.length) sections.push(date);
      if (date.length && time.length) sections.push(out.centerLines([''], 8));
      if (time.length) sections.push(date.length ? out.centerLines(['', '', ...time]) : time); // add 2 lines to top of time if date is on

      const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, false, isError);
      const outMain = out.center(out.utils.joinLines(sections.length ? out.concatLineGroups(...sections) : sections[0]), undefined, undefined, false);
      const outAction = getDTActionBar(isDateOn, isTimeOn, isRange, activeHandler, isError);
      const outError = getDTErrorLine(errorInfo);

      let output = ansi.cursor.hide;
      output += getImitateOutput(questionText, outState, false, isError, undefined);
      output += '\n';
      output += '\n' + outMain;
      output += '\n' + outError;
      output += '\n' + outAction;

      tempLC.overwrite(tempLC.ansi.moveHome() + output);
    },
    eachHandler: (cb: (key: string, handler: DateTimeHandlerObj<any>) => any) =>
      Object.entries(handlers)
        .filter(([key, handler]) => handler)
        .forEach(([key, handler]) => cb(key, handler)),

    switchActive: () => {
      if (isSwitchable) {
        activeHandler = activeHandler === 'date' ? 'time' : 'date';
        operation.eachHandler((key, handler) => handler.setActive(key === activeHandler));
      }
    },

    exit: () => {
      kl.stop();
      tempLC.clear();
      const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, true, true);
      ask.imitate(questionText, outState, false, true, undefined, lc);
      process.stdout.write(ansi.cursor.show);
      process.exit();
    },

    submit: () => {
      const dates = handlers.date?.getValue();
      const time = handlers.time?.getValue();

      const { isError } = operation.runValidation(dates, time);
      if (isError) {
        if (askOptions.general.beeps) process.stdout.write(ansi.beep);
        return;
      }

      const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, true, isError);
      kl.stop();
      tempLC.clear();
      ask.imitate(questionText, outState, true, false, undefined, lc);
      process.stdout.write(ansi.cursor.show);
      deferred.resolve(convertFn([dates, time]));
    }
  };

  const handlers: HandlersObj = {
    date:
      (isDateOn &&
        dateHandler(activeHandler === 'date', initialDate, operation.onValueChange('date'), getErrorInfo, operation.onDisplay('date'), isRange)) ||
      undefined,
    time:
      (isTimeOn && timeHandler(activeHandler === 'time', initialTime, operation.onValueChange('time'), getErrorInfo, operation.onDisplay('time'))) ||
      undefined
  };

  const numberInputter = getNumberInputter();
  const kl = getKeyListener((key) => {
    switch (key) {
      case 'exit':
      case 'esc':
        return operation.exit();
      case 'tab':
        numberInputter.reset();
        if (isDateOn && !isTimeOn && isRange && activeHandler === 'date') {
          return handlers.date.inputKey(key, undefined);
        }
        return operation.switchActive();
      case 'return':
        numberInputter.reset();
        return operation.submit();
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

  operation.eachHandler((key, handler) => handler.triggerDisplay());

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
 * @param {string | Breadcrumb} [questionText] - Question to ask
 * @param {Date} [initial] - Initial date
 * @param {(date: Date) => ask.ValidationResponse} [validate] - Validation function
 * @param {LineCounter} [lc] - Line counter
 * @returns {Promise<Date>} - Promise that resolves with the user input date
 */
export const date = async (
  questionText?: string | Breadcrumb,
  initial?: Date,
  validate?: (date: Date) => ask.ValidationResponse,
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
 * @param {string | Breadcrumb} [questionText] - Question to ask
 * @param {Date} [initial] - Initial date
 * @param {(date: Date) => ask.ValidationResponse} [validate] - Validation function
 * @param {LineCounter} [lc] - Line counter
 * @returns {Promise<Date>} - Promise that resolves with the user input date
 */
export const time = async (
  questionText?: string | Breadcrumb,
  initial?: Date,
  validate?: (date: Date) => ask.ValidationResponse,
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
 * @param {string | Breadcrumb} [questionText] - Question to ask
 * @param {Date} [initial] - Initial date
 * @param {(date: Date) => ask.ValidationResponse} [validate] - Validation function
 * @param {LineCounter} [lc] - Line counter
 * @returns {Promise<Date>} - Promise that resolves with the user input date
 */
export const datetime = async (
  questionText?: string | Breadcrumb,
  initial?: Date,
  validate?: (date: Date) => ask.ValidationResponse,
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
 * @param {string | Breadcrumb} [questionText] - Question to ask
 * @param {Date} [initialStart] - Initial start date
 * @param {Date} [initialEnd] - Initial end date
 * @param {(dates: [Date, Date]) => ask.ValidationResponse} [validate] - Validation function
 * @param {LineCounter} [lc] - Line counter
 * @returns {Promise<[Date, Date]>} - Promise that resolves with the user input date range
 */
export const dateRange = async (
  questionText?: string | Breadcrumb,
  initialStart?: Date,
  initialEnd?: Date,
  validate?: (dates: [Date, Date]) => ask.ValidationResponse,
  lc?: LineCounter
): Promise<[Date, Date]> => {
  const initDateObj1 = initialStart || getDefaultDate(true, false);
  const initDateObj2 = initialEnd || getDefaultDate(true, false, 1);
  const initDate = [dateToDynDate(initDateObj1), dateToDynDate(initDateObj2)] as [DynDate, DynDate];

  const convertToDateObjs = ([[ddate1, ddate2]]: [[DynDate, DynDate], DynTime]) => [dynDateToDate(ddate1), dynDateToDate(ddate2)] as [Date, Date];

  return overallHandler(questionText, true, false, true, initDate, undefined, convertToDateObjs, validate, lc);
};
