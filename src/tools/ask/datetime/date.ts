import { range } from 'swiss-ak';
import {
  addDays,
  addMonths,
  correctDate,
  DynDate,
  getDaysInMonth,
  getIntermediaryDates,
  getWeekday,
  isSameMonth,
  sortDynDates
} from '../../../utils/dynDates';
import { colr, WrapFn } from '../../colr';
import { out } from '../../out';
import { table } from '../../table';
import { getAskOptionsForState } from '../basicInput/customise';
import { ErrorInfo } from '../errorValidation';
import { getSpecialColours } from './styles';
import { DateTimeHandler, DateTimeHandlerObj } from './types';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const NUM_OF_ROWS = 6; // max num of unique weeks in month (e.g. May 2022)

const getMonthCells = (year: number, month: number, _dy?: number): number[][] => {
  const startWeekDay = getWeekday([year, month, 1]);

  const thisMonthMax = getDaysInMonth(year, month);
  const prevMonthMax = getDaysInMonth(...addMonths([year, month, 1], -1));

  const thisMonth = range(thisMonthMax, 1, 1);
  const prevMonth = range(prevMonthMax, -1, -1);
  const nextMonth = range(28, -1, -1);

  const allCells = [...(startWeekDay ? prevMonth.slice(-startWeekDay) : []), ...thisMonth, ...nextMonth];

  const byRow = range(NUM_OF_ROWS, 7).map((start) => allCells.slice(start, start + 7));

  return byRow;
};

const combineWraps =
  (...wraps: WrapFn[]): WrapFn =>
  (s) =>
    wraps.reduce((acc, wrap) => wrap(acc), s);

interface MonthTableData {
  table: string[];
  coors: number[][];
}
const getMonthTable = (
  active: boolean,
  cursors: [DynDate, DynDate],
  selected: number,
  isRange: boolean,
  slice: [number, number],
  isError: boolean,
  year: number,
  month: number,
  _dy?: number
): MonthTableData => {
  // const styles = getStyles(active);
  const theme = getAskOptionsForState(false, isError);
  const col = getSpecialColours(active, false, isError);
  const selCursor = cursors[selected];

  const monthCells = getMonthCells(year, month);

  const coors = monthCells.map((row, y) => row.map((val, x) => [x, y, val])).flat();
  const nonMonthCoors = coors.filter(([x, y, val]) => val < 0);

  const formatNonMonth = nonMonthCoors.map(([x, y]) => table.utils.getFormat(col.faded, y, x));
  const formatDim = [...formatNonMonth, table.utils.getFormat(col.normal, undefined, undefined, true)];

  const formatCursor: table.TableFormatConfig[] = [];
  if (isSameMonth([year, month, 1], selCursor)) {
    const selCursorCoor = [coors.find(([x, y, val]) => val === selCursor[2])];
    formatCursor.push(...selCursorCoor.map(([x, y]) => table.utils.getFormat(combineWraps(col.hover, colr.reset), y, x)));
  }

  if (isRange) {
    const otherCursor = cursors[selected === 0 ? 1 : 0];
    if (isSameMonth([year, month, 1], otherCursor)) {
      const otherCursorCoor = coors.find(([x, y, val]) => val === otherCursor[2]);
      formatCursor.push(table.utils.getFormat(combineWraps(col.selected, colr.reset), otherCursorCoor[1], otherCursorCoor[0]));
    }

    const inter = getIntermediaryDates(cursors[0], cursors[1]);
    const interNums = inter.filter((i) => isSameMonth([year, month, 1], i)).map(([yr, mo, dy]) => dy);
    const interCoors = coors.filter(([x, y, val]) => interNums.includes(val));
    const formatInter = interCoors.map(([x, y]) => table.utils.getFormat(combineWraps(col.highlight, colr.reset), y, x));
    formatCursor.push(...formatInter);
  }

  const body = monthCells.map((row) => row.map((val) => ` ${(Math.abs(val) + '').padStart(2)} `)).map((row) => row.slice(...slice));

  const headers = [daysOfWeek.slice(...slice)];
  const lines = table.getLines(body, headers, {
    drawOuter: false,
    drawColLines: false,
    drawRowLines: false,
    alignCols: ['right'],
    format: [...formatCursor, ...formatDim],
    wrapLinesFn: theme.colours.decoration,
    overrideHorChar: '─',
    cellPadding: 0
  });

  const monthWidth = out.getWidth(lines[0]);

  const dispYear = out.getWidth(lines[0]) > 20 ? ` ${year}` : '';
  const dispMonth = monthNames[month - 1].slice(0, out.getWidth(lines[0]) - 2);

  const getTitle = (text: string, prefix: string, suffix: string) => {
    const resPrefix = active ? col.hint(prefix) : '';
    const resSuffix = active ? col.hint(suffix) : '';
    const resText = out.center(col.normal(text), monthWidth - (out.getWidth(resPrefix) + out.getWidth(resSuffix)));
    return `${resPrefix}${resText}${resSuffix}`;
  };

  // const titleYear = active ? getTitle(dispYear, '     ◀ Q', 'E ▶     ') : out.center(col.hint(dispYear), monthWidth);
  const titleYear = getTitle(dispYear, '     ◀ Q', 'E ▶     ');
  const titleMonth = getTitle(dispMonth, '  ◀ A', 'D ▶  ');

  return {
    table: [titleYear, titleMonth, ...lines],
    coors
  };
};

