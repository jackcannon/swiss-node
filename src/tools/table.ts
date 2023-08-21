import { Partial, fn, ArrayTools, StringTools } from 'swiss-ak';
import { getLineCounter } from './out/lineCounter';
import * as out from './out';
import { processInput } from '../utils/processTableInput';
import { CharLookup, getTableCharacters } from '../utils/tableCharacters';
import { clr, Colour } from './clr';
import chalk from 'chalk';

//<!-- DOCS: 300 -->
/**<!-- DOCS: ## -->
 * table
 *
 * A simple table generator
 */

//<!-- DOCS: 300 -->

const getFullOptions = (opts: TableOptions): FullTableOptions => ({
  overrideChar: '',
  overrideHorChar: opts.overrideChar || '',
  overrideVerChar: opts.overrideChar || '',
  overrideCornChar: opts.overrideChar || '',
  overrideOuterChar: opts.overrideChar || '',
  overrideCharSet: undefined,
  overridePrioritiseVer: false,
  align: 'left',
  alignCols: ['left'],
  colWidths: [],
  cellPadding: 1,
  truncate: false,
  maxWidth: out.utils.getTerminalWidth(),
  ...opts,
  wrapperFn: typeof opts.wrapperFn !== 'function' ? fn.noact : opts.wrapperFn,
  wrapLinesFn: typeof opts.wrapLinesFn !== 'function' ? fn.noact : opts.wrapLinesFn,
  wrapHeaderLinesFn: typeof opts.wrapHeaderLinesFn !== 'function' ? chalk.bold : opts.wrapHeaderLinesFn,
  wrapBodyLinesFn: typeof opts.wrapBodyLinesFn !== 'function' ? fn.noact : opts.wrapBodyLinesFn,
  drawOuter: typeof opts.drawOuter !== 'boolean' ? true : opts.drawOuter,
  drawRowLines: typeof opts.drawRowLines !== 'boolean' ? true : opts.drawRowLines,
  drawColLines: typeof opts.drawColLines !== 'boolean' ? true : opts.drawColLines,
  transpose: typeof opts.transpose !== 'boolean' ? false : opts.transpose,
  transposeBody: typeof opts.transposeBody !== 'boolean' ? false : opts.transposeBody,
  format: (opts.format || []).map(toFullFormatConfig),
  margin: ((input: number | number[] = 0) => {
    const arr = [input].flat();

    const top = arr[0] ?? 0;
    const right = arr[1] ?? top;
    const bottom = arr[2] ?? top;
    const left = arr[3] ?? right ?? top;

    return [top, right, bottom, left];
  })(opts.margin) as number[]
});

const empty = (numCols: number, char: string = '') => ArrayTools.create(numCols, char);

/**<!-- DOCS: ### -->
 * print
 *
 * - `table.print`
 *
 * Print a table
 *
 * ```typescript
 * const header = [['Name', 'Age']];
 * const body = [['John', '25'], ['Jane', '26']];
 * table.print(body, header); // 7
 *
 * // ┏━━━━━━┳━━━━━┓
 * // ┃ Name ┃ Age ┃
 * // ┡━━━━━━╇━━━━━┩
 * // │ John │ 25  │
 * // ├──────┼─────┤
 * // │ Jane │ 26  │
 * // └──────┴─────┘
 * ```
 */
export const print = (body: any[][], header?: any[][], options: TableOptions = {}): number => {
  const lines = getLines(body, header, options);
  if (lines.length) {
    console.log(lines.join('\n'));
  }
  return lines.length;
};

/**<!-- DOCS: ### -->
 * markdown
 *
 * - `table.markdown`
 *
 * Generate a markdown table
 *
 * ```typescript
 * const header = [['Name', 'Age (in years)', 'Job']];
 * const body = [
 *   ['Alexander', '25', 'Builder'],
 *   ['Jane', '26', 'Software Engineer']
 * ];
 * const md = table.markdown(body, header, { alignCols: ['right', 'center', 'left'] });
 * console.log(md.join('\n'));
 *
 * // |      Name | Age (in years) | Job               |
 * // |----------:|:--------------:|:------------------|
 * // | Alexander |       25       | Builder           |
 * // |      Jane |       26       | Software Engineer |
 * ```
 */
