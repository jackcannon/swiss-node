// src/tools/ask.ts
import { getDeferred as getDeferred6, seconds as seconds4, StringTools as StringTools5, wait as wait3 } from "swiss-ak";

// src/tools/keyListener.ts
var getKeyListener = (callback, isStart = true, isDebugLog = false) => {
  const listenFn = (key) => {
    if (isDebugLog) {
      console.log(JSON.stringify(key));
    }
    if (key == "\x7F") {
      return callback("backspace", key);
    }
    if (key == "\x1B[3~") {
      return callback("delete", key);
    }
    if (key == "\r") {
      return callback("return", key);
    }
    if (key == "	") {
      return callback("tab", key);
    }
    if (key == "\x1B[A") {
      return callback("up", key);
    }
    if (key == "\x1B[C") {
      return callback("right", key);
    }
    if (key == "\x1B[B") {
      return callback("down", key);
    }
    if (key == "\x1B[D") {
      return callback("left", key);
    }
    if (key == " ") {
      return callback("space", key);
    }
    if (key === "\x1B") {
      return callback("esc", key);
    }
    if (key == "") {
      callback("exit", key);
      return process.exit();
    }
    return callback(key, key);
  };
  const start = () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", listenFn);
  };
  const stop = () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdin.off("data", listenFn);
  };
  if (isStart)
    start();
  return {
    start,
    stop
  };
};

// src/tools/out.ts
import { wait, fn as fn2, ArrayTools as ArrayTools2, zipMax, sortByMapped, safe as safe3 } from "swiss-ak";

// src/tools/LogTools.ts
import { inspect } from "util";
import { fn } from "swiss-ak";

// src/tools/colr.ts
import { cachier } from "swiss-ak";
import { ArrayTools, ObjectTools, StringTools, safe } from "swiss-ak";
var outputMode = "ANSI";
var getOutputModeFn = () => outputMode;
var setOutputModeFn = (mode) => {
  if (mode === void 0)
    mode = outputMode;
  const args = {
    mode: safe.str(mode, false, "ANSI")
  };
  if (args.mode === "AUTO") {
    if (typeof process === "undefined" || !process.stdout.isTTY) {
      args.mode = "NONE";
    } else {
      args.mode = "ANSI";
    }
  }
  if (!["ANSI", "DEBUG", "NONE"].includes(args.mode))
    args.mode = "ANSI";
  outputMode = args.mode;
  if (outputMode === "DEBUG" && debugReplacements === null) {
    populateDebugReplacements();
  }
};
setOutputModeFn("AUTO");
var getOutputForCodes = (codes) => {
  if (outputMode === "NONE")
    return "";
  const arrOfAnsi = [codes].flat().map((code) => `\x1B[${code}m`);
  if (outputMode === "DEBUG") {
    return arrOfAnsi.map((ansi3) => debugReplacements[ansi3] || ansi3).join("");
  }
  return arrOfAnsi.join("");
};
var wrapAnsi = (codes) => [codes].flat().map((code) => `\x1B[${code}m`).join("");
var simpleStringify = (item, depth = 0) => {
  if (depth > 4)
    return "";
  try {
    if (item === void 0 || item === null)
      return "";
    if (Array.isArray(item)) {
      return "[" + item.map((v) => simpleStringify(v, depth + 1)).join(", ") + "]";
    }
    if (typeof item === "object") {
      return JSON.stringify(item);
    }
    if (item.toString)
      return item.toString();
    return "" + item;
  } catch (err) {
    try {
      return "" + item;
    } catch (err2) {
      return "";
    }
  }
};
var optionConfigs = {
  light: { isLight: true },
  dark: { isLight: false },
  lightBg: { isLightBG: true },
  darkBg: { isLightBG: false }
};
var fullStyleConfigs = null;
var calculateFullStyleConfigs = () => {
  const modifierStyleConfigs = {
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
  const colourStyleConfigs = {
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
    white: {
      isBG: false,
      dark: [37, 39],
      light: [97, 39]
    },
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
    whiteBg: {
      isBG: true,
      dark: [47, 49],
      light: [107, 49]
    }
  };
  const blackStyleConfigs = {
    black: [30, 39],
    darkBlack: [30, 39],
    lightBlack: [90, 39],
    blackBg: [40, 49],
    darkBlackBg: [40, 49],
    lightBlackBg: [100, 49]
  };
  const mergeEntries = (...entries) => [
    entries.map((entry) => entry instanceof Array ? entry[0] : entry.light[0]).flat(),
    entries.map((entry) => entry instanceof Array ? entry[1] : entry.light[1]).flat()
  ];
  const greyColourStyleConfigs = {
    grey: blackStyleConfigs.lightBlack,
    greyBg: blackStyleConfigs.lightBlackBg,
    grey0: blackStyleConfigs.darkBlack,
    grey1: mergeEntries(blackStyleConfigs.lightBlack, modifierStyleConfigs.dim),
    grey2: mergeEntries(colourStyleConfigs.white.dark, modifierStyleConfigs.dim),
    grey3: mergeEntries(colourStyleConfigs.white.light, modifierStyleConfigs.dim),
    grey4: colourStyleConfigs.white.dark,
    grey5: colourStyleConfigs.white.light
  };
  const otherColourStyleConfigs = {
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
    ...Object.fromEntries(
      Object.entries(colourStyleConfigs).flatMap(([key, value]) => {
        const colourName = value.isBG ? key.slice(0, -2) : key;
        const bgSuffix = value.isBG ? "Bg" : "";
        return [
          [colourName + bgSuffix, value],
          ["dark" + StringTools.capitalise(colourName, false) + bgSuffix, [...value.dark]],
          ["light" + StringTools.capitalise(colourName, false) + bgSuffix, [...value.light]]
        ];
      })
    ),
    ...blackStyleConfigs,
    ...Object.fromEntries(
      Object.entries(greyColourStyleConfigs).flatMap(([key, value]) => [
        [key, value],
        [key.replace("grey", "gray"), value]
      ])
    ),
    ...otherColourStyleConfigs,
    ...modifierStyleConfigs
  };
};
var debugReplacements = null;
var populateDebugReplacements = () => {
  debugReplacements = {
    [wrapAnsi(fullStyleConfigs.darkRed[1])]: "(<)",
    [wrapAnsi(fullStyleConfigs.darkRedBg[1])]: "{<}",
    [wrapAnsi(fullStyleConfigs.darkRed[0])]: "(red>)",
    [wrapAnsi(fullStyleConfigs.lightRed[0])]: "(RED>)",
    [wrapAnsi(fullStyleConfigs.darkGreen[0])]: "(grn>)",
    [wrapAnsi(fullStyleConfigs.lightGreen[0])]: "(GRN>)",
    [wrapAnsi(fullStyleConfigs.darkYellow[0])]: "(ylw>)",
    [wrapAnsi(fullStyleConfigs.lightYellow[0])]: "(YLW>)",
    [wrapAnsi(fullStyleConfigs.darkBlue[0])]: "(blu>)",
    [wrapAnsi(fullStyleConfigs.lightBlue[0])]: "(BLU>)",
    [wrapAnsi(fullStyleConfigs.darkMagenta[0])]: "(mag>)",
    [wrapAnsi(fullStyleConfigs.lightMagenta[0])]: "(MAG>)",
    [wrapAnsi(fullStyleConfigs.darkCyan[0])]: "(cyn>)",
    [wrapAnsi(fullStyleConfigs.lightCyan[0])]: "(CYN>)",
    [wrapAnsi(fullStyleConfigs.darkBlack[0])]: "(blk>)",
    [wrapAnsi(fullStyleConfigs.lightBlack[0])]: "(BLK>)",
    [wrapAnsi(fullStyleConfigs.darkWhite[0])]: "(wht>)",
    [wrapAnsi(fullStyleConfigs.lightWhite[0])]: "(WHT>)",
    [wrapAnsi(fullStyleConfigs.darkRedBg[0])]: "{red>}",
    [wrapAnsi(fullStyleConfigs.lightRedBg[0])]: "{RED>}",
    [wrapAnsi(fullStyleConfigs.darkGreenBg[0])]: "{grn>}",
    [wrapAnsi(fullStyleConfigs.lightGreenBg[0])]: "{GRN>}",
    [wrapAnsi(fullStyleConfigs.darkYellowBg[0])]: "{ylw>}",
    [wrapAnsi(fullStyleConfigs.lightYellowBg[0])]: "{YLW>}",
    [wrapAnsi(fullStyleConfigs.darkBlueBg[0])]: "{blu>}",
    [wrapAnsi(fullStyleConfigs.lightBlueBg[0])]: "{BLU>}",
    [wrapAnsi(fullStyleConfigs.darkMagentaBg[0])]: "{mag>}",
    [wrapAnsi(fullStyleConfigs.lightMagentaBg[0])]: "{MAG>}",
    [wrapAnsi(fullStyleConfigs.darkCyanBg[0])]: "{cyn>}",
    [wrapAnsi(fullStyleConfigs.lightCyanBg[0])]: "{CYN>}",
    [wrapAnsi(fullStyleConfigs.darkBlackBg[0])]: "{blk>}",
    [wrapAnsi(fullStyleConfigs.lightBlackBg[0])]: "{BLK>}",
    [wrapAnsi(fullStyleConfigs.darkWhiteBg[0])]: "{wht>}",
    [wrapAnsi(fullStyleConfigs.lightWhiteBg[0])]: "{WHT>}",
    [wrapAnsi(fullStyleConfigs.reset[0])]: "[rst>]",
    [wrapAnsi(fullStyleConfigs.reset[1])]: "[<rst]",
    [wrapAnsi(fullStyleConfigs.bold[0])]: "[bld>]",
    [wrapAnsi(fullStyleConfigs.bold[1])]: "[<bld]",
    [wrapAnsi(fullStyleConfigs.dim[0])]: "[dim>]",
    [wrapAnsi(fullStyleConfigs.dim[1])]: "[<dim]",
    [wrapAnsi(fullStyleConfigs.italic[0])]: "[itl>]",
    [wrapAnsi(fullStyleConfigs.italic[1])]: "[<itl]",
    [wrapAnsi(fullStyleConfigs.overline[0])]: "[ovr>]",
    [wrapAnsi(fullStyleConfigs.overline[1])]: "[<ovr]",
    [wrapAnsi(fullStyleConfigs.underline[0])]: "[und>]",
    [wrapAnsi(fullStyleConfigs.underline[1])]: "[<und]",
    [wrapAnsi(fullStyleConfigs.strikethrough[0])]: "[str>]",
    [wrapAnsi(fullStyleConfigs.strikethrough[1])]: "[<str]",
    [wrapAnsi(fullStyleConfigs.inverse[0])]: "[inv>]",
    [wrapAnsi(fullStyleConfigs.inverse[1])]: "[<inv]",
    [wrapAnsi(fullStyleConfigs.hidden[0])]: "[hdn>]",
    [wrapAnsi(fullStyleConfigs.hidden[1])]: "[<hdn]"
  };
};
var setConfigs = {
  red: ["red", "redBg"],
  green: ["green", "greenBg"],
  yellow: ["yellow", "yellowBg"],
  blue: ["blue", "blueBg"],
  magenta: ["magenta", "magentaBg"],
  cyan: ["cyan", "cyanBg"],
  white: ["white", "whiteBg"],
  black: ["black", "blackBg"],
  lightBlack: ["lightBlack", "lightBlackBg"],
  grey: ["grey", "greyBg"],
  gray: ["gray", "grayBg"],
  primary: ["primary", "primaryBg"],
  secondary: ["secondary", "secondaryBg"],
  success: ["success", "successBg"],
  danger: ["danger", "dangerBg"],
  warning: ["warning", "warningBg"],
  info: ["info", "infoBg"]
};
var clear = (text2) => {
  const args = {
    text: safe.str(text2)
  };
  return StringTools.replaceAll(args.text, /\u001B\[\d+m/g, "");
};
var debugFn = (text2) => {
  const args = {
    text: safe.str(text2)
  };
  if (debugReplacements === null) {
    populateDebugReplacements();
  }
  return Object.entries(debugReplacements).reduce((txt, [search, replace]) => StringTools.replaceAll(txt, search, replace), args.text);
};
var getColrFn = (name, styles = [], options) => {
  if (fullStyleConfigs === null) {
    calculateFullStyleConfigs();
  }
  const result = (...text2) => {
    const args = {
      text: text2.map((item) => simpleStringify(item)).join(" ")
    };
    const entries = styles.map((value) => {
      if (value instanceof Array) {
        return value;
      }
      const config = value;
      const isLight = config.isBG ? options.isLightBG : options.isLight;
      return isLight ? config.light || config.dark : config.dark || config.light;
    });
    let prefix = "";
    let suffix = "";
    if (outputMode === "ANSI" || outputMode === "DEBUG") {
      prefix = entries.flatMap((entry) => entry[0]).map((value) => getOutputForCodes(value)).join("");
      suffix = entries.flatMap((entry) => entry[1]).map((value) => getOutputForCodes(value)).reverse().join("");
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
  };
  const colrFnCache = cachier.create();
  Object.defineProperties(
    result,
    ObjectTools.mapValues(optionConfigs, (key, value) => ({
      enumerable: false,
      get: () => colrFnCache.getOrRun(
        key,
        () => getColrFn(name + "." + key, styles, {
          ...options,
          ...typeof value === "function" ? value(options) : value
        })
      ),
      set(v) {
      }
    }))
  );
  Object.defineProperties(
    result,
    ObjectTools.mapValues(fullStyleConfigs, (key, value) => ({
      enumerable: true,
      get: () => colrFnCache.getOrRun(key, () => getColrFn(name + "." + key, [...styles, value], options)),
      set(v) {
      }
    }))
  );
  const templateFn = (strings, ...exps) => {
    const args = {
      strings: safe.arrOf.str([...strings]),
      exps: safe.arr(exps)
    };
    const styledExps = args.exps.map((v) => result(v));
    const zipped = ArrayTools.zipMax(args.strings, styledExps);
    return zipped.flat().join("");
  };
  Object.defineProperties(result, {
    $: {
      enumerable: false,
      get: () => templateFn,
      set(v) {
      }
    },
    template: {
      enumerable: false,
      get: () => templateFn,
      set(v) {
      }
    }
  });
  Object.defineProperties(result, {
    clear: {
      enumerable: false,
      get: () => clear,
      set(v) {
      }
    }
  });
  Object.defineProperties(result, {
    debug: {
      enumerable: false,
      get: () => debugFn,
      set(v) {
      }
    },
    getOutputMode: {
      enumerable: false,
      get: () => getOutputModeFn,
      set(v) {
      }
    },
    setOutputMode: {
      enumerable: false,
      get: () => setOutputModeFn,
      set(v) {
      }
    }
  });
  const setsCache = cachier.create();
  Object.defineProperties(result, {
    sets: {
      enumerable: false,
      get: () => setsCache.getOrRun("sets", () => {
        const setCache = cachier.create();
        return Object.defineProperties(
          {},
          ObjectTools.mapValues(setConfigs, (name2, [textKey, bgKey]) => ({
            enumerable: true,
            get: () => setCache.getOrRun(name2, () => {
              const fnCache = cachier.create();
              return Object.defineProperties({}, {
                text: {
                  enumerable: true,
                  get: () => fnCache.getOrRun("text", () => result[textKey]),
                  set(v) {
                  }
                },
                bg: {
                  enumerable: true,
                  get: () => fnCache.getOrRun("bg", () => result[bgKey]),
                  set(v) {
                  }
                }
              });
            }),
            set(v) {
            }
          }))
        );
      }),
      set(v) {
      }
    }
  });
  Object.defineProperties(result, {
    name: {
      enumerable: false,
      value: name
    }
  });
  const prettyPrint = () => (styles.length ? result : colr.darkCyan)(`[ColrFn: ${name}]`);
  Object.defineProperties(result, {
    toString: {
      enumerable: false,
      value: prettyPrint
    },
    [Symbol.for("nodejs.util.inspect.custom")]: {
      enumerable: false,
      value: prettyPrint
    }
  });
  return result;
};
var colr = getColrFn("colr", [], {
  isLight: true,
  isLightBG: true
});

// src/tools/LogTools.ts
var LogTools;
((LogTools2) => {
  LogTools2.getLogStr = (item) => {
    const inspectList = ["object", "boolean", "number"];
    if (inspectList.includes(typeof item) && !(item instanceof Date)) {
      return inspect(item, { colors: true, depth: 3, compact: false });
    } else {
      return item + "";
    }
  };
  LogTools2.processLogContents = (prefix, wrapper = fn.noact, ...args) => args.map(LogTools2.getLogStr).join(" ").split("\n").map((line, index) => colr.bold(index ? " ".repeat(prefix.length) : prefix) + " " + wrapper(line)).join("\n");
  LogTools2.getLog = (prefix, wrapper = fn.noact) => (...args) => {
    console.log(LogTools2.processLogContents(prefix, wrapper, ...args));
  };
})(LogTools || (LogTools = {}));
var getLogStr = LogTools.getLogStr;
var processLogContents = LogTools.processLogContents;
var getLog = LogTools.getLog;

// src/tools/out/lineCounter.ts
import { StringTools as StringTools2 } from "swiss-ak";

// src/tools/out/ansi.ts
import { safe as safe2 } from "swiss-ak";
var ansi = {
  cursor: {
    to: (x = 0, y = 0) => {
      const args = {
        x: safe2.num(x, true, 0),
        y: safe2.num(y, true, 0)
      };
      if (args.y === 0)
        return `\x1B[${args.x + 1}G`;
      return `\x1B[${args.y + 1};${args.x + 1}H`;
    },
    move: (x = 0, y = 0) => {
      const args = {
        x: safe2.num(x, true, void 0, void 0, 0),
        y: safe2.num(y, true, void 0, void 0, 0)
      };
      let result = "";
      result += ansi.cursor.right(args.x);
      result += ansi.cursor.down(args.y);
      return result;
    },
    up: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.cursor.down(-args.count);
      return `\x1B[${args.count}A`;
    },
    down: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.cursor.up(-args.count);
      return `\x1B[${args.count}B`;
    },
    left: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.cursor.right(-args.count);
      return `\x1B[${args.count}D`;
    },
    right: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.cursor.left(-args.count);
      return `\x1B[${args.count}C`;
    },
    nextLine: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.cursor.prevLine(-args.count);
      return `\x1B[E`.repeat(args.count);
    },
    prevLine: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.cursor.nextLine(-args.count);
      return `\x1B[F`.repeat(args.count);
    },
    lineStart: `\x1B[G`,
    setShow: (isShow) => {
      const args = {
        isShow: safe2.bool(isShow, true)
      };
      return args.isShow ? ansi.cursor.show : ansi.cursor.hide;
    },
    show: `\x1B[?25h`,
    hide: `\x1B[?25l`,
    save: `\x1B7`,
    restore: `\x1B8`
  },
  scroll: {
    up: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.scroll.down(-args.count);
      return `\x1B[S`.repeat(args.count);
    },
    down: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.scroll.up(-args.count);
      return `\x1B[T`.repeat(args.count);
    }
  },
  erase: {
    screen: `\x1B[2J`,
    up: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.erase.down(-args.count);
      return `\x1B[1J`.repeat(args.count);
    },
    down: (count = 1) => {
      const args = {
        count: safe2.num(count, true)
      };
      if (args.count === 0)
        return "";
      if (args.count < 0)
        return ansi.erase.up(-args.count);
      return `\x1B[J`.repeat(args.count);
    },
    line: `\x1B[2K`,
    lineEnd: `\x1B[K`,
    lineStart: `\x1B[1K`,
    lines: (count = 1) => {
      const args = {
        count: safe2.num(count, true, 0)
      };
      let result = ansi.erase.line;
      for (let i = 0; i < args.count; i++) {
        result += ansi.cursor.up() + ansi.erase.line;
      }
      if (args.count)
        result += ansi.cursor.lineStart;
      return result;
    },
    reserve: (count = 1) => {
      const args = {
        count: safe2.num(count, true, 0)
      };
      return "\n".repeat(Math.max(0, args.count - 1)) + ansi.erase.lines(args.count - 1);
    }
  },
  clear: `\x1Bc`,
  beep: "\x07",
  null: "\x1B[0;3p"
};

// src/tools/out/lineCounter.ts
var getLineCounter = () => {
  let lineCount = 0;
  const checkpoints = {};
  const log2 = (...args) => {
    const output = out.wrap(args.map(getLogStr).join(" "));
    const added = out.utils.getNumLines(output);
    lineCount += added;
    console.log(output);
    return added;
  };
  const overwrite = (...args) => {
    let output = out.wrap(args.map(getLogStr).join(" "));
    output = output.replace(/\n/g, ansi.erase.lineEnd + "\n") + ansi.erase.lineEnd;
    const added = out.utils.getNumLines(output);
    lineCount += added;
    console.log(output);
    return added;
  };
  const wrap = (newLines = 1, func, ...args) => {
    const result = func(...args);
    lineCount += newLines;
    return result;
  };
  const add = (newLines) => {
    lineCount += newLines;
  };
  const get = () => {
    return lineCount;
  };
  const getSince = (checkpointID) => {
    const checkpointValue = checkpoints[checkpointID];
    if (checkpointValue === void 0)
      return 0;
    const diff = lineCount - checkpointValue;
    return diff > 0 ? diff : 0;
  };
  const moveCursor = (y) => {
    process.stdout.moveCursor(0, y);
    lineCount += y;
    return void 0;
  };
  const moveHome = () => {
    process.stdout.moveCursor(0, -lineCount);
    lineCount = 0;
    return void 0;
  };
  const moveToCheckpoint = (checkpointID) => {
    const checkpointValue = checkpoints[checkpointID];
    if (checkpointValue === void 0)
      return;
    const diff = lineCount - checkpointValue;
    if (diff > 0) {
      moveCursor(-diff);
    }
  };
  const checkpoint = (checkpointID = StringTools2.randomId()) => {
    checkpoints[checkpointID] = lineCount;
    return checkpointID;
  };
  const clearToCheckpoint = (checkpointID) => {
    const checkpointValue = checkpoints[checkpointID];
    if (checkpointValue === void 0)
      return;
    const diff = lineCount - checkpointValue;
    if (diff > 0) {
      clearBack(diff);
    }
  };
  const clearBack = (linesToMoveBack, limitToRecordedLines = true) => {
    if (limitToRecordedLines)
      linesToMoveBack = Math.min(lineCount, linesToMoveBack);
    out.moveUp(linesToMoveBack);
    lineCount -= linesToMoveBack;
  };
  const clearDown = (lines) => {
    if (lines > 0) {
      log2("\n".repeat(lines - 1));
    }
    if (lines < 0) {
      clearBack(-lines);
    }
  };
  const clear2 = () => {
    out.moveUp(lineCount);
    lineCount = 0;
  };
  const ansiFns = {
    moveCursor: (y) => {
      const result = ansi.cursor.down(y);
      lineCount += y;
      return result;
    },
    moveHome: () => {
      const result = ansi.cursor.up(lineCount);
      lineCount = 0;
      return result;
    },
    moveToCheckpoint: (checkpointID) => {
      const checkpointValue = checkpoints[checkpointID];
      if (checkpointValue === void 0)
        return;
      const diff = lineCount - checkpointValue;
      if (diff > 0) {
        return ansiFns.moveCursor(-diff);
      }
      return "";
    },
    clearToCheckpoint: (checkpointID) => {
      const checkpointValue = checkpoints[checkpointID];
      if (checkpointValue === void 0)
        return;
      const diff = lineCount - checkpointValue;
      if (diff > 0) {
        return ansiFns.clearBack(diff);
      }
      return "";
    },
    clearBack: (linesToMoveBack, limitToRecordedLines = true) => {
      if (limitToRecordedLines)
        linesToMoveBack = Math.min(lineCount, linesToMoveBack);
      const result = ansi.erase.lines(linesToMoveBack);
      lineCount -= linesToMoveBack;
      return result;
    },
    clearDown: (lines) => {
      if (lines > 0) {
        add(lines);
        return "\n".repeat(lines - 1);
      }
      if (lines < 0) {
        return ansiFns.clearBack(-lines);
      }
    },
    clear: () => {
      const result = ansi.erase.lines(lineCount);
      lineCount = 0;
      return result;
    },
    save: () => {
      const result = ansi.cursor.save;
      checkpoint("SWISS_NODE_LINE_COUNTER_SAVE");
      return result;
    },
    restore: () => {
      const result = ansi.cursor.restore;
      lineCount = checkpoints["SWISS_NODE_LINE_COUNTER_SAVE"];
      return result;
    }
  };
  const lc = {
    log: log2,
    overwrite,
    wrap,
    add,
    get,
    moveCursor,
    moveHome,
    moveToCheckpoint,
    checkpoint,
    clearToCheckpoint,
    clear: clear2,
    clearBack,
    clearDown,
    getSince,
    ansi: ansiFns
  };
  return lc;
};

// src/tools/out/breadcrumb.ts
import { symbols } from "swiss-ak";
var seperatorChar = ` ${colr.grey2(symbols.CHEV_RGT)} `;
var getBreadcrumb = (...baseNames) => {
  let current = [];
  let colours = [colr.primary, colr.secondary, colr.blue, colr.red, colr.green, colr.cyan];
  const setColours = (newColours) => {
    colours = newColours;
  };
  const add = (...names) => current.push(...names);
  const getColouredName = (name, index, arr) => out.utils.hasColor(name) || index === arr.length - 1 ? name : colours[index % colours.length](name);
  const getColouredNames = (...tempNames) => getNames(...tempNames).map(getColouredName);
  const getNames = (...tempNames) => [...baseNames, ...current, ...tempNames];
  const sub = (...tempNames) => getBreadcrumb(...getNames(...tempNames));
  const otherChars = "?  > ";
  const spaceForInput = 25;
  const get = (...tempNames) => colr.bold(
    out.truncate(
      getColouredNames(...tempNames).join(seperatorChar).trim(),
      out.utils.getTerminalWidth() - (otherChars.length - spaceForInput)
    )
  );
  const result = (...tempNames) => sub(...tempNames);
  result.setColours = setColours;
  result.add = add;
  result.getNames = getNames;
  result.sub = sub;
  result.get = get;
  result.toString = get;
  return result;
};

