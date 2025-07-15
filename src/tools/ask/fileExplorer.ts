import { LineCounter } from '../out';
import { ask } from '../ask';
import { Breadcrumb } from '../out/breadcrumb';
import { fileExplorerHandler } from './fileExplorer/handler';

//<!-- DOCS: 115 -->

/**<!-- DOCS: ask.fileExplorerHeader ### -->
 * fileExplorer
 */

/**<!-- DOCS: ask.fileExplorer #### @ -->
 * fileExplorer
 *
 * - `ask.fileExplorer`
 *
 * Get a file or folder path from the user.
 *
 * Note: Handles symlinks and resolves macOS aliases to their actual location.
 *
 * Note: Accepts both relative and absolute paths as startPath (relative will not allow navigating up from the CWD)
 *
 * ```typescript
const file = await ask.fileExplorer('What file?', 'f');
// '/Users/user/Documents/some_file.txt'

const dir = await ask.fileExplorer('What file?', 'd', '/Users/jackcannon/Documents');
// '/Users/jackcannon/Documents/some_folder'
 * ```
 * @param {string | Breadcrumb} questionText
 * @param {'d' | 'f'} [selectType='f']
 * @param {string} [startPath=process.cwd()]
 * @param {(path: string) => ask.ValidationResponse} [validate]
 * @param {LineCounter} [lc]
 * @returns {Promise<string>}
 */
export const fileExplorer = async (
  questionText: string | Breadcrumb,
  selectType: 'd' | 'f' = 'f',
  startPath: string = process.cwd(),
  validate?: (path: string) => ask.ValidationResponse,
  lc?: LineCounter
): Promise<string> => {
  const vFn = (
    cursorType: 'd' | 'f',
    currentCursor: string,
    currentDir: string,
    currentFileName: string | undefined,
    selected: string[],
    newFileName: string | undefined
  ): ask.ValidationResponse => {
    if (!validate) return true;
    if (cursorType !== selectType) return true;

    const result = validate(currentCursor);
    return result;
  };
  const arr = await fileExplorerHandler(false, false, questionText, selectType, startPath, undefined, vFn, lc);
  return arr[0];
};

/**<!-- DOCS: ask.multiFileExplorer #### @ -->
 * multiFileExplorer
 *
 * - `ask.multiFileExplorer`
 *
 * Get multiple file or folder paths from the user.
 *
 * Note: Handles symlinks and resolves macOS aliases to their actual location.
 *
 * Note: Accepts both relative and absolute paths as startPath (relative will not allow navigating up from the CWD)
 *
 * ```typescript
 * const files = await ask.multiFileExplorer('What files?', 'f');
 * // [
 * //   '/Users/user/Documents/some_file_1.txt',
 * //   '/Users/user/Documents/some_file_2.txt',
 * //   '/Users/user/Documents/some_file_3.txt'
 * // ]
 * ```
 * @param {string | Breadcrumb} questionText
 * @param {'d' | 'f'} [selectType='f']
 * @param {string} [startPath=process.cwd()]
 * @param {(paths: string[]) => ask.ValidationResponse} [validate]
 * @param {LineCounter} [lc]
 * @returns {Promise<string[]>}
 */
export const multiFileExplorer = (
  questionText: string | Breadcrumb,
  selectType: 'd' | 'f' = 'f',
  startPath: string = process.cwd(),
  validate?: (paths: string[]) => ask.ValidationResponse,
  lc?: LineCounter
): Promise<string[]> => {
  const vFn = (
    cursorType: 'd' | 'f',
    currentCursor: string,
    currentDir: string,
    currentFileName: string | undefined,
    selected: string[],
    newFileName: string | undefined
  ): ask.ValidationResponse => {
    if (!validate) return true;
    const result = validate(selected);
    return result;
  };
  return fileExplorerHandler(true, false, questionText, selectType, startPath, undefined, vFn, lc);
};

/**<!-- DOCS: ask.saveFileExplorer #### @ -->
 * saveFileExplorer
 *
 * - `ask.saveFileExplorer`
 *
 * Get a file path from the user, with the intention of saving a file to that path.
 *
 * Note: Handles symlinks and resolves macOS aliases to their actual location.
 *
 * Note: Accepts both relative and absolute paths as startPath (relative will not allow navigating up from the CWD)
 *
 * ```typescript
const HOME_DIR = '/Users/user/Documents';
const savePath = await ask.saveFileExplorer('Save file', HOME_DIR, 'data.json');
// '/Users/user/Documents/data.json'
 * ```
 * @param {string | Breadcrumb} questionText
 * @param {string} [startPath=process.cwd()]
 * @param {string} [suggestedFileName='']
 * @param {(dir: string, filename?: string) => ask.ValidationResponse} [validate]
 * @returns {Promise<string>}
 */
export const saveFileExplorer = async (
  questionText: string | Breadcrumb,
  startPath: string = process.cwd(),
  suggestedFileName: string = '',
  validate?: (dir: string, filename?: string) => ask.ValidationResponse
): Promise<string> => {
  const vFn = (
    cursorType: 'd' | 'f',
    currentCursor: string,
    currentDir: string,
    currentFileName: string | undefined,
    selected: string[],
    newFileName: string | undefined
  ): ask.ValidationResponse => {
    if (!validate) return true;

    const result = validate(currentDir, newFileName ?? currentFileName);
    return result;
  };
  const arr = await fileExplorerHandler(false, true, questionText, 'f', startPath, suggestedFileName, vFn);
  return arr[0];
};
