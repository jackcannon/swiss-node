import { wait, fn, ArrayTools, zipMax, sortByMapped, safe } from 'swiss-ak';
import { getLogStr } from './LogTools';
import { Text } from '../utils/processTableInput';
import { getLineCounter as getLineCounterOut, LineCounter as LineCounterOut } from './out/lineCounter';
import { getBreadcrumb as getBreadcrumbOut, Breadcrumb as BreadcrumbOut } from './out/breadcrumb';
import { colr } from './colr';

//<!-- DOCS: 200 -->
/**<!-- DOCS: out ##! -->
 * out
 *
 * A collection of functions to print to the console
 */
export namespace out {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  const NEW_LINE = '\n';

  /**<!-- DOCS: out.getWidth ### @ -->
   * getWidth
   *
   * - `out.getWidth`
   *
   * A rough approximation of the width of the given text (as it would appear in the terminal)
   *
   * Removes all ansi escape codes, and attempts to count emojis as 2 characters wide
   *
   * Note: Many special characters may not be counted correctly. Emoji support is also not perfect.
   * @param {string} text
   * @returns {number}
   */
  export const getWidth = (text: string): number => {
    // TODO examples
    const args = {
      text: safe.str(text)
    };

    let result = args.text;

    // remove all the ansi escape codes
    result = out.utils.stripAnsi(result);

    // replace emojis with 2 spaces as they are 2 characters wide
    // This is a very rough approximation
    result = result.replace(out.utils.getEmojiRegex('gu'), '  ');

    return result.length;
  };

  /**<!-- DOCS: out.pad ### @ -->
   * pad
   *
   * - `out.pad`
   *
   * Pad before and after the given text with the given character.
   *
   * ```typescript
   * pad('foo', 3, 1, '-'); // '---foo-'
   * pad('bar', 10, 5, '_'); // '__________bar_____'
   * ```
   * @param {string} line
   * @param {number} start
   * @param {number} end
   * @param {string} [replaceChar=' ']
   * @returns {string}
   */
  export const pad = (line: string, start: number, end: number, replaceChar: string = ' '): string =>
    `${replaceChar.repeat(Math.max(0, start))}${line}${replaceChar.repeat(Math.max(0, end))}`;

  export type AlignType = 'left' | 'right' | 'center' | 'justify';
  type AlignFunction = (item: any, width?: number, replaceChar?: string, forceWidth?: boolean) => string;

  const correctWidth = (width: number): number =>
    width < 0 || width === Infinity ? utils.getTerminalWidth() : Math.min(width, utils.getTerminalWidth());

  /**<!-- DOCS: out.center ### @ -->
   * center
   *
   * - `out.center`
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
   * @param {any} item
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {string} [replaceChar=' ']
   * @param {boolean} [forceWidth=true]
   * @returns {string}
   */
  export const center: AlignFunction = (
    item: any,
    width: number = out.utils.getTerminalWidth(),
    replaceChar: string = ' ',
    forceWidth: boolean = true
  ): string =>
    utils
      .getLogLines(item)
      .map((line) =>
        pad(
          line,
          Math.floor((correctWidth(width) - out.getWidth(line)) / 2),
          forceWidth ? Math.ceil((correctWidth(width) - out.getWidth(line)) / 2) : 0,
          replaceChar
        )
      )
      .join(NEW_LINE);

  /**<!-- DOCS: out.left ### @ -->
   * left
   *
   * - `out.left`
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
   * @param {any} item
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {string} [replaceChar=' ']
   * @param {boolean} [forceWidth=true]
   * @returns {string}
   */
  export const left: AlignFunction = (
    item: any,
    width: number = out.utils.getTerminalWidth(),
    replaceChar: string = ' ',
    forceWidth: boolean = true
  ): string =>
    utils
      .getLogLines(item)
      .map((line) => pad(line, 0, forceWidth ? correctWidth(width) - out.getWidth(line) : 0, replaceChar))
      .join(NEW_LINE);