// src/tools/out.ts
var out;
((out2) => {
  const NEW_LINE = "\n";
  out2.getWidth = (text2) => {
    const args = {
      text: safe3.str(text2)
    };
    let result = args.text;
    result = out2.utils.stripAnsi(result);
    result = result.replace(out2.utils.getEmojiRegex("gu"), "  ");
    result = result.replace(/\uD83C[\uDFFB-\uDFFF]|[\uD800-\uDBFF]/g, "");
    return result.length;
  };
  out2.pad = (line, start, end, replaceChar = " ") => `${replaceChar.repeat(Math.max(0, start))}${line}${replaceChar.repeat(Math.max(0, end))}`;
  const correctWidth = (width) => width < 0 || width === Infinity ? utils.getTerminalWidth() : Math.min(width, utils.getTerminalWidth());
  out2.center = (item, width = out2.utils.getTerminalWidth(), replaceChar = " ", forceWidth = true) => utils.getLogLines(item).map(
    (line) => out2.pad(
      line,
      Math.floor((correctWidth(width) - out2.getWidth(line)) / 2),
      forceWidth ? Math.ceil((correctWidth(width) - out2.getWidth(line)) / 2) : 0,
      replaceChar
    )
  ).join(NEW_LINE);
  out2.left = (item, width = out2.utils.getTerminalWidth(), replaceChar = " ", forceWidth = true) => utils.getLogLines(item).map((line) => out2.pad(line, 0, forceWidth ? correctWidth(width) - out2.getWidth(line) : 0, replaceChar)).join(NEW_LINE);
  out2.right = (item, width = out2.utils.getTerminalWidth(), replaceChar = " ", forceWidth = true) => utils.getLogLines(item).map((line) => out2.pad(line, correctWidth(width) - out2.getWidth(line), 0, replaceChar)).join(NEW_LINE);
  out2.justify = (item, width = out2.utils.getTerminalWidth(), replaceChar = " ", forceWidth = true) => utils.getLogLines(item).map((line) => {
    const words = line.split(" ");
    if (words.length === 1)
      return out2.left(words[0], width, replaceChar, forceWidth);
    const currW = words.map((w) => w.length).reduce(fn2.reduces.combine);
    const perSpace = Math.floor((width - currW) / (words.length - 1));
    const remain = (width - currW) % (words.length - 1);
    const spaces = ArrayTools2.range(words.length - 1).map((i) => perSpace + Number(words.length - 2 - i < remain)).map((num) => replaceChar.repeat(num));
    let result = "";
    for (let index in words) {
      result += words[index] + (spaces[index] || "");
    }
    return result;
  }).join(NEW_LINE);
  const getLongestLen = (lines) => Math.max(...lines.map((line) => out2.getWidth(line)));
  out2.leftLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out2.left(line, width));
  out2.centerLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out2.center(line, width));
  out2.rightLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out2.right(line, width));
  out2.justifyLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out2.justify(line, width));
  const alignFunc = {
    left: out2.left,
    center: out2.center,
    right: out2.right,
    justify: out2.justify
  };
  out2.align = (item, direction, width = out2.utils.getTerminalWidth(), replaceChar = " ", forceWidth = true) => {
    const func = alignFunc[direction] || alignFunc.left;
    return func(item, width, replaceChar, forceWidth);
  };
  out2.split = (leftItem, rightItem, width = out2.utils.getTerminalWidth(), replaceChar = " ") => `${leftItem + ""}${replaceChar.repeat(Math.max(0, width - (out2.getWidth(leftItem + "") + out2.getWidth(rightItem + ""))))}${rightItem + ""}`;
  out2.wrap = (item, width = out2.utils.getTerminalWidth(), alignment, forceWidth = false) => {
    const args = {
      item,
      width: safe3.num(width, true, 0),
      alignment: safe3.str(alignment, false, null),
      forceWidth: safe3.bool(forceWidth, false)
    };
    const lines = utils.getLogLines(args.item);
    if (args.width === 0)
      return "\n".repeat(lines.length - 1);
    return lines.map((line) => {
      if (out2.getWidth(line) > args.width) {
        let words = line.split(/(?<=#?[ -]+)/g);
        const rows = [];
        words = words.map((orig) => {
          if (out2.getWidth(orig.replace(/\s$/, "")) > args.width) {
            let remaining2 = orig;
            let result = [];
            if (args.width <= 1)
              return remaining2.slice(0, args.width);
            while (out2.getWidth(remaining2) > args.width - 1) {
              result.push(remaining2.slice(0, args.width - 1) + "-");
              remaining2 = remaining2.slice(args.width - 1);
            }
            result.push(remaining2);
            return result;
          }
          return orig;
        }).flat();
        let rowStartIndex = 0;
        for (let wIndex in words) {
          let word = words[wIndex].replace(/\s$/, "");
          const candidateRow = words.slice(rowStartIndex, Math.max(0, Number(wIndex)));
          const candText = candidateRow.join("");
          if (out2.getWidth(candText) + out2.getWidth(word) > args.width) {
            rows.push(candidateRow);
            rowStartIndex = Number(wIndex);
          }
        }
        const remaining = words.slice(rowStartIndex);
        rows.push(remaining);
        return rows.map((row) => row.join("")).map((row) => row.replace(/\s$/, "")).map((row) => args.alignment || args.forceWidth ? out2.align(row, args.alignment || "left", args.width, void 0, args.forceWidth) : row);
      }
      return line;
    }).flat().join(NEW_LINE);
  };
  out2.moveUp = (lines = 1) => {
    var _a;
    if ((_a = process == null ? void 0 : process.stdout) == null ? void 0 : _a.clearLine) {
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
      for (let i = 0; i < lines; i++) {
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine(0);
      }
    }
  };
  const loadingDefault = (s) => console.log(colr.dim(`${s}`));
  const loadingWords = [
    "\u2113-o-\u{1D51E}-\u{1D4ED}-\u026A-\u057C-\u{1D5F4}",
    "\u{1D695}-\u03C3-a-\u{1D521}-\u{1D4F2}-\u0274-\u0262",
    "\u{1D5DF}-\u{1D698}-\u03B1-d-\u{1D526}-\u{1D4F7}-\u0262",
    "\u029F-\u{1D5FC}-\u{1D68A}-\u2202-i-\u{1D52B}-\u{1D4F0}",
    "\u029F-\u0585-\u{1D5EE}-\u{1D68D}-\u03B9-n-\u{1D524}",
    "\u{1D4F5}-\u1D0F-\u01DF-\u{1D5F1}-\u{1D692}-\u03B7-g",
    "\u{1D529}-\u{1D4F8}-\u1D00-\u0256-\u{1D5F6}-\u{1D697}-g",
    "l-\u{1D52C}-\u{1D4EA}-\u1D05-\u0268-\u{1D5FB}-\u{1D690}"
  ].map((word) => word.split("-"));
  const loadingChars = ArrayTools2.repeat((loadingWords.length + 1) * loadingWords[0].length, ...loadingWords).map(
    (word, index) => colr.bold("loading".slice(0, Math.floor(Math.floor(index) / loadingWords.length))) + word.slice(Math.floor(Math.floor(index) / loadingWords.length)).join("") + ["   ", ".  ", ".. ", "..."][Math.floor(index / 3) % 4]
  );
  out2.loading = (action = loadingDefault, lines = 1, symbols5 = loadingChars) => {
    let stopped = false;
    let count = 0;
    let previousLinesDrawn = 0;
    const runLoop = async () => {
      if (stopped)
        return;
      if (count)
        process.stdout.write(out2.ansi.cursor.up(previousLinesDrawn));
      const output = action(symbols5[count++ % symbols5.length]);
      previousLinesDrawn = lines;
      if (output !== void 0) {
        console.log(output);
        previousLinesDrawn = utils.getNumLines(output + "");
      }
      await wait(150);
      return runLoop();
    };
    runLoop();
    return {
      stop: () => {
        out2.moveUp(lines);
        stopped = true;
      }
    };
  };
  out2.limitToLength = (text2, maxLength) => utils.joinLines(
    utils.getLines(text2).map((line) => {
      let specials = "";
      let result = line;
      while (out2.getWidth(result) > maxLength) {
        const match = result.match(new RegExp(`(\\u001b[[0-9]+m|.)$`));
        const { 0: removed, index } = match || { 0: result.slice(-1), index: result.length - 1 };
        if (removed.match(new RegExp(`\\u001b[[0-9]+m`))) {
          specials = removed + specials;
        }
        result = result.slice(0, index);
      }
      return result + specials;
    })
  );
  out2.limitToLengthStart = (text2, maxLength) => utils.joinLines(
    utils.getLines(text2).map((line) => {
      let specials = "";
      let result = line;
      while (out2.getWidth(result) > maxLength) {
        const match = result.match(new RegExp(`^(\\u001b[[0-9]+m|.)`));
        const { 0: removed, index } = match || { 0: result.slice(0, 1), index: 1 };
        if (removed.match(new RegExp(`\\u001b[[0-9]+m`))) {
          specials = specials + removed;
        }
        result = result.slice(index + removed.length);
      }
      return specials + result;
    })
  );
  out2.truncate = (text2, maxLength = out2.utils.getTerminalWidth(), suffix = colr.dim("\u2026")) => utils.joinLines(
    utils.getLines(text2).map((line) => out2.getWidth(line) > maxLength ? out2.limitToLength(line, maxLength - out2.getWidth(suffix)) + suffix : line)
  );
  out2.truncateStart = (text2, maxLength = out2.utils.getTerminalWidth(), suffix = colr.dim("\u2026")) => utils.joinLines(
    utils.getLines(text2).map((line) => out2.getWidth(line) > maxLength ? suffix + out2.limitToLengthStart(line, maxLength - out2.getWidth(suffix)) : line)
  );
  out2.concatLineGroups = (...groups) => {
    const maxLen = Math.max(...groups.map((group) => group.length));
    const aligned = groups.map((group) => out2.leftLines([...group, ...Array(maxLen).fill("")].slice(0, maxLen)));
    return zipMax(...aligned).map((line) => line.join(""));
  };
  out2.getResponsiveValue = (options) => {
    const mapped = options.map(({ minColumns, value }) => ({
      min: typeof minColumns === "number" ? minColumns : 0,
      value
    }));
    const sorted = sortByMapped(mapped, (option2) => option2.min, fn2.desc);
    const termWidth = utils.getTerminalWidth();
    return (sorted.find((option2) => termWidth >= option2.min) ?? sorted[0]).value;
  };
  out2.getBreadcrumb = getBreadcrumb;
  out2.getLineCounter = getLineCounter;
  out2.ansi = ansi;
  let utils;
  ((utils2) => {
    utils2.getTerminalWidth = () => {
      var _a;
      return ((_a = process == null ? void 0 : process.stdout) == null ? void 0 : _a.columns) ? process.stdout.columns : 100;
    };
    const textToString = (text2) => text2 instanceof Array ? utils2.joinLines(text2) : text2;
    utils2.getLines = (text2) => textToString(text2).split(NEW_LINE);
    utils2.getNumLines = (text2) => utils2.getLines(text2).length;
    utils2.getLinesWidth = (text2) => Math.max(...utils2.getLines(text2).map((line) => out2.getWidth(line)));
    utils2.getLogLines = (item) => utils2.getLines(getLogStr(item));
    utils2.getNumLogLines = (item) => utils2.getNumLines(getLogStr(item));
    utils2.getLogLinesWidth = (item) => utils2.getLinesWidth(getLogStr(item));
    utils2.joinLines = (lines) => lines.map(fn2.maps.toString).join(NEW_LINE);
    utils2.hasColor = (str) => Boolean(str.match(new RegExp(`\\u001b[[0-9]+m`, "g")));
    utils2.stripAnsi = (text2) => {
      const args = {
        text: safe3.str(text2)
      };
      const prefix = "[\\u001B\\u009B][[\\]()#;?]*";
      const pattern1 = "(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)";
      const pattern2 = "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntpqry=><~])";
      const regex = new RegExp(`${prefix}(?:${pattern1}|${pattern2})`, "g");
      return args.text.replace(regex, "");
    };
    utils2.getEmojiRegex = (flags = "g") => {
      const args = {
        flags: safe3.str(flags)
      };
      return new RegExp(
        /[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FB-\u25FE\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDC-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8]|[\u200D\u20E3\uFE0F]|\uD83C[\uDDE6-\uDDFF\uDFFB-\uDFFF]|\uD83E[\uDDB0-\uDDB3]|\uDB40[\uDC20-\uDC7F]/,
        args.flags
      );
    };
  })(utils = out2.utils || (out2.utils = {}));
})(out || (out = {}));
var getBreadcrumb2 = getBreadcrumb;
var getLineCounter2 = getLineCounter;
var ansi2 = out.ansi;

// src/tools/ask/basicInput.ts
import { fn as fn4 } from "swiss-ak";

// src/tools/ask/basicInput/customise.ts
import { ObjectTools as ObjectTools2, symbols as symbols2 } from "swiss-ak";

// src/tools/ask/basicInput/getScrolledItems.ts
import { ArrayTools as ArrayTools3 } from "swiss-ak";
var getScrolledItems = (items, hovered, lastStartingIndex, maxShow = 10, margin = 2) => {
  if (items.length <= maxShow) {
    return {
      items,
      startingIndex: 0,
      hoveredIndex: hovered,
      doesScrollUp: false,
      doesScrollDown: false
    };
  }
  const BUFFER = Math.max(0, Math.min(Math.ceil((maxShow - 1) / 2), margin));
  let startingIndex = lastStartingIndex ?? Math.max(0, hovered - Math.floor(maxShow / 2));
  startingIndex = Math.max(0, Math.min(hovered - BUFFER, startingIndex));
  startingIndex = Math.min(items.length - maxShow, Math.max(hovered + (BUFFER + 1) - maxShow, startingIndex));
  return {
    items: items.slice(startingIndex, startingIndex + maxShow),
    startingIndex,
    hoveredIndex: hovered - startingIndex,
    doesScrollUp: startingIndex > 0,
    doesScrollDown: startingIndex + maxShow < items.length
  };
};
var getScrollbar = (allItems, scrolledItems, theme, height = scrolledItems.items.length, trimmedEndTop = false, trimmedEndBottom = false) => {
  const { colours: col, symbols: sym, boxSymbols: box } = theme;
  const trackIcon = col.scrollbarTrack(sym.scrollbarTrack);
  const barIcon = col.scrollbarBar(sym.scrollbarBar);
  const upIcon = col.scrollbarBar(sym.scrollUpIcon);
  const downIcon = col.scrollbarBar(sym.scrollDownIcon);
  const trackTrimTopIcon = col.scrollbarTrack(sym.scrollbarTrackTrimTop);
  const trackTrimBottomIcon = col.scrollbarTrack(sym.scrollbarTrackTrimBottom);
  const barTrimTopIcon = col.scrollbarBar(sym.scrollbarBarTrimTop);
  const barTrimBottomIcon = col.scrollbarBar(sym.scrollbarBarTrimBottom);
  const amountShown = scrolledItems.items.length / allItems.length;
  const barHeight = Math.max(1, Math.round(height * amountShown));
  const emptyTrackHeight = Math.max(0, height - barHeight);
  const barProgress = scrolledItems.startingIndex / (allItems.length - scrolledItems.items.length);
  const roundFn = barProgress < 0.33 ? Math.ceil : barProgress < 0.66 ? Math.round : Math.floor;
  const trackStartHeight = roundFn(emptyTrackHeight * barProgress);
  const trackEndHeight = Math.max(0, height - (trackStartHeight + barHeight));
  const scrollbarBar = ArrayTools3.repeat(barHeight, barIcon);
  if (scrolledItems.doesScrollUp && barHeight >= 2)
    scrollbarBar[0] = upIcon;
  if (scrolledItems.doesScrollDown && barHeight >= 2)
    scrollbarBar[scrollbarBar.length - 1] = downIcon;
  const result = [...ArrayTools3.repeat(trackStartHeight, trackIcon), ...scrollbarBar, ...ArrayTools3.repeat(trackEndHeight, trackIcon)];
  if (trimmedEndTop) {
    result[0] = trackStartHeight === 0 ? barTrimTopIcon : trackTrimTopIcon;
  }
  if (trimmedEndBottom) {
    result[result.length - 1] = trackEndHeight === 0 ? barTrimBottomIcon : trackTrimBottomIcon;
  }
  return result;
};

// src/tools/ask/basicInput/formatters.ts
var SELECT_ALL = Symbol.for("SWISS.NODE.ASK.SELECT.ALL");
var promptFormatters = {
  oneLine: (question, value, items, errorMessage, theme, isComplete, isExit) => {
    const { colours: col, symbols: sym, boxSymbols: box } = theme;
    const maxWidth = process.stdout.columns - 4;
    const message = typeof question === "string" ? question : question.get();
    const specialIcon = col.specialIcon(sym.specialIcon);
    const questionText = col.questionText(message);
    const promptIcon = col.promptIcon(out.center(sym.promptIcon, 3));
    const joinerWidth = out.getWidth(promptIcon);
    let mainPrompt = out.wrap(`${specialIcon} ${questionText}`, maxWidth);
    let mainPromptWidth = out.getWidth(mainPrompt.split("\n").slice(-1)[0]);
    let valueOut = "";
    let forceNewLine = false;
    if (value !== void 0) {
      let maxWidthValue = maxWidth - mainPromptWidth;
      forceNewLine = maxWidthValue < maxWidth * 0.333;
      if (forceNewLine)
        maxWidthValue = maxWidth - 3;
      const paddingWidth = (forceNewLine ? 0 : mainPromptWidth) + joinerWidth;
      const result = out.truncateStart(value, maxWidthValue);
      valueOut = col.result(result);
    }
    let itemsOut = "";
    if (items !== void 0 && !isExit) {
      const itemLines = items.split("\n");
      itemsOut = "\n" + itemLines.map((line) => out.truncate(line, maxWidth)).join("\n");
    }
    let errorOut = "";
    if (errorMessage == null ? void 0 : errorMessage.length) {
      const errorIcon = sym.errorMsgPrefix;
      errorOut = (errorMessage == null ? void 0 : errorMessage.length) ? "\n" + col.errorMsg(errorIcon + " " + out.truncate(errorMessage, maxWidth - (2 + out.getWidth(errorIcon)))) : "";
    }
    return `${mainPrompt}${forceNewLine ? "\n" : ""}${promptIcon}${valueOut}${itemsOut}${errorOut}`;
  },
  halfBox: (question, value, items, errorMessage, theme, isComplete, isExit) => {
    const { colours: col, symbols: sym, boxSymbols: box } = theme;
    let hasValue = !value.startsWith(ansi2.null);
    let hasItems = items !== void 0;
    if (hasValue && hasItems && isExit)
      hasValue = false;
    const maxWidth = process.stdout.columns - 4;
    const HORI_LINE_LENGTH = 2;
    const openingIcon = col.openingIcon(sym.openingIcon);
    const promptIcon = col.promptIcon(sym.promptIcon);
    const vertLine = col.decoration(box.vertical);
    const questionLines = out.wrap(question, maxWidth).split("\n");
    const questionLinesOut = questionLines.map((line, i) => `${i === 0 ? openingIcon : vertLine} ${col.questionText(line)}`).join("\n");
    let resultLinesOut = "";
    if (hasValue) {
      const resultLines = out.wrap(value, maxWidth).split("\n");
      resultLinesOut = "\n" + resultLines.map((line, i) => `${vertLine} ${promptIcon} ${col.result(line)}`).join("\n");
    }
    let itemsOut = "";
    if (hasItems) {
      const itemLines = items.split("\n");
      itemsOut = "\n" + itemLines.map((line) => `${vertLine} ${out.truncate(line, maxWidth)}`).join("\n");
    }
    let bothSeparator = "";
    if (hasValue && hasItems) {
      const sepLine = box.separatorLeft + box.separatorHorizontal.repeat(HORI_LINE_LENGTH - 1);
      bothSeparator = "\n" + col.decoration(sepLine);
    }
    const endLine = "\n" + col.decoration(box.bottomLeft + box.horizontal.repeat(HORI_LINE_LENGTH - 1));
    const errorMsgOut = (errorMessage == null ? void 0 : errorMessage.length) ? col.errorMsg(" " + out.truncate(errorMessage, maxWidth - 3)) : "";
    return `${questionLinesOut}${resultLinesOut}${bothSeparator}${itemsOut}${endLine}${errorMsgOut}`;
  },
  halfBoxClosed: (question, value, items, errorMessage, theme, isComplete, isExit) => {
    if (isComplete || isExit)
      return promptFormatters.oneLine(question, value, items, errorMessage, theme, isComplete, isExit);
    return promptFormatters.halfBox(question, value, items, errorMessage, theme, isComplete, isExit);
  },
  fullBox: (question, value, items, errorMessage, theme, isComplete, isExit) => {
    const { colours: col, symbols: sym, boxSymbols: box } = theme;
    let hasValue = !value.startsWith(ansi2.null);
    let hasItems = items !== void 0;
    if (hasValue && hasItems && isExit)
      hasValue = false;
    const maxWidth = process.stdout.columns - 4;
    const maxQuestionWidth = maxWidth - 4;
    const vertLine = col.decoration(box.vertical);
    const topLeftCorner = col.decoration(box.topLeft);
    const bottomLeftCorner = col.decoration(box.bottomLeft);
    const wrapBoxLine = (line, wrapFn) => {
      const lineOut = out.left(line, maxWidth - 4, " ", true);
      return `${vertLine} ${wrapFn(lineOut)} ${vertLine}`;
    };
    const questionLines = out.wrap(question, maxQuestionWidth).split("\n");
    const questionLinesOut = questionLines.map((line, i) => {
      if (i === 0) {
        const padChars = box.horizontal.repeat(maxQuestionWidth - out.getWidth(line));
        return `${topLeftCorner} ${col.questionText(line)} ${col.decoration(padChars + box.topRight)}`;
      }
      return wrapBoxLine(line, col.questionText);
    }).join("\n");
    let resultLinesOut = "";
    if (hasValue) {
      const resultLines = out.wrap(value, maxWidth - 4).split("\n");
      resultLinesOut = "\n" + resultLines.map((line, i) => wrapBoxLine(line, col.result)).join("\n");
    }
    let itemsOut = "";
    if (hasItems) {
      const itemLines = items.split("\n");
      itemsOut = "\n" + itemLines.map((line) => wrapBoxLine(out.truncate(line, maxWidth), colr)).join("\n");
    }
    let bothSeparator = "";
    if (hasValue && hasItems) {
      bothSeparator = "\n" + col.decoration(`${box.separatorLeft}${box.separatorHorizontal.repeat(maxWidth - 2)}${box.separatorRight}`);
    }
    const bottomLineText = (errorMessage == null ? void 0 : errorMessage.length) && !isComplete ? col.errorMsg(out.truncate(" " + errorMessage + " ", maxWidth - 4)) : "";
    const bottomLineBars = box.horizontal.repeat(maxWidth - 2 - out.getWidth(bottomLineText));
    const bottomLine = `${bottomLeftCorner}${bottomLineText}${col.decoration(bottomLineBars + box.bottomRight)}`;
    return `${questionLinesOut}${resultLinesOut}${bothSeparator}${itemsOut}
${bottomLine}`;
  },
  fullBoxClosed: (question, value, items, errorMessage, theme, isComplete, isExit) => {
    if (isComplete || isExit)
      return promptFormatters.oneLine(question, value, items, errorMessage, theme, isComplete, isExit);
    return promptFormatters.fullBox(question, value, items, errorMessage, theme, isComplete, isExit);
  }
};
var standardItemFormatter = (allItems, scrolledItems, selected, type, theme, isExit, isBlock, itemOutputTemplate) => {
  const { colours: col, symbols: sym, boxSymbols: box } = theme;
  const askOptions2 = getAskOptions();
  const colItemHover = isBlock ? col.itemBlockHover : col.itemHover;
  const colItemHoverIcon = isBlock ? col.itemBlockHoverIcon : col.itemHoverIcon;
  const itemSelectedIcon = col.itemSelectedIcon(out.left(sym.itemSelectedIcon, 2));
  const itemHoveredSelectedIcon = isBlock ? colItemHoverIcon(out.left(sym.itemSelectedIcon, 2)) : itemSelectedIcon;
  const itemUnselectedIcon = col.itemUnselectedIcon(out.left(sym.itemUnselectedIcon, 2));
  const itemHoverIcon = colItemHoverIcon(sym.itemHoverIcon);
  const itemHoverIconWidth = out.getWidth(sym.itemHoverIcon);
  let displayItems = scrolledItems.items;
  let hoveredIndex = scrolledItems.hoveredIndex;
  if (isExit) {
    displayItems = [scrolledItems.items[scrolledItems.hoveredIndex]];
    hoveredIndex = 0;
  }
  const hasScrollbar = !isExit && allItems.length > displayItems.length;
  let scrollbar = hasScrollbar ? getScrollbar(allItems, scrolledItems, theme) : [];
  return displayItems.map((item, index) => {
    let scrollIcon = " ";
    let selectIcon = "";
    scrollIcon = hasScrollbar ? scrollbar[index] || " " : " ";
    const isHovered = hoveredIndex === index;
    const isSelected = type === "multi" && selected !== void 0 && selected.includes(item.index);
    if (type === "multi" && selected !== void 0) {
      const selectedIcon = isHovered ? itemHoveredSelectedIcon : itemSelectedIcon;
      selectIcon = selected.includes(item.index) ? selectedIcon : itemUnselectedIcon;
    }
    const hoverIcon = isHovered ? itemHoverIcon : " ".repeat(itemHoverIconWidth);
    const normalWrapFn = type === "single" ? col.itemUnselected : (selected == null ? void 0 : selected.includes(item.index)) ? col.itemSelected : col.itemUnselected;
    const wrapFn = isHovered ? colItemHover : item.value === SELECT_ALL ? col.selectAllText : normalWrapFn;
    return itemOutputTemplate(item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected);
  }).join("\n");
};
var itemsFormatters = {
  simple: (allItems, scrolledItems, selected, type, theme, isExit) => {
    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));
    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${hoverIcon} ${selectIcon}${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, false, templateFn);
  },
  simpleAlt: (allItems, scrolledItems, selected, type, theme, isExit) => {
    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));
    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${selectIcon}${hoverIcon} ${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, false, templateFn);
  },
  block: (allItems, scrolledItems, selected, type, theme, isExit) => {
    if (isExit)
      return itemsFormatters.simple(allItems, scrolledItems, selected, type, theme, isExit);
    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));
    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${hoverIcon} ${selectIcon}${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, true, templateFn);
  },
  blockAlt: (allItems, scrolledItems, selected, type, theme, isExit) => {
    if (isExit)
      return itemsFormatters.simpleAlt(allItems, scrolledItems, selected, type, theme, isExit);
    const maxTitle = Math.max(...allItems.map((item) => out.getWidth(item.title)));
    const templateFn = (item, wrapFn, scrollIcon, hoverIcon, selectIcon, isHovered, isSelected) => {
      const mainSection = ` ${selectIcon}${hoverIcon} ${out.left(item.title, maxTitle + 1)}`;
      return `${scrollIcon} ${wrapFn(mainSection)}`;
    };
    return standardItemFormatter(allItems, scrolledItems, selected, type, theme, isExit, true, templateFn);
  }
};

