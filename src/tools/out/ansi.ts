import { safe } from 'swiss-ak';

// ANSI

//<!-- DOCS: 240 -->
/**<!-- DOCS: out.ansi ###! -->
 * ansi
 *
 * - `ansi`
 * - `out.ansi`
 *
 * ANSI escape codes for terminal manipulation
 */
export const ansi: AnsiEscapeCodes = {
  /**<!-- DOCS-ALIAS: out.ansi.cursor -->*/
  cursor: {
    /**<!-- DOCS-ALIAS: out.ansi.cursor.to -->*/
    to: (x: number = 0, y: number = 0): string => {
      const args = {
        x: safe.num(x, true, 0),
        y: safe.num(y, true, 0)
      };
      if (args.y === 0) return `\x1B[${args.x + 1}G`;
      return `\x1B[${args.y + 1};${args.x + 1}H`;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.move -->*/
    move: (x: number = 0, y: number = 0): string => {
      const args = {
        x: safe.num(x, true, undefined, undefined, 0),
        y: safe.num(y, true, undefined, undefined, 0)
      };
      let result = '';

      result += ansi.cursor.right(args.x);
      result += ansi.cursor.down(args.y);

      // if (args.x < 0) result += ansi.cursor.left(-args.x);
      // if (args.x > 0) result += ansi.cursor.right(args.x);
      // if (args.y < 0) result += ansi.cursor.up(-args.y);
      // if (args.y > 0) result += ansi.cursor.down(args.y);
      return result;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.up -->*/
    up: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.cursor.down(-args.count);
      return `\x1B[${args.count}A`;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.down -->*/
    down: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.cursor.up(-args.count);
      return `\x1B[${args.count}B`;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.left -->*/
    left: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.cursor.right(-args.count);
      return `\x1B[${args.count}D`;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.right -->*/
    right: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.cursor.left(-args.count);
      return `\x1B[${args.count}C`;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.nextLine -->*/
    nextLine: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.cursor.prevLine(-args.count);
      return `\x1B[E`.repeat(args.count);
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.prevLine -->*/
    prevLine: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.cursor.nextLine(-args.count);
      return `\x1B[F`.repeat(args.count);
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.lineStart -->*/
    lineStart: `\x1B[G`,

    /**<!-- DOCS-ALIAS: out.ansi.cursor.setShow -->*/
    setShow: (isShow: boolean): string => {
      const args = {
        isShow: safe.bool(isShow, true)
      };
      return args.isShow ? ansi.cursor.show : ansi.cursor.hide;
    },

    /**<!-- DOCS-ALIAS: out.ansi.cursor.show -->*/
    show: `\x1B[?25h`,

    /**<!-- DOCS-ALIAS: out.ansi.cursor.hide -->*/
    hide: `\x1B[?25l`,

    /**<!-- DOCS-ALIAS: out.ansi.cursor.save -->*/
    save: `\x1B7`,

    /**<!-- DOCS-ALIAS: out.ansi.cursor.restore -->*/
    restore: `\x1B8`
  },

  /**<!-- DOCS-ALIAS: out.ansi.scroll -->*/
  scroll: {
    /**<!-- DOCS-ALIAS: out.ansi.scroll.up -->*/
    up: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.scroll.down(-args.count);
      return `\x1B[S`.repeat(args.count);
    },

    /**<!-- DOCS-ALIAS: out.ansi.scroll.down -->*/
    down: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.scroll.up(-args.count);
      return `\x1B[T`.repeat(args.count);
    }
  },

  /**<!-- DOCS-ALIAS: out.ansi.erase -->*/
  erase: {
    /**<!-- DOCS-ALIAS: out.ansi.erase.screen -->*/
    screen: `\x1B[2J`,

    /**<!-- DOCS-ALIAS: out.ansi.erase.up -->*/
    up: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.erase.down(-args.count);
      return `\x1B[1J`.repeat(args.count);
    },

    /**<!-- DOCS-ALIAS: out.ansi.erase.down -->*/
    down: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true)
      };
      if (args.count === 0) return '';
      if (args.count < 0) return ansi.erase.up(-args.count);
      return `\x1B[J`.repeat(args.count);
    },

    /**<!-- DOCS-ALIAS: out.ansi.erase.line -->*/
    line: `\x1B[2K`,

    /**<!-- DOCS-ALIAS: out.ansi.erase.lineEnd -->*/
    lineEnd: `\x1B[K`,

    /**<!-- DOCS-ALIAS: out.ansi.erase.lineStart -->*/
    lineStart: `\x1B[1K`,

    /**<!-- DOCS-ALIAS: out.ansi.erase.lines -->*/
    lines: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true, 0)
      };
      let result = ansi.erase.line;
      for (let i = 0; i < args.count; i++) {
        result += ansi.cursor.up() + ansi.erase.line;
      }
      if (args.count) result += ansi.cursor.lineStart;
      return result;
    },

    /**<!-- DOCS-ALIAS: out.ansi.erase.reserve -->*/
    reserve: (count: number = 1): string => {
      const args = {
        count: safe.num(count, true, 0)
      };
      return '\n'.repeat(Math.max(0, args.count - 1)) + ansi.erase.lines(args.count - 1);
    }
  },

  /**<!-- DOCS-ALIAS: out.ansi.clear -->*/
  clear: `\x1Bc`,

  /**<!-- DOCS-ALIAS: out.ansi.beep -->*/
  beep: '\u0007',

  /**<!-- DOCS-ALIAS: out.ansi.null -->*/
  null: '\x1B[0;3p'
};

