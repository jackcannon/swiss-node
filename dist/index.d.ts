import { Partial as Partial$1, OfType, RemapOf, second, progressBar } from 'swiss-ak';

interface AnsiEscapeCodes {
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
         * @param {number} [x=0] The x position to move the cursor to
         * @param {number} [y=0] The y position to move the cursor to
         * @returns {string} ANSI escape codes
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
         * @param {number} [x=0] How many spaces to move the cursor horizontally (negative values move left)
         * @param {number} [y=0] How many spaces to move the cursor vertically (negative values move up)
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many spaces to move the cursor up
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many spaces to move the cursor down
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many spaces to move the cursor left
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many spaces to move the cursor right
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many lines to move the cursor down
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many lines to move the cursor up
         * @returns {string} ANSI escape codes
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
         * @param {boolean} isShow Whether or not the cursor should be shown
         * @returns {string} ANSI escape code
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
         * @param {number} [count=1] How much to scroll the terminal up by
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How much to scroll the terminal down by
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many lines to erase
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many lines to erase
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many lines to erase
         * @returns {string} ANSI escape codes
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
         * @param {number} [count=1] How many lines to reserve
         * @returns {string} ANSI escape codes
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

interface CharLookup<T> {
    hTop: T;
    hNor: T;
    hSep: T;
    hBot: T;
    mSep: T;
    bTop: T;
    bNor: T;
    bSep: T;
    bBot: T;
}

/**<!-- DOCS: colr ##! -->
 * colr
 *
 * - `colr`
 *
 * Tool for creating coloured/styled strings
 *
 * Chain/combine different combinations of colours and styles to get the appearance you want.
 *
 * | Name      | Type       | Modifier |                    | Description                                  |
 * |-----------|------------|----------|--------------------|----------------------------------------------|
 * | `light`   | Text       | Light    | `colr.light()`   | Use light text colours (on by default)       |
 * | `dark`    | Text       | Dark     | `colr.dark()`    | Use dark text colours                        |
 * | `lightBg` | Background | Light    | `colr.lightBg()` | Use light background colours (on by default) |
 * | `darkBg`  | Background | Dark     | `colr.darkBg()`  | Use dark background colours                  |

 * | Name             | Affects    | Colour     | Type                    | Recommended                | Alt                     |
 * |------------------|------------|------------|-------------------------|----------------------------|-------------------------|
 * | `red`            | Text       | 🟥 Red     | __Base__&nbsp;_(Light)_ | `colr.red()`               |                         |
 * | `darkRed`        | Text       | 🟥 Red     | Dark                    | `colr.dark.red()`          | `colr.darkRed()`        |
 * | `lightRed`       | Text       | 🟥 Red     | Light                   | `colr.light.red()`         | `colr.lightRed()`       |
 * | `green`          | Text       | 🟩 Green   | __Base__&nbsp;_(Light)_ | `colr.green()`             |                         |
 * | `darkGreen`      | Text       | 🟩 Green   | Dark                    | `colr.dark.green()`        | `colr.darkGreen()`      |
 * | `lightGreen`     | Text       | 🟩 Green   | Light                   | `colr.light.green()`       | `colr.lightGreen()`     |
 * | `yellow`         | Text       | 🟨 Yellow  | __Base__&nbsp;_(Light)_ | `colr.yellow()`            |                         |
 * | `darkYellow`     | Text       | 🟨 Yellow  | Dark                    | `colr.dark.yellow()`       | `colr.darkYellow()`     |
 * | `lightYellow`    | Text       | 🟨 Yellow  | Light                   | `colr.light.yellow()`      | `colr.lightYellow()`    |
 * | `blue`           | Text       | 🟦 Blue    | __Base__&nbsp;_(Light)_ | `colr.blue()`              |                         |
 * | `darkBlue`       | Text       | 🟦 Blue    | Dark                    | `colr.dark.blue()`         | `colr.darkBlue()`       |
 * | `lightBlue`      | Text       | 🟦 Blue    | Light                   | `colr.light.blue()`        | `colr.lightBlue()`      |
 * | `magenta`        | Text       | 🟪 Magenta | __Base__&nbsp;_(Light)_ | `colr.magenta()`           |                         |
 * | `darkMagenta`    | Text       | 🟪 Magenta | Dark                    | `colr.dark.magenta()`      | `colr.darkMagenta()`    |
 * | `lightMagenta`   | Text       | 🟪 Magenta | Light                   | `colr.light.magenta()`     | `colr.lightMagenta()`   |
 * | `cyan`           | Text       | 💠 Cyan    | __Base__&nbsp;_(Light)_ | `colr.cyan()`              |                         |
 * | `darkCyan`       | Text       | 💠 Cyan    | Dark                    | `colr.dark.cyan()`         | `colr.darkCyan()`       |
 * | `lightCyan`      | Text       | 💠 Cyan    | Light                   | `colr.light.cyan()`        | `colr.lightCyan()`      |
 * | `white`          | Text       | ⬜ White   | __Base__&nbsp;_(Light)_ | `colr.white()`             |                         |
 * | `darkWhite`      | Text       | ⬜ White   | Dark                    | `colr.dark.white()`        | `colr.darkWhite()`      |
 * | `lightWhite`     | Text       | ⬜ White   | Light                   | `colr.light.white()`       | `colr.lightWhite()`     |
 * | `redBg`          | Background | 🟥 Red     | __Base__&nbsp;_(Light)_ | `colr.redBg()`             |                         |
 * | `darkRedBg`      | Background | 🟥 Red     | Dark                    | `colr.darkBg.redBg()`      | `colr.darkRedBg()`      |
 * | `lightRedBg`     | Background | 🟥 Red     | Light                   | `colr.lightBg.redBg()`     | `colr.lightRedBg()`     |
 * | `greenBg`        | Background | 🟩 Green   | __Base__&nbsp;_(Light)_ | `colr.greenBg()`           |                         |
 * | `darkGreenBg`    | Background | 🟩 Green   | Dark                    | `colr.darkBg.greenBg()`    | `colr.darkGreenBg()`    |
 * | `lightGreenBg`   | Background | 🟩 Green   | Light                   | `colr.lightBg.greenBg()`   | `colr.lightGreenBg()`   |
 * | `yellowBg`       | Background | 🟨 Yellow  | __Base__&nbsp;_(Light)_ | `colr.yellowBg()`          |                         |
 * | `darkYellowBg`   | Background | 🟨 Yellow  | Dark                    | `colr.darkBg.yellowBg()`   | `colr.darkYellowBg()`   |
 * | `lightYellowBg`  | Background | 🟨 Yellow  | Light                   | `colr.lightBg.yellowBg()`  | `colr.lightYellowBg()`  |
 * | `blueBg`         | Background | 🟦 Blue    | __Base__&nbsp;_(Light)_ | `colr.blueBg()`            |                         |
 * | `darkBlueBg`     | Background | 🟦 Blue    | Dark                    | `colr.darkBg.blueBg()`     | `colr.darkBlueBg()`     |
 * | `lightBlueBg`    | Background | 🟦 Blue    | Light                   | `colr.lightBg.blueBg()`    | `colr.lightBlueBg()`    |
 * | `magentaBg`      | Background | 🟪 Magenta | __Base__&nbsp;_(Light)_ | `colr.magentaBg()`         |                         |
 * | `darkMagentaBg`  | Background | 🟪 Magenta | Dark                    | `colr.darkBg.magentaBg()`  | `colr.darkMagentaBg()`  |
 * | `lightMagentaBg` | Background | 🟪 Magenta | Light                   | `colr.lightBg.magentaBg()` | `colr.lightMagentaBg()` |
 * | `cyanBg`         | Background | 💠 Cyan    | __Base__&nbsp;_(Light)_ | `colr.cyanBg()`            |                         |
 * | `darkCyanBg`     | Background | 💠 Cyan    | Dark                    | `colr.darkBg.cyanBg()`     | `colr.darkCyanBg()`     |
 * | `lightCyanBg`    | Background | 💠 Cyan    | Light                   | `colr.lightBg.cyanBg()`    | `colr.lightCyanBg()`    |
 * | `whiteBg`        | Background | ⬜ White   | __Base__&nbsp;_(Light)_ | `colr.whiteBg()`           |                         |
 * | `darkWhiteBg`    | Background | ⬜ White   | Dark                    | `colr.darkBg.whiteBg()`    | `colr.darkWhiteBg()`    |
 * | `lightWhiteBg`   | Background | ⬜ White   | Light                   | `colr.lightBg.whiteBg()`   | `colr.lightWhiteBg()`   |
 * | `black`          | Text       | ⬛ Black   | __Always Dark__         | `colr.black()`             |                         |
 * | `darkBlack`      | Text       | ⬛ Black   | Dark                    | `colr.black()`             | `colr.darkBlack()`      |
 * | `lightBlack`     | Text       | ⬛ Black   | Light                   | `colr.light.black()`       | `colr.lightBlack()`     |
 * | `blackBg`        | Background | ⬛ Black   | __Always Dark__         | `colr.blackBg()`           |                         |
 * | `darkBlackBg`    | Background | ⬛ Black   | Dark                    | `colr.blackBg()`           | `colr.darkBlackBg()`    |
 * | `lightBlackBg`   | Background | ⬛ Black   | Light                   | `colr.lightBg.blackBg()`   | `colr.lightBlackBg()`   |
 * | `grey`           | Text       | 🩶 Grey    | Greys                   | `colr.grey()`              |                         |
 * | `greyBg`         | Background | 🩶 Grey    | Greys                   | `colr.greyBg()`            |                         |
 * | `grey0`          | Text       | ⬛ Black   | Greys                   | `colr.grey0()`             |                         |
 * | `grey1`          | Text       | 🩶 Grey    | Greys                   | `colr.grey1()`             |                         |
 * | `grey2`          | Text       | 🩶 Grey    | Greys                   | `colr.grey2()`             |                         |
 * | `grey3`          | Text       | 🩶 Grey    | Greys                   | `colr.grey3()`             |                         |
 * | `grey4`          | Text       | 🩶 Grey    | Greys                   | `colr.grey4()`             |                         |
 * | `grey5`          | Text       | ⬜ White   | Greys                   | `colr.grey5()`             |
 * | `primary`        | Text       | 🟨 Yellow  | Theme                   | `colr.primary()`           |                         |
 * | `secondary`      | Text       | 🟪 Magenta | Theme                   | `colr.secondary()`         |                         |
 * | `success`        | Text       | 🟩 Green   | Theme                   | `colr.success()`           |                         |
 * | `danger`         | Text       | 🟥 Red     | Theme                   | `colr.danger()`            |                         |
 * | `warning`        | Text       | 🟨 Yellow  | Theme                   | `colr.warning()`           |                         |
 * | `info`           | Text       | 🟦 Blue    | Theme                   | `colr.info()`              |                         |
 * | `primaryBg`      | Background | 🟨 Yellow  | Theme                   | `colr.primaryBg()`         |                         |
 * | `secondaryBg`    | Background | 🟪 Magenta | Theme                   | `colr.secondaryBg()`       |                         |
 * | `successBg`      | Background | 🟩 Green   | Theme                   | `colr.successBg()`         |                         |
 * | `dangerBg`       | Background | 🟥 Red     | Theme                   | `colr.dangerBg()`          |                         |
 * | `warningBg`      | Background | 🟨 Yellow  | Theme                   | `colr.warningBg()`         |                         |
 * | `infoBg`         | Background | 🟦 Blue    | Theme                   | `colr.infoBg()`            |                         |
 *
 * | Name            |                          | Description                                                      |
 * |-----------------|--------------------------|------------------------------------------------------------------|
 * | `reset`         | `colr.reset('')`         | This returns the text back to normal colours/styles              |
 * | `bold`          | `colr.bold('')`          | This makes the text __bold__                                     |
 * | `dim`           | `colr.dim('')`           | This dims the brightness of the text colour                      |
 * | `italic`        | `colr.italic('')`        | This makes the text _italic_                                     |
 * | `overline`      | `colr.overline('')`      | This adds a horizontal line above the text                       |
 * | `underline`     | `colr.underline('')`     | This adds a horizontal line below the text                       |
 * | `strikethrough` | `colr.strikethrough('')` | This add a horizontal line through the middle of the given text  |
 * | `inverse`       | `colr.inverse('')`       | This inverses the text and background colours for the given text |
 * | `hidden`        | `colr.hidden('')`        | This makes the text invisible.                                   |
 *
 * ```typescript
 * colr.yellow('Hello World!'); // 'Hello World!' with yellow text
 * colr.dark.yellow('Hello World!'); // 'Hello World!' with dark yellow text
 * colr.yellow.dim('Hello World!'); // 'Hello World!' with dimmed yellow text
 * colr.dark.yellow.dim('Hello World!'); // 'Hello World!' with dimmed dark yellow text
 *
 * colr.yellow.blueBg('Hello World!'); // 'Hello World!' with yellow text and blue background
 * colr.yellow.darkBg.blueBg('Hello World!'); // 'Hello World!' with yellow text and dark blue background
 *
 * // pass in multiple arguments to get them all coloured/styled
 * colr.red('Hello', 'World!'); // 'Hello World!' with red text
 *
 * // nested styles
 * colr.red(`A ${colr.blue('blue')} world`); // 'A blue world' with with red text, except 'blue' which is blue
 *
 * // template literals
 * colr.red.$`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
 *
 * // Debugging
 * colr.debug(colr.yellow.blueBg(`A ${colr.red('red')} world`)); // '(YLW>){blu>}A (RED>)red(<)(YLW>) world{<}(<)'
 * ```
 */
declare const colr: ColrFn;
/**<!-- DOCS: colr.WrapFn ### 302 -->
 * WrapFn
 *
 * Type for a function that manipulates a string
 *
 * Can by a colr `ColrFn`, a `chalk` function, or something else
 */
declare type WrapFn = (...text: string[]) => string;
/**<!-- DOCS: colr.ColrFn ### 303 -->
 * ColrFn
 *
 * Type for a function that manipulates a string, but also has properties for chaining more colours/styles
 *
 * See `colr`
 */
interface ColrFn extends WrapFn {
    /**<!-- DOCS: colr.optionHeader ### -->
     * Option Modifiers
     */
    /**<!-- DOCS: colr.light #### -->
     * light
     *
     * - `colr.light`
     *
     * Modifies base (`red`, `blue`, `green`, etc) text colours to use the __light__ version of the colour.
     *
     * `light` is __on__ by default.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.light.red('Hello World!'); // 'Hello World!' with light red text
     * colr.red.light('Hello World!'); // 'Hello World!' with light red text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly light: ColrFn;
    /**<!-- DOCS: colr.dark #### -->
     * dark
     *
     * - `colr.dark`
     *
     * Modifies base (`red`, `blue`, `green`, etc) text colours to use the __dark__ version of the colour.
     *
     * `dark` is __off__ by default (defaults to `light`).
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.dark.red('Hello World!'); // 'Hello World!' with dark red text
     * colr.red.dark('Hello World!'); // 'Hello World!' with dark red text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly dark: ColrFn;
    /**<!-- DOCS: colr.lightBg #### -->
     * lightBg
     *
     * - `colr.lightBg`
     *
     * Modifies base (`redBg`, `blueBg`, `greenBg`, etc) background colours to use the __light__ version of the colour.
     *
     * `lightBg` is __on__ by default.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.lightBg.redBg('Hello World!'); // 'Hello World!' with a light red background
     * colr.redBg.lightBg('Hello World!'); // 'Hello World!' with a light red background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightBg: ColrFn;
    /**<!-- DOCS: colr.darkBg #### -->
     * darkBg
     *
     * - `colr.darkBg`
     *
     * Modifies base (`redBg`, `blueBg`, `greenBg`, etc) background colours to use the __dark__ version of the colour.
     *
     * `darkBg` is __off__ by default (defaults to `lightBg`).
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.darkBg.redBg('Hello World!'); // 'Hello World!' with a dark red background
     * colr.redBg.darkBg('Hello World!'); // 'Hello World!' with a dark red background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkBg: ColrFn;
    /**<!-- DOCS: colr.textColourHeader ### -->
     * Text Colours
     */
    /**<!-- DOCS: colr.red #### -->
     * red
     *
     * - `colr.red`
     *
     * Makes the given text __red__.
     *
     * Uses `lightRed` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkRed` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.red('Hello World!'); // 'Hello World!' with __light__ red text
     * colr.light.red('Hello World!'); // 'Hello World!' with __light__ red text
     * colr.dark.red('Hello World!'); // 'Hello World!' with __dark__ red text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly red: ColrFn;
    /**<!-- DOCS: colr.darkRed ##### -->
     * darkRed
     *
     * - `colr.darkRed`
     * - `colr.dark.red`
     *
     * Makes the given text __dark red__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.red`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkRed: ColrFn;
    /**<!-- DOCS: colr.lightRed ##### -->
     * lightRed
     *
     * - `colr.lightRed`
     * - `colr.light.red`
     * - `colr.red`
     *
     * Makes the given text __light red__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.red`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightRed: ColrFn;
    /**<!-- DOCS: colr.green #### -->
     * green
     *
     * - `colr.green`
     *
     * Makes the given text __green__.
     *
     * Uses `lightGreen` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkGreen` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.green('Hello World!'); // 'Hello World!' with __light__ green text
     * colr.light.green('Hello World!'); // 'Hello World!' with __light__ green text
     * colr.dark.green('Hello World!'); // 'Hello World!' with __dark__ green text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly green: ColrFn;
    /**<!-- DOCS: colr.darkGreen ##### -->
     * darkGreen
     *
     * - `colr.darkGreen`
     * - `colr.dark.green`
     *
     * Makes the given text __dark green__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.green`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkGreen: ColrFn;
    /**<!-- DOCS: colr.lightGreen ##### -->
     * lightGreen
     *
     * - `colr.lightGreen`
     * - `colr.light.green`
     * - `colr.green`
     *
     * Makes the given text __light green__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.green`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightGreen: ColrFn;
    /**<!-- DOCS: colr.yellow #### -->
     * yellow
     *
     * - `colr.yellow`
     *
     * Makes the given text __yellow__.
     *
     * Uses `lightYellow` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkYellow` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.yellow('Hello World!'); // 'Hello World!' with __light__ yellow text
     * colr.light.yellow('Hello World!'); // 'Hello World!' with __light__ yellow text
     * colr.dark.yellow('Hello World!'); // 'Hello World!' with __dark__ yellow text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly yellow: ColrFn;
    /**<!-- DOCS: colr.darkYellow ##### -->
     * darkYellow
     *
     * - `colr.darkYellow`
     * - `colr.dark.yellow`
     *
     * Makes the given text __dark yellow__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.yellow`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkYellow: ColrFn;
    /**<!-- DOCS: colr.lightYellow ##### -->
     * lightYellow
     *
     * - `colr.lightYellow`
     * - `colr.light.yellow`
     * - `colr.yellow`
     *
     * Makes the given text __light yellow__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.yellow`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightYellow: ColrFn;
    /**<!-- DOCS: colr.blue #### -->
     * blue
     *
     * - `colr.blue`
     *
     * Makes the given text __blue__.
     *
     * Uses `lightBlue` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkBlue` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.blue('Hello World!'); // 'Hello World!' with __light__ blue text
     * colr.light.blue('Hello World!'); // 'Hello World!' with __light__ blue text
     * colr.dark.blue('Hello World!'); // 'Hello World!' with __dark__ blue text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly blue: ColrFn;
    /**<!-- DOCS: colr.darkBlue ##### -->
     * darkBlue
     *
     * - `colr.darkBlue`
     * - `colr.dark.blue`
     *
     * Makes the given text __dark blue__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.blue`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkBlue: ColrFn;
    /**<!-- DOCS: colr.lightBlue ##### -->
     * lightBlue
     *
     * - `colr.lightBlue`
     * - `colr.light.blue`
     * - `colr.blue`
     *
     * Makes the given text __light blue__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.blue`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightBlue: ColrFn;
    /**<!-- DOCS: colr.magenta #### -->
     * magenta
     *
     * - `colr.magenta`
     *
     * Makes the given text __magenta__.
     *
     * Uses `lightMagenta` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkMagenta` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.magenta('Hello World!'); // 'Hello World!' with __light__ magenta text
     * colr.light.magenta('Hello World!'); // 'Hello World!' with __light__ magenta text
     * colr.dark.magenta('Hello World!'); // 'Hello World!' with __dark__ magenta text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly magenta: ColrFn;
    /**<!-- DOCS: colr.darkMagenta ##### -->
     * darkMagenta
     *
     * - `colr.darkMagenta`
     * - `colr.dark.magenta`
     *
     * Makes the given text __dark magenta__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.magenta`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkMagenta: ColrFn;
    /**<!-- DOCS: colr.lightMagenta ##### -->
     * lightMagenta
     *
     * - `colr.lightMagenta`
     * - `colr.light.magenta`
     * - `colr.magenta`
     *
     * Makes the given text __light magenta__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.magenta`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightMagenta: ColrFn;
    /**<!-- DOCS: colr.cyan #### -->
     * cyan
     *
     * - `colr.cyan`
     *
     * Makes the given text __cyan__.
     *
     * Uses `lightCyan` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkCyan` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.cyan('Hello World!'); // 'Hello World!' with __light__ cyan text
     * colr.light.cyan('Hello World!'); // 'Hello World!' with __light__ cyan text
     * colr.dark.cyan('Hello World!'); // 'Hello World!' with __dark__ cyan text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly cyan: ColrFn;
    /**<!-- DOCS: colr.darkCyan ##### -->
     * darkCyan
     *
     * - `colr.darkCyan`
     * - `colr.dark.cyan`
     *
     * Makes the given text __dark cyan__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.cyan`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkCyan: ColrFn;
    /**<!-- DOCS: colr.lightCyan ##### -->
     * lightCyan
     *
     * - `colr.lightCyan`
     * - `colr.light.cyan`
     * - `colr.cyan`
     *
     * Makes the given text __light cyan__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.cyan`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightCyan: ColrFn;
    /**<!-- DOCS: colr.white #### -->
     * white
     *
     * - `colr.white`
     *
     * Makes the given text __white__.
     *
     * Uses `lightWhite` _by default_, or if `light` modifier is used in the chain.
     * Uses `darkWhite` if `dark` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.white('Hello World!'); // 'Hello World!' with __light__ white text
     * colr.light.white('Hello World!'); // 'Hello World!' with __light__ white text
     * colr.dark.white('Hello World!'); // 'Hello World!' with __dark__ white text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly white: ColrFn;
    /**<!-- DOCS: colr.darkWhite ##### -->
     * darkWhite
     *
     * - `colr.darkWhite`
     * - `colr.dark.white`
     *
     * Makes the given text __dark white__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Prefer `dark.white`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkWhite: ColrFn;
    /**<!-- DOCS: colr.lightWhite ##### -->
     * lightWhite
     *
     * - `colr.lightWhite`
     * - `colr.light.white`
     * - `colr.white`
     *
     * Makes the given text __light white__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * Prefer `light.white`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightWhite: ColrFn;
    /**<!-- DOCS: colr.backgroundColourHeader ### -->
     * Background Colours
     */
    /**<!-- DOCS: colr.redBg #### -->
     * redBg
     *
     * - `colr.redBg`
     *
     * Makes the __background__ of the given text __red__.
     *
     * Uses `lightRedBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkRedBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.redBg('Hello World!'); // 'Hello World!' with a __light__ red background
     * colr.lightBg.redBg('Hello World!'); // 'Hello World!' with a __light__ red background
     * colr.darkBg.redBg('Hello World!'); // 'Hello World!' with a __dark__ red background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly redBg: ColrFn;
    /**<!-- DOCS: colr.darkRedBg ##### -->
     * darkRedBg
     *
     * - `colr.darkRedBg`
     * - `colr.darkBg.redBg`
     * - `colr.redBg`
     *
     * Makes the __background__ of the given text __dark red__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.redBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkRedBg: ColrFn;
    /**<!-- DOCS: colr.lightRedBg ##### -->
     * lightRedBg
     *
     * - `colr.lightBg.redBg`
     * - `colr.lightRedBg`
     *
     * Makes the __background__ of the given text __light red__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.redBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightRedBg: ColrFn;
    /**<!-- DOCS: colr.greenBg #### -->
     * greenBg
     *
     * - `colr.greenBg`
     *
     * Makes the __background__ of the given text __green__.
     *
     * Uses `lightGreenBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkGreenBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.greenBg('Hello World!'); // 'Hello World!' with a __light__ green background
     * colr.lightBg.greenBg('Hello World!'); // 'Hello World!' with a __light__ green background
     * colr.darkBg.greenBg('Hello World!'); // 'Hello World!' with a __dark__ green background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly greenBg: ColrFn;
    /**<!-- DOCS: colr.darkGreenBg ##### -->
     * darkGreenBg
     *
     * - `colr.darkGreenBg`
     * - `colr.darkBg.greenBg`
     * - `colr.greenBg`
     *
     * Makes the __background__ of the given text __dark green__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.greenBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkGreenBg: ColrFn;
    /**<!-- DOCS: colr.lightGreenBg ##### -->
     * lightGreenBg
     *
     * - `colr.lightBg.greenBg`
     * - `colr.lightGreenBg`
     *
     * Makes the __background__ of the given text __light green__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.greenBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightGreenBg: ColrFn;
    /**<!-- DOCS: colr.yellowBg #### -->
     * yellowBg
     *
     * - `colr.yellowBg`
     *
     * Makes the __background__ of the given text __yellow__.
     *
     * Uses `lightYellowBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkYellowBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.yellowBg('Hello World!'); // 'Hello World!' with a __light__ yellow background
     * colr.lightBg.yellowBg('Hello World!'); // 'Hello World!' with a __light__ yellow background
     * colr.darkBg.yellowBg('Hello World!'); // 'Hello World!' with a __dark__ yellow background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly yellowBg: ColrFn;
    /**<!-- DOCS: colr.darkYellowBg ##### -->
     * darkYellowBg
     *
     * - `colr.darkYellowBg`
     * - `colr.darkBg.yellowBg`
     * - `colr.yellowBg`
     *
     * Makes the __background__ of the given text __dark yellow__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.yellowBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkYellowBg: ColrFn;
    /**<!-- DOCS: colr.lightYellowBg ##### -->
     * lightYellowBg
     *
     * - `colr.lightBg.yellowBg`
     * - `colr.lightYellowBg`
     *
     * Makes the __background__ of the given text __light yellow__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.yellowBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightYellowBg: ColrFn;
    /**<!-- DOCS: colr.blueBg #### -->
     * blueBg
     *
     * - `colr.blueBg`
     *
     * Makes the __background__ of the given text __blue__.
     *
     * Uses `lightBlueBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkBlueBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.blueBg('Hello World!'); // 'Hello World!' with a __light__ blue background
     * colr.lightBg.blueBg('Hello World!'); // 'Hello World!' with a __light__ blue background
     * colr.darkBg.blueBg('Hello World!'); // 'Hello World!' with a __dark__ blue background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly blueBg: ColrFn;
    /**<!-- DOCS: colr.darkBlueBg ##### -->
     * darkBlueBg
     *
     * - `colr.darkBlueBg`
     * - `colr.darkBg.blueBg`
     * - `colr.blueBg`
     *
     * Makes the __background__ of the given text __dark blue__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.blueBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkBlueBg: ColrFn;
    /**<!-- DOCS: colr.lightBlueBg ##### -->
     * lightBlueBg
     *
     * - `colr.lightBg.blueBg`
     * - `colr.lightBlueBg`
     *
     * Makes the __background__ of the given text __light blue__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.blueBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightBlueBg: ColrFn;
    /**<!-- DOCS: colr.magentaBg #### -->
     * magentaBg
     *
     * - `colr.magentaBg`
     *
     * Makes the __background__ of the given text __magenta__.
     *
     * Uses `lightMagentaBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkMagentaBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.magentaBg('Hello World!'); // 'Hello World!' with a __light__ magenta background
     * colr.lightBg.magentaBg('Hello World!'); // 'Hello World!' with a __light__ magenta background
     * colr.darkBg.magentaBg('Hello World!'); // 'Hello World!' with a __dark__ magenta background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly magentaBg: ColrFn;
    /**<!-- DOCS: colr.darkMagentaBg ##### -->
     * darkMagentaBg
     *
     * - `colr.darkMagentaBg`
     * - `colr.darkBg.magentaBg`
     * - `colr.magentaBg`
     *
     * Makes the __background__ of the given text __dark magenta__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.magentaBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkMagentaBg: ColrFn;
    /**<!-- DOCS: colr.lightMagentaBg ##### -->
     * lightMagentaBg
     *
     * - `colr.lightBg.magentaBg`
     * - `colr.lightMagentaBg`
     *
     * Makes the __background__ of the given text __light magenta__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.magentaBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightMagentaBg: ColrFn;
    /**<!-- DOCS: colr.cyanBg #### -->
     * cyanBg
     *
     * - `colr.cyanBg`
     *
     * Makes the __background__ of the given text __cyan__.
     *
     * Uses `lightCyanBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkCyanBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.cyanBg('Hello World!'); // 'Hello World!' with a __light__ cyan background
     * colr.lightBg.cyanBg('Hello World!'); // 'Hello World!' with a __light__ cyan background
     * colr.darkBg.cyanBg('Hello World!'); // 'Hello World!' with a __dark__ cyan background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly cyanBg: ColrFn;
    /**<!-- DOCS: colr.darkCyanBg ##### -->
     * darkCyanBg
     *
     * - `colr.darkCyanBg`
     * - `colr.darkBg.cyanBg`
     * - `colr.cyanBg`
     *
     * Makes the __background__ of the given text __dark cyan__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.cyanBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkCyanBg: ColrFn;
    /**<!-- DOCS: colr.lightCyanBg ##### -->
     * lightCyanBg
     *
     * - `colr.lightBg.cyanBg`
     * - `colr.lightCyanBg`
     *
     * Makes the __background__ of the given text __light cyan__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.cyanBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightCyanBg: ColrFn;
    /**<!-- DOCS: colr.whiteBg #### -->
     * whiteBg
     *
     * - `colr.whiteBg`
     *
     * Makes the __background__ of the given text __white__.
     *
     * Uses `lightWhiteBg` _by default_, or if `lightBg` modifier is used in the chain.
     * Uses `darkWhiteBg` if `darkBg` modifier is used in the chain.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.whiteBg('Hello World!'); // 'Hello World!' with a __light__ white background
     * colr.lightBg.whiteBg('Hello World!'); // 'Hello World!' with a __light__ white background
     * colr.darkBg.whiteBg('Hello World!'); // 'Hello World!' with a __dark__ white background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly whiteBg: ColrFn;
    /**<!-- DOCS: colr.darkWhiteBg ##### -->
     * darkWhiteBg
     *
     * - `colr.darkWhiteBg`
     * - `colr.darkBg.whiteBg`
     * - `colr.whiteBg`
     *
     * Makes the __background__ of the given text __dark white__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Prefer `darkBg.whiteBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkWhiteBg: ColrFn;
    /**<!-- DOCS: colr.lightWhiteBg ##### -->
     * lightWhiteBg
     *
     * - `colr.lightBg.whiteBg`
     * - `colr.lightWhiteBg`
     *
     * Makes the __background__ of the given text __light white__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * Prefer `lightBg.whiteBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightWhiteBg: ColrFn;
    /**<!-- DOCS: colr.blacksHeader ### -->
     * Black Colours
     */
    /**<!-- DOCS: colr.black #### -->
     * black
     *
     * - `colr.black`
     * - `colr.darkBlack`
     *
     * > __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.
     *
     * Makes the given text __dark black__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.black('Hello World!'); // 'Hello World!' with __dark__ black text
     * colr.light.black('Hello World!'); // 'Hello World!' with __dark__ black text
     * colr.dark.black('Hello World!'); // 'Hello World!' with __dark__ black text
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly black: ColrFn;
    /**<!-- DOCS: colr.darkBlack ##### -->
     * darkBlack
     *
     * - `colr.black`
     * - `colr.darkBlack`
     *
     * Makes the given text __dark black__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be dark__.
     *
     * Same as `black`.
     *
     * > __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkBlack: ColrFn;
    /**<!-- DOCS: colr.lightBlack ##### -->
     * lightBlack
     *
     * - `colr.lightBlack`
     *
     * Makes the given text __light black__.
     *
     * Unaffected by `light`/`dark` modifiers and __will always be light__.
     *
     * > __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightBlack: ColrFn;
    /**<!-- DOCS: colr.blackBg #### -->
     * blackBg
     *
     * - `colr.blackBg`
     * - `colr.darkBlackBg`
     *
     * > __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.
     *
     * Makes the __background__ of the given text __dark black__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * ```typescript
     * colr.blackBg('Hello World!'); // 'Hello World!' with a __dark__ black background
     * colr.lightBg.blackBg('Hello World!'); // 'Hello World!' with a __dark__ black background
     * colr.darkBg.blackBg('Hello World!'); // 'Hello World!' with a __dark__ black background
     * ```
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly blackBg: ColrFn;
    /**<!-- DOCS: colr.darkBlackBg ##### -->
     * darkBlackBg
     *
     * - `colr.blackBg`
     * - `colr.darkBlackBg`
     *
     * Makes the __background__ of the given text __dark black__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be dark__.
     *
     * Same as `blackBg`.
     *
     * > __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly darkBlackBg: ColrFn;
    /**<!-- DOCS: colr.lightBlackBg ##### -->
     * lightBlackBg
     *
     * - `colr.lightBlackBg`
     *
     * Makes the __background__ of the given text __light black__.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers and __will always be light__.
     *
     * > __Note:__ Black behaves differently to other colours as the 'base' is always dark, regardless of modifiers.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly lightBlackBg: ColrFn;
    /**<!-- DOCS: colr.greysHeader ### -->
     * Grey / Gray Colours
     */
    /**<!-- DOCS: colr.grey #### -->
     * grey / gray
     *
     * - `colr.grey`
     * - `colr.gray`
     *
     * Makes the given text __grey__.
     *
     * Equivalent to `colr.light.black`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey -->
     * grey / gray
     * 
     * - `colr.grey`
     * - `colr.gray`
     * 
     * Makes the given text __grey__.
     * 
     * Equivalent to `colr.light.black`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray: ColrFn;
    /**<!-- DOCS: colr.greyBg #### -->
     * greyBg / grayBg
     *
     * - `colr.greyBg`
     * - `colr.grayBg`
     *
     * Makes the __background__ of the given text __grey__.
     *
     * Equivalent to `colr.lightBg.blackBg`.
     *
     * Unaffected by `lightBg`/`darkBg` modifiers
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly greyBg: ColrFn;
    /**<!-- DOCS-ALIAS: colr.greyBg -->
     * greyBg / grayBg
     * 
     * - `colr.greyBg`
     * - `colr.grayBg`
     * 
     * Makes the __background__ of the given text __grey__.
     * 
     * Equivalent to `colr.lightBg.blackBg`.
     * 
     * Unaffected by `lightBg`/`darkBg` modifiers
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly grayBg: ColrFn;
    /**<!-- DOCS: colr.grey0 #### -->
     * grey0 / gray0
     *
     * - `colr.grey0`
     * - `colr.gray0`
     *
     * Makes the given text __grey__. 0 out of 5 _(where 0 is black and 5 is white)_.
     *
     * Equivalent to `colr.black`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey0.inverse` ≈ `colr.blackBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey0: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey0 -->
     * grey0 / gray0
     * 
     * - `colr.grey0`
     * - `colr.gray0`
     * 
     * Makes the given text __grey__. 0 out of 5 _(where 0 is black and 5 is white)_.
     * 
     * Equivalent to `colr.black`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey0.inverse` ≈ `colr.blackBg`
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray0: ColrFn;
    /**<!-- DOCS: colr.grey1 #### -->
     * grey1 / gray1
     *
     * - `colr.grey1`
     * - `colr.gray1`
     *
     * Makes the given text __grey__. 1 out of 5 _(where 0 is black and 5 is white)_.
     *
     * Equivalent to `colr.light.black.dim`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey1.inverse` ≈ `colr.lightBlackBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey1: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey1 -->
     * grey1 / gray1
     * 
     * - `colr.grey1`
     * - `colr.gray1`
     * 
     * Makes the given text __grey__. 1 out of 5 _(where 0 is black and 5 is white)_.
     * 
     * Equivalent to `colr.light.black.dim`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey1.inverse` ≈ `colr.lightBlackBg`
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray1: ColrFn;
    /**<!-- DOCS: colr.grey2 #### -->
     * grey2 / gray2
     *
     * - `colr.grey2`
     * - `colr.gray2`
     *
     * Makes the given text __grey__. 2 out of 5 _(where 0 is black and 5 is white)_.
     *
     * Equivalent to `colr.dark.white.dim`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey2.inverse` ≈ `colr.darkWhiteBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey2: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey2 -->
     * grey2 / gray2
     * 
     * - `colr.grey2`
     * - `colr.gray2`
     * 
     * Makes the given text __grey__. 2 out of 5 _(where 0 is black and 5 is white)_.
     * 
     * Equivalent to `colr.dark.white.dim`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey2.inverse` ≈ `colr.darkWhiteBg`
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray2: ColrFn;
    /**<!-- DOCS: colr.grey3 #### -->
     * grey3 / gray3
     *
     * - `colr.grey3`
     * - `colr.gray3`
     *
     * Makes the given text __grey__. 3 out of 5 _(where 0 is black and 5 is white)_.
     *
     * Equivalent to `colr.light.white.dim`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey3.inverse` ≈ `colr.whiteBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey3: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey3 -->
     * grey3 / gray3
     * 
     * - `colr.grey3`
     * - `colr.gray3`
     * 
     * Makes the given text __grey__. 3 out of 5 _(where 0 is black and 5 is white)_.
     * 
     * Equivalent to `colr.light.white.dim`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey3.inverse` ≈ `colr.whiteBg`
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray3: ColrFn;
    /**<!-- DOCS: colr.grey4 #### -->
     * grey4 / gray4
     *
     * - `colr.grey4`
     * - `colr.gray4`
     *
     * Makes the given text __grey__. 4 out of 5 _(where 0 is black and 5 is white)_.
     *
     * Equivalent to `colr.dark.white`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey4.inverse` ≈ `colr.darkWhiteBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey4: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey4 -->
     * grey4 / gray4
     * 
     * - `colr.grey4`
     * - `colr.gray4`
     * 
     * Makes the given text __grey__. 4 out of 5 _(where 0 is black and 5 is white)_.
     * 
     * Equivalent to `colr.dark.white`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey4.inverse` ≈ `colr.darkWhiteBg`
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray4: ColrFn;
    /**<!-- DOCS: colr.grey5 #### -->
     * grey5 / gray5
     *
     * - `colr.grey5`
     * - `colr.gray5`
     *
     * Makes the given text __grey__. 5 out of 5 _(where 0 is black and 5 is white)_.
     *
     * Equivalent to `colr.light.white`.
     *
     * Unaffected by `light`/`dark` modifiers
     *
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey5.inverse` ≈ `colr.whiteBg`
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly grey5: ColrFn;
    /**<!-- DOCS-ALIAS: colr.grey5 -->
     * grey5 / gray5
     * 
     * - `colr.grey5`
     * - `colr.gray5`
     * 
     * Makes the given text __grey__. 5 out of 5 _(where 0 is black and 5 is white)_.
     * 
     * Equivalent to `colr.light.white`.
     * 
     * Unaffected by `light`/`dark` modifiers
     * 
     * > __Warning:__ Numbered greys may not inverse as expected. `colr.grey5.inverse` ≈ `colr.whiteBg`
     * 
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     * @param {...string} text
     * @returns {string}
     */
    readonly gray5: ColrFn;
    /**<!-- DOCS: colr.themesHeader ### -->
     * Theme Colours
     */
    /**<!-- DOCS: colr.primary #### -->
     * primary
     *
     * - `colr.primary`
     *
     * Makes the given text __'primary'__ (light yellow) themed.
     *
     * Equivalent to `colr.light.yellow`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly primary: ColrFn;
    /**<!-- DOCS: colr.secondary #### -->
     * secondary
     *
     * - `colr.secondary`
     *
     * Makes the given text __'secondary'__ (magenta) themed.
     *
     * Equivalent to `colr.light.magenta`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly secondary: ColrFn;
    /**<!-- DOCS: colr.success #### -->
     * success
     *
     * - `colr.success`
     *
     * Makes the given text __'success'__ (green) themed.
     *
     * Equivalent to `colr.light.green`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly success: ColrFn;
    /**<!-- DOCS: colr.danger #### -->
     * danger
     *
     * - `colr.danger`
     *
     * Makes the given text __'danger'__ (red) themed.
     *
     * Equivalent to `colr.dark.red`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly danger: ColrFn;
    /**<!-- DOCS: colr.warning #### -->
     * warning
     *
     * - `colr.warning`
     *
     * Makes the given text __'warning'__ (dark yellow) themed.
     *
     * Equivalent to `colr.dark.yellow`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly warning: ColrFn;
    /**<!-- DOCS: colr.info #### -->
     * info
     *
     * - `colr.info`
     *
     * Makes the given text __'info'__ (blue) themed.
     *
     * Equivalent to `colr.light.blue`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly info: ColrFn;
    /**<!-- DOCS: colr.primaryBg #### -->
     * primaryBg
     *
     * - `colr.primaryBg`
     *
     * Makes the __background__ of the given text __'primary'__ (light yellow) themed and makes the text __black__.
     *
     * Equivalent to `colr.lightBg.yellowBg.black`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly primaryBg: ColrFn;
    /**<!-- DOCS: colr.secondaryBg #### -->
     * secondaryBg
     *
     * - `colr.secondaryBg`
     *
     * Makes the __background__ of the given text __'secondary'__ (magenta) themed and makes the text __black__.
     *
     * Equivalent to `colr.lightBg.magentaBg.black`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly secondaryBg: ColrFn;
    /**<!-- DOCS: colr.successBg #### -->
     * successBg
     *
     * - `colr.successBg`
     *
     * Makes the __background__ of the given text __'success'__ (green) themed and makes the text __black__.
     *
     * Equivalent to `colr.lightBg.greenBg.black`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly successBg: ColrFn;
    /**<!-- DOCS: colr.dangerBg #### -->
     * dangerBg
     *
     * - `colr.dangerBg`
     *
     * Makes the __background__ of the given text __'danger'__ (red) themed and makes the text __black__.
     *
     * Equivalent to `colr.darkBg.redBg.black`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly dangerBg: ColrFn;
    /**<!-- DOCS: colr.warningBg #### -->
     * warningBg
     *
     * - `colr.warningBg`
     *
     * Makes the __background__ of the given text __'warning'__ (dark yellow) themed and makes the text __black__.
     *
     * Equivalent to `colr.darkBg.yellowBg.black`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly warningBg: ColrFn;
    /**<!-- DOCS: colr.infoBg #### -->
     * infoBg
     *
     * - `colr.infoBg`
     *
     * Makes the __background__ of the given text __'info'__ (blue) themed and makes the text __black__.
     *
     * Equivalent to `colr.lightBg.blueBg.black`.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly infoBg: ColrFn;
    /**<!-- DOCS: colr.otherStyleHeader ### -->
     * Other Styles
     */
    /**<!-- DOCS: colr.reset #### -->
     * reset
     *
     * - `colr.reset`
     *
     * Applies the __'reset'__ style to the given text.
     *
     * This returns the text back to normal colours/styles.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly reset: ColrFn;
    /**<!-- DOCS: colr.bold #### -->
     * bold
     *
     * - `colr.bold`
     *
     * Applies the __'bold'__ style to the given text.
     *
     * This makes the text __bold__.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly bold: ColrFn;
    /**<!-- DOCS: colr.dim #### -->
     * dim
     *
     * - `colr.dim`
     *
     * Applies the __'dim'__ style to the given text.
     *
     * This dims the brightness of the text colour.
     *
     * > __Note:__ Not the same as `dark` colours.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly dim: ColrFn;
    /**<!-- DOCS: colr.italic #### -->
     * italic
     *
     * - `colr.italic`
     *
     * Applies the __'italic'__ style to the given text.
     *
     * This makes the text _italic_.
     *
     * > __Note:__ Not widely supported
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly italic: ColrFn;
    /**<!-- DOCS: colr.overline #### -->
     * overline
     *
     * - `colr.overline`
     *
     * Applies the __'overline'__ style to the given text.
     *
     * This adds a horizontal line above the text
     *
     * > __Note:__ Not widely supported
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly overline: ColrFn;
    /**<!-- DOCS: colr.underline #### -->
     * underline
     *
     * - `colr.underline`
     *
     * Applies the __'underline'__ style to the given text.
     *
     * This adds a horizontal line below the text
     *
     * > __Note:__ Not widely supported
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly underline: ColrFn;
    /**<!-- DOCS: colr.strikethrough #### -->
     * strikethrough
     *
     * - `colr.strikethrough`
     *
     * Applies the __'strikethrough'__ style to the given text.
     *
     * This add a horizontal line through the middle of the given text.
     *
     * > __Note:__ Not widely supported
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly strikethrough: ColrFn;
    /**<!-- DOCS: colr.inverse #### -->
     * inverse
     *
     * - `colr.inverse`
     *
     * Applies the __'inverse'__ style to the given text.
     *
     * This inverses the text and background colours for the given text.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly inverse: ColrFn;
    /**<!-- DOCS: colr.hidden #### -->
     * hidden
     *
     * - `colr.hidden`
     *
     * Applies the __'hidden'__ style to the given text.
     *
     * This makes the text invisible.
     *
     * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
     *
     * @param {...string} text
     * @returns {string}
     */
    readonly hidden: ColrFn;
    /**<!-- DOCS: colr.helpersHeader ### -->
     * Helper Functions
     */
    /**<!-- DOCS-ALIAS: colr.template -->
     * $ / template
     * 
     * - `colr.$`
     * - `colr.template`
     * 
     * A helper function to make it easier to use colr with template strings.
     * 
     * Applies the given template string to the $'d expressions in the template string.
     * 
     * ```typescript
     * colr.red.$`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
     * colr.red.template`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
     * 
     * colr.blueBg(colr.red.$`A ${'red'} word in a blue world`); // 'A red word in a blue world' with a blue background, and 'red' has red text
     * ```
     */
    readonly $: (strings: TemplateStringsArray, ...exps: any[]) => string;
    /**<!-- DOCS: colr.template #### -->
     * $ / template
     *
     * - `colr.$`
     * - `colr.template`
     *
     * A helper function to make it easier to use colr with template strings.
     *
     * Applies the given template string to the $'d expressions in the template string.
     *
     * ```typescript
     * colr.red.$`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
     * colr.red.template`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
     *
     * colr.blueBg(colr.red.$`A ${'red'} word in a blue world`); // 'A red word in a blue world' with a blue background, and 'red' has red text
     * ```
     */
    readonly template: (strings: TemplateStringsArray, ...exps: any[]) => string;
    /**<!-- DOCS: colr.clear #### -->
     * clear
     *
     * - `colr.clear`
     *
     * Removes all colr ANSI escapes code from the given text.
     *
     * ```typescript
     * const text = colr.red('Hello World!'); // 'Hello World!' with red text
     * colr.clear(text); // 'Hello World!' with no colours
     * ```
     */
    readonly clear: (text: string) => string;
    /**<!-- DOCS: colr.debug #### -->
     * debug
     *
     * - `colr.debug`
     *
     * Replaces all colr ANSI escapes code with human readable indicators to help debugging why a style might not be working.
     *
     * - Each colour/style has a 3 letter key and is wrapped in backets with a direction indicator.
     * - The direction indicator is `>` for opening and `<` for closing.
     * - The key is uppercase for light colours, and lowercase for dark colours.
     * - The key is wrapped in `()` for text colours, `{}` for background colours, and `[]` for other styles.
     * - Colours have common ending codes, so `(<)` (text) or `{<}` (background) is used for these codes.
     *
     * | Colour  | Light Text     | Dark Text      | Light BG       | Dark BG        |
     * |---------|----------------|----------------|----------------|----------------|
     * | black   | `(BLK>)...(<)` | `(blk>)...(<)` | `{BLK>}...{<}` | `{blk>}...{<}` |
     * | red     | `(RED>)...(<)` | `(red>)...(<)` | `{RED>}...{<}` | `{red>}...{<}` |
     * | green   | `(GRN>)...(<)` | `(grn>)...(<)` | `{GRN>}...{<}` | `{grn>}...{<}` |
     * | yellow  | `(YLW>)...(<)` | `(ylw>)...(<)` | `{YLW>}...{<}` | `{ylw>}...{<}` |
     * | blue    | `(BLU>)...(<)` | `(blu>)...(<)` | `{BLU>}...{<}` | `{blu>}...{<}` |
     * | magenta | `(MAG>)...(<)` | `(mag>)...(<)` | `{MAG>}...{<}` | `{mag>}...{<}` |
     * | cyan    | `(CYN>)...(<)` | `(cyn>)...(<)` | `{CYN>}...{<}` | `{cyn>}...{<}` |
     * | white   | `(WHT>)...(<)` | `(wht>)...(<)` | `{WHT>}...{<}` | `{wht>}...{<}` |
  
     * | Style         |                   |
     * |---------------|-------------------|
     * | reset         | `[rst>]...[<rst]` |
     * | bold          | `[bld>]...[<bld]` |
     * | dim           | `[dim>]...[<dim]` |
     * | italic        | `[itl>]...[<itl]` |
     * | overline      | `[ovr>]...[<ovr]` |
     * | underline     | `[und>]...[<und]` |
     * | strikethrough | `[str>]...[<str]` |
     * | inverse       | `[inv>]...[<inv]` |
     * | hidden        | `[hdn>]...[<hdn]` |
     *
     * ```typescript
     * colr.debug(colr.yellow('Hello World!')); // '(YLW>)Hello World!(<)'
     * colr.debug(colr.dark.yellow('Hello World!')); // '(ylw>)Hello World!(<)'
     * colr.debug(colr.yellow.dim('Hello World!')); // '(YLW>)[dim>]Hello World![<dim](<)'
     * colr.debug(colr.dark.yellow.dim('Hello World!')); // '(ylw>)[dim>]Hello World![<dim](<)'
     *
     * colr.debug(colr.yellow.blueBg('Hello World!')); // '(YLW>){blu>}Hello World!{<}(<)'
     * colr.debug(colr.yellow.lightBg.blueBg('Hello World!')); // '(YLW>){BLU>}Hello World!{<}(<)'
     * ```
     */
    readonly debug: (text: string) => string;
    /**<!-- DOCS: colr.sets ### 301 -->
     * sets
     *
     * - `colr.sets`
     *
     * A collection of different colour 'sets'.
     *
     * A set is a collection of `ColrFn`'s for a certain colour/theme that affect the text or the background.
     *
     * Useful for when you want to attribute a certain colour/theme, and apply it to the text colour or background colour in different applications.
     *
     * | Name         | `text`            | `bg`                |
     * |--------------|-------------------|---------------------|
     * | `red`        | `colr.red`        | `colr.redBg`        |
     * | `green`      | `colr.green`      | `colr.greenBg`      |
     * | `yellow`     | `colr.yellow`     | `colr.yellowBg`     |
     * | `blue`       | `colr.blue`       | `colr.blueBg`       |
     * | `magenta`    | `colr.magenta`    | `colr.magentaBg`    |
     * | `cyan`       | `colr.cyan`       | `colr.cyanBg`       |
     * | `white`      | `colr.white`      | `colr.whiteBg`      |
     * | `black`      | `colr.black`      | `colr.blackBg`      |
     * | `lightBlack` | `colr.lightBlack` | `colr.lightBlackBg` |
     * | `grey`       | `colr.grey`       | `colr.greyBg`       |
     * | `gray`       | `colr.gray`       | `colr.grayBg`       |
     * | `primary`    | `colr.primary`    | `colr.primaryBg`    |
     * | `secondary`  | `colr.secondary`  | `colr.secondaryBg`  |
     * | `success`    | `colr.success`    | `colr.successBg`    |
     * | `danger`     | `colr.danger`     | `colr.dangerBg`     |
     * | `warning`    | `colr.warning`    | `colr.warningBg`    |
     * | `info`       | `colr.info`       | `colr.infoBg`       |
     *
     * ```typescript
     * const printOption = (name: string, colour: ColrSet) => {
     *   console.log(' ' + colour.bg.darkBlack('   ') + ' ' + colour.text(name));
     * };
     * printOption('Approve', colr.lightBg.sets.green);
     * printOption('Decline', colr.dark.sets.red);
     *
     * // Rough output:
     * // '███ Approve' in green
     * // '███ Decline' in red
     * ```
     */
    readonly sets: ColrSets;
    /**<!-- DOCS-ALIAS: colr -->
     * colr
     * 
     * - `colr`
     * 
     * Tool for creating coloured/styled strings
     * 
     * Chain/combine different combinations of colours and styles to get the appearance you want.
     * 
     * | Name      | Type       | Modifier |                    | Description                                  |
     * |-----------|------------|----------|--------------------|----------------------------------------------|
     * | `light`   | Text       | Light    | `colr.light()`   | Use light text colours (on by default)       |
     * | `dark`    | Text       | Dark     | `colr.dark()`    | Use dark text colours                        |
     * | `lightBg` | Background | Light    | `colr.lightBg()` | Use light background colours (on by default) |
     * | `darkBg`  | Background | Dark     | `colr.darkBg()`  | Use dark background colours                  |
     * 
     * | Name             | Affects    | Colour     | Type                    | Recommended                | Alt                     |
     * |------------------|------------|------------|-------------------------|----------------------------|-------------------------|
     * | `red`            | Text       | 🟥 Red     | __Base__&nbsp;_(Light)_ | `colr.red()`               |                         |
     * | `darkRed`        | Text       | 🟥 Red     | Dark                    | `colr.dark.red()`          | `colr.darkRed()`        |
     * | `lightRed`       | Text       | 🟥 Red     | Light                   | `colr.light.red()`         | `colr.lightRed()`       |
     * | `green`          | Text       | 🟩 Green   | __Base__&nbsp;_(Light)_ | `colr.green()`             |                         |
     * | `darkGreen`      | Text       | 🟩 Green   | Dark                    | `colr.dark.green()`        | `colr.darkGreen()`      |
     * | `lightGreen`     | Text       | 🟩 Green   | Light                   | `colr.light.green()`       | `colr.lightGreen()`     |
     * | `yellow`         | Text       | 🟨 Yellow  | __Base__&nbsp;_(Light)_ | `colr.yellow()`            |                         |
     * | `darkYellow`     | Text       | 🟨 Yellow  | Dark                    | `colr.dark.yellow()`       | `colr.darkYellow()`     |
     * | `lightYellow`    | Text       | 🟨 Yellow  | Light                   | `colr.light.yellow()`      | `colr.lightYellow()`    |
     * | `blue`           | Text       | 🟦 Blue    | __Base__&nbsp;_(Light)_ | `colr.blue()`              |                         |
     * | `darkBlue`       | Text       | 🟦 Blue    | Dark                    | `colr.dark.blue()`         | `colr.darkBlue()`       |
     * | `lightBlue`      | Text       | 🟦 Blue    | Light                   | `colr.light.blue()`        | `colr.lightBlue()`      |
     * | `magenta`        | Text       | 🟪 Magenta | __Base__&nbsp;_(Light)_ | `colr.magenta()`           |                         |
     * | `darkMagenta`    | Text       | 🟪 Magenta | Dark                    | `colr.dark.magenta()`      | `colr.darkMagenta()`    |
     * | `lightMagenta`   | Text       | 🟪 Magenta | Light                   | `colr.light.magenta()`     | `colr.lightMagenta()`   |
     * | `cyan`           | Text       | 💠 Cyan    | __Base__&nbsp;_(Light)_ | `colr.cyan()`              |                         |
     * | `darkCyan`       | Text       | 💠 Cyan    | Dark                    | `colr.dark.cyan()`         | `colr.darkCyan()`       |
     * | `lightCyan`      | Text       | 💠 Cyan    | Light                   | `colr.light.cyan()`        | `colr.lightCyan()`      |
     * | `white`          | Text       | ⬜ White   | __Base__&nbsp;_(Light)_ | `colr.white()`             |                         |
     * | `darkWhite`      | Text       | ⬜ White   | Dark                    | `colr.dark.white()`        | `colr.darkWhite()`      |
     * | `lightWhite`     | Text       | ⬜ White   | Light                   | `colr.light.white()`       | `colr.lightWhite()`     |
     * | `redBg`          | Background | 🟥 Red     | __Base__&nbsp;_(Light)_ | `colr.redBg()`             |                         |
     * | `darkRedBg`      | Background | 🟥 Red     | Dark                    | `colr.darkBg.redBg()`      | `colr.darkRedBg()`      |
     * | `lightRedBg`     | Background | 🟥 Red     | Light                   | `colr.lightBg.redBg()`     | `colr.lightRedBg()`     |
     * | `greenBg`        | Background | 🟩 Green   | __Base__&nbsp;_(Light)_ | `colr.greenBg()`           |                         |
     * | `darkGreenBg`    | Background | 🟩 Green   | Dark                    | `colr.darkBg.greenBg()`    | `colr.darkGreenBg()`    |
     * | `lightGreenBg`   | Background | 🟩 Green   | Light                   | `colr.lightBg.greenBg()`   | `colr.lightGreenBg()`   |
     * | `yellowBg`       | Background | 🟨 Yellow  | __Base__&nbsp;_(Light)_ | `colr.yellowBg()`          |                         |
     * | `darkYellowBg`   | Background | 🟨 Yellow  | Dark                    | `colr.darkBg.yellowBg()`   | `colr.darkYellowBg()`   |
     * | `lightYellowBg`  | Background | 🟨 Yellow  | Light                   | `colr.lightBg.yellowBg()`  | `colr.lightYellowBg()`  |
     * | `blueBg`         | Background | 🟦 Blue    | __Base__&nbsp;_(Light)_ | `colr.blueBg()`            |                         |
     * | `darkBlueBg`     | Background | 🟦 Blue    | Dark                    | `colr.darkBg.blueBg()`     | `colr.darkBlueBg()`     |
     * | `lightBlueBg`    | Background | 🟦 Blue    | Light                   | `colr.lightBg.blueBg()`    | `colr.lightBlueBg()`    |
     * | `magentaBg`      | Background | 🟪 Magenta | __Base__&nbsp;_(Light)_ | `colr.magentaBg()`         |                         |
     * | `darkMagentaBg`  | Background | 🟪 Magenta | Dark                    | `colr.darkBg.magentaBg()`  | `colr.darkMagentaBg()`  |
     * | `lightMagentaBg` | Background | 🟪 Magenta | Light                   | `colr.lightBg.magentaBg()` | `colr.lightMagentaBg()` |
     * | `cyanBg`         | Background | 💠 Cyan    | __Base__&nbsp;_(Light)_ | `colr.cyanBg()`            |                         |
     * | `darkCyanBg`     | Background | 💠 Cyan    | Dark                    | `colr.darkBg.cyanBg()`     | `colr.darkCyanBg()`     |
     * | `lightCyanBg`    | Background | 💠 Cyan    | Light                   | `colr.lightBg.cyanBg()`    | `colr.lightCyanBg()`    |
     * | `whiteBg`        | Background | ⬜ White   | __Base__&nbsp;_(Light)_ | `colr.whiteBg()`           |                         |
     * | `darkWhiteBg`    | Background | ⬜ White   | Dark                    | `colr.darkBg.whiteBg()`    | `colr.darkWhiteBg()`    |
     * | `lightWhiteBg`   | Background | ⬜ White   | Light                   | `colr.lightBg.whiteBg()`   | `colr.lightWhiteBg()`   |
     * | `black`          | Text       | ⬛ Black   | __Always Dark__         | `colr.black()`             |                         |
     * | `darkBlack`      | Text       | ⬛ Black   | Dark                    | `colr.black()`             | `colr.darkBlack()`      |
     * | `lightBlack`     | Text       | ⬛ Black   | Light                   | `colr.light.black()`       | `colr.lightBlack()`     |
     * | `blackBg`        | Background | ⬛ Black   | __Always Dark__         | `colr.blackBg()`           |                         |
     * | `darkBlackBg`    | Background | ⬛ Black   | Dark                    | `colr.blackBg()`           | `colr.darkBlackBg()`    |
     * | `lightBlackBg`   | Background | ⬛ Black   | Light                   | `colr.lightBg.blackBg()`   | `colr.lightBlackBg()`   |
     * | `grey`           | Text       | 🩶 Grey    | Greys                   | `colr.grey()`              |                         |
     * | `greyBg`         | Background | 🩶 Grey    | Greys                   | `colr.greyBg()`            |                         |
     * | `grey0`          | Text       | ⬛ Black   | Greys                   | `colr.grey0()`             |                         |
     * | `grey1`          | Text       | 🩶 Grey    | Greys                   | `colr.grey1()`             |                         |
     * | `grey2`          | Text       | 🩶 Grey    | Greys                   | `colr.grey2()`             |                         |
     * | `grey3`          | Text       | 🩶 Grey    | Greys                   | `colr.grey3()`             |                         |
     * | `grey4`          | Text       | 🩶 Grey    | Greys                   | `colr.grey4()`             |                         |
     * | `grey5`          | Text       | ⬜ White   | Greys                   | `colr.grey5()`             |
     * | `primary`        | Text       | 🟨 Yellow  | Theme                   | `colr.primary()`           |                         |
     * | `secondary`      | Text       | 🟪 Magenta | Theme                   | `colr.secondary()`         |                         |
     * | `success`        | Text       | 🟩 Green   | Theme                   | `colr.success()`           |                         |
     * | `danger`         | Text       | 🟥 Red     | Theme                   | `colr.danger()`            |                         |
     * | `warning`        | Text       | 🟨 Yellow  | Theme                   | `colr.warning()`           |                         |
     * | `info`           | Text       | 🟦 Blue    | Theme                   | `colr.info()`              |                         |
     * | `primaryBg`      | Background | 🟨 Yellow  | Theme                   | `colr.primaryBg()`         |                         |
     * | `secondaryBg`    | Background | 🟪 Magenta | Theme                   | `colr.secondaryBg()`       |                         |
     * | `successBg`      | Background | 🟩 Green   | Theme                   | `colr.successBg()`         |                         |
     * | `dangerBg`       | Background | 🟥 Red     | Theme                   | `colr.dangerBg()`          |                         |
     * | `warningBg`      | Background | 🟨 Yellow  | Theme                   | `colr.warningBg()`         |                         |
     * | `infoBg`         | Background | 🟦 Blue    | Theme                   | `colr.infoBg()`            |                         |
     * 
     * | Name            |                          | Description                                                      |
     * |-----------------|--------------------------|------------------------------------------------------------------|
     * | `reset`         | `colr.reset('')`         | This returns the text back to normal colours/styles              |
     * | `bold`          | `colr.bold('')`          | This makes the text __bold__                                     |
     * | `dim`           | `colr.dim('')`           | This dims the brightness of the text colour                      |
     * | `italic`        | `colr.italic('')`        | This makes the text _italic_                                     |
     * | `overline`      | `colr.overline('')`      | This adds a horizontal line above the text                       |
     * | `underline`     | `colr.underline('')`     | This adds a horizontal line below the text                       |
     * | `strikethrough` | `colr.strikethrough('')` | This add a horizontal line through the middle of the given text  |
     * | `inverse`       | `colr.inverse('')`       | This inverses the text and background colours for the given text |
     * | `hidden`        | `colr.hidden('')`        | This makes the text invisible.                                   |
     * 
     * ```typescript
     * colr.yellow('Hello World!'); // 'Hello World!' with yellow text
     * colr.dark.yellow('Hello World!'); // 'Hello World!' with dark yellow text
     * colr.yellow.dim('Hello World!'); // 'Hello World!' with dimmed yellow text
     * colr.dark.yellow.dim('Hello World!'); // 'Hello World!' with dimmed dark yellow text
     * 
     * colr.yellow.blueBg('Hello World!'); // 'Hello World!' with yellow text and blue background
     * colr.yellow.darkBg.blueBg('Hello World!'); // 'Hello World!' with yellow text and dark blue background
     * 
     * // pass in multiple arguments to get them all coloured/styled
     * colr.red('Hello', 'World!'); // 'Hello World!' with red text
     * 
     * // nested styles
     * colr.red(`A ${colr.blue('blue')} world`); // 'A blue world' with with red text, except 'blue' which is blue
     * 
     * // template literals
     * colr.red.$`A ${'red'} world`; // 'A red world' with default colours, except 'World!' which is red
     * 
     * // Debugging
     * colr.debug(colr.yellow.blueBg(`A ${colr.red('red')} world`)); // '(YLW>){blu>}A (RED>)red(<)(YLW>) world{<}(<)'
     * ```
     */
    (...text: unknown[]): string;
}
/**<!-- DOCS: colr.WrapSet ### -->
 * WrapSet
 *
 * An agnostic set of functions to wrap/modify the given text with the given colour/style.
 *
 * Same as `ColrSet`, but not limited to colr library.
 *
 * Has two properties:
 * - `text` - A function to wrap/modify the given text with the given colour/style.
 * - `bg` - A function to wrap/modify the background of the given text with the given colour/style.
 *
 * Example:
 * ```typescript
 * const chalkSet: WrapSet = {
 *   text: chalk.redBright,
 *   bg: chalk.bgRedBright,
 * };
 * ```
 */
interface WrapSet {
    /**<!-- DOCS: colr.WrapSet.text #### -1 -->
     * text
     *
     * A function to wrap/modify the given text with the given colour/style.
     */
    text: WrapFn;
    /**<!-- DOCS: colr.WrapSet.bg #### -1 -->
     * bg
     *
     * A function to wrap/modify the background of the given text with the given colour/style.
     */
    bg: WrapFn;
}
/**<!-- DOCS: colr.ColrSet ### -->
 * ColrSet
 *
 * A set of ColrFns for a certain colour/theme.
 *
 * Has two properties:
 * - `text` - A function to set the text colour to the given colour/style.
 * - `bg` - A function to set the background colour to the given colour/style.
 */
interface ColrSet extends WrapSet {
    /**<!-- DOCS: colr.ColrSet.text #### -1 -->
     * text
     *
     * A ColrFn to style the given text with the given colour/style.
     */
    readonly text: ColrFn;
    /**<!-- DOCS: colr.ColrSet.bg #### -1 -->
     * bg
     *
     * A ColrFn to style the background of the given text with the given colour/style.
     */
    readonly bg: ColrFn;
}
interface ColrSets {
    /**<!-- DOCS: colr.sets.red #### 301 -->
     * red
     *
     * - `colr.sets.red`
     *
     * A ColrSet object for the colour `red`.
     *
     * - The `text` function is: `colr.red`.
     * - The `bg` function is: `colr.redBg`.
     */
    readonly red: ColrSet;
    /**<!-- DOCS: colr.sets.green #### 301 -->
     * green
     *
     * - `colr.sets.green`
     *
     * A ColrSet object for the colour `green`.
     *
     * - The `text` function is: `colr.green`.
     * - The `bg` function is: `colr.greenBg`.
     */
    readonly green: ColrSet;
    /**<!-- DOCS: colr.sets.yellow #### 301 -->
     * yellow
     *
     * - `colr.sets.yellow`
     *
     * A ColrSet object for the colour `yellow`.
     *
     * - The `text` function is: `colr.yellow`.
     * - The `bg` function is: `colr.yellowBg`.
     */
    readonly yellow: ColrSet;
    /**<!-- DOCS: colr.sets.blue #### 301 -->
     * blue
     *
     * - `colr.sets.blue`
     *
     * A ColrSet object for the colour `blue`.
     *
     * - The `text` function is: `colr.blue`.
     * - The `bg` function is: `colr.blueBg`.
     */
    readonly blue: ColrSet;
    /**<!-- DOCS: colr.sets.magenta #### 301 -->
     * magenta
     *
     * - `colr.sets.magenta`
     *
     * A ColrSet object for the colour `magenta`.
     *
     * - The `text` function is: `colr.magenta`.
     * - The `bg` function is: `colr.magentaBg`.
     */
    readonly magenta: ColrSet;
    /**<!-- DOCS: colr.sets.cyan #### 301 -->
     * cyan
     *
     * - `colr.sets.cyan`
     *
     * A ColrSet object for the colour `cyan`.
     *
     * - The `text` function is: `colr.cyan`.
     * - The `bg` function is: `colr.cyanBg`.
     */
    readonly cyan: ColrSet;
    /**<!-- DOCS: colr.sets.white #### 301 -->
     * white
     *
     * - `colr.sets.white`
     *
     * A ColrSet object for the colour `white`.
     *
     * - The `text` function is: `colr.white`.
     * - The `bg` function is: `colr.whiteBg`.
     */
    readonly white: ColrSet;
    /**<!-- DOCS: colr.sets.black #### 301 -->
     * black
     *
     * - `colr.sets.black`
     *
     * A ColrSet object for the colour `black`.
     *
     * - The `text` function is: `colr.black`.
     * - The `bg` function is: `colr.blackBg`.
     */
    readonly black: ColrSet;
    /**<!-- DOCS: colr.sets.lightBlack #### 301 -->
     * lightBlack
     *
     * - `colr.sets.lightBlack`
     *
     * A ColrSet object for the colour `lightBlack`.
     *
     * - The `text` function is: `colr.lightBlack`.
     * - The `bg` function is: `colr.lightBlackBg`.
     */
    readonly lightBlack: ColrSet;
    /**<!-- DOCS: colr.sets.grey #### 301 -->
     * grey
     *
     * - `colr.sets.grey`
     *
     * A ColrSet object for the colour `grey`.
     *
     * - The `text` function is: `colr.grey`.
     * - The `bg` function is: `colr.greyBg`.
     */
    readonly grey: ColrSet;
    /**<!-- DOCS: colr.sets.gray #### 301 -->
     * gray
     *
     * - `colr.sets.gray`
     *
     * A ColrSet object for the colour `gray`.
     *
     * - The `text` function is: `colr.gray`.
     * - The `bg` function is: `colr.grayBg`.
     */
    readonly gray: ColrSet;
    /**<!-- DOCS: colr.sets.primary #### 301 -->
     * primary
     *
     * - `colr.sets.primary`
     *
     * A ColrSet object for the theme `primary`.
     *
     * - The `text` function is: `colr.primary`.
     * - The `bg` function is: `colr.primaryBg`.
     */
    readonly primary: ColrSet;
    /**<!-- DOCS: colr.sets.secondary #### 301 -->
     * secondary
     *
     * - `colr.sets.secondary`
     *
     * A ColrSet object for the theme `secondary`.
     *
     * - The `text` function is: `colr.secondary`.
     * - The `bg` function is: `colr.secondaryBg`.
     */
    readonly secondary: ColrSet;
    /**<!-- DOCS: colr.sets.success #### 301 -->
     * success
     *
     * - `colr.sets.success`
     *
     * A ColrSet object for the theme `success`.
     *
     * - The `text` function is: `colr.success`.
     * - The `bg` function is: `colr.successBg`.
     */
    readonly success: ColrSet;
    /**<!-- DOCS: colr.sets.danger #### 301 -->
     * danger
     *
     * - `colr.sets.danger`
     *
     * A ColrSet object for the theme `danger`.
     *
     * - The `text` function is: `colr.danger`.
     * - The `bg` function is: `colr.dangerBg`.
     */
    readonly danger: ColrSet;
    /**<!-- DOCS: colr.sets.warning #### 301 -->
     * warning
     *
     * - `colr.sets.warning`
     *
     * A ColrSet object for the theme `warning`.
     *
     * - The `text` function is: `colr.warning`.
     * - The `bg` function is: `colr.warningBg`.
     */
    readonly warning: ColrSet;
    /**<!-- DOCS: colr.sets.info #### 301 -->
     * info
     *
     * - `colr.sets.info`
     *
     * A ColrSet object for the theme `info`.
     *
     * - The `text` function is: `colr.info`.
     * - The `bg` function is: `colr.infoBg`.
     */
    readonly info: ColrSet;
}

/**<!-- DOCS: table ##! -->
 * table
 *
 * A simple table generator
 */
declare namespace table {
    /**<!-- DOCS: table.print ### @ -->
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
     * @param {any[][]} body
     * @param {any[][]} [header]
     * @param {TableOptions} [options={}]
     * @returns {number}
     */
    const print: (body: any[][], header?: any[][], options?: TableOptions) => number;
    /**<!-- DOCS: table.printObjects ### @ -->
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
     * @param {Object[]} objects
     * @param {Object} [headers={}]
     * @param {TableOptions} [options={}]
     * @returns {number}
     */
    const printObjects: (objects: Object[], headers?: Object, options?: TableOptions) => number;
    /**<!-- DOCS: table.markdown ### @ -->
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
     * @param {any[][]} body
     * @param {any[][]} [header]
     * @param {TableOptions} [options={}]
     * @returns {string[]}
     */
    const markdown: (body: any[][], header?: any[][], options?: TableOptions) => string[];
    /**<!-- DOCS: table.getLines ### @ -->
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
     * @param {any[][]} body
     * @param {any[][]} [header]
     * @param {TableOptions} [options={}]
     * @returns {string[]}
     */
    const getLines: (body: any[][], header?: any[][], options?: TableOptions) => string[];
    /**<!-- DOCS: table.FullTableOptions ###! -->
     * TableOptions
     *
     * The configuration options for the table
     */
    interface FullTableOptions {
        /**<!-- DOCS: table.FullTableOptions.wrapperFn #### -->
         * wrapperFn
         *
         * Function to wrap each line of the output in (e.g. colr.blue)
         */
        wrapperFn: Function;
        /**<!-- DOCS: table.FullTableOptions.wrapLinesFn #### -->
         * wrapLinesFn
         *
         * Function to wrap the output lines of each cell of the table (e.g. colr.blue)
         */
        wrapLinesFn: Function;
        /**<!-- DOCS: table.FullTableOptions.wrapHeaderLinesFn #### -->
         * wrapHeaderLinesFn
         *
         * Function to wrap the output lines of each cell of the header of the table (e.g. colr.blue)
         *
         * Default: `colr.bold`
         */
        wrapHeaderLinesFn: Function;
        /**<!-- DOCS: table.FullTableOptions.wrapBodyLinesFn #### -->
         * wrapBodyLinesFn
         *
         * Function to wrap the output lines of each cell of the body of the table (e.g. colr.blue)
         */
        wrapBodyLinesFn: Function;
        /**<!-- DOCS: table.FullTableOptions.overrideChar #### -->
         * overrideChar
         *
         * Character to use instead of lines
         *
         * Override character options are applied in the following order (later options have higher priority):
         * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
         */
        overrideChar: string;
        /**<!-- DOCS: table.FullTableOptions.overrideHorChar #### -->
         * overrideHorChar
         *
         * Character to use instead of horizontal lines
         *
         * Override character options are applied in the following order (later options have higher priority):
         * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
         */
        overrideHorChar: string;
        /**<!-- DOCS: table.FullTableOptions.overrideVerChar #### -->
         * overrideVerChar
         *
         * Character to use instead of vertical lines
         *
         * Override character options are applied in the following order (later options have higher priority):
         * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
         */
        overrideVerChar: string;
        /**<!-- DOCS: table.FullTableOptions.overrideCornChar #### -->
         * overrideCornChar
         *
         * Character to use instead of corner and intersecting lines (┌, ┬, ┐, ├, ┼, ┤, └, ┴, ┘)
         *
         * Override character options are applied in the following order (later options have higher priority):
         * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
         */
        overrideCornChar: string;
        /**<!-- DOCS: table.FullTableOptions.overrideOuterChar #### -->
         * overrideOuterChar
         *
         * Character to use instead of lines on the outside of the table (┌, ┬, ┐, ├, ┤, └, ┴, ┘)
         *
         * Override character options are applied in the following order (later options have higher priority):
         * overrideChar, overrideHorChar/overrideVerChar (see overridePrioritiseVer), overrideOuterChar, overrideCornChar, overrideCharSet
         */
        overrideOuterChar: string;
        /**<!-- DOCS: table.FullTableOptions.overrideCharSet #### -->
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
        /**<!-- DOCS: table.FullTableOptions.overridePrioritiseVer #### -->
         * overridePrioritiseVer
         *
         * By default, if not overrideHorChar and overrideVerChar are set, overrideHorChar will be prioritised (and used where both are applicable).
         * Setting this to true will prioritise overrideVerChar instead.
         *
         * Default: `false`
         */
        overridePrioritiseVer: boolean;
        /**<!-- DOCS: table.FullTableOptions.drawOuter #### -->
         * drawOuter
         *
         * Whether to draw the outer border of the table
         */
        drawOuter: boolean;
        /**<!-- DOCS: table.FullTableOptions.drawRowLines #### -->
         * drawRowLines
         *
         * Whether to draw lines between rows (other than separating header and body)
         */
        drawRowLines: boolean;
        /**<!-- DOCS: table.FullTableOptions.drawColLines #### -->
         * drawColLines
         *
         * Whether to draw lines between columns
         */
        drawColLines: boolean;
        /**<!-- DOCS: table.FullTableOptions.colWidths #### -->
         * colWidths
         *
         * Preferred width (in number of characters) of each column
         */
        colWidths: number[];
        /**<!-- DOCS: table.FullTableOptions.align #### -->
         * align
         *
         * How the table should be aligned on the screen
         *
         * left, right, center or justify
         */
        align: out.AlignType;
        /**<!-- DOCS: table.FullTableOptions.alignCols #### -->
         * alignCols
         *
         * How each column should be aligned
         *
         * Array with alignment for each column: left, right, center or justify
         */
        alignCols: out.AlignType[];
        /**<!-- DOCS: table.FullTableOptions.transpose #### -->
         * transpose
         *
         * Change rows into columns and vice versa
         */
        transpose: boolean;
        /**<!-- DOCS: table.FullTableOptions.transposeBody #### -->
         * transposeBody
         *
         * Change rows into columns and vice versa (body only)
         */
        transposeBody: boolean;
        /**<!-- DOCS: table.FullTableOptions.margin #### -->
         * margin
         *
         * The amount of space to leave around the outside of the table
         */
        margin: number | number[];
        /**<!-- DOCS: table.FullTableOptions.cellPadding #### -->
         * cellPadding
         *
         * The amount of space to leave around the outside of each cell
         */
        cellPadding: number;
        /**<!-- DOCS: table.FullTableOptions.format #### -->
         * format
         *
         * A set of formatting configurations
         */
        format: TableFormatConfig[];
        /**<!-- DOCS: table.FullTableOptions.truncate #### -->
         * truncate
         *
         * Truncates (cuts the end off) line instead of wrapping
         */
        truncate: false | string;
        /**<!-- DOCS: table.FullTableOptions.maxWidth #### -->
         * maxWidth
         *
         * Maximum width of the table
         */
        maxWidth: number;
    }
    /**<!-- DOCS: table.TableOptions ### -1 -->
     * TableOptions
     *
     * The configuration options for the table
     */
    type TableOptions = Partial$1<FullTableOptions>;
    /**<!-- DOCS: table.TableCharLookup ### 451 -->
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
    type TableCharLookup = Partial$1<CharLookup<string[]>>;
    /**<!-- DOCS: table.TableFormatConfig ###! -->
     * TableFormatConfig
     *
     * Configuration for formatting a cell
     */
    interface TableFormatConfig {
        /**<!-- DOCS: table.formatFn #### -->
         * formatFn
         *
         * A wrapper function to apply to the cell
         */
        formatFn: Function;
        /**<!-- DOCS: table.isHeader #### -->
         * isHeader
         *
         * Whether to apply the format to the header
         */
        isHeader?: boolean;
        /**<!-- DOCS: table.isBody #### -->
         * isBody
         *
         * Whether to apply the format to the body
         */
        isBody?: boolean;
        /**<!-- DOCS: table.row #### -->
         * row
         *
         * A specific row to apply the format to
         */
        row?: number;
        /**<!-- DOCS: table.col #### -->
         * col
         *
         * A specific column to apply the format to
         */
        col?: number;
    }
    /**<!-- DOCS: table.utils ### -->
     * utils
     */
    namespace utils {
        /**<!-- DOCS: table.utils.objectsToTable #### @ -->
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
         * @param {Object[]} objects
         * @param {Object} [headers={}]
         * @returns {{ header: any[][]; body: any[][]; }}
         */
        const objectsToTable: (objects: Object[], headers?: Object) => {
            header: any[][];
            body: any[][];
        };
        /**<!-- DOCS: table.utils.transpose #### @ -->
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
         * @param {any[][]} rows
         * @returns {any[][]}
         */
        const transpose: (rows: any[][]) => any[][];
        /**<!-- DOCS: table.utils.concatRows #### @ -->
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
         * @param {{ header: any[][]; body: any[][] }} cells
         * @returns {any[][]}
         */
        const concatRows: (cells: {
            header: any[][];
            body: any[][];
        }) => any[][];
        /**<!-- DOCS: table.utils.getFormat #### @ -->
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
         * @param {WrapFn} format
         * @param {number} [row]
         * @param {number} [col]
         * @param {boolean} [isHeader]
         * @param {boolean} [isBody]
         * @returns {TableFormatConfig}
         */
        const getFormat: (format: WrapFn, row?: number, col?: number, isHeader?: boolean, isBody?: boolean) => TableFormatConfig;
        /**<!-- DOCS: table.utils.getFullOptions #### @ -->
         * getFullOptions
         *
         * - `table.utils.getFullOptions`
         *
         * A function for simplifying the format configuration
         * @param {TableOptions} opts
         * @returns {FullTableOptions}
         */
        const getFullOptions: (opts: TableOptions) => FullTableOptions;
    }
}

declare type Text = string | string[];

/**<!-- DOCS: out.LineCounter #### -->
 * LineCounter
 *
 * - `out.LineCounter`
 * - `LineCounter`
 *
 * Return type for getLineCounter
 *
 * ```typescript
 * const lc = getLineCounter();
 * lc.log('hello'); // 1
 * lc.wrap(1, () => console.log('a single line')); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 */
interface LineCounter$1 {
    /**<!-- DOCS: out.LineCounter.log ##### -->
     * lc.log
     *
     * Same as console.log, but adds to the lc counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * ```
     *
     * @param {...any} args The arguments to log
     * @returns {number} The number of lines added
     */
    log(...args: any[]): number;
    /**<!-- DOCS: out.LineCounter.overwrite ##### -->
     * lc.overwrite
     *
     * Similar to lc.log, but designed for overwriting lines that have already been printed on the screen
     *
     * Use in combination with ansi.cursor.up to move the cursor up and replace/overwrite lines.
     *
     * Adds a ansi.erase.lineEnd before each new line so that the line is cleared apart from what you're overwriting it with.
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.overwrite('hello'); // 1
     * ```
     *
     * @param {...any} args The arguments to overwrite
     * @returns {number} The number of lines added
     */
    overwrite(...args: any[]): number;
    /**<!-- DOCS: out.LineCounter.wrap ##### -->
     * lc.wrap
     *
     * Wraps a function, and adds a given number to the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.wrap(1, () => console.log('a single line')); // 1
     * ```
     *
     * @param {number} newLines The number of lines to add
     * @param {(...args: A[]) => number | T} func The function to wrap
     * @param {...A} args The arguments to pass to the function
     * @returns {T} The result of the function
     */
    wrap: <T = any, A = any>(newLines: number, func: (...args: A[]) => number | T, ...args: A[]) => T;
    /**<!-- DOCS: out.LineCounter.add ##### -->
     * lc.add
     *
     * Adds a given number to the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.add(1);
     * ```
     *
     * @param {number} newLines The number of lines to add
     * @returns {void}
     */
    add(newLines: number): void;
    /**<!-- DOCS: out.LineCounter.get ##### -->
     * lc.get
     *
     * returns the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.wrap(1, () => console.log('a single line')); // 1
     * lc.add(1);
     * lc.get(); // 3
     * ```
     *
     * @returns {number} The line counter
     */
    get(): number;
    /**<!-- DOCS: out.LineCounter.getSince ##### -->
     * lc.getSince
     *
     * Returns the number of lines since a given checkpoint
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.checkpoint('test-a');
     * lc.wrap(1, () => console.log('a single line')); // 1
     * lc.checkpoint('test-b');
     * lc.add(1);
     * lc.getSince('test-a'); // 2
     * lc.getSince('test-b'); // 1
     * ```
     *
     * @param {string} checkpointID The checkpoint to check
     * @returns {number} The number of lines since the checkpoint
     */
    getSince(checkpointID: string): number;
    /**<!-- DOCS: out.LineCounter.moveCursor ##### -->
     * lc.moveCursor
     *
     * Move the cursor without clearing/erasing lines.
     *
     * Updates the line count in the process.
     *
     * @param {number} y How many lines to move the cursor (down if positive, up if negative)
     * @returns {void}
     */
    moveCursor(y: number): void;
    /**<!-- DOCS: out.LineCounter.moveHome ##### -->
     * lc.moveHome
     *
     * Move the cursor to the start of the line count without clearing/erasing lines.
     *
     * Same as `lc.clear`, but without clearing the lines.
     *
     * Updates the line count in the process.
     *
     * @returns {void}
     */
    moveHome(): void;
    /**<!-- DOCS: out.LineCounter.moveToCheckpoint ##### -->
     * lc.moveToCheckpoint
     *
     * Move the cursor to a previously recorded checkpoint
     *
     * Same as `lc.clearToCheckpoint`, but without clearing the lines.
     *
     * Updates the line count in the process.
     *
     * @param {string} checkpointID The checkpoint to move to
     * @returns {void}
     */
    moveToCheckpoint(checkpointID: string): void;
    /**<!-- DOCS: out.LineCounter.clear ##### -->
     * lc.clear
     *
     * clears the line counter, and moves the cursor up by the value of the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.clear();
     * ```
     *
     * @returns {void}
     */
    clear(): void;
    /**<!-- DOCS: out.LineCounter.clearBack ##### -->
     * lc.clearBack
     *
     * Clears a given number of lines, and updates the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('line 1'); // 1
     * lc.log('line 2'); // 1
     * lc.log('line 3'); // 1
     * lc.log('line 4'); // 1
     * lc.clearBack(2); // ('line 3' and 'line 4' are cleared)
     * ```
     *
     * @param {number} linesToMoveBack The number of lines to clear
     * @param {boolean} [limitToRecordedLines] Whether to limit the number of lines to clear to the number of lines recorded
     * @returns {void}
     */
    clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): void;
    /**<!-- DOCS: out.LineCounter.clearDown ##### -->
     * lc.clearDown
     *
     * Moves the cursor down by a given number of lines
     *
     * Can be negative to move up (clearing lines)
     *
     * > **NOTE:** This adds new lines
     *
     * @param {number} lines The number of lines to move
     * @returns {void}
     */
    clearDown(lines: number): void;
    /**<!-- DOCS: out.LineCounter.checkpoint ##### -->
     * lc.checkpoint
     *
     * Records a 'checkpoint' that can be returned to later
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.checkpoint('test-a');
     * lc.wrap(1, () => console.log('a single line')); // 1
     * lc.checkpoint('test-b');
     * lc.add(1);
     * lc.getSince('test-a'); // 2
     * lc.getSince('test-b'); // 1
     * ```
     *
     * @param {string} [checkpointID] The checkpoint to record
     * @returns {string} The checkpointID
     */
    checkpoint(checkpointID?: string): string;
    /**<!-- DOCS: out.LineCounter.clearToCheckpoint ##### -->
     * lc.clearToCheckpoint
     *
     * Clear lines up to a previously recorded checkpoint
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('line 1'); // 1
     * lc.log('line 2'); // 1
     * lc.checkpoint('test');
     * lc.log('line 3'); // 1
     * lc.log('line 4'); // 1
     * lc.clearToCheckpoint('test'); // ('line 3' and 'line 4' are cleared)
     * ```
     *
     * @param {string} checkpointID The checkpoint to clear to
     * @returns {void}
     */
    clearToCheckpoint(checkpointID: string): void;
    /**<!-- DOCS: out.LineCounter.ansi ##### -->
     * lc.ansi
     *
     * Get ansi codes for clear/erase functions, and update the line counter in the process.
     */
    ansi: {
        /**<!-- DOCS: out.LineCounter.ansi.moveCursor ###### -->
         * lc.ansi.moveCursor
         *
         * Move the cursor without clearing/erasing lines.
         *
         * Updates the line count in the process.
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * @param {number} y How many lines to move the cursor (down if positive, up if negative)
         * @returns {string}
         */
        moveCursor(y: number): string;
        /**<!-- DOCS: out.LineCounter.ansi.moveHome ###### -->
         * lc.ansi.moveHome
         *
         * Move the cursor to the start of the line count without clearing/erasing lines.
         *
         * Same as `lc.clear`, but without clearing the lines.
         *
         * Updates the line count in the process.
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * @returns {string}
         */
        moveHome(): string;
        /**<!-- DOCS: out.LineCounter.ansi.moveToCheckpoint ###### -->
         * lc.ansi.moveToCheckpoint
         *
         * Move the cursor to a previously recorded checkpoint
         *
         * Same as `lc.clearToCheckpoint`, but without clearing the lines.
         *
         * Updates the line count in the process.
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * @param {string} checkpointID The checkpoint to move to
         * @returns {string}
         */
        moveToCheckpoint(checkpointID: string): string;
        /**<!-- DOCS: out.LineCounter.ansi.clear ###### -->
         * lc.ansi.clear
         *
         * Clears the line counter, and moves the cursor up by the value of the line counter
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * ```typescript
         * const lc = getLineCounter();
         * lc.log('hello'); // 1
         * process.stdout.write(lc.ansi.clear());
         * ```
         *
         * @returns {string}
         */
        clear(): string;
        /**<!-- DOCS: out.LineCounter.ansi.clearBack ###### -->
         * lc.ansi.clearBack
         *
         * Clears a given number of lines, and updates the line counter
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * ```typescript
         * const lc = getLineCounter();
         * lc.log('line 1'); // 1
         * lc.log('line 2'); // 1
         * lc.log('line 3'); // 1
         * lc.log('line 4'); // 1
         * process.stdout.write(lc.ansi.clearBack(2)); // ('line 3' and 'line 4' are cleared)
         * ```
         *
         * @param {number} linesToMoveBack The number of lines to clear
         * @param {boolean} [limitToRecordedLines] Whether to limit the number of lines to clear to the number of lines recorded
         * @returns {string}
         */
        clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): string;
        /**<!-- DOCS: out.LineCounter.ansi.clearDown ###### -->
         * lc.ansi.clearDown
         *
         * Moves the cursor down by a given number of lines
         *
         * Can be negative to move up (clearing lines)
         *
         * > **NOTE:** This adds new lines
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * @param {number} lines The number of lines to move
         * @returns {string}
         */
        clearDown(lines: number): string;
        /**<!-- DOCS: out.LineCounter.ansi.clearToCheckpoint ###### -->
         * lc.ansi.clearToCheckpoint
         *
         * Clear lines up to a previously recorded checkpoint
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         *
         * ```typescript
         * const lc = getLineCounter();
         * lc.log('line 1'); // 1
         * lc.log('line 2'); // 1
         * lc.checkpoint('test');
         * lc.log('line 3'); // 1
         * lc.log('line 4'); // 1
         * process.stdout.write(lc.ansi.clearToCheckpoint('test')); // ('line 3' and 'line 4' are cleared)
         * ```
         *
         * @param {string} checkpointID The checkpoint to clear to
         * @returns {string}
         */
        clearToCheckpoint(checkpointID: string): string;
        /**<!-- DOCS: out.LineCounter.ansi.save ###### -->
         * lc.ansi.save
         *
         * Saves the current cursor position and also tracks the line count
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         */
        save(): string;
        /**<!-- DOCS: out.LineCounter.ansi.restore ###### -->
         * lc.ansi.restore
         *
         * Restores to the previously saved cursor position and also tracks the line count
         *
         * > **WARNING:** lc.ansi functions update the line count, but don't apply the affect themselves. You must print the returned string to apply the affect.
         */
        restore(): string;
    };
}

