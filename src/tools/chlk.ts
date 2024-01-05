import chalk from 'chalk';

// Deprecated

export namespace chlk {
  export const gray0 = chalk.black as unknown as any;

  export const gray1 = chalk.gray.dim as unknown as any;

  export const gray2 = chalk.white.dim as unknown as any;

  export const gray3 = chalk.whiteBright.dim as unknown as any;

  export const gray4 = chalk.white as unknown as any;

  export const gray5 = chalk.whiteBright as unknown as any;

  export const grays: any[] = [
    // grays
    gray0,
    gray1,
    gray2,
    gray3,
    gray4,
    gray5
  ];

  export const gray = (num: number) => grays[Math.max(0, Math.min(num, grays.length - 1))];

  export const clear = (str: string) => str.replace(new RegExp(`\\u001b\[[0-9]+m`, 'g'), '');

  export const not = (style: Function) => {
    const styled = style('**xxx**');
    const [after, before] = styled.split('**xxx**');
    return (item: string) => `${before}${item}${after}`;
  };

  export const notUnderlined = not(chalk.underline);
}