export const markdown = (body: any[][], header?: any[][], options: TableOptions = {}): string[] => {
  const defaultMarkdownOptions: TableOptions = {
    overrideCharSet: {
      hTop: [' ', ' ', ' ', ' '],
      hNor: [' ', '|', '|', '|'],
      hSep: [' ', ' ', ' ', ' '],
      hBot: [' ', ' ', ' ', ' '],

      mSep: ['-', '|', '|', '|'],

      bTop: [' ', ' ', ' ', ' '],
      bNor: [' ', '|', '|', '|'],
      bSep: [' ', ' ', ' ', ' '],
      bBot: [' ', ' ', ' ', ' ']
    },
    drawRowLines: false,
    margin: 0,
    wrapHeaderLinesFn: fn.noact
  };
  const lines = getLines(body, header, {
    ...defaultMarkdownOptions,
    ...options
  });

  if (options.alignCols) {
    const sepIndex = lines[1].startsWith('|--') ? 1 : lines.findIndex((line) => line.startsWith('|--'));
    const sepLine = lines[sepIndex];
    const sepSections = sepLine.split('|').filter(fn.isTruthy);
    const numCols = sepSections.length;
    const alignColumns = ArrayTools.repeat(numCols, ...options.alignCols);
    const alignedSepSections = sepSections.map((section, index) => {
      const algn = alignColumns[index];
      const width = section.length;
      let firstChar = '-';
      let lastChar = '-';
      if (algn === 'left' || algn === 'center') {
        firstChar = ':';
      }
      if (algn === 'right' || algn === 'center') {
        lastChar = ':';
      }
      return `${firstChar}${'-'.repeat(Math.max(0, width - 2))}${lastChar}`.slice(0, width);
    });
    lines[sepIndex] = ['', ...alignedSepSections, ''].join('|');
  }

  return lines;
};

const getAllKeys = (objects) => {
  const allKeys = {};
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      allKeys[key] = true;
    });
  });
  return Object.keys(allKeys);
};

/**<!-- DOCS: ### -->
 * printObjects
 *
 * - `table.printObjects`
 *
 * Print a table of given objects
 *
 * ```typescript
 * const objs = [
 *   // objs
 *   { a: '1', b: '2', c: '3' },
 *   { a: '0', c: '2' },
 *   { b: '4' },
 *   { a: '6' }
 * ];
 * const header = {
 *   a: 'Col A',
 *   b: 'Col B',
 *   c: 'Col C'
 * };
 * table.printObjects(objs, header); // 11
 *
 * // ┏━━━━━━━┳━━━━━━━┳━━━━━━━┓
 * // ┃ Col A ┃ Col B ┃ Col C ┃
 * // ┡━━━━━━━╇━━━━━━━╇━━━━━━━┩
 * // │ 1     │ 2     │ 3     │
 * // ├───────┼───────┼───────┤
 * // │ 0     │       │ 2     │
 * // ├───────┼───────┼───────┤
 * // │       │ 4     │       │
 * // ├───────┼───────┼───────┤
 * // │ 6     │       │       │
 * // └───────┴───────┴───────┘
 * ```
 */
export const printObjects = (objects: Object[], headers: Object = {}, options: TableOptions = {}) => {
  const { body, header } = objectsToTable(objects, headers);
  return print(body, header, options);
};

/**<!-- DOCS: ### -->
 * getLines
 *
 * - `table.getLines`
 *
 * Get the lines of a table (rather than printing it)
 *
 * ```typescript
 * const header = [['Name', 'Age']];
 * const body = [['John', '25'], ['Jane', '26']];
 * table.getLines(body, header);
 * // [
 * //   '┏━━━━━━┳━━━━━┓',
 * //   '┃ \x1B[1mName\x1B[22m ┃ \x1B[1mAge\x1B[22m ┃',
 * //   '┡━━━━━━╇━━━━━┩',
 * //   '│ John │ 25  │',
 * //   '├──────┼─────┤',
 * //   '│ Jane │ 26  │',
 * //   '└──────┴─────┘'
 * // ]
 * ```
 */