/**<!-- DOCS: out.Breadcrumb #### -->
 * Breadcrumb
 *
 * - `out.Breadcrumb`
 * - `Breadcrumb`
 *
 * Return type for getBreadcrumb
 */
declare type Breadcrumb$1 = {
    (...tempNames: string[]): Breadcrumb$1;
    setColours: (colours: WrapFn[]) => void;
    add: (...names: string[]) => number;
    getNames: (...tempNames: string[]) => any[];
    sub: (...tempNames: string[]) => Breadcrumb$1;
    get(...tempNames: string[]): string;
    toString(): string;
};

/**<!-- DOCS: out ##! -->
 * out
 *
 * A collection of functions to print to the console
 */
declare namespace out {
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
     * @param {string} text
     * @returns {number}
     */
    export const getWidth: (text: string) => number;
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
    export const pad: (line: string, start: number, end: number, replaceChar?: string) => string;
    export type AlignType = 'left' | 'right' | 'center' | 'justify';
    type AlignFunction = (item: any, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
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
    export const center: AlignFunction;
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
    export const left: AlignFunction;
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
    export const right: AlignFunction;
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
    export const justify: AlignFunction;
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
    export const leftLines: (lines: string[], width?: number) => string[];
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
    export const centerLines: (lines: string[], width?: number) => string[];
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
    export const rightLines: (lines: string[], width?: number) => string[];
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
    export const justifyLines: (lines: string[], width?: number) => string[];
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
    export const align: (item: any, direction: AlignType, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
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
    export const split: (leftItem: any, rightItem: any, width?: number, replaceChar?: string) => string;
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
    export const wrap: (item: any, width?: number, alignment?: AlignType, forceWidth?: boolean) => string;
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
    export const moveUp: (lines?: number) => void;
    /**<!-- DOCS: out.loading ### @ -->
     * loading
     *
     * - `out.loading`
     *
     * Display an animated loading indicator
     *
     * If the given action returns a string, it will be printed. Otherwise, it will assume the action prints to output itself (and clears the number of lines given as the second argument)
     *
     * ```typescript
     * const loader = out.loading();
     * // ...
     * loader.stop();
     * ```
     * @param {(s: string) => string | void} [action=loadingDefault]
     * @param {number} [lines=1]
     * @param {string[]} [symbols=loadingChars]
     * @returns {{ stop: () => void; }}
     */
    export const loading: (action?: (s: string) => string | void, lines?: number, symbols?: string[]) => {
        stop: () => void;
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
    export const limitToLength: (text: string, maxLength: number) => string;
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
    export const limitToLengthStart: (text: string, maxLength: number) => string;
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
    export const truncate: (text: string, maxLength?: number, suffix?: string) => string;
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
    export const truncateStart: (text: string, maxLength?: number, suffix?: string) => string;
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
    export const concatLineGroups: (...groups: string[][]) => string[];
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
     * @param {ResponsiveOption<T>[]} options
     * @returns {T}
     */
    export const getResponsiveValue: <T extends unknown>(options: ResponsiveOption<T>[]) => T;
    /**<!-- DOCS: out.ResponsiveOption #### -->
     * ResponsiveOption<T>
     *
     * - `out.ResponsiveOption`
     *
     * Configuration for a responsive value (see `getResponsiveValue`)
     *
     * See getResponsiveValue for an example
     */
    export type ResponsiveOption<T> = {
        minColumns?: number;
        value: T;
    };
    /**<!-- DOCS-ALIAS: out.getBreadcrumb -->
     * getBreadcrumb
     * 
     * - `out.getBreadcrumb`
     * - `getBreadcrumb`
     * 
     * Provides a consistent format and style for questions/prompts
     * 
     * ```typescript
     * const bread = getBreadcrumb();
     * bread() // ''
     * bread('a') // 'a'
     * bread('a', 'b') // 'a › b'
     * bread('a', 'b', 'c') // 'a › b › c'
     * 
     * const sub = bread.sub('a', 'b');
     * sub(); // 'a › b'
     * sub('c') // 'a › b › c'
     * sub('c', 'd') // 'a › b › c › d'
     * 
     * const subsub = sub.sub('c', 'd');
     * subsub(); // 'a › b › c › d'
     * subsub('e'); // 'a › b › c › d › e'
     * ```
     * @param {...string} [baseNames]
     * @returns {Breadcrumb}
     */
    export const getBreadcrumb: (...baseNames: string[]) => Breadcrumb$1;
    /**<!-- DOCS-ALIAS: out.Breadcrumb -->
     * Breadcrumb
     * 
     * - `out.Breadcrumb`
     * - `Breadcrumb`
     * 
     * Return type for getBreadcrumb
     */
    export type Breadcrumb = Breadcrumb$1;
    /**<!-- DOCS-ALIAS: out.getLineCounter -->
     * getLineCounter
     * 
     * - `out.getLineCounter`
     * - `getLineCounter`
     * 
     * Get line counter for counter output lines
     * 
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.wrap(undefined, () => console.log('a single line')); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
     * @returns {LineCounter}
     */
    export const getLineCounter: () => LineCounter$1;
    /**<!-- DOCS-ALIAS: out.LineCounter -->
     * LineCounter
     * 
     * - `out.LineCounter`
     * - `LineCounter`
     * 
     * Return type for getLineCounter
     * 
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.wrap(1, () => console.log('a single line')); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
     */
    export type LineCounter = LineCounter$1;
    /**<!-- DOCS-ALIAS: out.ansi -->
     * ansi
     * 
     * - `ansi`
     * - `out.ansi`
     * 
     * ANSI escape codes for terminal manipulation
     */
    export const ansi: AnsiEscapeCodes;
    /**<!-- DOCS: out.utils 291 ### -->
     * utils
     */
    export namespace utils {
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
        const getTerminalWidth: () => number;
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
        const getLines: (text: Text) => string[];
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
        const getNumLines: (text: Text) => number;
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
        const getLinesWidth: (text: Text) => number;
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
        const getLogLines: (item: any) => string[];
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
        const getNumLogLines: (item: Text) => number;
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
        const getLogLinesWidth: (item: Text) => number;
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
        const joinLines: (lines: string[]) => string;
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
        const hasColor: (str: string) => boolean;
        /**<!-- DOCS: out.utils.stripAnsi #### 291 @ -->
         * stripAnsi
         *
         * - `out.utils.stripAnsi`
         *
         * Removes all ANSI escape codes from a string. This includes any colour or styling added by colr or libraries like chalk.
         * @param {string} text
         * @returns {string}
         */
        const stripAnsi: (text: string) => string;
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
        const getEmojiRegex: (flags?: string) => RegExp;
    }
    export {};
}
/**<!-- DOCS-ALIAS: out.getBreadcrumb -->
 * getBreadcrumb
 * 
 * - `out.getBreadcrumb`
 * - `getBreadcrumb`
 * 
 * Provides a consistent format and style for questions/prompts
 * 
 * ```typescript
 * const bread = getBreadcrumb();
 * bread() // ''
 * bread('a') // 'a'
 * bread('a', 'b') // 'a › b'
 * bread('a', 'b', 'c') // 'a › b › c'
 * 
 * const sub = bread.sub('a', 'b');
 * sub(); // 'a › b'
 * sub('c') // 'a › b › c'
 * sub('c', 'd') // 'a › b › c › d'
 * 
 * const subsub = sub.sub('c', 'd');
 * subsub(); // 'a › b › c › d'
 * subsub('e'); // 'a › b › c › d › e'
 * ```
 * @param {...string} [baseNames]
 * @returns {Breadcrumb}
 */
declare const getBreadcrumb: (...baseNames: string[]) => Breadcrumb$1;
/**<!-- DOCS-ALIAS: out.Breadcrumb -->
 * Breadcrumb
 * 
 * - `out.Breadcrumb`
 * - `Breadcrumb`
 * 
 * Return type for getBreadcrumb
 */
declare type Breadcrumb = Breadcrumb$1;
/**<!-- DOCS-ALIAS: out.getLineCounter -->
 * getLineCounter
 * 
 * - `out.getLineCounter`
 * - `getLineCounter`
 * 
 * Get line counter for counter output lines
 * 
 * ```typescript
 * const lc = getLineCounter();
 * lc.log('hello'); // 1
 * lc.wrap(undefined, () => console.log('a single line')); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 * @returns {LineCounter}
 */
declare const getLineCounter: () => LineCounter$1;
/**<!-- DOCS-ALIAS: out.LineCounter -->
 * LineCounter
 * 
 * - `out.LineCounter`
 * - `LineCounter`
 * 
 * Return type for getLineCounter
 * 
 * ```typescript
 * const lc = getLineCounter();
 * lc.log('hello'); // 1
 * lc.wrap(1, () => console.log('a single line')); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 */
declare type LineCounter = LineCounter$1;
/**<!-- DOCS-ALIAS: out.ansi -->
 * ansi
 * 
 * - `ansi`
 * - `out.ansi`
 * 
 * ANSI escape codes for terminal manipulation
 */
declare const ansi: AnsiEscapeCodes;

interface Handles<T = any> {
    start: T;
    end: T;
}

interface PromptChoiceFull<T> {
    title: string;
    value: T;
    preselected: boolean;
    index: number;
}

interface ScrolledItems<T> {
    items: T[];
    startingIndex: number;
    hoveredIndex: number;
    doesScrollUp: boolean;
    doesScrollDown: boolean;
}

declare type FormatPromptFn = (question: string | Breadcrumb, value: string, items: string | undefined, errorMessage: string | undefined, theme: AskOptionsForState, isComplete: boolean, isExit: boolean) => string;
declare type FormatItemsFn = <T extends unknown>(allItems: PromptChoiceFull<T>[], scrolledItems: ScrolledItems<PromptChoiceFull<T>>, selected: number[] | undefined, type: 'single' | 'multi', theme: AskOptionsForState, isExit: boolean) => string;

interface BoxSymbols {
    horizontal: string;
    vertical: string;
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    separatorLeft: string;
    separatorHorizontal: string;
    separatorRight: string;
}
declare type OptionsState = 'normal' | 'error' | 'done';
/**
 * AskOptionsItemSet<T>
 *
 * Set of options, one for each state (normal, error, done)
 */
declare type AskOptionsItemSet<T> = {
    [key in OptionsState]: T;
};
declare namespace ask$1 {
    /**<!-- DOCS: ask.AskOptions ###! 198 -->
     * AskOptions
     *
     * - `ask.AskOptions`
     *
     * Options to customise the behaviour/appearance of the `ask` prompts.
     *
     * Use with `ask.customise` to set these options.
     */
    interface AskOptions {
        /**<!-- DOCS: ask.AskOptions.general #### 198 -->
         * `general` Options
         *
         * - `ask.AskOptions.general`
         *
         * General options for customising ask prompts
         *
         * | Name                           | Type                | Description                                                        |
         * |--------------------------------|---------------------|--------------------------------------------------------------------|
         * | themeColour                    | `string` (Colour)   | Set the main theme colour                                          |
         * | lc                             | `LineCounter`       | A line counter that all ask prompts will add to when complete      |
         * | boxType                        | `'thin' \| 'thick'` | What type of box drawing lines to use                              |
         * | beeps                          | `boolean`           | Whether to make an audio beeps when appropriate                    |
         * | maxItemsOnScreen               | `number`            | How many select/multiselect items to have on screen at most        |
         * | scrollMargin                   | `number`            | How much space to leaving when 'scrolling' lists of items          |
         * | fileExplorerColumnWidth        | `number`            | How wide to make each panel of the fileExplorer interface          |
         * | fileExplorerMaxItems           | `number`            | How many items to show in each panel of the fileExplorer interface |
         * | tableSelectMaxHeightPercentage | `number`            | Percent of terminal height to use at max for table selects         |
         * | timelineSpeed                  | `number`            | How many frames to move on a timeline at a time                    |
         * | timelineFastSpeed              | `number`            | How many frames to move on a timeline at a time (fast mode)        |
         */
        general?: {
            /** Set the main theme colour */
            themeColour?: 'white' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'darkWhite' | 'lightBlack' | 'darkRed' | 'darkGreen' | 'darkYellow' | 'darkBlue' | 'darkMagenta' | 'darkCyan' | 'grey' | 'gray';
            /** A line counter that all ask prompts will add to when complete */
            lc?: LineCounter;
            /** What type of box drawing lines to use */
            boxType?: 'thin' | 'thick';
            /** Whether to make an audio beeps when appropriate */
            beeps?: boolean;
            /** How many select/multiselect items to have on screen at most */
            maxItemsOnScreen?: number;
            /** How much space to leaving when 'scrolling' lists of items */
            scrollMargin?: number;
            /** How wide to make each panel of the fileExplorer interface */
            fileExplorerColumnWidth?: number;
            /** How many items to show in each panel of the fileExplorer interface */
            fileExplorerMaxItems?: number;
            /** Percent of terminal height to use at max for table selects */
            tableSelectMaxHeightPercentage?: number;
            /** How many frames to move on a timeline at a time */
            timelineSpeed?: number;
            /** How many frames to move on a timeline at a time (fast mode) */
            timelineFastSpeed?: number;
        };
        /**<!-- DOCS: ask.AskOptions.text #### 198 -->
         * `text` Options
         *
         * - `ask.AskOptions.text`
         *
         * English natural-language elements that you may wish to localise
         *
         * | Name                               | Type                       | Description                                                 |
         * |------------------------------------|----------------------------|-------------------------------------------------------------|
         * | boolTrueKeys                       | `string`                   | What buttons to use to indicate `true` for boolean prompts  |
         * | boolFalseKeys                      | `string`                   | What buttons to use to indicate `false` for boolean prompts |
         * | boolYes                            | `string`                   | 'Yes'                                                       |
         * | boolNo                             | `string`                   | 'No'                                                        |
         * | boolYesNoSeparator                 | `string`                   | '/'                                                         |
         * | boolYN                             | `string`                   | '(Y/n)'                                                     |
         * | selectAll                          | `string`                   | '[Select All]'                                              |
         * | done                               | `string`                   | 'done'                                                      |
         * | items                              | `(num: number) => string`  | '[X items]'                                                 |
         * | countdown                          | `(secs: number) => string` | 'Starting in Xs...'                                         |
         * | file                               | `string`                   | 'File'                                                      |
         * | directory                          | `string`                   | 'Directory'                                                 |
         * | loading                            | `string`                   | 'Loading...'                                                |
         * | selected                           | `(num: number) => string`  | 'X selected'                                                |
         * | specialNewFolderEnterNothingCancel | `string`                   | 'Enter nothing to cancel'                                   |
         * | specialNewFolderAddingFolderTo     | `string`                   | 'Adding folder to '                                         |
         * | specialNewFolderQuestion           | `(hl: any) => string`      | 'What do you want to name the new folder?'                  |
         * | specialSaveFileSavingFileTo        | `string`                   | 'Saving file to '                                           |
         * | specialSaveFileQuestion            | `(hl: any) => string`      | 'What do you want to name the file?'                        |
         */
        text?: {
            /** What buttons to use to indicate `true` for boolean prompts */
            boolTrueKeys?: string;
            /** What buttons to use to indicate `false` for boolean prompts */
            boolFalseKeys?: string;
            /** 'Yes' */
            boolYes?: string;
            /** 'No' */
            boolNo?: string;
            /** '/' */
            boolYesNoSeparator?: string;
            /** '(Y/n)' */
            boolYN?: string;
            /** '[Select All]' */
            selectAll?: string;
            /** 'done' */
            done?: string;
            /** '[X items]' */
            items?: (count: number) => string;
            /** 'Starting in Xs...' */
            countdown?: (secondsRemaining: number) => string;
            /** 'File' */
            file?: string;
            /** 'Directory' */
            directory?: string;
            /** 'Loading...' */
            loading?: string;
            /** 'X selected' */
            selected?: (count: number) => string;
            /** 'Enter nothing to cancel' */
            specialNewFolderEnterNothingCancel?: string;
            /** 'Adding folder to ' */
            specialNewFolderAddingFolderTo?: string;
            /** 'What do you want to name the new folder?' */
            specialNewFolderQuestion?: (hl: any) => string;
            /** 'Saving file to ' */
            specialSaveFileSavingFileTo?: string;
            /** 'What do you want to name the file?' */
            specialSaveFileQuestion?: (hl: any) => string;
        };
        /**<!-- DOCS: ask.AskOptions.formatters ####! 198 -->
         * `formatters` Options
         *
         * - `ask.AskOptions.formatters`
         *
         * Functions for formatting how the prompts should display
         */
        formatters?: {
            /**<!-- DOCS: ask.AskOptions.formatters.formatPrompt ##### 198 -->
             * `formatPrompt`
             *
             * - `ask.AskOptions.formatters.formatPrompt`
             *
             * How to format the prompts
             *
             * Presets: `oneLine`, `halfBox`, `halfBoxClosed`, `fullBox`, `fullBoxClosed`
             *
             * Type:
             * ```typescript
             * (
             *   question: string | Breadcrumb,
             *   value: string,
             *   items: string | undefined,
             *   errorMessage: string | undefined,
             *   theme: AskOptionsForState,
             *   isComplete: boolean,
             *   isExit: boolean
             * ) => string;
             * ```
             */
            formatPrompt?: 'oneLine' | 'halfBox' | 'halfBoxClosed' | 'fullBox' | 'fullBoxClosed' | FormatPromptFn;
            /**<!-- DOCS: ask.AskOptions.formatters.formatItems ##### 198 -->
             * `formatItems`
             *
             * - `ask.AskOptions.formatters.formatItems`
             *
             * How to format lists of items
             *
             * Presets: `block`, `blockAlt`, `simple`, `simpleAlt`
             *
             * Type:
             * ```typescript
             * <T extends unknown>(
             *   allItems: PromptChoiceFull<T>[],
             *   scrolledItems: ScrolledItems<PromptChoiceFull<T>>,
             *   selected: number[] | undefined,
             *   type: 'single' | 'multi',
             *   theme: AskOptionsForState,
             *   isExit: boolean
             * ) => string;
             * ```
             */
            formatItems?: 'block' | 'blockAlt' | 'simple' | 'simpleAlt' | FormatItemsFn;
        };
        /**<!-- DOCS: ask.AskOptions.colours #### 198 -->
         * `colours` Options
         *
         * - `ask.AskOptions.colours`
         *
         * Colours for all the different elements
         *
         * All colours can be a single `WrapFn` value, or a set of `WrapFn` values, one for each state (normal, error, done)
         * When single value, it is used for all states. When only a few states are set, the others will remain unchanged.
         *
         * | Name                     | Description                                                                                     |
         * |--------------------------|-------------------------------------------------------------------------------------------------|
         * | decoration               | General decoration and cosmetics                                                                |
         * | questionText             | The text of the question of the prompt                                                          |
         * | specialIcon              | Special icon for the 'state'                                                                    |
         * | openingIcon              | The initial/opening icon                                                                        |
         * | promptIcon               | The icon that indicates where you are typing                                                    |
         * | result                   | General result                                                                                  |
         * | resultText               | String results                                                                                  |
         * | resultNumber             | Number results                                                                                  |
         * | resultBoolean            | Boolean results                                                                                 |
         * | resultArray              | Array results                                                                                   |
         * | resultDate               | Date results                                                                                    |
         * | loadingIcon              | Icon for ask.loading                                                                            |
         * | errorMsg                 | The error message (if there is one)                                                             |
         * | item                     | A normal item in a list                                                                         |
         * | itemIcon                 | Icon for a normal item in a list                                                                |
         * | itemHover                | A hovered item in a list                                                                        |
         * | itemHoverIcon            | Icon for a hovered item in a list                                                               |
         * | itemBlockHover           | A hovered item in a list (block mode)                                                           |
         * | itemBlockHoverIcon       | Icon for a hovered item in a list (block mode)                                                  |
         * | itemSelected             | A selected item in a list                                                                       |
         * | itemSelectedIcon         | Icon for a selected item in a list                                                              |
         * | itemUnselected           | An unselected item in a list                                                                    |
         * | itemUnselectedIcon       | Icon for an unselected item in a list                                                           |
         * | scrollbarTrack           | The track for the scrollbar                                                                     |
         * | scrollbarBar             | The bar for the scrollbar                                                                       |
         * | selectAllText            | 'Select All' item in a multi-select                                                             |
         * | boolYNText               | The '(Y/n)' bit for the booleanYN prompt                                                        |
         * | countdown                | ask.countdown                                                                                   |
         * | pause                    | ask.pause                                                                                       |
         * | specialHover             | The focus of what the user is controlling (for dates, fileExplorer, etc)                        |
         * | specialSelected          | Something that has been selected (for dates, fileExplorer, etc)                                 |
         * | specialHighlight         | More important that normal (e.g. date within a range) (for dates, fileExplorer, etc)            |
         * | specialNormal            | Normal items (for dates, fileExplorer, etc)                                                     |
         * | specialFaded             | Not important (for dates, fileExplorer, etc)                                                    |
         * | specialHint              | Hints/tips/advice (for dates, fileExplorer, etc)                                                |
         * | specialInactiveHover     | The focus of what the user is controlling (Inactive) (for dates, fileExplorer, etc)             |
         * | specialInactiveSelected  | Something that has been selected (Inactive) (for dates, fileExplorer, etc)                      |
         * | specialInactiveHighlight | More important that normal (e.g. date within a range) (Inactive) (for dates, fileExplorer, etc) |
         * | specialInactiveNormal    | Normal items (Inactive) (for dates, fileExplorer, etc)                                          |
         * | specialInactiveFaded     | Not important (Inactive) (for dates, fileExplorer, etc)                                         |
         * | specialInactiveHint      | Hints/tips/advice (Inactive) (for dates, fileExplorer, etc)                                     |
         * | specialInfo              | Action bar at bottom (for dates, fileExplorer, etc)                                             |
         * | specialErrorMsg          | Error messages (for dates, fileExplorer, etc)                                                   |
         * | specialErrorIcon         | Icon for errors (for dates, fileExplorer, etc)                                                  |
         * | tableSelectHover         | Hover for table selects only (shouldn't be 'block'/bg styles)                                   |
         * | timelineTrack            | The (inactive) track of a timeline                                                              |
         * | timelineTrackActive      | The active track of a timeline                                                                  |
         * | timelineHandle           | The (inactive) control handle on a timeline                                                     |
         * | timelineHandleActive     | The active control handle on a timeline                                                         |
         */
        colours?: {
            /** General decoration and cosmetics */
            decoration?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The text of the question of the prompt */
            questionText?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Special icon for the 'state' */
            specialIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The initial/opening icon */
            openingIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The icon that indicates where you are typing */
            promptIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** General result */
            result?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** String results */
            resultText?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Number results */
            resultNumber?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Boolean results */
            resultBoolean?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Array results */
            resultArray?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Date results */
            resultDate?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for ask.loading */
            loadingIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The error message (if there is one) */
            errorMsg?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** A normal item in a list */
            item?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for a normal item in a list */
            itemIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** A hovered item in a list */
            itemHover?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for a hovered item in a list */
            itemHoverIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** A hovered item in a list (block mode) */
            itemBlockHover?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for a hovered item in a list (block mode) */
            itemBlockHoverIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** A selected item in a list */
            itemSelected?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for a selected item in a list */
            itemSelectedIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** An unselected item in a list */
            itemUnselected?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for an unselected item in a list */
            itemUnselectedIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The track for the scrollbar */
            scrollbarTrack?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The bar for the scrollbar */
            scrollbarBar?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** 'Select All' item in a multi-select */
            selectAllText?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The '(Y/n)' bit for the booleanYN prompt */
            boolYNText?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** ask.countdown */
            countdown?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** ask.pause */
            pause?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The focus of what the user is controlling (for dates, fileExplorer, etc) */
            specialHover?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Something that has been selected (for dates, fileExplorer, etc) */
            specialSelected?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** More important that normal (e.g. date within a range) (for dates, fileExplorer, etc) */
            specialHighlight?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Normal items (for dates, fileExplorer, etc) */
            specialNormal?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Not important (for dates, fileExplorer, etc) */
            specialFaded?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Hints/tips/advice (for dates, fileExplorer, etc) */
            specialHint?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The focus of what the user is controlling (Inactive) (for dates, fileExplorer, etc) */
            specialInactiveHover?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Something that has been selected (Inactive) (for dates, fileExplorer, etc) */
            specialInactiveSelected?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** More important that normal (e.g. date within a range) (Inactive) (for dates, fileExplorer, etc) */
            specialInactiveHighlight?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Normal items (Inactive) (for dates, fileExplorer, etc) */
            specialInactiveNormal?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Not important (Inactive) (for dates, fileExplorer, etc) */
            specialInactiveFaded?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Hints/tips/advice (Inactive) (for dates, fileExplorer, etc) */
            specialInactiveHint?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Action bar at bottom (for dates, fileExplorer, etc) */
            specialInfo?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Error messages (for dates, fileExplorer, etc) */
            specialErrorMsg?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Icon for errors (for dates, fileExplorer, etc) */
            specialErrorIcon?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** Hover for table selects only (shouldn't be 'block'/bg styles) */
            tableSelectHover?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The (inactive) track of a timeline */
            timelineTrack?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The active track of a timeline */
            timelineTrackActive?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The (inactive) control handle on a timeline */
            timelineHandle?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
            /** The active control handle on a timeline */
            timelineHandleActive?: WrapFn | {
                normal?: WrapFn;
                error?: WrapFn;
                done?: WrapFn;
            };
        };
        /**<!-- DOCS: ask.AskOptions.symbols #### 198 -->
         * `symbols` Options
         *
         * - `ask.AskOptions.symbols`
         *
         * Variety of symbols and 'icons' for different aspects of the display
         *
         * All symbols can be a single `string` value, or a set of `string` values, one for each state (normal, error, done)
         * When single value, it is used for all states. When only a few states are set, the others will remain unchanged.
         *
         * | Name                     | Description                                                               |
         * |--------------------------|---------------------------------------------------------------------------|
         * | specialIcon              | Special icon for the 'state'                                              |
         * | openingIcon              | The initial/opening icon                                                  |
         * | promptIcon               | The icon that indicates where you are typing                              |
         * | errorMsgPrefix           | Icon shown before error messages                                          |
         * | itemIcon                 | Icon for a normal item in a list                                          |
         * | itemHoverIcon            | Icon for a hovered item in a list                                         |
         * | itemSelectedIcon         | Icon for a selected item in a list                                        |
         * | itemUnselectedIcon       | Icon for an unselected item in a list                                     |
         * | scrollUpIcon             | Used to indicate you can scroll up                                        |
         * | scrollDownIcon           | Used to indicate you can scroll down                                      |
         * | scrollbarTrack           | The track part of the scrollbar                                           |
         * | scrollbarTrackTrimTop    | The trimmed top of the track (half height)                                |
         * | scrollbarTrackTrimBottom | The trimmed bottom of the track (half height)                             |
         * | scrollbarBar             | The bar part of the scrollbar                                             |
         * | scrollbarBarTrimTop      | The trimmed top of the bar (half height)                                  |
         * | scrollbarBarTrimBottom   | The trimmed bottom of the bar (half height)                               |
         * | separatorLine            | Line added by ask.separator                                               |
         * | separatorNodeDown        | Node is ask.separator line that indicates 'down'                          |
         * | separatorNodeNone        | Node is ask.separator line that breaks up the pattern                     |
         * | separatorNodeUp          | Node is ask.separator line that indicates 'up'                            |
         * | specialErrorIcon         | Icon for errors (for dates, fileExplorer, etc)                            |
         * | folderOpenableIcon       | Shown at end of line for folders to show they can be opened (right-wards) |
         * | fileOpenableIcon         | File version of folderOpenableIcon. Typically empty                       |
         * | timelineTrack            | The track of a timeline                                                   |
         * | timelineHandle           | The control handle on a timeline                                          |
         * | timelineBar              | The 'bar' (active portion) of a timeline                                  |
         */
        symbols?: {
            /** Special icon for the 'state' */
            specialIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The initial/opening icon */
            openingIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The icon that indicates where you are typing */
            promptIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Icon shown before error messages */
            errorMsgPrefix?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Icon for a normal item in a list */
            itemIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Icon for a hovered item in a list */
            itemHoverIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Icon for a selected item in a list */
            itemSelectedIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Icon for an unselected item in a list */
            itemUnselectedIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Used to indicate you can scroll up */
            scrollUpIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Used to indicate you can scroll down */
            scrollDownIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The track part of the scrollbar */
            scrollbarTrack?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The trimmed top of the track (half height) */
            scrollbarTrackTrimTop?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The trimmed bottom of the track (half height) */
            scrollbarTrackTrimBottom?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The bar part of the scrollbar */
            scrollbarBar?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The trimmed top of the bar (half height) */
            scrollbarBarTrimTop?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The trimmed bottom of the bar (half height) */
            scrollbarBarTrimBottom?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Line added by ask.separator */
            separatorLine?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Node is ask.separator line that indicates 'down' */
            separatorNodeDown?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Node is ask.separator line that breaks up the pattern */
            separatorNodeNone?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Node is ask.separator line that indicates 'up' */
            separatorNodeUp?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Icon for errors (for dates, fileExplorer, etc)  */
            specialErrorIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** Shown at end of line for folders to show they can be opened (right-wards) */
            folderOpenableIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** File version of folderOpenableIcon. Typically empty */
            fileOpenableIcon?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The track of a timeline */
            timelineTrack?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The control handle on a timeline */
            timelineHandle?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
            /** The 'bar' (active portion) of a timeline */
            timelineBar?: string | {
                normal?: string;
                error?: string;
                done?: string;
            };
        };
    }
}
interface AskOptionsStoredGeneral {
    themeColour: 'white' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'darkWhite' | 'lightBlack' | 'darkRed' | 'darkGreen' | 'darkYellow' | 'darkBlue' | 'darkMagenta' | 'darkCyan' | 'grey' | 'gray';
    lc: LineCounter;
    boxType: 'thin' | 'thick';
    beeps: boolean;
    maxItemsOnScreen: number;
    scrollMargin: number;
    fileExplorerColumnWidth: number;
    fileExplorerMaxItems: number;
    tableSelectMaxHeightPercentage: number;
    timelineSpeed: number;
    timelineFastSpeed: number;
}
interface AskOptionsStoredText {
    boolTrueKeys: string;
    boolFalseKeys: string;
    boolYes: string;
    boolNo: string;
    boolYesNoSeparator: string;
    boolYN: string;
    selectAll: string;
    done: string;
    items: (count: number) => string;
    countdown: (secondsRemaining: number) => string;
    file: string;
    directory: string;
    loading: string;
    selected: (count: number) => string;
    specialNewFolderEnterNothingCancel: string;
    specialNewFolderAddingFolderTo: string;
    specialNewFolderQuestion: (hl: any) => string;
    specialSaveFileSavingFileTo: string;
    specialSaveFileQuestion: (hl: any) => string;
}
interface AskOptionsStoredFormatters {
    formatPrompt: FormatPromptFn;
    formatItems: FormatItemsFn;
}
interface AskOptionsStoredColours {
    decoration: AskOptionsItemSet<WrapFn>;
    questionText: AskOptionsItemSet<WrapFn>;
    specialIcon: AskOptionsItemSet<WrapFn>;
    openingIcon: AskOptionsItemSet<WrapFn>;
    promptIcon: AskOptionsItemSet<WrapFn>;
    result: AskOptionsItemSet<WrapFn>;
    resultText: AskOptionsItemSet<WrapFn>;
    resultNumber: AskOptionsItemSet<WrapFn>;
    resultBoolean: AskOptionsItemSet<WrapFn>;
    resultArray: AskOptionsItemSet<WrapFn>;
    resultDate: AskOptionsItemSet<WrapFn>;
    loadingIcon: AskOptionsItemSet<WrapFn>;
    errorMsg: AskOptionsItemSet<WrapFn>;
    item: AskOptionsItemSet<WrapFn>;
    itemIcon: AskOptionsItemSet<WrapFn>;
    itemHover: AskOptionsItemSet<WrapFn>;
    itemHoverIcon: AskOptionsItemSet<WrapFn>;
    itemBlockHover: AskOptionsItemSet<WrapFn>;
    itemBlockHoverIcon: AskOptionsItemSet<WrapFn>;
    itemSelected: AskOptionsItemSet<WrapFn>;
    itemSelectedIcon: AskOptionsItemSet<WrapFn>;
    itemUnselected: AskOptionsItemSet<WrapFn>;
    itemUnselectedIcon: AskOptionsItemSet<WrapFn>;
    scrollbarTrack: AskOptionsItemSet<WrapFn>;
    scrollbarBar: AskOptionsItemSet<WrapFn>;
    selectAllText: AskOptionsItemSet<WrapFn>;
    boolYNText: AskOptionsItemSet<WrapFn>;
    countdown: AskOptionsItemSet<WrapFn>;
    pause: AskOptionsItemSet<WrapFn>;
    specialHover: AskOptionsItemSet<WrapFn>;
    specialSelected: AskOptionsItemSet<WrapFn>;
    specialHighlight: AskOptionsItemSet<WrapFn>;
    specialNormal: AskOptionsItemSet<WrapFn>;
    specialFaded: AskOptionsItemSet<WrapFn>;
    specialHint: AskOptionsItemSet<WrapFn>;
    specialInactiveHover: AskOptionsItemSet<WrapFn>;
    specialInactiveSelected: AskOptionsItemSet<WrapFn>;
    specialInactiveHighlight: AskOptionsItemSet<WrapFn>;
    specialInactiveNormal: AskOptionsItemSet<WrapFn>;
    specialInactiveFaded: AskOptionsItemSet<WrapFn>;
    specialInactiveHint: AskOptionsItemSet<WrapFn>;
    specialInfo: AskOptionsItemSet<WrapFn>;
    specialErrorMsg: AskOptionsItemSet<WrapFn>;
    specialErrorIcon: AskOptionsItemSet<WrapFn>;
    tableSelectHover: AskOptionsItemSet<WrapFn>;
    timelineTrack: AskOptionsItemSet<WrapFn>;
    timelineTrackActive: AskOptionsItemSet<WrapFn>;
    timelineHandle: AskOptionsItemSet<WrapFn>;
    timelineHandleActive: AskOptionsItemSet<WrapFn>;
}
interface AskOptionsStoredSymbols {
    specialIcon: AskOptionsItemSet<string>;
    openingIcon: AskOptionsItemSet<string>;
    promptIcon: AskOptionsItemSet<string>;
    errorMsgPrefix: AskOptionsItemSet<string>;
    itemIcon: AskOptionsItemSet<string>;
    itemHoverIcon: AskOptionsItemSet<string>;
    itemSelectedIcon: AskOptionsItemSet<string>;
    itemUnselectedIcon: AskOptionsItemSet<string>;
    scrollUpIcon: AskOptionsItemSet<string>;
    scrollDownIcon: AskOptionsItemSet<string>;
    scrollbarTrack: AskOptionsItemSet<string>;
    scrollbarTrackTrimTop: AskOptionsItemSet<string>;
    scrollbarTrackTrimBottom: AskOptionsItemSet<string>;
    scrollbarBar: AskOptionsItemSet<string>;
    scrollbarBarTrimTop: AskOptionsItemSet<string>;
    scrollbarBarTrimBottom: AskOptionsItemSet<string>;
    separatorLine: AskOptionsItemSet<string>;
    separatorNodeDown: AskOptionsItemSet<string>;
    separatorNodeNone: AskOptionsItemSet<string>;
    separatorNodeUp: AskOptionsItemSet<string>;
    specialErrorIcon: AskOptionsItemSet<string>;
    folderOpenableIcon: AskOptionsItemSet<string>;
    fileOpenableIcon: AskOptionsItemSet<string>;
    timelineTrack: AskOptionsItemSet<string>;
    timelineHandle: AskOptionsItemSet<string>;
    timelineBar: AskOptionsItemSet<string>;
}
interface AskOptionsForState {
    general: AskOptionsStoredGeneral;
    text: AskOptionsStoredText;
    formatters: AskOptionsStoredFormatters;
    colours: OfType<AskOptionsStoredColours, WrapFn>;
    symbols: OfType<AskOptionsStoredSymbols, string> & {
        boxType: 'thin' | 'thick';
    };
    boxSymbols: BoxSymbols;
}

declare type ItemToRowMapFunction<T extends unknown> = (item: T, index: number, items: T[]) => any[];
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
interface AskTableDisplaySettings<T> {
    rows?: any[][] | ItemToRowMapFunction<T>;
    headers?: any[][] | RemapOf<T, string>;
    options?: table.TableOptions;
}

/**<!-- DOCS: ask ##! -->
 * ask
 *
 * A collection of functions to ask the user for input.
 */
declare namespace ask {
    /**<!-- DOCS-ALIAS: ask.text -->
     * text
     * 
     * - `ask.text`
     * 
     * Get a text input from the user.
     * 
     * ```typescript
     * const name = await ask.text('What is your name?'); // 'Jack'
     * ```
     * @param {string | Breadcrumb} question
     * @param {string} [initial]
     * @param {(value: string) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<string>}
     */
    const text: (question: string | Breadcrumb$1, initial?: string, validate?: (value: string) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<string>;
    /**<!-- DOCS-ALIAS: ask.autotext -->
     * autotext
     * 
     * - `ask.autotext`
     * 
     * Get a text input from the user, with auto-completion.
     * 
     * ```typescript
     * const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
     * ```
     * @param {string | Breadcrumb} question
     * @param {ask.PromptChoice<T>[]} choices
     * @param {T | string} [initial]
     * @param {(item: T, index: number, typedValue: string) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<T>}
     */
    const autotext: <T = string>(question: string | Breadcrumb$1, choices: PromptChoice<T>[], initial?: string | T, validate?: (item: T, index: number, typedValue: string) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<T>;
    /**<!-- DOCS-ALIAS: ask.number -->
     * number
     * 
     * - `ask.number`
     * 
     * Get a number input from the user.
     * 
     * ```typescript
     * const age = await ask.number('How old are you?'); // 30
     * ```
     * @param {string | Breadcrumb} question
     * @param {number} [initial]
     * @param {(value: number) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<number>}
     */
    const number: (question: string | Breadcrumb$1, initial?: number, validate?: (value: number) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<number>;
    /**<!-- DOCS-ALIAS: ask.boolean -->
     * boolean
     * 
     * - `ask.boolean`
     * 
     * Get a boolean input from the user (yes or no)
     * 
     * ```typescript
     * const isCool = await ask.boolean('Is this cool?'); // true
     * ```
     * @param {string | Breadcrumb} question
     * @param {boolean} [initial=true]
     * @param {(value: boolean) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<boolean>}
     */
    const boolean: (question: string | Breadcrumb$1, initial?: boolean, validate?: (value: boolean) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<boolean>;
    /**<!-- DOCS-ALIAS: ask.booleanYN -->
     * booleanYN
     * 
     * - `ask.booleanYN`
     * 
     * Get a boolean input from the user (yes or no)
     * 
     * Alternative interface to ask.boolean
     * 
     * ```typescript
     * const isCool = await ask.booleanYN('Is this cool?'); // true
     * ```
     * @param {string | Breadcrumb} question
     * @param {(value: boolean) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<boolean>}
     */
    const booleanYN: (question: string | Breadcrumb$1, validate?: (value: boolean) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<boolean>;
    /**<!-- DOCS-ALIAS: ask.select -->
     * select
     * 
     * - `ask.select`
     * 
     * Get the user to select an option from a list.
     * 
     * ```typescript
     * const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
     * ```
     * @param {string | Breadcrumb} question
     * @param {ask.PromptChoice<T>[]} choices
     * @param {ask.PromptChoice<T> | number} [initial]
     * @param {(item: T, index: number) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<T>}
     */
    const select: <T = string>(question: string | Breadcrumb$1, choices: PromptChoice<T>[], initial?: number | PromptChoice<T>, validate?: (item: T, index: number) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<T>;
    /**<!-- DOCS-ALIAS: ask.multiselect -->
     * multiselect
     * 
     * - `ask.multiselect`
     * 
     * Get the user to select multiple opts from a list.
     * 
     * ```typescript
     * const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
     * ```
     * @param {string | Breadcrumb} question
     * @param {ask.PromptChoice<T>[]} choices
     * @param {ask.PromptChoice<T> | ask.PromptChoice<T>[] | number | number[]} [initial]
     * @param {(items: T[], indexes: number[]) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<T[]>}
     */
    const multiselect: <T = string>(question: string | Breadcrumb$1, choices: PromptChoice<T>[], initial?: number | number[] | PromptChoice<T> | PromptChoice<T>[], validate?: (items: T[], indexes: number[]) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<T[]>;
    /**<!-- DOCS-ALIAS: ask.date -->
     * date
     * 
     * - `ask.date`
     * 
     * Get a date input from the user.
     * 
     * ```typescript
     * const date = await ask.date('Whats the date?');
     * // [Date: 2023-01-01T12:00:00.000Z] (user inputted date, always at 12 midday)
     * ```
     * @param {string | Breadcrumb} [questionText]
     * @param {Date} [initial]
     * @param {(date: Date) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<Date>}
     */
    const date: (questionText?: string | Breadcrumb$1, initial?: Date, validate?: (date: Date) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<Date>;
    /**<!-- DOCS-ALIAS: ask.time -->
     * time
     * 
     * - `ask.time`
     * 
     * Get a time input from the user.
     * 
     * ```typescript
     * const time = await ask.time('Whats the time?');
     * // [Date: 2023-01-01T12:00:00.000Z] (user inputted time, with todays date)
     * 
     * const time2 = await ask.time('Whats the time?', new Date('1999-12-31'));
     * // [Date: 1999-12-31T12:00:00.000Z] (user inputted time, with same date as initial)
     * ```
     * @param {string | Breadcrumb} [questionText]
     * @param {Date} [initial]
     * @param {(date: Date) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<Date>}
     */
    const time: (questionText?: string | Breadcrumb$1, initial?: Date, validate?: (date: Date) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<Date>;
    /**<!-- DOCS-ALIAS: ask.datetime -->
     * datetime
     * 
     * - `ask.datetime`
     * 
     * Get a date and time input from the user.
     * 
     * ```typescript
     * const when = await ask.datetime('Whats the date/time?');
     * // [Date: 2023-03-05T20:30:00.000Z] (user inputted time & date)
     * ```
     * @param {string | Breadcrumb} [questionText]
     * @param {Date} [initial]
     * @param {(date: Date) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<Date>}
     */
    const datetime: (questionText?: string | Breadcrumb$1, initial?: Date, validate?: (date: Date) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<Date>;
    /**<!-- DOCS-ALIAS: ask.dateRange -->
     * dateRange
     * 
     * - `ask.dateRange`
     * 
     * Get a date range input from the user.
     * 
     * ```typescript
     * const range = await ask.dateRange('When is the festival?');
     * // [
     * //   [Date: 2023-03-01T12:00:00.000Z],
     * //   [Date: 2023-03-31T12:00:00.000Z]
     * // ]
     * ```
     * @param {string | Breadcrumb} [questionText]
     * @param {Date} [initialStart]
     * @param {Date} [initialEnd]
     * @param {(dates: [Date, Date]) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<[Date, Date]>}
     */
    const dateRange: (questionText?: string | Breadcrumb$1, initialStart?: Date, initialEnd?: Date, validate?: (dates: [Date, Date]) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<[Date, Date]>;
    /**<!-- DOCS-ALIAS: ask.fileExplorer -->
     * fileExplorer
     * 
     * - `ask.fileExplorer`
     * 
     * Get a file or folder path from the user.
     * 
     * ```typescript
     * const file = await ask.fileExplorer('What file?', 'f');
     * // '/Users/user/Documents/some_file.txt'
     * 
     * const dir = await ask.fileExplorer('What file?', 'd', '/Users/jackcannon/Documents');
     * // '/Users/jackcannon/Documents/some_folder'
     * ```
     * @param {string | Breadcrumb} questionText
     * @param {'d' | 'f'} [selectType='f']
     * @param {string} [startPath=process.cwd()]
     * @param {(path: string) => Error | string | boolean | void} [validate]
     * @returns {Promise<string>}
     */
    const fileExplorer: (questionText: string | Breadcrumb$1, selectType?: "d" | "f", startPath?: string, validate?: (path: string) => string | boolean | void | Error) => Promise<string>;
    /**<!-- DOCS-ALIAS: ask.multiFileExplorer -->
     * multiFileExplorer
     * 
     * - `ask.multiFileExplorer`
     * 
     * Get multiple file or folder paths from the user.
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
     * @param {(paths: string[]) => Error | string | boolean | void} [validate]
     * @returns {Promise<string[]>}
     */
    const multiFileExplorer: (questionText: string | Breadcrumb$1, selectType?: "d" | "f", startPath?: string, validate?: (paths: string[]) => string | boolean | void | Error) => Promise<string[]>;
    /**<!-- DOCS-ALIAS: ask.saveFileExplorer -->
     * saveFileExplorer
     * 
     * - `ask.saveFileExplorer`
     * 
     * Get a file path from the user, with the intention of saving a file to that path.
     * 
     * ```typescript
     * const HOME_DIR = '/Users/user/Documents';
     * const savePath = await ask.saveFileExplorer('Save file', HOME_DIR, 'data.json');
     * // '/Users/user/Documents/data.json'
     * ```
     * @param {string | Breadcrumb} questionText
     * @param {string} [startPath=process.cwd()]
     * @param {string} [suggestedFileName='']
     * @param {(dir: string, filename?: string) => Error | string | boolean | void} [validate]
     * @returns {Promise<string>}
     */
    const saveFileExplorer: (questionText: string | Breadcrumb$1, startPath?: string, suggestedFileName?: string, validate?: (dir: string, filename?: string) => string | boolean | void | Error) => Promise<string>;
    /**<!-- DOCS-ALIAS: ask.table -->
     * table
     * 
     * A collection of functions for asking questions with tables.
     */
    namespace table {
        /**<!-- DOCS-ALIAS: ask.table.select -->
         * table.select
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
        const select: <T extends unknown>(question: string | Breadcrumb$1, items: T[], settings?: AskTableDisplaySettings<T>, initial?: number | T, validate?: (item: T) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<T>;
        /**<!-- DOCS-ALIAS: ask.table.multiselect -->
         * table.multiselect
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
        const multiselect: <T extends unknown>(question: string | Breadcrumb$1, items: T[], settings?: AskTableDisplaySettings<T>, initial?: number[] | T[], validate?: (items: T[]) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<T[]>;
    }
    /**<!-- DOCS-ALIAS: ask.trim -->
     * trim
     * 
     * - `ask.trim`
     * 
     * Get a start and end frame from the user
     * @param {string | Breadcrumb} question
     * @param {number} totalFrames
     * @param {number} [frameRate=60]
     * @param {Partial<Handles<number>>} [initial]
     * @param {(handles: Handles<number>) => Error | string | boolean | void} [validate]
     * @param {LineCounter} [lc]
     * @returns {Promise<Handles<number>>}
     */
    const trim: (question: string | Breadcrumb$1, totalFrames: number, frameRate?: number, initial?: Partial<Handles<number>>, validate?: (handles: Handles<number>) => string | boolean | void | Error, lc?: LineCounter$1) => Promise<Handles<number>>;
    /**<!-- DOCS: ask.ExtraHeader ### @ -->
     * Extra
     *
     * These are ask functions that don't prompt the user, but can help manage or organise how you use prompts
     */
    /**<!-- DOCS-ALIAS: ask.customise -->
     * customise
     * 
     * - `ask.customise`
     * 
     * Customise the behaviour/appearance of the `ask` prompts.
     * 
     * See `ask.AskOptions` for the options available.
     * 
     * ```typescript
     * ask.customise({ general: { themeColour: 'magenta' } }); // change the theme colour to magenta
     * ask.customise({ general: { lc } }); // set a line counter for that all prompts will add to when complete
     * ask.customise({ formatters: { formatPrompt: 'fullBox' } }); // change the format of the prompt
     * ```
     * @param {Partial<ask.AskOptions>} options
     * @returns {void}
     */
    const customise: (options: Partial<ask$1.AskOptions>) => void;
    /**<!-- DOCS: ask.loading #### @ -->
     * loading
     *
     * - `ask.loading`
     *
     * Display an animated loading indicator that imitates the display of a prompt
     *
     * Intended to be indicate a question is coming, but something is loading first. For general 'loading' indicators, use `out.loading`.
     *
     * ```typescript
     * const loader = ask.loading('What is your name?');
     * // ...
     * loader.stop();
     * ```
     * @param {string | Breadcrumb} question
     * @param {boolean} [isComplete=false]
     * @param {boolean} [isError=false]
     * @param {LineCounter} [lc]
     * @returns {{ stop: () => void; }}
     */
    const loading: (question: string | Breadcrumb$1, isComplete?: boolean, isError?: boolean, lc?: LineCounter) => {
        stop: () => void;
    };
    /**<!-- DOCS: ask.countdown #### @ -->
     * countdown
     *
     * - `ask.countdown`
     *
     * Animated countdown for a given number of seconds
     *
     * ```typescript
     * await ask.countdown(5);
     * ```
     * @param {number} totalSeconds
     * @param {(s: second) => string} [template]
     * @param {boolean} [isComplete]
     * @param {boolean} [isError]
     * @returns {Promise<void>}
     */
    const countdown: (totalSeconds: number, template?: (s: second) => string, isComplete?: boolean, isError?: boolean) => Promise<void>;
    /**<!-- DOCS: ask.pause #### @ -->
     * pause
     *
     * - `ask.pause`
     *
     * Pause the program until the user presses enter
     *
     * ```typescript
     * await ask.pause();
     * ```
     * @param {string | Breadcrumb} [text='Press enter to continue...']
     * @returns {Promise<void>}
     */
    const pause: (text?: string | Breadcrumb$1) => Promise<void>;
    /**<!-- DOCS-ALIAS: ask.imitate -->
     * imitate
     * 
     * - `ask.imitate`
     * 
     * Imitate the display of a prompt
     * 
     * ```typescript
     * imitate('What is your name?', 'Jack', true);
     * 
     * ask.imitate('What is your name?', 'Jack', true);
     * ```
     * @param {string | Breadcrumb} question
     * @param {any} [result]
     * @param {boolean} [isComplete=true]
     * @param {boolean} [isError=false]
     * @param {string} [errorMessage]
     * @param {LineCounter} [lc]
     * @returns {void}
     */
    const imitate: (question: string | Breadcrumb$1, result?: any, isComplete?: boolean, isError?: boolean, errorMessage?: string, lc?: LineCounter$1) => void;
    /**<!-- DOCS: ask.prefill #### @ -->
     * prefill
     *
     * - `ask.prefill`
     *
     * Auto-fills an ask prompt with the provided value, if defined.
     *
     * Continues to display the 'prompt', but already 'submitted'
     *
     * Good for keeping skipping parts of forms, but providing context and keeping display consistent
     *
     * ```typescript
     * let data = {};
     * const name1 = ask.prefill(data.name, 'What is your name?', ask.text); // User input
     *
     * data = {name: 'Jack'}
     * const name2 = ask.prefill(data.name, 'What is your name?', ask.text); // Jack
     * ```
     * @param {string | Breadcrumb} question
     * @param {T | undefined} value
     * @param {(question: string | Breadcrumb, lc: LineCounter) => Promise<T> | T} askFn
     * @param {LineCounter} [lc]
     * @returns {Promise<T>}
     */
    const prefill: <T extends unknown = string>(question: string | Breadcrumb$1, value: T, askFn: (question: string | Breadcrumb$1, lc: LineCounter) => T | Promise<T>, lc?: LineCounter) => Promise<T>;
    /**<!-- DOCS: ask.wizard #### @ -->
     * wizard
     *
     * - `ask.wizard`
     *
     * Create a wizard object that can be used to build up a complex object
     *
     * ```typescript
     * interface Example {
     *   foo: string;
     *   bar: number;
     *   baz: string;
     * }
     *
     * const base: Partial<Example> = {
     *   baz: 'baz'
     * };
     *
     * const wiz = ask.wizard<Example>(base);
     *
     * await wiz.add('foo', ask.text('What is foo?')); // User input: foo
     *
     * await wiz.add('bar', ask.number('What is bar?')); // User input: 123
     *
     * const result = wiz.get(); // { baz: 'baz', foo: 'foo', bar: 123 }
     * ```
     * @param {Partial<T>} [startObj={}]
     * @returns {any}
     */
    const wizard: <T extends unknown>(startObj?: Partial<T>) => Wizard<T>;
    /**
     * Wizard<T>
     *
     * Returned by `ask.wizard`
     */
    interface Wizard<T> {
        add<P extends keyof T>(propName: P, value: T[P] | Promise<T[P]>): Promise<T[P]>;
        addPartial(partial: Partial<T>): void;
        getPartial(): Partial<T>;
        get(): T;
    }
    /**<!-- DOCS-ALIAS: ask.section -->
     * section
     * 
     * - `ask.section`
     * 
     * Allows information to be displayed before a question, and follow up questions to be asked, while only leaving the 'footprint' of a single question afterwards.
     * 
     * ```typescript
     * const ans1 = await ask.text('Question 1:');
     * const ans2 = await ask.section('Question 2:',
     *   (lc: LineCounter) => {
     *     lc.log('Some information');
     *   },
     *   (qst) => ask.text(qst),
     *   () => ask.text('Question 2b:')
     * );
     * ```
     * 
     * During the section, it looks like this:
     * ```
     * Question 1: answer1
     * ┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄
     * Some information
     * ┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄◦┄┄┄┄┄┄
     * Question 2: answer2
     * Question 2b: answer2b
     * ```
     * 
     * After the last question in the section has been submitted, it looks like this:
     * ```
     * Question 1: answer1
     * Question 2a: [ answer2, answer2b ]
     * ```
     * @param {string | Breadcrumb} question
     * @param {(lc: LineCounter) => void | Promise<any>} [sectionHeader]
     * @param {...[...T]} [questionFns]
     * @returns {Promise<TupleFromQuestionFuncs<T>>}
     */
    const section: <T extends ((qst: string | Breadcrumb$1, results: any[], lc: LineCounter$1) => Promise<any>)[]>(question: string | Breadcrumb$1, sectionHeader?: (lc: LineCounter$1) => void | Promise<any>, ...questionFns_0: T) => Promise<{ [K in keyof T]: T[K] extends (qst: string | Breadcrumb$1, results: any[], lc: LineCounter$1) => Promise<infer U> ? U : never; }>;
    /**<!-- DOCS-ALIAS: ask.separator -->
     * separator
     * 
     * - `ask.separator`
     * 
     * Prints a separator line to the console.
     * 
     * ```typescript
     * ask.separator('down');
     * // ┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄┄▿┄┄┄┄┄┄
     * 
     * ask.separator('none', 15);
     * // ┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄┄┄┄◦┄┄┄┄┄┄┄┄┄┄┄
     * 
     * ask.separator('up', 5, 2);
     * // ┄┄┄┄┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄▵┄┄┄┄┄┄┄┄
     * ```
     * @param {'down' | 'none' | 'up'} [version='down']
     * @param {number} [spacing=8]
     * @param {number} [offset=0]
     * @param {number} [width=out.utils.getTerminalWidth() - 2]
     * @param {LineCounter} [lc]
     * @returns {void}
     */
    const separator: (version?: "up" | "down" | "none", spacing?: number, offset?: number, width?: number, lc?: LineCounter$1) => void;
    /**<!-- DOCS: ask.utils 180 ### -->
     * utils
     */
    namespace utils {
        type TitleFn<T> = (item: T, index: number, arr: T[]) => string;
        /**<!-- DOCS: ask.utils.itemsToPromptObjects #### 180 @ -->
         * itemsToPromptObjects
         *
         * - `ask.utils.itemsToPromptObjects`
         *
         * Take an array of items and convert them to an array of prompt objects
         *
         * ```typescript
         * ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'])
         * // [
         * //   { title: 'lorem', value: 'lorem' },
         * //   { title: 'ipsum', value: 'ipsum' },
         * //   { title: 'dolor', value: 'dolor' }
         * // ]
         *
         * ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'], ['Lorem', 'Ipsum', 'Dolor'])
         * // [
         * //   { title: 'Lorem', value: 'lorem' },
         * //   { title: 'Ipsum', value: 'ipsum' },
         * //   { title: 'Dolor', value: 'dolor' }
         * // ]
         *
         * ask.utils.itemsToPromptObjects(['lorem', 'ipsum', 'dolor'], undefined, (s) => s.toUpperCase())
         * // [
         * //   { title: 'LOREM', value: 'lorem' },
         * //   { title: 'IPSUM', value: 'ipsum' },
         * //   { title: 'DOLOR', value: 'dolor' }
         * // ]
         * ```
         * @param {T[]} items
         * @param {string[]} [titles=[]]
         * @param {TitleFn<T>} [titleFn]
         * @returns {{ title: string; value: T; }[]}
         */
        export const itemsToPromptObjects: <T = string>(items: T[], titles?: string[], titleFn?: TitleFn<T>) => {
            title: string;
            value: T;
        }[];
        export {};
    }
    /**<!-- DOCS: ask.PromptChoice ### 199 -->
     * PromptChoice
     *
     * - `ask.PromptChoice<T>`
     *
     * A choice for a prompt
     *
     * Equivalent to ``T | { title?: string; value?: T; selected?: boolean; }``
     */
    type PromptChoice<T = string> = T | {
        title?: string;
        value: T;
        selected?: boolean;
    };
}

declare const defaultConfigs: {
    readonly blank: LogConfig;
    readonly log: LogConfig;
    readonly out: LogConfig;
    readonly normal: LogConfig;
    readonly verbose: LogConfig;
    readonly debug: LogConfig;
    readonly info: LogConfig;
    readonly warn: LogConfig;
    readonly error: LogConfig;
};
declare type LogFunction = (...args: any[]) => void;
declare type DefaultLogger = OfType<typeof defaultConfigs, LogFunction>;
declare type Logger<T> = OfType<typeof defaultConfigs & T, LogFunction>;
/**<!-- DOCS: log.createLogger ### 601 -->
 * createLogger
 *
 * - `createLogger`
 *
 * Create a logger with custom configs
 *
 * ```typescript
 * const log = createLogger({
 *   myLog: {
 *     name: 'MYLOG',
 *     nameColour: colr.dark.magenta,
 *     showDate: false,
 *     showTime: true,
 *     contentColour: colr.yellow
 *   }
 * });
 *
 * log.myLog('Hello World'); // [12:00:00.123]  MYLOG  Hello World
 * ```
 * @param {T} [extraConfigs={} as T]
 * @param {LogOptions} [options={}]
 * @returns {Logger<T>}
 */
declare const createLogger: <T extends LogConfigs>(extraConfigs?: T, options?: LogOptions) => OfType<{
    readonly blank: LogConfig;
    readonly log: LogConfig;
    readonly out: LogConfig;
    readonly normal: LogConfig;
    readonly verbose: LogConfig;
    readonly debug: LogConfig;
    readonly info: LogConfig;
    readonly warn: LogConfig;
    readonly error: LogConfig;
} & T, LogFunction>;
/**<!-- DOCS: log.log ### 600 -->
 * log
 *
 * - `log`
 *
 * A set of log functions
 *
 * ```typescript
 * log.blank('This is blank');     //                       This is blank
 * log.log('This is log');         // [12:00:00.123]  LOG   This is log
 * log.out('This is out');         // [12:00:00.123]  OUT   This is out
 * log.normal('This is normal');   // [12:00:00.123]  LOG   This is normal
 * log.verbose('This is verbose'); // [12:00:00.123]  LOG   This is verbose
 * log.debug('This is debug');     // [12:00:00.123]  DBUG  This is debug
 * log.info('This is info');       // [12:00:00.123]  INFO  This is info
 * log.warn('This is warn');       // [12:00:00.123]  WARN  This is warn
 * log.error('This is error');     // [12:00:00.123]  ERRR  This is error
 * ```
 */
declare const log: OfType<{
    readonly blank: LogConfig;
    readonly log: LogConfig;
    readonly out: LogConfig;
    readonly normal: LogConfig;
    readonly verbose: LogConfig;
    readonly debug: LogConfig;
    readonly info: LogConfig;
    readonly warn: LogConfig;
    readonly error: LogConfig;
}, LogFunction>;
/**<!-- DOCS: log.LogOptions ### 650 -->
 * LogOptions
 *
 * - `LogOptions`
 *
 * Options for the log function
 */
interface LogOptions {
    showDate?: boolean;
    showTime?: boolean;
    enableColours?: boolean;
}
interface LogConfigs {
    [key: string]: LogConfig;
}
/**<!-- DOCS: log.LogConfig ### 660 -->
 * LogConfig
 *
 * - `LogConfig`
 *
 * Configuration for the log function
 *
 * See createLogger
 */
interface LogConfig {
    name: string;
    nameColour?: Function;
    showDate?: boolean;
    showTime?: boolean;
    contentColour?: Function;
}

/**<!-- DOCS: LogTools ##! -->
 * LogTools
 *
 * A collection of tools for logging
 */
declare namespace LogTools {
    /**<!-- DOCS: LogTools.getLogStr ### @ -->
     * getLogStr
     *
     * - `LogTools.getLogStr`
     * - `getLogStr`
     *
     * Get a string for a given object as it would be printed by console.log
     *
     * ```typescript
     * getLogStr(true); // true
     * getLogStr(1); // 1
     * getLogStr('foobar'); // foobar
     * getLogStr({ test: 'test' }); // { test: 'test' }
     * getLogStr(['a', 'b', 'c']); // [ 'a', 'b', 'c' ]
     *
     * getLogStr([
     *   [
     *     [
     *       ['a', 'b', 'c'],
     *       ['d', 'e', 'f']
     *     ],
     *     [
     *       ['g', 'h', 'i'],
     *       ['j', 'k', 'l']
     *     ]
     *   ],
     *   [
     *     [
     *       ['m', 'n', 'o']
     *     ]
     *   ]
     * ]);
     * // [
     * //   [
     * //     [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ] ],
     * //     [ [ 'g', 'h', 'i' ], [ 'j', 'k', 'l' ] ]
     * //   ],
     * //   [ [ [ 'm', 'n', 'o' ] ] ]
     * // ]
     * ```
     * @param {any} item
     * @returns {string}
     */
    const getLogStr: (item: any) => string;
    /**<!-- DOCS: LogTools.processLogContents ### @ -->
     * processLogContents
     *
     * - `LogTools.processLogContents`
     * - `processLogContents`
     *
     * Process an item to be logged
     * @param {string} prefix
     * @param {Function} [wrapper=fn.noact]
     * @param {...any} [args]
     * @returns {string}
     */
    const processLogContents: (prefix: string, wrapper?: Function, ...args: any[]) => string;
    /**<!-- DOCS: LogTools.getLog ### @ -->
     * getLog
     *
     * - `LogTools.getLog`
     * - `getLog`
     *
     * Get a log function for a given prefix
     * @param {string} prefix
     * @param {Function} [wrapper=fn.noact]
     * @returns {(...args: any[]) => void}
     */
    const getLog: (prefix: string, wrapper?: Function) => (...args: any[]) => void;
}
/**<!-- DOCS-ALIAS: LogTools.getLogStr -->
 * getLogStr
 * 
 * - `LogTools.getLogStr`
 * - `getLogStr`
 * 
 * Get a string for a given object as it would be printed by console.log
 * 
 * ```typescript
 * getLogStr(true); // true
 * getLogStr(1); // 1
 * getLogStr('foobar'); // foobar
 * getLogStr({ test: 'test' }); // { test: 'test' }
 * getLogStr(['a', 'b', 'c']); // [ 'a', 'b', 'c' ]
 * 
 * getLogStr([
 *   [
 *     [
 *       ['a', 'b', 'c'],
 *       ['d', 'e', 'f']
 *     ],
 *     [
 *       ['g', 'h', 'i'],
 *       ['j', 'k', 'l']
 *     ]
 *   ],
 *   [
 *     [
 *       ['m', 'n', 'o']
 *     ]
 *   ]
 * ]);
 * // [
 * //   [
 * //     [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ] ],
 * //     [ [ 'g', 'h', 'i' ], [ 'j', 'k', 'l' ] ]
 * //   ],
 * //   [ [ [ 'm', 'n', 'o' ] ] ]
 * // ]
 * ```
 * @param {any} item
 * @returns {string}
 */
declare const getLogStr: (item: any) => string;
/**<!-- DOCS-ALIAS: LogTools.processLogContents -->
 * processLogContents
 * 
 * - `LogTools.processLogContents`
 * - `processLogContents`
 * 
 * Process an item to be logged
 * @param {string} prefix
 * @param {Function} [wrapper=fn.noact]
 * @param {...any} [args]
 * @returns {string}
 */
declare const processLogContents: (prefix: string, wrapper?: Function, ...args: any[]) => string;
/**<!-- DOCS-ALIAS: LogTools.getLog -->
 * getLog
 * 
 * - `LogTools.getLog`
 * - `getLog`
 * 
 * Get a log function for a given prefix
 * @param {string} prefix
 * @param {Function} [wrapper=fn.noact]
 * @returns {(...args: any[]) => void}
 */
declare const getLog: (prefix: string, wrapper?: Function) => (...args: any[]) => void;

/**<!-- DOCS: PathTools ##! -->
 * PathTools
 *
 * A collection of tools for working with paths
 */
declare namespace PathTools {
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
     * @param {string} path
     * @returns {ExplodedPath}
     */
    const explodePath: (path: string) => ExplodedPath;
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
    interface ExplodedPath {
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
     * @param {string} path
     * @returns {string}
     */
    const removeTrailSlash: (path: string) => string;
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
     * @param {string} path
     * @returns {string}
     */
    const trailSlash: (path: string) => string;
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
     * @param {string} path
     * @returns {string}
     */
    const removeDoubleSlashes: (path: string) => string;
}
/**<!-- DOCS-ALIAS: PathTools.explodePath -->
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
 * @param {string} path
 * @returns {ExplodedPath}
 */
declare const explodePath: (path: string) => ExplodedPath;
/**<!-- DOCS-ALIAS: PathTools.ExplodedPath -->
 * ExplodedPath
 * 
 * - `PathTools.ExplodedPath`
 * - `ExplodedPath`
 * 
 * An object containing the exploded components of a path
 * 
 * See `explodePath` for more details
 */
declare type ExplodedPath = PathTools.ExplodedPath;

/**<!-- DOCS: progressBarTools ##! -->
 * progressBarTools
 *
 * A collection of tools for working with progress bars (from swiss-ak)
 */
declare namespace progressBarTools {
    /**<!-- DOCS: progressBarTools.getColouredProgressBarOpts ### @ -->
     * getColouredProgressBarOpts
     *
     * - `progressBarTools.getColouredProgressBarOpts`
     *
     * Helper for providing a consistent set of options for a progress bar, and colouring them appropriately
     *
     * ```typescript
     * const progOpts = progressBarTools.getColouredProgressBarOpts({
     *   showCount: true,
     *   showPercent: true,
     * });
     * // later...
     * const progressBar = getProgressBar(numThings, progOpts('Things'));
     * progressBar.update();
     * ```
     * @param {progressBar.ProgressBarOptions} opts
     * @param {boolean} [randomise=false]
     * @returns {(prefix?: string, override?: any, resetColours?: boolean) => any}
     */
    const getColouredProgressBarOpts: (opts: progressBar.ProgressBarOptions, randomise?: boolean) => (prefix?: string, override?: progressBar.ProgressBarOptions, resetColours?: boolean) => progressBar.ProgressBarOptions;
}

/**<!-- DOCS: waiters ##! -->
 * waiters
 */
declare namespace waiters {
    /**<!-- DOCS: waiters.nextTick ### @ -->
     * nextTick
     *
     * - `nextTick`
     * - `waiters.nextTick`
     *
     * Wait for the next tick
     *
     * ```typescript
     * wait nextTick();
     * ```
     * @returns {Promise<unknown>}
     */
    const nextTick: () => Promise<unknown>;
}
/**<!-- DOCS-ALIAS: waiters.nextTick -->
 * nextTick
 * 
 * - `nextTick`
 * - `waiters.nextTick`
 * 
 * Wait for the next tick
 * 
 * ```typescript
 * wait nextTick();
 * ```
 * @returns {Promise<unknown>}
 */
declare const nextTick: () => Promise<unknown>;

/**<!-- DOCS: keyListener ##! -->
 * keyListener
 */
/**<!-- DOCS: keyListener.getKeyListener ### @ -->
 * getKeyListener
 *
 * - `getKeyListener`
 *
 * Listens for key presses and returns the key name and raw value.
 *
 * ```typescript
 * const kl = getKeyListener((keyName, rawValue) => {
 *   // do something with keyName and rawValue
 * });
 *
 * kl.start();
 *
 * // later...
 *
 * kl.stop();
 * ```
 * @param {(keyName: string, rawValue: string) => void} callback
 * @param {boolean} [isStart=true]
 * @param {boolean} [isDebugLog=false]
 * @returns {KeyListener}
 */
declare const getKeyListener: (callback: (keyName: string, rawValue: string) => void, isStart?: boolean, isDebugLog?: boolean) => KeyListener;
/**<!-- DOCS: keyListener.KeyListener ### -->
 * KeyListener
 *
 * - `KeyListener`
 *
 * Returned by `getKeyListener`
 */
interface KeyListener {
    /**<!-- DOCS: keyListener.KeyListener.start #### -->
     * start
     *
     * - `kl.start`
     *
     * Start listening for key presses
     * @returns {void}
     */
    start(): void;
    /**<!-- DOCS: keyListener.KeyListener.stop #### -->
     * stop
     *
     * - `kl.stop`
     *
     * Stop listening for key presses
     * @returns {void}
     */
    stop(): void;
}

export { AskTableDisplaySettings, Breadcrumb, ColrFn, ColrSet, DefaultLogger, ExplodedPath, KeyListener, LineCounter, LogConfig, LogOptions, LogTools, Logger, PathTools, WrapFn, WrapSet, ansi, ask, colr, createLogger, explodePath, getBreadcrumb, getKeyListener, getLineCounter, getLog, getLogStr, log, nextTick, out, processLogContents, progressBarTools, table, waiters };
