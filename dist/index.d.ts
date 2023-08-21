import { Partial as Partial$1, RemapOf, second, ProgressBarOptions, OfType } from 'swiss-ak';

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
declare const chlk: {
    gray0: ChalkFn;
    gray1: ChalkFn;
    gray2: ChalkFn;
    gray3: ChalkFn;
    gray4: ChalkFn;
    gray5: ChalkFn;
    grays: ChalkFn[];
    gray: (num: number) => ChalkFn;
    clear: (str: string) => string;
    not: (style: Function) => (item: string) => string;
    notUnderlined: (item: string) => string;
};
/**<!-- DOCS: ## -->
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
declare const clr: {
    /**<!-- DOCS: ### -->
     * hl1
     *
     * - `clr.hl1`
     *
     * Highlight 1
     */
    hl1: ChalkFn;
    /**<!-- DOCS: ### -->
     * hl2
     *
     * - `clr.hl2`
     *
     * Highlight 2
     */
    hl2: ChalkFn;
    /**<!-- DOCS: ### -->
     * approve
     *
     * - `clr.approve`
     *
     * Approval colour (green)
     */
    approve: ChalkFn;
    /**<!-- DOCS: ### -->
     * create
     *
     * - `clr.create`
     *
     * Create colour (greenBright)
     */
    create: ChalkFn;
    /**<!-- DOCS: ### -->
     * update
     *
     * - `clr.update`
     *
     * Update colour (yellow)
     */
    update: ChalkFn;
    /**<!-- DOCS: ### -->
     * delete
     *
     * - `clr.delete`
     *
     * Delete colour (red)
     */
    delete: ChalkFn;
    /**<!-- DOCS: ### -->
     * deleteAll
     *
     * - `clr.deleteAll`
     *
     * Delete all colour (red)
     */
    deleteAll: ChalkFn;
    /**<!-- DOCS: ### -->
     * blue
     *
     * - `clr.blue`
     *
     * Alias for chalk.blueBright
     */
    blue: ChalkFn;
    /**<!-- DOCS: ### -->
     * cyan
     *
     * - `clr.cyan`
     *
     * Alias for chalk.cyanBright
     */
    cyan: ChalkFn;
    /**<!-- DOCS: ### -->
     * green
     *
     * - `clr.green`
     *
     * Alias for chalk.greenBright
     */
    green: ChalkFn;
    /**<!-- DOCS: ### -->
     * magenta
     *
     * - `clr.magenta`
     *
     * Alias for chalk.magentaBright
     */
    magenta: ChalkFn;
    /**<!-- DOCS: ### -->
     * red
     *
     * - `clr.red`
     *
     * Alias for chalk.redBright
     */
    red: ChalkFn;
    /**<!-- DOCS: ### -->
     * yellow
     *
     * - `clr.yellow`
     *
     * Alias for chalk.yellowBright
     */
    yellow: ChalkFn;
    /**<!-- DOCS: ### -->
     * t1
     *
     * - `clr.t1`
     *
     * Theme 1
     */
    t1: ChalkFn;
    /**<!-- DOCS: ### -->
     * t2
     *
     * - `clr.t2`
     *
     * Theme 2
     */
    t2: ChalkFn;
    /**<!-- DOCS: ### -->
     * t3
     *
     * - `clr.t3`
     *
     * Theme 3
     */
    t3: ChalkFn;
    /**<!-- DOCS: ### -->
     * t4
     *
     * - `clr.t4`
     *
     * Theme 4
     */
    t4: ChalkFn;
    /**<!-- DOCS: ### -->
     * t5
     *
     * - `clr.t5`
     *
     * Theme 5
     */
    t5: ChalkFn;
    /**<!-- DOCS: ### -->
     * t6
     *
     * - `clr.t6`
     *
     * Theme 6
     */
    t6: ChalkFn;
    /**<!-- DOCS: ### -->
     * gray0
     *
     * - `chlk.gray0`
     * - `clr.gray0`
     *
     * Gray 0 (0-5). Equivalent to chalk.black
     */
    gray0: ChalkFn;
    /**<!-- DOCS: ### -->
     * gray1
     *
     * - `chlk.gray1`
     * - `clr.gray1`
     *
     * Gray 1 (0-5). Equivalent to chalk.gray.dim
     */
    gray1: ChalkFn;
    /**<!-- DOCS: ### -->
     * gray2
     *
     * - `chlk.gray2`
     * - `clr.gray2`
     *
     * Gray 2 (0-5). Equivalent to chalk.white.dim
     */
    gray2: ChalkFn;
    /**<!-- DOCS: ### -->
     * gray3
     *
     * - `chlk.gray3`
     * - `clr.gray3`
     *
     * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
     */
    gray3: ChalkFn;
    /**<!-- DOCS: ### -->
     * gray4
     *
     * - `chlk.gray4`
     * - `clr.gray4`
     *
     * Gray 4 (0-5). Equivalent to chalk.white
     */
    gray4: ChalkFn;
    /**<!-- DOCS: ### -->
     * gray5
     *
     * - `chlk.gray5`
     * - `clr.gray5`
     *
     * Gray 5 (0-5). Equivalent to chalk.whiteBright
     */
    gray5: ChalkFn;
};
declare type Colour = keyof typeof clr;