export const dateHandler: DateTimeHandler<[DynDate, DynDate]> = (
  isActive: boolean,
  initial: [DynDate, DynDate],
  valueChangeCb: (value: [DynDate, DynDate]) => void,
  getErrorInfo: () => ErrorInfo,
  displayCb: (lines: string[]) => any,
  isRange: boolean = false
): DateTimeHandlerObj<[DynDate, DynDate]> => {
  const MAX_SELECTED = isRange ? 2 : 1;

  // state
  let selected: number = 0;
  let cursors: [DynDate, DynDate] = [...initial];
  let active: boolean = isActive;

  // calced values
  let prevMonth: DynDate;
  let nextMonth: DynDate;
  let currMonthDays: number;

  // render data
  const tables: { actv: MonthTableData; prev: MonthTableData; next: MonthTableData } = {
    actv: { table: [], coors: [] },
    prev: { table: [], coors: [] },
    next: { table: [], coors: [] }
  };

  const operation = {
    recalc: (skipDisplay: boolean = false) => {
      prevMonth = addMonths(cursors[selected], -1);
      nextMonth = addMonths(cursors[selected], 1);
      currMonthDays = getDaysInMonth(...cursors[selected]);

      if (!skipDisplay) {
        operation.display();
      }
    },

    setCursor: (newCursor: DynDate, skipDisplay: boolean = false) => {
      cursors[selected] = newCursor;
      valueChangeCb((isRange ? sortDynDates(cursors) : cursors) as [DynDate, DynDate]);
      operation.recalc(skipDisplay);
    },

    display: () => {
      const { isError, errorMessage } = getErrorInfo();

      const sliceAmount = out.getResponsiveValue([{ minColumns: 130, value: 7 }, { minColumns: 100, value: 3 }, { value: 0 }]);

      tables.actv = getMonthTable(active, cursors, selected, isRange, [0, 10], isError, ...cursors[selected]);
      tables.prev = getMonthTable(false, cursors, selected, isRange, [7 - sliceAmount, 10], isError, ...prevMonth);
      tables.next = getMonthTable(false, cursors, selected, isRange, [0, sliceAmount], isError, ...nextMonth);

      displayCb(out.concatLineGroups(tables.prev.table, tables.actv.table, tables.next.table));
    }
  };

  const userActions = {
    setDate: (date: number) => operation.setCursor([cursors[selected][0], cursors[selected][1], date]),
    switchSelected: () => {
      selected = (selected + 1) % MAX_SELECTED;
      operation.recalc();
    },
    moveMonth: (dir: number) => operation.setCursor(addMonths(cursors[selected], dir)),
    moveYear: (dir: number) => operation.setCursor(addMonths(cursors[selected], dir * 12)),
    moveHor: (dir: number) => {
      const [yr, mo, dy] = cursors[selected];
      const currWeekday = getWeekday(cursors[selected]);
      if ((dir < 0 && currWeekday > 0) || (dir > 0 && currWeekday < 6)) {
        // move within week
        return operation.setCursor(addDays(cursors[selected], dir));
      }
      // move to next month, on same row
      const [currCol, currRow] = tables.actv.coors.find(([x, y, val]) => val === dy);
      const newRow = currRow;
      const newCol = (7 + currCol + dir) % 7;

      const newMonthCoors = [tables.prev.coors, tables.next.coors][Number(dir > 0)];
      let [_x, _y, newDay] = newMonthCoors.find(([x, y]) => x === newCol && y === newRow);
      const [newYear, newMonth] = addMonths(cursors[selected], dir);
      if (newDay < 0) newDay = dir > 0 ? 1 : getDaysInMonth(newYear, newMonth);
      return operation.setCursor(correctDate([newYear, newMonth, newDay]));
    },
    moveVer: (dir: number) => operation.setCursor(addDays(cursors[selected], dir * 7))
  };

  operation.setCursor(initial[0], true); // set initial calced values

  const result: DateTimeHandlerObj<[DynDate, DynDate]> = {
    getValue: () => (isRange ? sortDynDates(cursors) : cursors) as [DynDate, DynDate],
    setActive: (isActive: boolean) => {
      active = isActive;
      operation.display();
    },
    triggerDisplay: () => operation.display(),
    inputKey: (key: string, num?: number) => {
      if (num !== undefined) return userActions.setDate(num);
      switch (key) {
        case 'tab':
          return userActions.switchSelected();
        case 'right':
          return userActions.moveHor(1);
        case 'left':
          return userActions.moveHor(-1);
        case 'up':
          return userActions.moveVer(-1);
        case 'down':
          return userActions.moveVer(1);
        case 'a':
          return userActions.moveMonth(-1);
        case 'd':
          return userActions.moveMonth(1);
        case 'q':
          return userActions.moveYear(-1);
        case 'e':
          return userActions.moveYear(1);
      }
    }
  };
  return result;
};
