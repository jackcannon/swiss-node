import { out } from '../../out';
import { getAskOptionsForState } from './customise';
import { AskItemData } from './getAskInput';

export const valueDisplays = {
  multiselect: <T>(itemsData: AskItemData<T>, isComplete: boolean, isError: boolean): string => {
    return valueDisplays.array(
      itemsData.selected.map((index) => itemsData.items[index].title),
      isComplete,
      isError
    );
  },
  array: (arr: any[], isComplete: boolean, isError: boolean): string => {
    const theme = getAskOptionsForState(isComplete, isError);
    let display = '';
    if (arr.length <= 2) display = arr.map((v) => valueDisplays.anyByType(v?.title ?? v?.value ?? v, isComplete, isError)).join(', ');
    if (arr.length > 2) display = theme.text.items(arr.length);

    return theme.colours.resultArray(display);
  },
  object: (obj: any, isComplete: boolean, isError: boolean): string => {
    const usableProps = ['title', 'name', 'display', 'value'];
    for (let prop of usableProps) {
      if (obj[prop] !== undefined) return valueDisplays.anyByType(obj[prop], isComplete, isError);
    }
    return '';
  },
  boolean: (bool: boolean, isComplete: boolean, isError: boolean): string => {
    const { colours: col, symbols: sym, general: gen, text: txt } = getAskOptionsForState(isComplete, isError);

    if (isComplete) {
      return col.resultBoolean(bool ? txt.boolYes : txt.boolNo);
    }
    const withCursor = sym.itemHoverIcon;
    const withoutCursor = ' '.repeat(out.getWidth(sym.itemHoverIcon));

    const yesCursor = bool ? withCursor : withoutCursor;
    const noCursor = !bool ? withCursor : withoutCursor;

    const yes = (bool ? col.itemHover : col.itemUnselected)(yesCursor + ' ' + txt.boolYes);
    const no = (!bool ? col.itemHover : col.itemUnselected)(noCursor + ' ' + txt.boolNo);
    return `${yes} ${col.decoration(txt.boolYesNoSeparator)} ${no}`;
  },
  booleanYN: (bool: boolean | string, isComplete: boolean, isError: boolean): string => {
    const theme = getAskOptionsForState(isComplete, isError);
    if (isComplete) {
      return bool === '' ? '' : bool ? theme.text.boolYes : theme.text.boolNo;
    }
    return theme.colours.boolYNText(`${theme.text.boolYN} `);
  },
  number: (num: number | string, isComplete: boolean, isError: boolean): string => {
    const theme = getAskOptionsForState(isComplete, isError);
    return theme.colours.resultNumber('' + num);
  },
  text: (text: string, isComplete: boolean, isError: boolean): string => {
    const theme = getAskOptionsForState(isComplete, isError);
    return theme.colours.resultText(text);
  },
  date: (date: Date, isComplete: boolean, isError: boolean, isDateOn?: boolean, isTimeOn?: boolean): string => {
    const theme = getAskOptionsForState(isComplete, isError);
    const [ogDate, ogTime] = date.toISOString().match(/([0-9]{4}-[0-9]{2}-[0-9]{2})|(?!T)([0-9]{2}:[0-9]{2})/g);
    if (isDateOn === undefined || isTimeOn === undefined) {
      if (isDateOn === undefined) isDateOn = ogDate !== '1970-01-01';
      if (isTimeOn === undefined) isTimeOn = ogTime !== '00:00';
    }

    const dateStr = isDateOn ? date.toDateString() : undefined;

    const timeStr = isTimeOn
      ? ogTime
          .split(':')
          .slice(0, 2)
          .map(Number)
          .map((v) => (v + '').padStart(2, '0'))
          .join(':')
      : undefined;

    return theme.colours.resultDate([dateStr, timeStr].filter((v) => v).join(' @ '));
  },

  // Used by ask.imitate
  anyByType: (value: any, isComplete: boolean, isError: boolean): string => {
    if (Array.isArray(value)) {
      const mappedArr = value.map((v) => valueDisplays.anyByType(v, isComplete, isError));
      return valueDisplays.array(mappedArr, isComplete, isError);
    }
    if (value instanceof Date) return valueDisplays.date(value, isComplete, isError);
    if (typeof value === 'object') return valueDisplays.object(value, isComplete, isError);
    if (typeof value === 'boolean') return valueDisplays.boolean(value, isComplete, isError);
    if (typeof value === 'number') return valueDisplays.number(value, isComplete, isError);
    if (typeof value === 'string') return valueDisplays.text(value, isComplete, isError);

    return value + '';
  }
};
