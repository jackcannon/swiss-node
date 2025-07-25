import { wait, fn, ArrayTools, zipMax, sortByMapped, safe } from 'swiss-ak';
import { getLogStr } from './LogTools';
import { Text } from '../utils/processTableInput';
import { getLineCounter as getLineCounterOut, LineCounter as LineCounterOut } from './out/lineCounter';
import { getBreadcrumb as getBreadcrumbOut, Breadcrumb as BreadcrumbOut } from './out/breadcrumb';
import { ansi as ansiOut } from './out/ansi';
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
   * > __Note:__ Many special characters may not be counted correctly. Emoji support is also not perfect.
   *
   * ```typescript
   * out.getWidth('FOO BAR'); // 7
   * out.getWidth('↓←→↑'); // 4
   * out.getWidth(colr.red('this is red')); // 11
   * ```
   * @param {string} text - Text to get the width of
   * @returns {number} - Width of the text
   */
  export const getWidth = (text: string): number => {
    const args = {
      text: safe.str(text)
    };

    let result = args.text;

    // remove all the ansi escape codes
    result = out.utils.stripAnsi(result);

    // replace emojis with 2 spaces as they are 2 characters wide
    // This is a very rough approximation
    result = result.replace(out.utils.getEmojiRegex('gu'), '  ');

    // remove Emoji_Modifier and 'high surrogate' characters
    result = result.replace(/\uD83C[\uDFFB-\uDFFF]|[\uD800-\uDBFF]/g, '');

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
   * @param {string} line - Text to pad
   * @param {number} start - Number of characters to pad before the line
   * @param {number} end - Number of characters to pad after the line
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @returns {string} - Padded text
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
   * @param {any} item - Item to align
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to align to
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @param {boolean} [forceWidth=true] - Whether to force the width
   * @returns {string} - Aligned text
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
   * @param {any} item - Item to align
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to align to
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @param {boolean} [forceWidth=true] - Whether to force the width
   * @returns {string} - Aligned text
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
   * @param {any} item - Item to align
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to align to
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @param {boolean} [forceWidth=true] - Whether to force the width
   * @returns {string} - Aligned text
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
   * @param {any} item - Item to align
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to align to
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @param {boolean} [forceWidth=true] - Whether to force the width
   * @returns {string} - Aligned text
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
   * @param {string[]} lines - Lines to align
   * @param {number} [width=getLongestLen(lines)] - Width to align to
   * @returns {string[]} - Aligned lines
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
   * @param {string[]} lines - Lines to align
   * @param {number} [width=getLongestLen(lines)] - Width to align to
   * @returns {string[]} - Aligned lines
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
   * @param {string[]} lines - Lines to align
   * @param {number} [width=getLongestLen(lines)] - Width to align to
   * @returns {string[]} - Aligned lines
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
   * @param {string[]} lines - Lines to align
   * @param {number} [width=getLongestLen(lines)] - Width to align to
   * @returns {string[]} - Aligned lines
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
   * @param {any} item - Item to align
   * @param {AlignType} direction - Alignment direction
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to align to
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @param {boolean} [forceWidth=true] - Whether to force the width
   * @returns {string} - Aligned text
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
   * @param {any} leftItem - Left item to split
   * @param {any} rightItem - Right item to split
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to split at
   * @param {string} [replaceChar=' '] - Character to use for padding
   * @returns {string} - Split text
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
   * @param {any} item - Item to wrap
   * @param {number} [width=out.utils.getTerminalWidth()] - Width to wrap to
   * @param {AlignType} [alignment] - Alignment to use
   * @param {boolean} [forceWidth=false] - Whether to force the width
   * @returns {string} - Wrapped text
   */
  export const wrap = (item: any, width: number = out.utils.getTerminalWidth(), alignment?: AlignType, forceWidth: boolean = false): string => {
    const args = {
      item,
      width: safe.num(width, true, 0),
      alignment: safe.str(alignment, false, null) as AlignType,
      forceWidth: safe.bool(forceWidth, false)
    };

    const lines = utils.getLogLines(args.item);

    if (args.width === 0) return '\n'.repeat(lines.length - 1);

    return lines
      .map((line) => {
        if (out.getWidth(line) > args.width) {
          let words: string[] = line.split(/(?<=#?[ -]+)/g);
          const rows: string[][] = [];

          words = words
            .map((orig: string) => {
              if (out.getWidth(orig.replace(/\s$/, '')) > args.width) {
                let remaining = orig;
                let result = [];

                if (args.width <= 1) return remaining.slice(0, args.width);

                while (out.getWidth(remaining) > args.width - 1) {
                  result.push(remaining.slice(0, args.width - 1) + '-');
                  remaining = remaining.slice(args.width - 1);
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

            if (out.getWidth(candText) + out.getWidth(word) > args.width) {
              rows.push(candidateRow);
              rowStartIndex = Number(wIndex);
            }
          }

          const remaining = words.slice(rowStartIndex);
          rows.push(remaining);

          return rows
            .map((row) => row.join(''))
            .map((row) => row.replace(/\s$/, ''))
            .map((row) => (args.alignment || args.forceWidth ? align(row, args.alignment || 'left', args.width, undefined, args.forceWidth) : row));
        }

        return line;
      })
      .flat()
      .join(NEW_LINE);
  };

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
   * @param {number} [lines=1] - Number of lines to move up
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
   * If the given action returns a string, it will be printed. Otherwise, it will assume the action prints the output itself (and clears the number of lines given as the second argument)
   *
   * ```typescript
   * const loader = out.loading();
   * // ...
   * loader.stop();
   * ```
   * @param {(s: string) => string | void} [action=loadingDefault] - Custom loading output function
   * @param {number} [lines=1] - Number of lines to move up
   * @param {string[]} [symbols=loadingChars] - Symbols to use for the loading indicator
   * @returns {{ stop: () => void; }} - Loading object with a `stop` method
   */
  export const loading = (action: (s: string) => string | void = loadingDefault, lines: number = 1, symbols: string[] = loadingChars) => {
    let stopped = false;

    let count = 0;
    let previousLinesDrawn = 0;
    const runLoop = async () => {
      if (stopped) return;
      if (count) process.stdout.write(ansi.cursor.up(previousLinesDrawn));
      const output = action(symbols[count++ % symbols.length]);

      previousLinesDrawn = lines;
      if (output !== undefined) {
        console.log(output);
        previousLinesDrawn = utils.getNumLines(output + '');
      }

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
   * @param {string} text - Text to limit
   * @param {number} maxLength - Maximum length of the text
   * @returns {string} - Limited text
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
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length of the text
   * @returns {string} - Truncated text
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
   * @param {string} text - Text to truncate
   * @param {number} [maxLength=out.utils.getTerminalWidth()] - Maximum length of the text
   * @param {string} [suffix=colr.dim('…')] - Suffix to add if the text is truncated
   * @returns {string} - Truncated text
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
   * @param {string} text - Text to truncate
   * @param {number} [maxLength=out.utils.getTerminalWidth()] - Maximum length of the text
   * @param {string} [suffix=colr.dim('…')] - Suffix to add if the text is truncated
   * @returns {string} - Truncated text
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
   * @param {...string[]} [groups] - Line groups to concatenate
   * @returns {any} - Concatenated lines
   */
  export const concatLineGroups = (...groups: string[][]) => {
    const maxLen = Math.max(...groups.map((group) => group.length));
    const aligned = groups.map((group) => leftLines([...group, ...Array(maxLen).fill('')].slice(0, maxLen)));
    return zipMax(...aligned).map((line) => line.join(''));
  };

  /**<!-- DOCS: out.getResponsiveValue ###! @ -->
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
   * @param {ResponsiveOption<T>[]} options - Options to get a value from
   * @returns {T} - Value
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

  /**<!-- DOCS-ALIAS: out.ansi -->*/
  export const ansi = ansiOut;

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
     * out.utils.getTerminalWidth(); // 127
     * ```
     * @returns {number} - Maximum terminal width
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
     * @param {Text} text - Text to split
     * @returns {string[]} - Array of lines
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
     * @param {Text} text - Text to get the number of lines for
     * @returns {number} - Number of lines
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
     * @param {Text} text - Text to get the width of
     * @returns {number} - Width of the text
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
     * @param {any} item - Item to get the log lines for
     * @returns {string[]} - Array of log lines
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
     * @param {Text} item - Item to get the number of log lines for
     * @returns {number} - Number of log lines
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
     * @param {Text} item - Item to get the width of
     * @returns {number} - Width of the item
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
     * @param {string[]} lines - Lines to join
     * @returns {string} - Joined lines
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
     * @param {string} str - String to check for colours
     * @returns {boolean} - Whether the string contains any colours
     */
    export const hasColor = (str: string): boolean => Boolean(str.match(new RegExp(`\\u001b\[[0-9]+m`, 'g')));

    /**<!-- DOCS: out.utils.stripAnsi #### 291 @ -->
     * stripAnsi
     *
     * - `out.utils.stripAnsi`
     *
     * Removes all ANSI escape codes from a string. This includes any colour or styling added by colr or libraries like chalk.
     *
     * ```typescript
     * out.utils.stripAnsi(colr.red('this is line 1')) // 'this is line 1'
     * ```
     * @param {string} text - Text to strip ANSI codes from
     * @returns {string} - Text without ANSI codes
     */
    export const stripAnsi = (text: string): string => {
      const args = {
        text: safe.str(text)
      };

      const prefix = '[\\u001B\\u009B][[\\]()#;?]*';
      const pattern1 = '(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)';
      const pattern2 = '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntpqry=><~])';

      const regex = new RegExp(`${prefix}(?:${pattern1}|${pattern2})`, 'g');
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
     *
     * ```typescript
     * const str = "The 🦊 quickly jumps over the lazy 🐶."
     * str.match(out.utils.getEmojiRegex()); // [ '🦊', '🐶' ]
     * ```
     * @param {string} [flags='g'] - Flags to pass to the RegExp
     * @returns {RegExp} - Emoji regex
     */
    export const getEmojiRegex = (flags: string = 'g'): RegExp => {
      const args = {
        flags: safe.str(flags)
      };

      // generated using scripts/generate-emoji-regex.ts (in swiss-node repo)
      return new RegExp(
        /[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FB-\u25FE\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDC-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8]|[\u200D\u20E3\uFE0F]|\uD83C[\uDDE6-\uDDFF\uDFFB-\uDFFF]|\uD83E[\uDDB0-\uDDB3]|\uDB40[\uDC20-\uDC7F]/,
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

/**<!-- DOCS-ALIAS: out.ansi -->*/
export const ansi = out.ansi;