  /**<!-- DOCS: out.right ### @ -->
   * right
   *
   * - `out.right`
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
   * @param {any} item
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {string} [replaceChar=' ']
   * @param {boolean} [forceWidth=true]
   * @returns {string}
   */
  export const right: AlignFunction = (
    item: any,
    width: number = out.utils.getTerminalWidth(),
    replaceChar: string = ' ',
    forceWidth: boolean = true
  ): string =>
    utils
      .getLogLines(item)
      .map((line) => pad(line, correctWidth(width) - out.getWidth(line), 0, replaceChar))
      .join(NEW_LINE);

  /**<!-- DOCS: out.justify ### @ -->
   * justify
   *
   * - `out.justify`
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
   * @param {any} item
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {string} [replaceChar=' ']
   * @param {boolean} [forceWidth=true]
   * @returns {string}
   */
  export const justify: AlignFunction = (
    item: any,
    width: number = out.utils.getTerminalWidth(),
    replaceChar: string = ' ',
    forceWidth: boolean = true
  ): string =>
    utils
      .getLogLines(item)
      .map((line) => {
        const words = line.split(' ');
        if (words.length === 1) return left(words[0], width, replaceChar, forceWidth);
        const currW = words.map((w) => w.length).reduce(fn.reduces.combine);
        const perSpace = Math.floor((width - currW) / (words.length - 1));
        const remain = (width - currW) % (words.length - 1);
        const spaces = ArrayTools.range(words.length - 1)
          .map((i) => perSpace + Number(words.length - 2 - i < remain))
          .map((num) => replaceChar.repeat(num));
        let result = '';
        for (let index in words) {
          result += words[index] + (spaces[index] || '');
        }
        return result;
      })
      .join(NEW_LINE);

  const getLongestLen = (lines: string[]): number => Math.max(...lines.map((line) => out.getWidth(line)));

