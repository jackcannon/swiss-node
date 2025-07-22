import { cachier } from 'swiss-ak';
import { ArrayTools, ObjectTools, StringTools, ObjOfType, safe } from 'swiss-ak';

//<!-- DOCS: 300 -->

let outputMode = 'ANSI' as 'ANSI' | 'DEBUG' | 'NONE';
const getOutputModeFn: ColrFn['getOutputMode'] = () => outputMode;
const setOutputModeFn: ColrFn['setOutputMode'] = (mode?: 'AUTO' | 'ANSI' | 'DEBUG' | 'NONE'): void => {
  if (mode === undefined) mode = outputMode;
  const args = {
    mode: safe.str(mode, false, 'ANSI')
  };

  if (args.mode === 'AUTO') {
    if (typeof process === 'undefined' || !process.stdout.isTTY) {
      args.mode = 'NONE';
    } else {
      args.mode = 'ANSI';
    }
  }

  if (!['ANSI', 'DEBUG', 'NONE'].includes(args.mode)) args.mode = 'ANSI';

  outputMode = args.mode as 'ANSI' | 'DEBUG' | 'NONE';
  if (outputMode === 'DEBUG' && debugReplacements === null) {
    // WILL use debugReplacements object, so populate it now
    populateDebugReplacements();
  }
};
setOutputModeFn('AUTO');

const getOutputForCodes = (codes: number | number[]): string => {
  if (outputMode === 'NONE') return '';
  const arrOfAnsi = [codes].flat().map((code) => `\u001B[${code}m`);
  if (outputMode === 'DEBUG') {
    return arrOfAnsi.map((ansi) => debugReplacements[ansi] || ansi).join('');
  }
  return arrOfAnsi.join('');
};
const wrapAnsi = (codes: number | number[]) =>
  [codes]
    .flat()
    .map((code) => `\u001B[${code}m`)
    .join('');
const simpleStringify = (item: any, depth: number = 0): string => {
  if (depth > 4) return '';
  try {
    if (item === undefined || item === null) return '';

    if (Array.isArray(item)) {
      return '[' + item.map((v) => simpleStringify(v, depth + 1)).join(', ') + ']';
    }

    if (typeof item === 'object') {
      return JSON.stringify(item);
    }

    if (item.toString) return item.toString();

    return '' + item;
  } catch (err) {
    try {
      return '' + item;
    } catch (err2) {
      return '';
    }
  }
};

interface ColrOptions {
  isLight: boolean;
  isLightBG: boolean;
}

const optionConfigs: ObjOfType<Partial<ColrOptions> | ((current: ColrOptions) => Partial<ColrOptions>)> = {
  light: { isLight: true },
  dark: { isLight: false },
  lightBg: { isLightBG: true },
  darkBg: { isLightBG: false }
};

type ColrStyleConfigEntry = [number | number[], number | number[]];

interface ColrStyleConfigVersions {
  isBG: boolean;
  light: ColrStyleConfigEntry;
  dark: ColrStyleConfigEntry;
}

type ColrStyleConfig = ColrStyleConfigEntry | ColrStyleConfigVersions;

/*
 * Full Style Configs
 *
 * Calculated when `getColrFn` first called (when initialising `colr`)
 */
