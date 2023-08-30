import chalk from 'chalk';

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

//<!-- DOCS: 500 -->
/**<!-- DOCS: clr.chlk ##! -->
 * chlk
 *
 * A collection of colours and styles for use in the console.
 */
export namespace chlk {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: clr.gray0 ### -->
   * gray0
   *
   * - `chlk.gray0`
   * - `clr.gray0`
   *
   * Gray 0 (0-5). Equivalent to chalk.black
   */
  export const gray0 = chalk.black as unknown as ChalkFn;

  /**<!-- DOCS: clr.gray1 ### -->
   * gray1
   *
   * - `chlk.gray1`
   * - `clr.gray1`
   *
   * Gray 1 (0-5). Equivalent to chalk.gray.dim
   */
  export const gray1 = chalk.gray.dim as unknown as ChalkFn;

  /**<!-- DOCS: clr.gray2 ### -->
   * gray2
   *
   * - `chlk.gray2`
   * - `clr.gray2`
   *
   * Gray 2 (0-5). Equivalent to chalk.white.dim
   */
  export const gray2 = chalk.white.dim as unknown as ChalkFn;

  /**<!-- DOCS: clr.gray3 ### -->
   * gray3
   *
   * - `chlk.gray3`
   * - `clr.gray3`
   *
   * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
   */
  export const gray3 = chalk.whiteBright.dim as unknown as ChalkFn;

  /**<!-- DOCS: clr.gray4 ### -->
   * gray4
   *
   * - `chlk.gray4`
   * - `clr.gray4`
   *
   * Gray 4 (0-5). Equivalent to chalk.white
   */
  export const gray4 = chalk.white as unknown as ChalkFn;

  /**<!-- DOCS: clr.gray5 ### -->
   * gray5
   *
   * - `chlk.gray5`
   * - `clr.gray5`
   *
   * Gray 5 (0-5). Equivalent to chalk.whiteBright
   */
  export const gray5 = chalk.whiteBright as unknown as ChalkFn;

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
  export const grays: ChalkFn[] = [
    // grays
    gray0,
    gray1,
    gray2,
    gray3,
    gray4,
    gray5
  ];

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
  export const gray = (num: number) => grays[Math.max(0, Math.min(num, grays.length - 1))];

  /**<!-- DOCS: clr.clear ### -->
   * clear
   *
   * - `chlk.clear`
   *
   * Removes ANSI colours. Not same as chalk.reset
   */
  export const clear = (str: string) => str.replace(new RegExp(`\\u001b\[[0-9]+m`, 'g'), '');

  /**<!-- DOCS: clr.not ### -->
   * not
   *
   * - `chlk.not`
   *
   * Stops and restarts a style around a given string
   */
  export const not = (style: Function) => {
    const styled = style('**xxx**');
    const [after, before] = styled.split('**xxx**');
    return (item: string) => `${before}${item}${after}`;
  };

  /**<!-- DOCS: clr.notUnderlined ### -->
   * notUnderlined
   *
   * - `chlk.notUnderlined`
   *
   * Dont underline a section of text
   */
  export const notUnderlined = not(chalk.underline);
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

//<!-- DOCS: 600 -->
/**<!-- DOCS: clr ##! -->
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
export namespace clr {
  // SWISS-DOCS-JSDOC-REMOVE-PREV-LINE

  /**<!-- DOCS: clr.hl1 ### -->
   * hl1
   *
   * - `clr.hl1`
   *
   * Highlight 1
   */
  export const hl1 = chalk.yellowBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.hl2 ### -->
   * hl2
   *
   * - `clr.hl2`
   *
   * Highlight 2
   */
  export const hl2 = chalk.yellow as unknown as ChalkFn;

  /**<!-- DOCS: clr.approve ### -->
   * approve
   *
   * - `clr.approve`
   *
   * Approval colour (green)
   */
  export const approve = chalk.green.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.create ### -->
   * create
   *
   * - `clr.create`
   *
   * Create colour (greenBright)
   */
  export const create = chalk.greenBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.update ### -->
   * update
   *
   * - `clr.update`
   *
   * Update colour (yellow)
   */
  export const update = chalk.yellow.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.remove ### -->
   * remove
   *
   * - `clr.remove`
   *
   * Remove/delete colour (red)
   */
  export const remove = chalk.redBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.removeAll ### -->
   * removeAll
   *
   * - `clr.removeAll`
   *
   * Remove/delete all colour (red)
   */
  export const removeAll = chalk.redBright.bold as unknown as ChalkFn;

  /**<!-- DOCS: clr.blue ### -->
   * blue
   *
   * - `clr.blue`
   *
   * Alias for chalk.blueBright
   */
  export const blue = chalk.blueBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.cyan ### -->
   * cyan
   *
   * - `clr.cyan`
   *
   * Alias for chalk.cyanBright
   */
  export const cyan = chalk.cyanBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.green ### -->
   * green
   *
   * - `clr.green`
   *
   * Alias for chalk.greenBright
   */
  export const green = chalk.greenBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.magenta ### -->
   * magenta
   *
   * - `clr.magenta`
   *
   * Alias for chalk.magentaBright
   */
  export const magenta = chalk.magentaBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.red ### -->
   * red
   *
   * - `clr.red`
   *
   * Alias for chalk.redBright
   */
  export const red = chalk.redBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.yellow ### -->
   * yellow
   *
   * - `clr.yellow`
   *
   * Alias for chalk.yellowBright
   */
  export const yellow = chalk.yellowBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t1 ### -->
   * t1
   *
   * - `clr.t1`
   *
   * Theme 1
   */
  export const t1 = chalk.yellowBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t2 ### -->
   * t2
   *
   * - `clr.t2`
   *
   * Theme 2
   */
  export const t2 = chalk.magentaBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t3 ### -->
   * t3
   *
   * - `clr.t3`
   *
   * Theme 3
   */
  export const t3 = chalk.blueBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t4 ### -->
   * t4
   *
   * - `clr.t4`
   *
   * Theme 4
   */
  export const t4 = chalk.redBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t5 ### -->
   * t5
   *
   * - `clr.t5`
   *
   * Theme 5
   */
  export const t5 = chalk.greenBright as unknown as ChalkFn;

  /**<!-- DOCS: clr.t6 ### -->
   * t6
   *
   * - `clr.t6`
   *
   * Theme 6
   */
  export const t6 = chalk.cyanBright as unknown as ChalkFn;

  /** <!-- DOCS-ALIAS: clr.gray0  --> */
  export const gray0 = chlk.gray0;

  /** <!-- DOCS-ALIAS: clr.gray1  --> */
  export const gray1 = chlk.gray1;

  /** <!-- DOCS-ALIAS: clr.gray2  --> */
  export const gray2 = chlk.gray2;

  /** <!-- DOCS-ALIAS: clr.gray3  --> */
  export const gray3 = chlk.gray3;

  /** <!-- DOCS-ALIAS: clr.gray4  --> */
  export const gray4 = chlk.gray4;

  /** <!-- DOCS-ALIAS: clr.gray5  --> */
  export const gray5 = chlk.gray5;
} // SWISS-DOCS-JSDOC-REMOVE-THIS-LINE

export type Colour = keyof typeof clr;