  /**<!-- DOCS: out.leftLines ### @ -->
   * leftLines
   *
   * - `out.leftLines`
   *
   * Align each line of the given text to the left within the given width of characters/columns
   *
   * ```typescript
   * out.leftLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
   * // [
   * //   'This is line 1         ',
   * //   'This is a longer line 2',
   * //   'Line 3                 '
   * // ]
   * ```
   * @param {string[]} lines
   * @param {number} [width=getLongestLen(lines)]
   * @returns {string[]}
   */
  export const leftLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => left(line, width));

  /**<!-- DOCS: out.centerLines ### @ -->
   * centerLines
   *
   * - `out.centerLines`
   *
   * Align each line of the given text to the center within the given width of characters/columns
   *
   * ```typescript
   * out.rightLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
   * // [
   * //   '         This is line 1',
   * //   'This is a longer line 2',
   * //   '                 Line 3'
   * // ]
   * ```
   * @param {string[]} lines
   * @param {number} [width=getLongestLen(lines)]
   * @returns {string[]}
   */
  export const centerLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => center(line, width));

  /**<!-- DOCS: out.rightLines ### @ -->
   * rightLines
   *
   * - `out.rightLines`
   *
   * Align each line of the given text to the right within the given width of characters/columns
   *
   * ```typescript
   * out.centerLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
   * // [
   * //   '    This is line 1     ',
   * //   'This is a longer line 2',
   * //   '        Line 3         '
   * // ]
   * ```
   * @param {string[]} lines
   * @param {number} [width=getLongestLen(lines)]
   * @returns {string[]}
   */
  export const rightLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => right(line, width));

  /**<!-- DOCS: out.justifyLines ### @ -->
   * justifyLines
   *
   * - `out.justifyLines`
   *
   * Justify align each line of the given text within the given width of characters/columns
   *
   * ```typescript
   * out.justifyLines(['This is line 1', 'This is a longer line 2', 'Line 3']);
   * // [
   * //   'This    is    line    1',
   * //   'This is a longer line 2',
   * //   'Line                  3'
   * // ]
   * ```
   * @param {string[]} lines
   * @param {number} [width=getLongestLen(lines)]
   * @returns {string[]}
   */
  export const justifyLines = (lines: string[], width: number = getLongestLen(lines)) => lines.map((line) => justify(line, width));

  const alignFunc = {
    left,
    center,
    right,
    justify
  };

  /**<!-- DOCS: out.align ### @ -->
   * align
   *
   * - `out.align`
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
   * @param {any} item
   * @param {AlignType} direction
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {string} [replaceChar=' ']
   * @param {boolean} [forceWidth=true]
   * @returns {string}
   */
  export const align = (
    item: any,
    direction: AlignType,
    width: number = out.utils.getTerminalWidth(),
    replaceChar: string = ' ',
    forceWidth: boolean = true
  ) => {
    const func = alignFunc[direction] || alignFunc.left;
    return func(item, width, replaceChar, forceWidth);
  };

  /**<!-- DOCS: out.split ### @ -->
   * split
   *
   * - `out.split`
   *
   * Split the given text into two parts, left and right, with the given width of characters/columns
   *
   * ```typescript
   * out.split('Left', 'Right', 15); // Left      Right
   * ```
   * @param {any} leftItem
   * @param {any} rightItem
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {string} [replaceChar=' ']
   * @returns {string}
   */
  export const split = (leftItem: any, rightItem: any, width: number = out.utils.getTerminalWidth(), replaceChar: string = ' ') =>
    `${leftItem + ''}${replaceChar.repeat(Math.max(0, width - (out.getWidth(leftItem + '') + out.getWidth(rightItem + ''))))}${rightItem + ''}`;

  /**<!-- DOCS: out.wrap ### @ -->
   * wrap
   *
   * - `out.wrap`
   *
   * Wrap the given text to the given width of characters/columns
   *
   * ```typescript
   * wrap('This is a sentence', 15);
   * // 'This is' + '\n' +
   * // 'a sentence'
   * ```
   * @param {any} item
   * @param {number} [width=out.utils.getTerminalWidth()]
   * @param {AlignType} [alignment]
   * @param {boolean} [forceWidth=false]
   * @returns {string}
   */
  export const wrap = (item: any, width: number = out.utils.getTerminalWidth(), alignment?: AlignType, forceWidth: boolean = false): string =>
    utils
      .getLogLines(item)
      .map((line) => {
        if (out.getWidth(line) > width) {
          let words: string[] = line.split(/(?<=#?[ -]+)/g);
          const rows: string[][] = [];

          words = words
            .map((orig: string) => {
              if (out.getWidth(orig.replace(/\s$/, '')) > width) {
                let remaining = orig;
                let result = [];
                while (out.getWidth(remaining) > width - 1) {
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

            if (out.getWidth(candText) + out.getWidth(word) > width) {
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

  /**<!-- DOCS: out.moveUp ### @ -->
   * moveUp
   *
   * - `out.moveUp`
   *
   * Move the terminal cursor up X lines, clearing each row.
   *
   * Useful for replacing previous lines of output
   *
   * ```typescript
   * moveUp(1);
   * ```
   * @param {number} [lines=1]
   * @returns {void}
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

  const loadingDefault = (s) => console.log(colr.dim(`${s}`));
  const loadingWords = [
    'ℓ-o-𝔞-𝓭-ɪ-ռ-𝗴',
    '𝚕-σ-a-𝔡-𝓲-ɴ-ɢ',
    '𝗟-𝚘-α-d-𝔦-𝓷-ɢ',
    'ʟ-𝗼-𝚊-∂-i-𝔫-𝓰',
    'ʟ-օ-𝗮-𝚍-ι-n-𝔤',
    '𝓵-ᴏ-ǟ-𝗱-𝚒-η-g',
    '𝔩-𝓸-ᴀ-ɖ-𝗶-𝚗-g',
    'l-𝔬-𝓪-ᴅ-ɨ-𝗻-𝚐'
  ].map((word) => word.split('-'));
  const loadingChars = ArrayTools.repeat((loadingWords.length + 1) * loadingWords[0].length, ...loadingWords).map(
    (word, index) =>
      colr.bold('loading'.slice(0, Math.floor(Math.floor(index) / loadingWords.length))) +
      word.slice(Math.floor(Math.floor(index) / loadingWords.length)).join('') +
      ['   ', '.  ', '.. ', '...'][Math.floor(index / 3) % 4]
  );

  /**<!-- DOCS: out.loading ### @ -->
   * loading
   *
   * - `out.loading`
   *
   * Display an animated loading indicator
   *
   * ```typescript
   * const loader = out.loading();
   * // ...
   * loader.stop();
   * ```
   * @param {(s: string) => any} [action=loadingDefault]
   * @param {number} [lines=1]
   * @param {string[]} [symbols=loadingChars]
   * @returns {{ stop: () => void; }}
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

  /**<!-- DOCS: out.limitToLength ### @ -->
   * limitToLength
   *
   * - `out.limitToLength`
   *
   * Limit the length of a string to the given length
   *
   * ```typescript
   * out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
   * ```
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  export const limitToLength = (text: string, maxLength: number): string =>
    utils.joinLines(
      utils.getLines(text).map((line) => {
        let specials = '';
        let result = line;
        while (out.getWidth(result) > maxLength) {
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

  /**<!-- DOCS: out.limitToLengthStart ### @ -->
   * limitToLengthStart
   *
   * - `out.limitToLengthStart`
   *
   * Limit the length of a string to the given length, keeping the end
   *
   * ```typescript
   * out.limitToLengthStart('This is a very long sentence', 12); // 'ong sentence'
   * ```
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  export const limitToLengthStart = (text: string, maxLength: number): string =>
    utils.joinLines(
      utils.getLines(text).map((line) => {
        let specials = '';
        let result = line;
        while (out.getWidth(result) > maxLength) {
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

  /**<!-- DOCS: out.truncate ### @ -->
   * truncate
   *
   * - `out.truncate`
   *
   * Limit the length of a string to the given length, and add an ellipsis if necessary
   *
   * ```typescript
   * out.truncate('This is a very long sentence', 15); // 'This is a ve...'
   * ```
   * @param {string} text
   * @param {number} [maxLength=out.utils.getTerminalWidth()]
   * @param {string} [suffix=colr.dim('…')]
   * @returns {string}
   */
  export const truncate = (text: string, maxLength: number = out.utils.getTerminalWidth(), suffix: string = colr.dim('…')): string =>
    utils.joinLines(
      utils.getLines(text).map((line) => (out.getWidth(line) > maxLength ? limitToLength(line, maxLength - out.getWidth(suffix)) + suffix : line))
    );

  /**<!-- DOCS: out.truncateStart ### @ -->
   * truncateStart
   *
   * - `out.truncateStart`
   *
   * Limit the length of a string to the given length, and add an ellipsis if necessary, keeping the end
   *
   * ```typescript
   * out.truncateStart('This is a very long sentence', 15); // '...ong sentence'
   * ```
   * @param {string} text
   * @param {number} [maxLength=out.utils.getTerminalWidth()]
   * @param {string} [suffix=colr.dim('…')]
   * @returns {string}
   */
  export const truncateStart = (text: string, maxLength: number = out.utils.getTerminalWidth(), suffix: string = colr.dim('…')): string =>
    utils.joinLines(
      utils
        .getLines(text)
        .map((line) => (out.getWidth(line) > maxLength ? suffix + limitToLengthStart(line, maxLength - out.getWidth(suffix)) : line))
    );

  /**<!-- DOCS: out.concatLineGroups ### @ -->
   * concatLineGroups
   *
   * - `out.concatLineGroups`
   *
   * Concatenate multiple line groups, aligning them by the longest line
   *
   * ```typescript
   * out.concatLineGroups(['lorem', 'ipsum'], ['dolor', 'sit', 'amet']);
   * // [ 'loremdolor', 'ipsumsit  ', '     amet ' ]
   * ```
   * @param {...string[]} [groups]
   * @returns {any}
   */
  export const concatLineGroups = (...groups: string[][]) => {
    const maxLen = Math.max(...groups.map((group) => group.length));
    const aligned = groups.map((group) => leftLines([...group, ...Array(maxLen).fill('')].slice(0, maxLen)));
    return zipMax(...aligned).map((line) => line.join(''));
  };

  /**<!-- DOCS: out.getResponsiveValue ### @ -->
   * getResponsiveValue
   *
   * - `out.getResponsiveValue`
   *
   * Get a value based on the terminal width
   *
   * ```typescript
   * out.getResponsiveValue([
   *   {minColumns: 0, value: 'a'},
   *   {minColumns: 10, value: 'b'},
   *   {minColumns: 100, value: 'c'},
   *   {minColumns: 1000, value: 'd'}
   * ]) // c
   * ```
   * @param {ResponsiveOption<T>[]} options
   * @returns {T}
   */
  export const getResponsiveValue = <T extends unknown>(options: ResponsiveOption<T>[]): T => {
    const mapped = options.map(({ minColumns, value }) => ({
      min: typeof minColumns === 'number' ? minColumns : 0,
      value
    }));
    const sorted = sortByMapped(mapped, (option) => option.min, fn.desc);
    const termWidth = utils.getTerminalWidth();
    return (sorted.find((option) => termWidth >= option.min) ?? sorted[0]).value;
  };

  /**<!-- DOCS: out.ResponsiveOption #### -->
   * ResponsiveOption<T>
   *
   * - `out.ResponsiveOption`
   *
   * Configuration for a responsive value (see `getResponsiveValue`)
   *
   * See getResponsiveValue for an example
   */
  export type ResponsiveOption<T> = { minColumns?: number; value: T };

  /**<!-- DOCS-ALIAS: out.getBreadcrumb -->*/
  export const getBreadcrumb = getBreadcrumbOut;

  /**<!-- DOCS-ALIAS: out.Breadcrumb -->*/
  export type Breadcrumb = BreadcrumbOut;

  /**<!-- DOCS-ALIAS: out.getLineCounter -->*/
  export const getLineCounter = getLineCounterOut;

  /**<!-- DOCS-ALIAS: out.LineCounter -->*/
  export type LineCounter = LineCounterOut;

  /**<!-- DOCS: out.utils 291 ### -->
   * utils
   */
  export namespace utils {
    // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

    /**<!-- DOCS: out.utils.getTerminalWidth #### 291 @ -->
     * getTerminalWidth
     *
     * - `out.utils.getTerminalWidth`
     *
     * Get maximum terminal width (columns)
     *
     * ```typescript
     * print.utils.getTerminalWidth(); // 127
     * ```
     * @returns {number}
     */
    export const getTerminalWidth = () => (process?.stdout?.columns ? process.stdout.columns : 100);

    const textToString = (text: Text): string => (text instanceof Array ? utils.joinLines(text) : text);
    /**<!-- DOCS: out.utils.getLines #### 291 @ -->
     * getLines
     *
     * - `out.utils.getLines`
     *
     * Split multi-line text into an array of lines
     *
     * ```typescript
     * out.utils.getLines(`
     * this is line 1
     * this is line 2
     * `); // [ '', 'this is line 1', 'this is line 2', '' ]
     * ```
     * @param {Text} text
     * @returns {string[]}
     */
    export const getLines = (text: Text): string[] => textToString(text).split(NEW_LINE);

    /**<!-- DOCS: out.utils.getNumLines #### 291 @ -->
     * getNumLines
     *
     * - `out.utils.getNumLines`
     *
     * Get how many lines a string or array of lines has
     *
     * ```typescript
     * out.utils.getNumLines(`
     * this is line 1
     * this is line 2
     * `); // 4
     * ```
     * @param {Text} text
     * @returns {number}
     */
    export const getNumLines = (text: Text): number => getLines(text).length;

    /**<!-- DOCS: out.utils.getLinesWidth #### 291 @ -->
     * getLinesWidth
     *
     * - `out.utils.getLinesWidth`
     *
     * Get how wide a string or array of lines has
     *
     * ```typescript
     * out.utils.getLinesWidth(`
     * this is line 1
     * this is line 2
     * `) // 14
     * ```
     * @param {Text} text
     * @returns {number}
     */
    export const getLinesWidth = (text: Text): number => Math.max(...getLines(text).map((line) => out.getWidth(line)));

    /**<!-- DOCS: out.utils.getLogLines #### 291 @ -->
     * getLogLines
     *
     * - `out.utils.getLogLines`
     *
     * Split a log-formatted multi-line text into an array of lines
     *
     * ```typescript
     * out.utils.getLogLines(`
     * this is line 1
     * this is line 2
     * `); // [ '', 'this is line 1', 'this is line 2', '' ]
     * ```
     * @param {any} item
     * @returns {string[]}
     */
    export const getLogLines = (item: any): string[] => getLines(getLogStr(item));

    /**<!-- DOCS: out.utils.getNumLogLines #### 291 @ -->
     * getNumLogLines
     *
     * - `out.utils.getNumLogLines`
     *
     * Get how many lines a log-formatted string or array of lines has
     *
     * ```typescript
     * out.utils.getNumLogLines(`
     * this is line 1
     * this is line 2
     * `); // 4
     * ```
     * @param {Text} item
     * @returns {number}
     */
    export const getNumLogLines = (item: Text): number => getNumLines(getLogStr(item));

    /**<!-- DOCS: out.utils.getLogLinesWidth #### 291 @ -->
     * getLogLinesWidth
     *
     * - `out.utils.getLogLinesWidth`
     *
     * Get how wide a log-formatted string or array of lines has
     *
     * ```typescript
     * out.utils.getLogLinesWidth(`
     * this is line 1
     * this is line 2
     * `) // 14
     * ```
     * @param {Text} item
     * @returns {number}
     */
    export const getLogLinesWidth = (item: Text): number => getLinesWidth(getLogStr(item));

    /**<!-- DOCS: out.utils.joinLines #### 291 @ -->
     * joinLines
     *
     * - `out.utils.joinLines`
     *
     * Join an array of lines into a single multi-line string
     *
     * ```typescript
     * out.utils.joinLines(['this is line 1', 'this is line 2'])
     * // 'this is line 1' + '\n' +
     * // 'this is line 2'
     * ```
     * @param {string[]} lines
     * @returns {string}
     */
    export const joinLines = (lines: string[]): string => lines.map(fn.maps.toString).join(NEW_LINE);

    /**<!-- DOCS: out.utils.hasColor #### 291 @ -->
     * hasColor
     *
     * - `out.utils.hasColor`
     *
     * Determine whether a given string contains any colr-ed colours
     *
     * ```typescript
     * out.utils.hasColor('this is line 1') // false
     * out.utils.hasColor(colr.red('this is line 1')) // true
     * ```
     * @param {string} str
     * @returns {boolean}
     */
    export const hasColor = (str: string): boolean => Boolean(str.match(new RegExp(`\\u001b\[[0-9]+m`, 'g')));

    /**<!-- DOCS: out.utils.stripAnsi #### 291 @ -->
     * stripAnsi
     *
     * - `out.utils.stripAnsi`
     *
     * Removes all ANSI escape codes from a string. This includes any colour or styling added by colr or libraries like chalk.
     * @param {string} text
     * @returns {string}
     */
    export const stripAnsi = (text: string): string => {
      const args = {
        text: safe.str(text)
      };
      const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
      ].join('|');
      const regex = new RegExp(pattern, 'g');
      return args.text.replace(regex, '');
    };

    /**<!-- DOCS: out.utils.getEmojiRegex #### 291 @ -->
     * getEmojiRegex
     *
     * - `out.utils.getEmojiRegex`
     *
     * A rough way to regex emojis
     *
     * Note: Certain symbols removed to minimise false positives
     * @param {string} [flags='g']
     * @returns {RegExp}
     */
    export const getEmojiRegex = (flags: string = 'g'): RegExp => {
      const args = {
        flags: safe.str(flags)
      };

      // generated using scripts/generate-emoji-regex.ts (in swiss-node repo)
      return new RegExp(
        /[\u2139\u231A\u231B\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDC-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8]|[\u200D\u20E3\uFE0F]|\uD83C[\uDDE6-\uDDFF\uDFFB-\uDFFF]|\uD83E[\uDDB0-\uDDB3]|\uDB40[\uDC20-\uDC7F]|\uD83C[\uDFFB-\uDFFF]|[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD\uDEC3-\uDEC5\uDEF0-\uDEF8]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8]/,
        args.flags
      );
    };
  } // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

/**<!-- DOCS-ALIAS: out.getBreadcrumb -->*/
export const getBreadcrumb = getBreadcrumbOut;

/**<!-- DOCS-ALIAS: out.Breadcrumb -->*/
export type Breadcrumb = BreadcrumbOut;

/**<!-- DOCS-ALIAS: out.getLineCounter -->*/
export const getLineCounter = getLineCounterOut;

/**<!-- DOCS-ALIAS: out.LineCounter -->*/
export type LineCounter = LineCounterOut;
