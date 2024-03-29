import { range } from 'swiss-ak';
import { DynTime } from '../../../utils/dynDates';
import { out } from '../../out';
import { getAskOptionsForState } from '../basicInput/customise';
import { ErrorInfo } from '../errorValidation';
import { getSpecialColours } from './styles';
import { DateTimeHandler, DateTimeHandlerObj } from './types';

const getSingleTimeDial = (value: number, sectionActive: boolean, dialActive: boolean, max: number, label: string, isError: boolean) => {
  const theme = getAskOptionsForState(false, isError);
  const col = getSpecialColours(sectionActive, false, isError);

  const wrapFns = [col.faded, col.normal, dialActive ? col.hover : col.selected];
  const showExtra = wrapFns.length - 1;

  const dialNums = range(showExtra * 2 + 1, undefined, value - showExtra).map((v) => (v + max) % max);

  const dial = out.rightLines(dialNums.map((v, i) => wrapFns[Math.min(i, dialNums.length - i - 1)](` ${(v + '').padStart(2)} `)));

  const lines = out.centerLines([col.normal(label), theme.colours.decoration('◢◣'), ...dial, theme.colours.decoration('◥◤')], 4);

  return lines;
};

export const timeHandler: DateTimeHandler<DynTime> = (
  isActive: boolean,
  initial: DynTime,
  valueChangeCb: (value: DynTime) => void,
  getErrorInfo: () => ErrorInfo,
  displayCb: (lines: string[]) => any
): DateTimeHandlerObj<DynTime> => {
  const MAX_COL = 2; // note: maybe add seconds later
  const MAX_VALUES = [24, 60, 60];
  const labels = ['hh', 'mm', 'ss'];

  // state
  let current: DynTime = [...initial];
  let cursor: number = 0; // 0 = hour, 1 = minute, 2 = second
  let active: boolean = isActive;

  const operation = {
    display: () => {
      const { isError, errorMessage } = getErrorInfo();

      const dials = current.map((v, i) => getSingleTimeDial(v, active, active && i === cursor, MAX_VALUES[i], labels[i], isError));
      const lines = out.concatLineGroups(...dials);

      const padded = out.centerLines(lines);

      displayCb(padded);
    }
  };

  const userActions = {
    set: (val: number) => {
      const max = MAX_VALUES[cursor];
      current[cursor] = (max + val) % max;
      valueChangeCb(current);
      operation.display();
    },
    moveHor: (dir: number) => {
      cursor = (MAX_COL + cursor + dir) % MAX_COL;
      valueChangeCb(current);
      operation.display();
    },
    moveVer: (dir: number) => {
      const max = MAX_VALUES[cursor];
      current[cursor] = (max + current[cursor] + dir) % max;
      valueChangeCb(current);
      operation.display();
    }
  };

  const result: DateTimeHandlerObj<DynTime> = {
    getValue: () => current,
    setActive: (isActive: boolean) => {
      active = isActive;
      operation.display();
    },
    triggerDisplay: () => operation.display(),
    inputKey: (key: string, num?: number) => {
      if (num !== undefined) return userActions.set(num);
      switch (key) {
        case 'right':
          return userActions.moveHor(1);
        case 'left':
          return userActions.moveHor(-1);
        case 'up':
          return userActions.moveVer(-1);
        case 'down':
          return userActions.moveVer(1);
      }
    }
  };
  return result;
};