export const getLines = (body: any[][], header?: any[][], options: TableOptions = {}): string[] => {
  // const lc = getLineCounter();
  const opts = getFullOptions(options);
  const { wrapperFn, wrapLinesFn, drawOuter, alignCols, align, drawRowLines, cellPadding } = opts;

  const [marginTop, marginRight, marginBottom, marginLeft] = opts.margin as number[];

  const result = [];

  const {
    cells: { header: pHeader, body: pBody },
    numCols,
    colWidths
  } = processInput({ header, body }, opts);

  const alignColumns = ArrayTools.repeat(numCols, ...alignCols);
  const tableChars = getTableCharacters(opts);

  const printLine = (row = empty(numCols), chars = tableChars.bNor, textWrapperFn?: Function) => {
    const [norm, strt, sepr, endc] = chars;

    const pad = StringTools.repeat(cellPadding, norm);

    let aligned = row.map((cell, col) => out.align(cell || '', alignColumns[col], colWidths[col], norm, true));
    if (textWrapperFn) aligned = aligned.map((x) => textWrapperFn(x));
    const inner = aligned.join(wrapLinesFn(`${pad}${sepr}${pad}`));
    const str =
      wrapLinesFn(`${StringTools.repeat(marginLeft, ' ')}${strt}${pad}`) +
      inner +
      wrapLinesFn(`${pad}${endc}${StringTools.repeat(marginRight, ' ')}`);

    result.push(out.align(wrapperFn(str), align, -1, ' ', false));
  };

  if (marginTop) result.push(StringTools.repeat(marginTop - 1, '\n'));

  if (pHeader.length) {
    if (drawOuter && drawRowLines) printLine(empty(numCols, ''), tableChars.hTop, wrapLinesFn);
    for (let index in pHeader) {
      const row = pHeader[index];
      if (Number(index) !== 0 && drawRowLines) printLine(empty(numCols, ''), tableChars.hSep, wrapLinesFn);
      for (let line of row) {
        printLine(line as string[], tableChars.hNor, opts.wrapHeaderLinesFn);
      }
    }
    printLine(empty(numCols, ''), tableChars.mSep, wrapLinesFn);
  } else {
    if (drawOuter) printLine(empty(numCols, ''), tableChars.bTop, wrapLinesFn);
  }
  for (let index in pBody) {
    const row = pBody[index];
    if (Number(index) !== 0 && drawRowLines) printLine(empty(numCols, ''), tableChars.bSep, wrapLinesFn);
    for (let line of row) {
      printLine(line as string[], tableChars.bNor, opts.wrapBodyLinesFn);
    }
  }
  if (drawOuter && drawRowLines) printLine(empty(numCols, ''), tableChars.bBot, wrapLinesFn);
  if (marginBottom) result.push(StringTools.repeat(marginBottom - 1, '\n'));
  return result;
};

//<!-- DOCS: 390 -->
export interface FullTableOptions {
  /**<!-- DOCS: #### -->
   * wrapperFn
   *
   * Function to wrap each line of the output in (e.g. chalk.blue)
   */
  wrapperFn: Function;

  /**<!-- DOCS: #### -->
   * wrapLinesFn
   *
   * Function to wrap the output lines of each cell of the table (e.g. chalk.blue)
   */
  wrapLinesFn: Function;

  /**<!-- DOCS: #### -->
   * wrapHeaderLinesFn
   *
   * Function to wrap the output lines of each cell of the header of the table (e.g. chalk.blue)
   *
   * Default: `chalk.bold`
   */
  wrapHeaderLinesFn: Function;

