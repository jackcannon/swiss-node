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
/**
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
declare const clr: {
    hl1: ChalkFn;
    hl2: ChalkFn;
    approve: ChalkFn;
    create: ChalkFn;
    update: ChalkFn;
    delete: ChalkFn;
    deleteAll: ChalkFn;
    blue: ChalkFn;
    cyan: ChalkFn;
    green: ChalkFn;
    magenta: ChalkFn;
    red: ChalkFn;
    yellow: ChalkFn;
    t1: ChalkFn;
    t2: ChalkFn;
    t3: ChalkFn;
    t4: ChalkFn;
    t5: ChalkFn;
    t6: ChalkFn;
    gray0: ChalkFn;
    gray1: ChalkFn;
    gray2: ChalkFn;
    gray3: ChalkFn;
    gray4: ChalkFn;
    gray5: ChalkFn;
};
declare type Colour = keyof typeof clr;

/**
 * Breadcrumb
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
declare type Breadcrumb = {
    (...tempNames: string[]): Breadcrumb;
    setColours: (colours: Colour[]) => void;
    add: (...names: string[]) => number;
    getNames: (...tempNames: string[]) => any[];
    sub: (...tempNames: string[]) => Breadcrumb;
    get(...tempNames: string[]): string;
    toString(): string;
};
/**
 * getBreadcrumb
 *
 * Returns an empty breadcrumb object
 */
declare const getBreadcrumb: (...baseNames: string[]) => Breadcrumb;

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
declare const trim: (totalFrames: number, frameRate: number, options?: Partial<AskTrimOptions>) => Promise<Handles<number>>;

declare const fileExplorer: (questionText: string | Breadcrumb, selectType?: 'd' | 'f', startPath?: string) => Promise<string>;
declare const multiFileExplorer: (questionText: string | Breadcrumb, selectType?: 'd' | 'f', startPath?: string) => Promise<string[]>;
declare const saveFileExplorer: (questionText: string | Breadcrumb, startPath?: string, suggestedFileName?: string) => Promise<string>;

interface LineCounter {
    /**
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
    move(lines: number): void;
    /**
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
    /**
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
    /**
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
    getSince(checkpointID: string): number;
    /**
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
    /**
     * lc.clearBack
     *
     * Clears a given number of lines, and updates the line counter
     */
    clearBack(linesToMoveBack: number, limitToRecordedLines?: boolean): void;
    /**
     * lc.checkpoint
     *
     * Records a 'checkpoint' that can be returned to later
     */
    checkpoint(checkpointID?: string): string;
    /**
     * lc.clearToCheckpoint
     *
     * Clear lines up to a previously recorded checkpoint
     */
    clearToCheckpoint(checkpointID: string): void;
}
/**
 * getLineCounter
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

declare const separator: (version?: 'down' | 'none' | 'up', spacing?: number, offset?: number, width?: number) => number;
declare type UnwrapPromFunc<T> = T extends (...args: any[]) => Promise<infer U> ? U : T;
declare type UnwrapPromFuncs<T extends [...any[]]> = T extends [infer Head, ...infer Tail] ? [UnwrapPromFunc<Head>, ...UnwrapPromFuncs<Tail>] : [];
/**
 * ask.section
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

declare const date: (questionText?: string | Breadcrumb, initial?: Date) => Promise<Date>;
declare const time: (questionText?: string | Breadcrumb, initial?: Date) => Promise<Date>;
declare const datetime: (questionText?: string | Breadcrumb, initial?: Date) => Promise<Date>;
declare const dateRange: (questionText?: string | Breadcrumb, initialStart?: Date, initialEnd?: Date) => Promise<[Date, Date]>;

declare type Text = string | string[];

/**
 * out.pad
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
/**
 * out.center
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
/**
 * out.left
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
/**
 * out.right
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
/**
 * out.justify
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
declare const leftLines: (lines: string[], width?: number) => string[];
declare const centerLines: (lines: string[], width?: number) => string[];
declare const rightLines: (lines: string[], width?: number) => string[];
declare const justifyLines: (lines: string[], width?: number) => string[];
/**
 * out.align
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
declare const split: (leftItem: any, rightItem: any, width?: number, replaceChar?: string) => string;
/**
 * out.wrap
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
/**
 * out.moveUp
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
/**
 * out.loading
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
/**
 * out.utils.hasColor
 *
 * Determine whether a given string contains any chalk-ed colours
 */
