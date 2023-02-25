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

/**
 * gray0
 *
 * Gray 0 (0-5). Equivalent to chalk.black
 */
const gray0 = chalk.black as ChalkFn;

/**
 * gray1
 *
 * Gray 1 (0-5). Equivalent to chalk.gray.dim
 */
const gray1 = chalk.gray.dim as ChalkFn;

/**
 * gray2
 *
 * Gray 2 (0-5). Equivalent to chalk.white.dim
 */
const gray2 = chalk.white.dim as ChalkFn;

/**
 * gray3
 *
 * Gray 3 (0-5). Equivalent to chalk.whiteBright.dim
 */
const gray3 = chalk.whiteBright.dim as ChalkFn;

/**
 * gray4
 *
 * Gray 4 (0-5). Equivalent to chalk.white
 */
const gray4 = chalk.white as ChalkFn;

/**
 * gray5
 *
 * Gray 5 (0-5). Equivalent to chalk.whiteBright
 */
const gray5 = chalk.whiteBright as ChalkFn;

/**
 * grays
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

/**
 * gray
 *
 * Grays between 0 and 5.
 *
 * ```typescript
 * gray(2); // gray2
 * ```
 */
const gray = (num: number) => grays[Math.max(0, Math.min(num, grays.length - 1))];

// Removes ANSI colours. Not same as chalk.reset
const clear = (str: string) => str.replace(new RegExp(`\\u001b\[[0-9]+m`, 'g'), '');

// Be careful how you use this
const not = (style: Function) => {
  const styled = style('**xxx**');
  const [after, before] = styled.split('**xxx**');
  return (item: string) => `${before}${item}${after}`;
};

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

/**
 * clr
 *
 * A collection of shortcuts and aliases for chalk functions
 */
export const clr = {
  hl1: chalk.yellowBright.bold as ChalkFn,
  hl2: chalk.yellow as ChalkFn,
  approve: chalk.green.bold as ChalkFn,
  create: chalk.greenBright.bold as ChalkFn,
  update: chalk.yellow.bold as ChalkFn,
  delete: chalk.redBright.bold as ChalkFn,
  deleteAll: chalk.redBright.bold as ChalkFn,

  blue: chalk.blueBright as ChalkFn,
  cyan: chalk.cyanBright as ChalkFn,
  green: chalk.greenBright as ChalkFn,
  magenta: chalk.magentaBright as ChalkFn,
  red: chalk.redBright as ChalkFn,
  yellow: chalk.yellowBright as ChalkFn,

  t1: chalk.yellowBright as ChalkFn,
  t2: chalk.magentaBright as ChalkFn,
  t3: chalk.blueBright as ChalkFn,
  t4: chalk.redBright as ChalkFn,
  t5: chalk.greenBright as ChalkFn,
  t6: chalk.cyanBright as ChalkFn,

  gray0,
  gray1,
  gray2,
  gray3,
  gray4,
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