  /**<!-- DOCS: #### -->
   * wrapBodyLinesFn
   *
   * Function to wrap the output lines of each cell of the body of the table (e.g. chalk.blue)
   */
  wrapBodyLinesFn: Function;

  /**<!-- DOCS: #### -->
   * overrideChar
   *
   * Character to use instead of lines
   *
   * Override character options are applied in the following order (later options have higher priority):
   * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
   */
  overrideChar: string;

  /**<!-- DOCS: #### -->
   * overrideHorChar
   *
   * Character to use instead of horizontal lines
   *
   * Override character options are applied in the following order (later options have higher priority):
   * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
   */
  overrideHorChar: string;

  /**<!-- DOCS: #### -->
   * overrideVerChar
   *
   * Character to use instead of vertical lines
   *
   * Override character options are applied in the following order (later options have higher priority):
   * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
   */
  overrideVerChar: string;

  /**<!-- DOCS: #### -->
   * overrideCornChar
   *
   * Character to use instead of corner and intersecting lines (┌, ┬, ┐, ├, ┼, ┤, └, ┴, ┘)
   *
   * Override character options are applied in the following order (later options have higher priority):
   * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
   */
  overrideCornChar: string;

  /**<!-- DOCS: #### -->
   * overrideOuterChar
   *
   * Character to use instead of lines on the outside of the table (┌, ┬, ┐, ├, ┤, └, ┴, ┘)
   *
   * Override character options are applied in the following order (later options have higher priority):
   * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
   */
  overrideOuterChar: string;

  /**<!-- DOCS: #### -->
   * overrideCharSet
   *
   * Completely override all the characters used in the table.
   *
   * See TableCharLookup for more information.
   *
   * Default:
   * ```
   * {
   *   hTop: ['━', '┏', '┳', '┓'],
   *   hNor: [' ', '┃', '┃', '┃'],
   *   hSep: ['━', '┣', '╋', '┫'],
   *   hBot: ['━', '┗', '┻', '┛'],
   *   mSep: ['━', '┡', '╇', '┩'],
   *   bTop: ['─', '┌', '┬', '┐'],
   *   bNor: [' ', '│', '│', '│'],
   *   bSep: ['─', '├', '┼', '┤'],
   *   bBot: ['─', '└', '┴', '┘']
   * }
   * ```
   */
  overrideCharSet: TableCharLookup;

  /**<!-- DOCS: #### -->
   * overridePrioritiseVer
   *
   * By default, if not overrideHorChar and overrideVerChar are set, overrideHorChar will be prioritised (and used where both are applicable).
   * Setting this to true will prioritise overrideVerChar instead.
   *
   * Default: `false`
   */
  overridePrioritiseVer: boolean;

  /**<!-- DOCS: #### -->
   * drawOuter
   *
   * Whether to draw the outer border of the table
   */
  drawOuter: boolean;

  /**<!-- DOCS: #### -->
   * drawRowLines
   *
   * Whether to draw lines between rows (other than separating header and body)
   */
  drawRowLines: boolean;

  /**<!-- DOCS: #### -->
   * drawColLines
   *
   * Whether to draw lines between columns
   */
  drawColLines: boolean;

  /**<!-- DOCS: #### -->
   * colWidths
   *
   * Preferred width (in number of characters) of each column
   */
  colWidths: number[];

  /**<!-- DOCS: #### -->
   * align
   *
   * How the table should be aligned on the screen
   *
   * left, right, center or justify
   */
  align: out.AlignType;

  /**<!-- DOCS: #### -->
   * alignCols
   *
   * How each column should be aligned
   *
   * Array with alignment for each column: left, right, center or justify
   */
  alignCols: out.AlignType[];

  /**<!-- DOCS: #### -->
   * transpose
   *
   * Change rows into columns and vice versa
   */
  transpose: boolean;

  /**<!-- DOCS: #### -->
   * transposeBody
   *
   * Change rows into columns and vice versa (body only)
   */
  transposeBody: boolean;

