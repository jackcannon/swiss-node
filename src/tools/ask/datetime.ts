import chalk from 'chalk';
import { getDeferred, getTimer } from 'swiss-ak';
import { ActionBarConfig, getActionBar } from '../../utils/actionBar';
import { dateToDynDate, dateToDynTime, DynDate, dynDateToDate, DynTime } from '../../utils/dynDates';
import { getKeyListener } from '../keyListener';
import { getNumberInputter } from '../../utils/numberInputter';
import { imitate } from '../ask';
import * as out from '../out';
import { Breadcrumb } from '../out/breadcrumb';
import { getLineCounter } from '../out/lineCounter';
import { dateHandler } from './datetime/date';
import { timeHandler } from './datetime/time';
import { DateTimeHandlerObj } from './datetime/types';

//<!-- DOCS: 110 -->

type DateTimeSection = 'date' | 'time';

const DEBUG_TIMER = getTimer('DEBUG', false, chalk.red, chalk);
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
const getDTActionBar = (isDateOn: boolean, isTimeOn: boolean, isRange: boolean, active: DateTimeSection) => {
  const keys = [
    isDateOn && !isTimeOn && isRange ? 'tab-range' : undefined,
    isDateOn && isTimeOn && !isRange ? 'tab-section' : undefined,
    ...(active === 'date' ? ['nums-date', 'move-date', 'qead-date'] : []),
    ...(active === 'time' ? ['nums-time', 'move-time-ver', 'move-time-hor'] : [])
  ].filter((id) => id && actionConfig[id]) as string[];
  return getActionBar(keys, actionConfig);
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

const displayDate = (ddate: DynDate) => dynDateToDate(ddate).toDateString();
const displayTime = (dtime: DynTime) => dtime.map((v) => (v + '').padStart(2, '0')).join(':');

const getStateDisplay = (handlers: HandlersObj, isDateOn: boolean, isTimeOn: boolean, isRange: boolean): string => {
  const [start, end] = isDateOn ? handlers.date.getValue() : [];
  const time = isTimeOn ? handlers.time.getValue() : undefined;

  const dateStr = isDateOn ? (isRange ? `${displayDate(start)} → ${displayDate(end)}` : displayDate(start)) : undefined;

  const timeStr = isTimeOn ? displayTime(time) : undefined;

  return [dateStr, timeStr].filter((v) => v).join(' @ ');
};

const overallHandler = (
  questionText: string | Breadcrumb = 'Please pick a date:',
  isDateOn: boolean,
  isTimeOn: boolean,
  isRange: boolean,
  initialDate: [DynDate, DynDate] = [getCurrDynDate(), isRange ? getCurrDynDate() : getCurrDynDate()],
  initialTime: DynTime = getCurrDynTime()
): Promise<[[DynDate, DynDate], DynTime]> => {
  const lc = getLineCounter();
  const deferred = getDeferred<[[DynDate, DynDate], DynTime]>();

  const isSwitchable = isDateOn && isTimeOn;

  let activeHandler: DateTimeSection = isDateOn ? 'date' : 'time';

  const displayCache: { date: string[]; time: string[] } = { date: [], time: [] };
  const onDisplay = (key: string) => (lines: string[]) => {
    DEBUG_TIMER.start('overall display');
    displayCache[key] = lines;

    const { date, time } = displayCache;

    const sections = [];
    if (date.length) sections.push(date);
    if (date.length && time.length) sections.push(out.centerLines([''], 8));
    if (time.length) sections.push(date.length ? out.centerLines(['', '', ...time]) : time); // add 2 lines to top of time if date is on

    const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange);
    const outMain = out.center(out.utils.joinLines(sections.length ? out.concatLineGroups(...sections) : sections[0]), undefined, undefined, false);
    const outAction = getDTActionBar(isDateOn, isTimeOn, isRange, activeHandler);

    lc.clear();
    lc.wrap(1, () => imitate(false, questionText, outState));
    lc.log();
    lc.log(outMain);
    lc.log();
    lc.log(outAction);

    if (IS_DEBUG) {
      lc.add(DEBUG_TIMER.log());
    }
    DEBUG_TIMER.reset();
  };

  const handlers: HandlersObj = {
    date: (isDateOn && dateHandler(activeHandler === 'date', initialDate, onDisplay('date'), isRange)) || undefined,
    time: (isTimeOn && timeHandler(activeHandler === 'time', initialTime, onDisplay('time'))) || undefined
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
    const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange);
    kl.stop();
    lc.clear();
    imitate(false, questionText, outState);
    deferred.resolve([dates, time]);
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

/**<!-- DOCS: ### -->
 * date
 *
 * - `ask.date`
 *
 * Get a date input from the user.
 */
export const date = async (questionText?: string | Breadcrumb, initial?: Date): Promise<Date> => {
  const initDateObj = initial || new Date();
  const initDate = dateToDynDate(initDateObj);
  const [[ddate]] = await overallHandler(questionText, true, false, false, [initDate, initDate]);
  return dynDateToDate(ddate);
};

/**<!-- DOCS: ### -->
 * time
 *
 * - `ask.time`
 *
 * Get a time input from the user.
 */
export const time = async (questionText?: string | Breadcrumb, initial?: Date): Promise<Date> => {
  const initDateObj = initial || new Date();
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);
  const [_d, dtime] = await overallHandler(questionText, false, true, false, [initDate, initDate], initTime);
  return dynDateToDate(dateToDynDate(initDateObj), dtime);
};

/**<!-- DOCS: ### -->
 * datetime
 *
 * - `ask.datetime`
 *
 * Get a date and time input from the user.
 */
export const datetime = async (questionText?: string | Breadcrumb, initial?: Date): Promise<Date> => {
  const initDateObj = initial || new Date();
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);
  const [[ddate], dtime] = await overallHandler(questionText, true, true, false, [initDate, initDate], initTime);
  return dynDateToDate(ddate, dtime);
};

/**<!-- DOCS: ### -->
 * dateRange
 *
 * - `ask.dateRange`
 *
 * Get a date range input from the user.
 */
export const dateRange = async (questionText?: string | Breadcrumb, initialStart?: Date, initialEnd?: Date): Promise<[Date, Date]> => {
  const initDateObj1 = initialStart || new Date();
  const initDateObj2 = initialEnd || new Date();
  const initDate = [dateToDynDate(initDateObj1), dateToDynDate(initDateObj2)] as [DynDate, DynDate];
  const [[ddate1, ddate2]] = await overallHandler(questionText, true, false, true, initDate);
  return [dynDateToDate(ddate1), dynDateToDate(ddate2)];
};