export interface AnsiEscapeCodes {
  /**<!-- DOCS: out.ansi.cursor #### -->
   * cursor
   *
   * ANSI escape codes for controlling the cursor in the terminal
   */
  cursor: {
    /**<!-- DOCS: out.ansi.cursor.to ##### -->
     * to
     *
     * - `ansi.cursor.to`
     * - `out.ansi.cursor.to`
     *
     * Move the cursor to a specific position
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.to(5, 10)); // moves the cursor
     * ```
     *
     * @param {number} [x=0] - The x position to move the cursor to
     * @param {number} [y=0] - The y position to move the cursor to
     * @returns {string} - ANSI escape codes
     */
    to: (x?: number, y?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.move ##### -->
     * move
     *
     * - `ansi.cursor.move`
     * - `out.ansi.cursor.move`
     *
     * Move the cursor a specific amount of spaces
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.move(5, 10)); // moves the cursor down 5 lines and right 10 spaces
     * process.stdout.write(ansi.cursor.move(-5, -10)); // moves the cursor up 5 lines and left 10 spaces
     * ```
     *
     * @param {number} [x=0] - How many spaces to move the cursor horizontally (negative values move left)
     * @param {number} [y=0] - How many spaces to move the cursor vertically (negative values move up)
     * @returns {string} - ANSI escape codes
     */
    move: (x?: number, y?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.up ##### -->
     * up
     *
     * - `ansi.cursor.up`
     * - `out.ansi.cursor.up`
     *
     * Move the cursor up a specific amount of spaces
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.up(5)); // moves the cursor up 5 lines
     * process.stdout.write(ansi.cursor.up(-5)); // moves the cursor down 5 lines
     * ```
     *
     * @param {number} [count=1] - How many spaces to move the cursor up
     * @returns {string} - ANSI escape codes
     */
    up: (count?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.down ##### -->
     * down
     *
     * - `ansi.cursor.down`
     * - `out.ansi.cursor.down`
     *
     * Move the cursor down a specific amount of spaces
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.down(5)); // moves the cursor down 5 lines
     * process.stdout.write(ansi.cursor.down(-5)); // moves the cursor up 5 lines
     * ```
     *
     * @param {number} [count=1] - How many spaces to move the cursor down
     * @returns {string} - ANSI escape codes
     */
    down: (count?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.left ##### -->
     * left
     *
     * - `ansi.cursor.left`
     * - `out.ansi.cursor.left`
     *
     * Move the cursor left (backward) a specific amount of spaces
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.left(5)); // moves the cursor left 5 spaces
     * process.stdout.write(ansi.cursor.left(-5)); // moves the cursor right 5 spaces
     * ```
     *
     * @param {number} [count=1] - How many spaces to move the cursor left
     * @returns {string} - ANSI escape codes
     */
    left: (count?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.right ##### -->
     * right
     *
     * - `ansi.cursor.right`
     * - `out.ansi.cursor.right`
     *
     * Move the cursor right (forward) a specific amount of spaces
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.right(5)); // moves the cursor right 5 spaces
     * process.stdout.write(ansi.cursor.right(-5)); // moves the cursor left 5 spaces
     * ```
     *
     * @param {number} [count=1] - How many spaces to move the cursor right
     * @returns {string} - ANSI escape codes
     */
    right: (count?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.nextLine ##### -->
     * nextLine
     *
     * - `ansi.cursor.nextLine`
     * - `out.ansi.cursor.nextLine`
     *
     * Move the cursor to the beginning of the next line
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.nextLine()); // moves the cursor to the beginning of the next line
     * process.stdout.write(ansi.cursor.nextLine(5)); // moves the cursor down 5 lines and to the beginning of the next line
     * ```
     *
     * @param {number} [count=1] - How many lines to move the cursor down
     * @returns {string} - ANSI escape codes
     */
    nextLine: (count?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.prevLine ##### -->
     * prevLine
     *
     * - `ansi.cursor.prevLine`
     * - `out.ansi.cursor.prevLine`
     *
     * Move the cursor to the beginning of the previous line
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.prevLine()); // moves the cursor to the beginning of the previous line
     * process.stdout.write(ansi.cursor.prevLine(5)); // moves the cursor up 5 lines and to the beginning of the previous line
     * ```
     *
     * @param {number} [count=1] - How many lines to move the cursor up
     * @returns {string} - ANSI escape codes
     */
    prevLine: (count?: number) => string;

    /**<!-- DOCS: out.ansi.cursor.lineStart ##### -->
     * lineStart
     *
     * - `ansi.cursor.lineStart`
     * - `out.ansi.cursor.lineStart`
     *
     * ANSI escape code to move the cursor to the beginning of the current line
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.lineStart); // moves the cursor to the beginning of the current line
     * ```
     *
     * @type {string}
     */
    lineStart: string;

    /**<!-- DOCS: out.ansi.cursor.setShow ##### -->
     * setShow
     *
     * - `ansi.cursor.setShow`
     * - `out.ansi.cursor.setShow`
     *
     * Set whether or not the cursor is shown
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.setShow(true)); // shows the cursor
     * process.stdout.write(ansi.cursor.setShow(false)); // hides the cursor
     * ```
     *
     * @param {boolean} isShow - Whether or not the cursor should be shown
     * @returns {string} - ANSI escape code
     */
    setShow: (isShow: boolean) => string;

    /**<!-- DOCS: out.ansi.cursor.show ##### -->
     * show
     *
     * - `ansi.cursor.show`
     * - `out.ansi.cursor.show`
     *
     * ANSI escape code to show the cursor
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.show); // shows the cursor
     * ```
     *
     * @type {string}
     */
    show: string;

    /**<!-- DOCS: out.ansi.cursor.hide ##### -->
     * hide
     *
     * - `ansi.cursor.hide`
     * - `out.ansi.cursor.hide`
     *
     * ANSI escape code to hide the cursor
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.hide); // hides the cursor
     * ```
     *
     * @type {string}
     */
    hide: string;

    /**<!-- DOCS: out.ansi.cursor.save ##### -->
     * save
     *
     * - `ansi.cursor.save`
     * - `out.ansi.cursor.save`
     *
     * ANSI escape code to save the current cursor position (can be restored with `cursor.restore`)
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.save); // saves the current cursor position
     * // ...
     * process.stdout.write(ansi.cursor.restore); // restores the saved cursor position
     * ```
     *
     * @type {string}
     */
    save: string;

    /**<!-- DOCS: out.ansi.cursor.restore ##### -->
     * restore
     *
     * - `ansi.cursor.restore`
     * - `out.ansi.cursor.restore`
     *
     * ANSI escape code to restore a previously saved cursor position (saved with `cursor.save`)
     *
     * ```typescript
     * process.stdout.write(ansi.cursor.save); // saves the current cursor position
     * // ...
     * process.stdout.write(ansi.cursor.restore); // restores the saved cursor position
     * ```
     *
     * @type {string}
     */
    restore: string;
  };