/**<!-- DOCS: ### -->
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
declare const getBreadcrumb: (...baseNames: string[]) => Breadcrumb;
/**<!-- DOCS: #### -->
 * Breadcrumb
 *
 * - `out.Breadcrumb`
 * - `Breadcrumb`
 *
 * Return type for getBreadcrumb
 */
declare type Breadcrumb = {
    (...tempNames: string[]): Breadcrumb;
    setColours: (colours: Colour[]) => void;
    add: (...names: string[]) => number;
    getNames: (...tempNames: string[]) => any[];
    sub: (...tempNames: string[]) => Breadcrumb;
    get(...tempNames: string[]): string;
    toString(): string;
};

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
/**<!-- DOCS: ### -->
 * trim
 *
 * - `ask.trim`
 *
 * Get a start and end frame from the user
 */
declare const trim: (totalFrames: number, frameRate: number, options?: Partial<AskTrimOptions>) => Promise<Handles<number>>;

/**<!-- DOCS: ### -->
 * fileExplorer
 *
 * - `ask.fileExplorer`
 *
 * Get a file or folder path from the user.
 *
 * ```typescript
const file = await ask.fileExplorer('What file?', 'f');
// '/Users/user/Documents/some_file.txt'

const dir = await ask.fileExplorer('What file?', 'd', '/Users/jackcannon/Documents');
// '/Users/jackcannon/Documents/some_folder'
 * ```
 */
declare const fileExplorer: (questionText: string | Breadcrumb, selectType?: 'd' | 'f', startPath?: string) => Promise<string>;
/**<!-- DOCS: ### -->
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
declare const multiFileExplorer: (questionText: string | Breadcrumb, selectType?: 'd' | 'f', startPath?: string) => Promise<string[]>;
/**<!-- DOCS: ### -->
 * saveFileExplorer
 *
 * - `ask.saveFileExplorer`
 *
 * Get a file path from the user, with the intention of saving a file to that path.
 *
 * ```typescript
const HOME_DIR = '/Users/user/Documents';
const savePath = await ask.saveFileExplorer('Save file', HOME_DIR, 'data.json');
// '/Users/user/Documents/data.json'
 * ```
 */
declare const saveFileExplorer: (questionText: string | Breadcrumb, startPath?: string, suggestedFileName?: string) => Promise<string>;

/**<!-- DOCS: ### -->
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
declare const getLineCounter: () => LineCounter;
/**<!-- DOCS: #### -->
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
interface LineCounter {
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
     * move
     *
     * Moves the cursor up by a given number of lines
     */
    move(lines: number): void;
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
     * getSince
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
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
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
    /**<!-- DOCS: ##### -->
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

/**<!-- DOCS: ### -->
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
declare const separator: (version?: 'down' | 'none' | 'up', spacing?: number, offset?: number, width?: number) => number;
declare type UnwrapPromFunc<T> = T extends (...args: any[]) => Promise<infer U> ? U : T;
declare type UnwrapPromFuncs<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [UnwrapPromFunc<Head>, ...UnwrapPromFuncs<Tail>] : [];
/**<!-- DOCS: ### -->
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
declare const section: <QuesT extends ((qst?: string | Breadcrumb, results?: any[], lc?: LineCounter, separator?: () => void) => Promise<any>)[]>(question: string | Breadcrumb, sectionFn?: (lc: LineCounter, separator: () => void) => void | Promise<any>, ...questionFns: QuesT) => Promise<UnwrapPromFuncs<QuesT>>;

/**<!-- DOCS: ### -->
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
declare const date: (questionText?: string | Breadcrumb, initial?: Date) => Promise<Date>;
/**<!-- DOCS: ### -->
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
declare const time: (questionText?: string | Breadcrumb, initial?: Date) => Promise<Date>;
/**<!-- DOCS: ### -->
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
declare const datetime: (questionText?: string | Breadcrumb, initial?: Date) => Promise<Date>;
/**<!-- DOCS: ### -->
 * dateRange
 *
 * - `ask.dateRange`
 *
 * Get a date range input from the user.
 *
 * ```typescript
const range = await ask.dateRange('When is the festival?');
// [
//   [Date: 2023-03-01T12:00:00.000Z],
//   [Date: 2023-03-31T12:00:00.000Z]
// ]
 * ```
 */