  /**<!-- DOCS: #### -->
   * margin
   *
   * The amount of space to leave around the outside of the table
   */
  margin: number | number[];

  /**<!-- DOCS: #### -->
   * cellPadding
   *
   * The amount of space to leave around the outside of each cell
   */
  cellPadding: number;

  /**<!-- DOCS: #### -->
   * format
   *
   * A set of formatting configurations
   */
  format: TableFormatConfig[];

  /**<!-- DOCS: #### -->
   * truncate
   *
   * Truncates (cuts the end off) line instead of wrapping
   */
  truncate: false | string;

  /**<!-- DOCS: #### -->
   * maxWidth
   *
   * Maximum width of the table
   */
  maxWidth: number;
}

/**<!-- DOCS: ### 380 -->
 * TableOptions
 *
 * The configuration options for the table
 */
export type TableOptions = Partial<FullTableOptions>;

/**<!-- DOCS: ### 391 -->
 * TableCharLookup
 *
 * The configuration for the table line characters
 *
 * Each property in the object represents a row type:
 *
 * | Type   | Description                                                       | Example     |
 * |:------:|-------------------------------------------------------------------|:-----------:|
 * | `hTop` | Lines at the top of the table, if there's a header                | `┏━━━┳━━━┓` |
 * | `hNor` | Regular lines of cells in a header cell                           | `┃...┃...┃` |
 * | `hSep` | Lines between rows of the header                                  | `┣━━━╋━━━┫` |
 * | `hBot` | Lines at the bottom of the table, if there's a header but no body | `┗━━━┻━━━┛` |
 * | `mSep` | Lines between the header and the body if both are there           | `┡━━━╇━━━┩` |
 * | `bTop` | Lines at the top of the table, if there's not a header            | `┌───┬───┐` |
 * | `bNor` | Regular lines of cells in a body cell                             | `│...│...│` |
 * | `bSep` | Lines between rows of the body                                    | `├───┼───┤` |
 * | `bBot` | Lines at the bottom of the table                                  | `└───┴───┘` |
 *
 * Each item in each array is a character to use for the row type:
 *
 * | Index | Description                                                               | Example |
 * |:-----:|---------------------------------------------------------------------------|:-------:|
 * | `0`   | A regular character for the row (gets repeated for the width of the cell) | `━`     |
 * | `1`   | A border line at the start of the row                                     | `┣`     |
 * | `2`   | A border line between cells                                               | `╋`     |
 * | `3`   | A border line at the end of the row                                       | `┫`     |
 */
export type TableCharLookup = Partial<CharLookup<string[]>>;

const toFullFormatConfig = (config: Partial<TableFormatConfig>) =>
  ({
    isHeader: false,
    isBody: true,
    ...config
  } as TableFormatConfigFull);

/**<!-- DOCS: ### -->
 * TableFormatConfig
 *
 * Configuration for formatting a cell
 */
export interface TableFormatConfig {
  /**<!-- DOCS: #### -->
   * formatFn
   *
   * A wrapper function to apply to the cell
   */
  formatFn: Function;

  /**<!-- DOCS: #### -->
   * isHeader
   *
   * Whether to apply the format to the header
   */
  isHeader?: boolean;

  /**<!-- DOCS: #### -->
   * isBody
   *
   * Whether to apply the format to the body
   */
  isBody?: boolean;

  /**<!-- DOCS: #### -->
   * row
   *
   * A specific row to apply the format to
   */
  row?: number;

  /**<!-- DOCS: #### -->
   * col
   *
   * A specific column to apply the format to
   */
  col?: number;
}
interface TableFormatConfigFull extends TableFormatConfig {
  isHeader: boolean;
  isBody: boolean;
}

/**<!-- DOCS: ### -->
 * utils
 */
/**<!-- DOCS: #### -->
 * objectsToTable
 *
 * - `table.utils.objectsToTable`
 *
 * Process an array of objects into a table format (string[][])
 *
 * ```typescript
 * const objs = [
 *   { name: 'John', age: 25 },
 *   { name: 'Jane', age: 26 }
 * ];
 * table.utils.objectsToTable(objs)
 * // {
 * //   header: [ [ 'name', 'age' ] ],
 * //   body: [ [ 'John', 25 ], [ 'Jane', 26 ] ]
 * // }
 * ```
 */