// src/tools/ask/basicInput/customise.ts
var boxSymbols = {
  thin: {
    horizontal: "\u2500",
    vertical: "\u2502",
    topLeft: "\u250C",
    topRight: "\u2510",
    bottomLeft: "\u2514",
    bottomRight: "\u2518",
    separatorLeft: "\u251C",
    separatorHorizontal: "\u2500",
    separatorRight: "\u2524"
  },
  thick: {
    horizontal: "\u2501",
    vertical: "\u2503",
    topLeft: "\u250F",
    topRight: "\u2513",
    bottomLeft: "\u2517",
    bottomRight: "\u251B",
    separatorLeft: "\u2520",
    separatorHorizontal: "\u2500",
    separatorRight: "\u2528"
  }
};
var askOptions = null;
var populateAskOptions = () => {
  if (askOptions)
    return askOptions;
  const darkestGrey = colr.grey2;
  askOptions = {
    general: {
      themeColour: "yellow",
      lc: getLineCounter2(),
      boxType: "thick",
      beeps: true,
      maxItemsOnScreen: 10,
      scrollMargin: 2,
      fileExplorerColumnWidth: 25,
      fileExplorerMaxItems: 15,
      tableSelectMaxHeightPercentage: 75,
      timelineSpeed: 1,
      timelineFastSpeed: 5
    },
    text: {
      boolTrueKeys: "Yy",
      boolFalseKeys: "Nn",
      boolYes: "yes",
      boolNo: "no",
      boolYesNoSeparator: "/",
      boolYN: "(Y/n)",
      selectAll: "[Select All]",
      done: "done",
      items: (count) => `[${count} items]`,
      countdown: (s) => `Starting in ${s}s...`,
      file: "File",
      directory: "Directory",
      loading: "Loading...",
      selected: (count) => `${count} selected`,
      specialNewFolderEnterNothingCancel: "Enter nothing to cancel",
      specialNewFolderAddingFolderTo: "Adding folder to ",
      specialNewFolderQuestion: (hl) => `What do you want to ${hl("name")} the new folder?`,
      specialSaveFileSavingFileTo: "Saving file to ",
      specialSaveFileQuestion: (hl) => `What do you want to ${hl("name")} the file?`
    },
    formatters: {
      formatPrompt: promptFormatters.oneLine,
      formatItems: itemsFormatters.block
    },
    colours: {
      decoration: {
        normal: darkestGrey,
        error: colr.dark.red.dim,
        done: darkestGrey
      },
      questionText: {
        normal: colr.white.bold,
        error: colr.white.bold,
        done: colr.white.bold
      },
      specialIcon: {
        normal: colr.dark.cyan,
        error: colr.dark.red,
        done: colr.dark.green
      },
      openingIcon: {
        normal: darkestGrey,
        error: colr.dark.red,
        done: darkestGrey
      },
      promptIcon: getSetFromSingle(colr.yellow.dim),
      result: getSetFromSingle(colr.dark.yellow),
      resultText: getSetFromSingle(colr.dark.yellow),
      resultNumber: getSetFromSingle(colr.dark.cyan),
      resultBoolean: getSetFromSingle(colr.dark.green),
      resultArray: getSetFromSingle(colr.lightBlack),
      resultDate: getSetFromSingle(colr.light.blue),
      loadingIcon: getSetFromSingle(colr.grey2),
      errorMsg: getSetFromSingle(colr.red),
      item: getSetFromSingle(colr.grey4),
      itemIcon: getSetFromSingle(colr),
      itemHover: {
        normal: colr.yellow,
        error: colr.danger,
        done: colr.yellow
      },
      itemHoverIcon: getSetFromSingle(colr),
      itemBlockHover: {
        normal: colr.yellowBg.black,
        error: colr.dangerBg,
        done: colr.yellowBg.black
      },
      itemBlockHoverIcon: getSetFromSingle(colr.black),
      itemSelected: getSetFromSingle(colr.grey4),
      itemSelectedIcon: {
        normal: colr.yellow,
        error: colr.danger,
        done: colr.yellow
      },
      itemUnselected: getSetFromSingle(colr.grey4),
      itemUnselectedIcon: getSetFromSingle(colr),
      scrollbarTrack: getSetFromSingle(colr.reset.lightBlack),
      scrollbarBar: getSetFromSingle(colr.reset.lightBlack.inverse),
      selectAllText: getSetFromSingle(colr.grey3),
      boolYNText: getSetFromSingle(darkestGrey),
      countdown: {
        normal: colr.lightBlack,
        error: colr.dark.red.dim,
        done: colr.dark.green.dim
      },
      pause: getSetFromSingle(colr.grey4),
      specialHover: {
        normal: colr.darkBg.yellowBg.black,
        error: colr.redBg.black,
        done: colr.darkBg.yellowBg.black
      },
      specialSelected: getSetFromSingle(colr.darkBg.whiteBg.black),
      specialHighlight: getSetFromSingle(colr.yellow),
      specialNormal: getSetFromSingle(colr.white),
      specialFaded: getSetFromSingle(colr.grey3),
      specialHint: getSetFromSingle(darkestGrey),
      specialInactiveHover: getSetFromSingle(colr.lightBlackBg.black),
      specialInactiveSelected: getSetFromSingle(colr.lightBlackBg.black),
      specialInactiveHighlight: getSetFromSingle(colr.grey4),
      specialInactiveNormal: getSetFromSingle(colr.grey3),
      specialInactiveFaded: getSetFromSingle(colr.grey2),
      specialInactiveHint: getSetFromSingle(colr.black),
      specialInfo: getSetFromSingle(colr.grey2),
      specialErrorMsg: getSetFromSingle(colr.red),
      specialErrorIcon: getSetFromSingle(colr),
      tableSelectHover: {
        normal: colr.yellow,
        error: colr.danger,
        done: colr.yellow
      },
      timelineTrack: getSetFromSingle(darkestGrey),
      timelineTrackActive: getSetFromSingle(colr.grey3),
      timelineHandle: getSetFromSingle(colr.grey4),
      timelineHandleActive: getSetFromSingle(colr.yellow)
    },
    symbols: {
      specialIcon: {
        normal: "?",
        error: symbols2.CROSS,
        done: symbols2.TICK
      },
      openingIcon: {
        normal: symbols2.TRI_DWN,
        error: symbols2.TRI_DWN,
        done: symbols2.TRI_RGT
      },
      promptIcon: {
        normal: symbols2.CHEV_RGT,
        error: symbols2.CHEV_RGT,
        done: "\u2023"
      },
      errorMsgPrefix: getSetFromSingle("!"),
      itemIcon: getSetFromSingle(" "),
      itemHoverIcon: getSetFromSingle(symbols2.CURSOR),
      itemSelectedIcon: getSetFromSingle(symbols2.RADIO_FULL),
      itemUnselectedIcon: getSetFromSingle(symbols2.RADIO_EMPTY),
      scrollUpIcon: getSetFromSingle(symbols2.ARROW_UPP),
      scrollDownIcon: getSetFromSingle(symbols2.ARROW_DWN),
      scrollbarTrack: getSetFromSingle("\u2502"),
      scrollbarTrackTrimTop: getSetFromSingle("\u2577"),
      scrollbarTrackTrimBottom: getSetFromSingle("\u2575"),
      scrollbarBar: getSetFromSingle(" "),
      scrollbarBarTrimTop: getSetFromSingle("\u2580"),
      scrollbarBarTrimBottom: getSetFromSingle("\u2584"),
      separatorLine: getSetFromSingle("\u2504"),
      separatorNodeDown: getSetFromSingle("\u25BF"),
      separatorNodeNone: getSetFromSingle("\u25E6"),
      separatorNodeUp: getSetFromSingle("\u25B5"),
      specialErrorIcon: getSetFromSingle(" ! "),
      folderOpenableIcon: getSetFromSingle("\u203A"),
      fileOpenableIcon: getSetFromSingle(" "),
      symlinkIcon: getSetFromSingle("\u21AA"),
      timelineTrack: getSetFromSingle("\u2588"),
      timelineHandle: getSetFromSingle("\u2503"),
      timelineBar: getSetFromSingle("\u2588")
    }
  };
  return askOptions;
};
var cachedOptionsForStates = {
  normal: void 0,
  error: void 0,
  done: void 0
};
var getAskOptions = () => {
  if (!askOptions)
    populateAskOptions();
  return askOptions;
};
var getOptionsStateName = (isDone, isError) => isDone ? "done" : isError ? "error" : "normal";
var getAskOptionsForState = (isDone, isError) => {
  if (!askOptions)
    populateAskOptions();
  const state = getOptionsStateName(isDone, isError);
  if (cachedOptionsForStates[state])
    return cachedOptionsForStates[state];
  const getPropertiesForState = (obj) => ObjectTools2.mapValues(obj, (key, value) => {
    if (typeof value !== "object")
      return value;
    const valueSet = value;
    return valueSet[state];
  });
  const optsForState = {
    general: askOptions.general,
    text: askOptions.text,
    formatters: askOptions.formatters,
    colours: getPropertiesForState(askOptions.colours),
    symbols: getPropertiesForState(askOptions.symbols),
    boxSymbols: boxSymbols[askOptions.general.boxType]
  };
  cachedOptionsForStates[state] = optsForState;
  return optsForState;
};
var getSetFromSingle = (item) => ({
  normal: item,
  error: item,
  done: item
});
var processThemeItem = (item, defaultItem) => {
  if (item === void 0 || item === null)
    return defaultItem;
  if (typeof item !== "object") {
    return getSetFromSingle(item);
  }
  const itemSet = item;
  if (item && (itemSet.normal !== void 0 || itemSet.error !== void 0 || itemSet.done !== void 0)) {
    return {
      normal: itemSet.normal ?? defaultItem.normal,
      error: itemSet.error ?? defaultItem.error,
      done: itemSet.done ?? defaultItem.done
    };
  }
  return defaultItem;
};
var applyPartialOptionsToAskOptions = (options) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za;
  if (!askOptions)
    populateAskOptions();
  askOptions.general = {
    themeColour: ((_a = options == null ? void 0 : options.general) == null ? void 0 : _a.themeColour) ?? askOptions.general.themeColour,
    lc: ((_b = options == null ? void 0 : options.general) == null ? void 0 : _b.lc) ?? askOptions.general.lc,
    boxType: ((_c = options == null ? void 0 : options.general) == null ? void 0 : _c.boxType) ?? askOptions.general.boxType,
    beeps: ((_d = options == null ? void 0 : options.general) == null ? void 0 : _d.beeps) ?? askOptions.general.beeps,
    maxItemsOnScreen: ((_e = options == null ? void 0 : options.general) == null ? void 0 : _e.maxItemsOnScreen) ?? askOptions.general.maxItemsOnScreen,
    scrollMargin: ((_f = options == null ? void 0 : options.general) == null ? void 0 : _f.scrollMargin) ?? askOptions.general.scrollMargin,
    fileExplorerColumnWidth: ((_g = options == null ? void 0 : options.general) == null ? void 0 : _g.fileExplorerColumnWidth) ?? askOptions.general.fileExplorerColumnWidth,
    fileExplorerMaxItems: ((_h = options == null ? void 0 : options.general) == null ? void 0 : _h.fileExplorerMaxItems) ?? askOptions.general.fileExplorerMaxItems,
    tableSelectMaxHeightPercentage: ((_i = options == null ? void 0 : options.general) == null ? void 0 : _i.tableSelectMaxHeightPercentage) ?? askOptions.general.tableSelectMaxHeightPercentage,
    timelineSpeed: ((_j = options == null ? void 0 : options.general) == null ? void 0 : _j.timelineSpeed) ?? askOptions.general.timelineSpeed,
    timelineFastSpeed: ((_k = options == null ? void 0 : options.general) == null ? void 0 : _k.timelineFastSpeed) ?? askOptions.general.timelineFastSpeed
  };
  askOptions.text = {
    boolTrueKeys: ((_l = options == null ? void 0 : options.text) == null ? void 0 : _l.boolTrueKeys) ?? askOptions.text.boolTrueKeys,
    boolFalseKeys: ((_m = options == null ? void 0 : options.text) == null ? void 0 : _m.boolFalseKeys) ?? askOptions.text.boolFalseKeys,
    boolYes: ((_n = options == null ? void 0 : options.text) == null ? void 0 : _n.boolYes) ?? askOptions.text.boolYes,
    boolNo: ((_o = options == null ? void 0 : options.text) == null ? void 0 : _o.boolNo) ?? askOptions.text.boolNo,
    boolYesNoSeparator: ((_p = options == null ? void 0 : options.text) == null ? void 0 : _p.boolYesNoSeparator) ?? askOptions.text.boolYesNoSeparator,
    boolYN: ((_q = options == null ? void 0 : options.text) == null ? void 0 : _q.boolYN) ?? askOptions.text.boolYN,
    selectAll: ((_r = options == null ? void 0 : options.text) == null ? void 0 : _r.selectAll) ?? askOptions.text.selectAll,
    done: ((_s = options == null ? void 0 : options.text) == null ? void 0 : _s.done) ?? askOptions.text.done,
    items: ((_t = options == null ? void 0 : options.text) == null ? void 0 : _t.items) ?? askOptions.text.items,
    countdown: ((_u = options == null ? void 0 : options.text) == null ? void 0 : _u.countdown) ?? askOptions.text.countdown,
    file: ((_v = options == null ? void 0 : options.text) == null ? void 0 : _v.file) ?? askOptions.text.file,
    directory: ((_w = options == null ? void 0 : options.text) == null ? void 0 : _w.directory) ?? askOptions.text.directory,
    loading: ((_x = options == null ? void 0 : options.text) == null ? void 0 : _x.loading) ?? askOptions.text.loading,
    selected: ((_y = options == null ? void 0 : options.text) == null ? void 0 : _y.selected) ?? askOptions.text.selected,
    specialNewFolderEnterNothingCancel: ((_z = options == null ? void 0 : options.text) == null ? void 0 : _z.specialNewFolderEnterNothingCancel) ?? askOptions.text.specialNewFolderEnterNothingCancel,
    specialNewFolderAddingFolderTo: ((_A = options == null ? void 0 : options.text) == null ? void 0 : _A.specialNewFolderAddingFolderTo) ?? askOptions.text.specialNewFolderAddingFolderTo,
    specialNewFolderQuestion: ((_B = options == null ? void 0 : options.text) == null ? void 0 : _B.specialNewFolderQuestion) ?? askOptions.text.specialNewFolderQuestion,
    specialSaveFileSavingFileTo: ((_C = options == null ? void 0 : options.text) == null ? void 0 : _C.specialSaveFileSavingFileTo) ?? askOptions.text.specialSaveFileSavingFileTo,
    specialSaveFileQuestion: ((_D = options == null ? void 0 : options.text) == null ? void 0 : _D.specialSaveFileQuestion) ?? askOptions.text.specialSaveFileQuestion
  };
  askOptions.formatters = {
    formatPrompt: (() => {
      var _a2;
      if (!((_a2 = options == null ? void 0 : options.formatters) == null ? void 0 : _a2.formatPrompt))
        return askOptions.formatters.formatPrompt;
      if (typeof options.formatters.formatPrompt === "string" && promptFormatters[options.formatters.formatPrompt]) {
        return promptFormatters[options.formatters.formatPrompt];
      }
      if (typeof options.formatters.formatPrompt === "function") {
        return options.formatters.formatPrompt;
      }
      return askOptions.formatters.formatPrompt;
    })(),
    formatItems: (() => {
      var _a2;
      if (!((_a2 = options == null ? void 0 : options.formatters) == null ? void 0 : _a2.formatItems))
        return askOptions.formatters.formatItems;
      if (typeof options.formatters.formatItems === "string" && itemsFormatters[options.formatters.formatItems]) {
        return itemsFormatters[options.formatters.formatItems];
      }
      if (typeof options.formatters.formatItems === "function") {
        return options.formatters.formatItems;
      }
      return askOptions.formatters.formatItems;
    })()
  };
  askOptions.colours = {
    decoration: processThemeItem((_E = options == null ? void 0 : options.colours) == null ? void 0 : _E.decoration, askOptions.colours.decoration),
    questionText: processThemeItem((_F = options == null ? void 0 : options.colours) == null ? void 0 : _F.questionText, askOptions.colours.questionText),
    specialIcon: processThemeItem((_G = options == null ? void 0 : options.colours) == null ? void 0 : _G.specialIcon, askOptions.colours.specialIcon),
    openingIcon: processThemeItem((_H = options == null ? void 0 : options.colours) == null ? void 0 : _H.openingIcon, askOptions.colours.openingIcon),
    promptIcon: processThemeItem((_I = options == null ? void 0 : options.colours) == null ? void 0 : _I.promptIcon, askOptions.colours.promptIcon),
    result: processThemeItem((_J = options == null ? void 0 : options.colours) == null ? void 0 : _J.result, askOptions.colours.result),
    resultText: processThemeItem((_K = options == null ? void 0 : options.colours) == null ? void 0 : _K.resultText, askOptions.colours.resultText),
    resultNumber: processThemeItem((_L = options == null ? void 0 : options.colours) == null ? void 0 : _L.resultNumber, askOptions.colours.resultNumber),
    resultBoolean: processThemeItem((_M = options == null ? void 0 : options.colours) == null ? void 0 : _M.resultBoolean, askOptions.colours.resultBoolean),
    resultArray: processThemeItem((_N = options == null ? void 0 : options.colours) == null ? void 0 : _N.resultArray, askOptions.colours.resultArray),
    resultDate: processThemeItem((_O = options == null ? void 0 : options.colours) == null ? void 0 : _O.resultDate, askOptions.colours.resultDate),
    loadingIcon: processThemeItem((_P = options == null ? void 0 : options.colours) == null ? void 0 : _P.loadingIcon, askOptions.colours.loadingIcon),
    errorMsg: processThemeItem((_Q = options == null ? void 0 : options.colours) == null ? void 0 : _Q.errorMsg, askOptions.colours.errorMsg),
    item: processThemeItem((_R = options == null ? void 0 : options.colours) == null ? void 0 : _R.item, askOptions.colours.item),
    itemIcon: processThemeItem((_S = options == null ? void 0 : options.colours) == null ? void 0 : _S.itemIcon, askOptions.colours.itemIcon),
    itemHover: processThemeItem((_T = options == null ? void 0 : options.colours) == null ? void 0 : _T.itemHover, askOptions.colours.itemHover),
    itemHoverIcon: processThemeItem((_U = options == null ? void 0 : options.colours) == null ? void 0 : _U.itemHoverIcon, askOptions.colours.itemHoverIcon),
    itemBlockHover: processThemeItem((_V = options == null ? void 0 : options.colours) == null ? void 0 : _V.itemBlockHover, askOptions.colours.itemBlockHover),
    itemBlockHoverIcon: processThemeItem((_W = options == null ? void 0 : options.colours) == null ? void 0 : _W.itemBlockHoverIcon, askOptions.colours.itemBlockHoverIcon),
    itemSelected: processThemeItem((_X = options == null ? void 0 : options.colours) == null ? void 0 : _X.itemSelected, askOptions.colours.itemSelected),
    itemSelectedIcon: processThemeItem((_Y = options == null ? void 0 : options.colours) == null ? void 0 : _Y.itemSelectedIcon, askOptions.colours.itemSelectedIcon),
    itemUnselected: processThemeItem((_Z = options == null ? void 0 : options.colours) == null ? void 0 : _Z.itemUnselected, askOptions.colours.itemUnselected),
    itemUnselectedIcon: processThemeItem((__ = options == null ? void 0 : options.colours) == null ? void 0 : __.itemUnselectedIcon, askOptions.colours.itemUnselectedIcon),
    scrollbarTrack: processThemeItem((_$ = options == null ? void 0 : options.colours) == null ? void 0 : _$.scrollbarTrack, askOptions.colours.scrollbarTrack),
    scrollbarBar: processThemeItem((_aa = options == null ? void 0 : options.colours) == null ? void 0 : _aa.scrollbarBar, askOptions.colours.scrollbarBar),
    selectAllText: processThemeItem((_ba = options == null ? void 0 : options.colours) == null ? void 0 : _ba.selectAllText, askOptions.colours.selectAllText),
    boolYNText: processThemeItem((_ca = options == null ? void 0 : options.colours) == null ? void 0 : _ca.boolYNText, askOptions.colours.boolYNText),
    countdown: processThemeItem((_da = options == null ? void 0 : options.colours) == null ? void 0 : _da.countdown, askOptions.colours.countdown),
    pause: processThemeItem((_ea = options == null ? void 0 : options.colours) == null ? void 0 : _ea.pause, askOptions.colours.pause),
    specialHover: processThemeItem((_fa = options == null ? void 0 : options.colours) == null ? void 0 : _fa.specialHover, askOptions.colours.specialHover),
    specialSelected: processThemeItem((_ga = options == null ? void 0 : options.colours) == null ? void 0 : _ga.specialSelected, askOptions.colours.specialSelected),
    specialHighlight: processThemeItem((_ha = options == null ? void 0 : options.colours) == null ? void 0 : _ha.specialHighlight, askOptions.colours.specialHighlight),
    specialNormal: processThemeItem((_ia = options == null ? void 0 : options.colours) == null ? void 0 : _ia.specialNormal, askOptions.colours.specialNormal),
    specialFaded: processThemeItem((_ja = options == null ? void 0 : options.colours) == null ? void 0 : _ja.specialFaded, askOptions.colours.specialFaded),
    specialHint: processThemeItem((_ka = options == null ? void 0 : options.colours) == null ? void 0 : _ka.specialHint, askOptions.colours.specialHint),
    specialInactiveHover: processThemeItem((_la = options == null ? void 0 : options.colours) == null ? void 0 : _la.specialInactiveHover, askOptions.colours.specialInactiveHover),
    specialInactiveSelected: processThemeItem((_ma = options == null ? void 0 : options.colours) == null ? void 0 : _ma.specialInactiveSelected, askOptions.colours.specialInactiveSelected),
    specialInactiveHighlight: processThemeItem((_na = options == null ? void 0 : options.colours) == null ? void 0 : _na.specialInactiveHighlight, askOptions.colours.specialInactiveHighlight),
    specialInactiveNormal: processThemeItem((_oa = options == null ? void 0 : options.colours) == null ? void 0 : _oa.specialInactiveNormal, askOptions.colours.specialInactiveNormal),
    specialInactiveFaded: processThemeItem((_pa = options == null ? void 0 : options.colours) == null ? void 0 : _pa.specialInactiveFaded, askOptions.colours.specialInactiveFaded),
    specialInactiveHint: processThemeItem((_qa = options == null ? void 0 : options.colours) == null ? void 0 : _qa.specialInactiveHint, askOptions.colours.specialInactiveHint),
    specialInfo: processThemeItem((_ra = options == null ? void 0 : options.colours) == null ? void 0 : _ra.specialInfo, askOptions.colours.specialInfo),
    specialErrorMsg: processThemeItem((_sa = options == null ? void 0 : options.colours) == null ? void 0 : _sa.specialErrorMsg, askOptions.colours.specialErrorMsg),
    specialErrorIcon: processThemeItem((_ta = options == null ? void 0 : options.colours) == null ? void 0 : _ta.specialErrorIcon, askOptions.colours.specialErrorIcon),
    tableSelectHover: processThemeItem((_ua = options == null ? void 0 : options.colours) == null ? void 0 : _ua.tableSelectHover, askOptions.colours.tableSelectHover),
    timelineTrack: processThemeItem((_va = options == null ? void 0 : options.colours) == null ? void 0 : _va.timelineTrack, askOptions.colours.timelineTrack),
    timelineTrackActive: processThemeItem((_wa = options == null ? void 0 : options.colours) == null ? void 0 : _wa.timelineTrackActive, askOptions.colours.timelineTrackActive),
    timelineHandle: processThemeItem((_xa = options == null ? void 0 : options.colours) == null ? void 0 : _xa.timelineHandle, askOptions.colours.timelineHandle),
    timelineHandleActive: processThemeItem((_ya = options == null ? void 0 : options.colours) == null ? void 0 : _ya.timelineHandleActive, askOptions.colours.timelineHandleActive)
  };
  askOptions.symbols = {
    specialIcon: processThemeItem((_za = options == null ? void 0 : options.symbols) == null ? void 0 : _za.specialIcon, askOptions.symbols.specialIcon),
    openingIcon: processThemeItem((_Aa = options == null ? void 0 : options.symbols) == null ? void 0 : _Aa.openingIcon, askOptions.symbols.openingIcon),
    promptIcon: processThemeItem((_Ba = options == null ? void 0 : options.symbols) == null ? void 0 : _Ba.promptIcon, askOptions.symbols.promptIcon),
    errorMsgPrefix: processThemeItem((_Ca = options == null ? void 0 : options.symbols) == null ? void 0 : _Ca.errorMsgPrefix, askOptions.symbols.errorMsgPrefix),
    itemIcon: processThemeItem((_Da = options == null ? void 0 : options.symbols) == null ? void 0 : _Da.itemIcon, askOptions.symbols.itemIcon),
    itemHoverIcon: processThemeItem((_Ea = options == null ? void 0 : options.symbols) == null ? void 0 : _Ea.itemHoverIcon, askOptions.symbols.itemHoverIcon),
    itemSelectedIcon: processThemeItem((_Fa = options == null ? void 0 : options.symbols) == null ? void 0 : _Fa.itemSelectedIcon, askOptions.symbols.itemSelectedIcon),
    itemUnselectedIcon: processThemeItem((_Ga = options == null ? void 0 : options.symbols) == null ? void 0 : _Ga.itemUnselectedIcon, askOptions.symbols.itemUnselectedIcon),
    scrollUpIcon: processThemeItem((_Ha = options == null ? void 0 : options.symbols) == null ? void 0 : _Ha.scrollUpIcon, askOptions.symbols.scrollUpIcon),
    scrollDownIcon: processThemeItem((_Ia = options == null ? void 0 : options.symbols) == null ? void 0 : _Ia.scrollDownIcon, askOptions.symbols.scrollDownIcon),
    scrollbarTrack: processThemeItem((_Ja = options == null ? void 0 : options.symbols) == null ? void 0 : _Ja.scrollbarTrack, askOptions.symbols.scrollbarTrack),
    scrollbarTrackTrimTop: processThemeItem((_Ka = options == null ? void 0 : options.symbols) == null ? void 0 : _Ka.scrollbarTrackTrimTop, askOptions.symbols.scrollbarTrackTrimTop),
    scrollbarTrackTrimBottom: processThemeItem((_La = options == null ? void 0 : options.symbols) == null ? void 0 : _La.scrollbarTrackTrimBottom, askOptions.symbols.scrollbarTrackTrimBottom),
    scrollbarBar: processThemeItem((_Ma = options == null ? void 0 : options.symbols) == null ? void 0 : _Ma.scrollbarBar, askOptions.symbols.scrollbarBar),
    scrollbarBarTrimTop: processThemeItem((_Na = options == null ? void 0 : options.symbols) == null ? void 0 : _Na.scrollbarBarTrimTop, askOptions.symbols.scrollbarBarTrimTop),
    scrollbarBarTrimBottom: processThemeItem((_Oa = options == null ? void 0 : options.symbols) == null ? void 0 : _Oa.scrollbarBarTrimBottom, askOptions.symbols.scrollbarBarTrimBottom),
    separatorLine: processThemeItem((_Pa = options == null ? void 0 : options.symbols) == null ? void 0 : _Pa.separatorLine, askOptions.symbols.separatorLine),
    separatorNodeDown: processThemeItem((_Qa = options == null ? void 0 : options.symbols) == null ? void 0 : _Qa.separatorNodeDown, askOptions.symbols.separatorNodeDown),
    separatorNodeNone: processThemeItem((_Ra = options == null ? void 0 : options.symbols) == null ? void 0 : _Ra.separatorNodeNone, askOptions.symbols.separatorNodeNone),
    separatorNodeUp: processThemeItem((_Sa = options == null ? void 0 : options.symbols) == null ? void 0 : _Sa.separatorNodeUp, askOptions.symbols.separatorNodeUp),
    specialErrorIcon: processThemeItem((_Ta = options == null ? void 0 : options.symbols) == null ? void 0 : _Ta.specialErrorIcon, askOptions.symbols.specialErrorIcon),
    folderOpenableIcon: processThemeItem((_Ua = options == null ? void 0 : options.symbols) == null ? void 0 : _Ua.folderOpenableIcon, askOptions.symbols.folderOpenableIcon),
    fileOpenableIcon: processThemeItem((_Va = options == null ? void 0 : options.symbols) == null ? void 0 : _Va.fileOpenableIcon, askOptions.symbols.fileOpenableIcon),
    symlinkIcon: processThemeItem((_Wa = options == null ? void 0 : options.symbols) == null ? void 0 : _Wa.symlinkIcon, askOptions.symbols.symlinkIcon),
    timelineTrack: processThemeItem((_Xa = options == null ? void 0 : options.symbols) == null ? void 0 : _Xa.timelineTrack, askOptions.symbols.timelineTrack),
    timelineHandle: processThemeItem((_Ya = options == null ? void 0 : options.symbols) == null ? void 0 : _Ya.timelineHandle, askOptions.symbols.timelineHandle),
    timelineBar: processThemeItem((_Za = options == null ? void 0 : options.symbols) == null ? void 0 : _Za.timelineBar, askOptions.symbols.timelineBar)
  };
};
var setThemeColour = (colour) => {
  const permitted = [
    "white",
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "darkWhite",
    "lightBlack",
    "darkRed",
    "darkGreen",
    "darkYellow",
    "darkBlue",
    "darkMagenta",
    "darkCyan",
    "grey",
    "gray"
  ];
  if (!permitted.includes(colour)) {
    colour = "yellow";
  }
  const txtProp = colour;
  const bgProp = colour + "Bg";
  applyPartialOptionsToAskOptions({
    general: {
      themeColour: colour
    },
    colours: {
      promptIcon: colr[txtProp].dim,
      result: colr.dark[txtProp],
      resultText: colr.dark[txtProp],
      itemHover: {
        normal: colr[txtProp],
        done: colr[txtProp]
      },
      itemBlockHover: {
        normal: colr[bgProp].black,
        done: colr[bgProp].black
      },
      itemSelectedIcon: {
        normal: colr[txtProp],
        done: colr[txtProp]
      },
      specialHover: {
        normal: colr.darkBg[bgProp].black,
        done: colr.darkBg[bgProp].black
      },
      specialHighlight: colr[txtProp],
      tableSelectHover: {
        normal: colr[txtProp],
        done: colr[txtProp]
      },
      timelineHandleActive: colr[txtProp]
    }
  });
};
var customise = (options) => {
  var _a;
  applyPartialOptionsToAskOptions(options);
  if (((_a = options == null ? void 0 : options.general) == null ? void 0 : _a.themeColour) !== void 0) {
    setThemeColour(options.general.themeColour);
  }
  cachedOptionsForStates.normal = void 0;
  cachedOptionsForStates.error = void 0;
  cachedOptionsForStates.done = void 0;
  getAskOptionsForState(false, false);
  getAskOptionsForState(false, true);
  getAskOptionsForState(true, false);
};

// src/tools/ask/basicInput/getAskInput.ts
import { getDeferred } from "swiss-ak";

// src/tools/ask/errorValidation.ts
var getErrorInfoFromValidationResult = (validateResult) => {
  const isError = validateResult instanceof Error || (validateResult == null ? void 0 : validateResult.message) !== void 0 || typeof validateResult === "string" || validateResult === false;
  const errorMessage = (() => {
    if (validateResult instanceof Error || (validateResult == null ? void 0 : validateResult.message) !== void 0) {
      return validateResult.message;
    }
    if (typeof validateResult === "string")
      return validateResult;
    if (validateResult === false)
      return "";
    return void 0;
  })();
  return {
    isError,
    errorMessage
  };
};

// src/tools/ask/basicInput/getFullChoices.ts
var getFullChoices = (choices) => choices.map((choice) => typeof choice === "string" ? { value: choice } : choice).map((choice, index) => ({
  title: choice.title || "" + choice.value,
  value: choice.value,
  preselected: choice.selected || false,
  index
}));

// src/tools/ask/basicInput/getAskInput.ts
var getPrinter = (question, baseOptions, valueOptions, itemsOptions) => {
  let lastPrint = "";
  let lastScrollIndex = void 0;
  const askOptions2 = getAskOptions();
  const themes = {
    normal: getAskOptionsForState(false, false),
    error: getAskOptionsForState(false, true),
    done: getAskOptionsForState(true, false)
  };
  process.stdout.write(ansi2.cursor.save + ansi2.cursor.restore + ansi2.cursor.setShow(baseOptions.showCursor));
  const getOutputString = (isComplete, value, itemsData, errorMessage, isExit) => {
    const theme = isComplete ? themes.done : errorMessage !== void 0 ? themes.error : themes.normal;
    let itemsText = void 0;
    if (itemsOptions && itemsData) {
      let { items, hovered, selected } = itemsData;
      const scrolledItems = getScrolledItems(items, hovered, lastScrollIndex, askOptions2.general.maxItemsOnScreen, askOptions2.general.scrollMargin);
      itemsText = askOptions2.formatters.formatItems(items, scrolledItems, selected, itemsOptions.selectType, theme, isExit);
      lastScrollIndex = scrolledItems.startingIndex;
    }
    return out.wrap(
      askOptions2.formatters.formatPrompt(question, (value ?? ansi2.null) + ansi2.cursor.save, itemsText, errorMessage, theme, isComplete, isExit)
    );
  };
  const print = async (value, itemsData, cursorOffset, errorMessage, isComplete, isExit = false) => {
    const lastPrintLines = lastPrint.split("\n");
    const numLinesLastPrint = lastPrintLines.length;
    const lastPrintHasSave = lastPrint.includes(ansi2.cursor.save);
    const numLinesAfter = lastPrintHasSave ? (lastPrint.split(ansi2.cursor.save)[1] || "").split("\n").length : 1;
    const output = getOutputString(isComplete, value, itemsData, errorMessage, isExit);
    const outputLines = output.split("\n");
    const numLinesOutput = outputLines.length;
    const outputHasSave = output.includes(ansi2.cursor.save);
    let writeOutput = "";
    writeOutput += ansi2.cursor.down(numLinesAfter - 1);
    if (numLinesLastPrint > numLinesOutput) {
      writeOutput += ansi2.erase.lines(numLinesLastPrint - numLinesOutput) + ansi2.cursor.up(numLinesOutput - 1);
    } else {
      writeOutput += ansi2.cursor.up(numLinesLastPrint - 1);
    }
    writeOutput += ansi2.cursor.lineStart;
    writeOutput += ansi2.erase.reserve(numLinesOutput);
    writeOutput += output.replace(/\n/g, ansi2.erase.lineEnd + "\n") + ansi2.erase.lineEnd;
    if (!isComplete && !isExit) {
      writeOutput += ansi2.cursor.setShow(baseOptions.showCursor);
      if (outputHasSave)
        writeOutput += ansi2.cursor.restore + ansi2.cursor.move(-cursorOffset);
    }
    process.stdout.write(writeOutput);
    lastPrint = output;
    if (isComplete || isExit) {
      askOptions2.general.lc.add(outputLines.length);
      if (baseOptions.lc && baseOptions.lc !== askOptions2.general.lc)
        baseOptions.lc.add(outputLines.length);
    }
  };
  return print;
};
var getAskInput = (baseOptions, valueOptions, itemsOptions) => {
  const deferred = getDeferred();
  const askOptions2 = getAskOptions();
  const valueData = {
    value: valueOptions ? valueOptions.initialValue : void 0,
    cursorOffset: 0
  };
  const fullChoices = itemsOptions ? getFullChoices(itemsOptions.items) : [];
  const itemsData = {
    items: fullChoices,
    originalItems: [...fullChoices],
    hovered: itemsOptions ? itemsOptions.initialHoveredIndex ?? 0 : 0,
    selected: itemsOptions ? itemsOptions.initialSelectedIndexes ?? [] : []
  };
  const questionText = typeof baseOptions.question === "string" ? baseOptions.question : baseOptions.question.get();
  const printer = getPrinter(questionText, baseOptions, valueOptions, itemsOptions);
  const operation = {
    setup: () => {
      if (baseOptions.actions.initial) {
        baseOptions.actions.initial("", "", valueData, itemsData, kl, operation.validate, operation.display, userActions.submit, userActions.exit);
      }
    },
    validate: (newValue) => {
      const testValueData = {
        ...valueData,
        value: newValue ?? valueData.value
      };
      const validateResult = baseOptions.validate(testValueData, itemsData);
      return getErrorInfoFromValidationResult(validateResult);
    },
    display: (isComplete, isExit = false) => {
      let valueText;
      let itemsOut;
      let { isError, errorMessage } = operation.validate();
      if (!errorMessage && isExit)
        errorMessage = "";
      if (valueOptions) {
        valueText = valueOptions.displayTransformer(valueData.value, isError, errorMessage, isComplete, isExit);
      }
      if (itemsOptions) {
        if (isComplete || isExit) {
          valueText = valueData.value;
        }
        if (!isComplete || isExit) {
          itemsOut = itemsData;
        }
      }
      printer(valueText, itemsOut, valueData.cursorOffset, errorMessage, isComplete, isExit);
    }
  };
  const userActions = {
    submit: (output, newValue = output) => {
      valueData.value = newValue;
      if (!operation.validate().isError) {
        operation.display(true);
        process.stdout.write("\n");
        kl.stop();
        const transformedValue = (valueOptions == null ? void 0 : valueOptions.submitTransformer(newValue)) ?? output;
        return deferred.resolve(transformedValue);
      } else {
        if (askOptions2.general.beeps)
          process.stdout.write(ansi2.beep);
        operation.display(false);
      }
    },
    exit: async (forceNewValue) => {
      if (forceNewValue) {
        valueData.value = forceNewValue;
      }
      operation.display(false, true);
      process.stdout.write("\n" + ansi2.cursor.show);
      kl.stop();
      process.exit();
    }
  };
  const kl = getKeyListener((keyName, rawValue) => {
    if (keyName === rawValue)
      keyName = "key";
    if (baseOptions.actions[keyName]) {
      const actionFn = baseOptions.actions[keyName];
      actionFn(rawValue, keyName, valueData, itemsData, kl, operation.validate, operation.display, userActions.submit, userActions.exit);
    }
  });
  operation.setup();
  operation.display(false);
  return deferred.promise;
};

// src/tools/ask/basicInput/getSearchSuggestions.ts
import { ArrayTools as ArrayTools4, MathsTools, fn as fn3 } from "swiss-ak";
var WEIGHTS = {
  MATCH_PER_LETTER: 100,
  MATCH_CASE_PER_LETTER: 5,
  NEAR_START_TEXT: 50,
  NEAR_START_WORD: 50,
  SHORTER_TEXT: 1
};
var getSearchSuggestions = (searchText, items, itemStringify, minScore = 0) => {
  if (searchText.length === 0)
    return items;
  const processed = items.map((value) => ({ value, text: out.utils.stripAnsi(itemStringify(value)) }));
  const longestText = processed.reduce((acc, item) => item.text.length > acc.length ? item.text : acc, "");
  const withScores = processed.map(({ value, text: text2 }) => {
    let score = 0;
    const reasons = {};
    if (text2.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
      reasons.MATCH_PER_LETTER = searchText.length * WEIGHTS.MATCH_PER_LETTER;
      score = reasons.MATCH_PER_LETTER;
      const startIndex = text2.toLowerCase().indexOf(searchText.toLowerCase());
      const foundSegment = text2.substring(startIndex, startIndex + searchText.length);
      const searchTextLetters = searchText.split("");
      const foundLetters = foundSegment.split("");
      const matchedCasesLetters = searchTextLetters.filter((l, i) => l === foundLetters[i]);
      const textBefore = text2.substring(0, startIndex);
      const textAfter = text2.substring(startIndex + searchText.length);
      const lastSpaceIndex = textBefore.lastIndexOf(" ");
      reasons.MATCH_CASE_PER_LETTER = Math.round(WEIGHTS.MATCH_CASE_PER_LETTER * matchedCasesLetters.length);
      reasons.NEAR_START_TEXT = Math.round(WEIGHTS.NEAR_START_TEXT * ((longestText.length - startIndex) / longestText.length));
      reasons.NEAR_START_WORD = Math.round(WEIGHTS.NEAR_START_WORD * MathsTools.clamp(0, (10 - (startIndex - lastSpaceIndex - 1)) / 10, 1));
      reasons.SHORTER_TEXT = -Math.round(WEIGHTS.SHORTER_TEXT * text2.length);
      score += reasons.MATCH_CASE_PER_LETTER;
      score += reasons.NEAR_START_TEXT;
      score += reasons.NEAR_START_WORD;
      score += reasons.SHORTER_TEXT;
    }
    return {
      value,
      text: text2,
      score,
      reasons
    };
  });
  const filtered = withScores.filter((item) => item.score >= minScore);
  const sorted = ArrayTools4.sortByMapped(filtered, (item) => item.score, fn3.desc);
  const values = sorted.map((item) => item.value);
  return values;
};