let fullStyleConfigs: ObjOfType<ColrStyleConfig> = null;
const calculateFullStyleConfigs = () => {
  const modifierStyleConfigs: ObjOfType<ColrStyleConfig> = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    overline: [53, 55],
    underline: [4, 24],
    strikethrough: [9, 29],
    inverse: [7, 27],
    hidden: [8, 28]
  };

  // the configs for the colours, without the aliases (added later to fullStyleConfigs)
  const colourStyleConfigs: ObjOfType<ColrStyleConfigVersions> = {
    // text colour styles
    red: {
      isBG: false,
      dark: [31, 39],
      light: [91, 39]
    },
    green: {
      isBG: false,
      dark: [32, 39],
      light: [92, 39]
    },
    yellow: {
      isBG: false,
      dark: [33, 39],
      light: [93, 39]
    },
    blue: {
      isBG: false,
      dark: [34, 39],
      light: [94, 39]
    },
    magenta: {
      isBG: false,
      dark: [35, 39],
      light: [95, 39]
    },
    cyan: {
      isBG: false,
      dark: [36, 39],
      light: [96, 39]
    },
    // black: {
    //   isBG: false,
    //   dark: [30, 39],
    //   light: [90, 39]
    // },
    white: {
      isBG: false,
      dark: [37, 39],
      light: [97, 39]
    },

    // Background colour styles
    redBg: {
      isBG: true,
      dark: [41, 49],
      light: [101, 49]
    },
    greenBg: {
      isBG: true,
      dark: [42, 49],
      light: [102, 49]
    },
    yellowBg: {
      isBG: true,
      dark: [43, 49],
      light: [103, 49]
    },
    blueBg: {
      isBG: true,
      dark: [44, 49],
      light: [104, 49]
    },
    magentaBg: {
      isBG: true,
      dark: [45, 49],
      light: [105, 49]
    },
    cyanBg: {
      isBG: true,
      dark: [46, 49],
      light: [106, 49]
    },
    // blackBg: {
    //   isBG: true,
    //   dark: [40, 49],
    //   light: [100, 49]
    // },
    whiteBg: {
      isBG: true,
      dark: [47, 49],
      light: [107, 49]
    }
  };

  const blackStyleConfigs: ObjOfType<ColrStyleConfigEntry> = {
    black: [30, 39],
    darkBlack: [30, 39],
    lightBlack: [90, 39],

    blackBg: [40, 49],
    darkBlackBg: [40, 49],
    lightBlackBg: [100, 49]
  };

  const mergeEntries = (...entries: ColrStyleConfig[]): ColrStyleConfigEntry => [
    entries.map((entry) => (entry instanceof Array ? entry[0] : entry.light[0])).flat(),
    entries.map((entry) => (entry instanceof Array ? entry[1] : entry.light[1])).flat()
  ];
  const greyColourStyleConfigs: ObjOfType<ColrStyleConfig> = {
    grey: blackStyleConfigs.lightBlack,
    greyBg: blackStyleConfigs.lightBlackBg,
    grey0: blackStyleConfigs.darkBlack,
    grey1: mergeEntries(blackStyleConfigs.lightBlack, modifierStyleConfigs.dim),
    grey2: mergeEntries(colourStyleConfigs.white.dark, modifierStyleConfigs.dim),
    grey3: mergeEntries(colourStyleConfigs.white.light, modifierStyleConfigs.dim),
    grey4: colourStyleConfigs.white.dark,
    grey5: colourStyleConfigs.white.light
  };
  const otherColourStyleConfigs: ObjOfType<ColrStyleConfig> = {
    primary: colourStyleConfigs.yellow.light,
    secondary: colourStyleConfigs.magenta.light,
    success: colourStyleConfigs.green.light,
    danger: colourStyleConfigs.red.dark,
    warning: colourStyleConfigs.yellow.dark,
    info: colourStyleConfigs.blue.light,

    primaryBg: mergeEntries(colourStyleConfigs.yellowBg.light, blackStyleConfigs.darkBlack),
    secondaryBg: mergeEntries(colourStyleConfigs.magentaBg.light, blackStyleConfigs.darkBlack),
    successBg: mergeEntries(colourStyleConfigs.greenBg.light, blackStyleConfigs.darkBlack),
    dangerBg: mergeEntries(colourStyleConfigs.redBg.dark, blackStyleConfigs.darkBlack),
    warningBg: mergeEntries(colourStyleConfigs.yellowBg.dark, blackStyleConfigs.darkBlack),
    infoBg: mergeEntries(colourStyleConfigs.blueBg.light, blackStyleConfigs.darkBlack)
  };

  fullStyleConfigs = {
    // main colours
    ...Object.fromEntries(
      Object.entries(colourStyleConfigs).flatMap(([key, value]: [string, ColrStyleConfigVersions]) => {
        const colourName = value.isBG ? key.slice(0, -2) : key;
        const bgSuffix = value.isBG ? 'Bg' : '';

        return [
          [colourName + bgSuffix, value],
          ['dark' + StringTools.capitalise(colourName, false) + bgSuffix, [...value.dark]],
          ['light' + StringTools.capitalise(colourName, false) + bgSuffix, [...value.light]]
        ];
      })
    ),

    // blacks
    ...blackStyleConfigs,

    // greys/grays
    ...Object.fromEntries(
      Object.entries(greyColourStyleConfigs).flatMap(([key, value]: [string, ColrStyleConfig]) => [
        [key, value],
        [key.replace('grey', 'gray'), value]
      ])
    ),

    ...otherColourStyleConfigs,
    ...modifierStyleConfigs
  };
};