declare const dateRange: (questionText?: string | Breadcrumb, initialStart?: Date, initialEnd?: Date) => Promise<[Date, Date]>;

declare type Text = string | string[];

/**<!-- DOCS: ### -->
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
declare const pad: (line: string, start: number, end: number, replaceChar?: string) => string;
declare type AlignType = 'left' | 'right' | 'center' | 'justify';
declare type AlignFunction = (item: any, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
/**<!-- DOCS: ### -->
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
declare const center: AlignFunction;
/**<!-- DOCS: ### -->
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
declare const left: AlignFunction;
/**<!-- DOCS: ### -->
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
declare const right: AlignFunction;
/**<!-- DOCS: ### -->
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
declare const justify: AlignFunction;
/**<!-- DOCS: ### -->
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
declare const leftLines: (lines: string[], width?: number) => string[];
/**<!-- DOCS: ### -->
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
declare const centerLines: (lines: string[], width?: number) => string[];
/**<!-- DOCS: ### -->
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
declare const rightLines: (lines: string[], width?: number) => string[];
/**<!-- DOCS: ### -->
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
declare const justifyLines: (lines: string[], width?: number) => string[];
/**<!-- DOCS: ### -->
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
declare const align: (item: any, direction: AlignType, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
/**<!-- DOCS: ### -->
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
declare const split: (leftItem: any, rightItem: any, width?: number, replaceChar?: string) => string;
/**<!-- DOCS: ### -->
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
declare const wrap: (item: any, width?: number, alignment?: AlignType, forceWidth?: boolean) => string;
/**<!-- DOCS: ### -->
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
declare const moveUp: (lines?: number) => void;
/**<!-- DOCS: ### -->
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
declare const loading$1: (action?: (s: string) => any, lines?: number, symbols?: string[]) => {
    stop: () => void;
};
/**<!-- DOCS: ### -->
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
declare const limitToLength: (text: string, maxLength: number) => string;
/**<!-- DOCS: ### -->
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
declare const limitToLengthStart: (text: string, maxLength: number) => string;
/**<!-- DOCS: ### -->
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
declare const truncate: (text: string, maxLength?: number, suffix?: string) => string;
/**<!-- DOCS: ### -->
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
declare const truncateStart: (text: string, maxLength?: number, suffix?: string) => string;
/**<!-- DOCS: ### -->
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
declare const concatLineGroups: (...groups: string[][]) => string[];
/**<!-- DOCS: ### -->
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
declare const getResponsiveValue: <T extends unknown>(options: ResponsiveOption<T>[]) => T;
/**<!-- DOCS: #### -->
 * ResponsiveOption<T>
 *
 * - `out.ResponsiveOption`
 *
 * Configuration for a responsive value (see `getResponsiveValue`)
 *
 * See getResponsiveValue for an example
 */
declare type ResponsiveOption<T> = {
    minColumns?: number;
    value: T;
};
declare const utils$2: {
    getLines: (text: Text) => string[];
    getNumLines: (text: Text) => number;
    getLinesWidth: (text: Text) => number;
    getLogLines: (item: any) => string[];
    getNumLogLines: (item: Text) => number;
    getLogLinesWidth: (item: Text) => number;
    joinLines: (lines: string[]) => string;
    getTerminalWidth: () => number;
    hasColor: (str: string) => boolean;
};

