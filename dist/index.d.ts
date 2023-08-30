import * as swiss_ak from 'swiss-ak';
import { Partial as Partial$1, second, OfType, ProgressBarOptions } from 'swiss-ak';

interface ChalkFn {
    (...text: string[]): string;
    level: 0 | 1 | 2 | 3;
    readonly reset: this;
    readonly bold: this;
    readonly dim: this;
    readonly italic: this;
    readonly underline: this;
    readonly overline: this;
    readonly inverse: this;
    readonly hidden: this;
    readonly strikethrough: this;
    readonly visible: this;
    readonly black: this;
    readonly red: this;
    readonly green: this;
    readonly yellow: this;
    readonly blue: this;
    readonly magenta: this;
    readonly cyan: this;
    readonly white: this;
    readonly gray: this;
    readonly grey: this;
    readonly blackBright: this;
    readonly redBright: this;
    readonly greenBright: this;
    readonly yellowBright: this;
    readonly blueBright: this;
    readonly magentaBright: this;
    readonly cyanBright: this;
    readonly whiteBright: this;
    readonly bgBlack: this;
    readonly bgRed: this;
    readonly bgGreen: this;
    readonly bgYellow: this;
    readonly bgBlue: this;
    readonly bgMagenta: this;
    readonly bgCyan: this;
    readonly bgWhite: this;
    readonly bgGray: this;
    readonly bgGrey: this;
    readonly bgBlackBright: this;
    readonly bgRedBright: this;
    readonly bgGreenBright: this;
    readonly bgYellowBright: this;
    readonly bgBlueBright: this;
    readonly bgMagentaBright: this;
    readonly bgCyanBright: this;
    readonly bgWhiteBright: this;
}
/**<!-- DOCS: clr.chlk ##! -->
 * chlk
 *
 * A collection of colours and styles for use in the console.
 */