/*
 * Debug Replacement Strings
 *
 * Populated when `colr.debug` first called, as only needed for `debug` calls
 */
let debugReplacements: ObjOfType<string> = null;
const populateDebugReplacements = () => {
  debugReplacements = {
    [wrapAnsi(fullStyleConfigs.darkRed[1])]: '(<)',
    [wrapAnsi(fullStyleConfigs.darkRedBg[1])]: '{<}',
    [wrapAnsi(fullStyleConfigs.darkRed[0])]: '(red>)',
    [wrapAnsi(fullStyleConfigs.lightRed[0])]: '(RED>)',
    [wrapAnsi(fullStyleConfigs.darkGreen[0])]: '(grn>)',
    [wrapAnsi(fullStyleConfigs.lightGreen[0])]: '(GRN>)',
    [wrapAnsi(fullStyleConfigs.darkYellow[0])]: '(ylw>)',
    [wrapAnsi(fullStyleConfigs.lightYellow[0])]: '(YLW>)',
    [wrapAnsi(fullStyleConfigs.darkBlue[0])]: '(blu>)',
    [wrapAnsi(fullStyleConfigs.lightBlue[0])]: '(BLU>)',
    [wrapAnsi(fullStyleConfigs.darkMagenta[0])]: '(mag>)',
    [wrapAnsi(fullStyleConfigs.lightMagenta[0])]: '(MAG>)',
    [wrapAnsi(fullStyleConfigs.darkCyan[0])]: '(cyn>)',
    [wrapAnsi(fullStyleConfigs.lightCyan[0])]: '(CYN>)',
    [wrapAnsi(fullStyleConfigs.darkBlack[0])]: '(blk>)',
    [wrapAnsi(fullStyleConfigs.lightBlack[0])]: '(BLK>)',
    [wrapAnsi(fullStyleConfigs.darkWhite[0])]: '(wht>)',
    [wrapAnsi(fullStyleConfigs.lightWhite[0])]: '(WHT>)',
    [wrapAnsi(fullStyleConfigs.darkRedBg[0])]: '{red>}',
    [wrapAnsi(fullStyleConfigs.lightRedBg[0])]: '{RED>}',
    [wrapAnsi(fullStyleConfigs.darkGreenBg[0])]: '{grn>}',
    [wrapAnsi(fullStyleConfigs.lightGreenBg[0])]: '{GRN>}',
    [wrapAnsi(fullStyleConfigs.darkYellowBg[0])]: '{ylw>}',
    [wrapAnsi(fullStyleConfigs.lightYellowBg[0])]: '{YLW>}',
    [wrapAnsi(fullStyleConfigs.darkBlueBg[0])]: '{blu>}',
    [wrapAnsi(fullStyleConfigs.lightBlueBg[0])]: '{BLU>}',
    [wrapAnsi(fullStyleConfigs.darkMagentaBg[0])]: '{mag>}',
    [wrapAnsi(fullStyleConfigs.lightMagentaBg[0])]: '{MAG>}',
    [wrapAnsi(fullStyleConfigs.darkCyanBg[0])]: '{cyn>}',
    [wrapAnsi(fullStyleConfigs.lightCyanBg[0])]: '{CYN>}',
    [wrapAnsi(fullStyleConfigs.darkBlackBg[0])]: '{blk>}',
    [wrapAnsi(fullStyleConfigs.lightBlackBg[0])]: '{BLK>}',
    [wrapAnsi(fullStyleConfigs.darkWhiteBg[0])]: '{wht>}',
    [wrapAnsi(fullStyleConfigs.lightWhiteBg[0])]: '{WHT>}',
    [wrapAnsi(fullStyleConfigs.reset[0])]: '[rst>]',
    [wrapAnsi(fullStyleConfigs.reset[1])]: '[<rst]',
    [wrapAnsi(fullStyleConfigs.bold[0])]: '[bld>]',
    [wrapAnsi(fullStyleConfigs.bold[1])]: '[<bld]',
    [wrapAnsi(fullStyleConfigs.dim[0])]: '[dim>]',
    [wrapAnsi(fullStyleConfigs.dim[1])]: '[<dim]',
    [wrapAnsi(fullStyleConfigs.italic[0])]: '[itl>]',
    [wrapAnsi(fullStyleConfigs.italic[1])]: '[<itl]',
    [wrapAnsi(fullStyleConfigs.overline[0])]: '[ovr>]',
    [wrapAnsi(fullStyleConfigs.overline[1])]: '[<ovr]',
    [wrapAnsi(fullStyleConfigs.underline[0])]: '[und>]',
    [wrapAnsi(fullStyleConfigs.underline[1])]: '[<und]',
    [wrapAnsi(fullStyleConfigs.strikethrough[0])]: '[str>]',
    [wrapAnsi(fullStyleConfigs.strikethrough[1])]: '[<str]',
    [wrapAnsi(fullStyleConfigs.inverse[0])]: '[inv>]',
    [wrapAnsi(fullStyleConfigs.inverse[1])]: '[<inv]',
    [wrapAnsi(fullStyleConfigs.hidden[0])]: '[hdn>]',
    [wrapAnsi(fullStyleConfigs.hidden[1])]: '[<hdn]'
  };
};

