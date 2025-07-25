//<!-- DOCS: 700 -->

import { safe } from 'swiss-ak';

/**<!-- DOCS: PathTools ##! -->
 * PathTools
 *
 * A collection of tools for working with paths
 */
export namespace PathTools {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: PathTools.explodePath ### @ -->
   * explodePath
   *
   * - `PathTools.explodePath`
   * - `explodePath`
   *
   * 'Explodes' a path into its components
   *
   * - path: the full original path as it was passed in.
   * - dir: the directory path of the given path
   * - name: the name of the file, not including the extension
   * - ext: the extension of the file, not including the dot
   * - filename: the full name of the file, including the extension (and dot)
   * - folders: the ancestral folders of the given dir as an array
   *
   * ```typescript
   * const { dir, name, ext, filename } = explodePath('/path/to/file.txt');
   *
   * console.log(path); // '/path/to/file.txt'
   * console.log(dir); // '/path/to'
   * console.log(name); // 'file'
   * console.log(ext); // 'txt'
   * console.log(filename); // 'file.txt'
   * console.log(folders); // ['path', 'to']
   * ```
   * @param {string} path - Path to explode
   * @returns {ExplodedPath} - Exploded path object
   */
  export const explodePath = (path: string): ExplodedPath => {
    const args = {
      path: safe.str(path)
    };
    const dir = (args.path.match(/(.*[\\\/])*/) || [])[0].replace(/[\\\/]$/, ''); // everything up to last '/' or '\'
    const filename = (args.path.match(/[^\\\/]*$/) || [])[0]; // from last '/' or '\' onwards

    const ext = ((filename.match(/\.[^\.]*$/) || [])[0] || '').replace(/^\./, ''); // after last . in filename
    const name = filename.replace(ext, '').replace(/[\.]$/, ''); // until last . in filename

    const folders = dir.split(/[\\\/]/).filter((x) => x);

    return { path: args.path, dir, folders, name, ext, filename };
  };

  /**<!-- DOCS: PathTools.ExplodedPath ###! -->
   * ExplodedPath
   *
   * - `PathTools.ExplodedPath`
   * - `ExplodedPath`
   *
   * An object containing the exploded components of a path
   *
   * See `explodePath` for more details
   */
  export interface ExplodedPath {
    /**<!-- DOCS: PathTools.ExplodedPath.path ##### -->
     * path
     *
     * The full original path as it was passed in.
     */
    path: string;

    /**<!-- DOCS: PathTools.ExplodedPath.dir ##### -->
     * dir
     *
     * The directory path of the given path
     *
     * Note: no trailing slash
     */
    dir: string;

    /**<!-- DOCS: PathTools.ExplodedPath.folders ##### -->
     * folders
     *
     * the ancestral folders of the given dir as an array
     */
    folders: string[];

    /**<!-- DOCS: PathTools.ExplodedPath.name ##### -->
     * name
     *
     * the name of the file, not including the extension
     */
    name: string;

    /**<!-- DOCS: PathTools.ExplodedPath.ext ##### -->
     * ext
     *
     * the extension of the file, not including the dot
     */
    ext: string;

    /**<!-- DOCS: PathTools.ExplodedPath.filename ##### -->
     * filename
     *
     * the full name of the file, including the extension (and dot)
     */
    filename: string;
  }

  /**<!-- DOCS: PathTools.removeTrailSlash ### @ -->
   * removeTrailSlash
   *
   * - `PathTools.removeTrailSlash`
   *
   * Remove trailing slash from path (if one exists)
   *
   * ```typescript
   * '/path/to/file/' -> '/path/to/file'
   * ```
   * @param {string} path - Path to remove the trailing slash from
   * @returns {string} - Path without the trailing slash
   */
  export const removeTrailSlash = (path: string) => path.replace(/\/$/, '');

  /**<!-- DOCS: PathTools.trailSlash ### @ -->
   * trailSlash
   *
   * - `PathTools.trailSlash`
   *
   * Ensures there's a trailing slash on path
   *
   * ```typescript
   * '/path/to/file' -> '/path/to/file/'
   * ```
   * @param {string} path - Path to ensure has a trailing slash
   * @returns {string} - Path with a trailing slash
   */
  export const trailSlash = (path: string) => removeTrailSlash(path) + '/';

  /**<!-- DOCS: PathTools.removeDoubleSlashes ### @ -->
   * removeDoubleSlashes
   *
   * - `PathTools.removeDoubleSlashes`
   *
   * Removes double slashes from path (an bug with Unix paths)
   *
   * ```typescript
   * '/path/to//file' -> '/path/to/file'
   * ```
   * @param {string} path - Path to remove double slashes from
   * @returns {string} - Path without double slashes
   */
  export const removeDoubleSlashes = (path: string) => path.replace(/\/\//g, '/');
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

/**<!-- DOCS-ALIAS: PathTools.explodePath -->*/
export const explodePath = PathTools.explodePath;

/**<!-- DOCS-ALIAS: PathTools.ExplodedPath -->*/
export type ExplodedPath = PathTools.ExplodedPath;