declare namespace chlk {
    /**<!-- DOCS: clr.gray0 ### -->
     * gray0
     *
     * - `chlk.gray0`
     * - `clr.gray0`
     *
     * Gray 0 (0-5). Equivalent to chalk.black
     */
    const gray0: ChalkFn;
    /**<!-- DOCS: clr.gray1 ### -->
     * gray1
     *
     * - `chlk.gray1`
     * - `clr.gray1`
     *
     * Gray 1 (0-5). Equivalent to chalk.gray.dim
     */
    const gray1: ChalkFn;
    /**<!-- DOCS: clr.gray2 ### -->
     * gray2
     *
     * - `chlk.gray2`
     * - `clr.gray2`
     *
     * Gray 2 (0-5). Equivalent to chalk.white.dim
     */
    const gray2: ChalkFn;
    /**<!-- DOCS: clr.gray3 ### -->
     * gray3
     *
     * - `chlk.gray3`
     * - `clr.gray3`
     *
     * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
     */
    const gray3: ChalkFn;
    /**<!-- DOCS: clr.gray4 ### -->
     * gray4
     *
     * - `chlk.gray4`
     * - `clr.gray4`
     *
     * Gray 4 (0-5). Equivalent to chalk.white
     */
    const gray4: ChalkFn;
    /**<!-- DOCS: clr.gray5 ### -->
     * gray5
     *
     * - `chlk.gray5`
     * - `clr.gray5`
     *
     * Gray 5 (0-5). Equivalent to chalk.whiteBright
     */
    const gray5: ChalkFn;
    /**<!-- DOCS: clr.grays ### -->
     * grays
     *
     * - `chlk.grays`
     *
     * Grays between 0 and 5.
     *
     * ```typescript
     * grays[2]; // gray2
     * ```
     */
    const grays: ChalkFn[];
    /**<!-- DOCS: clr.gray ### -->
     * gray
     *
     * - `chlk.gray`
     *
     * Grays between 0 and 5.
     *
     * ```typescript
     * gray(2); // gray2
     * ```
     */
    const gray: (num: number) => ChalkFn;
    /**<!-- DOCS: clr.clear ### -->
     * clear
     *
     * - `chlk.clear`
     *
     * Removes ANSI colours. Not same as chalk.reset
     */
    const clear: (str: string) => string;
    /**<!-- DOCS: clr.not ### -->
     * not
     *
     * - `chlk.not`
     *
     * Stops and restarts a style around a given string
     */
    const not: (style: Function) => (item: string) => string;
    /**<!-- DOCS: clr.notUnderlined ### -->
     * notUnderlined
     *
     * - `chlk.notUnderlined`
     *
     * Dont underline a section of text
     */
    const notUnderlined: (item: string) => string;
}
/**<!-- DOCS: clr ##! -->
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
declare namespace clr {
    /**<!-- DOCS: clr.hl1 ### -->
     * hl1
     *
     * - `clr.hl1`
     *
     * Highlight 1
     */
    const hl1: ChalkFn;
    /**<!-- DOCS: clr.hl2 ### -->
     * hl2
     *
     * - `clr.hl2`
     *
     * Highlight 2
     */
    const hl2: ChalkFn;
    /**<!-- DOCS: clr.approve ### -->
     * approve
     *
     * - `clr.approve`
     *
     * Approval colour (green)
     */
    const approve: ChalkFn;
    /**<!-- DOCS: clr.create ### -->
     * create
     *
     * - `clr.create`
     *
     * Create colour (greenBright)
     */
    const create: ChalkFn;
    /**<!-- DOCS: clr.update ### -->
     * update
     *
     * - `clr.update`
     *
     * Update colour (yellow)
     */
    const update: ChalkFn;
    /**<!-- DOCS: clr.remove ### -->
     * remove
     *
     * - `clr.remove`
     *
     * Remove/delete colour (red)
     */
    const remove: ChalkFn;
    /**<!-- DOCS: clr.removeAll ### -->
     * removeAll
     *
     * - `clr.removeAll`
     *
     * Remove/delete all colour (red)
     */
    const removeAll: ChalkFn;
    /**<!-- DOCS: clr.blue ### -->
     * blue
     *
     * - `clr.blue`
     *
     * Alias for chalk.blueBright
     */
    const blue: ChalkFn;
    /**<!-- DOCS: clr.cyan ### -->
     * cyan
     *
     * - `clr.cyan`
     *
     * Alias for chalk.cyanBright
     */
    const cyan: ChalkFn;
    /**<!-- DOCS: clr.green ### -->
     * green
     *
     * - `clr.green`
     *
     * Alias for chalk.greenBright
     */
    const green: ChalkFn;
    /**<!-- DOCS: clr.magenta ### -->
     * magenta
     *
     * - `clr.magenta`
     *
     * Alias for chalk.magentaBright
     */
    const magenta: ChalkFn;
    /**<!-- DOCS: clr.red ### -->
     * red
     *
     * - `clr.red`
     *
     * Alias for chalk.redBright
     */
    const red: ChalkFn;
    /**<!-- DOCS: clr.yellow ### -->
     * yellow
     *
     * - `clr.yellow`
     *
     * Alias for chalk.yellowBright
     */
    const yellow: ChalkFn;
    /**<!-- DOCS: clr.t1 ### -->
     * t1
     *
     * - `clr.t1`
     *
     * Theme 1
     */
    const t1: ChalkFn;
    /**<!-- DOCS: clr.t2 ### -->
     * t2
     *
     * - `clr.t2`
     *
     * Theme 2
     */
    const t2: ChalkFn;
    /**<!-- DOCS: clr.t3 ### -->
     * t3
     *
     * - `clr.t3`
     *
     * Theme 3
     */
    const t3: ChalkFn;
    /**<!-- DOCS: clr.t4 ### -->
     * t4
     *
     * - `clr.t4`
     *
     * Theme 4
     */
    const t4: ChalkFn;
    /**<!-- DOCS: clr.t5 ### -->
     * t5
     *
     * - `clr.t5`
     *
     * Theme 5
     */
    const t5: ChalkFn;
    /**<!-- DOCS: clr.t6 ### -->
     * t6
     *
     * - `clr.t6`
     *
     * Theme 6
     */
    const t6: ChalkFn;
    /**<!-- DOCS-ALIAS: clr.gray0 -->
     * gray0
     * 
     * - `chlk.gray0`
     * - `clr.gray0`
     * 
     * Gray 0 (0-5). Equivalent to chalk.black
     */
    const gray0: ChalkFn;
    /**<!-- DOCS-ALIAS: clr.gray1 -->
     * gray1
     * 
     * - `chlk.gray1`
     * - `clr.gray1`
     * 
     * Gray 1 (0-5). Equivalent to chalk.gray.dim
     */
    const gray1: ChalkFn;
    /**<!-- DOCS-ALIAS: clr.gray2 -->
     * gray2
     * 
     * - `chlk.gray2`
     * - `clr.gray2`
     * 
     * Gray 2 (0-5). Equivalent to chalk.white.dim
     */
    const gray2: ChalkFn;
    /**<!-- DOCS-ALIAS: clr.gray3 -->
     * gray3
     * 
     * - `chlk.gray3`
     * - `clr.gray3`
     * 
     * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
     */
    const gray3: ChalkFn;
    /**<!-- DOCS-ALIAS: clr.gray4 -->
     * gray4
     * 
     * - `chlk.gray4`
     * - `clr.gray4`
     * 
     * Gray 4 (0-5). Equivalent to chalk.white
     */
    const gray4: ChalkFn;
    /**<!-- DOCS-ALIAS: clr.gray5 -->
     * gray5
     * 
     * - `chlk.gray5`
     * - `clr.gray5`
     * 
     * Gray 5 (0-5). Equivalent to chalk.whiteBright
     */
    const gray5: ChalkFn;
}
declare type Colour = keyof typeof clr;

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
 * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
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
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
     */
    log(...args: any[]): number;
    /**<!-- DOCS: out.LineCounter.move ##### -->
     * lc.move
     *
     * Moves the cursor up by a given number of lines
     */
    move(lines: number): void;
    /**<!-- DOCS: out.LineCounter.wrap ##### -->
     * lc.wrap
     *
     * Wraps a function, and adds a given number to the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
     */
    wrap: <T = any, A = any>(newLines: number, func: (...args: A[]) => number | T, ...args: A[]) => T;
    /**<!-- DOCS: out.LineCounter.add ##### -->
     * lc.add
     *
     * Adds a given number to the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
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
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
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
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.checkpoint('test-b');
     * lc.add(1);
     * lc.getSince('test-a'); // 2
     * lc.getSince('test-b'); // 1
     * ```
     */
    getSince(checkpointID: string): number;
    /**<!-- DOCS: out.LineCounter.clear ##### -->
     * lc.clear
     *
     * clears the line counter, and moves the cursor up by the value of the line counter
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
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
     */
    clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): void;
    /**<!-- DOCS: out.LineCounter.checkpoint ##### -->
     * lc.checkpoint
     *
     * Records a 'checkpoint' that can be returned to later
     *
     * ```typescript
     * const lc = getLineCounter();
     * lc.log('hello'); // 1
     * lc.checkpoint('test-a');
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.checkpoint('test-b');
     * lc.add(1);
     * lc.getSince('test-a'); // 2
     * lc.getSince('test-b'); // 1
     * ```
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
     */
    clearToCheckpoint(checkpointID: string): void;
}