  /**<!-- DOCS: out.ansi.scroll #### -->
   * scroll
   *
   * ANSI escape codes for scrolling the terminal
   */
  scroll: {
    /**<!-- DOCS: out.ansi.scroll.up ##### -->
     * up
     *
     * - `ansi.scroll.up`
     * - `out.ansi.scroll.up`
     *
     * Scroll the terminal up a specific amount
     *
     * ```typescript
     * process.stdout.write(ansi.scroll.up(5)); // scrolls the terminal up 5 lines
     * process.stdout.write(ansi.scroll.up(-5)); // scrolls the terminal down 5 lines
     * ```
     *
     * @param {number} [count=1] - How much to scroll the terminal up by
     * @returns {string} - ANSI escape codes
     */
    up: (count?: number) => string;

    /**<!-- DOCS: out.ansi.scroll.down ##### -->
     * down
     *
     * - `ansi.scroll.down`
     * - `out.ansi.scroll.down`
     *
     * Scroll the terminal down a specific amount
     *
     * ```typescript
     * process.stdout.write(ansi.scroll.down(5)); // scrolls the terminal down 5 lines
     * process.stdout.write(ansi.scroll.down(-5)); // scrolls the terminal up 5 lines
     * ```
     *
     * @param {number} [count=1] - How much to scroll the terminal down by
     * @returns {string} - ANSI escape codes
     */
    down: (count?: number) => string;
  };

