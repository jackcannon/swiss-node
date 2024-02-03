import { ArrayTools, PromiseTools, fn, getDeferred, milliseconds, wait } from 'swiss-ak';
import { colr } from '../../colr';
import { Breadcrumb, LineCounter, ansi, getLineCounter, out } from '../../out';

import { getPathType, mkdir, openFinder } from '../../../utils/fsUtils';
import { PathTools } from '../../PathTools';
import { ask } from '../../ask';
import { getKeyListener } from '../../keyListener';
import { table } from '../../table';
import { getAskOptions, getAskOptionsForState } from '../basicInput/customise';
import { getScrollbar, getScrolledItems } from '../basicInput/getScrolledItems';
import { getErrorInfoFromValidationResult } from '../errorValidation';
import { getImitateOutput } from '../imitate';
import { PathContents, fsCache } from './cache';
import { forceLoadPathContents, getFEActionBar, getFilePanel, join, loadPathContents } from './helpers';

export const fileExplorerHandler = async (
  isMulti: boolean = false,
  isSave: boolean = false,
  question: string | Breadcrumb,
  selectType: 'd' | 'f' = 'f',
  startPath: string = process.cwd(),
  suggestedFileName: string = '',
  validateFn: (
    cursorType: 'd' | 'f',
    currentCursor: string,
    currentDir: string,
    currentFileName: string | undefined,
    selected: string[],
    newFileName: string | undefined
  ) => Error | string | boolean | void,
  lc?: LineCounter
): Promise<string[]> => {
  // options
  const askOptions = getAskOptions();

  const minWidth = askOptions.general.fileExplorerColumnWidth;
  const maxWidth = askOptions.general.fileExplorerColumnWidth;
  const maxItems = askOptions.general.fileExplorerMaxItems;
  const maxColumns = Math.floor(out.utils.getTerminalWidth() / (maxWidth + 1));

  // pre-calced values
  const accepted: ('d' | 'f')[] = isSave ? ['d', 'f'] : [selectType];

  // objects
  const tempLC = getLineCounter();
  const deferred = getDeferred<string[]>();

  // set by user actions
  let cursor = startPath.split('/');
  const multiSelected: Set<string> = new Set<string>();

  // set by recalc()
  let paths: string[] = [];
  let currentPath: string = '';
  let cursorType: 'd' | 'f' = 'd';
  let isError: boolean = true;
  let errorMsg: string = undefined;
  const cursorIndexes: { [dirPath: string]: number } = {};
  const scrollLastStartingIndex: { [dirPath: string]: number } = {};

  let pressed: string = undefined;
  let submitted: boolean = false;
  let loading: boolean = false; // is loading something
  let locked: boolean = false; // prevent multiple keypresses

  // remove general line counter
  const originalLC = askOptions.general.lc;
  askOptions.general.lc = getLineCounter(); // we don't use this one

  const operation = {
    recalc: () => {
      if (submitted) return;
      paths = cursor.map((f, index, all) => join(...all.slice(0, index + 1)));

      currentPath = paths[paths.length - 1];

      const isDir = fsCache.getPathContents(paths[paths.length - 2])?.dirs.includes(PathTools.explodePath(currentPath).filename) || false;
      cursorType = isDir ? 'd' : 'f';

      const errorInfo = getErrorInfoFromValidationResult(operation.runValidation());
      isError = errorInfo.isError;
      errorMsg = errorInfo.errorMessage;
    },

    loadInitialPathIndexes: () => {
      operation.recalc();
      paths.forEach((path, index) => {
        const cursorItem = cursor[index + 1];
        if (cursorItem === undefined) return;
        const contents = fsCache.getPathContents(path);
        const cursorIndex = [...contents.dirs, ...contents.files].indexOf(cursorItem);

        cursorIndexes[path] = cursorIndex;
      });
    },

    updateCursorIndexes: (newIndex: number) => {
      operation.recalc();
      const currentParentDir = paths[paths.length - 2];

      const lastKnownIndex = cursorIndexes[currentParentDir];
      if (lastKnownIndex !== newIndex) cursorIndexes[currentParentDir] = newIndex;
    },

    runValidation: (newFileName?: string) => {
      const currentDir = cursorType === 'f' ? paths[paths.length - 2] : currentPath;
      const currentFileName = cursorType === 'f' ? cursor[cursor.length - 1] : undefined;
      return validateFn(cursorType, currentPath, currentDir, currentFileName, Array.from(multiSelected), newFileName);
    },

    loadEssentials: async (executeFn: (path: string) => Promise<PathContents> = loadPathContents) => {
      await Promise.all([
        PromiseTools.each(paths, executeFn),
        (async () => {
          // current dir
          const { dirs } = await executeFn(currentPath);
          const list = dirs;
          return PromiseTools.each(
            list.map((dir) => join(currentPath, dir)),
            executeFn
          );
        })(),
        (async () => {
          // parent dir
          const parent = PathTools.explodePath(currentPath).dir;
          const { dirs } = await executeFn(parent);
          const list = [...dirs];
          return PromiseTools.each(
            list.map((dir) => join(parent, dir)),
            executeFn
          );
        })()
      ]);
    },

    loadNewDepth: async () => {
      loading = true;
      operation.display();
      await operation.loadEssentials(loadPathContents);
      loading = false;
      operation.display();
    },

    loadNewItem: async () => {
      if (!fsCache.getPathContents(currentPath)) {
        loading = true;
        operation.display();
        await loadPathContents(currentPath);
        loading = false;
        operation.display();
      } else {
        operation.display();
      }
    },

    setPressed: async (key: string) => {
      pressed = key;
      operation.display();
      if (!key) return;
      await wait(milliseconds(100));
      if (!loading) {
        pressed = undefined;
        operation.display();
      }
    },

    display: async () => {
      if (submitted) return;
      operation.recalc();

      const theme = getAskOptionsForState(false, isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;

      // prepared styled elements
      const selectedIcon = ` ${col.itemSelectedIcon(sym.itemSelectedIcon)} `;
      const unselectedIcon = ` ${col.itemUnselectedIcon(sym.itemUnselectedIcon)} `;

      type Formatter = (
        width: number,
        highlighted: string,
        isActiveColumn: boolean,
        columnPath: string
      ) => (name: string, index?: number, all?: string[]) => string;

      const formatter =
        (symbol: string, regularWrapFn: Function, selectedPrefix: string = ' ', unselectedPrefix: string = ' '): Formatter =>
        (width: number, highlighted: string, isActiveColumn: boolean, columnPath: string) =>
        (name: string, index?: number, all?: string[]) => {
          const isHighlighted = name === highlighted;
          const fullPath = join(columnPath, name);
          const isSelected = isMulti && multiSelected.has(fullPath);
          const prefix = isSelected ? selectedPrefix : unselectedPrefix;
          const template = (text) => `${prefix}${text} ${symbol} `;
          const extraChars = out.getWidth(template(''));
          const stretched = template(out.left(out.truncate(name, width - extraChars, '…'), width - extraChars));

          let wrapFn: Function = fn.noact;
          if (isHighlighted) {
            if (isActiveColumn) {
              wrapFn = col.specialHover;
            } else {
              wrapFn = col.specialInactiveHover;
            }
          } else {
            if (isActiveColumn) {
              wrapFn = isSelected ? col.specialHighlight : regularWrapFn;
            } else {
              wrapFn = isSelected ? col.specialInactiveHighlight : regularWrapFn;
            }
          }

          return wrapFn(colr.clear(stretched));
        };

      const { dir: formatDir, file: formatFile } = {
        single: {
          d: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal),
            file: formatter(sym.fileOpenableIcon, col.specialInactiveFaded)
          },
          f: {
            dir: formatter(sym.folderOpenableIcon, col.specialFaded),
            file: formatter(sym.fileOpenableIcon, col.specialNormal)
          },
          df: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal),
            file: formatter(sym.fileOpenableIcon, col.specialNormal)
          }
        },
        multi: {
          d: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal, selectedIcon, unselectedIcon),
            file: formatter(sym.fileOpenableIcon, col.specialInactiveFaded, '   ', '   ')
          },
          f: {
            dir: formatter(sym.folderOpenableIcon, col.specialFaded, '   ', '   '),
            file: formatter(sym.fileOpenableIcon, col.specialNormal, selectedIcon, unselectedIcon)
          },
          df: {
            // shouldn't happen, but here anyway
            dir: formatter(sym.folderOpenableIcon, col.specialNormal, '   ', '   '),
            file: formatter(sym.fileOpenableIcon, col.specialNormal, selectedIcon, unselectedIcon)
          }
        }
      }[isMulti ? 'multi' : 'single'][accepted.join('')] as { dir: Formatter; file: Formatter };

      const emptyColumn = [' '.repeat(minWidth), ...' '.repeat(maxItems - 1).split('')];

      const allColumns = paths.map(fsCache.getPathContents).map((contents, index) => {
        const currentParentDir = paths[index];
        const dirs = contents?.dirs || [];
        const files = contents?.files || [];
        const list = [...dirs, ...files];

        const isScrollbar = list.length > maxItems;

        const contentWidth = Math.max(...list.map((s) => s.length));
        const width = Math.max(minWidth, Math.min(contentWidth, maxWidth)) - (isScrollbar ? 1 : 0);

        const highlighted = cursor[index + 1];
        const highlightedIndex = list.indexOf(highlighted);
        const isActiveCol = index + 2 === cursor.length;

        const columnPath = paths[index];

        const formattedLines = [
          ...dirs.map(formatDir(width, highlighted, isActiveCol, columnPath)),
          ...files.map(formatFile(width, highlighted, isActiveCol, columnPath))
        ];

        if (isScrollbar) {
          const currentHoverIndex = cursorIndexes[currentParentDir] ?? (highlightedIndex !== -1 ? highlightedIndex : 0);
          const previousStartIndex = scrollLastStartingIndex[currentParentDir] ?? 0;

          const scrolledItems = getScrolledItems(formattedLines, currentHoverIndex, previousStartIndex, maxItems, theme.general.scrollMargin);
          scrollLastStartingIndex[currentParentDir] = scrolledItems.startingIndex;

          const scrollbar = getScrollbar(formattedLines, scrolledItems, theme);

          return out.utils.joinLines(scrolledItems.items.map((line, index) => line + scrollbar[index]));
        }

        // pad lines to ensure full height
        return out.utils.joinLines([...formattedLines, ...emptyColumn].slice(0, maxItems));
      });

      if (cursorType === 'f') {
        allColumns[allColumns.length - 1] = getFilePanel(currentPath, minWidth, maxItems);
      }

      // show exactly x columns
      const columns = [...allColumns.slice(-maxColumns), ...ArrayTools.repeat(maxColumns, out.utils.joinLines(emptyColumn))].slice(0, maxColumns);

      const termWidth = out.utils.getTerminalWidth();

      const tableLines = table.getLines([columns], undefined, {
        wrapLinesFn: col.decoration,
        drawOuter: true,
        cellPadding: 0,
        truncate: '',
        maxWidth: Infinity
      });
      const tableOut = out.center(out.limitToLengthStart(tableLines.join('\n'), termWidth - 1), termWidth);
      const tableWidth = out.getWidth(tableLines[Math.floor(tableLines.length / 2)]);

      const cursorTypeOut = colr.dim(`(${{ f: txt.file, d: txt.directory }[cursorType]})`);
      const infoLine = (() => {
        const loadingOut = loading ? col.specialFaded(txt.loading) : undefined;

        const count = isMulti ? col.specialFaded(`${col.specialHint('[')} ${txt.selected(multiSelected.size)} ${col.specialHint(']')} `) : '';
        const curr = out.limitToLengthStart(`${cursorTypeOut} ${currentPath}`, tableWidth - (out.getWidth(count) + 3));
        const split = out.split(loadingOut ?? count, curr, tableWidth - 2);
        return out.center(split, termWidth);
      })();
      const resultOut = isMulti ? Array.from(multiSelected) : currentPath;

      const actionBar = getFEActionBar(isMulti, pressed, [], isError);

      // Actual draw
      let output = ansi.cursor.hide + tempLC.ansi.moveHome();

      const imitated = getImitateOutput(question, resultOut, false, isError, errorMsg);

      output += imitated;
      output += '\n' + infoLine;
      output += '\n' + tableOut;
      tempLC.overwrite(output);
      tempLC.checkpoint('actionBar');
      let output2 = actionBar;
      output2 += '\n'.repeat(out.utils.getNumLines(imitated)); // allows room for extra inputs at bottom of screen
      tempLC.overwrite(output2);
      tempLC.checkpoint('post-display');
    }
  };

  // controls

  const userActions = {
    moveVertical: (direction: -1 | 1) => {
      const folds = cursor.slice(0, -1);
      const current = cursor[cursor.length - 1];

      const currContents = fsCache.getPathContents(paths[folds.length - 1]);
      if (!currContents) return;
      const list = [...currContents.dirs, ...currContents.files];
      const currIndex = list.indexOf(current);
      const nextIndex = (list.length + currIndex + direction) % list.length;
      const nextValue = list[nextIndex];

      cursor = [...folds, nextValue];
      operation.updateCursorIndexes(nextIndex);
      operation.loadNewItem();
    },

    moveRight: () => {
      const current = cursor[cursor.length - 1];
      const currContents = fsCache.getPathContents(paths[cursor.length - 2]);
      const nextContents = fsCache.getPathContents(paths[cursor.length - 1]);
      if (!currContents || !nextContents || currContents.dirs.includes(current) === false) return;
      const nextList = [...nextContents.dirs, ...nextContents.files];
      if (!nextList.length) return;

      const savedIndex = cursorIndexes[paths[cursor.length - 1]] ?? 0;

      cursor = [...cursor, nextList[savedIndex] ?? nextList[0]];
      operation.loadNewDepth();
    },
    moveLeft: () => {
      if (cursor.length <= 2) return;
      cursor = cursor.slice(0, -1);
      operation.loadNewDepth();
    },
    refresh: async () => {
      if (loading) return;
      loading = true;
      locked = true;
      operation.setPressed('r');
      const allKeys = Array.from(fsCache.cache.keys());

      const restKeys = new Set<string>(allKeys);

      await operation.loadEssentials((path: string) => {
        restKeys.delete(path);
        return forceLoadPathContents(path);
      });
      operation.display();
      loading = false;
      locked = false;
      if (pressed === 'r') operation.setPressed(undefined);

      await PromiseTools.eachLimit(32, Array.from(restKeys), async () => {
        if (submitted) return;
        return forceLoadPathContents;
      });
    },
    select: () => {
      if (isMulti && accepted.includes(cursorType)) {
        // toggle cursor to selection
        if (multiSelected.has(currentPath)) {
          multiSelected.delete(currentPath);
        } else {
          multiSelected.add(currentPath);
        }
        operation.setPressed('space');
      }
    },
    takeInput: async <T extends unknown>(
      preQuestion: () => Promise<void> | void,
      inputFn: () => Promise<T>,
      postQuestion?: (result: T) => Promise<boolean | void> | boolean | void
    ): Promise<T> => {
      operation.display();
      loading = true;
      // locked = true;
      kl.stop();

      tempLC.clearToCheckpoint('actionBar');
      await preQuestion();
      const value = await inputFn();
      const skipDisplay = postQuestion ? (await postQuestion(value)) ?? false : false;
      if (!skipDisplay) operation.display();

      kl.start();
      loading = false;
      locked = false;

      return value;
    },
    newFolder: async () => {
      const { colours: col, text: txt } = getAskOptionsForState(false, false);

      const basePath = cursorType === 'f' ? paths[paths.length - 2] : currentPath;

      await userActions.takeInput(
        () => {
          tempLC.checkpoint('newFolder');
          const info2 = col.specialFaded(txt.specialNewFolderEnterNothingCancel);

          const info1Prefix = col.specialFaded('  ' + txt.specialNewFolderAddingFolderTo);
          const maxValWidth = out.utils.getTerminalWidth() - (out.getWidth(info1Prefix) + out.getWidth(info2));
          const info1Value = col.specialNormal(out.truncateStart(PathTools.trailSlash(basePath), maxValWidth));
          const info1 = info1Prefix + info1Value;

          tempLC.log(out.split(info1, info2, out.utils.getTerminalWidth() - 2));
        },
        () => ask.text(txt.specialNewFolderQuestion(col.specialHighlight), '', undefined, tempLC),
        async (newFolderName) => {
          const newFolderPath = join(basePath, newFolderName);
          if (newFolderName !== '') {
            await mkdir(newFolderPath);
          }
          tempLC.clearToCheckpoint('newFolder');
          operation.display();
          await Promise.all([forceLoadPathContents(basePath), forceLoadPathContents(newFolderPath)]);
          return;
        }
      );
    },
    openFinder: async () => {
      await openFinder(currentPath, cursorType);
    },
    submit: () => {
      if (isError) {
        if (askOptions.general.beeps) process.stdout.write(ansi.beep);
        return;
      }
      return isSave ? userActions.submitSave() : userActions.submitSelect();
    },
    submitSave: async () => {
      const { colours: col, text: txt } = getAskOptionsForState(false, false);

      const initCursor = cursorType === 'f' ? cursor[cursor.length - 1] : '';
      const initSugg = suggestedFileName;
      const initStart = startPath && (await getPathType(startPath)) === 'f' ? PathTools.explodePath(startPath).filename : '';
      const initial = initCursor || initSugg || initStart || '';

      const basePath = cursorType === 'f' ? paths[paths.length - 2] : currentPath;

      const newFileName = await userActions.takeInput(
        () => {
          tempLC.checkpoint('saveName');
          tempLC.log(
            col.specialFaded('  ' + txt.specialSaveFileSavingFileTo) +
              col.specialNormal(out.truncateStart(PathTools.trailSlash(basePath), out.utils.getTerminalWidth() - 20))
          );
        },
        () => ask.text(txt.specialSaveFileQuestion(col.specialHighlight), initial, (text) => operation.runValidation(text), tempLC),
        () => {
          tempLC.clearToCheckpoint('saveName');
          return true;
        }
      );

      submitted = true;
      kl.stop();
      tempLC.clear();
      askOptions.general.lc = originalLC;

      const result = join(basePath, newFileName);
      ask.imitate(question, result, true, false, undefined, lc);
      process.stdout.write(ansi.cursor.show);
      return deferred.resolve([result]);
    },
    submitSelect: () => {
      if (!accepted.includes(cursorType)) return;

      submitted = true;
      operation.setPressed('return');
      kl.stop();
      tempLC.clear();
      askOptions.general.lc = originalLC;

      const resultOut = isMulti ? Array.from(multiSelected) : currentPath;
      const result = isMulti ? Array.from(multiSelected) : [currentPath];
      ask.imitate(question, resultOut, true, false, undefined, lc);
      return deferred.resolve(result);
    },
    exit: () => {
      kl.stop();
      tempLC.clear();
      askOptions.general.lc = originalLC;

      const resultOut = isMulti ? Array.from(multiSelected) : currentPath;
      ask.imitate(question, resultOut, false, true, undefined, lc);
      process.stdout.write(ansi.cursor.show);
      process.exit();
    }
  };

  const kl = getKeyListener((key) => {
    if (locked) return;
    switch (key) {
      case 'exit':
      case 'esc':
        return userActions.exit();
      case 'up':
        return userActions.moveVertical(-1);
      case 'down':
        return userActions.moveVertical(1);
      case 'left':
        return userActions.moveLeft();
    }
    switch (key) {
      case 'right':
        return userActions.moveRight();
      case 'r':
        return userActions.refresh();
      case 'f':
        return userActions.newFolder();
      case 'o':
        return userActions.openFinder();
      case 'space':
        return userActions.select();
      case 'return':
        return userActions.submit();
    }
  });

  operation.loadNewDepth().then(() => {
    operation.loadInitialPathIndexes();
  });

  return deferred.promise;
};
