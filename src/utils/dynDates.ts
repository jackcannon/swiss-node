import { DAY, days, fn, sortByMapped } from 'swiss-ak';

export type DynDate = [number, number, number]; // year, month [1-12], day [1-31]
export type DynTime = [number, number]; // hours [0-23], minutes [0-59]

export const notNaN = (num: number): number => (typeof num !== 'number' || Number.isNaN(num) ? 0 : num);
export const padNum = (num: number, width: number = 2): string => String(num + '').padStart(width, '0');
export const dynDateToDate = ([yr, mo, dy]: DynDate, [hr, mi]: DynTime = [12, 0]): Date =>
  new Date(`${padNum(yr, 4)}-${padNum(mo)}-${padNum(dy)} ${padNum(hr)}:${padNum(mi)}:00 Z+0`);
export const dateToDynDate = (date: Date | number): DynDate => {
  const dateObj: Date = typeof date === 'number' ? new Date(date) : date;
  return [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()];
};
export const dateToDynTime = (date: Date | number): DynTime => {
  const dateObj: Date = typeof date === 'number' ? new Date(date) : date;
  return [dateObj.getHours(), dateObj.getMinutes()];
};
export const sortDynDates = (dates: DynDate[]): DynDate[] => sortByMapped(dates, (value: DynDate) => Number(dynDateToDate(value)));
export const isSameMonth = (aDate: DynDate, bDate: DynDate) => aDate[0] === bDate[0] && aDate[1] === bDate[1];
export const isEqualDynDate = (aDate: DynDate, bDate: DynDate) => isSameMonth(aDate, bDate) && aDate[2] === bDate[2];

// 0 = Mon, 6 = Sun
export const getWeekday = (date: DynDate): number => (Math.floor(dynDateToDate(date).getTime() / DAY) + 3) % 7;

export const getDaysInMonth = (year: number, month: number, _dy?: number): number => {
  if (month !== 2) return [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
};
export const correctDate = ([inYr, inMo, inDy]: DynDate): DynDate => {
  const outYr = Math.abs(notNaN(inYr)) === 0 ? 1 : inYr;
  const outMo = fn.clamp(notNaN(inMo), 1, 12);
  const daysInMonth = getDaysInMonth(outYr, outMo);
  const outDy = fn.clamp(notNaN(inDy), 1, daysInMonth);
  return [outYr, outMo, outDy];
};

export const addMonths = ([yr, mo, dy]: DynDate, add: number = 1): DynDate => {
  const total = yr * 12 + (mo - 1) + add;
  return correctDate([Math.floor(total / 12), (total % 12) + 1, dy]);
};

export const addDays = ([yr, mo, dy]: DynDate, add: number = 1): DynDate => {
  const date = dynDateToDate([yr, mo, dy]);
  const newDate = date.getTime() + days(add);
  return dateToDynDate(newDate);
};

export const getIntermediaryDates = (aDate: DynDate, bDate: DynDate) => {
  const [start, end] = sortDynDates([aDate, bDate]);
  const inter = [];

  const addAnother = (previous: DynDate) => {
    const next = addDays(previous, 1);
    if (!isEqualDynDate(end, next)) {
      inter.push(next);
      addAnother(next);
    }
  };
  if (!isEqualDynDate(start, end)) addAnother(start);
  return inter;
};
