import { wait, fn, ArrayUtils, zipMax, sortByMapped } from 'swiss-ak';
import stringWidth from 'string-width';
import { getLogStr } from './LogUtils';
import { Text } from '../utils/processTableInput';
import { getLineCounter } from './out/lineCounter';
import { getBreadcrumb } from './out/breadcrumb';
import chalk from 'chalk';

const NEW_LINE = '\n';

const textToString = (text: Text): string => (text instanceof Array ? joinLines(text) : text);

/**
 * out.utils.getTerminalWidth
 *
 * Get maximum terminal width (columns)
 *
 * ```typescript
 * print.utils.getTerminalWidth(); // 127
 * ```
 */
const getTerminalWidth = () => (process?.stdout?.columns ? process.stdout.columns : 100);

/**
 * out.utils.getLines
 *
 * Split multi-line text into an array of lines
 */
const getLines = (text: Text): string[] => textToString(text).split(NEW_LINE);
/**
 * out.utils.getNumLines
 *
 * Get how many lines a string or array of lines has
 */
const getNumLines = (text: Text): number => getLines(text).length;
/**
 * out.utils.getLinesWidth
 *
 * Get how wide a string or array of lines has
 */
const getLinesWidth = (text: Text): number => Math.max(...getLines(text).map((line) => stringWidth(line)));

/**
 * out.utils.getLogLines
 *
 * Split a log-formatted multi-line text into an array of lines
 */
const getLogLines = (item: any): string[] => getLines(getLogStr(item));
/**
 * out.utils.getNumLogLines
 *
 * Get how many lines a log-formatted string or array of lines has
 */
const getNumLogLines = (item: Text): number => getNumLines(getLogStr(item));
/**
 * out.utils.getLogLinesWidth
 *
 * Get how wide a log-formatted string or array of lines has
 */
const getLogLinesWidth = (item: Text): number => getLinesWidth(getLogStr(item));

/**
 * out.utils.joinLines
 *
 * Join an array of lines into a single multi-line string
 */
const joinLines = (lines: string[]): string => lines.map(fn.maps.toString).join(NEW_LINE);

/**
 * out.pad
 *
 * Pad before and after the given text with the given character.
 *
 * ```typescript
 * pad('foo', 3, 1, '-'); // '---foo-'
 * pad('bar', 10, 5, '_'); // '__________bar_____'
 * ```
 */
export const pad = (line: string, start: number, end: number, replaceChar: string = ' '): string =>
  `${replaceChar.repeat(Math.max(0, start))}${line}${replaceChar.repeat(Math.max(0, end))}`;

export type AlignType = 'left' | 'right' | 'center' | 'justify';
type AlignFunction = (item: any, width?: number, replaceChar?: string, forceWidth?: boolean) => string;

const correctWidth = (width: number): number => (width < 0 || width === Infinity ? getTerminalWidth() : Math.min(width, getTerminalWidth()));

/**
 * out.center
 *
 * Align the given text to the center within the given width of characters/columns
 *
 * Giving a width of 0 will use the terminal width
 *
 * ```typescript
 * out.center('foo', 10); // '   foo    '
 * out.center('something long', 10); // 'something long'
 * out.center('lines\n1\n2', 5);
 * // 'lines' + '\n' +
 * // '  1  ' + '\n' +
 * // '  2  '
 * ```
 */
export const center: AlignFunction = (item: any, width: number = getTerminalWidth(), replaceChar: string = ' ', forceWidth: boolean = true): string =>
  getLogLines(item)
    .map((line) =>
      pad(
        line,
        Math.floor((correctWidth(width) - stringWidth(line)) / 2),
        forceWidth ? Math.ceil((correctWidth(width) - stringWidth(line)) / 2) : 0,
        replaceChar
      )
    )
    .join(NEW_LINE);