const objectsToTable = (objects: Object[], headers: Object = {}): { header: any[][]; body: any[][] } => {
  const allKeys = getAllKeys(objects);

  const header = [allKeys.map((key) => headers[key] || key)];
  const body = objects.map((obj) => allKeys.map((key) => obj[key]));

  return {
    header,
    body
  };
};

/**<!-- DOCS: #### -->
 * transpose
 *
 * - `table.utils.transpose`
 *
 * Change rows into columns and vice versa
 *
 * ```typescript
 * const input = [
 *   ['John', 25],
 *   ['Jane', 26],
 *   ['Derek', 27]
 * ];
 * table.utils.transpose(input)
 * // [
 * //   [ 'John', 'Jane', 'Derek' ],
 * //   [ 25, 26, 27 ]
 * // ]
 * ```
 */
const transpose = (rows: any[][]): any[][] => {
  return ArrayTools.zip(...rows);
};

/**<!-- DOCS: #### -->
 * concatRows
 *
 * - `table.utils.concatRows`
 *
 * Concatenate header and body rows into one list of rows
 *
 * ```typescript
 * const header = [['Name', 'Age']];
 * const body = [
 *   ['John', 25],
 *   ['Jane', 26],
 *   ['Derek', 27]
 * ];
 * table.utils.concatRows({header, body})
 * // [
 * //   [ 'Name', 'Age' ],
 * //   [ 'John', 25 ],
 * //   [ 'Jane', 26 ],
 * //   [ 'Derek', 27 ]
 * // ]
 * ```
 */
const concatRows = (cells: { header: any[][]; body: any[][] }): any[][] => {
  return [...(cells.header || []), ...cells.body] as any[][];
};

/**<!-- DOCS: #### -->
 * getFormat
 *
 * - `table.utils.getFormat`
 *
 * A function for simplifying the format configuration
 *
 * ```typescript
 * const wrap = (str: string) => 'X';
 *
 * const format = [table.utils.getFormat(wrap, 0, 0), table.utils.getFormat(wrap, 1, 1, false, true), table.utils.getFormat(wrap, 2, 2, true, false)];
 * // [
 * //   { formatFn: wrap, row: 0, col: 0 },
 * //   { formatFn: wrap, row: 1, col: 1, isHeader: false, isBody: true },
 * //   { formatFn: wrap, row: 2, col: 2, isHeader: true, isBody: false }
 * // ]
 *
 * const header = partition(range(9), 3);
 * const body = partition(range(9), 3);
 * table.print(header, body, {format})
 * // ┏━━━┳━━━┳━━━┓
 * // ┃ 0 ┃ 1 ┃ 2 ┃
 * // ┣━━━╋━━━╋━━━┫
 * // ┃ 3 ┃ 4 ┃ 5 ┃
 * // ┣━━━╋━━━╋━━━┫
 * // ┃ 6 ┃ 7 ┃ X ┃
 * // ┡━━━╇━━━╇━━━┩
 * // │ X │ 1 │ 2 │
 * // ├───┼───┼───┤
 * // │ 3 │ X │ 5 │
 * // ├───┼───┼───┤
 * // │ 6 │ 7 │ 8 │
 * // └───┴───┴───┘
 * ```
 */
const getFormat = (format: Function | Colour, row?: number, col?: number, isHeader?: boolean, isBody?: boolean): TableFormatConfig => {
  const result: TableFormatConfig = {
    formatFn: typeof format === 'function' ? format : clr[format],
    row,
    col
  };
  if (isHeader !== undefined) result.isHeader = isHeader;
  if (isBody !== undefined) result.isBody = isBody;
  return result;
};

export const utils = {
  objectsToTable,
  transpose,
  concatRows,
  getFormat
};