// src/tools/ask/basicInput/valueDisplays.ts
var valueDisplays = {
  multiselect: (itemsData, isComplete, isError) => {
    return valueDisplays.array(
      itemsData.selected.map((index) => itemsData.items[index].title),
      isComplete,
      isError
    );
  },
  array: (arr, isComplete, isError) => {
    const PRINT_LIMIT = 3;
    const theme = getAskOptionsForState(isComplete, isError);
    let display = "";
    if (arr.length <= PRINT_LIMIT)
      display = arr.map((v) => valueDisplays.anyByType((v == null ? void 0 : v.title) ?? (v == null ? void 0 : v.value) ?? v, isComplete, isError)).join(", ");
    if (arr.length > PRINT_LIMIT)
      display = theme.text.items(arr.length);
    return theme.colours.resultArray(display);
  },
  object: (obj, isComplete, isError) => {
    const usableProps = ["title", "name", "display", "value"];
    for (let prop of usableProps) {
      if (obj[prop] !== void 0)
        return valueDisplays.anyByType(obj[prop], isComplete, isError);
    }
    return "";
  },
  boolean: (bool, isComplete, isError) => {
    const { colours: col, symbols: sym, general: gen, text: txt } = getAskOptionsForState(isComplete, isError);
    if (isComplete) {
      return col.resultBoolean(bool ? txt.boolYes : txt.boolNo);
    }
    const withCursor = sym.itemHoverIcon;
    const withoutCursor = " ".repeat(out.getWidth(sym.itemHoverIcon));
    const yesCursor = bool ? withCursor : withoutCursor;
    const noCursor = !bool ? withCursor : withoutCursor;
    const yes = (bool ? col.itemHover : col.itemUnselected)(yesCursor + " " + txt.boolYes);
    const no = (!bool ? col.itemHover : col.itemUnselected)(noCursor + " " + txt.boolNo);
    return `${yes} ${col.decoration(txt.boolYesNoSeparator)} ${no}`;
  },
  booleanYN: (bool, isComplete, isError) => {
    const theme = getAskOptionsForState(isComplete, isError);
    if (isComplete) {
      return bool === "" ? "" : bool ? theme.text.boolYes : theme.text.boolNo;
    }
    return theme.colours.boolYNText(`${theme.text.boolYN} `);
  },
  number: (num, isComplete, isError) => {
    const theme = getAskOptionsForState(isComplete, isError);
    return theme.colours.resultNumber("" + num);
  },
  text: (text2, isComplete, isError) => {
    const theme = getAskOptionsForState(isComplete, isError);
    return theme.colours.resultText(text2);
  },
  date: (date2, isComplete, isError, isDateOn, isTimeOn) => {
    const theme = getAskOptionsForState(isComplete, isError);
    const [ogDate, ogTime] = date2.toISOString().match(/([0-9]{4}-[0-9]{2}-[0-9]{2})|(?!T)([0-9]{2}:[0-9]{2})/g);
    if (isDateOn === void 0 || isTimeOn === void 0) {
      if (isDateOn === void 0)
        isDateOn = ogDate !== "1970-01-01";
      if (isTimeOn === void 0)
        isTimeOn = ogTime !== "00:00";
    }
    const dateStr = isDateOn ? date2.toDateString() : void 0;
    const timeStr = isTimeOn ? ogTime.split(":").slice(0, 2).map(Number).map((v) => (v + "").padStart(2, "0")).join(":") : void 0;
    return theme.colours.resultDate([dateStr, timeStr].filter((v) => v).join(" @ "));
  },
  anyByType: (value, isComplete, isError) => {
    if (Array.isArray(value)) {
      const mappedArr = value.map((v) => valueDisplays.anyByType(v, isComplete, isError));
      return valueDisplays.array(mappedArr, isComplete, isError);
    }
    if (value instanceof Date)
      return valueDisplays.date(value, isComplete, isError);
    if (typeof value === "object")
      return valueDisplays.object(value, isComplete, isError);
    if (typeof value === "boolean")
      return valueDisplays.boolean(value, isComplete, isError);
    if (typeof value === "number")
      return valueDisplays.number(value, isComplete, isError);
    if (typeof value === "string")
      return valueDisplays.text(value, isComplete, isError);
    return value + "";
  }
};

// src/tools/ask/basicInput.ts
var text = async (question, initial, validate, lc) => {
  const textActions = {
    key(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) + rawValue + valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      print(false);
    },
    space(...args) {
      textActions.key(...args);
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      submit(valueData.value, valueData.value);
    },
    backspace(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset - 1) + valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      print(false);
    },
    delete(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) + valueData.value.slice(valueData.value.length - valueData.cursorOffset + 1);
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.cursorOffset = Math.min(valueData.value.length, valueData.cursorOffset + 1);
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.cursorOffset = Math.max(0, valueData.cursorOffset - 1);
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
    }
  };
  return getAskInput(
    {
      lc,
      question,
      showCursor: true,
      actions: textActions,
      validate: (valueData) => {
        if (!validate)
          return true;
        return validate(valueData.value);
      }
    },
    {
      initialValue: initial || "",
      displayTransformer: (v) => v,
      submitTransformer: (v) => v
    }
  );
};
var autotext = async (question, choices, initial, validate, lc) => {
  const computeItems = (valueData, itemsData) => {
    const value = valueData.value;
    const items = itemsData.originalItems;
    const searchResults = getSearchSuggestions(value, items, (i) => i.title, 1);
    itemsData.items = searchResults;
    itemsData.hovered = 0;
  };
  const autotextActions = {
    initial(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      computeItems(valueData, itemsData);
      print(false);
    },
    key(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) + rawValue + valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      computeItems(valueData, itemsData);
      print(false);
    },
    space(...args) {
      autotextActions.key(...args);
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    backspace(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset - 1) + valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      computeItems(valueData, itemsData);
      print(false);
    },
    delete(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) + valueData.value.slice(valueData.value.length - valueData.cursorOffset + 1);
      computeItems(valueData, itemsData);
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.cursorOffset = Math.min(valueData.value.length, valueData.cursorOffset + 1);
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.cursorOffset = Math.max(0, valueData.cursorOffset - 1);
      print(false);
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      itemsData.hovered = (itemsData.hovered + 1) % itemsData.items.length;
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      itemsData.hovered = (itemsData.items.length + itemsData.hovered - 1) % itemsData.items.length;
      print(false);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      submit(itemsData.items[itemsData.hovered].value, itemsData.items[itemsData.hovered].title);
    }
  };
  return getAskInput(
    {
      lc,
      question,
      showCursor: true,
      actions: autotextActions,
      validate: (valueData, itemsData) => {
        var _a;
        if (!validate)
          return true;
        return validate((_a = itemsData.items[itemsData.hovered]) == null ? void 0 : _a.value, itemsData.hovered, valueData.value);
      }
    },
    {
      initialValue: typeof initial === "string" ? initial : "",
      displayTransformer: (v) => v,
      submitTransformer: (v) => void 0
    },
    {
      selectType: "single",
      items: choices,
      initialHoveredIndex: 0,
      initialSelectedIndexes: []
    }
  );
};
var number = async (question, initial, validate, lc) => {
  const numberActions = {
    space(...args) {
      numberActions.key(...args);
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      submit(Number(valueData.value), valueData.value);
    },
    backspace(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset - 1) + valueData.value.slice(valueData.value.length - valueData.cursorOffset);
      print(false);
    },
    delete(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = valueData.value.slice(0, valueData.value.length - valueData.cursorOffset) + valueData.value.slice(valueData.value.length - valueData.cursorOffset + 1);
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.cursorOffset = Math.min(valueData.value.length, valueData.cursorOffset + 1);
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.cursorOffset = Math.max(0, valueData.cursorOffset - 1);
      print(false);
    },
    key(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      const value = valueData.value;
      const doesntRepeatDecPoint = !value.includes(".") || !/[.]/.test(rawValue);
      const firstChar = value === "" && /^[\-+]?[0-9.]*?$/.test(rawValue);
      const normalChar = value !== "" && /^[0-9.]+?$/.test(rawValue);
      if (doesntRepeatDecPoint && (firstChar || normalChar)) {
        valueData.value = value.slice(0, value.length - valueData.cursorOffset) + rawValue + value.slice(value.length - valueData.cursorOffset);
        print(false);
      }
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      const numberValue = Number(valueData.value);
      if (!Number.isNaN(numberValue)) {
        const increment = Math.pow(10, valueData.cursorOffset);
        valueData.value = "" + (numberValue - 1);
        print(false);
      }
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      const numberValue = Number(valueData.value);
      if (!Number.isNaN(numberValue)) {
        valueData.value = "" + (numberValue + 1);
        print(false);
      }
    }
  };
  const normaliseNumber = (value) => {
    const num = Number(value);
    if (value === "" || Number.isNaN(num))
      return 0;
    return num;
  };
  return getAskInput(
    {
      lc,
      question,
      showCursor: true,
      actions: numberActions,
      validate: (valueData) => {
        if (!validate)
          return true;
        return validate(normaliseNumber(valueData.value));
      }
    },
    {
      initialValue: initial !== void 0 ? "" + initial : "",
      displayTransformer: (v, isError, errMsg, isComplete) => valueDisplays.number(v, isComplete, isError),
      submitTransformer: (v) => normaliseNumber(v)
    }
  );
};
var boolean = async (question, initial = true, validate, lc) => {
  const options = getAskOptions();
  const booleanActions = {
    key(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      if (options.text.boolTrueKeys.includes(rawValue)) {
        valueData.value = true;
        print(false);
      }
      if (options.text.boolFalseKeys.includes(rawValue)) {
        valueData.value = false;
        print(false);
      }
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = true;
      print(false);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      valueData.value = false;
      print(false);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      submit(valueData.value, valueData.value);
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    }
  };
  return getAskInput(
    {
      lc,
      question,
      showCursor: false,
      actions: booleanActions,
      validate: (valueData) => {
        if (!validate)
          return true;
        return validate(valueData.value);
      }
    },
    {
      initialValue: initial,
      displayTransformer: (v, isError, errorMessage, isComplete) => {
        return valueDisplays.boolean(v, isComplete, isError);
      },
      submitTransformer: (v) => !!v
    }
  );
};
var booleanYN = async (question, validate, lc) => {
  const options = getAskOptions();
  const booleanYNActions = {
    key(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      if (options.text.boolTrueKeys.includes(rawValue)) {
        submit(true, true);
      }
      if (options.text.boolFalseKeys.includes(rawValue)) {
        submit(false, false);
      }
    },
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit();
    }
  };
  return getAskInput(
    {
      lc,
      question,
      showCursor: true,
      actions: booleanYNActions,
      validate: (valueData) => {
        if (!validate)
          return true;
        if (typeof valueData.value !== "boolean")
          return true;
        return validate(valueData.value);
      }
    },
    {
      initialValue: "",
      displayTransformer: (v, isError, errorMsg, isComplete, isExit) => {
        return valueDisplays.booleanYN(v, isComplete, isError);
      },
      submitTransformer: (v) => !!v
    }
  );
};
var select = async (question, choices, initial, validate, lc) => {
  const selectActions = {
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit(itemsData.items[itemsData.hovered].title);
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      exit(itemsData.items[itemsData.hovered].title);
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      itemsData.hovered = (itemsData.hovered + 1) % itemsData.items.length;
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      itemsData.hovered = (itemsData.items.length + itemsData.hovered - 1) % itemsData.items.length;
      print(false);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      submit(itemsData.items[itemsData.hovered].value, itemsData.items[itemsData.hovered].title);
    }
  };
  let initialHoveredIndex = 0;
  if (initial !== void 0) {
    initialHoveredIndex = choices.indexOf(initial);
    if (initialHoveredIndex === -1)
      initialHoveredIndex = choices.map((item) => typeof item === "object" && item.value !== void 0 ? item.value : item).indexOf(initial);
    if (initialHoveredIndex === -1 && typeof initial === "number" && initial >= 0 && initial < choices.length)
      initialHoveredIndex = initial;
    if (initialHoveredIndex === -1)
      initialHoveredIndex = 0;
  }
  return getAskInput(
    {
      lc,
      question,
      showCursor: false,
      actions: selectActions,
      validate: (valueData, itemsData) => {
        if (!validate)
          return true;
        return validate(itemsData.items[itemsData.hovered].value, itemsData.hovered);
      }
    },
    void 0,
    {
      selectType: "single",
      items: choices,
      initialHoveredIndex,
      initialSelectedIndexes: []
    }
  );
};
var multiselect = async (question, choices, initial, validate, lc) => {
  const SELECT_ALL2 = Symbol.for("SWISS.NODE.ASK.SELECT.ALL");
  const getIsAllSelected = (itemsData) => itemsData.items.filter((item) => item.value !== SELECT_ALL2).every((item, index) => itemsData.selected.includes(index + 1));
  const computeItems = (itemsData) => {
    const isAllSelected = getIsAllSelected(itemsData);
    if (isAllSelected && !itemsData.selected.includes(0))
      itemsData.selected.unshift(0);
    if (!isAllSelected && itemsData.selected.includes(0))
      itemsData.selected = itemsData.selected.filter((i) => i !== 0);
  };
  const toggleAll = (value, itemsData) => {
    if (value) {
      itemsData.selected = itemsData.items.map((v, i) => i);
    } else {
      itemsData.selected = [];
    }
  };
  const multiselectActions = {
    exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      const { isError } = validate2();
      exit(valueDisplays.multiselect(itemsData, false, isError));
    },
    esc(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      multiselectActions.exit(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit);
    },
    key(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      if ("Aa".includes(rawValue)) {
        toggleAll(!getIsAllSelected(itemsData), itemsData);
        print(false);
      }
    },
    space(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      const hoveredItem = itemsData.items[itemsData.hovered];
      if (hoveredItem.value === SELECT_ALL2) {
        toggleAll(!itemsData.selected.includes(itemsData.hovered), itemsData);
      } else {
        if (itemsData.selected.includes(itemsData.hovered)) {
          itemsData.selected = itemsData.selected.filter((i) => i !== itemsData.hovered);
        } else {
          itemsData.selected.push(itemsData.hovered);
        }
        computeItems(itemsData);
      }
      print(false);
    },
    down(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      itemsData.hovered = (itemsData.hovered + 1) % itemsData.items.length;
      print(false);
    },
    up(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      itemsData.hovered = (itemsData.items.length + itemsData.hovered - 1) % itemsData.items.length;
      print(false);
    },
    left(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      multiselectActions.space(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit);
    },
    right(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      multiselectActions.space(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit);
    },
    return(rawValue, keyName, valueData, itemsData, kl, validate2, print, submit, exit) {
      const { isError } = validate2();
      const display = valueDisplays.multiselect(itemsData, !isError, isError);
      submit(
        itemsData.selected.map((i) => itemsData.items[i].value),
        display
      );
    }
  };
  const options = getAskOptions();
  const allChoices = [{ title: options.text.selectAll, value: SELECT_ALL2 }, ...choices];
  let initialSelectedIndexes = [];
  allChoices.forEach((item, index) => {
    if (typeof item === "object" && item.selected)
      initialSelectedIndexes.push(index);
  });
  const initialArray = [initial].flat();
  const extractValue = (item) => typeof item === "object" && item.value !== void 0 ? item.value : item;
  const searchChoices = allChoices.map(extractValue);
  const initialItems = initialArray.map(extractValue);
  initialItems.forEach((item) => {
    const index = searchChoices.indexOf(item);
    if (index !== -1)
      initialSelectedIndexes.push(index);
  });
  if (initialSelectedIndexes.length === 0 && initialArray.length && typeof initialArray[0] === "number") {
    initialSelectedIndexes = initialArray;
  }
  initialSelectedIndexes = initialSelectedIndexes.filter(fn4.dedupe);
  const initialHoveredIndex = initialSelectedIndexes[0] ?? 0;
  let result = await getAskInput(
    {
      lc,
      question,
      showCursor: false,
      actions: multiselectActions,
      validate: (valueData, itemsData) => {
        if (!validate)
          return true;
        return validate(
          itemsData.selected.map((i) => itemsData.items[i].value),
          itemsData.selected
        );
      }
    },
    void 0,
    {
      selectType: "multi",
      items: allChoices,
      initialHoveredIndex,
      initialSelectedIndexes
    }
  );
  result = result.filter((v) => v !== SELECT_ALL2);
  return result;
};

// src/tools/ask/datetime.ts
import { days as days2, getDeferred as getDeferred2 } from "swiss-ak";

// src/utils/actionBar.ts
import { fn as fn7 } from "swiss-ak";

// src/tools/table.ts
import { ArrayTools as ArrayTools7, StringTools as StringTools3, fn as fn6 } from "swiss-ak";

// src/utils/processTableInput.ts
import { zip, fn as fn5, ArrayTools as ArrayTools5 } from "swiss-ak";
var empty = (numCols, char = "") => ArrayTools5.create(numCols, char);
var showBlank = ["undefined", "null"];
var showRaw = ["string", "number", "boolean"];
var itemToString = (item) => {
  if (showBlank.includes(typeof item))
    return "";
  if (showRaw.includes(typeof item))
    return item.toString();
  return getLogStr(item);
};
var processCells = (cells, processFn, ...args) => ({
  header: processFn(cells.header, "header", ...args),
  body: processFn(cells.body, "body", ...args)
});
var fixMixingHeader = (cells) => {
  return {
    header: cells.header || [],
    body: cells.body || []
  };
};
var transposeTable = (cells, opts) => {
  if (opts.transpose) {
    const body = table.utils.transpose(table.utils.concatRows(cells));
    return { header: [], body };
  }
  if (opts.transposeBody) {
    const body = table.utils.transpose(cells.body);
    return { header: cells.header, body };
  }
  return cells;
};
var ensureStringForEveryCell = (rows, type, numCols) => rows.map((row) => [...row, ...empty(numCols)].slice(0, numCols).map((cell) => itemToString(cell)));
var formatCells = (rows, type, format) => {
  const applicable = format.filter((f) => f.isHeader && type === "header" || f.isBody && type === "body");
  for (let frmt of applicable) {
    for (let y in rows) {
      for (let x in rows[y]) {
        if ((frmt.row === void 0 || frmt.row === Number(y)) && (frmt.col === void 0 || frmt.col === Number(x))) {
          for (let l in rows[y][x]) {
            rows[y][x][l] = frmt.formatFn(rows[y][x][l]);
          }
        }
      }
    }
  }
  return rows;
};
var splitCellsIntoLines = (rows, type) => rows.map((row) => row.map((cell) => out.utils.getLines(cell)));
var getDesiredColumnWidths = (cells, numCols, preferredWidths, [_mT, marginRight, _mB, marginLeft], maxTotalWidth) => {
  const transposed = zip(...[...cells.header, ...cells.body]);
  const actualColWidths = transposed.map((col) => Math.max(...col.map((cell) => out.utils.getLinesWidth(cell))));
  const currColWidths = preferredWidths.length ? ArrayTools5.repeat(numCols, ...preferredWidths) : actualColWidths;
  const currTotalWidth = currColWidths.length ? currColWidths.reduce(fn5.reduces.combine) + (numCols + 1) * 3 : 0;
  const diff = currTotalWidth - (maxTotalWidth - (marginRight + marginLeft));
  const colWidths = [...currColWidths];
  for (let i = 0; i < diff; i++) {
    colWidths[colWidths.indexOf(Math.max(...colWidths))]--;
  }
  return colWidths;
};
var wrapCells = (rows, type, colWidths, truncate) => rows.map((row) => {
  const wrapped = row.map((cell) => out.utils.joinLines(cell)).map((text2, colIndex) => {
    if (truncate !== false) {
      return out.truncate(text2, colWidths[colIndex], truncate);
    } else {
      return out.wrap(text2, colWidths[colIndex]);
    }
  }).map((text2) => out.utils.getLines(text2));
  const maxHeight = Math.max(...wrapped.map((cell) => cell.length));
  return wrapped.map((cell) => [...cell, ...empty(maxHeight)].slice(0, maxHeight));
});
var seperateLinesIntoRows = (rows, type) => rows.map((row) => zip(...row));
var processInput = (cells, opts) => {
  const fixed = fixMixingHeader(cells);
  const transposed = transposeTable(fixed, opts);
  const numCols = Math.max(...[...transposed.header || [], ...transposed.body].map((row) => row.length));
  const everyCell = processCells(transposed, ensureStringForEveryCell, numCols);
  const linedCells = processCells(everyCell, splitCellsIntoLines);
  const colWidths = getDesiredColumnWidths(linedCells, numCols, opts.colWidths, opts.margin, opts.maxWidth);
  const wrappedCells = processCells(linedCells, wrapCells, colWidths, opts.truncate);
  const formatted = processCells(wrappedCells, formatCells, opts.format);
  const seperatedRows = processCells(formatted, seperateLinesIntoRows);
  return { cells: seperatedRows, numCols, colWidths };
};

// src/utils/tableCharacters.ts
import { ArrayTools as ArrayTools6 } from "swiss-ak";
var tableCharactersBasic = () => ({
  hTop: ["\u2501", "\u250F", "\u2533", "\u2513"],
  hNor: [" ", "\u2503", "\u2503", "\u2503"],
  hSep: ["\u2501", "\u2523", "\u254B", "\u252B"],
  hBot: ["\u2501", "\u2517", "\u253B", "\u251B"],
  mSep: ["\u2501", "\u2521", "\u2547", "\u2529"],
  bTop: ["\u2500", "\u250C", "\u252C", "\u2510"],
  bNor: [" ", "\u2502", "\u2502", "\u2502"],
  bSep: ["\u2500", "\u251C", "\u253C", "\u2524"],
  bBot: ["\u2500", "\u2514", "\u2534", "\u2518"]
});
var ovAllCharact = (orig, char) => ArrayTools6.repeat(4, char);
var ovSeperators = (orig, char) => [orig[0], char, char, char];
var ovOuterChars = (orig, char) => [orig[0], char, orig[2], char];
var normalRows = ["hNor", "bNor"];
var outerRows = ["hTop", "hBot", "bTop", "bBot"];
var rowTypes = ["hTop", "hNor", "hSep", "hBot", "mSep", "bTop", "bNor", "bSep", "bBot"];
var applyOverrideChar = (mapped, opts) => {
  if (opts.overrideChar) {
    for (const rowType of rowTypes) {
      if (normalRows.includes(rowType)) {
        mapped[rowType] = ovSeperators(mapped[rowType], opts.overrideChar);
      } else {
        mapped[rowType] = ovAllCharact(mapped[rowType], opts.overrideChar);
      }
    }
  }
  return mapped;
};
var applyOverrideVerChar = (mapped, opts) => {
  if (opts.overrideVerChar || !opts.drawColLines) {
    const ovrd = opts.overrideVerChar || " ";
    for (const rowType of rowTypes) {
      mapped[rowType] = ovSeperators(mapped[rowType], ovrd);
    }
  }
  return mapped;
};
var applyOverrideHorChar = (mapped, opts) => {
  if (opts.overrideHorChar || !opts.drawRowLines) {
    const ovrd = opts.overrideHorChar;
    const copyVertsFrom = ["hNor", "hNor", "hNor", "hNor", "mSep", "bNor", "bNor", "bNor", "bNor"];
    for (const rowIndex in rowTypes) {
      const rowType = rowTypes[rowIndex];
      if (normalRows.includes(rowType)) {
      } else {
        if (ovrd) {
          mapped[rowType] = ovAllCharact(mapped[rowType], ovrd);
        } else {
          mapped[rowType] = [...mapped[copyVertsFrom[rowIndex]]];
        }
      }
    }
  }
  return mapped;
};
var applyOverrideCornChar = (mapped, opts) => {
  if (opts.overrideCornChar) {
    const ovrd = opts.overrideCornChar || " ";
    for (const rowType of rowTypes) {
      if (!normalRows.includes(rowType)) {
        mapped[rowType] = ovSeperators(mapped[rowType], ovrd);
      }
    }
  }
  return mapped;
};
var applyOverrideOuterChar = (mapped, opts) => {
  if (opts.overrideOuterChar) {
    const ovrd = opts.overrideOuterChar;
    for (const rowType of rowTypes) {
      if (outerRows.includes(rowType)) {
        mapped[rowType] = ovAllCharact(mapped[rowType], ovrd);
      } else {
        mapped[rowType] = ovOuterChars(mapped[rowType], ovrd);
      }
    }
  }
  return mapped;
};
var applyDrawOuter = (mapped, opts) => {
  if (!opts.drawOuter) {
    for (const rowType of rowTypes) {
      if (outerRows.includes(rowType)) {
        mapped[rowType] = ovAllCharact(mapped[rowType], " ");
      } else {
        mapped[rowType] = ovOuterChars(mapped[rowType], " ");
      }
    }
  }
  return mapped;
};
var applyOverrideCharSet = (mapped, opts) => {
  if (opts.overrideCharSet) {
    const ovrd = opts.overrideCharSet;
    const ovrdRowTypes = Object.keys(ovrd);
    for (const rowType of ovrdRowTypes) {
      const ovrdRow = ovrd[rowType];
      if (rowTypes.includes(rowType) && ovrdRow && ovrdRow instanceof Array && ovrdRow.length) {
        mapped[rowType] = mapped[rowType].map((c, i) => ovrdRow[i] ?? c);
      }
    }
  }
  return mapped;
};
var getTableCharacters = (opts) => {
  let mapped = tableCharactersBasic();
  mapped = applyOverrideChar(mapped, opts);
  mapped = applyOverrideOuterChar(mapped, opts);
  if (opts.overridePrioritiseVer) {
    mapped = applyOverrideHorChar(mapped, opts);
    mapped = applyOverrideVerChar(mapped, opts);
  } else {
    mapped = applyOverrideVerChar(mapped, opts);
    mapped = applyOverrideHorChar(mapped, opts);
  }
  mapped = applyOverrideCornChar(mapped, opts);
  mapped = applyDrawOuter(mapped, opts);
  mapped = applyOverrideCharSet(mapped, opts);
  return mapped;
};

// src/tools/table.ts
var table;
((table2) => {
  const empty2 = (numCols, char = "") => ArrayTools7.create(numCols, char);
  table2.print = (body, header, options = {}) => {
    const lines = table2.getLines(body, header, options);
    if (lines.length) {
      console.log(lines.join("\n"));
    }
    return lines.length;
  };
  const getAllKeys = (objects) => {
    const allKeys = {};
    objects.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        allKeys[key] = true;
      });
    });
    return Object.keys(allKeys);
  };
  table2.printObjects = (objects, headers = {}, options = {}) => {
    const { body, header } = utils.objectsToTable(objects, headers);
    return table2.print(body, header, options);
  };
  table2.markdown = (body, header, options = {}) => {
    const defaultMarkdownOptions = {
      overrideCharSet: {
        hTop: [" ", " ", " ", " "],
        hNor: [" ", "|", "|", "|"],
        hSep: [" ", " ", " ", " "],
        hBot: [" ", " ", " ", " "],
        mSep: ["-", "|", "|", "|"],
        bTop: [" ", " ", " ", " "],
        bNor: [" ", "|", "|", "|"],
        bSep: [" ", " ", " ", " "],
        bBot: [" ", " ", " ", " "]
      },
      drawRowLines: false,
      margin: 0,
      wrapHeaderLinesFn: fn6.noact
    };
    const lines = table2.getLines(body, header, {
      ...defaultMarkdownOptions,
      ...options
    });
    if (options.alignCols) {
      const sepIndex = lines[1].startsWith("|--") ? 1 : lines.findIndex((line) => line.startsWith("|--"));
      const sepLine = lines[sepIndex];
      const sepSections = sepLine.split("|").filter(fn6.isTruthy);
      const numCols = sepSections.length;
      const alignColumns = ArrayTools7.repeat(numCols, ...options.alignCols);
      const alignedSepSections = sepSections.map((section2, index) => {
        const algn = alignColumns[index];
        const width = section2.length;
        let firstChar = "-";
        let lastChar = "-";
        if (algn === "left" || algn === "center") {
          firstChar = ":";
        }
        if (algn === "right" || algn === "center") {
          lastChar = ":";
        }
        return `${firstChar}${"-".repeat(Math.max(0, width - 2))}${lastChar}`.slice(0, width);
      });
      lines[sepIndex] = ["", ...alignedSepSections, ""].join("|");
    }
    return lines;
  };
  table2.getLines = (body, header, options = {}) => {
    const opts = utils.getFullOptions(options);
    const { wrapperFn, wrapLinesFn, drawOuter, alignCols, align, drawRowLines, cellPadding } = opts;
    const [marginTop, marginRight, marginBottom, marginLeft] = opts.margin;
    const result = [];
    const {
      cells: { header: pHeader, body: pBody },
      numCols,
      colWidths
    } = processInput({ header, body }, opts);
    const alignColumns = ArrayTools7.repeat(numCols, ...alignCols);
    const tableChars = getTableCharacters(opts);
    const printLine = (row = empty2(numCols), chars = tableChars.bNor, textWrapperFn) => {
      const [norm, strt, sepr, endc] = chars;
      const pad = StringTools3.repeat(cellPadding, norm);
      let aligned = row.map((cell, col) => out.align(cell || "", alignColumns[col], colWidths[col], norm, true));
      if (textWrapperFn)
        aligned = aligned.map((x) => textWrapperFn(x));
      const inner = aligned.join(wrapLinesFn(`${pad}${sepr}${pad}`));
      const str = wrapLinesFn(`${StringTools3.repeat(marginLeft, " ")}${strt}${pad}`) + inner + wrapLinesFn(`${pad}${endc}${StringTools3.repeat(marginRight, " ")}`);
      result.push(out.align(wrapperFn(str), align, -1, " ", false));
    };
    if (marginTop)
      result.push(StringTools3.repeat(marginTop - 1, "\n"));
    if (pHeader.length) {
      if (drawOuter && drawRowLines)
        printLine(empty2(numCols, ""), tableChars.hTop, wrapLinesFn);
      for (let index in pHeader) {
        const row = pHeader[index];
        if (Number(index) !== 0 && drawRowLines)
          printLine(empty2(numCols, ""), tableChars.hSep, wrapLinesFn);
        for (let line of row) {
          printLine(line, tableChars.hNor, opts.wrapHeaderLinesFn);
        }
      }
      printLine(empty2(numCols, ""), tableChars.mSep, wrapLinesFn);
    } else {
      if (drawOuter)
        printLine(empty2(numCols, ""), tableChars.bTop, wrapLinesFn);
    }
    for (let index in pBody) {
      const row = pBody[index];
      if (Number(index) !== 0 && drawRowLines)
        printLine(empty2(numCols, ""), tableChars.bSep, wrapLinesFn);
      for (let line of row) {
        printLine(line, tableChars.bNor, opts.wrapBodyLinesFn);
      }
    }
    if (drawOuter && drawRowLines)
      printLine(empty2(numCols, ""), tableChars.bBot, wrapLinesFn);
    if (marginBottom)
      result.push(StringTools3.repeat(marginBottom - 1, "\n"));
    return result;
  };
  const toFullFormatConfig = (config) => ({
    isHeader: false,
    isBody: true,
    ...config
  });
  let utils;
  ((utils2) => {
    utils2.objectsToTable = (objects, headers = {}) => {
      const allKeys = getAllKeys(objects);
      const header = [allKeys.map((key) => headers[key] || key)];
      const body = objects.map((obj) => allKeys.map((key) => obj[key]));
      return {
        header,
        body
      };
    };
    utils2.transpose = (rows) => {
      return ArrayTools7.zip(...rows);
    };
    utils2.concatRows = (cells) => {
      return [...cells.header || [], ...cells.body];
    };
    utils2.getFormat = (format, row, col, isHeader, isBody) => {
      const result = {
        formatFn: format,
        row,
        col
      };
      if (isHeader !== void 0)
        result.isHeader = isHeader;
      if (isBody !== void 0)
        result.isBody = isBody;
      return result;
    };
    utils2.getFullOptions = (opts) => ({
      overrideChar: "",
      overrideHorChar: opts.overrideChar || "",
      overrideVerChar: opts.overrideChar || "",
      overrideCornChar: opts.overrideChar || "",
      overrideOuterChar: opts.overrideChar || "",
      overrideCharSet: void 0,
      overridePrioritiseVer: false,
      align: "left",
      alignCols: ["left"],
      colWidths: [],
      cellPadding: 1,
      truncate: false,
      maxWidth: out.utils.getTerminalWidth(),
      ...opts,
      wrapperFn: typeof opts.wrapperFn !== "function" ? fn6.noact : opts.wrapperFn,
      wrapLinesFn: typeof opts.wrapLinesFn !== "function" ? fn6.noact : opts.wrapLinesFn,
      wrapHeaderLinesFn: typeof opts.wrapHeaderLinesFn !== "function" ? colr.bold : opts.wrapHeaderLinesFn,
      wrapBodyLinesFn: typeof opts.wrapBodyLinesFn !== "function" ? fn6.noact : opts.wrapBodyLinesFn,
      drawOuter: typeof opts.drawOuter !== "boolean" ? true : opts.drawOuter,
      drawRowLines: typeof opts.drawRowLines !== "boolean" ? true : opts.drawRowLines,
      drawColLines: typeof opts.drawColLines !== "boolean" ? true : opts.drawColLines,
      transpose: typeof opts.transpose !== "boolean" ? false : opts.transpose,
      transposeBody: typeof opts.transposeBody !== "boolean" ? false : opts.transposeBody,
      format: (opts.format || []).map(toFullFormatConfig),
      margin: ((input = 0) => {
        const arr = [input].flat();
        const top = arr[0] ?? 0;
        const right = arr[1] ?? top;
        const bottom = arr[2] ?? top;
        const left = arr[3] ?? right ?? top;
        return [top, right, bottom, left];
      })(opts.margin)
    });
  })(utils = table2.utils || (table2.utils = {}));
})(table || (table = {}));

