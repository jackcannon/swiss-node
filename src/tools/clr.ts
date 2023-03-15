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
/**<!-- DOCS: ## -->
 * chlk
 *
 * A collection of colours and styles for use in the console.
 */

/**<!-- DOCS: ### -->
 * gray0
 *
 * - `chlk.gray0`
 * - `clr.gray0`
 *
 * Gray 0 (0-5). Equivalent to chalk.black
 */
const gray0 = chalk.black as unknown as ChalkFn;

/**<!-- DOCS: ### -->
 * gray1
 *
 * - `chlk.gray1`
 * - `clr.gray1`
 *
 * Gray 1 (0-5). Equivalent to chalk.gray.dim
 */
const gray1 = chalk.gray.dim as unknown as ChalkFn;

/**<!-- DOCS: ### -->
 * gray2
 *
 * - `chlk.gray2`
 * - `clr.gray2`
 *
 * Gray 2 (0-5). Equivalent to chalk.white.dim
 */
const gray2 = chalk.white.dim as unknown as ChalkFn;

/**<!-- DOCS: ### -->
 * gray3
 *
 * - `chlk.gray3`
 * - `clr.gray3`
 *
 * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
 */
const gray3 = chalk.whiteBright.dim as unknown as ChalkFn;

/**<!-- DOCS: ### -->
 * gray4
 *
 * - `chlk.gray4`
 * - `clr.gray4`
 *
 * Gray 4 (0-5). Equivalent to chalk.white
 */
const gray4 = chalk.white as unknown as ChalkFn;

/**<!-- DOCS: ### -->
 * gray5
 *
 * - `chlk.gray5`
 * - `clr.gray5`
 *
 * Gray 5 (0-5). Equivalent to chalk.whiteBright
 */
const gray5 = chalk.whiteBright as unknown as ChalkFn;

/**<!-- DOCS: ### -->
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
const grays: ChalkFn[] = [
  // grays
  gray0,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5
];

/**<!-- DOCS: ### -->
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
const gray = (num: number) => grays[Math.max(0, Math.min(num, grays.length - 1))];

/**<!-- DOCS: ### -->
 * clear
 *
 * - `chlk.clear`
 *
 * Removes ANSI colours. Not same as chalk.reset
 */
const clear = (str: string) => str.replace(new RegExp(`\\u001b\[[0-9]+m`, 'g'), '');

/**<!-- DOCS: ### -->
 * not
 *
 * - `chlk.not`
 *
 * Stops and restarts a style around a given string
 */
const not = (style: Function) => {
  const styled = style('**xxx**');
  const [after, before] = styled.split('**xxx**');
  return (item: string) => `${before}${item}${after}`;
};

/**<!-- DOCS: ### -->
 * notUnderlined
 *
 * - `chlk.notUnderlined`
 *
 * Dont underline a section of text
 */
const notUnderlined = not(chalk.underline);

export const chlk = {
  gray0,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5,
  grays,
  gray,
  clear,
  not,
  notUnderlined
};

//<!-- DOCS: 600 -->
/**<!-- DOCS: ## -->
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
export const clr = {
  /**<!-- DOCS: ### -->
   * hl1
   *
   * - `clr.hl1`
   *
   * Highlight 1
   */
  hl1: chalk.yellowBright.bold as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * hl2
   *
   * - `clr.hl2`
   *
   * Highlight 2
   */
  hl2: chalk.yellow as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * approve
   *
   * - `clr.approve`
   *
   * Approval colour (green)
   */
  approve: chalk.green.bold as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * create
   *
   * - `clr.create`
   *
   * Create colour (greenBright)
   */
  create: chalk.greenBright.bold as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * update
   *
   * - `clr.update`
   *
   * Update colour (yellow)
   */
  update: chalk.yellow.bold as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * delete
   *
   * - `clr.delete`
   *
   * Delete colour (red)
   */
  delete: chalk.redBright.bold as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * deleteAll
   *
   * - `clr.deleteAll`
   *
   * Delete all colour (red)
   */
  deleteAll: chalk.redBright.bold as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * blue
   *
   * - `clr.blue`
   *
   * Alias for chalk.blueBright
   */
  blue: chalk.blueBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * cyan
   *
   * - `clr.cyan`
   *
   * Alias for chalk.cyanBright
   */
  cyan: chalk.cyanBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * green
   *
   * - `clr.green`
   *
   * Alias for chalk.greenBright
   */
  green: chalk.greenBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * magenta
   *
   * - `clr.magenta`
   *
   * Alias for chalk.magentaBright
   */
  magenta: chalk.magentaBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * red
   *
   * - `clr.red`
   *
   * Alias for chalk.redBright
   */
  red: chalk.redBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * yellow
   *
   * - `clr.yellow`
   *
   * Alias for chalk.yellowBright
   */
  yellow: chalk.yellowBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * t1
   *
   * - `clr.t1`
   *
   * Theme 1
   */
  t1: chalk.yellowBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * t2
   *
   * - `clr.t2`
   *
   * Theme 2
   */
  t2: chalk.magentaBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * t3
   *
   * - `clr.t3`
   *
   * Theme 3
   */
  t3: chalk.blueBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * t4
   *
   * - `clr.t4`
   *
   * Theme 4
   */
  t4: chalk.redBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * t5
   *
   * - `clr.t5`
   *
   * Theme 5
   */
  t5: chalk.greenBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * t6
   *
   * - `clr.t6`
   *
   * Theme 6
   */
  t6: chalk.cyanBright as unknown as ChalkFn,

  /**<!-- DOCS: ### -->
   * gray0
   *
   * - `chlk.gray0`
   * - `clr.gray0`
   *
   * Gray 0 (0-5). Equivalent to chalk.black
   */
  gray0,

  /**<!-- DOCS: ### -->
   * gray1
   *
   * - `chlk.gray1`
   * - `clr.gray1`
   *
   * Gray 1 (0-5). Equivalent to chalk.gray.dim
   */
  gray1,

  /**<!-- DOCS: ### -->
   * gray2
   *
   * - `chlk.gray2`
   * - `clr.gray2`
   *
   * Gray 2 (0-5). Equivalent to chalk.white.dim
   */
  gray2,

  /**<!-- DOCS: ### -->
   * gray3
   *
   * - `chlk.gray3`
   * - `clr.gray3`
   *
   * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
   */
  gray3,

  /**<!-- DOCS: ### -->
   * gray4
   *
   * - `chlk.gray4`
   * - `clr.gray4`
   *
   * Gray 4 (0-5). Equivalent to chalk.white
   */
  gray4,

  /**<!-- DOCS: ### -->
   * gray5
   *
   * - `chlk.gray5`
   * - `clr.gray5`
   *
   * Gray 5 (0-5). Equivalent to chalk.whiteBright
   */
  gray5
};

export type Colour = keyof typeof clr;

// Note: inventing own syntax is a bad idea. Keeping this as a warning to future me.
// const getChalkFromColour = (origCol: string) => {
//   const colours = origCol.split('.').map((funcName) => funcName.replace(/B$/g, 'Bright'));
//   const funcs = colours.map((funcName) => chalk[funcName] || fn.noact);
//   return (text: string) => funcs.reduce((txt, func) => func(txt), text);
// };
// export const clr = (...str: any[]) =>
//   str
//     .map(fn.maps.toString)
//     .join(' ')
//     .replace(/\$([A-Za-z.]+?)\{(.+?)\}/g, (_subs: string, colour: string, text: string) => getChalkFromColour(colour)(text));
