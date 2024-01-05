import chalk from 'chalk';
import { chlk } from './chlk';

// Deprecated

export namespace clr {
  export const hl1 = chalk.yellowBright.bold as unknown as any;

  export const hl2 = chalk.yellow as unknown as any;

  export const approve = chalk.green.bold as unknown as any;

  export const create = chalk.greenBright.bold as unknown as any;

  export const update = chalk.yellow.bold as unknown as any;

  export const remove = chalk.redBright.bold as unknown as any;

  export const removeAll = chalk.redBright.bold as unknown as any;

  export const blue = chalk.blueBright as unknown as any;

  export const cyan = chalk.cyanBright as unknown as any;

  export const green = chalk.greenBright as unknown as any;

  export const magenta = chalk.magentaBright as unknown as any;

  export const red = chalk.redBright as unknown as any;

  export const yellow = chalk.yellowBright as unknown as any;

  export const t1 = chalk.yellowBright as unknown as any;

  export const t2 = chalk.magentaBright as unknown as any;

  export const t3 = chalk.blueBright as unknown as any;

  export const t4 = chalk.redBright as unknown as any;

  export const t5 = chalk.greenBright as unknown as any;

  export const t6 = chalk.cyanBright as unknown as any;

  export const gray0 = chlk.gray0;

  export const gray1 = chlk.gray1;

  export const gray2 = chlk.gray2;

  export const gray3 = chlk.gray3;

  export const gray4 = chlk.gray4;

  export const gray5 = chlk.gray5;
}

export type Colour = keyof typeof clr;