// src/utils/actionBar.ts
var getActionBar = (ids, config, pressedId, disabledIds = []) => {
  const keyList = ids.filter(fn7.isTruthy).filter((key) => config[key]);
  const row = keyList.map((key) => {
    const { keys, label } = config[key];
    return ` [ ${keys} ] ${label} `;
  });
  const format = [];
  if (pressedId) {
    format.push({ formatFn: colr.darkBg.whiteBg.black, col: keyList.indexOf(pressedId) });
  }
  if (disabledIds.length) {
    disabledIds.forEach((key) => format.push({ formatFn: colr.dim.strikethrough, col: keyList.indexOf(key) }));
  }
  return out.utils.joinLines(
    table.getLines([row], void 0, { drawOuter: false, drawColLines: false, drawRowLines: false, alignCols: ["center"], colWidths: [200], format })
  );
};

// src/utils/dynDates.ts
import { DAY, MathsTools as MathsTools2, days, sortByMapped as sortByMapped2 } from "swiss-ak";
var notNaN = (num) => typeof num !== "number" || Number.isNaN(num) ? 0 : num;
var padNum = (num, width = 2) => String(num + "").padStart(width, "0");
var dynDateToDate = ([yr, mo, dy], [hr, mi] = [12, 0]) => new Date(`${padNum(yr, 4)}-${padNum(mo)}-${padNum(dy)} ${padNum(hr)}:${padNum(mi)}:00 Z+0`);
var dateToDynDate = (date2) => {
  const dateObj = typeof date2 === "number" ? new Date(date2) : date2;
  return [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()];
};
var dateToDynTime = (date2) => {
  const dateObj = typeof date2 === "number" ? new Date(date2) : date2;
  return [dateObj.getHours(), dateObj.getMinutes()];
};
var sortDynDates = (dates) => sortByMapped2(dates, (value) => Number(dynDateToDate(value)));
var isSameMonth = (aDate, bDate) => aDate[0] === bDate[0] && aDate[1] === bDate[1];
var isEqualDynDate = (aDate, bDate) => isSameMonth(aDate, bDate) && aDate[2] === bDate[2];
var getWeekday = (date2) => (Math.floor(dynDateToDate(date2).getTime() / DAY) + 3) % 7;
var getDaysInMonth = (year, month, _dy) => {
  if (month !== 2)
    return [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
};
var correctDate = ([inYr, inMo, inDy]) => {
  const outYr = Math.abs(notNaN(inYr)) === 0 ? 1 : inYr;
  const outMo = MathsTools2.clamp(notNaN(inMo), 1, 12);
  const daysInMonth = getDaysInMonth(outYr, outMo);
  const outDy = MathsTools2.clamp(notNaN(inDy), 1, daysInMonth);
  return [outYr, outMo, outDy];
};
var addMonths = ([yr, mo, dy], add = 1) => {
  const total = yr * 12 + (mo - 1) + add;
  return correctDate([Math.floor(total / 12), total % 12 + 1, dy]);
};
var addDays = ([yr, mo, dy], add = 1) => {
  const date2 = dynDateToDate([yr, mo, dy]);
  const newDate = date2.getTime() + days(add);
  return dateToDynDate(newDate);
};
var getIntermediaryDates = (aDate, bDate) => {
  const [start, end] = sortDynDates([aDate, bDate]);
  const inter = [];
  const addAnother = (previous) => {
    const next = addDays(previous, 1);
    if (!isEqualDynDate(end, next)) {
      inter.push(next);
      addAnother(next);
    }
  };
  if (!isEqualDynDate(start, end))
    addAnother(start);
  return inter;
};

// src/utils/numberInputter.ts
import { seconds } from "swiss-ak";
var getNumberInputter = (timeout = seconds(1.5)) => {
  let lastKeyTimecode = 0;
  let logged = [];
  const get = () => Number(logged.join(""));
  return {
    input: (num) => {
      const now = Date.now();
      if (now - lastKeyTimecode > timeout)
        logged = [];
      lastKeyTimecode = now;
      logged.push(num);
      return get();
    },
    reset: () => {
      const now = Date.now();
      lastKeyTimecode = now;
      logged = [];
      return get();
    },
    backspace: () => {
      const now = Date.now();
      lastKeyTimecode = now;
      logged = logged.slice(0, -1);
      return get();
    },
    get
  };
};

// src/tools/ask/datetime/date.ts
import { range } from "swiss-ak";

// src/tools/ask/datetime/styles.ts
var getSpecialColours = (isActive, isComplete, isError) => {
  const { colours: col } = getAskOptionsForState(isComplete, isError);
  return {
    hover: isActive ? col.specialHover : col.specialInactiveHover,
    selected: isActive ? col.specialSelected : col.specialInactiveSelected,
    highlight: isActive ? col.specialHighlight : col.specialInactiveHighlight,
    normal: isActive ? col.specialNormal : col.specialInactiveNormal,
    faded: isActive ? col.specialFaded : col.specialInactiveFaded,
    hint: isActive ? col.specialHint : col.specialInactiveHint,
    info: col.specialInfo
  };
};

// src/tools/ask/datetime/date.ts
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
var NUM_OF_ROWS = 6;
var getMonthCells = (year, month, _dy) => {
  const startWeekDay = getWeekday([year, month, 1]);
  const thisMonthMax = getDaysInMonth(year, month);
  const prevMonthMax = getDaysInMonth(...addMonths([year, month, 1], -1));
  const thisMonth = range(thisMonthMax, 1, 1);
  const prevMonth = range(prevMonthMax, -1, -1);
  const nextMonth = range(28, -1, -1);
  const allCells = [...startWeekDay ? prevMonth.slice(-startWeekDay) : [], ...thisMonth, ...nextMonth];
  const byRow = range(NUM_OF_ROWS, 7).map((start) => allCells.slice(start, start + 7));
  return byRow;
};
var combineWraps = (...wraps) => (s) => wraps.reduce((acc, wrap) => wrap(acc), s);
var getMonthTable = (active, cursors, selected, isRange, slice, isError, year, month, _dy) => {
  const theme = getAskOptionsForState(false, isError);
  const col = getSpecialColours(active, false, isError);
  const selCursor = cursors[selected];
  const monthCells = getMonthCells(year, month);
  const coors = monthCells.map((row, y) => row.map((val, x) => [x, y, val])).flat();
  const nonMonthCoors = coors.filter(([x, y, val]) => val < 0);
  const formatNonMonth = nonMonthCoors.map(([x, y]) => table.utils.getFormat(col.faded, y, x));
  const formatDim = [...formatNonMonth, table.utils.getFormat(col.normal, void 0, void 0, true)];
  const formatCursor = [];
  if (isSameMonth([year, month, 1], selCursor)) {
    const selCursorCoor = [coors.find(([x, y, val]) => val === selCursor[2])];
    formatCursor.push(...selCursorCoor.map(([x, y]) => table.utils.getFormat(combineWraps(col.hover, colr.reset), y, x)));
  }
  if (isRange) {
    const otherCursor = cursors[selected === 0 ? 1 : 0];
    if (isSameMonth([year, month, 1], otherCursor)) {
      const otherCursorCoor = coors.find(([x, y, val]) => val === otherCursor[2]);
      formatCursor.push(table.utils.getFormat(combineWraps(col.selected, colr.reset), otherCursorCoor[1], otherCursorCoor[0]));
    }
    const inter = getIntermediaryDates(cursors[0], cursors[1]);
    const interNums = inter.filter((i) => isSameMonth([year, month, 1], i)).map(([yr, mo, dy]) => dy);
    const interCoors = coors.filter(([x, y, val]) => interNums.includes(val));
    const formatInter = interCoors.map(([x, y]) => table.utils.getFormat(combineWraps(col.highlight, colr.reset), y, x));
    formatCursor.push(...formatInter);
  }
  const body = monthCells.map((row) => row.map((val) => ` ${(Math.abs(val) + "").padStart(2)} `)).map((row) => row.slice(...slice));
  const headers = [daysOfWeek.slice(...slice)];
  const lines = table.getLines(body, headers, {
    drawOuter: false,
    drawColLines: false,
    drawRowLines: false,
    alignCols: ["right"],
    format: [...formatCursor, ...formatDim],
    wrapLinesFn: theme.colours.decoration,
    overrideHorChar: "\u2500",
    cellPadding: 0
  });
  const monthWidth = out.getWidth(lines[0]);
  const dispYear = out.getWidth(lines[0]) > 20 ? ` ${year}` : "";
  const dispMonth = monthNames[month - 1].slice(0, out.getWidth(lines[0]) - 2);
  const getTitle = (text2, prefix, suffix) => {
    const resPrefix = active ? col.hint(prefix) : "";
    const resSuffix = active ? col.hint(suffix) : "";
    const resText = out.center(col.normal(text2), monthWidth - (out.getWidth(resPrefix) + out.getWidth(resSuffix)));
    return `${resPrefix}${resText}${resSuffix}`;
  };
  const titleYear = getTitle(dispYear, "     \u25C0 Q", "E \u25B6     ");
  const titleMonth = getTitle(dispMonth, "  \u25C0 A", "D \u25B6  ");
  return {
    table: [titleYear, titleMonth, ...lines],
    coors
  };
};
var dateHandler = (isActive, initial, valueChangeCb, getErrorInfo, displayCb, isRange = false) => {
  const MAX_SELECTED = isRange ? 2 : 1;
  let selected = 0;
  let cursors = [...initial];
  let active = isActive;
  let prevMonth;
  let nextMonth;
  let currMonthDays;
  const tables = {
    actv: { table: [], coors: [] },
    prev: { table: [], coors: [] },
    next: { table: [], coors: [] }
  };
  const operation = {
    recalc: (skipDisplay = false) => {
      prevMonth = addMonths(cursors[selected], -1);
      nextMonth = addMonths(cursors[selected], 1);
      currMonthDays = getDaysInMonth(...cursors[selected]);
      if (!skipDisplay) {
        operation.display();
      }
    },
    setCursor: (newCursor, skipDisplay = false) => {
      cursors[selected] = newCursor;
      valueChangeCb(isRange ? sortDynDates(cursors) : cursors);
      operation.recalc(skipDisplay);
    },
    display: () => {
      const { isError, errorMessage } = getErrorInfo();
      const sliceAmount = out.getResponsiveValue([{ minColumns: 130, value: 7 }, { minColumns: 100, value: 3 }, { value: 0 }]);
      tables.actv = getMonthTable(active, cursors, selected, isRange, [0, 10], isError, ...cursors[selected]);
      tables.prev = getMonthTable(false, cursors, selected, isRange, [7 - sliceAmount, 10], isError, ...prevMonth);
      tables.next = getMonthTable(false, cursors, selected, isRange, [0, sliceAmount], isError, ...nextMonth);
      displayCb(out.concatLineGroups(tables.prev.table, tables.actv.table, tables.next.table));
    }
  };
  const userActions = {
    setDate: (date2) => operation.setCursor([cursors[selected][0], cursors[selected][1], date2]),
    switchSelected: () => {
      selected = (selected + 1) % MAX_SELECTED;
      operation.recalc();
    },
    moveMonth: (dir) => operation.setCursor(addMonths(cursors[selected], dir)),
    moveYear: (dir) => operation.setCursor(addMonths(cursors[selected], dir * 12)),
    moveHor: (dir) => {
      const [yr, mo, dy] = cursors[selected];
      const currWeekday = getWeekday(cursors[selected]);
      if (dir < 0 && currWeekday > 0 || dir > 0 && currWeekday < 6) {
        return operation.setCursor(addDays(cursors[selected], dir));
      }
      const [currCol, currRow] = tables.actv.coors.find(([x, y, val]) => val === dy);
      const newRow = currRow;
      const newCol = (7 + currCol + dir) % 7;
      const newMonthCoors = [tables.prev.coors, tables.next.coors][Number(dir > 0)];
      let [_x, _y, newDay] = newMonthCoors.find(([x, y]) => x === newCol && y === newRow);
      const [newYear, newMonth] = addMonths(cursors[selected], dir);
      if (newDay < 0)
        newDay = dir > 0 ? 1 : getDaysInMonth(newYear, newMonth);
      return operation.setCursor(correctDate([newYear, newMonth, newDay]));
    },
    moveVer: (dir) => operation.setCursor(addDays(cursors[selected], dir * 7))
  };
  operation.setCursor(initial[0], true);
  const result = {
    getValue: () => isRange ? sortDynDates(cursors) : cursors,
    setActive: (isActive2) => {
      active = isActive2;
      operation.display();
    },
    triggerDisplay: () => operation.display(),
    inputKey: (key, num) => {
      if (num !== void 0)
        return userActions.setDate(num);
      switch (key) {
        case "tab":
          return userActions.switchSelected();
        case "right":
          return userActions.moveHor(1);
        case "left":
          return userActions.moveHor(-1);
        case "up":
          return userActions.moveVer(-1);
        case "down":
          return userActions.moveVer(1);
        case "a":
          return userActions.moveMonth(-1);
        case "d":
          return userActions.moveMonth(1);
        case "q":
          return userActions.moveYear(-1);
        case "e":
          return userActions.moveYear(1);
      }
    }
  };
  return result;
};

// src/tools/ask/datetime/time.ts
import { range as range2 } from "swiss-ak";
var getSingleTimeDial = (value, sectionActive, dialActive, max, label, isError) => {
  const theme = getAskOptionsForState(false, isError);
  const col = getSpecialColours(sectionActive, false, isError);
  const wrapFns = [col.faded, col.normal, dialActive ? col.hover : col.selected];
  const showExtra = wrapFns.length - 1;
  const dialNums = range2(showExtra * 2 + 1, void 0, value - showExtra).map((v) => (v + max) % max);
  const dial = out.rightLines(dialNums.map((v, i) => wrapFns[Math.min(i, dialNums.length - i - 1)](` ${(v + "").padStart(2)} `)));
  const lines = out.centerLines([col.normal(label), theme.colours.decoration("\u25E2\u25E3"), ...dial, theme.colours.decoration("\u25E5\u25E4")], 4);
  return lines;
};
var timeHandler = (isActive, initial, valueChangeCb, getErrorInfo, displayCb) => {
  const MAX_COL = 2;
  const MAX_VALUES = [24, 60, 60];
  const labels = ["hh", "mm", "ss"];
  let current = [...initial];
  let cursor = 0;
  let active = isActive;
  const operation = {
    display: () => {
      const { isError, errorMessage } = getErrorInfo();
      const dials = current.map((v, i) => getSingleTimeDial(v, active, active && i === cursor, MAX_VALUES[i], labels[i], isError));
      const lines = out.concatLineGroups(...dials);
      const padded = out.centerLines(lines);
      displayCb(padded);
    }
  };
  const userActions = {
    set: (val) => {
      const max = MAX_VALUES[cursor];
      current[cursor] = (max + val) % max;
      valueChangeCb(current);
      operation.display();
    },
    moveHor: (dir) => {
      cursor = (MAX_COL + cursor + dir) % MAX_COL;
      valueChangeCb(current);
      operation.display();
    },
    moveVer: (dir) => {
      const max = MAX_VALUES[cursor];
      current[cursor] = (max + current[cursor] + dir) % max;
      valueChangeCb(current);
      operation.display();
    }
  };
  const result = {
    getValue: () => current,
    setActive: (isActive2) => {
      active = isActive2;
      operation.display();
    },
    triggerDisplay: () => operation.display(),
    inputKey: (key, num) => {
      if (num !== void 0)
        return userActions.set(num);
      switch (key) {
        case "right":
          return userActions.moveHor(1);
        case "left":
          return userActions.moveHor(-1);
        case "up":
          return userActions.moveVer(-1);
        case "down":
          return userActions.moveVer(1);
      }
    }
  };
  return result;
};

// src/tools/ask/imitate.ts
var getImitateOutput = (question, result, isComplete = true, isError = false, errorMsg = isError ? "" : void 0, lc) => {
  const theme = getAskOptionsForState(isComplete, isError);
  const resultText = valueDisplays.anyByType(result, isComplete, isError);
  const output = theme.formatters.formatPrompt(question, resultText, void 0, errorMsg, theme, isComplete, false);
  if (lc) {
    const lines = output.split("\n");
    lc.add(lines.length);
  }
  return output;
};
var imitate = (question, result, isComplete = true, isError = false, errorMessage, lc) => {
  const options = getAskOptions();
  const output = getImitateOutput(question, result, isComplete, isError, isError ? errorMessage : void 0);
  console.log(output);
  const lines = output.split("\n");
  if (options.general.lc)
    options.general.lc.add(lines.length);
  if (lc && lc !== options.general.lc)
    lc.add(lines.length);
};

// src/tools/ask/datetime.ts
var actionConfig = {
  "tab-section": {
    keys: "tab",
    label: "switch section"
  },
  "tab-range": {
    keys: "tab",
    label: "switch start/end"
  },
  "nums-date": {
    keys: "0-9",
    label: "enter date"
  },
  "nums-time": {
    keys: "0-9",
    label: "enter numbers"
  },
  "move-date": {
    keys: "\u2191 \u2193 \u2190 \u2192",
    label: "move cursor"
  },
  "move-time-ver": {
    keys: "\u2191 \u2193",
    label: "change value"
  },
  "move-time-hor": {
    keys: "\u2190 \u2192",
    label: "switch hour/min"
  },
  "qead-date": {
    keys: "Q / E / A / D",
    label: "change year/month"
  }
};
var getDTActionBar = (isDateOn, isTimeOn, isRange, active, isError) => {
  const theme = getAskOptionsForState(false, isError);
  const keys = [
    isDateOn && !isTimeOn && isRange ? "tab-range" : void 0,
    isDateOn && isTimeOn && !isRange ? "tab-section" : void 0,
    ...active === "date" ? ["nums-date", "move-date", "qead-date"] : [],
    ...active === "time" ? ["nums-time", "move-time-ver", "move-time-hor"] : []
  ].filter((id) => id && actionConfig[id]);
  return theme.colours.specialInfo(getActionBar(keys, actionConfig));
};
var getDTErrorLine = ({ isError, errorMessage }) => {
  if (!isError)
    return "";
  const theme = getAskOptionsForState(false, isError);
  const maxWidth = out.utils.getTerminalWidth() - (out.getWidth(theme.symbols.specialErrorIcon) + 2) * 2;
  const icon = theme.colours.specialErrorIcon(theme.symbols.specialErrorIcon);
  const msg = out.truncate(errorMessage, maxWidth);
  const text2 = `${icon} ${msg} ${icon}`;
  return out.center(theme.colours.specialErrorMsg(text2));
};
var getCurrDynDate = () => dateToDynDate(new Date());
var getCurrDynTime = () => {
  const now = new Date();
  return [now.getHours(), now.getMinutes()];
};
var getStateDisplay = (handlers, isDateOn, isTimeOn, isRange, isComplete, isError) => {
  const theme = getAskOptionsForState(isComplete, isError);
  const [start, end] = isDateOn ? handlers.date.getValue() : [[1970, 1, 1]];
  const time2 = isTimeOn ? handlers.time.getValue() : void 0;
  if (isRange) {
    const [startOut, endOut] = [start, end].map((d) => valueDisplays.date(dynDateToDate(d, time2), isComplete, isError, isDateOn, isTimeOn));
    const separator2 = theme.colours.decoration(" \u2192 ");
    return `${startOut}${separator2}${endOut}`;
  }
  return valueDisplays.date(dynDateToDate(start, time2), isComplete, isError, isDateOn, isTimeOn);
};
var overallHandler = (questionText = "Please pick a date:", isDateOn, isTimeOn, isRange, initialDate = [getCurrDynDate(), isRange ? getCurrDynDate() : getCurrDynDate()], initialTime = getCurrDynTime(), convertFn, validateFn, lc) => {
  const deferred = getDeferred2();
  const tempLC = getLineCounter();
  const askOptions2 = getAskOptions();
  const isSwitchable = isDateOn && isTimeOn;
  let activeHandler = isDateOn ? "date" : "time";
  let errorInfo = { isError: false, errorMessage: void 0 };
  const getErrorInfo = () => errorInfo;
  const displayCache = { date: [], time: [] };
  const valueCache = {
    date: initialDate,
    time: initialTime
  };
  const operation = {
    onValueChange: (key) => (newValue) => {
      valueCache[key] = newValue;
      errorInfo = operation.runValidation();
    },
    getResult: (dateData = valueCache.date, timeData = valueCache.time) => convertFn([dateData, timeData]),
    runValidation: (dateData = valueCache.date, timeData = valueCache.time) => {
      const validateResult = validateFn == null ? void 0 : validateFn(operation.getResult(dateData, timeData));
      const info = getErrorInfoFromValidationResult(validateResult);
      return info;
    },
    onDisplay: (key) => (lines) => {
      displayCache[key] = lines;
      operation.display();
    },
    display: () => {
      const { date: date2, time: time2 } = displayCache;
      const { isError } = errorInfo;
      const sections = [];
      if (date2.length)
        sections.push(date2);
      if (date2.length && time2.length)
        sections.push(out.centerLines([""], 8));
      if (time2.length)
        sections.push(date2.length ? out.centerLines(["", "", ...time2]) : time2);
      const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, false, isError);
      const outMain = out.center(out.utils.joinLines(sections.length ? out.concatLineGroups(...sections) : sections[0]), void 0, void 0, false);
      const outAction = getDTActionBar(isDateOn, isTimeOn, isRange, activeHandler, isError);
      const outError = getDTErrorLine(errorInfo);
      let output = ansi2.cursor.hide;
      output += getImitateOutput(questionText, outState, false, isError, void 0);
      output += "\n";
      output += "\n" + outMain;
      output += "\n" + outError;
      output += "\n" + outAction;
      tempLC.overwrite(tempLC.ansi.moveHome() + output);
    },
    eachHandler: (cb) => Object.entries(handlers).filter(([key, handler]) => handler).forEach(([key, handler]) => cb(key, handler)),
    switchActive: () => {
      if (isSwitchable) {
        activeHandler = activeHandler === "date" ? "time" : "date";
        operation.eachHandler((key, handler) => handler.setActive(key === activeHandler));
      }
    },
    exit: () => {
      kl.stop();
      tempLC.clear();
      const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, true, true);
      ask.imitate(questionText, outState, false, true, void 0, lc);
      process.stdout.write(ansi2.cursor.show);
      process.exit();
    },
    submit: () => {
      var _a, _b;
      const dates = (_a = handlers.date) == null ? void 0 : _a.getValue();
      const time2 = (_b = handlers.time) == null ? void 0 : _b.getValue();
      const { isError } = operation.runValidation(dates, time2);
      if (isError) {
        if (askOptions2.general.beeps)
          process.stdout.write(ansi2.beep);
        return;
      }
      const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange, true, isError);
      kl.stop();
      tempLC.clear();
      ask.imitate(questionText, outState, true, false, void 0, lc);
      process.stdout.write(ansi2.cursor.show);
      deferred.resolve(convertFn([dates, time2]));
    }
  };
  const handlers = {
    date: isDateOn && dateHandler(activeHandler === "date", initialDate, operation.onValueChange("date"), getErrorInfo, operation.onDisplay("date"), isRange) || void 0,
    time: isTimeOn && timeHandler(activeHandler === "time", initialTime, operation.onValueChange("time"), getErrorInfo, operation.onDisplay("time")) || void 0
  };
  const numberInputter = getNumberInputter();
  const kl = getKeyListener((key) => {
    switch (key) {
      case "exit":
      case "esc":
        return operation.exit();
      case "tab":
        numberInputter.reset();
        if (isDateOn && !isTimeOn && isRange && activeHandler === "date") {
          return handlers.date.inputKey(key, void 0);
        }
        return operation.switchActive();
      case "return":
        numberInputter.reset();
        return operation.submit();
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return handlers[activeHandler].inputKey(void 0, numberInputter.input(Number(key)));
      case "backspace":
        return handlers[activeHandler].inputKey(void 0, numberInputter.backspace());
      default:
        numberInputter.reset();
        return handlers[activeHandler].inputKey(key, void 0);
    }
  });
  operation.eachHandler((key, handler) => handler.triggerDisplay());
  return deferred.promise;
};
var getDefaultDate = (isDateOn, isTimeOn, dateOffset = 0) => {
  let [date2, time2] = new Date(Date.now() + days2(dateOffset)).toISOString().match(/([0-9]{4}-[0-9]{2}-[0-9]{2})|(?!T)([0-9]{2}:[0-9]{2})/g);
  if (!isTimeOn)
    time2 = "00:00";
  return new Date(date2 + " " + time2);
};
var date = async (questionText, initial, validate, lc) => {
  const initDateObj = initial || getDefaultDate(true, false);
  const initDate = dateToDynDate(initDateObj);
  const convertToDateObj = ([[ddate]]) => dynDateToDate(ddate);
  return overallHandler(questionText, true, false, false, [initDate, initDate], void 0, convertToDateObj, validate, lc);
};
var time = async (questionText, initial, validate, lc) => {
  const initDateObj = initial || getDefaultDate(false, true);
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);
  const convertToDateObj = ([_d, dtime]) => dynDateToDate(dateToDynDate(initDateObj), dtime);
  return overallHandler(questionText, false, true, false, [initDate, initDate], initTime, convertToDateObj, validate, lc);
};
var datetime = async (questionText, initial, validate, lc) => {
  const initDateObj = initial || getDefaultDate(true, true);
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);
  const convertToDateObj = ([[ddate], dtime]) => dynDateToDate(ddate, dtime);
  return overallHandler(questionText, true, true, false, [initDate, initDate], initTime, convertToDateObj, validate, lc);
};
var dateRange = async (questionText, initialStart, initialEnd, validate, lc) => {
  const initDateObj1 = initialStart || getDefaultDate(true, false);
  const initDateObj2 = initialEnd || getDefaultDate(true, false, 1);
  const initDate = [dateToDynDate(initDateObj1), dateToDynDate(initDateObj2)];
  const convertToDateObjs = ([[ddate1, ddate2]]) => [dynDateToDate(ddate1), dynDateToDate(ddate2)];
  return overallHandler(questionText, true, false, true, initDate, void 0, convertToDateObjs, validate, lc);
};

// src/tools/ask/fileExplorer/handler.ts
import { ArrayTools as ArrayTools8, PromiseTools as PromiseTools2, fn as fn9, getDeferred as getDeferred3, milliseconds, symbols as symbols3, wait as wait2 } from "swiss-ak";

// src/utils/fsUtils.ts
import { exec } from "child_process";
import fsP from "fs/promises";
import { cachier as cachier3, minutes as minutes2, onDemand as onDemand2, PromiseTools, tryOr as tryOr2 } from "swiss-ak";