interface Handles<T = any> {
    start: T;
    end: T;
}
interface AskTrimOptions {
    speed: number;
    fastSpeed: number;
    showInstructions: boolean;
    charTrack: string;
    charHandle: string;
    charActiveHandle: string;
    charBar: string;
    charHandleBase: string;
    charActiveHandleBase: string;
    clrTrack: Function;
    clrHandle: Function;
    clrActiveHandle: Function;
    clrBar: Function;
    clrHandleBase: Function;
    clrActiveHandleBase: Function;
}

declare type Text = string | string[];

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
    setColours: (colours: Colour[]) => void;
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
    /**<!-- DOCS: out.pad ### -->
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
     */
    export const pad: (line: string, start: number, end: number, replaceChar?: string) => string;
    export type AlignType = 'left' | 'right' | 'center' | 'justify';
    type AlignFunction = (item: any, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
    /**<!-- DOCS: out.center ### -->
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
     */
    export const center: AlignFunction;
    /**<!-- DOCS: out.left ### -->
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
     */
    export const left: AlignFunction;
    /**<!-- DOCS: out.right ### -->
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
     */
    export const right: AlignFunction;
    /**<!-- DOCS: out.justify ### -->
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
     */
    export const justify: AlignFunction;
    /**<!-- DOCS: out.leftLines ### -->
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
     */
    export const leftLines: (lines: string[], width?: number) => string[];
    /**<!-- DOCS: out.centerLines ### -->
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
     */
    export const centerLines: (lines: string[], width?: number) => string[];
    /**<!-- DOCS: out.rightLines ### -->
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
     */
    export const rightLines: (lines: string[], width?: number) => string[];
    /**<!-- DOCS: out.justifyLines ### -->
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
     */
    export const justifyLines: (lines: string[], width?: number) => string[];
    /**<!-- DOCS: out.align ### -->
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
     */
    export const align: (item: any, direction: AlignType, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
    /**<!-- DOCS: out.split ### -->
     * split
     *
     * - `out.split`
     *
     * Split the given text into two parts, left and right, with the given width of characters/columns
     *
     * ```typescript
     * out.split('Left', 'Right', 15); // Left      Right
     * ```
     */
    export const split: (leftItem: any, rightItem: any, width?: number, replaceChar?: string) => string;
    /**<!-- DOCS: out.wrap ### -->
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
     */
    export const wrap: (item: any, width?: number, alignment?: AlignType, forceWidth?: boolean) => string;
    /**<!-- DOCS: out.moveUp ### -->
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
     */
    export const moveUp: (lines?: number) => void;
    /**<!-- DOCS: out.loading ### -->
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
     */
    export const loading: (action?: (s: string) => any, lines?: number, symbols?: string[]) => {
        stop: () => void;
    };
    /**<!-- DOCS: out.limitToLength ### -->
     * limitToLength
     *
     * - `out.limitToLength`
     *
     * Limit the length of a string to the given length
     *
     * ```typescript
     * out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
     * ```
     */
    export const limitToLength: (text: string, maxLength: number) => string;
    /**<!-- DOCS: out.limitToLengthStart ### -->
     * limitToLengthStart
     *
     * - `out.limitToLengthStart`
     *
     * Limit the length of a string to the given length, keeping the end
     *
     * ```typescript
     * out.limitToLengthStart('This is a very long sentence', 12); // 'ong sentence'
     * ```
     */
    export const limitToLengthStart: (text: string, maxLength: number) => string;
    /**<!-- DOCS: out.truncate ### -->
     * truncate
     *
     * - `out.truncate`
     *
     * Limit the length of a string to the given length, and add an ellipsis if necessary
     *
     * ```typescript
     * out.truncate('This is a very long sentence', 15); // 'This is a ve...'
     * ```
     */
    export const truncate: (text: string, maxLength?: number, suffix?: string) => string;
    /**<!-- DOCS: out.truncateStart ### -->
     * truncateStart
     *
     * - `out.truncateStart`
     *
     * Limit the length of a string to the given length, and add an ellipsis if necessary, keeping the end
     *
     * ```typescript
     * out.truncateStart('This is a very long sentence', 15); // '...ong sentence'
     * ```
     */
    export const truncateStart: (text: string, maxLength?: number, suffix?: string) => string;
    /**<!-- DOCS: out.concatLineGroups ### -->
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
     */
    export const concatLineGroups: (...groups: string[][]) => string[];
    /**<!-- DOCS: out.getResponsiveValue ### -->
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
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
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
     * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
     * lc.add(1);
     * lc.get(); // 3
     * lc.clear();
     * ```
     */
    export type LineCounter = LineCounter$1;
    /**<!-- DOCS: out.utils 291 ### -->
     * utils
     */
    export namespace utils {
        /**<!-- DOCS: out.utils.getTerminalWidth #### 291 -->
         * getTerminalWidth
         *
         * - `out.utils.getTerminalWidth`
         *
         * Get maximum terminal width (columns)
         *
         * ```typescript
         * print.utils.getTerminalWidth(); // 127
         * ```
         */
        const getTerminalWidth: () => number;
        /**<!-- DOCS: out.utils.getLines #### 291 -->
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
         */
        const getLines: (text: Text) => string[];
        /**<!-- DOCS: out.utils.getNumLines #### 291 -->
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
         */
        const getNumLines: (text: Text) => number;
        /**<!-- DOCS: out.utils.getLinesWidth #### 291 -->
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
         */
        const getLinesWidth: (text: Text) => number;
        /**<!-- DOCS: out.utils.getLogLines #### 291 -->
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
         */
        const getLogLines: (item: any) => string[];
        /**<!-- DOCS: out.utils.getNumLogLines #### 291 -->
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
         */
        const getNumLogLines: (item: Text) => number;
        /**<!-- DOCS: out.utils.getLogLinesWidth #### 291 -->
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
         */
        const getLogLinesWidth: (item: Text) => number;
        /**<!-- DOCS: out.utils.joinLines #### 291 -->
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
         */
        const joinLines: (lines: string[]) => string;
        /**<!-- DOCS: out.utils.hasColor #### 291 -->
         * hasColor
         *
         * - `out.utils.hasColor`
         *
         * Determine whether a given string contains any chalk-ed colours
         *
         * ```typescript
         * out.utils.hasColor('this is line 1') // false
         * out.utils.hasColor(chalk.red('this is line 1')) // true
         * ```
         */
        const hasColor: (str: string) => boolean;
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
 * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
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
 * lc.wrap(undefined, () => table.print(['hello', 'world'])); // 1
 * lc.add(1);
 * lc.get(); // 3
 * lc.clear();
 * ```
 */
declare type LineCounter = LineCounter$1;

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

/**<!-- DOCS: table ##! -->
 * table
 *
 * A simple table generator
 */
declare namespace table {
    /**<!-- DOCS: table.print ### -->
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
    const print: (body: any[][], header?: any[][], options?: TableOptions) => number;
    /**<!-- DOCS: table.printObjects ### -->
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
    const printObjects: (objects: Object[], headers?: Object, options?: TableOptions) => number;
    /**<!-- DOCS: table.markdown ### -->
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
    const markdown: (body: any[][], header?: any[][], options?: TableOptions) => string[];
    /**<!-- DOCS: table.getLines ### -->
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
         * Function to wrap each line of the output in (e.g. chalk.blue)
         */
        wrapperFn: Function;
        /**<!-- DOCS: table.FullTableOptions.wrapLinesFn #### -->
         * wrapLinesFn
         *
         * Function to wrap the output lines of each cell of the table (e.g. chalk.blue)
         */
        wrapLinesFn: Function;
        /**<!-- DOCS: table.FullTableOptions.wrapHeaderLinesFn #### -->
         * wrapHeaderLinesFn
         *
         * Function to wrap the output lines of each cell of the header of the table (e.g. chalk.blue)
         *
         * Default: `chalk.bold`
         */
        wrapHeaderLinesFn: Function;
        /**<!-- DOCS: table.FullTableOptions.wrapBodyLinesFn #### -->
         * wrapBodyLinesFn
         *
         * Function to wrap the output lines of each cell of the body of the table (e.g. chalk.blue)
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
    /**<!-- DOCS: table.TableCharLookup ### 351 -->
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
        /**<!-- DOCS: table.utils.objectsToTable #### -->
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
        const objectsToTable: (objects: Object[], headers?: Object) => {
            header: any[][];
            body: any[][];
        };
        /**<!-- DOCS: table.utils.transpose #### -->
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
        const transpose: (rows: any[][]) => any[][];
        /**<!-- DOCS: table.utils.concatRows #### -->
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
        const concatRows: (cells: {
            header: any[][];
            body: any[][];
        }) => any[][];
        /**<!-- DOCS: table.utils.getFormat #### -->
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
        const getFormat: (format: Function | Colour, row?: number, col?: number, isHeader?: boolean, isBody?: boolean) => TableFormatConfig;
    }
}

/**<!-- DOCS: ask ##! -->
 * ask
 *
 * A collection of functions to ask the user for input.
 */
declare namespace ask {
    interface PromptChoiceObject<T = string> {
        title?: string;
        value?: T;
        selected?: boolean;
    }
    type PromptChoice<T = string> = string | PromptChoiceObject<T>;
    /**<!-- DOCS: ask.text ### -->
     * text
     *
     * - `ask.text`
     *
     * Get a text input from the user.
     *
     * ```typescript
     * const name = await ask.text('What is your name?'); // 'Jack'
     * ```
     */
    export const text: (question: string | Breadcrumb$1, initial?: string) => Promise<string>;
    /**<!-- DOCS: ask.autotext ### -->
     * autotext
     *
     * - `ask.autotext`
     *
     * Get a text input from the user, with auto-completion.
     *
     * ```typescript
     * const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
     * ```
     */
    export const autotext: <T = string>(question: string | Breadcrumb$1, choices: PromptChoice<T>[], initial?: string | T, choiceLimit?: number) => Promise<T>;
    /**<!-- DOCS: ask.number ### -->
     * number
     *
     * - `ask.number`
     *
     * Get a number input from the user.
     *
     * ```typescript
     * const age = await ask.number('How old are you?'); // 30
     * ```
     */
    export const number: (question: string | Breadcrumb$1, initial?: number) => Promise<number>;
    /**<!-- DOCS: ask.boolean ### -->
     * boolean
     *
     * - `ask.boolean`
     *
     * Get a boolean input from the user (yes or no)
     *
     * ```typescript
     * const isCool = await ask.boolean('Is this cool?'); // true
     * ```
     */
    export const boolean: (question: string | Breadcrumb$1, initial?: boolean, yesTxt?: string, noTxt?: string) => Promise<boolean>;
    /**<!-- DOCS: ask.booleanAlt ### -->
     * booleanAlt
     *
     * - `ask.booleanAlt`
     *
     * Get a boolean input from the user (yes or no)
     *
     * Alternative interface to ask.boolean
     *
     * ```typescript
     * const isCool = await ask.boolean('Is this cool?'); // true
     * ```
     */
    export const booleanAlt: (question: string | Breadcrumb$1, initial?: boolean) => Promise<boolean>;
    /**<!-- DOCS: ask.select ### -->
     * select
     *
     * - `ask.select`
     *
     * Get the user to select an option from a list.
     *
     * ```typescript
     * const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
     * ```
     */
    export const select: <T = string>(question: string | Breadcrumb$1, choices: PromptChoice<T>[], initial?: T) => Promise<T>;
    /**<!-- DOCS: ask.multiselect ### -->
     * multiselect
     *
     * - `ask.multiselect`
     *
     * Get the user to select multiple opts from a list.
     *
     * ```typescript
     * const colours = await ask.multiselect('Whats your favourite colours?', ['red', 'green', 'blue']); // ['red', 'green']
     * ```
     */
    export const multiselect: <T = string>(question: string | Breadcrumb$1, choices: PromptChoice<T>[], initial?: PromptChoice<T> | PromptChoice<T>[], canSelectAll?: boolean) => Promise<T[]>;
    export interface CRUDOptions {
        canCreate: boolean;
        canUpdate: boolean;
        canDelete: boolean;
        canDeleteAll: boolean;
    }
    export type CRUD = 'none' | 'create' | 'update' | 'delete' | 'delete-all';
    /**<!-- DOCS: ask.crud ### -->
     * crud
     *
     * - `ask.crud`
     *
     * Get the user to select a CRUD (**C**reate, **R**ead, **U**pdate and **D**elete) action
     *
     * Values returned are: 'none' | 'create' | 'update' | 'delete' | 'delete-all'
     *
     * ```typescript
     * const action = await ask.crud('What do you want to do next?'); // 'none'
     * ```
     */
    export const crud: (question: string | Breadcrumb$1, itemName?: string, items?: any[], options?: Partial<CRUDOptions>) => Promise<CRUD>;
    /**<!-- DOCS: ask.validate ### -->
     * validate
     *
     * - `ask.validate`
     *
     * Validate the result of an `ask` prompt
     *
     * ```typescript
     * const name = await ask.validate(
     *   () => ask.text('What is your name?'),
     *   (name) => name.length > 0
     * ); // 'Jack'
     * ```
     */
    export const validate: <T = string, I = string>(askFunc: (initialValue?: T) => I | Promise<I>, validateFn: (input: Awaited<I>) => boolean | string) => Promise<I>;
    /**<!-- DOCS: ask.imitate ### -->
     * imitate
     *
     * - `ask.imitate`
     *
     * Imitate the display of a prompt
     *
     * ```typescript
     * imitate(true, 'What is your name?', 'Jack');
     *
     * ask.imitate(true, 'What is your name?', 'Jack');
     * ```
     */
    export const imitate: (done: boolean, question: string | Breadcrumb$1, result?: any) => number;
    /**<!-- DOCS: ask.prefill ### -->
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
     */
    export const prefill: <T extends unknown = string>(value: T, question: string | Breadcrumb$1, askFn: (question: string | Breadcrumb$1) => T | Promise<T>) => Promise<T>;
    /**<!-- DOCS: ask.loading ### -->
     * loading
     *
     * - `ask.loading`
     *
     * Display an animated loading indicator that imitates the display of a prompt
     *
     * ```typescript
     * const loader = ask.loading('What is your name?');
     * // ...
     * loader.stop();
     * ```
     */
    export const loading: (question: string | Breadcrumb$1) => {
        stop: () => void;
    };
    /**<!-- DOCS: ask.pause ### -->
     * pause
     *
     * - `ask.pause`
     *
     * Pause the program until the user presses enter
     *
     * ```typescript
     * await ask.pause();
     * ```
     */
    export const pause: (text?: string | Breadcrumb$1) => Promise<void>;
    /**<!-- DOCS: ask.countdown ### -->
     * countdown
     *
     * - `ask.countdown`
     *
     * Animated countdown for a given number of seconds
     *
     * ```typescript
     * await ask.countdown(5);
     * ```
     */
    export const countdown: (totalSeconds: number, template?: (s: second) => string, complete?: string) => Promise<void>;
    /**<!-- DOCS: ask.wizard ### -->
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
     * const foo = await ask.text('What is foo?'); // User input: foo
     * wiz.add({ foo });
     *
     * const bar = await ask.number('What is bar?'); // User input: 123
     * wiz.add({ bar });
     *
     * const result = wiz.get(); // { baz: 'baz', foo: 'foo', bar: 123 }
     * ```
     */
    export const wizard: <T extends unknown>(startObj?: Partial<T>) => {
        add(partial: Partial<T>): void;
        getPartial(): Partial<T>;
        get(): T;
    };
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
     */
    export const date: (questionText?: string | Breadcrumb$1, initial?: Date) => Promise<Date>;
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
     */
    export const time: (questionText?: string | Breadcrumb$1, initial?: Date) => Promise<Date>;
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
     */
    export const datetime: (questionText?: string | Breadcrumb$1, initial?: Date) => Promise<Date>;
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
     */
    export const dateRange: (questionText?: string | Breadcrumb$1, initialStart?: Date, initialEnd?: Date) => Promise<[Date, Date]>;
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
     */
    export const fileExplorer: (questionText: string | Breadcrumb$1, selectType?: "d" | "f", startPath?: string) => Promise<string>;
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
     */
    export const multiFileExplorer: (questionText: string | Breadcrumb$1, selectType?: "d" | "f", startPath?: string) => Promise<string[]>;
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
     */
    export const saveFileExplorer: (questionText: string | Breadcrumb$1, startPath?: string, suggestedFileName?: string) => Promise<string>;
    /**<!-- DOCS-ALIAS: ask.table -->
     * table (ask)
     * 
     * A collection of functions for asking questions with tables.
     */
    export namespace table {
        /**<!-- DOCS-ALIAS: ask.table.select -->
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
         */
        const select: <T extends unknown>(question: string | Breadcrumb$1, items: T[], initial?: number | T, rows?: any[][] | ((item?: T, index?: number, items?: T[]) => any[]), headers?: any[][] | swiss_ak.RemapOf<T, string>, tableOptions?: swiss_ak.Partial<table.FullTableOptions>) => Promise<T>;
        /**<!-- DOCS-ALIAS: ask.table.multiselect -->
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
         */
        const multiselect: <T extends unknown>(question: string | Breadcrumb$1, items: T[], initial?: number[] | T[], rows?: any[][] | ((item?: T, index?: number, items?: T[]) => any[]), headers?: any[][] | swiss_ak.RemapOf<T, string>, tableOptions?: swiss_ak.Partial<table.FullTableOptions>) => Promise<T[]>;
    }
    /**<!-- DOCS-ALIAS: ask.trim -->
     * trim
     * 
     * - `ask.trim`
     * 
     * Get a start and end frame from the user
     */
    export const trim: (totalFrames: number, frameRate: number, options?: Partial<AskTrimOptions>) => Promise<Handles<number>>;
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
     */
    export const separator: (version?: "up" | "down" | "none", spacing?: number, offset?: number, width?: number) => number;
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
     * 
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
     */
    export const section: <QuesT extends ((qst?: string | Breadcrumb$1, results?: any[], lc?: LineCounter$1, separator?: () => void) => Promise<any>)[]>(question: string | Breadcrumb$1, sectionFn?: (lc: LineCounter$1, separator: () => void) => void | Promise<any>, ...questionFns: QuesT) => Promise<QuesT extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...Tail extends [infer Head, ...infer Tail] ? [Head extends (...args: any[]) => Promise<infer U> ? U : Head, ...any] : []] : []] : []] : []] : []] : []] : []] : []] : []] : []] : []>;
    /**<!-- DOCS: ask.utils 199 ### -->
     * utils
     */
    export namespace utils {
        type TitleFn<T> = (item: T, index: number, arr: T[]) => string;
        /**<!-- DOCS: ask.utils.itemsToPromptObjects #### 199 -->
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
         */
        export const itemsToPromptObjects: <T = string>(items: T[], titles?: string[], titleFn?: TitleFn<T>) => {
            title: string;
            value: T;
        }[];
        export {};
    }
    export {};
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
/**<!-- DOCS: log.createLogger ### 401 -->
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
 *     nameColour: chalk.magenta,
 *     showDate: false,
 *     showTime: true,
 *     contentColour: chalk.yellowBright
 *   }
 * });
 *
 * log.myLog('Hello World'); // [12:00:00.123]  MYLOG  Hello World
 * ```
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
/**<!-- DOCS: log.log ### 400 -->
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
/**<!-- DOCS: log.LogOptions ### 450 -->
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
/**<!-- DOCS: log.LogConfig ### 460 -->
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
    /**<!-- DOCS: LogTools.getLogStr ### -->
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
     */
    const getLogStr: (item: any) => string;
    /**<!-- DOCS: LogTools.processLogContents ### -->
     * processLogContents
     *
     * - `LogTools.processLogContents`
     * - `processLogContents`
     *
     * Process an item to be logged
     */
    const processLogContents: (prefix: string, wrapper?: Function, ...args: any[]) => string;
    /**<!-- DOCS: LogTools.getLog ### -->
     * getLog
     *
     * - `LogTools.getLog`
     * - `getLog`
     *
     * Get a log function for a given prefix
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
 */