/**
 * out.left
 *
 * Align the given text to the left within the given width of characters/columns
 *
 * Giving a width of 0 will use the terminal width
 *
 * ```typescript
 * out.left('foo', 10); // 'foo       '
 * out.left('something long', 10); // 'something long'
 * out.left('lines\n1\n2', 5);
 * // 'lines' + '\n' +
 * // '1    ' + '\n' +
 * // '2    '
 * ```
 */
export const left: AlignFunction = (item: any, width: number = getTerminalWidth(), replaceChar: string = ' ', forceWidth: boolean = true): string =>
  getLogLines(item)
    .map((line) => pad(line, 0, forceWidth ? correctWidth(width) - stringWidth(line) : 0, replaceChar))
    .join(NEW_LINE);

/**
 * out.right
 *
 * Align the given text to the right within the given width of characters/columns
 *
 * Giving a width of 0 will use the terminal width
 *
 * ```typescript
 * out.right('foo', 10); // '       foo'
 * out.right('something long', 10); // 'something long'
 * out.right('lines\n1\n2', 5);
 * // 'lines' + '\n' +
 * // '    1' + '\n' +
 * // '    2'
 * ```
 */
export const right: AlignFunction = (item: any, width: number = getTerminalWidth(), replaceChar: string = ' ', forceWidth: boolean = true): string =>
  getLogLines(item)
    .map((line) => pad(line, correctWidth(width) - stringWidth(line), 0, replaceChar))
    .join(NEW_LINE);

/**
 * out.justify
 *
 * Evenly space the text horizontally across the given width.
 *
 * Giving a width of 0 will use the terminal width
 *
 * ```typescript
 * const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
 * out.justify(out.wrap(lorem, 20), 20);
 * // 'Lorem  ipsum   dolor' + '\n' +
 * // 'sit            amet,' + '\n' +
 * // 'consectetur         ' + '\n' +
 * // 'adipiscing      elit'
 * ```
 */
export const justify: AlignFunction = (
  item: any,
  width: number = getTerminalWidth(),
  replaceChar: string = ' ',
  forceWidth: boolean = true
): string =>
  getLogLines(item)
    .map((line) => {
      const words = line.split(' ');
      if (words.length === 1) return left(words[0], width, replaceChar, forceWidth);
      const currW = words.map((w) => w.length).reduce(fn.reduces.combine);
      const perSpace = Math.floor((width - currW) / (words.length - 1));
      const remain = (width - currW) % (words.length - 1);
      const spaces = ArrayUtils.range(words.length - 1)
        .map((i) => perSpace + Number(words.length - 2 - i < remain))
        .map((num) => replaceChar.repeat(num));
      let result = '';
      for (let index in words) {
        result += words[index] + (spaces[index] || '');
      }
      return result;
    })
    .join(NEW_LINE);

// TODO docs
const getLongestLen = (lines: string[]): number => Math.max(...lines.map((line) => stringWidth(line)));

export const leftLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => out.left(line, width));
export const centerLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => out.center(line, width));
export const rightLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => out.right(line, width));
export const justifyLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => out.justify(line, width));

const alignFunc = {
  left,
  center,
  right,
  justify
};

/**
 * out.align
 *
 * Align the given text to the given alignment within the given width of characters/columns
 *
 * Giving a width of 0 will use the terminal width
 *
 * ```typescript
 * out.align('foo', 'left', 10); // 'foo       '
 * out.align('something long', 'center', 10); // 'something long'
 * out.align('lines\n1\n2', 'right', 5);
 * // 'lines' + '\n' +
 * // '    1' + '\n' +
 * // '    2'
 * ```
 */
export const align = (item: any, direction: AlignType, width: number = getTerminalWidth(), replaceChar: string = ' ', forceWidth: boolean = true) => {
  const func = alignFunc[direction] || alignFunc.left;
  return func(item, width, replaceChar, forceWidth);
};