// src/tools/PathTools.ts
import { safe as safe4 } from "swiss-ak";
var PathTools;
((PathTools2) => {
  PathTools2.explodePath = (path2) => {
    const args = {
      path: safe4.str(path2)
    };
    const dir = (args.path.match(/(.*[\\\/])*/) || [])[0].replace(/[\\\/]$/, "");
    const filename = (args.path.match(/[^\\\/]*$/) || [])[0];
    const ext = ((filename.match(/\.[^\.]*$/) || [])[0] || "").replace(/^\./, "");
    const name = filename.replace(ext, "").replace(/[\.]$/, "");
    const folders = dir.split(/[\\\/]/).filter((x) => x);
    return { path: args.path, dir, folders, name, ext, filename };
  };
  PathTools2.removeTrailSlash = (path2) => path2.replace(/\/$/, "");
  PathTools2.trailSlash = (path2) => PathTools2.removeTrailSlash(path2) + "/";
  PathTools2.removeDoubleSlashes = (path2) => path2.replace(/\/\//g, "/");
})(PathTools || (PathTools = {}));
var explodePath = PathTools.explodePath;

// src/tools/ask/fileExplorer/helpers.ts
import { MathsTools as MathsTools3, StringTools as StringTools4, TimeTools, seconds as seconds2, sortNumberedText, tryOr } from "swiss-ak";

// src/utils/aliases.ts
import fs from "fs";
import path from "path";
import { cachier as cachier2, minutes, onDemand } from "swiss-ak";
var extraInfo = onDemand({
  isMacOS: () => process.platform === "darwin"
});
var caches = onDemand({
  isMacOSAlias: () => cachier2.create(minutes(1)),
  resolveMacOSAlias: () => cachier2.create(minutes(1)),
  getActualLocationPath: () => cachier2.create(minutes(1)),
  clear: () => () => {
    caches.isMacOSAlias.clear();
    caches.resolveMacOSAlias.clear();
    caches.getActualLocationPath.clear();
  }
});
var couldBeMacOSAlias = (stats) => {
  if (!extraInfo.isMacOS)
    return false;
  return stats.isFile() && stats.size <= 10 * 1024;
};
var isMacOSAlias = (path2) => {
  if (!extraInfo.isMacOS)
    return false;
  return caches.isMacOSAlias.getOrRun(path2, () => {
    const ALIAS_HEADER = "626f6f6b000000006d61726b00000000";
    try {
      const fileDescriptor = fs.openSync(path2, "r");
      const headerBuffer = new Uint8Array(16);
      try {
        fs.readSync(fileDescriptor, headerBuffer, 0, 16, 0);
        const fileHeader = Buffer.from(headerBuffer).toString("hex");
        const isAlias = fileHeader === ALIAS_HEADER;
        return isAlias;
      } finally {
        fs.closeSync(fileDescriptor);
      }
    } catch (error) {
      return false;
    }
  });
};
var getActualLocationPath = async (originalPath) => {
  if (!extraInfo.isMacOS)
    return originalPath;
  return caches.getActualLocationPath.getOrRunAsync(originalPath, async () => {
    if (!originalPath || originalPath === "/") {
      return originalPath;
    }
    try {
      const stats = await getStats(originalPath);
      if (couldBeMacOSAlias(stats) && isMacOSAlias(originalPath)) {
        const destination = await resolveMacOSAlias(originalPath);
        if (destination == null ? void 0 : destination.targetPath) {
          const resolvedPath = await getActualLocationPath(destination.targetPath);
          return resolvedPath;
        }
      }
    } catch (error) {
    }
    const exploded = PathTools.explodePath(originalPath);
    if (exploded.dir) {
      const resolvedDir = await getActualLocationPath(exploded.dir);
      const resultPath = exploded.filename ? resolvedDir + "/" + exploded.filename : resolvedDir;
      if (resultPath !== originalPath) {
        return await getActualLocationPath(resultPath);
      }
      return resultPath;
    } else {
      return originalPath;
    }
  });
};
var resolveMacOSAlias = (filePath) => {
  return caches.resolveMacOSAlias.getOrRunAsync(filePath, async () => {
    const buf = fs.readFileSync(filePath);
    try {
      let result = void 0;
      if (buf.slice(0, 4).toString("ascii") === "book") {
        result = decodeBookmarkAlias(buf);
      } else {
        result = decodeClassicAlias(buf);
      }
      if (result)
        return result;
      return resolveMacOSAliasFallback(filePath);
    } catch (e) {
      return resolveMacOSAliasFallback(filePath);
    }
  });
};
var resolvePathFromComponents = (pathComponents) => {
  if (pathComponents.length === 0)
    return "";
  const cwd = process.cwd();
  const cwdExploded = PathTools.explodePath(cwd);
  let absolutePath = "";
  let foundIntersection = false;
  for (let i = 0; i < pathComponents.length; i++) {
    const component = pathComponents[i];
    const cwdIndex = cwdExploded.folders.indexOf(component);
    if (cwdIndex !== -1) {
      const beforeIntersection = cwdExploded.folders.slice(0, cwdIndex);
      const afterIntersection = pathComponents.slice(i);
      absolutePath = "/" + [...beforeIntersection, ...afterIntersection].join("/");
      foundIntersection = true;
      break;
    }
  }
  if (!foundIntersection) {
    if (pathComponents[0] && /^[a-zA-Z][a-zA-Z0-9._-]*$/.test(pathComponents[0])) {
      absolutePath = "/Users/" + pathComponents.join("/");
    } else {
      absolutePath = "/" + pathComponents.join("/");
    }
  }
  return absolutePath;
};
var decodeBookmarkAlias = (buf) => {
  if (buf.slice(0, 4).toString("ascii") !== "book" || buf.slice(8, 12).toString("ascii") !== "mark") {
    return void 0;
  }
  const pathComponents = [];
  let pos = 80;
  try {
    while (pos < buf.length - 20) {
      if (buf[pos] === 1 && buf[pos + 1] === 1 && buf[pos + 2] === 0 && buf[pos + 3] === 0) {
        pos += 4;
        let component = "";
        let strStart = pos;
        while (pos < buf.length && buf[pos] !== 0) {
          pos++;
        }
        if (pos > strStart) {
          component = buf.slice(strStart, pos).toString("utf8");
          component = component.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
          component = component.trim();
          if (component.length > 0 && component.length < 100 && !component.includes("\0") && /^[a-zA-Z0-9._ -]+$/.test(component)) {
            pathComponents.push(component);
          }
        }
        while (pos < buf.length && buf[pos] === 0) {
          pos++;
        }
        if (pos < buf.length - 4) {
          const nextBytes = buf.slice(pos, pos + 4);
          if (nextBytes[0] <= 32 && nextBytes[1] === 0) {
            pos += 4;
          }
        }
      } else {
        pos++;
      }
    }
  } catch (e) {
    return void 0;
  }
  if (pathComponents.length > 0) {
    const validComponents = pathComponents.filter((comp) => comp !== "Macintosh HD" && comp !== "Macintosh" && comp !== "HD" && comp.length < 36);
    if (validComponents.length > 0) {
      const absolutePath = resolvePathFromComponents(validComponents);
      let targetType = "d";
      try {
        const stats = fs.statSync(absolutePath);
        targetType = stats.isDirectory() ? "d" : "f";
      } catch (e) {
        const filename = validComponents[validComponents.length - 1];
        targetType = filename.includes(".") ? "f" : "d";
      }
      return { targetPath: absolutePath, targetType };
    }
  }
  return void 0;
};
var decodeClassicAlias = (buf) => {
  const info = {};
  if (buf.readUInt16BE(4) !== buf.length)
    return void 0;
  const version = buf.readUInt16BE(6);
  if (version !== 2)
    return void 0;
  const type = buf.readUInt16BE(8);
  if (type !== 0 && type !== 1)
    return void 0;
  info.targetType = ["file", "directory"][type];
  const volNameLength = buf.readUInt8(10);
  if (volNameLength > 27)
    return void 0;
  const volSig = buf.toString("ascii", 42, 44);
  if (volSig !== "BD" && volSig !== "H+" && volSig !== "HX")
    return void 0;
  const volType = buf.readUInt16BE(44);
  if (volType < 0 || volType > 5)
    return void 0;
  const fileNameLength = buf.readUInt8(50);
  if (fileNameLength > 63)
    return void 0;
  info.filename = buf.toString("utf8", 51, 51 + fileNameLength);
  const reserved = buf.slice(140, 150);
  if (reserved[0] !== 0 || reserved[1] !== 0 || reserved[2] !== 0 || reserved[3] !== 0 || reserved[4] !== 0 || reserved[5] !== 0 || reserved[6] !== 0 || reserved[7] !== 0 || reserved[8] !== 0 || reserved[9] !== 0) {
    return void 0;
  }
  let pos = 150;
  while (pos < buf.length) {
    const partType = buf.readInt16BE(pos);
    const length = buf.readUInt16BE(pos + 2);
    const data = buf.slice(pos + 4, pos + 4 + length);
    pos += 4 + length;
    if (partType === -1) {
      if (length !== 0)
        return void 0;
      break;
    }
    if (length % 2 === 1) {
      const padding = buf.readUInt8(pos);
      if (padding !== 0)
        return void 0;
      pos += 1;
    }
    switch (partType) {
      case 2:
        const parts = data.toString("utf8").split("\0");
        info.path = parts[0];
        break;
      case 18:
        info.abspath = data.toString("utf8");
        break;
    }
  }
  let absolutePath = info.abspath || info.path || "";
  if (!absolutePath)
    return void 0;
  if (!path.isAbsolute(absolutePath)) {
    const pathComponents = absolutePath.split("/").filter((comp) => comp.length > 0);
    absolutePath = resolvePathFromComponents(pathComponents);
  }
  const targetType = info.targetType === "directory" ? "d" : "f";
  return { targetPath: absolutePath, targetType };
};
var resolveMacOSAliasFallback = async (actualPath) => {
  if (!extraInfo.isMacOS)
    return null;
  const absolutePath = path.resolve(actualPath);
  const targetPath = await (async () => {
    try {
      const script = `
    tell application "Finder"
      set aliasFile to POSIX file "${absolutePath.replace(/"/g, '\\"')}" as alias
      set originalFile to original item of aliasFile
      return POSIX path of (originalFile as string)
    end tell
  `;
      const stdout = await execute(`osascript -e '${script.replace(/'/g, "\\'")}'`);
      const destination = PathTools.removeTrailSlash(stdout.trim());
      if (destination && fs.existsSync(destination)) {
        return destination;
      }
    } catch (error) {
      try {
        const stdout = await execute(`stat -f %Y "${absolutePath.replace(/"/g, '\\"')}"`);
        const destination = PathTools.removeTrailSlash(stdout.trim());
        if (destination && destination !== absolutePath && fs.existsSync(destination)) {
          return destination;
        }
      } catch (fallbackError) {
      }
    }
  })();
  if (!targetPath)
    return void 0;
  const stats = await getStats(targetPath);
  const targetType = stats.isDirectory() ? "d" : "f";
  return { targetPath, targetType };
};

// src/tools/ask/fileExplorer/cache.ts
var fsCache = {
  cache: /* @__PURE__ */ new Map(),
  getPathContents: (path2) => fsCache.cache.get(path2)
};

// src/tools/ask/fileExplorer/helpers.ts
var loadPathContents = async (path2) => {
  if (fsCache.cache.has(path2)) {
    return fsCache.cache.get(path2);
  }
  return forceLoadPathContents(path2);
};
var forceLoadPathContents = async (displayPath) => {
  let contents = { dirs: [], files: [], symlinks: { f: [], d: [] } };
  try {
    const targetPath = await getActualLocationPath(displayPath);
    const pathType = await getPathType(targetPath);
    if (pathType === "d") {
      const scanResults = await scanDir(targetPath);
      const [dirs, files] = [scanResults.dirs, scanResults.files].map((list) => list.filter((item) => item !== ".DS_Store")).map((list) => sortNumberedText(list)).map((list) => list.map((item) => item.replace(/\r|\n/g, " ")));
      contents = { ...contents, dirs, files, symlinks: scanResults.symlinks };
    }
    if (pathType === "f") {
      const [stat, info] = await Promise.all([
        tryOr(void 0, () => getStats(targetPath)),
        tryOr(void 0, () => getBasicFileInfo(targetPath))
      ]);
      contents = { ...contents, info: { stat, info } };
    }
  } catch (err) {
  }
  fsCache.cache.set(displayPath, contents);
  return contents;
};
var join = (...items) => {
  const result = items.join("/");
  return PathTools.removeDoubleSlashes(result || "/");
};
var keyActionDict = {
  move: {
    keys: "\u2191 \u2193 \u2190 \u2192",
    label: "Navigate"
  },
  r: {
    keys: "R",
    label: `Refresh`
  },
  f: {
    keys: "F",
    label: `New Folder`
  },
  o: {
    keys: "O",
    label: `Open`
  },
  space: {
    keys: "space",
    label: "Toggle selection"
  },
  return: {
    keys: "\u2B90 ",
    label: "Submit"
  }
};
var getFEActionBar = (multi, pressed, disabled = [], isError = false) => {
  const theme = getAskOptionsForState(false, isError);
  const keyList = {
    single: ["move", "r", "f", "o", "return"],
    multi: ["move", "r", "f", "o", "space", "return"]
  }[multi ? "multi" : "single"];
  return theme.colours.specialInfo(getActionBar(keyList, keyActionDict, pressed, disabled));
};
var FILE_CATEGORIES = {
  image: ["jpg", "jpeg", "png", "tif", "tiff", "gif", "bmp", "webp", "psd", "ai", "cr2", "crw", "nef", "pef", "svg"],
  video: ["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm"],
  audio: ["mp3", "aac", "ogg", "flac", "alac", "wav", "aiff", "dsd"],
  text: ["txt", "rtf"]
};
var getFileCategory = (ext) => {
  const category = Object.keys(FILE_CATEGORIES).find((key) => FILE_CATEGORIES[key].includes(ext.toLowerCase()));
  return category || "";
};
var getFileIcon = (ext) => {
  const { colours: col } = getAskOptionsForState(false, false);
  const category = getFileCategory(ext);
  const dispExt = ext.length % 2 === 0 ? ext : "." + ext;
  if (category === "image") {
    const s = col.specialNormal("\u2600");
    return out.left(
      `\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551  ${s}  \u250C\u2500\u2500\u2500\u2500\u2510${s}  \u2551
\u2551 ${s}\u250C\u2500\u2500\u2524\u25AB\u25AB\u25AA\u25AB\u2502  ${s}\u2551
\u255F\u2500\u2500\u2524\u25AB\u25AA\u2502\u25AB\u25AB\u25AB\u25AB\u251C\u2500\u2500\u2500\u2562
\u2551\u25AA\u25AB\u2502\u25AB\u25AB\u2502\u25AA\u25AB\u25AB\u25AB\u2502\u25AB\u25AA\u25AB\u2551
\u255A\u2550\u2550\u2567\u2550\u2550\u2567\u2550\u2550\u2550\u2550\u2567\u2550\u2550\u2550\u255D`,
      16
    );
  }
  if (category === "video") {
    return out.left(
      `\u250F\u2531\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2532\u2513
\u2523\u252B\u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E\u2523\u252B
\u2523\u252B\u2502${out.center(out.limitToLength(dispExt.toUpperCase(), 8), 8)}\u2502\u2523\u252B
\u2523\u252B\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F\u2523\u252B
\u2517\u2539\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253A\u251B`,
      14
    );
  }
  if (category === "audio") {
    return out.left(
      `\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502   .\u2219\xAF\xAF\xAF\xAF\u2219.   \u2502
\u2502  /        \\  \u2502
\u2502 |    ()    | \u2502
\u2502  \\        /  \u2502
\u2502   '\u2219____\u2219'   \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`,
      16
    );
  }
  return out.left(
    `,\u254C\u254C\u254C\u254C\u254C.
\u254E       \u27CD
\u254E${out.center(out.limitToLengthStart(dispExt, 8), 8)}\u254E
\u254E        \u254E
\u254E        \u254E
\u02F8\u254C\u254C\u254C\u254C\u254C\u254C\u254C\u254C\u02F8`,
    10
  );
};
var humanFileSize = (size) => {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return MathsTools3.roundTo(0.01, size / Math.pow(1024, i)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};
var getFilePanel = (path2, panelWidth, maxLines) => {
  var _a;
  const { colours: col } = getAskOptionsForState(false, false);
  const { filename, ext } = PathTools.explodePath(path2);
  const { stat, info } = ((_a = fsCache.getPathContents(path2)) == null ? void 0 : _a.info) || {};
  const result = [];
  result.push(out.center(getFileIcon(ext), panelWidth));
  const category = getFileCategory(ext);
  result.push(out.center(out.wrap(filename, panelWidth), panelWidth));
  result.push(out.center(col.specialFaded(`${ext.toUpperCase()} ${category ? `${StringTools4.capitalise(category)} ` : ""}File`), panelWidth));
  result.push(out.center(col.decoration("\u2500".repeat(Math.round(panelWidth * 0.75))), panelWidth));
  const now = Date.now();
  const addItem = (title, value, extra) => {
    result.push(out.split(`${colr.bold(col.specialFaded(title))}`, `${value}${extra ? col.specialFaded(` (${extra})`) : ""}`, panelWidth));
  };
  const addTimeItem = (title, time2, append) => {
    addItem(title, `${TimeTools.toReadableDuration(now - time2, false, 2)}${append || ""}`);
  };
  if (stat) {
    addItem(`Size`, `${humanFileSize(stat.size)}`);
    addTimeItem(`Modified`, stat.mtimeMs, " ago");
    addTimeItem(`Created`, stat.ctimeMs, " ago");
  }
  if (info) {
    if (["image", "video"].includes(category) && info.width && info.height)
      addItem(`Dimensions`, `${info.width}\xD7${info.height}`);
    if (["video", "audio"].includes(category) && info.duration)
      addItem(`Duration`, TimeTools.toReadableDuration(seconds2(info.duration), false, 2));
    if (["video"].includes(category) && info.framerate)
      addItem(`FPS`, `${info.framerate}`);
  }
  const resultStr = out.left(out.wrap(result.join("\n"), panelWidth), panelWidth);
  return col.specialNormal(out.utils.joinLines(out.utils.getLines(resultStr).slice(0, maxLines)));
};

// src/utils/fsUtils.ts
var caches2 = onDemand2({
  getStats: () => cachier3.create(minutes2(1))
});
var execute = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  });
};
var getBasicFileInfo = async (file) => {
  const ext = explodePath(file).ext;
  if (FILE_CATEGORIES.video.includes(ext.toLowerCase())) {
    return getFFProbe(file);
  }
  if (FILE_CATEGORIES.image.includes(ext.toLowerCase())) {
    return getFileInfo(file);
  }
  return { width: void 0, height: void 0, duration: void 0, framerate: void 0 };
};
var getFileInfo = async (file) => {
  const stdout = (await tryOr2("", async () => await execute(`file ${file}`))).toString();
  const [width, height] = (stdout.match(/([0-9]{2,})x([0-9]{2,})/g) || [""])[0].split("x").map(Number).filter((n) => n);
  return {
    width,
    height,
    duration: void 0,
    framerate: void 0
  };
};
var getFFProbe = async (file) => {
  const stdout = await tryOr2("", async () => await execute(`ffprobe -select_streams v -show_streams ${file} 2>/dev/null | grep =`));
  const props = Object.fromEntries(
    stdout.toString().split("\n").map((line) => line.split("=").map((str) => str.trim()))
  );
  const asNumber = (val) => Number.isNaN(Number(val)) ? 0 : Number(val);
  const framerate = asNumber(props.avg_frame_rate.split("/")[0]) / asNumber(props.avg_frame_rate.split("/")[1]);
  return {
    width: asNumber(props.width),
    height: asNumber(props.height),
    duration: asNumber(props.duration),
    framerate
  };
};
var mkdir = async (dir) => {
  const result = await fsP.mkdir(dir, { recursive: true });
  return result;
};
var scanDir = async (dir = ".") => {
  try {
    const found = await fsP.readdir(dir, { withFileTypes: true });
    const files = [];
    const dirs = [];
    const symlinks = { f: [], d: [] };
    await PromiseTools.each(found, async (file) => {
      if (file.isDirectory()) {
        return dirs.push(file.name);
      } else if (file.isFile()) {
        const fullPath = dir.endsWith("/") ? `${dir}${file.name}` : `${dir}/${file.name}`;
        const stats = await getStats(fullPath);
        if (couldBeMacOSAlias(stats) && isMacOSAlias(fullPath)) {
          const targetPath = await getActualLocationPath(fullPath);
          const itemType = await (async () => {
            let itemStats = stats;
            try {
              itemStats = await getStats(targetPath);
            } catch (err) {
            }
            if (itemStats.isDirectory())
              return "d";
            if (itemStats.isFile())
              return "f";
            return "other";
          })();
          if (itemType === "d") {
            symlinks.d.push(file.name);
            return dirs.push(file.name);
          } else if (itemType === "f") {
            symlinks.f.push(file.name);
            return files.push(file.name);
          }
        } else {
          return files.push(file.name);
        }
      } else if (file.isSymbolicLink()) {
        try {
          const fullPath = dir.endsWith("/") ? `${dir}${file.name}` : `${dir}/${file.name}`;
          const targetStat = await getStats(fullPath);
          if (targetStat.isDirectory()) {
            symlinks.d.push(file.name);
            return dirs.push(file.name);
          } else if (targetStat.isFile()) {
            symlinks.f.push(file.name);
            return files.push(file.name);
          }
        } catch (err) {
          return files.push(file.name);
        }
      }
    });
    return { files, dirs, symlinks };
  } catch (err) {
    return { files: [], dirs: [], symlinks: { f: [], d: [] } };
  }
};
var openFinder = async (file, pathType, revealFlag = true, count = 0) => {
  try {
    await execute(`open ${revealFlag ? "-R " : ""}"${file}"`);
  } catch (err) {
    if (count > 6)
      return void 0;
    const exploded = explodePath(file);
    if (pathType === "f") {
      return openFinder(exploded.dir, "d", true, count + 1);
    }
    if (revealFlag) {
      return openFinder(file, pathType, false, count + 1);
    }
    return openFinder(exploded.dir, "d", true, count + 1);
  }
};
var getStats = async (path2) => caches2.getStats.getOrRunAsync(path2, async () => fsP.stat(path2));
var getPathType = async (path2) => {
  try {
    const stat = await getStats(path2);
    const type = stat.isFile() ? "f" : stat.isDirectory() ? "d" : void 0;
    if (couldBeMacOSAlias(stat) && isMacOSAlias(path2)) {
      return "f";
    }
    return type;
  } catch (err) {
    return void 0;
  }
};