declare const out_pad: typeof pad;
type out_AlignType = AlignType;
declare const out_center: typeof center;
declare const out_left: typeof left;
declare const out_right: typeof right;
declare const out_justify: typeof justify;
declare const out_leftLines: typeof leftLines;
declare const out_centerLines: typeof centerLines;
declare const out_rightLines: typeof rightLines;
declare const out_justifyLines: typeof justifyLines;
declare const out_align: typeof align;
declare const out_split: typeof split;
declare const out_wrap: typeof wrap;
declare const out_moveUp: typeof moveUp;
declare const out_limitToLength: typeof limitToLength;
declare const out_limitToLengthStart: typeof limitToLengthStart;
declare const out_truncate: typeof truncate;
declare const out_truncateStart: typeof truncateStart;
declare const out_concatLineGroups: typeof concatLineGroups;
declare const out_getResponsiveValue: typeof getResponsiveValue;
type out_ResponsiveOption<T> = ResponsiveOption<T>;
declare namespace out {
  export {
    out_pad as pad,
    out_AlignType as AlignType,
    out_center as center,
    out_left as left,
    out_right as right,
    out_justify as justify,
    out_leftLines as leftLines,
    out_centerLines as centerLines,
    out_rightLines as rightLines,
    out_justifyLines as justifyLines,
    out_align as align,
    out_split as split,
    out_wrap as wrap,
    out_moveUp as moveUp,
    loading$1 as loading,
    out_limitToLength as limitToLength,
    out_limitToLengthStart as limitToLengthStart,
    out_truncate as truncate,
    out_truncateStart as truncateStart,
    out_concatLineGroups as concatLineGroups,
    out_getResponsiveValue as getResponsiveValue,
    out_ResponsiveOption as ResponsiveOption,
    utils$2 as utils,
  };
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
declare const print: (body: any[][], header?: any[][], options?: TableOptions) => number;
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
declare const markdown: (body: any[][], header?: any[][], options?: TableOptions) => string[];
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
declare const printObjects: (objects: Object[], headers?: Object, options?: TableOptions) => number;
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
declare const getLines: (body: any[][], header?: any[][], options?: TableOptions) => string[];
interface FullTableOptions {
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
    align: AlignType;
    /**<!-- DOCS: #### -->
     * alignCols
     *
     * How each column should be aligned
     *
     * Array with alignment for each column: left, right, center or justify
     */
    alignCols: AlignType[];
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
declare type TableOptions = Partial$1<FullTableOptions>;
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
declare type TableCharLookup = Partial$1<CharLookup<string[]>>;
/**<!-- DOCS: ### -->
 * TableFormatConfig
 *
 * Configuration for formatting a cell
 */
interface TableFormatConfig {
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
declare const utils$1: {
    objectsToTable: (objects: Object[], headers?: Object) => {
        header: any[][];
        body: any[][];
    };
    transpose: (rows: any[][]) => any[][];
    concatRows: (cells: {
        header: any[][];
        body: any[][];
    }) => any[][];
    getFormat: (format: Function | Colour, row?: number, col?: number, isHeader?: boolean, isBody?: boolean) => TableFormatConfig;
};

declare const table$1_print: typeof print;
declare const table$1_markdown: typeof markdown;
declare const table$1_printObjects: typeof printObjects;
declare const table$1_getLines: typeof getLines;
type table$1_FullTableOptions = FullTableOptions;
type table$1_TableOptions = TableOptions;
type table$1_TableCharLookup = TableCharLookup;
type table$1_TableFormatConfig = TableFormatConfig;
declare namespace table$1 {
  export {
    table$1_print as print,
    table$1_markdown as markdown,
    table$1_printObjects as printObjects,
    table$1_getLines as getLines,
    table$1_FullTableOptions as FullTableOptions,
    table$1_TableOptions as TableOptions,
    table$1_TableCharLookup as TableCharLookup,
    table$1_TableFormatConfig as TableFormatConfig,
    utils$1 as utils,
  };
}

declare type ItemToRowMapFunction<T extends unknown> = (item?: T, index?: number, items?: T[]) => any[];
/**<!-- DOCS: ### -->
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
declare const select$1: <T extends unknown>(question: string | Breadcrumb, items: T[], initial?: number | T, rows?: any[][] | ItemToRowMapFunction<T>, headers?: any[][] | RemapOf<T, string>, tableOptions?: TableOptions) => Promise<T>;
/**<!-- DOCS: ### -->
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
declare const multiselect$1: <T extends unknown>(question: string | Breadcrumb, items: T[], initial?: number[] | T[], rows?: any[][] | ItemToRowMapFunction<T>, headers?: any[][] | RemapOf<T, string>, tableOptions?: TableOptions) => Promise<T[]>;

declare namespace table {
  export {
    select$1 as select,
    multiselect$1 as multiselect,
  };
}

interface PromptChoiceObject<T = string> {
    title?: string;
    value?: T;
    selected?: boolean;
}
declare type PromptChoice<T = string> = string | PromptChoiceObject<T>;
/**<!-- DOCS: ### -->
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
declare const text: (question: string | Breadcrumb, initial?: string) => Promise<string>;
/**<!-- DOCS: ### -->
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
declare const autotext: <T = string>(question: string | Breadcrumb, choices: PromptChoice<T>[], initial?: string | T, choiceLimit?: number) => Promise<T>;
/**<!-- DOCS: ### -->
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
declare const number: (question: string | Breadcrumb, initial?: number) => Promise<number>;
/**<!-- DOCS: ### -->
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
declare const boolean: (question: string | Breadcrumb, initial?: boolean, yesTxt?: string, noTxt?: string) => Promise<boolean>;
/**<!-- DOCS: ### -->
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
declare const booleanAlt: (question: string | Breadcrumb, initial?: boolean) => Promise<boolean>;
/**<!-- DOCS: ### -->
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
declare const select: <T = string>(question: string | Breadcrumb, choices: PromptChoice<T>[], initial?: T) => Promise<T>;
/**<!-- DOCS: ### -->
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
declare const multiselect: <T = string>(question: string | Breadcrumb, choices: PromptChoice<T>[], initial?: PromptChoice<T> | PromptChoice<T>[], canSelectAll?: boolean) => Promise<T[]>;
interface CRUDOptions {
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    canDeleteAll: boolean;
}
declare type CRUD = 'none' | 'create' | 'update' | 'delete' | 'delete-all';
/**<!-- DOCS: ### -->
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
declare const crud: (question: string | Breadcrumb, itemName?: string, items?: any[], options?: Partial<CRUDOptions>) => Promise<CRUD>;
/**<!-- DOCS: ### -->
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
declare const validate: <T = string, I = string>(askFunc: (initialValue?: T) => I | Promise<I>, validateFn: (input: Awaited<I>) => boolean | string) => Promise<I>;
/**<!-- DOCS: ### -->
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
declare const imitate: (done: boolean, question: string | Breadcrumb, result?: any) => number;
/**<!-- DOCS: ### -->
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
declare const prefill: <T extends unknown = string>(value: T, question: string | Breadcrumb, askFn: (question: string | Breadcrumb) => T | Promise<T>) => Promise<T>;
/**<!-- DOCS: ### -->
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
declare const loading: (question: string | Breadcrumb) => {
    stop: () => void;
};
/**<!-- DOCS: ### -->
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
declare const pause: (text?: string | Breadcrumb) => Promise<void>;
/**<!-- DOCS: ### -->
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
declare const countdown: (totalSeconds: number, template?: (s: second) => string, complete?: string) => Promise<void>;
/**<!-- DOCS: ### -->
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
declare const wizard: <T extends unknown>(startObj?: Partial<T>) => {
    add(partial: Partial<T>): void;
    getPartial(): Partial<T>;
    get(): T;
};
declare type TitleFn<T> = (item: T, index: number, arr: T[]) => string;
declare const utils: {
    itemsToPromptObjects: <T = string>(items: T[], titles?: string[], titleFn?: TitleFn<T>) => {
        title: string;
        value: T;
    }[];
};

declare const ask_text: typeof text;
declare const ask_autotext: typeof autotext;
declare const ask_number: typeof number;
declare const ask_boolean: typeof boolean;
declare const ask_booleanAlt: typeof booleanAlt;
declare const ask_select: typeof select;
declare const ask_multiselect: typeof multiselect;
type ask_CRUDOptions = CRUDOptions;
type ask_CRUD = CRUD;
declare const ask_crud: typeof crud;
declare const ask_validate: typeof validate;
declare const ask_imitate: typeof imitate;
declare const ask_prefill: typeof prefill;
declare const ask_loading: typeof loading;
declare const ask_pause: typeof pause;
declare const ask_countdown: typeof countdown;
declare const ask_wizard: typeof wizard;
declare const ask_utils: typeof utils;
declare const ask_trim: typeof trim;
declare const ask_fileExplorer: typeof fileExplorer;
declare const ask_multiFileExplorer: typeof multiFileExplorer;
declare const ask_saveFileExplorer: typeof saveFileExplorer;
declare const ask_section: typeof section;
declare const ask_separator: typeof separator;
declare const ask_date: typeof date;
declare const ask_time: typeof time;
declare const ask_datetime: typeof datetime;
declare const ask_dateRange: typeof dateRange;
declare const ask_table: typeof table;
declare namespace ask {
  export {
    ask_text as text,
    ask_autotext as autotext,
    ask_number as number,
    ask_boolean as boolean,
    ask_booleanAlt as booleanAlt,
    ask_select as select,
    ask_multiselect as multiselect,
    ask_CRUDOptions as CRUDOptions,
    ask_CRUD as CRUD,
    ask_crud as crud,
    ask_validate as validate,
    ask_imitate as imitate,
    ask_prefill as prefill,
    ask_loading as loading,
    ask_pause as pause,
    ask_countdown as countdown,
    ask_wizard as wizard,
    ask_utils as utils,
    ask_trim as trim,
    ask_fileExplorer as fileExplorer,
    ask_multiFileExplorer as multiFileExplorer,
    ask_saveFileExplorer as saveFileExplorer,
    ask_section as section,
    ask_separator as separator,
    ask_date as date,
    ask_time as time,
    ask_datetime as datetime,
    ask_dateRange as dateRange,
    ask_table as table,
  };
}

/**<!-- DOCS: ## -->
 * progressBarTools
 *
 * A collection of tools for working with progress bars (from swiss-ak)
 */
/**<!-- DOCS: ### -->
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
declare const getColouredProgressBarOpts: (opts: ProgressBarOptions, randomise?: boolean) => (prefix?: string, override?: ProgressBarOptions, resetColours?: boolean) => ProgressBarOptions;

declare const progressBarTools_getColouredProgressBarOpts: typeof getColouredProgressBarOpts;
declare namespace progressBarTools {
  export {
    progressBarTools_getColouredProgressBarOpts as getColouredProgressBarOpts,
  };
}

/**<!-- DOCS: ## -->
 * LogTools
 *
 * A collection of tools for logging
 */
/**<!-- DOCS: ### -->
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
/**<!-- DOCS: ### -->
 * processLogContents
 *
 * - `LogTools.processLogContents`
 * - `processLogContents`
 *
 * Process an item to be logged
 */
declare const processLogContents: (prefix: string, wrapper?: Function, ...args: any[]) => string;
/**<!-- DOCS: ### -->
 * getLog
 *
 * - `LogTools.getLog`
 * - `getLog`
 *
 * Get a log function for a given prefix
 */
declare const getLog: (prefix: string, wrapper?: Function) => (...args: any[]) => void;

declare const LogTools_getLogStr: typeof getLogStr;
declare const LogTools_processLogContents: typeof processLogContents;
declare const LogTools_getLog: typeof getLog;
declare namespace LogTools {
  export {
    LogTools_getLogStr as getLogStr,
    LogTools_processLogContents as processLogContents,
    LogTools_getLog as getLog,
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
/**<!-- DOCS: ### 401 -->
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
/**<!-- DOCS: ### 400 -->
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
/**<!-- DOCS: ### 450 -->
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
/**<!-- DOCS: ### 460 -->
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

/**<!-- DOCS: ## -->
 * waiters
 */
/**<!-- DOCS: ### -->
 * nextTick
 *
 * - `nextTick`
 *
 * Wait for the next tick
 *
 * ```typescript
 * wait nextTick();
 * ```
 */
declare const nextTick: () => Promise<unknown>;

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
declare const explodePath: (path: string) => ExplodedPath;
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
interface ExplodedPath {
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
declare const removeTrailSlash: (path: string) => string;
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
declare const trailSlash: (path: string) => string;
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
declare const removeDoubleSlashes: (path: string) => string;

declare const PathTools_explodePath: typeof explodePath;
type PathTools_ExplodedPath = ExplodedPath;
declare const PathTools_removeTrailSlash: typeof removeTrailSlash;
declare const PathTools_trailSlash: typeof trailSlash;
declare const PathTools_removeDoubleSlashes: typeof removeDoubleSlashes;
declare namespace PathTools {
  export {
    PathTools_explodePath as explodePath,
    PathTools_ExplodedPath as ExplodedPath,
    PathTools_removeTrailSlash as removeTrailSlash,
    PathTools_trailSlash as trailSlash,
    PathTools_removeDoubleSlashes as removeDoubleSlashes,
  };
}

interface KeyListener {
    start(): void;
    stop(): void;
}
/**<!-- DOCS: ## -->
 * keyListener
 */
/**<!-- DOCS: ### -->
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

export { Breadcrumb, Colour, DefaultLogger, ExplodedPath, LineCounter, LogConfig, LogOptions, LogTools, Logger, PathTools, ask, chlk, clr, createLogger, explodePath, getBreadcrumb, getKeyListener, getLineCounter, getLog, getLogStr, log, nextTick, out, processLogContents, progressBarTools, table$1 as table };