// todo docs
export const split = (leftItem: any, rightItem: any, width: number = getTerminalWidth(), replaceChar: string = ' ') =>
  `${leftItem + ''}${replaceChar.repeat(Math.max(0, width - (stringWidth(leftItem + '') + stringWidth(rightItem + ''))))}${rightItem + ''}`;

/**
 * out.wrap
 *
 * Wrap the given text to the given width of characters/columns
 *
 * ```typescript
 * wrap('This is a sentence', 15);
 * // 'This is' + '\n' +
 * // 'a sentence'
 * ```
 */
export const wrap = (item: any, width: number = getTerminalWidth(), alignment?: AlignType, forceWidth: boolean = false): string =>
  getLogLines(item)
    .map((line) => {
      if (stringWidth(line) > width) {
        let words: string[] = line.split(/(?<=#?[ -]+)/g);
        const rows: string[][] = [];

        words = words
          .map((orig: string) => {
            if (stringWidth(orig.replace(/\s$/, '')) > width) {
              let remaining = orig;
              let result = [];
              while (stringWidth(remaining) > width - 1) {
                result.push(remaining.slice(0, width - 1) + '-');
                remaining = remaining.slice(width - 1);
              }
              result.push(remaining);
              return result;
            }
            return orig;
          })
          .flat();

        let rowStartIndex = 0;

        for (let wIndex in words) {
          let word = words[wIndex].replace(/\s$/, '');

          const candidateRow = words.slice(rowStartIndex, Math.max(0, Number(wIndex)));
          const candText = candidateRow.join('');

          if (stringWidth(candText) + stringWidth(word) > width) {
            rows.push(candidateRow);
            rowStartIndex = Number(wIndex);
          }
        }

        const remaining = words.slice(rowStartIndex);
        rows.push(remaining);

        return rows
          .map((row) => row.join(''))
          .map((row) => row.replace(/\s$/, ''))
          .map((row) => (alignment ? align(row, alignment, width, undefined, forceWidth) : row));
      }

      return line;
    })
    .flat()
    .join(NEW_LINE);

/**
 * out.moveUp
 *
 * Move the terminal cursor up X lines, clearing each row.
 *
 * Useful for replacing previous lines of output
 *
 * ```typescript
 * moveUp(1);
 * ```
 */
export const moveUp = (lines: number = 1) => {
  if (process?.stdout?.clearLine) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(0);
    for (let i = 0; i < lines; i++) {
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(0);
    }
  }
};

const loadingDefault = (s) => console.log(chalk.dim(`${s}`));
const loadingWords = [
  '???-o-????-????-??-??-????',
  '????-??-a-????-????-??-??',
  '????-????-??-d-????-????-??',
  '??-????-????-???-i-????-????',
  '??-??-????-????-??-n-????',
  '????-???-??-????-????-??-g',
  '????-????-???-??-????-????-g',
  'l-????-????-???-??-????-????'
].map((word) => word.split('-'));
const loadingChars = ArrayUtils.repeat((loadingWords.length + 1) * loadingWords[0].length, ...loadingWords).map(
  (word, index) =>
    chalk.bold('loading'.slice(0, Math.floor(Math.floor(index) / loadingWords.length))) +
    word.slice(Math.floor(Math.floor(index) / loadingWords.length)).join('') +
    ['   ', '.  ', '.. ', '...'][Math.floor(index / 3) % 4]
);

/**
 * out.loading
 *
 * Display an animated loading indicator
 *
 * ```typescript
 * const loader = out.loading();
 * // ...
 * loader.stop();
 * ```
 */
export const loading = (action: (s: string) => any = loadingDefault, lines: number = 1, symbols: string[] = loadingChars) => {
  let stopped = false;

  let count = 0;
  const runLoop = async () => {
    if (stopped) return;
    if (count) moveUp(lines);
    action(symbols[count++ % symbols.length]);
    await wait(150);
    return runLoop();
  };

  runLoop();

  return {
    stop: () => {
      moveUp(lines);
      stopped = true;
    }
  };
};

/**
 * out.utils.hasColor
 *
 * Determine whether a given string contains any chalk-ed colours
 */
export const hasColor = (str: string): boolean => Boolean(str.match(new RegExp(`\\u001b\[[0-9]+m`, 'g')));

/**
 * out.limitToLength
 *
 * Limit the length of a string to the given length
 *
 * ```typescript
 * out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
 * ```
 */
export const limitToLength = (text: string, maxLength: number): string =>
  joinLines(
    getLines(text).map((line) => {
      let specials = '';
      let result = line;
      while (stringWidth(result) > maxLength) {
        const match = result.match(new RegExp(`(\\u001b\[[0-9]+m|.)$`));
        const { 0: removed, index } = match || { 0: result.slice(-1), index: result.length - 1 };

        if (removed.match(new RegExp(`\\u001b\[[0-9]+m`))) {
          specials = removed + specials;
        }
        result = result.slice(0, index);
      }
      return result + specials;
    })
  );

// todo docs
// todo dry
export const limitToLengthStart = (text: string, maxLength: number): string =>
  joinLines(
    getLines(text).map((line) => {
      let specials = '';
      let result = line;
      while (stringWidth(result) > maxLength) {
        const match = result.match(new RegExp(`^(\\u001b\[[0-9]+m|.)`));
        const { 0: removed, index } = match || { 0: result.slice(0, 1), index: 1 };

        if (removed.match(new RegExp(`\\u001b\[[0-9]+m`))) {
          specials = specials + removed;
        }
        result = result.slice(index + removed.length);
      }
      return specials + result;
    })
  );

/**
 * out.truncate
 *
 * Limit the length of a string to the given length, and add an ellipsis if necessary
 *
 * ```typescript
 * out.truncate('This is a very long sentence', 15); // 'This is a ve...'
 * ```
 */
export const truncate = (text: string, maxLength: number = getTerminalWidth(), suffix: string = chalk.dim('???')): string =>
  joinLines(getLines(text).map((line) => (stringWidth(line) > maxLength ? limitToLength(line, maxLength - stringWidth(suffix)) + suffix : line)));

// TODO docs
export const truncateStart = (text: string, maxLength: number = getTerminalWidth(), suffix: string = chalk.dim('???')): string =>
  joinLines(
    getLines(text).map((line) => (stringWidth(line) > maxLength ? suffix + limitToLengthStart(line, maxLength - stringWidth(suffix)) : line))
  );

// TODO docs
export const concatLineGroups = (...groups: string[][]) => {
  const maxLen = Math.max(...groups.map((group) => group.length));
  const aligned = groups.map((group) => leftLines([...group, ...Array(maxLen).fill('')].slice(0, maxLen)));
  return zipMax(...aligned).map((line) => line.join(''));
};

export type ResponsiveOption<T> = { minColumns?: number; value: T };
export const getResponsiveValue = <T extends unknown>(options: ResponsiveOption<T>[]): T => {
  const mapped = options.map(({ minColumns, value }) => ({
    min: typeof minColumns === 'number' ? minColumns : 0,
    value
  }));
  const sorted = sortByMapped(mapped, (option) => option.min, fn.desc);
  const termWidth = out.utils.getTerminalWidth();
  return (sorted.find((option) => termWidth >= option.min) ?? sorted[0]).value;
};

export const out = {
  pad,
  center,
  left,
  right,
  justify,
  align,
  split,
  wrap,
  moveUp,
  loading,
  limitToLength,
  limitToLengthStart,
  truncate,
  truncateStart,
  getLineCounter,
  getBreadcrumb,
  concatLineGroups,
  getResponsiveValue,
  utils: {
    getLines,
    getNumLines,
    getLinesWidth,
    getLogLines,
    getNumLogLines,
    getLogLinesWidth,
    joinLines,
    getTerminalWidth,
    hasColor
  }
};