  /**<!-- DOCS: out.ansi.erase #### -->
   * erase
   *
   * ANSI escape codes for erasing parts of the terminal
   */
  erase: {
    /**<!-- DOCS: out.ansi.erase.screen ##### -->
     * screen
     *
     * - `ansi.erase.screen`
     * - `out.ansi.erase.screen`
     *
     * ANSI escape code to erase the entire terminal screen
     *
     * ```typescript
     * process.stdout.write(ansi.erase.screen); // erases the entire terminal screen
     * ```
     *
     * @type {string}
     */
    screen: string;

    /**<!-- DOCS: out.ansi.erase.up ##### -->
     * up
     *
     * - `ansi.erase.up`
     * - `out.ansi.erase.up`
     *
     * Erase the terminal above the cursor
     *
     * ```typescript
     * process.stdout.write(ansi.erase.up(5)); // erases the terminal above the cursor by 5 lines
     * process.stdout.write(ansi.erase.up(-5)); // erases the terminal below the cursor by 5 lines
     * ```
     *
     * @param {number} [count=1] - How many lines to erase
     * @returns {string} - ANSI escape codes
     */
    up: (count?: number) => string;

    /**<!-- DOCS: out.ansi.erase.down ##### -->
     * down
     *
     * - `ansi.erase.down`
     * - `out.ansi.erase.down`
     *
     * Erase the terminal below the cursor
     *
     * ```typescript
     * process.stdout.write(ansi.erase.down(5)); // erases the terminal below the cursor by 5 lines
     * process.stdout.write(ansi.erase.down(-5)); // erases the terminal above the cursor by 5 lines
     * ```
     *
     * @param {number} [count=1] - How many lines to erase
     * @returns {string} - ANSI escape codes
     */
    down: (count?: number) => string;

    /**<!-- DOCS: out.ansi.erase.line ##### -->
     * line
     *
     * - `ansi.erase.line`
     * - `out.ansi.erase.line`
     *
     * ANSI escape code to erase the current line
     *
     * ```typescript
     * process.stdout.write(ansi.erase.line); // erases the current line
     * ```
     *
     * @type {string}
     */
    line: string;

    /**<!-- DOCS: out.ansi.erase.lineEnd ##### -->
     * lineEnd
     *
     * - `ansi.erase.lineEnd`
     * - `out.ansi.erase.lineEnd`
     *
     * ANSI escape code to erase the current line from the cursor to the end
     *
     * ```typescript
     * process.stdout.write(ansi.erase.lineEnd); // erases the current line from the cursor to the end
     * ```
     *
     * @type {string}
     */
    lineEnd: string;

    /**<!-- DOCS: out.ansi.erase.lineStart ##### -->
     * lineStart
     *
     * - `ansi.erase.lineStart`
     * - `out.ansi.erase.lineStart`
     *
     * ANSI escape code to erase the current line from the cursor to the start
     *
     * ```typescript
     * process.stdout.write(ansi.erase.lineStart); // erases the current line from the cursor to the start
     * ```
     *
     * @type {string}
     */
    lineStart: string;

    /**<!-- DOCS: out.ansi.erase.lines ##### -->
     * lines
     *
     * - `ansi.erase.lines`
     * - `out.ansi.erase.lines`
     *
     * Erase a specific number of lines upwards from the cursor
     *
     * ```typescript
     * process.stdout.write(ansi.erase.lines(5)); // erases 5 lines upwards from the cursor
     * ```
     *
     * @param {number} [count=1] - How many lines to erase
     * @returns {string} - ANSI escape codes
     */
    lines: (count?: number) => string;

    /**<!-- DOCS: out.ansi.erase.reserve ##### -->
     * reserve
     *
     * - `ansi.erase.reserve`
     * - `out.ansi.erase.reserve`
     *
     * Make sure the next couple of lines are blank and on the screen
     *
     * > __Note:__ Erases the current line and returns to it afterwards
     *
     * ```typescript
     * process.stdout.write(ansi.erase.reserve(5)); // makes sure the next 5 lines are blank and on the screen
     * ```
     *
     * @param {number} [count=1] - How many lines to reserve
     * @returns {string} - ANSI escape codes
     */
    reserve: (count?: number) => string;
  };

  /**<!-- DOCS: out.ansi.clear #### -->
   * clear
   *
   * - `ansi.clear`
   * - `out.ansi.clear`
   *
   * ANSI escape code to clear the terminal screen
   *
   * ```typescript
   * process.stdout.write(ansi.clear); // clears the terminal screen
   * ```
   *
   * @type {string}
   */
  clear: string;

  /**<!-- DOCS: out.ansi.beep #### -->
   * beep
   *
   * - `ansi.beep`
   * - `out.ansi.beep`
   *
   * ANSI escape code to make the terminal beep
   *
   * ```typescript
   * process.stdout.write(ansi.beep); // makes the terminal beep
   * ```
   *
   * @type {string}
   */
  beep: string;

  /**<!-- DOCS: out.ansi.null #### -->
   * null
   *
   * - `ansi.null`
   * - `out.ansi.null`
   *
   * ANSI escape code for the NULL character. Can be used as a hidden marker.
   *
   * ```typescript
   * process.stdout.write(ansi.null); // writes the NULL character
   * ```
   *
   * @type {string}
   */
  null: string;
}
