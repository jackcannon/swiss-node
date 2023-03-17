//<!-- DOCS: 700 -->
/**<!-- DOCS: ## -->
 * PathsTools
 *
 * A collection of tools for working with paths
 */

/**<!-- DOCS: ### -->
 * explodePath
 *
 * - `PathsTools.explodePath`
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
 */
export const explodePath = (path: string): ExplodedPath => {
  const dir = (path.match(/(.*[\\\/])*/) || [])[0].replace(/[\\\/]$/, ''); // everything up to last '/' or '\'
  const filename = (path.match(/[^\\\/]*$/) || [])[0]; // from last '/' or '\' onwards

  const ext = ((filename.match(/\.[^\.]*$/) || [])[0] || '').replace(/^\./, ''); // after last . in filename
  const name = filename.replace(ext, '').replace(/[\.]$/, ''); // until last . in filename

  const folders = dir.split(/[\\\/]/).filter((x) => x);

  return { path, dir, folders, name, ext, filename };
};

/**<!-- DOCS: #### -->
 * ExplodedPath
 *
 * - `PathsTools.ExplodedPath`
 * - `ExplodedPath`
 *
 * An object containing the exploded components of a path
 *
 * See `explodePath` for more details
 */
export interface ExplodedPath {
  /**<!-- DOCS: ##### -->
   * path
   *
   * The full original path as it was passed in.
   */
  path: string;

  /**<!-- DOCS: ##### -->
   * dir
   *
   * The directory path of the given path
   *
   * Note: no trailing slash
   */
  dir: string;

  /**<!-- DOCS: ##### -->
   * folders
   *
   * the ancestral folders of the given dir as an array
   */
  folders: string[];

  /**<!-- DOCS: ##### -->
   * name
   *
   * the name of the file, not including the extension
   */
  name: string;

  /**<!-- DOCS: ##### -->
   * ext
   *
   * the extension of the file, not including the dot
   */
  ext: string;

  /**<!-- DOCS: ##### -->
   * filename
   *
   * the full name of the file, including the extension (and dot)
   */
  filename: string;
}

/**<!-- DOCS: ### -->
 * removeTrailSlash
 *
 * - `PathTools.removeTrailSlash`
 *
 * Remove trailing slash from path (if one exists)
 *
 * ```typescript
 * '/path/to/file/' -> '/path/to/file'
 * ```
 */
export const removeTrailSlash = (path: string) => path.replace(/\/$/, '');

/**<!-- DOCS: ### -->
 * trailSlash
 *
 * - `PathTools.trailSlash`
 *
 * Ensures there's a trailing slash on path
 *
 * ```typescript
 * '/path/to/file' -> '/path/to/file/'
 * ```
 */
export const trailSlash = (path: string) => removeTrailSlash(path) + '/';

/**<!-- DOCS: ### -->
 * removeDoubleSlashes
 *
 * - `PathTools.removeDoubleSlashes`
 *
 * Removes double slashes from path (an bug with Unix paths)
 *
 * ```typescript
 * '/path/to//file' -> '/path/to/file'
 * ```
 */
export const removeDoubleSlashes = (path: string) => path.replace(/\/\//g, '/');
