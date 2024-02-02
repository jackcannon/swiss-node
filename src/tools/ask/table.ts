import { fn, getDeferred, MathsTools, RemapOf } from 'swiss-ak';

import { getKeyListener } from '../keyListener';
import { getLineCounter } from '../out/lineCounter';

import { LOG } from '../../DELETEME/LOG';
import { ActionBarConfig, getActionBar } from '../../utils/actionBar';
import { colr } from '../colr';
import { ansi, LineCounter, out } from '../out';
import { Breadcrumb } from '../out/breadcrumb';
import { table } from '../table';
import { getAskOptions, getAskOptionsForState } from './basicInput/customise';
import { getScrollbar, getScrolledItems, ScrolledItems } from './basicInput/getScrolledItems';
import { ErrorInfo, getErrorInfoFromValidationResult } from './errorValidation';
import { getImitateOutput, imitate } from './imitate';

//<!-- DOCS: 120 -->

type ItemToRowMapFunction<T extends unknown> = (item: T, index: number, items: T[]) => any[];

const askTableHandler = <T extends unknown>(
  isMulti: boolean,
  question: string | Breadcrumb,
  items: T[],
  initial: T[] | number[] = [],
  rows?: any[][] | ItemToRowMapFunction<T>,
  headers: any[][] | RemapOf<T, string> = [],
  tableOptions: table.TableOptions = {},
  validate?: (items: T[]) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T[]> => {
  const questionText = typeof question === 'string' ? question : question.get();

  const tempLC = getLineCounter();

  const deferred = getDeferred<T[]>();

  let activeIndex: number = initial[0] !== undefined ? (typeof initial[0] === 'number' ? initial[0] : items.indexOf(initial[0] as T)) : 0;
  activeIndex = MathsTools.clamp(activeIndex, 0, items.length - 1);
  let selectedIndexes: number[] = initial.map((i) => (typeof i === 'number' ? i : items.indexOf(i as T))).filter((i) => i !== -1);

  let fullOptions: table.FullTableOptions = undefined;
  let bodyRowHeight = 0;
  let headerHeight = 0;
  let numRows = Infinity;
  let colWidths: number[] = [];
  let scrollLastStartingIndex = 0;
  let calcedTermSize = [0, 0];

  let errorInfo: ErrorInfo = getErrorInfoFromValidationResult(true);

  const operation = {
    calculateSetup: () => {
      calcedTermSize = [process.stdout.columns, process.stdout.rows];
      const askOptions = getAskOptions();
      const HOR_CHAR = '_';
      const VER_CHAR = '╹';
      fullOptions = table.utils.getFullOptions(operation.getTableOptions(0));
      const overrideOptions: table.TableOptions = {
        overrideHorChar: HOR_CHAR,
        overrideCornChar: HOR_CHAR,
        overrideVerChar: VER_CHAR,
        drawRowLines: true,
        drawOuter: true,
        align: 'left'
      };
      const { tableLines, body, header } = operation.getTable(items, activeIndex, 0, {}, overrideOptions);

      // calculate row heights
      const horiLine = fullOptions.drawRowLines === false ? 0 : 1;
      const indexesOfHoriLines = tableLines
        .map((line, index) => (line.startsWith(HOR_CHAR.repeat(4)) ? index : undefined))
        .filter((i) => i !== undefined);
      const allRowHeights = indexesOfHoriLines.slice(0, -1).map((num, i) => indexesOfHoriLines[i + 1] - num);
      const allHeaderHeights = allRowHeights.slice(0, header.length); // includes hor line (even if not usually drawn)
      const allBodyHeights = allRowHeights.slice(header.length); // includes hor line (even if not usually drawn)
      bodyRowHeight = Math.max(...allBodyHeights) - horiLine; // doesn't include hor line

      // calculate maximum number of rows
      const imitatedQuestion = getImitateOutput(questionText, '', false, false, undefined);
      const questPromptHeight = out.utils.getNumLines(imitatedQuestion);
      const actionBar = getTableSelectActionBar(isMulti);
      const actionBarHeight = out.utils.getNumLines(actionBar);
      const topMargin = fullOptions.margin?.[0] ?? 0;
      const bottomMargin = (fullOptions.margin?.[2] ?? topMargin) + 1; // +1 for cursor line
      headerHeight = horiLine; // top border line (if no header)
      if (header.length) {
        const dividerLine = 1; // always present if both body and height are present
        headerHeight = MathsTools.addAll(...allHeaderHeights) - (fullOptions.drawRowLines ? 0 : header.length);
        headerHeight += dividerLine;
      }
      const maxHeight = Math.floor((askOptions.general.tableSelectMaxHeightPercentage / 100) * calcedTermSize[1]);
      const availableSpace = maxHeight - questPromptHeight - actionBarHeight - topMargin - bottomMargin;
      numRows = Math.floor((availableSpace - headerHeight) / (bodyRowHeight + horiLine));
      numRows = MathsTools.clamp(numRows, 1, items.length);

      // calculate locked column widths
      const mostColumns = Math.max(...body.map((row) => row.length));
      const typicalLine = tableLines.find((line) => line.split('').filter((c) => c === VER_CHAR).length === mostColumns + 1);
      colWidths = typicalLine
        .split(VER_CHAR)
        .slice(1, -1)
        .map((sect) => out.getWidth(sect))
        .map((fullWidth) => fullWidth - fullOptions.cellPadding * 2);
    },

    getResultsArray: () => (isMulti ? selectedIndexes.map((i) => items[i]) : [items[activeIndex]]).filter(fn.isTruthy),
    getDisplayResult: () => (isMulti ? operation.getResultsArray() : items[activeIndex]),

    runValidation: () => {
      if (!validate) return;
      const results = operation.getResultsArray();
      const validateResult = validate(results);
      errorInfo = getErrorInfoFromValidationResult(validateResult);
    },

    getTableOptions: (hoveredIndex: number, styleOptions: table.TableOptions = {}, overrideOptions: table.TableOptions = {}) => {
      const theme = getAskOptionsForState(false, errorInfo.isError);

      return {
        ...styleOptions,
        ...tableOptions,
        ...overrideOptions,
        margin: [0, 0, 0, 0], // cannot have margins
        maxWidth: (tableOptions.maxWidth ?? out.utils.getTerminalWidth()) - 2, // -2 for scrollbar
        format: [
          { formatFn: theme.colours.tableSelectHover, isBody: true, isHeader: false, row: hoveredIndex },
          // ...(isMulti ? selectedIndexes.map((i) => ({ formatFn: theme.colours.tableSelectHover, isBody: true, isHeader: false, row: i })) : []),
          ...(styleOptions.format || []),
          ...(tableOptions.format || []),
          ...(overrideOptions.format || [])
        ]
      };
    },

    getTable: (
      showItems: T[],
      hoveredIndex: number,
      startingIndex: number = 0,
      styleOptions: table.TableOptions = {},
      overrideOptions: table.TableOptions = {}
    ) => {
      const theme = getAskOptionsForState(false, errorInfo.isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;
      const options: table.TableOptions = operation.getTableOptions(hoveredIndex, styleOptions, overrideOptions);

      // const showItems = items.slice(0, numRows);

      LOG('getTable', { showItems, hoveredIndex, startingIndex, styleOptions, overrideOptions, options });

      let initialBody;
      let initialHeader;
      if (rows) {
        initialBody = typeof rows === 'function' ? showItems.map(rows as ItemToRowMapFunction<T>) : (rows as any[][]);
        initialHeader = headers;
      } else {
        const isHeaderObj = headers && !(headers instanceof Array);
        const objTable = table.utils.objectsToTable(showItems, isHeaderObj ? (headers as RemapOf<T, string>) : undefined);
        initialBody = objTable.body;
        initialHeader = isHeaderObj ? objTable.header : headers;
      }

      const selectedIcon = colr.reset(col.itemSelectedIcon(sym.itemSelectedIcon));
      const unselectedIcon = colr.reset(col.itemUnselectedIcon(sym.itemUnselectedIcon));
      const cursorIcon = colr.reset(col.itemHover(col.itemHoverIcon(sym.itemHoverIcon)));

      const body: any[][] = initialBody.map((row, index) => {
        let firstCell;
        if (isMulti) {
          firstCell = selectedIndexes.includes(index + startingIndex) ? selectedIcon : unselectedIcon;
        } else {
          firstCell = initialBody.indexOf(row) === hoveredIndex ? cursorIcon : ' ';
        }

        firstCell += '\n'.repeat(Math.max(0, bodyRowHeight - firstCell.split('\n').length));

        return [firstCell, ...row];
      });
      const header: any[][] = initialHeader.length ? initialHeader.map((row) => ['', ...row]) : [];

      const tableLines = table.getLines(body, header, options);

      return { tableLines, body, header, options };
    },

    display: () => {
      if (process.stdout.columns !== calcedTermSize[0] || process.stdout.rows !== calcedTermSize[1]) {
        operation.calculateSetup();
      }

      const theme = getAskOptionsForState(false, errorInfo.isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;

      const isScrollbar = numRows < items.length;

      let showItems = items;
      let hoveredIndex = activeIndex;
      let scrolledItems: ScrolledItems<T> = undefined;
      if (isScrollbar) {
        scrolledItems = getScrolledItems(items, activeIndex, scrollLastStartingIndex, numRows);
        showItems = scrolledItems.items;
        scrollLastStartingIndex = scrolledItems.startingIndex;
        hoveredIndex = scrolledItems.hoveredIndex;
      }

      let { body, tableLines } = operation.getTable(
        showItems,
        hoveredIndex,
        scrolledItems?.startingIndex ?? 0,
        { wrapLinesFn: col.decoration, wrapBodyLinesFn: col.specialNormal },
        { colWidths, align: 'left' }
      );

      if (isScrollbar) {
        const scrollbar = getScrollbar(items, scrolledItems, theme, tableLines.length - headerHeight + 1, true, fullOptions.drawRowLines);
        tableLines = tableLines.map((line, index) => `${line} ${scrollbar[index - headerHeight + 1] ?? ' '}`);

        LOG('display', { headerHeight, tableLinesLength: tableLines.length, scrollbarLength: scrollbar.length });
      }

      if (tableOptions.align !== undefined && tableOptions.align !== 'left') {
        tableLines = out.align(tableLines.join('\n'), tableOptions.align).split('\n');
      }

      const resultOut = operation.getDisplayResult();

      let output = ansi.cursor.hide + tempLC.ansi.moveHome();
      output += getImitateOutput(questionText, resultOut, false, errorInfo.isError, errorInfo.errorMessage);
      output += '\n' + tableLines.join('\n');
      output += '\n' + getTableSelectActionBar(isMulti, undefined, undefined, errorInfo.isError);

      tempLC.overwrite(output);
    }
  };

  const userActions = {
    move: (dir: number) => {
      activeIndex = (items.length + activeIndex + dir) % items.length;
      operation.runValidation();
      operation.display();
    },
    toggle: () => {
      if (isMulti) {
        if (selectedIndexes.includes(activeIndex)) {
          selectedIndexes = selectedIndexes.filter((i) => i !== activeIndex);
        } else {
          selectedIndexes.push(activeIndex);
        }
      }
      operation.runValidation();
      operation.display();
    },
    toggleAll: () => {
      if (isMulti) {
        const allSelected = items.every((v, i) => selectedIndexes.includes(i));
        selectedIndexes = allSelected ? [] : items.map((v, i) => i);

        operation.runValidation();
        operation.display();
      }
    },
    exit: () => {
      kl.stop();
      tempLC.clear();
      imitate(questionText, '', false, true, undefined, lc);
      process.stdout.write(ansi.cursor.show);
      process.exit();
    },
    submit: () => {
      operation.runValidation();
      if (errorInfo.isError) return;
      kl.stop();
      const results = operation.getResultsArray();
      tempLC.clear();
      imitate(questionText, isMulti ? results : results[0], true, false, undefined, lc);
      process.stdout.write(ansi.cursor.show);
      deferred.resolve(results);
    }
  };

  const listenCallback = (key: string) => {
    switch (key.toLowerCase()) {
      case 'exit':
      case 'esc':
        return userActions.exit();
      case 'up':
        return userActions.move(-1);
      case 'down':
        return userActions.move(1);
      case 'left':
      case 'right':
      case 'space':
        return userActions.toggle();
      case 'a':
        return userActions.toggleAll();
      case 'return':
        return userActions.submit();
    }
  };
  const kl = getKeyListener(listenCallback, true);

  operation.calculateSetup();
  operation.runValidation();
  operation.display();

  return deferred.promise;
};

const keyActionDict: ActionBarConfig = {
  move: {
    keys: '↑ ↓',
    label: 'Move Cursor'
  },
  select: {
    keys: 'space ← →',
    label: 'Toggle'
  },
  selectAll: {
    keys: 'a',
    label: 'Toggle all'
  },
  return: {
    keys: '⮐ ',
    label: 'Submit'
  }
};

const getTableSelectActionBar = (multi: boolean, pressed?: string, disabled: string[] = [], isError: boolean = false): string => {
  const theme = getAskOptionsForState(false, isError);
  const keyList = {
    single: ['move', 'return'],
    multi: ['move', 'select', 'selectAll', 'return']
  }[multi ? 'multi' : 'single'];
  return theme.colours.specialInfo(getActionBar(keyList, keyActionDict, pressed, disabled));
};

/**<!-- DOCS: ask.table ### -->
 * table
 *
 * A collection of functions for asking questions with tables.
 */

/**<!-- DOCS: ask.table.select #### @ -->
 * select
 *
 * - `ask.table.select`
 *
 * Get a single selection from a table.
 *
 * ```typescript
 * const items = [
 *   { name: 'John', age: 25 },
 *   { name: 'Jane', age: 26 },
 *   { name: 'Derek', age: 27 }
 * ];
 * const headers = [['Name', 'Age']];
 * const itemToRow = ({ name, age }) => [name, age];
 *
 * const answer = await ask.table.select('Who?', items, undefined, itemToRow, headers);
 * // ┏━━━┳━━━━━━━┳━━━━━┓
 * // ┃   ┃ Name  ┃ Age ┃
 * // ┡━━━╇━━━━━━━╇━━━━━┩
 * // │   │ John  │ 25  │
 * // ├───┼───────┼─────┤
 * // │ ❯ │ Jane  │ 26  │
 * // ├───┼───────┼─────┤
 * // │   │ Derek │ 27  │
 * // └───┴───────┴─────┘
 * // Returns: { name: 'Jane', age: 26 }
 * ```
 * @param {string | Breadcrumb} question
 * @param {T[]} items
 * @param {AskTableDisplaySettings<T>} [settings={}]
 * @param {T | number} [initial]
 * @param {(item: T) => Error | string | boolean | void} [validate]
 * @param {LineCounter} [lc]
 * @returns {Promise<T>}
 */
export const select = async <T extends unknown>(
  question: string | Breadcrumb,
  items: T[],
  settings: AskTableDisplaySettings<T> = {},
  initial?: T | number,
  validate?: (item: T) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T> => {
  const validateMulti = validate ? (items: T[]) => validate(items[0]) : undefined;
  const results = await askTableHandler(
    false,
    question,
    items,
    [initial] as number[] | T[],
    settings.rows,
    settings.headers,
    settings.options,
    validateMulti,
    lc
  );
  return results[0];
};

/**<!-- DOCS: ask.table.multiselect #### @ -->
 * multiselect
 *
 * - `ask.table.multiselect`
 *
 * Get multiple selections from a table.
 *
 * ```typescript
 * const items = [
 *   { name: 'John', age: 25 },
 *   { name: 'Jane', age: 26 },
 *   { name: 'Derek', age: 27 }
 * ];
 * const headers = [['Name', 'Age']];
 * const itemToRow = ({ name, age }) => [name, age];
 *
 * const answer = await ask.table.multiselect('Who?', items, undefined, itemToRow, headers);
 * ┏━━━┳━━━━━━━┳━━━━━┓
 * ┃   ┃ Name  ┃ Age ┃
 * ┡━━━╇━━━━━━━╇━━━━━┩
 * │ ◉ │ John  │ 25  │
 * ├───┼───────┼─────┤
 * │ ◯ │ Jane  │ 26  │
 * ├───┼───────┼─────┤
 * │ ◉ │ Derek │ 27  │
 * └───┴───────┴─────┘
 * // [
 * //   { name: 'John', age: 25 },
 * //   { name: 'Derek', age: 27 }
 * // ]
 * ```
 * @param {string | Breadcrumb} question
 * @param {T[]} items
 * @param {AskTableDisplaySettings<T>} [settings={}]
 * @param {T[] | number[]} [initial]
 * @param {(items: T[]) => Error | string | boolean | void} [validate]
 * @param {LineCounter} [lc]
 * @returns {Promise<T[]>}
 */
export const multiselect = <T extends unknown>(
  question: string | Breadcrumb,
  items: T[],
  settings: AskTableDisplaySettings<T> = {},
  initial?: T[] | number[],
  validate?: (items: T[]) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<T[]> => askTableHandler(true, question, items, initial, settings.rows, settings.headers, settings.options, validate, lc);

/**<!-- DOCS: ask.table.AskTableDisplaySettings #### @ -->
 * AskTableDisplaySettings<T>
 *
 * - `AskTableDisplaySettings<T>`
 *
 * Settings for how the table should display the items
 *
 * All settings are optional.
 *
 * | Name      | Type                            | Description                                                      |
 * | --------- | ------------------------------- | ---------------------------------------------------------------- |
 * | `rows`    | `any[][] \| (item: T) => any[]` | Rows to display or function that takes an item and returns a row |
 * | `headers` | `any[][] \| RemapOf<T, string>` | Header to display, or object with title for each item property   |
 * | `options` | `table.TableOptions`            | Options object for table (some options are overridden)           |
 */
export interface AskTableDisplaySettings<T> {
  rows?: any[][] | ItemToRowMapFunction<T>;
  headers?: any[][] | RemapOf<T, string>;
  options?: table.TableOptions;
}