declare const hasColor: (str: string) => boolean;
/**
 * out.limitToLength
 *
 * Limit the length of a string to the given length
 *
 * ```typescript
 * out.limitToLength('This is a very long sentence', 12); // 'This is a ve'
 * ```
 */
declare const limitToLength: (text: string, maxLength: number) => string;
declare const limitToLengthStart: (text: string, maxLength: number) => string;
/**
 * out.truncate
 *
 * Limit the length of a string to the given length, and add an ellipsis if necessary
 *
 * ```typescript
 * out.truncate('This is a very long sentence', 15); // 'This is a ve...'
 * ```
 */
declare const truncate: (text: string, maxLength?: number, suffix?: string) => string;
declare const truncateStart: (text: string, maxLength?: number, suffix?: string) => string;
declare const concatLineGroups: (...groups: string[][]) => string[];
declare type ResponsiveOption<T> = {
    minColumns?: number;
    value: T;
};
declare const getResponsiveValue: <T extends unknown>(options: ResponsiveOption<T>[]) => T;
declare const out: {
    pad: (line: string, start: number, end: number, replaceChar?: string) => string;
    center: AlignFunction;
    left: AlignFunction;
    right: AlignFunction;
    justify: AlignFunction;
    align: (item: any, direction: AlignType, width?: number, replaceChar?: string, forceWidth?: boolean) => string;
    split: (leftItem: any, rightItem: any, width?: number, replaceChar?: string) => string;
    wrap: (item: any, width?: number, alignment?: AlignType, forceWidth?: boolean) => string;
    moveUp: (lines?: number) => void;
    loading: (action?: (s: string) => any, lines?: number, symbols?: string[]) => {
        stop: () => void;
    };
    limitToLength: (text: string, maxLength: number) => string;
    limitToLengthStart: (text: string, maxLength: number) => string;
    truncate: (text: string, maxLength?: number, suffix?: string) => string;
    truncateStart: (text: string, maxLength?: number, suffix?: string) => string;
    getLineCounter: () => LineCounter;
    getBreadcrumb: (...baseNames: string[]) => Breadcrumb;
    concatLineGroups: (...groups: string[][]) => string[];
    getResponsiveValue: <T extends unknown>(options: ResponsiveOption<T>[]) => T;
    utils: {
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
};

interface TableFormatConfig {
    formatFn: Function;
    isHeader?: boolean;
    isBody?: boolean;
    row?: number;
    col?: number;
}
interface FullTableOptions {
    /**
     * Function to wrap each line of the table in (e.g. chalk.blue)
     */
    wrapperFn: Function;
    wrapLinesFn: Function;
    /**
     * Character to use instead of lines
     */
    overrideChar: string;
    /**
     * Character to use instead of horizontal lines
     */
    overrideHorChar: string;
    /**
     * Character to use instead of vertical lines
     */
    overrideVerChar: string;
    /**
     * Whether to draw the outer border of the table
     */
    drawOuter: boolean;
    /**
     * Whether to draw lines between rows (other than separating header and body)
     */
    drawRowLines: boolean;
    /**
     * Whether to draw lines between columns
     */
    drawColLines: boolean;
    /**
     * Preferred width (in number of characters) of each column
     */
    colWidths: number[];
    /**
     * How the table should be aligned on the screen
     *
     * left, right, center or justify
     */
    align: AlignType;
    /**
     * How each column should be aligned
     *
     * Array with alignment for each column: left, right, center or justify
     */
    alignCols: AlignType[];
    /**
     * Change rows into columns and vice versa
     */
    transpose: boolean;
    /**
     * Change rows into columns and vice versa (body only)
     */
    transposeBody: boolean;
    /**
     * How much spacing to leave around the outside of the table
     * todo update docs for multiple margins
     */
    margin: number | number[];
    cellPadding: number;
    format: TableFormatConfig[];
    truncate: false | string;
    maxWidth: number;
}
declare type TableOptions = Partial$1<FullTableOptions>;
declare const table$1: {
    getLines: (body: any[][], header?: any[][], options?: TableOptions) => string[];
    print: (body: any[][], header?: any[][], options?: TableOptions) => number;
    printObjects: (objects: Object[], headers?: Object, options?: TableOptions) => number;
    utils: {
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
};

declare type ItemToRowMapFunction<T extends unknown> = (item?: T, index?: number, items?: T[]) => any[];
declare const select$1: <T extends unknown>(question: string | Breadcrumb, items: T[], initial?: number | T, rows?: any[][] | ItemToRowMapFunction<T>, headers?: any[][] | RemapOf<T, string>, tableOptions?: TableOptions) => Promise<T>;
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
/**
 * ask.text
 *
 * Get a text input from the user.
 *
 * ```typescript
 * const name = await ask.text('What is your name?'); // 'Jack'
 * ```
 */
declare const text: (question: string | Breadcrumb, initial?: string) => Promise<string>;
/**
 * ask.autotext
 *
 * Get a text input from the user, with auto-completion.
 *
 * ```typescript
 * const name = await ask.autotext('What is your name?', ['Jack', 'Jane', 'Joe']); // 'Jack'
 * ```
 */
declare const autotext: <T = string>(question: string | Breadcrumb, choices: PromptChoice<T>[], initial?: string | T, choiceLimit?: number) => Promise<T>;
/**
 * ask.number
 *
 * Get a number input from the user.
 *
 * ```typescript
 * const age = await ask.number('How old are you?'); // 30
 * ```
 */
declare const number: (question: string | Breadcrumb, initial?: number) => Promise<number>;
/**
 * ask.boolean
 *
 * Get a boolean input from the user (yes or no)
 *
 * ```typescript
 * const isCool = await ask.boolean('Is this cool?'); // true
 * ```
 */
declare const boolean: (question: string | Breadcrumb, initial?: boolean, yesTxt?: string, noTxt?: string) => Promise<boolean>;
/**
 * ask.booleanAlt
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
/**
 * ask.select
 *
 * Get the user to select an option from a list.
 *
 * ```typescript
 * const colour = await ask.select('Whats your favourite colour?', ['red', 'green', 'blue']); // 'red'
 * ```
 */
declare const select: <T = string>(question: string | Breadcrumb, choices: PromptChoice<T>[], initial?: T) => Promise<T>;
/**
 * ask.multiselect
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
/**
 * ask.crud
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
/**
 * ask.validate
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
/**
 * ask.imitate
 *
 * Imitate the display of a prompt
 *
 * ```typescript
 * ask.imitate(true, 'What is your name?', 'Jack');
 * ```
 */
declare const imitate: (done: boolean, question: string | Breadcrumb, result?: any) => number;
/**
 * ask.prefill
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
/**
 * ask.loading
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
/**
 * ask.pause
 *
 * Pause the program until the user presses enter
 *
 * ```typescript
 * await ask.pause();
 * ```
 */
declare const pause: (text?: string | Breadcrumb) => Promise<void>;
/**
 * ask.countdown
 *
 * Animated countdown for a given number of seconds
 *
 * ```typescript
 * await ask.countdown(5);
 * ```
 */
declare const countdown: (totalSeconds: number, template?: (s: second) => string, complete?: string) => Promise<void>;
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

declare const progressBarUtils: {
    getColouredProgressBarOpts: (opts: ProgressBarOptions, randomise?: boolean) => (prefix?: string, override?: ProgressBarOptions, resetColours?: boolean) => ProgressBarOptions;
};

/**
 * LogUtils.getLogStr
 *
 * Get a string for a given object as it would be printed by console.log
 */
declare const getLogStr: (item: any) => string;
/**
 * LogUtils.processLogContents
 *
 * Process an item to be logged
 */
declare const processLogContents: (prefix: string, wrapper?: Function, ...args: any[]) => string;
/**
 * LogUtils.getLog
 *
 * Get a log function for a given prefix
 */
declare const getLog: (prefix: string, wrapper?: Function) => (...args: any[]) => void;

declare const LogUtils_getLogStr: typeof getLogStr;
declare const LogUtils_processLogContents: typeof processLogContents;
declare const LogUtils_getLog: typeof getLog;
declare namespace LogUtils {
  export {
    LogUtils_getLogStr as getLogStr,
    LogUtils_processLogContents as processLogContents,
    LogUtils_getLog as getLog,
  };
}

interface LogOptions {
    /**
     * Default: false
     */
    showDate?: boolean;
    /**
     * Default: true
     */
    showTime?: boolean;
    /**
     * Default: true
     */
    enableColours?: boolean;
}
interface LogConfigs {
    [key: string]: LogConfig;
}
interface LogConfig {
    name: string;
    nameColour?: Function;
    showDate?: boolean;
    showTime?: boolean;
    contentColour?: Function;
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

interface ExplodedPath {
    /**
     * The full original path as it was passed in.
     */
    path: string;
    /**
     * The directory path of the given path
     *
     * Note: no trailing slash
     */
    dir: string;
    /**
     * the ancestral folders of the given dir as an array
     */
    folders: string[];
    /**
     * the name of the file, not including the extension
     */
    name: string;
    /**
     * the extension of the file, not including the dot
     */
    ext: string;
    /**
     * the full name of the file, including the extension (and dot)
     */
    filename: string;
}
/**
 * explodePath
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
/**
 * PathUtils.removeTrailSlash
 *
 * Remove trailing slash from path (if one exists)
 *
 * ```typescript
 * '/path/to/file/' -> '/path/to/file'
 * ```
 */
declare const removeTrailSlash: (path: string) => string;
/**
 * PathUtils.trailSlash
 *
 * Ensures there's a trailing slash on path
 *
 * ```typescript
 * '/path/to/file' -> '/path/to/file/'
 * ```
 */
declare const trailSlash: (path: string) => string;
/**
 * PathUtils.removeDoubleSlashes
 *
 * Removes double slashes from path (an bug with Unix paths)
 *
 * ```typescript
 * '/path/to//file' -> '/path/to/file'
 * ```
 */
declare const removeDoubleSlashes: (path: string) => string;

type PathUtils_ExplodedPath = ExplodedPath;
declare const PathUtils_explodePath: typeof explodePath;
declare const PathUtils_removeTrailSlash: typeof removeTrailSlash;
declare const PathUtils_trailSlash: typeof trailSlash;
declare const PathUtils_removeDoubleSlashes: typeof removeDoubleSlashes;
declare namespace PathUtils {
  export {
    PathUtils_ExplodedPath as ExplodedPath,
    PathUtils_explodePath as explodePath,
    PathUtils_removeTrailSlash as removeTrailSlash,
    PathUtils_trailSlash as trailSlash,
    PathUtils_removeDoubleSlashes as removeDoubleSlashes,
  };
}

interface KeyListener {
    start(): void;
    stop(): void;
}
declare const getKeyListener: (callback: (keyName?: string, rawValue?: string) => void, isStart?: boolean, isDebugLog?: boolean) => KeyListener;

export { AlignType, Breadcrumb, Colour, DefaultLogger, ExplodedPath, FullTableOptions, LineCounter, LogConfig, LogConfigs, LogOptions, LogUtils, Logger, PathUtils, ResponsiveOption, TableFormatConfig, TableOptions, align, ask, center, centerLines, chlk, clr, concatLineGroups, createLogger, explodePath, getBreadcrumb, getKeyListener, getLineCounter, getLog, getLogStr, getResponsiveValue, hasColor, justify, justifyLines, left, leftLines, limitToLength, limitToLengthStart, loading$1 as loading, log, moveUp, out, pad, processLogContents, progressBarUtils, right, rightLines, split, table$1 as table, truncate, truncateStart, wrap };