// src/tools/ask/fileExplorer/handler.ts
var fileExplorerHandler = async (isMulti = false, isSave = false, question, selectType = "f", startPath = process.cwd(), suggestedFileName = "", validateFn, lc) => {
  const askOptions2 = getAskOptions();
  const minWidth = askOptions2.general.fileExplorerColumnWidth;
  const maxWidth = askOptions2.general.fileExplorerColumnWidth;
  const maxItems = askOptions2.general.fileExplorerMaxItems;
  const maxColumns = Math.floor(out.utils.getTerminalWidth() / (maxWidth + 1));
  const accepted = isSave ? ["d", "f"] : [selectType];
  const tempLC = getLineCounter2();
  const deferred = getDeferred3();
  let cursor = startPath.split("/");
  const multiSelected = /* @__PURE__ */ new Set();
  let paths = [];
  let currentPath = "";
  let cursorType = "d";
  let isError = true;
  let errorMsg = void 0;
  const cursorIndexes = {};
  const scrollLastStartingIndex = {};
  let pressed = void 0;
  let submitted = false;
  let loading = false;
  let locked = false;
  const originalLC = askOptions2.general.lc;
  askOptions2.general.lc = getLineCounter2();
  const operation = {
    recalc: () => {
      var _a;
      if (submitted)
        return;
      paths = cursor.map((f, index, all) => join(...all.slice(0, index + 1)));
      currentPath = paths[paths.length - 1];
      const isDir = ((_a = fsCache.getPathContents(paths[paths.length - 2])) == null ? void 0 : _a.dirs.includes(PathTools.explodePath(currentPath).filename)) || false;
      cursorType = isDir ? "d" : "f";
      const errorInfo = getErrorInfoFromValidationResult(operation.runValidation());
      isError = errorInfo.isError;
      errorMsg = errorInfo.errorMessage;
    },
    loadInitialPathIndexes: () => {
      operation.recalc();
      paths.forEach((path2, index) => {
        const cursorItem = cursor[index + 1];
        if (cursorItem === void 0)
          return;
        const contents = fsCache.getPathContents(path2);
        const cursorIndex = [...contents.dirs, ...contents.files].indexOf(cursorItem);
        cursorIndexes[path2] = cursorIndex;
      });
    },
    updateCursorIndexes: (newIndex) => {
      operation.recalc();
      const currentParentDir = paths[paths.length - 2];
      const lastKnownIndex = cursorIndexes[currentParentDir];
      if (lastKnownIndex !== newIndex)
        cursorIndexes[currentParentDir] = newIndex;
    },
    runValidation: (newFileName) => {
      const currentDir = cursorType === "f" ? paths[paths.length - 2] : currentPath;
      const currentFileName = cursorType === "f" ? cursor[cursor.length - 1] : void 0;
      return validateFn(cursorType, currentPath, currentDir, currentFileName, Array.from(multiSelected), newFileName);
    },
    loadEssentials: async (executeFn = loadPathContents) => {
      await Promise.all([
        PromiseTools2.each(paths, executeFn),
        (async () => {
          const { dirs } = await executeFn(currentPath);
          const list = dirs;
          return PromiseTools2.each(
            list.map((dir) => join(currentPath, dir)),
            executeFn
          );
        })(),
        (async () => {
          const parent = PathTools.explodePath(currentPath).dir;
          const { dirs } = await executeFn(parent);
          const list = [...dirs];
          return PromiseTools2.each(
            list.map((dir) => join(parent, dir)),
            executeFn
          );
        })()
      ]);
    },
    loadNewDepth: async () => {
      loading = true;
      operation.display();
      await operation.loadEssentials(loadPathContents);
      loading = false;
      operation.display();
    },
    loadNewItem: async () => {
      if (!fsCache.getPathContents(currentPath)) {
        loading = true;
        operation.display();
        await loadPathContents(currentPath);
        loading = false;
        operation.display();
      } else {
        operation.display();
      }
    },
    setPressed: async (key) => {
      pressed = key;
      operation.display();
      if (!key)
        return;
      await wait2(milliseconds(100));
      if (!loading) {
        pressed = void 0;
        operation.display();
      }
    },
    display: async () => {
      if (submitted)
        return;
      operation.recalc();
      const theme = getAskOptionsForState(false, isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;
      const selectedIcon = ` ${col.itemSelectedIcon(sym.itemSelectedIcon)} `;
      const unselectedIcon = ` ${col.itemUnselectedIcon(sym.itemUnselectedIcon)} `;
      const formatter = (symbol, regularWrapFn, selectedPrefix = " ", unselectedPrefix = " ") => (width, highlighted, isActiveColumn, columnPath, symlinks) => (name, index, all) => {
        const isHighlighted = name === highlighted;
        const isSymlink = symlinks.includes(name);
        const fullPath = join(columnPath, name);
        const isSelected = isMulti && multiSelected.has(fullPath);
        const prefix = isSelected ? selectedPrefix : unselectedPrefix;
        const symlinkSuffix = isSymlink ? sym.symlinkIcon + " " : "";
        const template = (text2) => `${prefix}${text2} ${symlinkSuffix}${symbol}`;
        const extraChars = out.getWidth(template(""));
        const stretched = template(out.left(out.truncate(name, width - extraChars, "\u2026"), width - extraChars));
        let wrapFn = fn9.noact;
        if (isHighlighted) {
          if (isActiveColumn) {
            wrapFn = col.specialHover;
          } else {
            wrapFn = col.specialInactiveHover;
          }
        } else {
          if (isActiveColumn) {
            wrapFn = isSelected ? col.specialHighlight : regularWrapFn;
          } else {
            wrapFn = isSelected ? col.specialInactiveHighlight : regularWrapFn;
          }
        }
        return wrapFn(colr.clear(stretched));
      };
      const { dir: formatDir, file: formatFile } = {
        single: {
          d: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal),
            file: formatter(sym.fileOpenableIcon, col.specialInactiveFaded)
          },
          f: {
            dir: formatter(sym.folderOpenableIcon, col.specialFaded),
            file: formatter(sym.fileOpenableIcon, col.specialNormal)
          },
          df: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal),
            file: formatter(sym.fileOpenableIcon, col.specialNormal)
          }
        },
        multi: {
          d: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal, selectedIcon, unselectedIcon),
            file: formatter(sym.fileOpenableIcon, col.specialInactiveFaded, "   ", "   ")
          },
          f: {
            dir: formatter(sym.folderOpenableIcon, col.specialFaded, "   ", "   "),
            file: formatter(sym.fileOpenableIcon, col.specialNormal, selectedIcon, unselectedIcon)
          },
          df: {
            dir: formatter(sym.folderOpenableIcon, col.specialNormal, "   ", "   "),
            file: formatter(sym.fileOpenableIcon, col.specialNormal, selectedIcon, unselectedIcon)
          }
        }
      }[isMulti ? "multi" : "single"][accepted.join("")];
      const emptyColumn = [" ".repeat(minWidth), ..." ".repeat(maxItems - 1).split("")];
      const allColumns = paths.map(fsCache.getPathContents).map((contents, index) => {
        const currentParentDir = paths[index];
        const dirs = (contents == null ? void 0 : contents.dirs) || [];
        const files = (contents == null ? void 0 : contents.files) || [];
        const list = [...dirs, ...files];
        const isScrollbar = list.length > maxItems;
        const contentWidth = Math.max(...list.map((s) => s.length));
        const width = Math.max(minWidth, Math.min(contentWidth, maxWidth)) - (isScrollbar ? 1 : 0);
        const highlighted = cursor[index + 1];
        const highlightedIndex = list.indexOf(highlighted);
        const isActiveCol = index + 2 === cursor.length;
        const columnPath = paths[index];
        const formattedLines = [
          ...dirs.map(formatDir(width, highlighted, isActiveCol, columnPath, (contents == null ? void 0 : contents.symlinks.d) ?? [])),
          ...files.map(formatFile(width, highlighted, isActiveCol, columnPath, (contents == null ? void 0 : contents.symlinks.f) ?? []))
        ];
        if (isScrollbar) {
          const currentHoverIndex = cursorIndexes[currentParentDir] ?? (highlightedIndex !== -1 ? highlightedIndex : 0);
          const previousStartIndex = scrollLastStartingIndex[currentParentDir] ?? 0;
          const scrolledItems = getScrolledItems(formattedLines, currentHoverIndex, previousStartIndex, maxItems, theme.general.scrollMargin);
          scrollLastStartingIndex[currentParentDir] = scrolledItems.startingIndex;
          const scrollbar = getScrollbar(formattedLines, scrolledItems, theme);
          return out.utils.joinLines(scrolledItems.items.map((line, index2) => line + scrollbar[index2]));
        }
        return out.utils.joinLines([...formattedLines, ...emptyColumn].slice(0, maxItems));
      });
      if (cursorType === "f") {
        allColumns[allColumns.length - 1] = getFilePanel(currentPath, minWidth, maxItems);
      }
      const columns = [...allColumns.slice(-maxColumns), ...ArrayTools8.repeat(maxColumns, out.utils.joinLines(emptyColumn))].slice(0, maxColumns);
      const termWidth = out.utils.getTerminalWidth();
      const tableLines = table.getLines([columns], void 0, {
        wrapLinesFn: col.decoration,
        drawOuter: true,
        cellPadding: 0,
        truncate: "",
        maxWidth: Infinity
      });
      const tableOut = out.center(out.limitToLengthStart(tableLines.join("\n"), termWidth - 1), termWidth);
      const tableWidth = out.getWidth(tableLines[Math.floor(tableLines.length / 2)]);
      const cursorTypeOut = colr.dim(`(${{ f: txt.file, d: txt.directory }[cursorType]})`);
      const infoLine = (() => {
        const loadingOut = loading ? col.specialFaded(txt.loading) : void 0;
        const count = isMulti ? col.specialFaded(`${col.specialHint("[")} ${txt.selected(multiSelected.size)} ${col.specialHint("]")} `) : "";
        const curr = out.truncateStart(`${cursorTypeOut} ${currentPath}`, tableWidth - (out.getWidth(count) + 3));
        const split = out.split(loadingOut ?? count, curr, tableWidth - 2);
        return out.center(split, termWidth);
      })();
      const resultOut = isMulti ? Array.from(multiSelected) : (() => {
        const pathParts = currentPath.split("/");
        const numParts = maxColumns - 2;
        const lastXParts = pathParts.slice(-numParts);
        const truncatedParts = lastXParts.map((s) => out.truncateStart(s, maxWidth - 2));
        let result = "";
        if (pathParts.length > numParts) {
          result += symbols3.ELLIPSIS + "/";
        }
        result += truncatedParts.join("/");
        return result;
      })();
      const actionBar = getFEActionBar(isMulti, pressed, [], isError);
      let output = ansi2.cursor.hide + tempLC.ansi.moveHome();
      const imitated = getImitateOutput(question, resultOut, false, isError, errorMsg);
      output += imitated;
      output += "\n" + infoLine;
      output += "\n" + tableOut;
      tempLC.overwrite(output);
      tempLC.checkpoint("actionBar");
      let output2 = actionBar;
      output2 += "\n".repeat(out.utils.getNumLines(imitated));
      tempLC.overwrite(output2);
      tempLC.checkpoint("post-display");
    }
  };
  const userActions = {
    moveVertical: (direction) => {
      const folds = cursor.slice(0, -1);
      const current = cursor[cursor.length - 1];
      const currContents = fsCache.getPathContents(paths[folds.length - 1]);
      if (!currContents)
        return;
      const list = [...currContents.dirs, ...currContents.files];
      const currIndex = list.indexOf(current);
      const nextIndex = (list.length + currIndex + direction) % list.length;
      const nextValue = list[nextIndex];
      cursor = [...folds, nextValue];
      operation.updateCursorIndexes(nextIndex);
      operation.loadNewItem();
    },
    moveRight: () => {
      const current = cursor[cursor.length - 1];
      const currContents = fsCache.getPathContents(paths[cursor.length - 2]);
      const nextContents = fsCache.getPathContents(paths[cursor.length - 1]);
      if (!currContents || !nextContents || currContents.dirs.includes(current) === false)
        return;
      const nextList = [...nextContents.dirs, ...nextContents.files];
      if (!nextList.length)
        return;
      const savedIndex = cursorIndexes[paths[cursor.length - 1]] ?? 0;
      cursor = [...cursor, nextList[savedIndex] ?? nextList[0]];
      operation.loadNewDepth();
    },
    moveLeft: () => {
      if (cursor.length <= 2)
        return;
      cursor = cursor.slice(0, -1);
      operation.loadNewDepth();
    },
    refresh: async () => {
      if (loading)
        return;
      loading = true;
      locked = true;
      operation.setPressed("r");
      const allKeys = Array.from(fsCache.cache.keys());
      const restKeys = new Set(allKeys);
      await operation.loadEssentials((path2) => {
        restKeys.delete(path2);
        return forceLoadPathContents(path2);
      });
      operation.display();
      loading = false;
      locked = false;
      if (pressed === "r")
        operation.setPressed(void 0);
      await PromiseTools2.eachLimit(32, Array.from(restKeys), async () => {
        if (submitted)
          return;
        return forceLoadPathContents;
      });
    },
    select: () => {
      if (isMulti && accepted.includes(cursorType)) {
        if (multiSelected.has(currentPath)) {
          multiSelected.delete(currentPath);
        } else {
          multiSelected.add(currentPath);
        }
        operation.setPressed("space");
      }
    },
    takeInput: async (preQuestion, inputFn, postQuestion) => {
      operation.display();
      loading = true;
      kl.stop();
      tempLC.clearToCheckpoint("actionBar");
      await preQuestion();
      const value = await inputFn();
      const skipDisplay = postQuestion ? await postQuestion(value) ?? false : false;
      if (!skipDisplay)
        operation.display();
      kl.start();
      loading = false;
      locked = false;
      return value;
    },
    newFolder: async () => {
      const { colours: col, text: txt } = getAskOptionsForState(false, false);
      const basePath = cursorType === "f" ? paths[paths.length - 2] : currentPath;
      const actualBasePath = await getActualLocationPath(basePath);
      await userActions.takeInput(
        () => {
          tempLC.checkpoint("newFolder");
          const info2 = col.specialFaded(txt.specialNewFolderEnterNothingCancel);
          const info1Prefix = col.specialFaded("  " + txt.specialNewFolderAddingFolderTo);
          const maxValWidth = out.utils.getTerminalWidth() - (out.getWidth(info1Prefix) + out.getWidth(info2));
          const info1Value = col.specialNormal(out.truncateStart(PathTools.trailSlash(actualBasePath), maxValWidth));
          const info1 = info1Prefix + info1Value;
          tempLC.log(out.split(info1, info2, out.utils.getTerminalWidth() - 2));
        },
        () => ask.text(txt.specialNewFolderQuestion(col.specialHighlight), "", void 0, tempLC),
        async (newFolderName) => {
          const newFolderPath = join(actualBasePath, newFolderName);
          if (newFolderName !== "") {
            await mkdir(newFolderPath);
          }
          tempLC.clearToCheckpoint("newFolder");
          operation.display();
          const loadPaths = [basePath, newFolderPath];
          if (basePath !== actualBasePath)
            loadPaths.push(actualBasePath);
          await Promise.all(loadPaths.map((p) => forceLoadPathContents(p)));
          return;
        }
      );
    },
    openFinder: async () => {
      const actualCurrentPath = await getActualLocationPath(currentPath);
      await openFinder(actualCurrentPath, cursorType);
    },
    submit: () => {
      if (isError) {
        if (askOptions2.general.beeps)
          process.stdout.write(ansi2.beep);
        return;
      }
      return isSave ? userActions.submitSave() : userActions.submitSelect();
    },
    submitSave: async () => {
      const { colours: col, text: txt } = getAskOptionsForState(false, false);
      const initCursor = cursorType === "f" ? cursor[cursor.length - 1] : "";
      const initSugg = suggestedFileName;
      const initStart = startPath && await getPathType(startPath) === "f" ? PathTools.explodePath(startPath).filename : "";
      const initial = initCursor || initSugg || initStart || "";
      const basePath = cursorType === "f" ? paths[paths.length - 2] : currentPath;
      const newFileName = await userActions.takeInput(
        () => {
          tempLC.checkpoint("saveName");
          tempLC.log(
            col.specialFaded("  " + txt.specialSaveFileSavingFileTo) + col.specialNormal(out.truncateStart(PathTools.trailSlash(basePath), out.utils.getTerminalWidth() - 20))
          );
        },
        () => ask.text(txt.specialSaveFileQuestion(col.specialHighlight), initial, (text2) => operation.runValidation(text2), tempLC),
        () => {
          tempLC.clearToCheckpoint("saveName");
          return true;
        }
      );
      submitted = true;
      kl.stop();
      tempLC.clear();
      askOptions2.general.lc = originalLC;
      const result = join(basePath, newFileName);
      const actualResult = await getActualLocationPath(result);
      ask.imitate(question, result, true, false, void 0, lc);
      process.stdout.write(ansi2.cursor.show);
      return deferred.resolve([actualResult]);
    },
    submitSelect: async () => {
      if (!accepted.includes(cursorType))
        return;
      submitted = true;
      operation.setPressed("return");
      kl.stop();
      tempLC.clear();
      askOptions2.general.lc = originalLC;
      const resultOut = isMulti ? Array.from(multiSelected) : currentPath;
      const displayResult = isMulti ? Array.from(multiSelected) : [currentPath];
      const actualResult = await PromiseTools2.map(displayResult, (path2) => getActualLocationPath(path2));
      ask.imitate(question, resultOut, true, false, void 0, lc);
      return deferred.resolve(actualResult);
    },
    exit: () => {
      kl.stop();
      tempLC.clear();
      askOptions2.general.lc = originalLC;
      const resultOut = isMulti ? Array.from(multiSelected) : currentPath;
      ask.imitate(question, resultOut, false, true, void 0, lc);
      process.stdout.write(ansi2.cursor.show);
      process.exit();
    }
  };
  const kl = getKeyListener((key) => {
    if (locked)
      return;
    switch (key) {
      case "exit":
      case "esc":
        return userActions.exit();
      case "up":
        return userActions.moveVertical(-1);
      case "down":
        return userActions.moveVertical(1);
      case "left":
        return userActions.moveLeft();
    }
    switch (key) {
      case "right":
        return userActions.moveRight();
      case "r":
        return userActions.refresh();
      case "f":
        return userActions.newFolder();
      case "o":
        return userActions.openFinder();
      case "space":
        return userActions.select();
      case "return":
        return userActions.submit();
    }
  });
  operation.loadNewDepth().then(() => {
    operation.loadInitialPathIndexes();
  });
  return deferred.promise;
};

// src/tools/ask/fileExplorer.ts
var fileExplorer = async (questionText, selectType = "f", startPath = process.cwd(), validate, lc) => {
  const vFn = (cursorType, currentCursor, currentDir, currentFileName, selected, newFileName) => {
    if (!validate)
      return true;
    if (cursorType !== selectType)
      return true;
    const result = validate(currentCursor);
    return result;
  };
  const arr = await fileExplorerHandler(false, false, questionText, selectType, startPath, void 0, vFn, lc);
  return arr[0];
};
var multiFileExplorer = (questionText, selectType = "f", startPath = process.cwd(), validate, lc) => {
  const vFn = (cursorType, currentCursor, currentDir, currentFileName, selected, newFileName) => {
    if (!validate)
      return true;
    const result = validate(selected);
    return result;
  };
  return fileExplorerHandler(true, false, questionText, selectType, startPath, void 0, vFn, lc);
};
var saveFileExplorer = async (questionText, startPath = process.cwd(), suggestedFileName = "", validate) => {
  const vFn = (cursorType, currentCursor, currentDir, currentFileName, selected, newFileName) => {
    if (!validate)
      return true;
    const result = validate(currentDir, newFileName ?? currentFileName);
    return result;
  };
  const arr = await fileExplorerHandler(false, true, questionText, "f", startPath, suggestedFileName, vFn);
  return arr[0];
};

// src/tools/ask/section.ts
import { ArrayTools as ArrayTools9 } from "swiss-ak";
var section = async (question, sectionHeader, ...questionFns) => {
  const theme = getAskOptionsForState(false, false);
  const originalLC = theme.general.lc;
  const tempLC = getLineCounter();
  theme.general.lc = tempLC;
  if (sectionHeader) {
    separator("down");
    await sectionHeader(tempLC);
    separator("up");
  }
  const results = [];
  if (questionFns.length) {
    for (let questionFn of questionFns) {
      const checkpoint = tempLC.checkpoint();
      results.push(await questionFn(question, results, tempLC));
      tempLC.clearToCheckpoint(checkpoint);
    }
  }
  tempLC.clear();
  theme.general.lc = originalLC;
  if (question) {
    let resultOut = theme.text.done;
    if (results.length === 1) {
      resultOut = results[0];
    }
    if (results.length > 1) {
      if (typeof results[0] === "boolean") {
        resultOut = results[0];
      }
      resultOut = results;
    }
    ask.imitate(question, resultOut, true);
  }
  return results;
};
var separator = (version = "down", spacing = 8, offset = 0, width = out.utils.getTerminalWidth() - 2, lc) => {
  const theme = getAskOptionsForState(false, false);
  const lineChar = theme.symbols.separatorLine;
  const chars = {
    down: theme.symbols.separatorNodeDown,
    none: theme.symbols.separatorNodeNone,
    up: theme.symbols.separatorNodeUp
  };
  const line = ArrayTools9.repeat(Math.floor(width / spacing) - offset, chars[version]).join(lineChar.repeat(spacing - 1));
  const output = out.center(line, void 0, lineChar);
  console.log(theme.colours.decoration(output));
  const numLines = out.utils.getNumLines(output);
  if (theme.general.lc)
    theme.general.lc.add(numLines);
  if (lc && lc !== theme.general.lc)
    lc.add(numLines);
};