/*
 * Configs for constructing the ColrSets objects (happens every time `colr.sets` is called)
 */
const setConfigs = {
  red: ['red', 'redBg'],
  green: ['green', 'greenBg'],
  yellow: ['yellow', 'yellowBg'],
  blue: ['blue', 'blueBg'],
  magenta: ['magenta', 'magentaBg'],
  cyan: ['cyan', 'cyanBg'],
  white: ['white', 'whiteBg'],
  black: ['black', 'blackBg'],
  lightBlack: ['lightBlack', 'lightBlackBg'],
  grey: ['grey', 'greyBg'],
  gray: ['gray', 'grayBg'],
  primary: ['primary', 'primaryBg'],
  secondary: ['secondary', 'secondaryBg'],
  success: ['success', 'successBg'],
  danger: ['danger', 'dangerBg'],
  warning: ['warning', 'warningBg'],
  info: ['info', 'infoBg']
};

/*
 * Clear - remove all the ansi codes from a string
 */
const clear = (text: string): string => {
  const args = {
    text: safe.str(text)
  };
  return StringTools.replaceAll(args.text, /\u001B\[\d+m/g, '');
};

const debugFn: ColrFn['debug'] = (text: string): string => {
  const args = {
    text: safe.str(text)
  };
  if (debugReplacements === null) {
    populateDebugReplacements();
  }
  return Object.entries(debugReplacements).reduce((txt, [search, replace]) => StringTools.replaceAll(txt, search, replace), args.text);
};

const getColrFn = (name: string, styles: ColrStyleConfig[] = [], options: ColrOptions): ColrFn => {
  if (fullStyleConfigs === null) {
    calculateFullStyleConfigs();
  }

  const result: ColrFn = ((...text: unknown[]) => {
    const args = {
      text: text.map((item) => simpleStringify(item)).join(' ')
    };

    const entries = styles.map((value: ColrStyleConfig) => {
      if (value instanceof Array) {
        // Already an entry
        return value;
      }
      const config = value as ColrStyleConfigVersions;
      const isLight = config.isBG ? options.isLightBG : options.isLight;
      return isLight ? config.light || config.dark : config.dark || config.light;
    });

    let prefix = '';
    let suffix = '';

    if (outputMode === 'ANSI' || outputMode === 'DEBUG') {
      prefix = entries
        .flatMap((entry) => entry[0])
        .map((value) => getOutputForCodes(value))
        .join('');
      suffix = entries
        .flatMap((entry) => entry[1])
        .map((value) => getOutputForCodes(value))
        .reverse()
        .join('');
    }

    let output = args.text;

    const flatStarts = entries.flatMap((entry) => entry[0]);
    const flatEnds = entries.flatMap((entry) => entry[1]);

    const pairs = ArrayTools.zipMax(flatStarts, flatEnds);

    output = pairs.reduceRight((txt, pair) => {
      let start = getOutputForCodes(pair[0]);
      let end = getOutputForCodes(pair[1]);

      return StringTools.replaceAll(txt, end, end + start);
    }, output);
    output = output.replace(/\r?\n/g, (match) => `${suffix}${match}${prefix}`);
    output = prefix + output + suffix;

    return output;
  }) as ColrFn;

  // Cache all child instances
  const colrFnCache = cachier.create<ColrFn>();

  // Attach option modifier properties
  Object.defineProperties(
    result,
    ObjectTools.mapValues(optionConfigs, (key, value: Partial<ColrOptions> | ((current: ColrOptions) => Partial<ColrOptions>)) => ({
      enumerable: false,
      get: () =>
        colrFnCache.getOrRun(key, () =>
          getColrFn(name + '.' + key, styles, {
            ...options,
            ...(typeof value === 'function' ? value(options) : value)
          })
        ),
      set(v) {}
    }))
  );

  // Attach style properties
  Object.defineProperties(
    result,
    ObjectTools.mapValues(fullStyleConfigs, (key, value: ColrStyleConfig) => ({
      enumerable: true,
      get: () => colrFnCache.getOrRun(key, () => getColrFn(name + '.' + key, [...styles, value], options)),
      set(v) {}
    }))
  );

  // Attach template function properties
  const templateFn = (strings: TemplateStringsArray, ...exps: any[]): string => {
    const args = {
      strings: safe.arrOf.str([...strings]),
      exps: safe.arr(exps)
    };
    const styledExps = args.exps.map((v) => result(v));
    const zipped = ArrayTools.zipMax(args.strings, styledExps);
    return zipped.flat().join('');
  };
  Object.defineProperties(result, {
    $: {
      enumerable: false,
      get: () => templateFn,
      set(v) {}
    },
    template: {
      enumerable: false,
      get: () => templateFn,
      set(v) {}
    }
  });

  // Attach clear function
  Object.defineProperties(result, {
    clear: {
      enumerable: false,
      get: () => clear,
      set(v) {}
    }
  });

  // Attach debug, getOutputMode, setOutputMode functions
  Object.defineProperties(result, {
    debug: {
      enumerable: false,
      get: () => debugFn,
      set(v) {}
    },
    getOutputMode: {
      enumerable: false,
      get: () => getOutputModeFn,
      set(v) {}
    },
    setOutputMode: {
      enumerable: false,
      get: () => setOutputModeFn,
      set(v) {}
    }
  });

  // Attach sets object
  const setsCache = cachier.create<ColrSets>();
  Object.defineProperties(result, {
    sets: {
      enumerable: false,
      get: () =>
        setsCache.getOrRun('sets', () => {
          const setCache = cachier.create<ColrSet>();
          return Object.defineProperties(
            {} as ColrSets,
            ObjectTools.mapValues(setConfigs, (name, [textKey, bgKey]) => ({
              enumerable: true,
              get: () =>
                setCache.getOrRun(name, () => {
                  const fnCache = cachier.create<ColrFn>();
                  return Object.defineProperties({} as ColrSet, {
                    text: {
                      enumerable: true,
                      get: () => fnCache.getOrRun('text', () => result[textKey]),
                      set(v) {}
                    },
                    bg: {
                      enumerable: true,
                      get: () => fnCache.getOrRun('bg', () => result[bgKey]),
                      set(v) {}
                    }
                  });
                }),
              set(v) {}
            }))
          );
        }),
      set(v) {}
    }
  });

  // Set function name
  Object.defineProperties(result, {
    name: {
      enumerable: false,
      value: name
    }
  });

  // Set toString and inspect functions
  const prettyPrint = () => (styles.length ? result : colr.darkCyan)(`[ColrFn: ${name}]`);
  Object.defineProperties(result, {
    toString: {
      enumerable: false,
      value: prettyPrint
    },
    [Symbol.for('nodejs.util.inspect.custom')]: {
      enumerable: false,
      value: prettyPrint
    }
  });

  return result as ColrFn;
};

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
export const colr = getColrFn('colr', [], {
  isLight: true,
  isLightBG: true
});

/**<!-- DOCS: colr.WrapFn ### 302 -->
 * WrapFn
 *
 * Type for a function that manipulates a string
 *
 * Can by a colr `ColrFn`, a `chalk` function, or something else
 */
export type WrapFn = (...text: string[]) => string;

/**<!-- DOCS: colr.ColrFn ### 303 -->
 * ColrFn
 *
 * Type for a function that manipulates a string, but also has properties for chaining more colours/styles
 *
 * See `colr`
 */
export interface ColrFn extends WrapFn {
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey -->*/
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
   * > __Warning:__ May not be visible in some terminals, depending on the colour settings
   *
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly greyBg: ColrFn;

  /**<!-- DOCS-ALIAS: colr.greyBg -->*/
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey0: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey0 -->*/
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
   * > __Warning:__ May not be visible in some terminals, depending on the colour settings
   *
   * > __Note:__ A `ColrFn` - so can be used as a function, or chained with more colours/styles
   *
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey1: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey1 -->*/
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey2: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey2 -->*/
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey3: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey3 -->*/
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey4: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey4 -->*/
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly grey5: ColrFn;

  /**<!-- DOCS-ALIAS: colr.grey5 -->*/
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
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
   * @param {...string} text - Text to colour
   * @returns {string} - Coloured text
   */
  readonly hidden: ColrFn;

  /**<!-- DOCS: colr.helpersHeader ### -->
   * Helper Functions
   */

  /**<!-- DOCS-ALIAS: colr.template -->*/
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

  /**<!-- DOCS: colr.setOutputMode #### -->
   * setOutputMode
   *
   * - `colr.setOutputMode`
   *
   * Control the output mode of colr functions.
   *
   * There are 4 mode options:
   * - `AUTO` - auto-detects the best mode for the current environment (either `ANSI` or `NONE`)
   * - `ANSI` - normal ANSI escape codes
   * - `DEBUG` - debug syntax (see `colr.debug`)
   * - `NONE` - plain text with no colours (good for when ANSI isn't supported)
   *
   * ```typescript
   * // Default mode is 'AUTO' (resolves to 'ANSI' in this example)
   * colr.blue(`Hello ${colr.red('World')}!`); // \u001b[94mHello \u001b[91mWorld\u001b[39m\u001b[94m!\u001b[39m
   *
   * colr.setOutputMode('AUTO'); // 'AUTO' resolves to 'ANSI' in this example
   * colr.blue(`Hello ${colr.red('World')}!`); // \u001b[94mHello \u001b[91mWorld\u001b[39m\u001b[94m!\u001b[39m
   *
   * colr.setOutputMode('ANSI');
   * colr.blue(`Hello ${colr.red('World')}!`); // \u001b[94mHello \u001b[91mWorld\u001b[39m\u001b[94m!\u001b[39m
   *
   * colr.setOutputMode('DEBUG');
   * colr.blue(`Hello ${colr.red('World')}!`); // (BLU>)Hello (RED>)World(<)(BLU>)!(<)
   *
   * colr.setOutputMode('NONE');
   * colr.blue(`Hello ${colr.red('World')}!`); // Hello World!
   * ```
   */
  readonly setOutputMode: (mode?: 'AUTO' | 'ANSI' | 'DEBUG' | 'NONE') => void;

  /**<!-- DOCS: colr.getOutputMode #### -->
   * getOutputMode
   *
   * - `colr.getOutputMode`
   *
   * Get the current output mode of colr functions.
   *
   * There are 3 actual modes:
   * - `ANSI` - normal ANSI escape codes
   * - `DEBUG` - debug syntax (see `colr.debug`)
   * - `NONE` - plain text with no colours (good for when ANSI isn't supported)
   *
   * ```typescript
   * colr.setOutputMode('AUTO'); // 'AUTO' resolves to 'ANSI' in this example
   * console.log(colr.getOutputMode()); // 'ANSI'
   *
   * colr.setOutputMode('ANSI');
   * console.log(colr.getOutputMode()); // 'ANSI'
   *
   * colr.setOutputMode('DEBUG');
   * console.log(colr.getOutputMode()); // 'DEBUG'
   *
   * colr.setOutputMode('NONE');
   * console.log(colr.getOutputMode()); // 'NONE'
   * ```
   */
  readonly getOutputMode: () => 'ANSI' | 'DEBUG' | 'NONE';

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

  /**<!-- DOCS-ALIAS: colr -->*/
  (...text: unknown[]): string;
}

// <!-- DOCS: 310 -->

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
export interface WrapSet {
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
export interface ColrSet extends WrapSet {
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
  // <!-- DOCS: 301 -->
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