declare const getLogStr: (item: any) => string;
/**<!-- DOCS-ALIAS: LogTools.processLogContents -->
 * processLogContents
 * 
 * - `LogTools.processLogContents`
 * - `processLogContents`
 * 
 * Process an item to be logged
 */
declare const processLogContents: (prefix: string, wrapper?: Function, ...args: any[]) => string;
/**<!-- DOCS-ALIAS: LogTools.getLog -->
 * getLog
 * 
 * - `LogTools.getLog`
 * - `getLog`
 * 
 * Get a log function for a given prefix
 */
declare const getLog: (prefix: string, wrapper?: Function) => (...args: any[]) => void;

/**<!-- DOCS: PathTools ##! -->
 * PathTools
 *
 * A collection of tools for working with paths
 */
declare namespace PathTools {
    /**<!-- DOCS: PathTools.explodePath ### -->
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
    /**<!-- DOCS: PathTools.removeTrailSlash ### -->
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
    const removeTrailSlash: (path: string) => string;
    /**<!-- DOCS: PathTools.trailSlash ### -->
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
    const trailSlash: (path: string) => string;
    /**<!-- DOCS: PathTools.removeDoubleSlashes ### -->
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
    /**<!-- DOCS: progressBarTools.getColouredProgressBarOpts ### -->
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
     */
    const getColouredProgressBarOpts: (opts: ProgressBarOptions, randomise?: boolean) => (prefix?: string, override?: ProgressBarOptions, resetColours?: boolean) => ProgressBarOptions;
}

/**<!-- DOCS: waiters ##! -->
 * waiters
 */
declare namespace waiters {
    /**<!-- DOCS: waiters.nextTick ### -->
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
 */
declare const nextTick: () => Promise<unknown>;

/**<!-- DOCS: keyListener ##! -->
 * keyListener
 */
/**<!-- DOCS: keyListener.getKeyListener ### -->
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
 */
declare const getKeyListener: (callback: (keyName?: string, rawValue?: string) => void, isStart?: boolean, isDebugLog?: boolean) => KeyListener;
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
     */
    start(): void;
    /**<!-- DOCS: keyListener.KeyListener.stop #### -->
     * stop
     *
     * - `kl.stop`
     *
     * Stop listening for key presses
     */
    stop(): void;
}

export { Breadcrumb, Colour, DefaultLogger, ExplodedPath, KeyListener, LineCounter, LogConfig, LogOptions, LogTools, Logger, PathTools, ask, chlk, clr, createLogger, explodePath, getBreadcrumb, getKeyListener, getLineCounter, getLog, getLogStr, log, nextTick, out, processLogContents, progressBarTools, table, waiters };