// src/tools/ask/table.ts
import { fn as fn10, getDeferred as getDeferred4, MathsTools as MathsTools4 } from "swiss-ak";
var askTableHandler = (isMulti, question, items, initial = [], rows, headers = [], tableOptions = {}, validate, lc) => {
  const deferred = getDeferred4();
  const tempLC = getLineCounter();
  const askOptions2 = getAskOptions();
  const questionText = typeof question === "string" ? question : question.get();
  let activeIndex = initial[0] !== void 0 ? typeof initial[0] === "number" ? initial[0] : items.indexOf(initial[0]) : 0;
  activeIndex = MathsTools4.clamp(activeIndex, 0, items.length - 1);
  let selectedIndexes = initial.map((i) => typeof i === "number" ? i : items.indexOf(i)).filter((i) => i !== -1);
  let fullOptions = void 0;
  let bodyRowHeight = 0;
  let headerHeight = 0;
  let numRows = Infinity;
  let colWidths = [];
  let scrollLastStartingIndex = 0;
  let calcedTermSize = [0, 0];
  let errorInfo = getErrorInfoFromValidationResult(true);
  const operation = {
    calculateSetup: () => {
      var _a, _b;
      calcedTermSize = [process.stdout.columns, process.stdout.rows];
      const askOptions3 = getAskOptions();
      const HOR_CHAR = "_";
      const VER_CHAR = "\u2579";
      fullOptions = table.utils.getFullOptions(operation.getTableOptions(0));
      const overrideOptions = {
        overrideHorChar: HOR_CHAR,
        overrideCornChar: HOR_CHAR,
        overrideVerChar: VER_CHAR,
        drawRowLines: true,
        drawOuter: true,
        align: "left"
      };
      const { tableLines, body, header } = operation.getTable(items, activeIndex, 0, {}, overrideOptions);
      const cleanLines = tableLines.map((line) => colr.clear(line));
      const horiLine = fullOptions.drawRowLines === false ? 0 : 1;
      const indexesOfHoriLines = cleanLines.map((line, index) => line.startsWith(HOR_CHAR.repeat(4)) ? index : void 0).filter((i) => i !== void 0);
      const allRowHeights = indexesOfHoriLines.slice(0, -1).map((num, i) => indexesOfHoriLines[i + 1] - num);
      const allHeaderHeights = allRowHeights.slice(0, header.length);
      const allBodyHeights = allRowHeights.slice(header.length);
      bodyRowHeight = Math.max(...allBodyHeights) - horiLine;
      const imitatedQuestion = getImitateOutput(questionText, "", false, false, void 0);
      const questPromptHeight = out.utils.getNumLines(imitatedQuestion);
      const actionBar = getTableSelectActionBar(isMulti);
      const actionBarHeight = out.utils.getNumLines(actionBar);
      const topMargin = ((_a = fullOptions.margin) == null ? void 0 : _a[0]) ?? 0;
      const bottomMargin = (((_b = fullOptions.margin) == null ? void 0 : _b[2]) ?? topMargin) + 1;
      headerHeight = horiLine;
      if (header.length) {
        const dividerLine = 1;
        headerHeight = MathsTools4.addAll(...allHeaderHeights) - (fullOptions.drawRowLines ? 0 : header.length);
        headerHeight += dividerLine;
      }
      const maxHeight = Math.floor(askOptions3.general.tableSelectMaxHeightPercentage / 100 * calcedTermSize[1]);
      const availableSpace = maxHeight - questPromptHeight - actionBarHeight - topMargin - bottomMargin;
      numRows = Math.floor((availableSpace - headerHeight) / (bodyRowHeight + horiLine));
      numRows = MathsTools4.clamp(numRows, 1, items.length);
      const mostColumns = Math.max(...body.map((row) => row.length));
      const typicalLine = cleanLines.find((line) => line.split("").filter((c) => c === VER_CHAR).length === mostColumns + 1);
      colWidths = typicalLine.split(VER_CHAR).slice(1, -1).map((sect) => out.getWidth(sect)).map((fullWidth) => fullWidth - fullOptions.cellPadding * 2);
    },
    getResultsArray: () => (isMulti ? selectedIndexes.map((i) => items[i]) : [items[activeIndex]]).filter(fn10.isTruthy),
    getDisplayResult: () => isMulti ? operation.getResultsArray() : items[activeIndex],
    runValidation: () => {
      if (!validate)
        return;
      const results = operation.getResultsArray();
      const validateResult = validate(results);
      errorInfo = getErrorInfoFromValidationResult(validateResult);
    },
    getTableOptions: (hoveredIndex, styleOptions = {}, overrideOptions = {}) => {
      const theme = getAskOptionsForState(false, errorInfo.isError);
      return {
        ...styleOptions,
        ...tableOptions,
        ...overrideOptions,
        margin: [0, 0, 0, 0],
        maxWidth: (tableOptions.maxWidth ?? out.utils.getTerminalWidth()) - 2,
        format: [
          { formatFn: theme.colours.tableSelectHover, isBody: true, isHeader: false, row: hoveredIndex },
          ...styleOptions.format || [],
          ...tableOptions.format || [],
          ...overrideOptions.format || []
        ]
      };
    },
    getTable: (showItems, hoveredIndex, startingIndex = 0, styleOptions = {}, overrideOptions = {}) => {
      const theme = getAskOptionsForState(false, errorInfo.isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;
      const options = operation.getTableOptions(hoveredIndex, styleOptions, overrideOptions);
      let initialBody;
      let initialHeader;
      if (rows) {
        initialBody = typeof rows === "function" ? showItems.map(rows) : rows;
        initialHeader = headers;
      } else {
        const isHeaderObj = headers && !(headers instanceof Array);
        const objTable = table.utils.objectsToTable(showItems, isHeaderObj ? headers : void 0);
        initialBody = objTable.body;
        initialHeader = isHeaderObj ? objTable.header : headers;
      }
      const selectedIcon = colr.reset(col.itemSelectedIcon(sym.itemSelectedIcon));
      const unselectedIcon = colr.reset(col.itemUnselectedIcon(sym.itemUnselectedIcon));
      const cursorIcon = colr.reset(col.itemHover(col.itemHoverIcon(sym.itemHoverIcon)));
      const body = initialBody.map((row, index) => {
        let firstCell;
        if (isMulti) {
          firstCell = selectedIndexes.includes(index + startingIndex) ? selectedIcon : unselectedIcon;
        } else {
          firstCell = initialBody.indexOf(row) === hoveredIndex ? cursorIcon : " ";
        }
        firstCell += "\n".repeat(Math.max(0, bodyRowHeight - firstCell.split("\n").length));
        return [firstCell, ...row];
      });
      const header = initialHeader.length ? initialHeader.map((row) => ["", ...row]) : [];
      const tableLines = table.getLines(body, header, options);
      return { tableLines, body, header, options };
    },
    display: () => {
      if (process.stdout.columns !== calcedTermSize[0] || process.stdout.rows !== calcedTermSize[1]) {
        operation.calculateSetup();
      }
      const theme = getAskOptionsForState(false, errorInfo.isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;
      const isScrollbar = numRows < items.length;
      let showItems = items;
      let hoveredIndex = activeIndex;
      let scrolledItems = void 0;
      if (isScrollbar) {
        scrolledItems = getScrolledItems(items, activeIndex, scrollLastStartingIndex, numRows);
        showItems = scrolledItems.items;
        scrollLastStartingIndex = scrolledItems.startingIndex;
        hoveredIndex = scrolledItems.hoveredIndex;
      }
      let { body, tableLines } = operation.getTable(
        showItems,
        hoveredIndex,
        (scrolledItems == null ? void 0 : scrolledItems.startingIndex) ?? 0,
        { wrapLinesFn: col.decoration, wrapBodyLinesFn: col.specialNormal },
        { colWidths, align: "left" }
      );
      if (isScrollbar) {
        const scrollbar = getScrollbar(items, scrolledItems, theme, tableLines.length - headerHeight + 1, true, fullOptions.drawRowLines);
        tableLines = tableLines.map((line, index) => `${line} ${scrollbar[index - headerHeight + 1] ?? " "}`);
      }
      if (tableOptions.align !== void 0 && tableOptions.align !== "left") {
        tableLines = out.align(tableLines.join("\n"), tableOptions.align).split("\n");
      }
      const resultOut = operation.getDisplayResult();
      let output = ansi2.cursor.hide + tempLC.ansi.moveHome();
      output += getImitateOutput(questionText, resultOut, false, errorInfo.isError, errorInfo.errorMessage);
      output += "\n" + tableLines.join("\n");
      output += "\n" + getTableSelectActionBar(isMulti, void 0, void 0, errorInfo.isError);
      tempLC.overwrite(output);
    }
  };
  const userActions = {
    move: (dir) => {
      activeIndex = (items.length + activeIndex + dir) % items.length;
      operation.runValidation();
      operation.display();
    },
    toggle: () => {
      if (isMulti) {
        if (selectedIndexes.includes(activeIndex)) {
          selectedIndexes = selectedIndexes.filter((i) => i !== activeIndex);
        } else {
          selectedIndexes.push(activeIndex);
        }
      }
      operation.runValidation();
      operation.display();
    },
    toggleAll: () => {
      if (isMulti) {
        const allSelected = items.every((v, i) => selectedIndexes.includes(i));
        selectedIndexes = allSelected ? [] : items.map((v, i) => i);
        operation.runValidation();
        operation.display();
      }
    },
    exit: () => {
      kl.stop();
      tempLC.clear();
      imitate(questionText, "", false, true, void 0, lc);
      process.stdout.write(ansi2.cursor.show);
      process.exit();
    },
    submit: () => {
      operation.runValidation();
      if (errorInfo.isError) {
        if (askOptions2.general.beeps)
          process.stdout.write(ansi2.beep);
        return;
      }
      kl.stop();
      const results = operation.getResultsArray();
      tempLC.clear();
      imitate(questionText, isMulti ? results : results[0], true, false, void 0, lc);
      process.stdout.write(ansi2.cursor.show);
      deferred.resolve(results);
    }
  };
  const listenCallback = (key) => {
    switch (key.toLowerCase()) {
      case "exit":
      case "esc":
        return userActions.exit();
      case "up":
        return userActions.move(-1);
      case "down":
        return userActions.move(1);
      case "left":
      case "right":
      case "space":
        return userActions.toggle();
      case "a":
        return userActions.toggleAll();
      case "return":
        return userActions.submit();
    }
  };
  const kl = getKeyListener(listenCallback, true);
  operation.calculateSetup();
  operation.runValidation();
  operation.display();
  return deferred.promise;
};
var keyActionDict2 = {
  move: {
    keys: "\u2191 \u2193",
    label: "Move Cursor"
  },
  select: {
    keys: "space \u2190 \u2192",
    label: "Toggle"
  },
  selectAll: {
    keys: "a",
    label: "Toggle all"
  },
  return: {
    keys: "\u2B90 ",
    label: "Submit"
  }
};
var getTableSelectActionBar = (multi, pressed, disabled = [], isError = false) => {
  const theme = getAskOptionsForState(false, isError);
  const keyList = {
    single: ["move", "return"],
    multi: ["move", "select", "selectAll", "return"]
  }[multi ? "multi" : "single"];
  return theme.colours.specialInfo(getActionBar(keyList, keyActionDict2, pressed, disabled));
};
var select2 = async (question, items, settings = {}, initial, validate, lc) => {
  const validateMulti = validate ? (items2) => validate(items2[0]) : void 0;
  const results = await askTableHandler(
    false,
    question,
    items,
    [initial],
    settings.rows,
    settings.headers,
    settings.options,
    validateMulti,
    lc
  );
  return results[0];
};
var multiselect2 = (question, items, settings = {}, initial, validate, lc) => askTableHandler(true, question, items, initial, settings.rows, settings.headers, settings.options, validate, lc);

// src/tools/ask/trim.ts
import { getDeferred as getDeferred5, hours, MathsTools as MathsTools5, ObjectTools as ObjectTools3, seconds as seconds3, symbols as symbols4 } from "swiss-ak";
var toTimeCode = (frame, frameRate = 60, includeHours = false, includeMinutes = true) => {
  const frLength = out.getWidth(Math.round(frameRate) + "");
  const toSecs = seconds3(Math.floor(frame / frameRate));
  const remaining = Math.round(frame % frameRate);
  let cut = includeHours ? 11 : 14;
  if (!includeMinutes)
    cut = 17;
  const time2 = new Date(toSecs).toISOString().slice(cut, 19);
  return `${time2}.${(remaining + "").padStart(frLength, "0")}`;
};
var getNextHandle = (tool) => {
  const all = ["start", "end"];
  return all[(all.indexOf(tool) + 1) % all.length];
};
var getTrimActionBar = () => {
  const { general: gen } = getAskOptions();
  const actionBarConfig = {
    move: {
      keys: "\u2190 \u2192",
      label: `Move ${gen.timelineSpeed} frame${gen.timelineSpeed > 1 ? "s" : ""}`
    },
    moveFast: {
      keys: "\u2191 \u2193",
      label: `Move ${gen.timelineFastSpeed} frame${gen.timelineFastSpeed > 1 ? "s" : ""}`
    },
    switch: {
      keys: "tab",
      label: "Switch Handle"
    },
    return: {
      keys: "\u2B90 ",
      label: "Submit"
    }
  };
  return getActionBar(["move", "moveFast", "switch", "return"], actionBarConfig);
};
var trim = async (question, totalFrames, frameRate = 60, initial, validate, lc) => {
  const deferred = getDeferred5();
  const askOptions2 = getAskOptions();
  const tempLC = getLineCounter();
  const totalLength = seconds3(Math.floor(totalFrames / frameRate));
  const showHours = totalLength > hours(1);
  let errorInfo = getErrorInfoFromValidationResult(true);
  let activeHandle = "start";
  const handles = {
    start: (initial == null ? void 0 : initial.start) !== void 0 ? MathsTools5.clamp(initial.start, 0, totalFrames - 1) : 0,
    end: (initial == null ? void 0 : initial.end) !== void 0 ? MathsTools5.clamp(initial.end, 0, totalFrames - 1) : totalFrames - 1
  };
  let cacheTermSize = [0, 0];
  let cacheActionBar = "";
  const operation = {
    calc: () => {
      const termSize = [process.stdout.columns, process.stdout.rows];
      if (termSize[0] != cacheTermSize[0] || termSize[1] != cacheTermSize[1]) {
        cacheTermSize = termSize;
        cacheActionBar = getTrimActionBar();
      }
    },
    validate: () => {
      if (!validate)
        return;
      const result = operation.getResult();
      const validationResult = validate(result);
      errorInfo = getErrorInfoFromValidationResult(validationResult);
    },
    getResult: () => ({ start: handles.start, end: handles.end }),
    getResultOutput: (isComplete = false) => {
      const { colours: col } = getAskOptionsForState(false, errorInfo.isError);
      const result = operation.getResult();
      const startOut = col.resultNumber(result.start + colr.dim(` (${toTimeCode(result.start, frameRate, showHours)})`));
      const endOut = col.resultNumber(result.end + colr.dim(` (${toTimeCode(result.end, frameRate, showHours)})`));
      return `${startOut} ${col.decoration(symbols4.ARROW_RGT)} ${endOut}`;
    },
    display: () => {
      operation.calc();
      const width = out.utils.getTerminalWidth();
      const theme = getAskOptionsForState(false, errorInfo.isError);
      const { colours: col, symbols: sym, general: gen, text: txt } = theme;
      const totalSpace = width - 2;
      const handlePositions = ObjectTools3.mapValues(
        handles,
        (_k, value) => Math.floor(value / (totalFrames - 1) * totalSpace)
      );
      const befSpace = Math.max(0, handlePositions.start);
      const barSpace = Math.max(0, handlePositions.end - handlePositions.start);
      const aftSpace = Math.max(0, totalSpace - handlePositions.end);
      const actvHand = col.timelineHandleActive(sym.timelineHandle);
      const inactvHand = col.timelineHandle(sym.timelineHandle);
      const handStart = activeHandle == "start" ? actvHand : inactvHand;
      const handEnd = activeHandle == "end" ? actvHand : inactvHand;
      const getHandleLabels = () => {
        const handleLabelsRaw = ObjectTools3.mapValues(handles, (_k, value) => [
          ` ${toTimeCode(value, frameRate, showHours)} `,
          ""
        ]);
        const handleLabelWidths = ObjectTools3.mapValues(
          handleLabelsRaw,
          (_k, value) => Math.max(...value.map((s) => out.getWidth(s)))
        );
        const handleAligns = {
          start: handleLabelWidths.start > befSpace ? "left" : "right",
          end: handleLabelWidths.end > aftSpace ? "right" : "left"
        };
        const handleLabels = ObjectTools3.mapValues(
          handleLabelsRaw,
          (key, value) => value.map((l) => out.align(l, handleAligns[key], handleLabelWidths[key], " ", true))
        );
        const strtBef = handleAligns.start === "right";
        const endBef = handleAligns.end === "right";
        const potentialMaxLabelSpace = handlePositions.end - handlePositions.start;
        if (!strtBef && potentialMaxLabelSpace < handleLabelWidths.start) {
          handleLabels.start = handleLabels.start.map((s) => s.slice(0, Math.max(0, potentialMaxLabelSpace - 1)));
          handleLabelWidths.start = Math.max(...handleLabels.start.map((s) => out.getWidth(s)));
        }
        if (endBef && potentialMaxLabelSpace < handleLabelWidths.end) {
          handleLabels.end = handleLabels.end.map((s) => s.slice(s.length - Math.max(0, potentialMaxLabelSpace - 1)));
          handleLabelWidths.end = Math.max(...handleLabels.end.map((s) => out.getWidth(s)));
        }
        const befLabelSpace = Math.max(0, befSpace - (strtBef ? handleLabelWidths.start : 0));
        const barLabelSpace = Math.max(0, barSpace - (!strtBef ? handleLabelWidths.start : 0) - (endBef ? handleLabelWidths.end : 0));
        const aftLabelSpace = Math.max(0, aftSpace - (!endBef ? handleLabelWidths.end : 0));
        const bef = " ".repeat(befLabelSpace);
        const bar = " ".repeat(barLabelSpace);
        const aft = " ".repeat(aftLabelSpace);
        const handle1 = `${bef}${strtBef ? handleLabels.start[0] : ""}${handStart}${!strtBef ? handleLabels.start[0] : ""}${bar}${endBef ? handleLabels.end[0] : ""}${handEnd}${!endBef ? handleLabels.end[0] : ""}${aft}`;
        const handle2 = `${bef}${strtBef ? handleLabels.start[1] : ""}${handStart}${!strtBef ? handleLabels.start[1] : ""}${bar}${endBef ? handleLabels.end[1] : ""}${handEnd}${!endBef ? handleLabels.end[1] : ""}${aft}`;
        return handle1 + "\n" + handle2;
      };
      const getBar = () => {
        const actvHand2 = col.timelineHandleActive(sym.timelineBar);
        const inactvHand2 = col.timelineHandle(sym.timelineBar);
        const handStart2 = activeHandle == "start" ? actvHand2 : inactvHand2;
        const handEnd2 = activeHandle == "end" ? actvHand2 : inactvHand2;
        const bef = col.timelineTrack(sym.timelineTrack.repeat(befSpace));
        const bar = col.timelineTrackActive(sym.timelineBar.repeat(barSpace));
        const aft = col.timelineTrack(sym.timelineTrack.repeat(aftSpace));
        return `${bef}${handStart2}${bar}${handEnd2}${aft}`;
      };
      const getBottomLabels = () => {
        const startVideoLabel = `[${toTimeCode(0, frameRate, showHours)}]`;
        const endVideoLabel = `[${toTimeCode(totalFrames - 1, frameRate, showHours)}]`;
        const trimmedVideoLabel = toTimeCode(handles.end - handles.start, frameRate, showHours);
        const availSpace = width - (out.getWidth(startVideoLabel) + out.getWidth(endVideoLabel) + out.getWidth(trimmedVideoLabel));
        const centerPosition = handlePositions.start + Math.floor((handlePositions.end - handlePositions.start) / 2);
        const centerInSpace = centerPosition - out.getWidth(startVideoLabel) - Math.floor(out.getWidth(trimmedVideoLabel) / 2) + 1;
        const bef = " ".repeat(Math.max(0, Math.min(availSpace, centerInSpace)));
        const aft = " ".repeat(Math.max(0, Math.min(availSpace, availSpace - centerInSpace)));
        return `${startVideoLabel}${bef}${trimmedVideoLabel}${aft}${endVideoLabel}`;
      };
      const getInstructions = () => col.specialInfo(cacheActionBar);
      let output = ansi2.cursor.hide + tempLC.ansi.moveHome();
      output += getImitateOutput(question, operation.getResultOutput(false), false, errorInfo.isError, errorInfo.errorMessage);
      output += "\n";
      output += "\n" + getHandleLabels();
      output += "\n" + getBar();
      output += "\n" + getBottomLabels();
      output += "\n";
      output += "\n" + getInstructions();
      tempLC.overwrite(output);
    }
  };
  const userActions = {
    swapHandle: () => activeHandle = getNextHandle(activeHandle),
    adjustHandle: (amount) => {
      handles[activeHandle] += amount;
      if (handles[activeHandle] < 0)
        handles[activeHandle] = 0;
      if (handles[activeHandle] > totalFrames - 1)
        handles[activeHandle] = totalFrames - 1;
      if (handles.end <= handles.start) {
        const oldStart = handles.start;
        const oldEnd = handles.end;
        handles.end = oldStart;
        handles.start = oldEnd;
        userActions.swapHandle();
      }
      operation.validate();
    },
    exit: () => {
      kl.stop();
      tempLC.clear();
      process.stdout.write(ansi2.cursor.show);
      imitate(question, operation.getResultOutput(true), false, true, void 0, lc);
      process.exit();
    },
    submit: () => {
      operation.validate();
      if (errorInfo.isError) {
        if (askOptions2.general.beeps)
          process.stdout.write(ansi2.beep);
        return;
      }
      kl.stop();
      tempLC.clear();
      process.stdout.write(ansi2.cursor.show);
      const fixedHandles = operation.getResult();
      imitate(question, operation.getResultOutput(true), true, false, void 0, lc);
      deferred.resolve(fixedHandles);
    }
  };
  const kl = getKeyListener((keyName) => {
    switch (keyName) {
      case "exit":
      case "esc":
        return userActions.exit();
      case "return":
        return userActions.submit();
      case "tab":
        userActions.swapHandle();
        break;
      case "left":
        userActions.adjustHandle(-askOptions2.general.timelineSpeed);
        break;
      case "right":
        userActions.adjustHandle(askOptions2.general.timelineSpeed);
        break;
      case "up":
        userActions.adjustHandle(askOptions2.general.timelineFastSpeed);
        break;
      case "down":
        userActions.adjustHandle(-askOptions2.general.timelineFastSpeed);
        break;
    }
    operation.display();
  }, true);
  operation.validate();
  operation.display();
  return deferred.promise;
};

// src/tools/ask.ts
var ask;
((ask2) => {
  ask2.text = text;
  ask2.autotext = autotext;
  ask2.number = number;
  ask2.boolean = boolean;
  ask2.booleanYN = booleanYN;
  ask2.select = select;
  ask2.multiselect = multiselect;
  ask2.date = date;
  ask2.time = time;
  ask2.datetime = datetime;
  ask2.dateRange = dateRange;
  ask2.fileExplorer = fileExplorer;
  ask2.multiFileExplorer = multiFileExplorer;
  ask2.saveFileExplorer = saveFileExplorer;
  let table2;
  ((table3) => {
    table3.select = select2;
    table3.multiselect = multiselect2;
  })(table2 = ask2.table || (ask2.table = {}));
  ask2.trim = trim;
  ask2.customise = customise;
  ask2.loading = (question, isComplete = false, isError = false, lc) => {
    const theme = getAskOptionsForState(isComplete, isError);
    const imitated = getImitateOutput(question, `\u25D0`, isComplete, isError);
    const numLines = imitated.split("\n").length;
    const loader = out.loading(
      (s) => {
        process.stdout.write(ansi2.cursor.hide);
        return imitated.replace("\u25D0", theme.colours.loadingIcon(s));
      },
      numLines,
      ["\u25D0", "\u25D3", "\u25D1", "\u25D2"]
    );
    process.stdout.write(ansi2.cursor.show);
    return loader;
  };
  ask2.countdown = (totalSeconds, template, isComplete, isError) => {
    const deferred = getDeferred6();
    const theme = getAskOptionsForState(isComplete, isError);
    const tempLC = getLineCounter2();
    let finished = false;
    const textTemplate = template || theme.text.countdown;
    let lines = textTemplate(totalSeconds).split("\n").length;
    const operation = {
      runLoop: async (secsRemaining) => {
        if (finished || secsRemaining <= 0) {
          return operation.finish();
        }
        const textValue = textTemplate(secsRemaining);
        lines = textValue.split("\n").length;
        const output = theme.colours.countdown(textValue);
        tempLC.overwrite(tempLC.ansi.moveHome() + ansi2.cursor.hide + output);
        await wait3(seconds4(1));
        operation.runLoop(secsRemaining - 1);
      },
      finish: () => {
        if (finished)
          return;
        finished = true;
        kl.stop();
        tempLC.clear();
        process.stdout.write(ansi2.cursor.show);
        deferred.resolve();
      }
    };
    const kl = getKeyListener((key) => {
      switch (key) {
        case "esc":
          return operation.finish();
      }
    });
    operation.runLoop(totalSeconds);
    return deferred.promise;
  };
  ask2.pause = async (text3 = "Press enter to continue...") => {
    const theme = getAskOptionsForState(false, false);
    return new Promise((resolve) => {
      const message = typeof text3 === "object" && text3.get ? text3.get() : text3 + "";
      console.log(ansi2.cursor.hide + theme.colours.pause(message));
      const clear2 = () => {
        process.stdout.write(ansi2.erase.lines(message.split("\n").length) + ansi2.cursor.show);
      };
      const finish = () => {
        kl.stop();
        clear2();
        resolve();
      };
      const exit = () => {
        kl.stop();
        clear2();
        process.stdout.write(ansi2.cursor.show);
        process.exit();
      };
      const kl = getKeyListener((key) => {
        switch (key) {
          case "esc":
            return exit();
          case "return":
            return finish();
        }
      });
    });
  };
  ask2.imitate = imitate;
  ask2.prefill = async (question, value, askFn, lc) => {
    if (value !== void 0) {
      ask2.imitate(question, value, true, false, void 0, lc);
      return value;
    }
    return askFn(question, lc);
  };
  ask2.wizard = (startObj = {}) => {
    let obj = { ...startObj };
    const history = [];
    history.push(obj);
    return {
      async add(propName, value) {
        const resolvedValue = await value;
        this.addPartial({ [propName]: resolvedValue });
        return resolvedValue;
      },
      addPartial(partial) {
        obj = {
          ...obj,
          ...partial
        };
        history.push(obj);
      },
      getPartial() {
        return obj;
      },
      get() {
        return obj;
      }
    };
  };
  ask2.menu = async (question, items, initial, validate, lc) => {
    var _a;
    const tempLC = getLineCounter2();
    const options = getAskOptions();
    const originalFormatItems = options.formatters.formatItems;
    options.formatters.formatItems = [itemsFormatters.simpleAlt, itemsFormatters.blockAlt].includes(originalFormatItems) ? itemsFormatters.simpleAlt : itemsFormatters.simple;
    let initialIndex = 0;
    if (initial !== void 0) {
      const found = items.findIndex((item) => item.value === initial || item === initial);
      if (found !== -1) {
        initialIndex = found;
      } else if (typeof initial === "number") {
        initialIndex = initial;
      }
    }
    const hasIcons = items.some((item) => item.icon !== void 0);
    const submenuIDs = [];
    const choices = items.map((item, index) => {
      const title = item.title || item.value + "";
      let icon = "";
      if (hasIcons) {
        icon = ` ${item.icon || ""} `;
        if (item.colour) {
          const wrapFn = typeof item.colour === "function" ? item.colour : item.colour.bg;
          icon = colr.black(wrapFn(icon));
        }
        icon += " ";
      }
      let value = item.value;
      if (item.submenu) {
        const uniqueId = StringTools5.randomId("submenu-");
        submenuIDs.push(uniqueId);
        value = uniqueId;
      }
      return {
        title: `${icon}${title}`,
        value,
        submenu: item.submenu
      };
    });
    const result = await select(question, choices, initialIndex, validate, tempLC);
    options.formatters.formatItems = originalFormatItems;
    if (submenuIDs.includes(result)) {
      const submenu = (_a = choices.find((choice) => choice.value === result)) == null ? void 0 : _a.submenu;
      if (submenu) {
        tempLC.clear();
        return ask2.menu(submenu.question || question, submenu.items, submenu.initial ?? initial, validate, lc);
      }
    }
    lc == null ? void 0 : lc.add(tempLC.get());
    return result;
  };
  ask2.section = section;
  ask2.separator = separator;
  let utils;
  ((utils2) => {
    utils2.itemsToPromptObjects = (items, titles = [], titleFn) => {
      return items.map((item, index, arr) => ({ title: titleFn && titleFn(item, index, arr) || titles[index] || item + "", value: item }));
    };
  })(utils = ask2.utils || (ask2.utils = {}));
})(ask || (ask = {}));

// src/tools/log.ts
import util from "util";
import { ObjectTools as ObjectTools4 } from "swiss-ak";
var defaultOptions = {
  showDate: false,
  showTime: true,
  enableColours: true
};
var defaultConfigs = {
  blank: {
    name: "",
    nameColour: colr,
    showDate: false,
    showTime: false
  },
  log: {
    name: "LOG",
    nameColour: colr.darkBg.whiteBg.black
  },
  out: {
    name: "OUT",
    nameColour: colr.darkBg.whiteBg.black
  },
  normal: {
    name: "LOG",
    nameColour: colr.darkBg.whiteBg.black
  },
  verbose: {
    name: "LOG",
    nameColour: colr.darkBg.whiteBg.black
  },
  debug: {
    name: "DBUG",
    nameColour: colr.darkBg.magentaBg.white
  },
  info: {
    name: "INFO",
    nameColour: colr.darkBg.blueBg.white
  },
  warn: {
    name: "WARN",
    nameColour: colr.yellowBg.black
  },
  error: {
    name: "ERRR",
    nameColour: colr.darkBg.redBg.white
  }
};
var getStr = (enableColours) => (item) => {
  const inspect2 = ["object", "boolean", "number"];
  if (inspect2.includes(typeof item) && !(item instanceof Date)) {
    return util.inspect(item, { colors: enableColours, depth: null });
  } else {
    return item + "";
  }
};
var getDatePrefix = (now, addDate, addTime, showDate, showTime) => {
  if (!addDate && !addTime)
    return "";
  let date2 = addDate ? now.toISOString().substring(0, 10) : "";
  let time2 = addTime ? now.toISOString().substring(11, 23) : "";
  const dateStr = `[${[showDate ? date2 : " ".repeat(date2.length), showTime ? time2 : " ".repeat(time2.length)].filter((s) => s).join(" ")}] `;
  if (!showDate && !showTime || !showDate && !addTime || !addDate && !showTime)
    return " ".repeat(dateStr.length);
  return dateStr;
};
var formatLog = (args, config, completeOptions, longestName = 1) => {
  const now = new Date();
  const { showDate: addDate, showTime: addTime, enableColours } = completeOptions;
  const { name, nameColour, contentColour, showDate, showTime } = config;
  const dateWrapper = enableColours ? colr.dim : (str) => str;
  const nameWrapper = !enableColours ? (str) => `|${str}|` : nameColour ? nameColour : (str) => str;
  const contentWrapper = enableColours && contentColour ? contentColour : (str) => str;
  const dateStr = getDatePrefix(now, addDate, addTime, showDate !== false, showTime !== false);
  const nameStr = ` ${out.center(`${name}`, longestName)} `;
  const prefixRaw = `${dateStr}${nameStr} `;
  const prefix = `${dateWrapper(dateStr)}${nameWrapper(nameStr)} `;
  return args.map(getStr(enableColours)).join(" ").split("\n").map((line, index) => (index ? " ".repeat(prefixRaw.length) : prefix) + contentWrapper(line)).join("\n");
};
var createLogger = (extraConfigs = {}, options = {}) => {
  const completeOptions = { ...defaultOptions, ...options };
  const allConfigs = { ...defaultConfigs, ...extraConfigs };
  const longestName = Math.max(0, ...Object.values(allConfigs).map((p) => p.name.length));
  return ObjectTools4.mapValues(allConfigs, (key, config) => {
    const func = (...args) => {
      const log2 = formatLog(args, config, completeOptions, longestName);
      console.log(log2);
    };
    return func;
  });
};
var log = createLogger({});

// src/tools/progressBar.ts
import { ArrayTools as ArrayTools10, fn as fn11, ObjectTools as ObjectTools5, QueueManager, safe as safe5, wait as wait4 } from "swiss-ak";

// src/utils/optionUtils.ts
var option = (value, deflt, safeFn) => value !== void 0 ? safeFn(value, deflt) : deflt;
var optionalOption = (value, deflt, safeFn) => value !== void 0 ? safeFn(value, deflt) : void 0;

// src/tools/progressBar.ts
var progressBar;
((progressBar2) => {
  const getCharWidth = (num, max, width) => Math.round(width * (Math.max(0, Math.min(num / max, 1)) / 1));
  const getBarString = (current, max, width, opts) => {
    const { progChar, emptyChar, startChar, endChar, showCurrent, currentChar } = opts;
    const numProgChars = getCharWidth(current, max, width);
    const numNextChars = getCharWidth(current + 1, max, width);
    const numCurrentChars = showCurrent ? numNextChars - numProgChars : 0;
    const numEmptyChars = width - numProgChars - numCurrentChars;
    const prog = opts.barProgWrapFn(progChar.repeat(numProgChars));
    const curr = opts.barCurrentWrapFn(currentChar.repeat(numCurrentChars));
    const empt = opts.barEmptyWrapFn(emptyChar.repeat(numEmptyChars));
    const body = opts.barWrapFn(`${prog}${curr}${empt}`);
    return `${startChar}${body}${endChar}`;
  };
  const getSuffix = (current, maxNum, isMaxKnown, opts) => {
    let plainItems = [];
    let wrappedItems = [];
    if (opts.showCount) {
      const pad = Math.max(maxNum.toString().length, opts.countWidth);
      const countSuff = `[${current.toString().padStart(pad, " ")} / ${(isMaxKnown ? maxNum.toString() : "?").padStart(pad, " ")}]`;
      plainItems.push(countSuff);
      wrappedItems.push(opts.countWrapFn(countSuff));
    }
    if (opts.showPercent) {
      const percent = Math.round(current / Math.max(1, maxNum) * 100);
      const percentSuff = `(${percent.toString().padStart("100".toString().length, " ")}%)`;
      plainItems.push(percentSuff);
      wrappedItems.push(opts.percentWrapFn(percentSuff));
    }
    const plain = plainItems.filter((x) => x).join(" ");
    const wrapped = wrappedItems.filter((x) => x).join(" ");
    return [plain.length ? " " + plain : "", wrapped.length ? " " + wrapped : ""];
  };
  progressBar2.getProgressBar = (max, options = {}) => {
    const args = {
      max: safe5.num(max, true, -1, void 0, -1),
      options: safe5.obj(options, false, {})
    };
    const originalOpts = progressBar2.getFullOptions(args.options);
    let opts = originalOpts;
    let managerPackage = void 0;
    let current = 0;
    let finished = false;
    const isMaxKnown = args.max !== -1;
    const getBar = (applyWrap = false) => {
      const [suffix, suffixWrapped] = getSuffix(current, args.max, isMaxKnown, opts);
      const idealMinBarWidth = Math.min(5, opts.maxWidth - [suffix, opts.startChar, opts.endChar].join("").length);
      const maxPrefixWidth = opts.maxPrefixWidth !== Infinity ? opts.maxPrefixWidth : opts.maxWidth - ([suffix, opts.startChar, opts.endChar].join("").length + idealMinBarWidth);
      const fullPrefix = opts.prefix.padEnd(opts.prefixWidth).substring(0, maxPrefixWidth);
      const barString = getBarString(
        current,
        Math.max(1, args.max),
        Math.max(0, opts.maxWidth - [fullPrefix, suffix, opts.startChar, opts.endChar].join("").length),
        opts
      );
      const output = `${opts.prefixWrapFn(fullPrefix)}${barString}${suffixWrapped}`;
      if (applyWrap)
        return opts.wrapperFn(output);
      return output;
    };
    const update = () => {
      const output = getBar(true);
      if (managerPackage) {
        managerPackage.onUpdate(output);
      } else {
        if (opts.print)
          opts.printFn(output);
      }
      return output;
    };
    const next = () => {
      if (finished)
        return "";
      current++;
      if (managerPackage) {
        managerPackage.onNext(current);
      }
      return update();
    };
    const set = (newCurrent) => {
      const args2 = {
        newCurrent: safe5.num(newCurrent, true, 0, void 0)
      };
      if (finished)
        return "";
      current = args2.newCurrent;
      if (managerPackage) {
        managerPackage.onSet(args2.newCurrent);
      }
      return update();
    };
    const reset = () => {
      return set(0);
    };
    const start = () => {
      if (finished)
        return "";
      if (managerPackage) {
        managerPackage.onStart();
      } else {
        if (opts.print)
          opts.printFn();
      }
      return update();
    };
    const finish = () => {
      finished = true;
      const output = update();
      if (managerPackage) {
        managerPackage.onFinish();
      } else {
        if (opts.print)
          opts.printFn();
      }
      return output;
    };
    const _registerManager = (pack, overrideOptions) => {
      managerPackage = pack;
      if (Object.keys(overrideOptions).length) {
        opts = progressBar2.getFullOptions({
          ...originalOpts,
          ...overrideOptions
        });
      }
      return opts;
    };
    const _unregisterManager = (pack) => {
      managerPackage = void 0;
      opts = originalOpts;
    };
    return {
      next,
      set,
      reset,
      getBar,
      update,
      start,
      finish,
      max: args.max === -1 ? void 0 : args.max,
      _registerManager,
      _unregisterManager
    };
  };
  progressBar2.getFullOptions = (opts = {}) => {
    var _a;
    return {
      prefix: option(opts.prefix, "", (v, dflt) => safe5.str(v, true, dflt)),
      prefixWidth: option(opts.prefixWidth, 0, (v, dflt) => safe5.num(v, true, 0, void 0, dflt)),
      maxPrefixWidth: option(opts.maxPrefixWidth, Infinity, (v, dflt) => safe5.num(v, true, 0, void 0, dflt)),
      maxWidth: option(
        opts.maxWidth,
        ((_a = process == null ? void 0 : process.stdout) == null ? void 0 : _a.columns) !== void 0 ? process.stdout.columns : 100,
        (v, dflt) => safe5.num(v, true, 0, void 0, dflt)
      ),
      wrapperFn: option(opts.wrapperFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      barWrapFn: option(opts.barWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      barProgWrapFn: option(opts.barProgWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      barCurrentWrapFn: option(opts.barCurrentWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      barEmptyWrapFn: option(opts.barEmptyWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      prefixWrapFn: option(opts.prefixWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      countWrapFn: option(opts.countWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      percentWrapFn: option(opts.percentWrapFn, fn11.noact, (v, dflt) => safe5.func(v, dflt)),
      showCount: option(opts.showCount, true, (v, dflt) => safe5.bool(v, dflt)),
      showPercent: option(opts.showPercent, false, (v, dflt) => safe5.bool(v, dflt)),
      countWidth: option(opts.countWidth, 0, (v, dflt) => safe5.num(v, true, 0, void 0, dflt)),
      progChar: option(opts.progChar, "\u2588", (v, dflt) => safe5.str(v, false, dflt)),
      emptyChar: option(opts.emptyChar, " ", (v, dflt) => safe5.str(v, false, dflt)),
      startChar: option(opts.startChar, "\u2595", (v, dflt) => safe5.str(v, false, dflt)),
      endChar: option(opts.endChar, "\u258F", (v, dflt) => safe5.str(v, false, dflt)),
      showCurrent: option(opts.showCurrent, false, (v, dflt) => safe5.bool(v, dflt)),
      currentChar: option(opts.currentChar, "\u259E", (v, dflt) => safe5.str(v, false, dflt)),
      print: option(opts.print, true, (v, dflt) => safe5.bool(v, dflt)),
      printFn: option(opts.printFn, progressBar2.utils.printLn, (v, dflt) => safe5.func(v, dflt))
    };
  };
  progressBar2.getMultiBarManager = (options = {}) => {
    const args = {
      options: safe5.obj(options, false, {})
    };
    const opts = progressBar2.getFullMultiBarManagerOptions(args.options);
    const { minSlots, maxSlots } = opts;
    const barPacks = [];
    let totalCount = 0;
    let previousDrawnLines = 0;
    let previousUpdateTime = 0;
    let bumpLines = 0;
    const q = new QueueManager();
    q.setDefaultPauseTime(0);
    const add = (bar, removeWhenFinished = opts.removeFinished) => {
      const args2 = {
        bar: safe5.obj(bar),
        removeWhenFinished: safe5.bool(removeWhenFinished, false)
      };
      if (!args2.bar._registerManager)
        return;
      const barIndex = totalCount;
      totalCount += 1;
      const varOpts = ObjectTools5.mapValues(
        opts.variableOptions,
        (key, value) => {
          if (!value)
            return void 0;
          if (Array.isArray(value)) {
            return value[barIndex % value.length];
          }
          if (typeof value === "function") {
            const currentBars = [...getBars(), args2.bar];
            return value(args2.bar, barIndex, currentBars.indexOf(args2.bar), currentBars);
          }
          return void 0;
        }
      );
      const overrideOpts = {
        ...opts.overrideOptions,
        ...varOpts
      };
      const barPack = {
        bar: args2.bar,
        isFinished: false,
        lastOutput: "",
        fullOptions: overrideOpts,
        onUpdate: (outputString) => {
          barPack.lastOutput = outputString;
          update();
        },
        onStart: () => {
        },
        onFinish: () => {
          barPack.isFinished = true;
          if (args2.removeWhenFinished) {
            remove(args2.bar);
          }
        },
        onSet: () => {
        },
        onNext: () => {
        }
      };
      barPacks.push(barPack);
      barPack.fullOptions = args2.bar._registerManager(barPack, overrideOpts);
      bumpLines = Math.max(0, bumpLines - 1);
      barPack.lastOutput = barPack.bar.getBar(true);
      update();
    };
    const addNew = (max, options2 = {}) => {
      const args2 = {
        max: safe5.num(max, true, -1, void 0, -1),
        options: safe5.obj(options2, false, {})
      };
      const bar = progressBar2.getProgressBar(args2.max, args2.options);
      add(bar);
      return bar;
    };
    const remove = (bar) => {
      const args2 = {
        bar: safe5.obj(bar)
      };
      if (!args2.bar._registerManager)
        return;
      const index = barPacks.findIndex((pack) => pack.bar === args2.bar);
      if (index === -1)
        return;
      barPacks.splice(index, 1);
      bumpLines += 1;
      update();
    };
    const update = () => {
      const result = [];
      let count = 0;
      barPacks.slice(0, maxSlots).forEach((pack, index) => {
        const wrappedBar = pack.lastOutput || pack.bar.getBar(true);
        result.push(wrappedBar);
        count++;
      });
      if (count < minSlots) {
        const emptySlots = minSlots - barPacks.length;
        result.push(...ArrayTools10.repeat(emptySlots, ""));
        count += emptySlots;
      }
      if (!opts.alignBottom) {
        bumpLines = 0;
      }
      count += bumpLines;
      if (opts.print) {
        const timeSinceLastUpdate = Date.now() - previousUpdateTime;
        if (timeSinceLastUpdate > 15) {
          q.add("print", async () => {
            opts.printFn(previousDrawnLines, `
`.repeat(bumpLines) + result.join("\n"));
            previousDrawnLines = count;
            previousUpdateTime = Date.now();
            return wait4(0);
          });
        }
      }
    };
    const getBars = () => {
      return barPacks.map((pack) => pack.bar);
    };
    return {
      add,
      addNew,
      remove,
      update,
      getBars
    };
  };
  progressBar2.getFullMultiBarManagerOptions = (opts) => {
    const numSlots = optionalOption(opts.numSlots, void 0, (v, d) => safe5.num(v, true, 0, void 0, d));
    let minSlots = optionalOption(opts.minSlots, void 0, (v, d) => safe5.num(v, true, 0, void 0, d));
    let maxSlots = optionalOption(opts.maxSlots, void 0, (v, d) => v === Infinity ? Infinity : safe5.num(v, true, 0, void 0, d));
    if (minSlots !== void 0 && maxSlots !== void 0 && minSlots > maxSlots) {
      let temp = minSlots;
      minSlots = maxSlots;
      maxSlots = temp;
    }
    const result = {
      numSlots: option(numSlots, null, (v, d) => safe5.num(v, true, 0, void 0, d)),
      minSlots: option(minSlots, numSlots ?? 0, (v, d) => safe5.num(v, true, 0, maxSlots, d)),
      maxSlots: option(maxSlots, numSlots ?? Infinity, (v, d) => v === Infinity ? Infinity : safe5.num(v, true, minSlots, void 0, d)),
      removeFinished: option(opts.removeFinished, false, (v, d) => safe5.bool(v, d)),
      alignBottom: option(opts.alignBottom, false, (v, d) => safe5.bool(v, d)),
      overrideOptions: option(opts.overrideOptions, {}, (v, d) => safe5.obj(v, false, d)),
      variableOptions: option(opts.variableOptions, {}, (v, d) => safe5.obj(v, false, d)),
      print: option(opts.print, true, (v, d) => safe5.bool(v, d)),
      printFn: option(opts.printFn, progressBar2.utils.multiPrintFn, (v, d) => safe5.func(v, d))
    };
    return result;
  };
  let utils;
  ((utils2) => {
    utils2.printLn = (...text2) => {
      var _a, _b;
      const args = {
        text: safe5.arrOf.str(text2)
      };
      if (((_a = process == null ? void 0 : process.stdout) == null ? void 0 : _a.clearLine) && ((_b = process == null ? void 0 : process.stdout) == null ? void 0 : _b.cursorTo)) {
        if (!args.text.length) {
          process.stdout.write("\n");
        } else {
          const output = args.text.map((item) => item.toString()).join(" ");
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.moveCursor(0, -1);
          process.stdout.clearLine(0);
          process.stdout.write(output);
          process.stdout.write("\n");
        }
      } else {
        console.log(...args.text);
      }
    };
    utils2.multiPrintFn = (previousDrawnLines, output) => {
      var _a, _b, _c;
      const args = {
        previousDrawnLines: safe5.num(previousDrawnLines, true, 0),
        output: safe5.str(output, true, "")
      };
      const hasProcessFns = ((_a = process == null ? void 0 : process.stdout) == null ? void 0 : _a.clearLine) && ((_b = process == null ? void 0 : process.stdout) == null ? void 0 : _b.cursorTo) && ((_c = process == null ? void 0 : process.stdout) == null ? void 0 : _c.moveCursor);
      if (hasProcessFns) {
        let removeLines = args.previousDrawnLines;
        const outputLines = args.output.split("\n").length;
        if (outputLines > args.previousDrawnLines) {
          const extraLines = outputLines - args.previousDrawnLines;
          process.stdout.write("=========\n".repeat(extraLines));
          removeLines += extraLines;
        }
        let printOutput = "";
        printOutput += out.ansi.cursor.up(removeLines);
        printOutput += args.output;
        printOutput += "\n";
        process.stdout.write(printOutput);
      } else {
        console.log(args.output);
      }
    };
  })(utils = progressBar2.utils || (progressBar2.utils = {}));
})(progressBar || (progressBar = {}));
var getProgressBar = progressBar.getProgressBar;
var getMultiBarManager = progressBar.getMultiBarManager;

// src/tools/progressBarTools.ts
import { ArrayTools as ArrayTools11 } from "swiss-ak";
var progressBarTools;
((progressBarTools2) => {
  progressBarTools2.getColouredProgressBarOpts = (opts, randomise = false) => {
    let wrapperFns = [colr.yellow, colr.dark.magenta, colr.blue, colr.cyan, colr.green, colr.red];
    if (randomise) {
      wrapperFns = ArrayTools11.randomise(wrapperFns);
    }
    let index = 0;
    return (prefix = "", override = {}, resetColours = false) => {
      if (resetColours) {
        index = 0;
      }
      const result = {
        ...opts,
        prefix,
        ...override
      };
      if (!result.wrapperFn) {
        result.wrapperFn = wrapperFns[index % wrapperFns.length];
        index++;
      }
      if (result.prefix && result.prefixWidth) {
        result.prefix = out.truncate(result.prefix, result.prefixWidth, "\u2026");
      }
      return result;
    };
  };
})(progressBarTools || (progressBarTools = {}));

// src/tools/waiters.ts
var waiters;
((waiters2) => {
  waiters2.nextTick = () => new Promise((resolve) => process.nextTick(() => resolve(void 0)));
})(waiters || (waiters = {}));
var nextTick = waiters.nextTick;
export {
  LogTools,
  PathTools,
  ansi2 as ansi,
  ask,
  colr,
  createLogger,
  explodePath,
  getBreadcrumb2 as getBreadcrumb,
  getKeyListener,
  getLineCounter2 as getLineCounter,
  getLog,
  getLogStr,
  getMultiBarManager,
  getProgressBar,
  log,
  nextTick,
  out,
  processLogContents,
  progressBar,
  progressBarTools,
  table,
  waiters
};
