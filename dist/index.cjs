var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  LogUtils: () => LogUtils_exports,
  PathUtils: () => PathUtils_exports,
  align: () => align,
  ask: () => ask_exports,
  center: () => center,
  centerLines: () => centerLines,
  chlk: () => chlk,
  clr: () => clr,
  concatLineGroups: () => concatLineGroups,
  explodePath: () => explodePath,
  getBreadcrumb: () => getBreadcrumb,
  getKeyListener: () => getKeyListener,
  getLineCounter: () => getLineCounter,
  getLog: () => getLog,
  getLogStr: () => getLogStr,
  getResponsiveValue: () => getResponsiveValue,
  hasColor: () => hasColor,
  justify: () => justify,
  justifyLines: () => justifyLines,
  left: () => left,
  leftLines: () => leftLines,
  limitToLength: () => limitToLength,
  limitToLengthStart: () => limitToLengthStart,
  loading: () => loading,
  moveUp: () => moveUp,
  out: () => out,
  pad: () => pad,
  processLogContents: () => processLogContents,
  progressBarUtils: () => progressBarUtils,
  right: () => right,
  rightLines: () => rightLines,
  split: () => split,
  table: () => table,
  truncate: () => truncate,
  truncateStart: () => truncateStart,
  wrap: () => wrap
});
module.exports = __toCommonJS(src_exports);

// src/tools/ask.ts
var ask_exports = {};
__export(ask_exports, {
  autotext: () => autotext,
  boolean: () => boolean,
  booleanAlt: () => booleanAlt,
  countdown: () => countdown,
  crud: () => crud,
  date: () => date,
  dateRange: () => dateRange,
  datetime: () => datetime,
  fileExplorer: () => fileExplorer,
  imitate: () => imitate,
  loading: () => loading2,
  multiFileExplorer: () => multiFileExplorer,
  multiselect: () => multiselect2,
  number: () => number,
  pause: () => pause,
  prefill: () => prefill,
  saveFileExplorer: () => saveFileExplorer,
  section: () => section,
  select: () => select2,
  separator: () => separator,
  table: () => table_exports,
  text: () => text,
  time: () => time,
  trim: () => trim_default,
  utils: () => utils,
  validate: () => validate,
  wizard: () => wizard
});
var import_chalk13 = __toESM(require("chalk"), 1);
var import_string_width5 = __toESM(require("string-width"), 1);
var import_prompts = __toESM(require("prompts"), 1);
var import_fuse = __toESM(require("fuse.js"), 1);
var import_swiss_ak18 = require("swiss-ak");

// src/tools/out.ts
var import_swiss_ak3 = require("swiss-ak");
var import_string_width = __toESM(require("string-width"), 1);

// src/tools/LogUtils.ts
var LogUtils_exports = {};
__export(LogUtils_exports, {
  getLog: () => getLog,
  getLogStr: () => getLogStr,
  processLogContents: () => processLogContents
});
var import_util = require("util");
var import_chalk = __toESM(require("chalk"), 1);
var import_swiss_ak = require("swiss-ak");
var getLogStr = (item) => {
  const inspectList = ["object", "boolean", "number"];
  if (inspectList.includes(typeof item) && !(item instanceof Date)) {
    return (0, import_util.inspect)(item, { colors: false, depth: null });
  } else {
    return item + "";
  }
};
var processLogContents = (prefix, wrapper = import_swiss_ak.fn.noact, ...args) => args.map(getLogStr).join(" ").split("\n").map((line, index) => import_chalk.default.bold(index ? " ".repeat(prefix.length) : prefix) + " " + wrapper(line)).join("\n");
var getLog = (prefix, wrapper = import_swiss_ak.fn.noact) => (...args) => {
  console.log(processLogContents(prefix, wrapper, ...args));
};

// src/tools/out/lineCounter.ts
var randomID = () => Math.random().toString(36).substring(2);
var getLineCounter = () => {
  let lineCount = 0;
  const checkpoints = {};
  const log = (...args) => {
    const added = out.utils.getNumLines(args.map(getLogStr).join(" "));
    lineCount += added;
    console.log(...args);
    return added;
  };
  const move = (lines) => {
    if (lines > 0) {
      log("\n".repeat(lines - 1));
    }
    if (lines < 0) {
      clearBack(-lines);
    }
  };
  const wrap2 = (newLines = 1, func, ...args) => {
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
  const checkpoint = (checkpointID = randomID()) => {
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
  const clear2 = () => {
    out.moveUp(lineCount);
    lineCount = 0;
  };
  const lc = {
    log,
    move,
    wrap: wrap2,
    add,
    get,
    getSince,
    checkpoint,
    clearToCheckpoint,
    clear: clear2,
    clearBack
  };
  return lc;
};

// src/tools/out/breadcrumb.ts
var import_chalk3 = __toESM(require("chalk"), 1);
var import_swiss_ak2 = require("swiss-ak");

// src/tools/clr.ts
var import_chalk2 = __toESM(require("chalk"), 1);
var gray0 = import_chalk2.default.black;
var gray1 = import_chalk2.default.gray.dim;
var gray2 = import_chalk2.default.white.dim;
var gray3 = import_chalk2.default.whiteBright.dim;
var gray4 = import_chalk2.default.white;
var gray5 = import_chalk2.default.whiteBright;
var grays = [
  gray0,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5
];
var gray = (num) => grays[Math.max(0, Math.min(num, grays.length - 1))];
var clear = (str) => str.replace(new RegExp(`\\u001b[[0-9]+m`, "g"), "");
var not = (style) => {
  const styled = style("**xxx**");
  const [after, before] = styled.split("**xxx**");
  return (item) => `${before}${item}${after}`;
};
var notUnderlined = not(import_chalk2.default.underline);
var chlk = {
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
var clr = {
  hl1: import_chalk2.default.yellowBright.bold,
  hl2: import_chalk2.default.yellow,
  approve: import_chalk2.default.green.bold,
  create: import_chalk2.default.greenBright.bold,
  update: import_chalk2.default.yellow.bold,
  delete: import_chalk2.default.redBright.bold,
  deleteAll: import_chalk2.default.redBright.bold,
  blue: import_chalk2.default.blueBright,
  cyan: import_chalk2.default.cyanBright,
  green: import_chalk2.default.greenBright,
  magenta: import_chalk2.default.magentaBright,
  red: import_chalk2.default.redBright,
  yellow: import_chalk2.default.yellowBright,
  t1: import_chalk2.default.yellowBright,
  t2: import_chalk2.default.magentaBright,
  t3: import_chalk2.default.blueBright,
  t4: import_chalk2.default.redBright,
  t5: import_chalk2.default.greenBright,
  t6: import_chalk2.default.cyanBright,
  gray0,
  gray1,
  gray2,
  gray3,
  gray4,
  gray5
};

// src/tools/out/breadcrumb.ts
var seperatorChar = ` ${chlk.gray2(import_swiss_ak2.symbols.CHEV_RGT)} `;
var getBreadcrumb = (...baseNames) => {
  let current = [];
  let colours = ["t1", "t2", "t3", "t4", "t5", "t6"];
  const setColours = (newColours) => {
    colours = newColours;
  };
  const add = (...names) => current.push(...names);
  const getColouredName = (name, index, arr) => hasColor(name) || index === arr.length - 1 ? name : clr[colours[index % colours.length]](name);
  const getColouredNames = (...tempNames) => getNames(...tempNames).map(getColouredName);
  const getNames = (...tempNames) => [...baseNames, ...current, ...tempNames];
  const sub = (...tempNames) => getBreadcrumb(...getNames(...tempNames));
  const otherChars = "?  > ";
  const spaceForInput = 25;
  const get = (...tempNames) => import_chalk3.default.bold(
    truncate(
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
var import_chalk4 = __toESM(require("chalk"), 1);
var NEW_LINE = "\n";
var textToString = (text2) => text2 instanceof Array ? joinLines(text2) : text2;
var getTerminalWidth = () => {
  var _a;
  return ((_a = process == null ? void 0 : process.stdout) == null ? void 0 : _a.columns) ? process.stdout.columns : 100;
};
var getLines = (text2) => textToString(text2).split(NEW_LINE);
var getNumLines = (text2) => getLines(text2).length;
var getLinesWidth = (text2) => Math.max(...getLines(text2).map((line) => (0, import_string_width.default)(line)));
var getLogLines = (item) => getLines(getLogStr(item));
var getNumLogLines = (item) => getNumLines(getLogStr(item));
var getLogLinesWidth = (item) => getLinesWidth(getLogStr(item));
var joinLines = (lines) => lines.map(import_swiss_ak3.fn.maps.toString).join(NEW_LINE);
var pad = (line, start, end, replaceChar = " ") => `${replaceChar.repeat(Math.max(0, start))}${line}${replaceChar.repeat(Math.max(0, end))}`;
var correctWidth = (width) => width < 0 || width === Infinity ? getTerminalWidth() : Math.min(width, getTerminalWidth());
var center = (item, width = getTerminalWidth(), replaceChar = " ", forceWidth = true) => getLogLines(item).map(
  (line) => pad(
    line,
    Math.floor((correctWidth(width) - (0, import_string_width.default)(line)) / 2),
    forceWidth ? Math.ceil((correctWidth(width) - (0, import_string_width.default)(line)) / 2) : 0,
    replaceChar
  )
).join(NEW_LINE);
var left = (item, width = getTerminalWidth(), replaceChar = " ", forceWidth = true) => getLogLines(item).map((line) => pad(line, 0, forceWidth ? correctWidth(width) - (0, import_string_width.default)(line) : 0, replaceChar)).join(NEW_LINE);
var right = (item, width = getTerminalWidth(), replaceChar = " ", forceWidth = true) => getLogLines(item).map((line) => pad(line, correctWidth(width) - (0, import_string_width.default)(line), 0, replaceChar)).join(NEW_LINE);
var justify = (item, width = getTerminalWidth(), replaceChar = " ", forceWidth = true) => getLogLines(item).map((line) => {
  const words = line.split(" ");
  if (words.length === 1)
    return left(words[0], width, replaceChar, forceWidth);
  const currW = words.map((w) => w.length).reduce(import_swiss_ak3.fn.reduces.combine);
  const perSpace = Math.floor((width - currW) / (words.length - 1));
  const remain = (width - currW) % (words.length - 1);
  const spaces = import_swiss_ak3.ArrayUtils.range(words.length - 1).map((i) => perSpace + Number(words.length - 2 - i < remain)).map((num) => replaceChar.repeat(num));
  let result = "";
  for (let index in words) {
    result += words[index] + (spaces[index] || "");
  }
  return result;
}).join(NEW_LINE);
var getLongestLen = (lines) => Math.max(...lines.map((line) => (0, import_string_width.default)(line)));
var leftLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out.left(line, width));
var centerLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out.center(line, width));
var rightLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out.right(line, width));
var justifyLines = (lines, width = getLongestLen(lines)) => lines.map((line) => out.justify(line, width));
var alignFunc = {
  left,
  center,
  right,
  justify
};
var align = (item, direction, width = getTerminalWidth(), replaceChar = " ", forceWidth = true) => {
  const func = alignFunc[direction] || alignFunc.left;
  return func(item, width, replaceChar, forceWidth);
};
var split = (leftItem, rightItem, width = getTerminalWidth(), replaceChar = " ") => `${leftItem + ""}${replaceChar.repeat(Math.max(0, width - ((0, import_string_width.default)(leftItem + "") + (0, import_string_width.default)(rightItem + ""))))}${rightItem + ""}`;
var wrap = (item, width = getTerminalWidth(), alignment, forceWidth = false) => getLogLines(item).map((line) => {
  if ((0, import_string_width.default)(line) > width) {
    let words = line.split(/(?<=#?[ -]+)/g);
    const rows = [];
    words = words.map((orig) => {
      if ((0, import_string_width.default)(orig.replace(/\s$/, "")) > width) {
        let remaining2 = orig;
        let result = [];
        while ((0, import_string_width.default)(remaining2) > width - 1) {
          result.push(remaining2.slice(0, width - 1) + "-");
          remaining2 = remaining2.slice(width - 1);
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
      if ((0, import_string_width.default)(candText) + (0, import_string_width.default)(word) > width) {
        rows.push(candidateRow);
        rowStartIndex = Number(wIndex);
      }
    }
    const remaining = words.slice(rowStartIndex);
    rows.push(remaining);
    return rows.map((row) => row.join("")).map((row) => row.replace(/\s$/, "")).map((row) => alignment ? align(row, alignment, width, void 0, forceWidth) : row);
  }
  return line;
}).flat().join(NEW_LINE);
var moveUp = (lines = 1) => {
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
var loadingDefault = (s) => console.log(import_chalk4.default.dim(`${s}`));
var loadingWords = [
  "\u2113-o-\u{1D51E}-\u{1D4ED}-\u026A-\u057C-\u{1D5F4}",
  "\u{1D695}-\u03C3-a-\u{1D521}-\u{1D4F2}-\u0274-\u0262",
  "\u{1D5DF}-\u{1D698}-\u03B1-d-\u{1D526}-\u{1D4F7}-\u0262",
  "\u029F-\u{1D5FC}-\u{1D68A}-\u2202-i-\u{1D52B}-\u{1D4F0}",
  "\u029F-\u0585-\u{1D5EE}-\u{1D68D}-\u03B9-n-\u{1D524}",
  "\u{1D4F5}-\u1D0F-\u01DF-\u{1D5F1}-\u{1D692}-\u03B7-g",
  "\u{1D529}-\u{1D4F8}-\u1D00-\u0256-\u{1D5F6}-\u{1D697}-g",
  "l-\u{1D52C}-\u{1D4EA}-\u1D05-\u0268-\u{1D5FB}-\u{1D690}"
].map((word) => word.split("-"));
var loadingChars = import_swiss_ak3.ArrayUtils.repeat((loadingWords.length + 1) * loadingWords[0].length, ...loadingWords).map(
  (word, index) => import_chalk4.default.bold("loading".slice(0, Math.floor(Math.floor(index) / loadingWords.length))) + word.slice(Math.floor(Math.floor(index) / loadingWords.length)).join("") + ["   ", ".  ", ".. ", "..."][Math.floor(index / 3) % 4]
);
var loading = (action = loadingDefault, lines = 1, symbols6 = loadingChars) => {
  let stopped = false;
  let count = 0;
  const runLoop = async () => {
    if (stopped)
      return;
    if (count)
      moveUp(lines);
    action(symbols6[count++ % symbols6.length]);
    await (0, import_swiss_ak3.wait)(150);
    return runLoop();
  };
  runLoop();
  return {
    stop: () => {
      moveUp(lines);
      stopped = true;
    }
  };
};
var hasColor = (str) => Boolean(str.match(new RegExp(`\\u001b[[0-9]+m`, "g")));
var limitToLength = (text2, maxLength) => joinLines(
  getLines(text2).map((line) => {
    let specials = "";
    let result = line;
    while ((0, import_string_width.default)(result) > maxLength) {
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
var limitToLengthStart = (text2, maxLength) => joinLines(
  getLines(text2).map((line) => {
    let specials = "";
    let result = line;
    while ((0, import_string_width.default)(result) > maxLength) {
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
var truncate = (text2, maxLength = getTerminalWidth(), suffix = import_chalk4.default.dim("\u2026")) => joinLines(getLines(text2).map((line) => (0, import_string_width.default)(line) > maxLength ? limitToLength(line, maxLength - (0, import_string_width.default)(suffix)) + suffix : line));
var truncateStart = (text2, maxLength = getTerminalWidth(), suffix = import_chalk4.default.dim("\u2026")) => joinLines(
  getLines(text2).map((line) => (0, import_string_width.default)(line) > maxLength ? suffix + limitToLengthStart(line, maxLength - (0, import_string_width.default)(suffix)) : line)
);
var concatLineGroups = (...groups) => {
  const maxLen = Math.max(...groups.map((group) => group.length));
  const aligned = groups.map((group) => leftLines([...group, ...Array(maxLen).fill("")].slice(0, maxLen)));
  return (0, import_swiss_ak3.zipMax)(...aligned).map((line) => line.join(""));
};
var getResponsiveValue = (options) => {
  const mapped = options.map(({ minColumns, value }) => ({
    min: typeof minColumns === "number" ? minColumns : 0,
    value
  }));
  const sorted = (0, import_swiss_ak3.sortByMapped)(mapped, (option) => option.min, import_swiss_ak3.fn.desc);
  const termWidth = out.utils.getTerminalWidth();
  return (sorted.find((option) => termWidth >= option.min) ?? sorted[0]).value;
};
var out = {
  pad,
  center,
  left,
  right,
  justify,
  align,
  split,
  wrap,
  moveUp,
  loading,
  limitToLength,
  limitToLengthStart,
  truncate,
  truncateStart,
  getLineCounter,
  getBreadcrumb,
  concatLineGroups,
  getResponsiveValue,
  utils: {
    getLines,
    getNumLines,
    getLinesWidth,
    getLogLines,
    getNumLogLines,
    getLogLinesWidth,
    joinLines,
    getTerminalWidth,
    hasColor
  }
};

// src/tools/PathUtils.ts
var PathUtils_exports = {};
__export(PathUtils_exports, {
  explodePath: () => explodePath,
  removeDoubleSlashes: () => removeDoubleSlashes,
  removeTrailSlash: () => removeTrailSlash,
  trailSlash: () => trailSlash
});
var explodePath = (path) => {
  const dir = (path.match(/(.*[\\\/])*/) || [])[0].replace(/[\\\/]$/, "");
  const filename = (path.match(/[^\\\/]*$/) || [])[0];
  const ext = ((filename.match(/\.[^\.]*$/) || [])[0] || "").replace(/^\./, "");
  const name = filename.replace(ext, "").replace(/[\.]$/, "");
  const folders = dir.split(/[\\\/]/).filter((x) => x);
  return { path, dir, folders, name, ext, filename };
};
var removeTrailSlash = (path) => path.replace(/\/$/, "");
var trailSlash = (path) => removeTrailSlash(path) + "/";
var removeDoubleSlashes = (path) => path.replace(/\/\//g, "/");

// src/utils/keyListener.ts
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
      return process.exit();
    }
    if (key.length === 1) {
      return callback(key, key);
    }
  };
  const start = () => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", listenFn);
    process.stdout.write("\x1B[?25l");
  };
  const stop = () => {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdin.off("data", listenFn);
    process.stdout.write("\x1B[?25h");
  };
  if (isStart)
    start();
  return {
    start,
    stop
  };
};

// src/tools/ask/trim.ts
var import_swiss_ak7 = require("swiss-ak");
var import_string_width2 = __toESM(require("string-width"), 1);

// src/tools/table.ts
var import_swiss_ak6 = require("swiss-ak");

// src/utils/processTableInput.ts
var import_swiss_ak4 = require("swiss-ak");
var empty = (numCols, char = "") => new Array(numCols).fill(char);
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
  const transposed = (0, import_swiss_ak4.zip)(...[...cells.header, ...cells.body]);
  const actualColWidths = transposed.map((col) => Math.max(...col.map((cell) => out.utils.getLinesWidth(cell))));
  const currColWidths = preferredWidths.length ? import_swiss_ak4.ArrayUtils.repeat(numCols, ...preferredWidths) : actualColWidths;
  const currTotalWidth = currColWidths.length ? currColWidths.reduce(import_swiss_ak4.fn.reduces.combine) + (numCols + 1) * 3 : 0;
  const diff = currTotalWidth - (maxTotalWidth - (marginRight + marginLeft));
  const colWidths = [...currColWidths];
  for (let i = 0; i < diff; i++) {
    colWidths[colWidths.indexOf(Math.max(...colWidths))]--;
  }
  return colWidths;
};
var wrapCells = (rows, type, colWidths, truncate2) => rows.map((row) => {
  const wrapped = row.map((cell) => out.utils.joinLines(cell)).map((text2, colIndex) => {
    if (truncate2 !== false) {
      return out.truncate(text2, colWidths[colIndex], truncate2);
    } else {
      return out.wrap(text2, colWidths[colIndex]);
    }
  }).map((text2) => out.utils.getLines(text2));
  const maxHeight = Math.max(...wrapped.map((cell) => cell.length));
  return wrapped.map((cell) => [...cell, ...empty(maxHeight)].slice(0, maxHeight));
});
var seperateLinesIntoRows = (rows, type) => rows.map((row) => (0, import_swiss_ak4.zip)(...row));
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
var import_swiss_ak5 = require("swiss-ak");
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
var ovAllCharact = (orig, char) => import_swiss_ak5.ArrayUtils.repeat(4, char);
var ovSeperators = (orig, char) => [orig[0], char, char, char];
var ovOuterChars = (orig, char) => [orig[0], char, orig[2], char];
var getTableCharacters = (opts) => {
  let mapped = tableCharactersBasic();
  const normalRows = ["hNor", "bNor"];
  const outerRows = ["hTop", "hBot", "bTop", "bBot"];
  const rowTypes = Object.keys(mapped);
  if (opts.overrideChar) {
    for (const rowType of rowTypes) {
      if (normalRows.includes(rowType)) {
        mapped[rowType] = ovSeperators(mapped[rowType], opts.overrideChar);
      } else {
        mapped[rowType] = ovAllCharact(mapped[rowType], opts.overrideChar);
      }
    }
  }
  if (opts.overrideVerChar || !opts.drawColLines) {
    const ovrd = opts.overrideVerChar || " ";
    for (const rowType of rowTypes) {
      if (normalRows.includes(rowType)) {
        mapped[rowType] = ovSeperators(mapped[rowType], ovrd);
      } else {
        mapped[rowType] = ovAllCharact(mapped[rowType], mapped[rowType][0]);
      }
    }
  }
  if (opts.overrideHorChar || !opts.drawRowLines) {
    const ovrd = opts.overrideHorChar;
    const copyVertsFrom = ["hNor", "hNor", "hNor", "hNor", "mSep", "bNor", "bNor", "bNor", "bNor"];
    for (const rowIndex in rowTypes) {
      const rowType = rowTypes[rowIndex];
      if (normalRows.includes(rowType)) {
      } else {
        if (opts.overrideHorChar) {
          mapped[rowType] = ovAllCharact(mapped[rowType], ovrd);
        } else {
          mapped[rowType] = [...mapped[copyVertsFrom[rowIndex]]];
        }
      }
    }
  }
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

// src/tools/table.ts
var import_chalk5 = __toESM(require("chalk"), 1);
var toFullFormatConfig = (config) => ({
  isHeader: false,
  isBody: true,
  ...config
});
var getFullOptions = (opts) => ({
  overrideChar: "",
  overrideHorChar: opts.overrideChar || "",
  overrideVerChar: opts.overrideChar || "",
  align: "left",
  alignCols: ["left"],
  colWidths: [],
  cellPadding: 1,
  truncate: false,
  maxWidth: out.utils.getTerminalWidth(),
  ...opts,
  wrapperFn: typeof opts.wrapperFn !== "function" ? import_swiss_ak6.fn.noact : opts.wrapperFn,
  wrapLinesFn: typeof opts.wrapLinesFn !== "function" ? import_swiss_ak6.fn.noact : opts.wrapLinesFn,
  drawOuter: typeof opts.drawOuter !== "boolean" ? true : opts.drawOuter,
  drawRowLines: typeof opts.drawRowLines !== "boolean" ? true : opts.drawRowLines,
  drawColLines: typeof opts.drawColLines !== "boolean" ? true : opts.drawColLines,
  transpose: typeof opts.transpose !== "boolean" ? false : opts.transpose,
  transposeBody: typeof opts.transposeBody !== "boolean" ? false : opts.transposeBody,
  format: (opts.format || []).map(toFullFormatConfig),
  margin: ((input = 0) => {
    const arr = [input].flat();
    const top = arr[0] ?? 0;
    const right2 = arr[1] ?? top;
    const bottom = arr[2] ?? top;
    const left2 = arr[3] ?? right2 ?? top;
    return [top, right2, bottom, left2];
  })(opts.margin)
});
var empty2 = (numCols, char = "") => new Array(numCols).fill(char);
var getLines2 = (body, header, options = {}) => {
  const opts = getFullOptions(options);
  const { wrapperFn, wrapLinesFn, drawOuter, alignCols, align: align2, drawRowLines, cellPadding } = opts;
  const [marginTop, marginRight, marginBottom, marginLeft] = opts.margin;
  const result = [];
  const {
    cells: { header: pHeader, body: pBody },
    numCols,
    colWidths
  } = processInput({ header, body }, opts);
  const alignColumns = import_swiss_ak6.ArrayUtils.repeat(numCols, ...alignCols);
  const tableChars = getTableCharacters(opts);
  const printLine = (row = empty2(numCols), chars = tableChars.bNor, textWrapperFn) => {
    const [norm, strt, sepr, endc] = chars;
    const pad2 = norm.repeat(Math.max(0, cellPadding));
    let aligned = row.map((cell, col) => out.align(cell || "", alignColumns[col], colWidths[col], norm, true));
    if (textWrapperFn)
      aligned = aligned.map((x) => textWrapperFn(x));
    const inner = aligned.join(wrapLinesFn(`${pad2}${sepr}${pad2}`));
    const str = wrapLinesFn(`${" ".repeat(marginLeft)}${strt}${pad2}`) + inner + wrapLinesFn(`${pad2}${endc}${" ".repeat(marginRight)}`);
    result.push(out.align(wrapperFn(str), align2, -1, " ", false));
  };
  if (marginTop)
    result.push("\n".repeat(marginTop - 1));
  if (pHeader.length) {
    if (drawOuter && drawRowLines)
      printLine(empty2(numCols, ""), tableChars.hTop, wrapLinesFn);
    for (let index in pHeader) {
      const row = pHeader[index];
      if (Number(index) !== 0 && drawRowLines)
        printLine(empty2(numCols, ""), tableChars.hSep, wrapLinesFn);
      for (let line of row) {
        printLine(line, tableChars.hNor, import_chalk5.default.bold);
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
      printLine(line, tableChars.bNor);
    }
  }
  if (drawOuter && drawRowLines)
    printLine(empty2(numCols, ""), tableChars.bBot, wrapLinesFn);
  if (marginBottom)
    result.push("\n".repeat(marginBottom - 1));
  return result;
};
var print = (body, header, options = {}) => {
  const lines = getLines2(body, header, options);
  if (lines.length) {
    console.log(lines.join("\n"));
  }
  return lines.length;
};
var getAllKeys = (objects) => {
  const allKeys = {};
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      allKeys[key] = true;
    });
  });
  return Object.keys(allKeys);
};
var objectsToTable = (objects, headers = {}) => {
  const allKeys = getAllKeys(objects);
  const header = [allKeys.map((key) => headers[key] || key)];
  const body = objects.map((obj) => allKeys.map((key) => obj[key]));
  return {
    header,
    body
  };
};
var transpose = (rows) => {
  return import_swiss_ak6.ArrayUtils.zip(...rows);
};
var concatRows = (cells) => {
  return [...cells.header || [], ...cells.body];
};
var getFormat = (format, row, col, isHeader, isBody) => {
  const result = {
    formatFn: typeof format === "function" ? format : clr[format],
    row,
    col
  };
  if (isHeader !== void 0)
    result.isHeader = isHeader;
  if (isBody !== void 0)
    result.isBody = isBody;
  return result;
};
var printObjects = (objects, headers = {}, options = {}) => {
  const { body, header } = objectsToTable(objects, headers);
  return print(body, header, options);
};
var table = {
  getLines: getLines2,
  print,
  printObjects,
  utils: {
    objectsToTable,
    transpose,
    concatRows,
    getFormat
  }
};

// src/tools/ask/trim.ts
var import_chalk6 = __toESM(require("chalk"), 1);
var toTimeCode = (frame, frameRate = 60, includeHours = false, includeMinutes = true) => {
  const frLength = (0, import_string_width2.default)(frameRate + "");
  const toSecs = (0, import_swiss_ak7.seconds)(Math.floor(frame / frameRate));
  const remaining = frame % frameRate;
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
var getFullOptions2 = (opts) => ({
  speed: 1,
  fastSpeed: 5,
  showInstructions: true,
  charTrack: " ",
  charHandle: "\u2503",
  charBar: "\u2588",
  clrTrack: import_chalk6.default.bgGray,
  clrHandle: import_chalk6.default.whiteBright,
  clrBar: import_chalk6.default.white,
  ...opts,
  charActiveHandle: opts.charActiveHandle ?? opts.charHandle ?? "\u2503",
  charHandleBase: opts.charHandleBase ?? opts.charHandle ?? "\u2588",
  charActiveHandleBase: opts.charActiveHandleBase ?? opts.charHandleBase ?? opts.charActiveHandle ?? opts.charHandle ?? "\u2588",
  clrActiveHandle: opts.clrActiveHandle ?? opts.clrHandle ?? import_chalk6.default.yellowBright.bold,
  clrHandleBase: opts.clrHandleBase ?? opts.clrHandle ?? import_chalk6.default.whiteBright,
  clrActiveHandleBase: opts.clrActiveHandleBase ?? opts.clrHandleBase ?? opts.clrActiveHandle ?? opts.clrHandle ?? import_chalk6.default.yellowBright.bold
});
var getChars = (opts) => ({
  track: opts.charTrack,
  handle: opts.charHandle,
  bar: opts.charBar,
  activeHandle: opts.charActiveHandle,
  handleBase: opts.charHandleBase,
  activeHandleBase: opts.charActiveHandleBase
});
var getColors = (opts) => ({
  track: opts.clrTrack,
  handle: opts.clrHandle,
  bar: opts.clrBar,
  activeHandle: opts.clrActiveHandle,
  handleBase: opts.clrHandleBase,
  activeHandleBase: opts.clrActiveHandleBase
});
var trim = async (totalFrames, frameRate, options = {}) => {
  const opts = getFullOptions2(options);
  const lc = getLineCounter();
  const deferred = (0, import_swiss_ak7.getDeferred)();
  const totalLength = (0, import_swiss_ak7.seconds)(Math.floor(totalFrames / frameRate));
  const showHours = totalLength > (0, import_swiss_ak7.hours)(1);
  let activeHandle = "start";
  const handles = {
    start: 0,
    end: totalFrames - 1
  };
  let displayCount = -1;
  const display = () => {
    displayCount++;
    lc.clear();
    const width = out.utils.getTerminalWidth();
    const totalSpace = width - 2;
    const handlePositions = import_swiss_ak7.ObjectUtils.mapValues(
      handles,
      (_k, value) => Math.floor(value / (totalFrames - 1) * totalSpace)
    );
    const befSpace = Math.max(0, handlePositions.start);
    const barSpace = Math.max(0, handlePositions.end - handlePositions.start);
    const aftSpace = Math.max(0, totalSpace - handlePositions.end);
    const char = getChars(opts);
    const cols = getColors(opts);
    const actvHand = cols.activeHandle(char.activeHandle);
    const inactvHand = cols.handle(char.handle);
    const handStart = activeHandle == "start" ? actvHand : inactvHand;
    const handEnd = activeHandle == "end" ? actvHand : inactvHand;
    const drawHandleLabels = () => {
      const handleLabelsRaw = import_swiss_ak7.ObjectUtils.mapValues(handles, (_k, value) => [
        ` ${toTimeCode(value, frameRate, showHours)} `,
        ""
      ]);
      const handleLabelWidths = import_swiss_ak7.ObjectUtils.mapValues(
        handleLabelsRaw,
        (_k, value) => Math.max(...value.map((s) => (0, import_string_width2.default)(s)))
      );
      const handleAligns = {
        start: handleLabelWidths.start > befSpace ? "left" : "right",
        end: handleLabelWidths.end > aftSpace ? "right" : "left"
      };
      const handleLabels = import_swiss_ak7.ObjectUtils.mapValues(
        handleLabelsRaw,
        (key, value) => value.map((l) => out.align(l, handleAligns[key], handleLabelWidths[key], " ", true))
      );
      const strtBef = handleAligns.start === "right";
      const endBef = handleAligns.end === "right";
      const potentialMaxLabelSpace = handlePositions.end - handlePositions.start;
      if (!strtBef && potentialMaxLabelSpace < handleLabelWidths.start) {
        handleLabels.start = handleLabels.start.map((s) => s.slice(0, Math.max(0, potentialMaxLabelSpace - 1)));
        handleLabelWidths.start = Math.max(...handleLabels.start.map((s) => (0, import_string_width2.default)(s)));
      }
      if (endBef && potentialMaxLabelSpace < handleLabelWidths.end) {
        handleLabels.end = handleLabels.end.map((s) => s.slice(s.length - Math.max(0, potentialMaxLabelSpace - 1)));
        handleLabelWidths.end = Math.max(...handleLabels.end.map((s) => (0, import_string_width2.default)(s)));
      }
      const befLabelSpace = Math.max(0, befSpace - (strtBef ? handleLabelWidths.start : 0));
      const barLabelSpace = Math.max(0, barSpace - (!strtBef ? handleLabelWidths.start : 0) - (endBef ? handleLabelWidths.end : 0));
      const aftLabelSpace = Math.max(0, aftSpace - (!endBef ? handleLabelWidths.end : 0));
      const bef = " ".repeat(befLabelSpace);
      const bar = " ".repeat(barLabelSpace);
      const aft = " ".repeat(aftLabelSpace);
      lc.log(
        `${bef}${strtBef ? handleLabels.start[0] : ""}${handStart}${!strtBef ? handleLabels.start[0] : ""}${bar}${endBef ? handleLabels.end[0] : ""}${handEnd}${!endBef ? handleLabels.end[0] : ""}${aft}`
      );
      lc.log(
        `${bef}${strtBef ? handleLabels.start[1] : ""}${handStart}${!strtBef ? handleLabels.start[1] : ""}${bar}${endBef ? handleLabels.end[1] : ""}${handEnd}${!endBef ? handleLabels.end[1] : ""}${aft}`
      );
    };
    const drawBottomLabels = () => {
      const startVideoLabel = `[${toTimeCode(0, frameRate, showHours)}]`;
      const endVideoLabel = `[${toTimeCode(totalFrames - 1, frameRate, showHours)}]`;
      const trimmedVideoLabel = toTimeCode(handles.end - handles.start, frameRate, showHours);
      const availSpace = width - ((0, import_string_width2.default)(startVideoLabel) + (0, import_string_width2.default)(endVideoLabel) + (0, import_string_width2.default)(trimmedVideoLabel));
      const centerPosition = handlePositions.start + Math.floor((handlePositions.end - handlePositions.start) / 2);
      const centerInSpace = centerPosition - (0, import_string_width2.default)(startVideoLabel) - Math.floor((0, import_string_width2.default)(trimmedVideoLabel) / 2) + 1;
      const bef = " ".repeat(Math.max(0, Math.min(availSpace, centerInSpace)));
      const aft = " ".repeat(Math.max(0, Math.min(availSpace, availSpace - centerInSpace)));
      lc.log(`${startVideoLabel}${bef}${trimmedVideoLabel}${aft}${endVideoLabel}`);
    };
    const drawBar = () => {
      const actvHand2 = cols.activeHandleBase(char.activeHandleBase);
      const inactvHand2 = cols.handleBase(char.handleBase);
      const handStart2 = activeHandle == "start" ? actvHand2 : inactvHand2;
      const handEnd2 = activeHandle == "end" ? actvHand2 : inactvHand2;
      const bef = cols.track(char.track.repeat(befSpace));
      const bar = cols.bar(char.bar.repeat(barSpace));
      const aft = cols.track(char.track.repeat(aftSpace));
      lc.log(`${bef}${handStart2}${bar}${handEnd2}${aft}`);
    };
    const drawInstructions = () => {
      if (opts.showInstructions && displayCount < 5) {
        const body = [
          [
            import_chalk6.default.gray.dim(`[${import_swiss_ak7.symbols.TRI_LFT}/${import_swiss_ak7.symbols.TRI_RGT}] move ${opts.speed} frame${opts.speed > 1 ? "s" : ""}`),
            import_chalk6.default.gray.dim(`[${import_swiss_ak7.symbols.TRI_UPP}/${import_swiss_ak7.symbols.TRI_DWN}] move ${opts.fastSpeed} frame${opts.fastSpeed > 1 ? "s" : ""}`),
            import_chalk6.default.gray.dim(`[TAB] switch handle`),
            import_chalk6.default.gray.dim(`[ENTER] submit`)
          ]
        ];
        lc.add(table.print(body, void 0, { drawOuter: false, drawRowLines: false, drawColLines: false, colWidths: [100], alignCols: ["center"] }));
      } else {
        lc.log();
      }
    };
    drawHandleLabels();
    drawBar();
    drawBottomLabels();
    drawInstructions();
  };
  const swapHandle = () => activeHandle = getNextHandle(activeHandle);
  const adjustHandle = (amount) => {
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
      swapHandle();
    }
  };
  const submit = () => {
    kl.stop();
    lc.clear();
    const fixedHandles = { start: handles.start, end: handles.end - 1 };
    deferred.resolve(fixedHandles);
  };
  const updateHandles = (keyName) => {
    switch (keyName) {
      case "return":
        return submit();
      case "tab":
        swapHandle();
        break;
      case "left":
        adjustHandle(-opts.speed);
        break;
      case "right":
        adjustHandle(opts.speed);
        break;
      case "up":
        adjustHandle(opts.fastSpeed);
        break;
      case "down":
        adjustHandle(-opts.fastSpeed);
        break;
    }
    display();
  };
  const kl = getKeyListener(updateHandles, true);
  display();
  return deferred.promise;
};
var trim_default = trim;

// src/tools/ask/fileExplorer.ts
var fsP2 = __toESM(require("fs/promises"), 1);
var import_string_width3 = __toESM(require("string-width"), 1);
var import_swiss_ak10 = require("swiss-ak");

// src/utils/actionBar.ts
var import_chalk7 = __toESM(require("chalk"), 1);
var import_swiss_ak8 = require("swiss-ak");
var getActionBar = (ids, config, pressedId, disabledIds = []) => {
  const keyList = ids.filter(import_swiss_ak8.fn.isTruthy).filter((key) => config[key]);
  const row = keyList.map((key) => {
    const { keys, label } = config[key];
    return ` [ ${keys} ] ${label} `;
  });
  const format = [];
  if (pressedId) {
    format.push({ formatFn: import_chalk7.default.bgWhite.black, col: keyList.indexOf(pressedId) });
  }
  if (disabledIds.length) {
    disabledIds.forEach((key) => format.push({ formatFn: import_chalk7.default.dim.strikethrough, col: keyList.indexOf(key) }));
  }
  return out.utils.joinLines(
    table.getLines([row], void 0, { drawOuter: false, drawColLines: false, drawRowLines: false, alignCols: ["center"], colWidths: [200], format })
  );
};

// src/tools/ask/fileExplorer.ts
var import_chalk8 = __toESM(require("chalk"), 1);

// src/utils/fsUtils.ts
var import_child_process = require("child_process");
var fsP = __toESM(require("fs/promises"), 1);
var import_swiss_ak9 = require("swiss-ak");
var execute = (command) => {
  return new Promise((resolve, reject) => {
    (0, import_child_process.exec)(command, (error, stdout, stderr) => {
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
var intoLines = (out2) => out2.toString().split("\n").filter(import_swiss_ak9.fn.isTruthy);
var getProbe = async (file) => {
  const stdout = await (0, import_swiss_ak9.tryOr)("", async () => await execute(`ffprobe -select_streams v -show_streams ${file} 2>/dev/null | grep =`));
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
var mkdir2 = (dir) => {
  return fsP.mkdir(dir, { recursive: true });
};
var findDirs = async (dir = ".") => {
  const stdout = await (0, import_swiss_ak9.tryOr)("", async () => await execute(`find ${dir} -type d -maxdepth 1 -execdir echo {} ';'`));
  return intoLines(stdout);
};
var findFiles = async (dir = ".") => {
  const stdout = await (0, import_swiss_ak9.tryOr)("", async () => await execute(`find ${dir} -type f -maxdepth 1 -execdir echo {} ';'`));
  return intoLines(stdout);
};
var open = async (file) => {
  try {
    await execute(`open ${file}`);
  } catch (err) {
  }
};
var isFileExist = async (file) => {
  try {
    await execute(`[[ -f ${file} ]]`);
    return true;
  } catch (e) {
    return false;
  }
};
var isDirExist = async (file) => {
  try {
    await execute(`[[ -d ${file} ]]`);
    return true;
  } catch (e) {
    return false;
  }
};

// src/tools/ask/fileExplorer.ts
var fsCache = /* @__PURE__ */ new Map();
var getPathContents = (path) => fsCache.get(path);
var loadPathContents = async (path) => {
  if (fsCache.has(path)) {
    return fsCache.get(path);
  }
  return forceLoadPathContents(path);
};
var forceLoadPathContents = async (path) => {
  let contents = { dirs: [], files: [] };
  try {
    const pathType = await getPathType(path);
    if (pathType === "d") {
      const lists = await Promise.all([findDirs(path), findFiles(path)]);
      const [dirs, files] = lists.map((list) => (0, import_swiss_ak10.sortNumberedText)(list)).map((list) => list.map((item) => item.replace(/\r|\n/g, " ")));
      contents = { ...contents, dirs, files };
    }
    if (pathType === "f") {
      const [stat2, probe] = await Promise.all([(0, import_swiss_ak10.tryOr)(void 0, () => fsP2.stat(path)), (0, import_swiss_ak10.tryOr)(void 0, () => getProbe(path))]);
      contents = { ...contents, info: { stat: stat2, probe } };
    }
  } catch (err) {
  }
  fsCache.set(path, contents);
  return contents;
};
var getPathType = async (path) => {
  const [isDir, isFile] = await Promise.all([isDirExist(path), isFileExist(path)]);
  return isDir ? "d" : isFile ? "f" : void 0;
};
var join = (...items) => {
  const result = items.join("/");
  return PathUtils_exports.removeDoubleSlashes(result || "/");
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
var getFEActionBar = (multi, pressed, disabled = []) => {
  const keyList = {
    single: ["move", "r", "f", "o", "return"],
    multi: ["move", "r", "f", "o", "space", "return"]
  }[multi ? "multi" : "single"];
  return getActionBar(keyList, keyActionDict, pressed, disabled);
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
  const category = getFileCategory(ext);
  const dispExt = ext.length % 2 === 0 ? ext : "." + ext;
  if (category === "image") {
    return out.left(
      `\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551  ${import_chalk8.default.whiteBright("\u2600")}  \u250C\u2500\u2500\u2500\u2500\u2510${import_chalk8.default.whiteBright("\u2600")}  \u2551
\u2551 ${import_chalk8.default.whiteBright("\u2600")}\u250C\u2500\u2500\u2524\u25AB\u25AB\u25AA\u25AB\u2502  ${import_chalk8.default.whiteBright("\u2600")}\u2551
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
  return import_swiss_ak10.fn.roundTo(0.01, size / Math.pow(1024, i)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};
var getFilePanel = (path, panelWidth, maxLines) => {
  var _a;
  const { filename, ext } = explodePath(path);
  const { stat: stat2, probe } = ((_a = getPathContents(path)) == null ? void 0 : _a.info) || {};
  const result = [];
  result.push(out.center(getFileIcon(ext), panelWidth));
  const category = getFileCategory(ext);
  result.push(out.center(out.wrap(filename, panelWidth), panelWidth));
  result.push(out.center(import_chalk8.default.dim(`${ext.toUpperCase()} ${category ? `${import_swiss_ak10.fn.capitalise(category)} ` : ""}File`), panelWidth));
  result.push(out.center(chlk.gray1("\u2500".repeat(Math.round(panelWidth * 0.75))), panelWidth));
  const now = Date.now();
  const addItem = (title, value, extra) => {
    result.push(out.split(`${import_chalk8.default.bold.dim(title)}`, `${value}${extra ? import_chalk8.default.dim(` (${import_chalk8.default.dim(extra)})`) : ""}`, panelWidth));
  };
  const addTimeItem = (title, time2, append) => {
    addItem(title, `${import_swiss_ak10.TimeUtils.toReadableDuration(now - time2, false, 2)}${append || ""}`);
  };
  if (stat2) {
    addItem(`Size`, `${humanFileSize(stat2.size)}`);
    addTimeItem(`Modified`, stat2.mtimeMs, " ago");
    addTimeItem(`Created`, stat2.ctimeMs, " ago");
  }
  if (probe) {
    if (["image", "video"].includes(category))
      addItem(`Dimensions`, `${probe.width}\xD7${probe.height}`);
    if (["video", "audio"].includes(category))
      addItem(`Duration`, import_swiss_ak10.TimeUtils.toReadableDuration((0, import_swiss_ak10.seconds)(probe.duration), false, 2));
    if (["video"].includes(category))
      addItem(`FPS`, `${probe.framerate}`);
  }
  const resultStr = out.left(out.wrap(result.join("\n"), panelWidth), panelWidth);
  return import_chalk8.default.white(out.utils.joinLines(out.utils.getLines(resultStr).slice(0, maxLines)));
};
var fileExplorerHandler = async (isMulti = false, isSave = false, question, selectType = "f", startPath = process.cwd(), suggestedFileName = "") => {
  const primaryWrapFn = import_chalk8.default.yellowBright;
  const cursorWrapFn = import_chalk8.default.bgYellow.black;
  const ancestralCursorWrapFn = import_chalk8.default.bgGray.black;
  const selectedIconWrapFn = import_chalk8.default.greenBright;
  const selectedWrapFn = import_chalk8.default.greenBright;
  const cursorOnSelectedWrapFn = import_chalk8.default.bgGreenBright.black;
  const minWidth = 25;
  const maxWidth = 25;
  const maxItems = 15;
  const maxColumns = Math.floor(out.utils.getTerminalWidth() / (maxWidth + 1));
  const accepted = isSave ? ["d", "f"] : [selectType];
  const lc = getLineCounter();
  const deferred = (0, import_swiss_ak10.getDeferred)();
  let cursor = startPath.split("/");
  const multiSelected = /* @__PURE__ */ new Set();
  let paths = [];
  let currentPath = "";
  let cursorType = "d";
  let pressed = void 0;
  let submitted = false;
  let loading3 = false;
  let locked = false;
  const recalc = () => {
    var _a;
    if (submitted)
      return;
    paths = cursor.map((f, index, all) => join(...all.slice(0, index + 1)));
    currentPath = paths[paths.length - 1];
    const isDir = ((_a = getPathContents(paths[paths.length - 2])) == null ? void 0 : _a.dirs.includes(explodePath(currentPath).filename)) || false;
    cursorType = isDir ? "d" : "f";
  };
  const loadEssentials = async (executeFn = loadPathContents) => {
    await Promise.all([
      import_swiss_ak10.PromiseUtils.each(paths, executeFn),
      (async () => {
        const { dirs } = await executeFn(currentPath);
        const list = dirs;
        return import_swiss_ak10.PromiseUtils.each(
          list.map((dir) => join(currentPath, dir)),
          executeFn
        );
      })(),
      (async () => {
        const parent = explodePath(currentPath).dir;
        const { dirs } = await executeFn(parent);
        const list = [...dirs];
        return import_swiss_ak10.PromiseUtils.each(
          list.map((dir) => join(parent, dir)),
          executeFn
        );
      })()
    ]);
  };
  const loadNewDepth = async () => {
    loading3 = true;
    display();
    await loadEssentials(loadPathContents);
    loading3 = false;
    display();
  };
  const loadNewItem = async () => {
    if (!getPathContents(currentPath)) {
      loading3 = true;
      display();
      await loadPathContents(currentPath);
      loading3 = false;
      display();
    } else {
      display();
    }
  };
  const setPressed = async (key) => {
    pressed = key;
    display();
    if (!key)
      return;
    await (0, import_swiss_ak10.wait)((0, import_swiss_ak10.milliseconds)(100));
    if (!loading3) {
      pressed = void 0;
      display();
    }
  };
  const display = async () => {
    if (submitted)
      return;
    recalc();
    const formatter = (symbol, regularWrapFn, selectedPrefix = " ", unselectedPrefix = " ") => (width, highlighted, isActiveColumn, columnPath) => (name, index, all) => {
      const isHighlighted = name === highlighted;
      const fullPath = join(columnPath, name);
      const isSelected = isMulti && multiSelected.has(fullPath);
      const prefix = isSelected ? selectedPrefix : unselectedPrefix;
      const template = (text2) => `${prefix}${text2} ${symbol} `;
      const extraChars = (0, import_string_width3.default)(template(""));
      const stretched = template(out.left(out.truncate(name, width - extraChars, "\u2026"), width - extraChars));
      let wrapFn = import_swiss_ak10.fn.noact;
      if (isHighlighted) {
        if (isActiveColumn) {
          wrapFn = isSelected ? cursorOnSelectedWrapFn : cursorWrapFn;
        } else {
          wrapFn = ancestralCursorWrapFn;
        }
      } else {
        wrapFn = isSelected ? selectedWrapFn : regularWrapFn;
      }
      return wrapFn(chlk.clear(stretched));
    };
    const { dir: formatDir, file: formatFile } = {
      single: {
        d: {
          dir: formatter("\u203A", chlk.gray5),
          file: formatter(" ", import_chalk8.default.dim)
        },
        f: {
          dir: formatter("\u203A", chlk.gray3),
          file: formatter(" ", chlk.gray5)
        },
        df: {
          dir: formatter("\u203A", chlk.gray5),
          file: formatter(" ", chlk.gray5)
        }
      },
      multi: {
        d: {
          dir: formatter("\u203A", chlk.gray5, ` ${selectedIconWrapFn(import_swiss_ak10.symbols.RADIO_FULL)} `, ` ${import_swiss_ak10.symbols.RADIO_EMPTY} `),
          file: formatter(" ", import_chalk8.default.dim, "   ", "   ")
        },
        f: {
          dir: formatter("\u203A", chlk.gray3, "   ", "   "),
          file: formatter(" ", chlk.gray5, ` ${selectedIconWrapFn(import_swiss_ak10.symbols.RADIO_FULL)} `, ` ${import_swiss_ak10.symbols.RADIO_EMPTY} `)
        },
        df: {
          dir: formatter("\u203A", chlk.gray5, "   ", "   "),
          file: formatter(" ", chlk.gray5, ` ${selectedIconWrapFn(import_swiss_ak10.symbols.RADIO_FULL)} `, ` ${import_swiss_ak10.symbols.RADIO_EMPTY} `)
        }
      }
    }[isMulti ? "multi" : "single"][accepted.join("")];
    const emptyColumn = [" ".repeat(minWidth), ..." ".repeat(maxItems - 1).split("")];
    const allColumns = paths.map(getPathContents).map((contents, index) => {
      const dirs = (contents == null ? void 0 : contents.dirs) || [];
      const files = (contents == null ? void 0 : contents.files) || [];
      const list = [...dirs, ...files];
      const contentWidth = Math.max(...list.map((s) => s.length));
      const width = Math.max(minWidth, Math.min(contentWidth, maxWidth));
      const highlighted = cursor[index + 1];
      const highlightedIndex = list.indexOf(highlighted);
      const isActiveCol = index + 2 === cursor.length;
      const columnPath = paths[index];
      const formattedLines = [
        ...dirs.map(formatDir(width, highlighted, isActiveCol, columnPath)),
        ...files.map(formatFile(width, highlighted, isActiveCol, columnPath))
      ];
      if (formattedLines.length > maxItems) {
        const startIndex = Math.max(0, highlightedIndex - maxItems + 2);
        const isScrollUp = startIndex > 0;
        const isScrollDown = startIndex + maxItems < formattedLines.length;
        const slicedLines = formattedLines.slice(startIndex, startIndex + maxItems);
        const fullWidth = (0, import_string_width3.default)(formatDir(width, "", false, "")(""));
        if (isScrollUp)
          slicedLines[0] = import_chalk8.default.dim(out.center("\u2191" + " ".repeat(Math.floor(width / 2)) + "\u2191", fullWidth));
        if (isScrollDown)
          slicedLines[slicedLines.length - 1] = import_chalk8.default.dim(out.center("\u2193" + " ".repeat(Math.floor(width / 2)) + "\u2193", fullWidth));
        return out.utils.joinLines(slicedLines);
      }
      return out.utils.joinLines([...formattedLines, ...emptyColumn].slice(0, maxItems));
    });
    if (cursorType === "f") {
      allColumns[allColumns.length - 1] = getFilePanel(currentPath, minWidth, maxItems);
    }
    const columns = [...allColumns.slice(-maxColumns), ...import_swiss_ak10.ArrayUtils.repeat(maxColumns, out.utils.joinLines(emptyColumn))].slice(0, maxColumns);
    const termWidth = out.utils.getTerminalWidth();
    const tableLines = table.getLines([columns], void 0, {
      wrapLinesFn: chlk.gray1,
      drawOuter: true,
      cellPadding: 0,
      truncate: "",
      maxWidth: Infinity
    });
    const tableOut = out.center(out.limitToLengthStart(tableLines.join("\n"), termWidth - 1), termWidth);
    const tableWidth = (0, import_string_width3.default)(tableLines[Math.floor(tableLines.length / 2)]);
    const infoLine = (() => {
      if (loading3) {
        return import_chalk8.default.dim(out.center("=".repeat(20) + " Loading... " + "=".repeat(20)));
      }
      const count = isMulti ? import_chalk8.default.dim(`${chlk.gray1("[")} ${multiSelected.size} selected ${chlk.gray1("]")} `) : "";
      const curr = out.limitToLengthStart(
        `${currentPath} ${import_chalk8.default.dim(`(${{ f: "File", d: "Directory" }[cursorType]})`)}`,
        tableWidth - ((0, import_string_width3.default)(count) + 3)
      );
      const split2 = out.split(curr, count, tableWidth - 2);
      return out.center(split2, termWidth);
    })();
    const actionBar = getFEActionBar(isMulti, pressed);
    lc.clear();
    lc.wrap(1, () => imitate(false, question, " "));
    lc.log();
    lc.log(infoLine);
    lc.log(tableOut);
    lc.log(actionBar);
  };
  const userActions = {
    moveVertical: (direction) => {
      const folds = cursor.slice(0, -1);
      const current = cursor[cursor.length - 1];
      const currContents = getPathContents(paths[folds.length - 1]);
      if (!currContents)
        return;
      const list = [...currContents.dirs, ...currContents.files];
      const currIndex = list.indexOf(current);
      const nextIndex = (list.length + currIndex + direction) % list.length;
      const nextValue = list[nextIndex];
      cursor = [...folds, nextValue];
      loadNewItem();
    },
    moveRight: () => {
      const current = cursor[cursor.length - 1];
      const currContents = getPathContents(paths[cursor.length - 2]);
      const nextContents = getPathContents(paths[cursor.length - 1]);
      if (!currContents || !nextContents || currContents.dirs.includes(current) === false)
        return;
      const nextList = [...nextContents.dirs, ...nextContents.files];
      if (!nextList.length)
        return;
      cursor = [...cursor, nextList[0]];
      loadNewDepth();
    },
    moveLeft: () => {
      if (cursor.length <= 2)
        return;
      cursor = cursor.slice(0, -1);
      loadNewDepth();
    },
    refresh: async () => {
      if (loading3)
        return;
      loading3 = true;
      locked = true;
      setPressed("r");
      const allKeys = Array.from(fsCache.keys());
      const restKeys = new Set(allKeys);
      await loadEssentials((path) => {
        restKeys.delete(path);
        return forceLoadPathContents(path);
      });
      display();
      loading3 = false;
      locked = false;
      if (pressed === "r")
        setPressed(void 0);
      await import_swiss_ak10.PromiseUtils.eachLimit(32, Array.from(restKeys), async () => {
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
        setPressed("space");
      }
    },
    takeInput: async (preQuestion, inputFn, postQuestion) => {
      display();
      loading3 = true;
      locked = true;
      kl.stop();
      lc.clearBack(1);
      await preQuestion();
      const value = await inputFn();
      const skipDisplay = postQuestion ? await postQuestion(value) ?? false : false;
      if (!skipDisplay)
        display();
      kl.start();
      loading3 = false;
      locked = false;
      return value;
    },
    newFolder: async () => {
      const basePath = cursorType === "f" ? paths[paths.length - 2] : currentPath;
      await userActions.takeInput(
        () => {
          const info2 = chlk.gray3("Enter nothing to cancel");
          const info1Prefix = chlk.gray3("  Adding folder to ");
          const maxValWidth = out.utils.getTerminalWidth() - ((0, import_string_width3.default)(info1Prefix) + (0, import_string_width3.default)(info2));
          const info1Value = chlk.gray4(out.truncateStart(PathUtils_exports.trailSlash(basePath), maxValWidth));
          const info1 = info1Prefix + info1Value;
          lc.log(out.split(info1, info2, out.utils.getTerminalWidth() - 2));
        },
        () => lc.wrap(1, () => text(`What do you want to ${primaryWrapFn("name")} the new folder?`, "")),
        async (newFolderName) => {
          const newFolderPath = join(basePath, newFolderName);
          if (newFolderName !== "") {
            await mkdir2(newFolderPath);
          }
          display();
          await Promise.all([forceLoadPathContents(basePath), forceLoadPathContents(newFolderPath)]);
          return;
        }
      );
    },
    openFinder: async () => {
      const dir = cursorType === "f" ? paths[paths.length - 2] : currentPath;
      await open(dir);
    },
    submit: () => {
      return isSave ? userActions.submitSave() : userActions.submitSelect();
    },
    submitSave: async () => {
      const initCursor = cursorType === "f" ? cursor[cursor.length - 1] : "";
      const initSugg = suggestedFileName;
      const initStart = startPath && await getPathType(startPath) === "f" ? explodePath(startPath).filename : "";
      const initial = initCursor || initSugg || initStart || "";
      const basePath = cursorType === "f" ? paths[paths.length - 2] : currentPath;
      const newFileName = await userActions.takeInput(
        () => {
          lc.log(chlk.gray3("  Saving file to ") + chlk.gray4(out.truncateStart(PathUtils_exports.trailSlash(basePath), out.utils.getTerminalWidth() - 20)));
        },
        () => lc.wrap(1, () => text(`What do you want to ${primaryWrapFn("name")} the file?`, initial)),
        () => true
      );
      submitted = true;
      kl.stop();
      lc.clear();
      const result = join(basePath, newFileName);
      imitate(true, question, result);
      return deferred.resolve([result]);
    },
    submitSelect: () => {
      if (!accepted.includes(cursorType))
        return;
      submitted = true;
      setPressed("return");
      kl.stop();
      lc.clear();
      if (isMulti) {
        const result = Array.from(multiSelected);
        imitate(true, question, result);
        return deferred.resolve(result);
      } else {
        const result = currentPath;
        imitate(true, question, result);
        return deferred.resolve([currentPath]);
      }
    }
  };
  const kl = getKeyListener((key) => {
    if (locked)
      return;
    switch (key) {
      case "up":
        return userActions.moveVertical(-1);
      case "down":
        return userActions.moveVertical(1);
      case "right":
        return userActions.moveRight();
      case "left":
        return userActions.moveLeft();
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
  loadNewDepth();
  return deferred.promise;
};
var fileExplorer = async (questionText, selectType = "f", startPath = process.cwd()) => {
  const arr = await fileExplorerHandler(false, false, questionText, selectType, startPath);
  return arr[0];
};
var multiFileExplorer = (questionText, selectType = "f", startPath = process.cwd()) => fileExplorerHandler(true, false, questionText, selectType, startPath);
var saveFileExplorer = async (questionText, startPath = process.cwd(), suggestedFileName = "") => {
  const arr = await fileExplorerHandler(false, true, questionText, "f", startPath, suggestedFileName);
  return arr[0];
};

// src/tools/ask/section.ts
var import_swiss_ak11 = require("swiss-ak");
var separator = (version = "down", spacing = 8, offset = 0, width = out.utils.getTerminalWidth() - 2) => {
  const lineChar = "\u2504";
  const chars = {
    down: "\u25BF",
    none: "\u25E6",
    up: "\u25B5"
  };
  const line = import_swiss_ak11.ArrayUtils.repeat(Math.floor(width / spacing) - offset, chars[version]).join(lineChar.repeat(spacing - 1));
  console.log(chlk.gray1(out.center(line, void 0, lineChar)));
  return 1;
};
var section = async (question, sectionFn, ...questionFns) => {
  const lc = getLineCounter();
  const sep = () => lc.add(separator("none", void 0, 1));
  if (sectionFn) {
    lc.add(separator("down"));
    await sectionFn(lc, sep);
    lc.add(separator("up"));
  }
  const results = [];
  if (questionFns.length) {
    for (let questionFn of questionFns) {
      const checkpoint = lc.checkpoint();
      results.push(await lc.wrap(1, () => questionFn(question, results, lc, sep)));
      lc.clearToCheckpoint(checkpoint);
    }
  }
  lc.clear();
  if (question) {
    let resultOut = "done";
    if (results.length === 1) {
      resultOut = results[0];
    }
    if (results.length > 1) {
      if (typeof results[0] === "boolean") {
        resultOut = results[0];
      }
      resultOut = results;
    }
    imitate(true, question, resultOut);
  }
  return results;
};

// src/tools/ask/datetime.ts
var import_chalk11 = __toESM(require("chalk"), 1);
var import_swiss_ak16 = require("swiss-ak");

// src/utils/dynDates.ts
var import_swiss_ak12 = require("swiss-ak");
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
var sortDynDates = (dates) => (0, import_swiss_ak12.sortByMapped)(dates, (value) => Number(dynDateToDate(value)));
var isSameMonth = (aDate, bDate) => aDate[0] === bDate[0] && aDate[1] === bDate[1];
var isEqualDynDate = (aDate, bDate) => isSameMonth(aDate, bDate) && aDate[2] === bDate[2];
var getWeekday = (date2) => (Math.floor(dynDateToDate(date2).getTime() / import_swiss_ak12.DAY) + 3) % 7;
var getDaysInMonth = (year, month, _dy) => {
  if (month !== 2)
    return [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
};
var correctDate = ([inYr, inMo, inDy]) => {
  const outYr = Math.abs(notNaN(inYr)) === 0 ? 1 : inYr;
  const outMo = import_swiss_ak12.fn.clamp(notNaN(inMo), 1, 12);
  const daysInMonth = getDaysInMonth(outYr, outMo);
  const outDy = import_swiss_ak12.fn.clamp(notNaN(inDy), 1, daysInMonth);
  return [outYr, outMo, outDy];
};
var addMonths = ([yr, mo, dy], add = 1) => {
  const total = yr * 12 + (mo - 1) + add;
  return correctDate([Math.floor(total / 12), total % 12 + 1, dy]);
};
var addDays = ([yr, mo, dy], add = 1) => {
  const date2 = dynDateToDate([yr, mo, dy]);
  const newDate = date2.getTime() + (0, import_swiss_ak12.days)(add);
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
var import_swiss_ak13 = require("swiss-ak");
var getNumberInputter = (timeout = (0, import_swiss_ak13.seconds)(1.5)) => {
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
var import_chalk10 = __toESM(require("chalk"), 1);
var import_string_width4 = __toESM(require("string-width"), 1);
var import_swiss_ak14 = require("swiss-ak");

// src/tools/ask/datetime/styles.ts
var import_chalk9 = __toESM(require("chalk"), 1);
var sectionStyles = {
  sectActive: {
    dark: chlk.gray1,
    mid: chlk.gray3,
    normal: import_chalk9.default.white,
    tertiary: import_chalk9.default.yellowBright,
    secondary: import_chalk9.default.bgWhite.black,
    primary: import_chalk9.default.bgYellow.black
  },
  sectInactive: {
    dark: chlk.gray1,
    mid: chlk.gray2,
    normal: chlk.gray3,
    tertiary: import_chalk9.default.yellow,
    secondary: import_chalk9.default.bgGray.black,
    primary: import_chalk9.default.bgWhite.black
  }
};
var getStyles = (active) => active ? sectionStyles.sectActive : sectionStyles.sectInactive;

// src/tools/ask/datetime/date.ts
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
var NUM_OF_ROWS = 6;
var getMonthCells = (year, month, _dy) => {
  const startWeekDay = getWeekday([year, month, 1]);
  const thisMonthMax = getDaysInMonth(year, month);
  const prevMonthMax = getDaysInMonth(...addMonths([year, month, 1], -1));
  const thisMonth = (0, import_swiss_ak14.range)(thisMonthMax, 1, 1);
  const prevMonth = (0, import_swiss_ak14.range)(prevMonthMax, -1, -1);
  const nextMonth = (0, import_swiss_ak14.range)(28, -1, -1);
  const allCells = [...startWeekDay ? prevMonth.slice(-startWeekDay) : [], ...thisMonth, ...nextMonth];
  const byRow = (0, import_swiss_ak14.range)(NUM_OF_ROWS, 7).map((start) => allCells.slice(start, start + 7));
  return byRow;
};
var getMonthTable = (active, cursors, selected, isRange, slice, year, month, _dy) => {
  const styles = getStyles(active);
  const selCursor = cursors[selected];
  const monthCells = getMonthCells(year, month);
  const coors = monthCells.map((row, y) => row.map((val, x) => [x, y, val])).flat();
  const nonMonthCoors = coors.filter(([x, y, val]) => val < 0);
  const formatNonMonth = nonMonthCoors.map(([x, y]) => table.utils.getFormat(styles.mid, y, x));
  const formatDim = [...formatNonMonth, table.utils.getFormat(styles.normal, void 0, void 0, true)];
  const formatCursor = [];
  if (isSameMonth([year, month, 1], selCursor)) {
    const selCursorCoor = [coors.find(([x, y, val]) => val === selCursor[2])];
    formatCursor.push(...selCursorCoor.map(([x, y]) => table.utils.getFormat((s) => import_chalk10.default.reset(styles.primary(s)), y, x)));
  }
  if (isRange) {
    const otherCursor = cursors[selected === 0 ? 1 : 0];
    if (isSameMonth([year, month, 1], otherCursor)) {
      const otherCursorCoor = coors.find(([x, y, val]) => val === otherCursor[2]);
      formatCursor.push(table.utils.getFormat((s) => import_chalk10.default.reset(styles.secondary(s)), otherCursorCoor[1], otherCursorCoor[0]));
    }
    const inter = getIntermediaryDates(cursors[0], cursors[1]);
    const interNums = inter.filter((i) => isSameMonth([year, month, 1], i)).map(([yr, mo, dy]) => dy);
    const interCoors = coors.filter(([x, y, val]) => interNums.includes(val));
    const formatInter = interCoors.map(([x, y]) => table.utils.getFormat(styles.tertiary, y, x));
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
    wrapLinesFn: styles.mid,
    overrideHorChar: "\u2500",
    cellPadding: 0
  });
  const monthWidth = (0, import_string_width4.default)(lines[0]);
  const dispYear = (0, import_string_width4.default)(lines[0]) > 20 ? ` ${year}` : "";
  const dispMonth = monthNames[month - 1].slice(0, (0, import_string_width4.default)(lines[0]) - 2);
  const getTitle = (text2, prefix, suffix) => {
    const resPrefix = active ? styles.dark(prefix) : "";
    const resSuffix = active ? styles.dark(suffix) : "";
    const resText = out.center(styles.normal(text2), monthWidth - ((0, import_string_width4.default)(resPrefix) + (0, import_string_width4.default)(resSuffix)));
    return `${resPrefix}${resText}${resSuffix}`;
  };
  const titleYear = active ? getTitle(dispYear, "     \u25C0 Q", "E \u25B6     ") : out.center(styles.dark(dispYear), monthWidth);
  const titleMonth = getTitle(dispMonth, "  \u25C0 A", "D \u25B6  ");
  return {
    table: [titleYear, titleMonth, ...lines],
    coors
  };
};
var dateHandler = (isActive, initial, displayCb, isRange = false) => {
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
  const recalc = (skipDisplay = false) => {
    prevMonth = addMonths(cursors[selected], -1);
    nextMonth = addMonths(cursors[selected], 1);
    currMonthDays = getDaysInMonth(...cursors[selected]);
    if (!skipDisplay) {
      display();
    }
  };
  const setCursor = (newCursor, skipDisplay = false) => {
    cursors[selected] = newCursor;
    recalc(skipDisplay);
  };
  const display = () => {
    const sliceAmount = out.getResponsiveValue([{ minColumns: 130, value: 7 }, { minColumns: 100, value: 3 }, { value: 0 }]);
    tables.actv = getMonthTable(active, cursors, selected, isRange, [0, 10], ...cursors[selected]);
    tables.prev = getMonthTable(false, cursors, selected, isRange, [7 - sliceAmount, 10], ...prevMonth);
    tables.next = getMonthTable(false, cursors, selected, isRange, [0, sliceAmount], ...nextMonth);
    displayCb(out.concatLineGroups(tables.prev.table, tables.actv.table, tables.next.table));
  };
  const userActions = {
    setDate: (date2) => setCursor([cursors[selected][0], cursors[selected][1], date2]),
    switchSelected: () => {
      selected = (selected + 1) % MAX_SELECTED;
      recalc();
    },
    moveMonth: (dir) => setCursor(addMonths(cursors[selected], dir)),
    moveYear: (dir) => setCursor(addMonths(cursors[selected], dir * 12)),
    moveHor: (dir) => {
      const [yr, mo, dy] = cursors[selected];
      const currWeekday = getWeekday(cursors[selected]);
      if (dir < 0 && currWeekday > 0 || dir > 0 && currWeekday < 6) {
        return setCursor(addDays(cursors[selected], dir));
      }
      const [currCol, currRow] = tables.actv.coors.find(([x, y, val]) => val === dy);
      const newRow = currRow;
      const newCol = (7 + currCol + dir) % 7;
      const newMonthCoors = [tables.prev.coors, tables.next.coors][Number(dir > 0)];
      let [_x, _y, newDay] = newMonthCoors.find(([x, y]) => x === newCol && y === newRow);
      const [newYear, newMonth] = addMonths(cursors[selected], dir);
      if (newDay < 0)
        newDay = dir > 0 ? 1 : getDaysInMonth(newYear, newMonth);
      return setCursor(correctDate([newYear, newMonth, newDay]));
    },
    moveVer: (dir) => setCursor(addDays(cursors[selected], dir * 7))
  };
  setCursor(initial[0], true);
  const result = {
    getValue: () => isRange ? sortDynDates(cursors) : cursors,
    setActive: (isActive2) => {
      active = isActive2;
      display();
    },
    triggerDisplay: () => display(),
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
var import_swiss_ak15 = require("swiss-ak");
var getSingleTimeDial = (value, sectionActive, dialActive, max, label) => {
  const wrappers = getStyles(sectionActive);
  const wrapFns = [wrappers.mid, wrappers.normal, dialActive ? wrappers.primary : wrappers.secondary];
  const showExtra = wrapFns.length - 1;
  const dialNums = (0, import_swiss_ak15.range)(showExtra * 2 + 1, void 0, value - showExtra).map((v) => (v + max) % max);
  const dial = rightLines(dialNums.map((v, i) => wrapFns[Math.min(i, dialNums.length - i - 1)](` ${(v + "").padStart(2)} `)));
  const lines = centerLines([wrappers.normal(label), wrappers.dark("\u25E2\u25E3"), ...dial, wrappers.dark("\u25E5\u25E4")], 4);
  return lines;
};
var timeHandler = (isActive, initial, displayCb) => {
  const MAX_COL = 2;
  const MAX_VALUES = [24, 60, 60];
  const labels = ["hh", "mm", "ss"];
  let current = [...initial];
  let cursor = 0;
  let active = isActive;
  const display = () => {
    const dials = current.map((v, i) => getSingleTimeDial(v, active, active && i === cursor, MAX_VALUES[i], labels[i]));
    const lines = out.concatLineGroups(...dials);
    const padded = centerLines(lines);
    displayCb(padded);
  };
  const userActions = {
    set: (val) => {
      const max = MAX_VALUES[cursor];
      current[cursor] = (max + val) % max;
      display();
    },
    moveHor: (dir) => {
      cursor = (MAX_COL + cursor + dir) % MAX_COL;
      display();
    },
    moveVer: (dir) => {
      const max = MAX_VALUES[cursor];
      current[cursor] = (max + current[cursor] + dir) % max;
      display();
    }
  };
  const result = {
    getValue: () => current,
    setActive: (isActive2) => {
      active = isActive2;
      display();
    },
    triggerDisplay: () => display(),
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

// src/tools/ask/datetime.ts
var DEBUG_TIMER = (0, import_swiss_ak16.getTimer)("DEBUG", false, import_chalk11.default.red, import_chalk11.default);
var IS_DEBUG = false;
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
var getDTActionBar = (isDateOn, isTimeOn, isRange, active) => {
  const keys = [
    isDateOn && !isTimeOn && isRange ? "tab-range" : void 0,
    isDateOn && isTimeOn && !isRange ? "tab-section" : void 0,
    ...active === "date" ? ["nums-date", "move-date", "qead-date"] : [],
    ...active === "time" ? ["nums-time", "move-time-ver", "move-time-hor"] : []
  ].filter((id) => id && actionConfig[id]);
  return getActionBar(keys, actionConfig);
};
var getCurrDynDate = () => dateToDynDate(new Date());
var getCurrDynTime = () => {
  const now = new Date();
  return [now.getHours(), now.getMinutes()];
};
var displayDate = (ddate) => dynDateToDate(ddate).toDateString();
var displayTime = (dtime) => dtime.map((v) => (v + "").padStart(2, "0")).join(":");
var getStateDisplay = (handlers, isDateOn, isTimeOn, isRange) => {
  const [start, end] = isDateOn ? handlers.date.getValue() : [];
  const time2 = isTimeOn ? handlers.time.getValue() : void 0;
  const dateStr = isDateOn ? isRange ? `${displayDate(start)} \u2192 ${displayDate(end)}` : displayDate(start) : void 0;
  const timeStr = isTimeOn ? displayTime(time2) : void 0;
  return [dateStr, timeStr].filter((v) => v).join(" @ ");
};
var overallHandler = (questionText = "Please pick a date:", isDateOn, isTimeOn, isRange, initialDate = [getCurrDynDate(), isRange ? getCurrDynDate() : getCurrDynDate()], initialTime = getCurrDynTime()) => {
  const lc = getLineCounter();
  const deferred = (0, import_swiss_ak16.getDeferred)();
  const isSwitchable = isDateOn && isTimeOn;
  let activeHandler = isDateOn ? "date" : "time";
  const displayCache = { date: [], time: [] };
  const onDisplay = (key) => (lines) => {
    DEBUG_TIMER.start("overall display");
    displayCache[key] = lines;
    const { date: date2, time: time2 } = displayCache;
    const sections = [];
    if (date2.length)
      sections.push(date2);
    if (date2.length && time2.length)
      sections.push(centerLines([""], 8));
    if (time2.length)
      sections.push(date2.length ? centerLines(["", "", ...time2]) : time2);
    const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange);
    const outMain = out.center(out.utils.joinLines(sections.length ? out.concatLineGroups(...sections) : sections[0]), void 0, void 0, false);
    const outAction = getDTActionBar(isDateOn, isTimeOn, isRange, activeHandler);
    lc.clear();
    lc.wrap(1, () => imitate(false, questionText, outState));
    lc.log();
    lc.log(outMain);
    lc.log();
    lc.log(outAction);
    if (IS_DEBUG) {
      lc.add(DEBUG_TIMER.log());
    }
    DEBUG_TIMER.reset();
  };
  const handlers = {
    date: isDateOn && dateHandler(activeHandler === "date", initialDate, onDisplay("date"), isRange) || void 0,
    time: isTimeOn && timeHandler(activeHandler === "time", initialTime, onDisplay("time")) || void 0
  };
  const eachHandler = (cb) => Object.entries(handlers).filter(([key, handler]) => handler).forEach(([key, handler]) => cb(key, handler));
  const switchActive = () => {
    if (isSwitchable) {
      activeHandler = activeHandler === "date" ? "time" : "date";
      eachHandler((key, handler) => handler.setActive(key === activeHandler));
    }
  };
  const submit = () => {
    var _a, _b;
    const dates = (_a = handlers.date) == null ? void 0 : _a.getValue();
    const time2 = (_b = handlers.time) == null ? void 0 : _b.getValue();
    const outState = getStateDisplay(handlers, isDateOn, isTimeOn, isRange);
    kl.stop();
    lc.clear();
    imitate(false, questionText, outState);
    deferred.resolve([dates, time2]);
  };
  const numberInputter = getNumberInputter();
  const kl = getKeyListener((key) => {
    DEBUG_TIMER.start("since keypress");
    switch (key) {
      case "tab":
        numberInputter.reset();
        if (isDateOn && !isTimeOn && isRange && activeHandler === "date") {
          return handlers.date.inputKey(key, void 0);
        }
        return switchActive();
      case "return":
        numberInputter.reset();
        return submit();
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
  eachHandler((key, handler) => handler.triggerDisplay());
  return deferred.promise;
};
var date = async (questionText, initial) => {
  const initDateObj = initial || new Date();
  const initDate = dateToDynDate(initDateObj);
  const [[ddate]] = await overallHandler(questionText, true, false, false, [initDate, initDate]);
  return dynDateToDate(ddate);
};
var time = async (questionText, initial) => {
  const initDateObj = initial || new Date();
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);
  const [_d, dtime] = await overallHandler(questionText, false, true, false, [initDate, initDate], initTime);
  return dynDateToDate(dateToDynDate(initDateObj), dtime);
};
var datetime = async (questionText, initial) => {
  const initDateObj = initial || new Date();
  const initDate = dateToDynDate(initDateObj);
  const initTime = dateToDynTime(initDateObj);
  const [[ddate], dtime] = await overallHandler(questionText, true, true, false, [initDate, initDate], initTime);
  return dynDateToDate(ddate, dtime);
};
var dateRange = async (questionText, initialStart, initialEnd) => {
  const initDateObj1 = initialStart || new Date();
  const initDateObj2 = initialEnd || new Date();
  const initDate = [dateToDynDate(initDateObj1), dateToDynDate(initDateObj2)];
  const [[ddate1, ddate2]] = await overallHandler(questionText, true, false, true, initDate);
  return [dynDateToDate(ddate1), dynDateToDate(ddate2)];
};

// src/tools/ask/table.ts
var table_exports = {};
__export(table_exports, {
  multiselect: () => multiselect,
  select: () => select
});
var import_swiss_ak17 = require("swiss-ak");
var import_chalk12 = __toESM(require("chalk"), 1);
var highlightFn = import_chalk12.default.cyan.underline;
var askTableHandler = (isMulti, question, items, initial = [], rows, headers = [], tableOptions = {}) => {
  const questionText = typeof question === "string" ? question : question.get();
  const lc = getLineCounter();
  const deferred = (0, import_swiss_ak17.getDeferred)();
  let activeIndex = initial[0] !== void 0 ? typeof initial[0] === "number" ? initial[0] : items.indexOf(initial[0]) : 0;
  let selectedIndexes = initial.map((i) => typeof i === "number" ? i : items.indexOf(i)).filter((i) => i !== -1);
  lc.add(imitate(false, questionText, `- Use arrow-keys. ${isMulti ? "Space to select. " : ""}Enter to ${isMulti ? "confirm" : "select"}.`));
  lc.checkpoint("AFTER_Q");
  let lastDrawnRows = [];
  const drawTable = () => {
    const tableOpts = {
      margin: [1, 0, 0, 0],
      ...tableOptions,
      format: [
        { formatFn: highlightFn, isBody: true, isHeader: false, row: activeIndex },
        ...tableOptions.format || []
      ]
    };
    let body;
    let header;
    if (rows) {
      body = typeof rows === "function" ? items.map(rows) : rows;
      header = headers;
    } else {
      const isHeaderObj = headers && !(headers instanceof Array);
      const objTable = table.utils.objectsToTable(items, isHeaderObj ? headers : void 0);
      body = objTable.body;
      header = isHeaderObj ? objTable.header : headers;
    }
    const finalBody = body.map((row, index) => {
      let firstCell;
      if (isMulti) {
        const selectedSym = import_swiss_ak17.symbols.RADIO_FULL;
        const unselectedSym = import_swiss_ak17.symbols.RADIO_EMPTY;
        firstCell = selectedIndexes.includes(index) ? import_chalk12.default.reset(import_chalk12.default.green(selectedSym)) : import_chalk12.default.reset(unselectedSym);
      } else {
        firstCell = body.indexOf(row) === activeIndex ? import_chalk12.default.reset(import_chalk12.default.cyan(import_swiss_ak17.symbols.CURSOR)) : " ";
      }
      return [firstCell, ...row];
    });
    const finalHeaders = header.length ? header.map((row) => ["", ...row]) : [];
    lastDrawnRows = finalBody;
    lc.clearToCheckpoint("AFTER_Q");
    lc.add(table.print(finalBody, finalHeaders, tableOpts));
    lc.checkpoint("AFTER_TABLE");
  };
  drawTable();
  const move = (dir) => {
    activeIndex = (items.length + activeIndex + dir) % items.length;
    drawTable();
  };
  const toggle = () => {
    if (isMulti) {
      if (selectedIndexes.includes(activeIndex)) {
        selectedIndexes = selectedIndexes.filter((i) => i !== activeIndex);
      } else {
        selectedIndexes.push(activeIndex);
      }
    }
    drawTable();
  };
  const submit = () => {
    kl.stop();
    const results = (isMulti ? selectedIndexes.map((i) => items[i]) : [items[activeIndex]]).filter(import_swiss_ak17.fn.isTruthy);
    lc.clear();
    imitate(true, questionText, isMulti ? `${results.length} selected` : results[0]);
    deferred.resolve(results);
  };
  const listenCallback = (key) => {
    switch (key) {
      case "up":
        return move(-1);
      case "down":
        return move(1);
      case "space":
        return toggle();
      case "return":
        return submit();
    }
  };
  const kl = getKeyListener(listenCallback, true);
  return deferred.promise;
};
var select = async (question, items, initial, rows, headers, tableOptions) => {
  const results = await askTableHandler(false, question, items, [initial], rows, headers, tableOptions);
  return results[0];
};
var multiselect = (question, items, initial, rows, headers, tableOptions) => askTableHandler(true, question, items, initial, rows, headers, tableOptions);

// src/tools/ask.ts
var PROMPT_VALUE_PROPERTY = "SWISS_ZX_PROMPT_VALUE";
var promptsOptions = {
  onCancel() {
    process.exit(0);
  }
};
var text = async (question, initial) => {
  const message = typeof question === "string" ? question : question.get();
  const response = await (0, import_prompts.default)(
    {
      type: "text",
      name: PROMPT_VALUE_PROPERTY,
      message,
      initial
    },
    promptsOptions
  );
  return "" + response[PROMPT_VALUE_PROPERTY];
};
var autotext = async (question, choices, initial, choiceLimit = 10) => {
  const message = typeof question === "string" ? question : question.get();
  let response = {};
  const choiceObjs = choices.map((choice) => typeof choice === "object" ? choice : { title: choice, value: choice });
  let initialId = 0;
  if (initial) {
    initialId = (choiceObjs || []).map((x) => x && x.value ? x.value : x).indexOf(initial);
    if (initialId < 0)
      initialId = typeof initial === "string" ? initial : 0;
  }
  const fuzzy = new import_fuse.default(choiceObjs, {
    includeScore: false,
    keys: ["title", "value"]
  });
  response = await (0, import_prompts.default)(
    {
      type: "autocomplete",
      name: PROMPT_VALUE_PROPERTY,
      choices: choiceObjs,
      message,
      limit: choiceLimit,
      initial: initialId,
      suggest: async (text2, ch) => {
        const filtered = fuzzy.search(text2);
        const list = text2 ? filtered.map(({ item }) => item) : choiceObjs;
        return list;
      }
    },
    promptsOptions
  );
  return response[PROMPT_VALUE_PROPERTY];
};
var number = async (question, initial = 1) => {
  const message = typeof question === "string" ? question : question.get();
  const response = await (0, import_prompts.default)(
    {
      type: "number",
      name: PROMPT_VALUE_PROPERTY,
      message,
      initial
    },
    promptsOptions
  );
  return Number(response[PROMPT_VALUE_PROPERTY]);
};
var boolean = async (question, initial = true, yesTxt = "yes", noTxt = "no") => {
  const message = typeof question === "string" ? question : question.get();
  const response = await (0, import_prompts.default)(
    {
      type: "toggle",
      name: PROMPT_VALUE_PROPERTY,
      message,
      initial: !initial,
      active: noTxt,
      inactive: yesTxt
    },
    promptsOptions
  );
  return !Boolean(response[PROMPT_VALUE_PROPERTY]);
};
var booleanAlt = async (question, initial = true) => {
  const message = typeof question === "string" ? question : question.get();
  const response = await (0, import_prompts.default)(
    {
      type: "confirm",
      name: PROMPT_VALUE_PROPERTY,
      message,
      initial
    },
    promptsOptions
  );
  return Boolean(response[PROMPT_VALUE_PROPERTY]);
};
var select2 = async (question, choices, initial) => {
  const message = typeof question === "string" ? question : question.get();
  const choiceObjs = choices.map((choice) => typeof choice === "object" ? choice : { title: choice, value: choice });
  let initialId = 0;
  if (initial) {
    initialId = (choiceObjs || []).map((x) => x && x.value ? x.value : x).indexOf(initial);
    if (initialId < 0)
      initialId = 0;
  }
  const response = await (0, import_prompts.default)(
    {
      type: "select",
      name: PROMPT_VALUE_PROPERTY,
      message,
      choices: choiceObjs,
      initial: initialId
    },
    promptsOptions
  );
  const value = response[PROMPT_VALUE_PROPERTY];
  return typeof value === "number" ? choiceObjs[value] : value;
};
var multiselect2 = async (question, choices, initial, canSelectAll = false) => {
  const message = typeof question === "string" ? question : question.get();
  if (!choices || choices.length === 0) {
    return [];
  }
  let choiceObjs = choices.map((choice) => typeof choice === "object" ? choice : { title: choice, value: choice });
  if (initial) {
    const initialSelected = [initial].flat();
    choiceObjs = choiceObjs.map((choice) => ({
      selected: Boolean(initialSelected.find((x) => x === choice || x === choice.value)),
      ...choice
    }));
  }
  if (canSelectAll) {
    choiceObjs = [{ title: chlk.gray4("[Select all]"), value: "***SELECT_ALL***" }, ...choiceObjs];
  }
  const response = await (0, import_prompts.default)(
    {
      type: "multiselect",
      name: PROMPT_VALUE_PROPERTY,
      instructions: false,
      message,
      choices: choiceObjs
    },
    promptsOptions
  );
  const result = response[PROMPT_VALUE_PROPERTY] ? response[PROMPT_VALUE_PROPERTY] : [];
  let selected = result.map((value) => typeof value === "number" ? choiceObjs[value] : value);
  if (selected.includes("***SELECT_ALL***")) {
    selected = choiceObjs.map((choice) => choice.value).filter((value) => !(value + "").startsWith("***") && !(value + "").endsWith("***"));
  }
  return selected;
};
var crud = async (question, itemName = "item", items, options = {}) => {
  const fullOptions = {
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    canDeleteAll: true,
    ...options
  };
  const opts = [{ title: import_chalk13.default.dim(`${clr.approve(import_swiss_ak18.symbols.TICK)} [ Finished ]`), value: "none" }];
  if (fullOptions.canCreate) {
    opts.push({ title: `${clr.create(import_swiss_ak18.symbols.PLUS)} Add another ${itemName}`, value: "create" });
  }
  if (items.length > 0) {
    if (fullOptions.canUpdate) {
      opts.push({ title: `${clr.update(import_swiss_ak18.symbols.ARROW_ROTATE_CLOCK)} Change a ${itemName} value`, value: "update" });
    }
    if (fullOptions.canDelete) {
      opts.push({ title: `${clr.delete(import_swiss_ak18.symbols.CROSS)} Remove ${itemName}`, value: "delete" });
    }
    if (fullOptions.canDeleteAll) {
      opts.push({ title: `${clr.deleteAll(import_swiss_ak18.symbols.TIMES)} Remove all`, value: "delete-all" });
    }
  }
  return await select2(question, opts, "none");
};
var validate = async (askFunc, validateFn) => {
  const runLoop = async (initial, extraLines = 0) => {
    const input = await askFunc(initial);
    const validateResponse = await validateFn(input);
    if (validateResponse === true) {
      return input;
    } else {
      const message = validateResponse || "";
      moveUp(1 + extraLines);
      console.log(import_chalk13.default.red(message));
      return runLoop(input, message.split("\n").length);
    }
  };
  return runLoop();
};
var imitateHighlight = import_chalk13.default.cyanBright.bold.underline;
var getImitateResultText = (result, isChild = false) => {
  if (result instanceof Array) {
    if (result.length > 3)
      return `${result.length} selected`;
    return result.map((item) => getImitateResultText(item, true)).join(", ");
  }
  if (typeof result === "object") {
    const usableProps = ["name", "title", "display", "value"];
    for (let prop in usableProps) {
      if (result[prop])
        return result[prop];
    }
  }
  if (typeof result === "boolean") {
    if (isChild)
      return result + "";
    return result ? `${imitateHighlight("yes")} / no` : `yes / ${imitateHighlight("no")}`;
  }
  if (typeof result === "number") {
    return result + "";
  }
  if (typeof result === "string") {
    return result;
  }
  return "done";
};
var imitate = (done, question, result) => {
  const message = typeof question === "string" ? question : question.get();
  const resultText = getImitateResultText(result);
  const prefix = done ? import_chalk13.default.green("\u2714") : import_chalk13.default.cyan("?");
  const questionText = import_chalk13.default.whiteBright.bold(message);
  const joiner = resultText ? import_chalk13.default.gray(done ? "\u2026 " : "\u203A ") : "";
  const mainLength = (0, import_string_width5.default)(`${prefix} ${questionText} ${joiner}`);
  const maxLength = out.utils.getTerminalWidth() - mainLength - 1;
  let resultWrapper = hasColor(resultText) ? import_swiss_ak18.fn.noact : done ? import_chalk13.default.white : import_chalk13.default.gray;
  const resultOut = resultText ? truncate(`${resultWrapper(resultText)}`, maxLength) : "";
  console.log(`${prefix} ${questionText} ${joiner}${resultOut}`);
  return 1;
};
var prefill = async (value, question, askFn) => {
  if (value !== void 0) {
    imitate(true, question, value);
    return value;
  }
  return askFn(question);
};
var loading2 = (question) => loading((s) => imitate(false, question, `[${s}]`));
var pause = async (text2 = "Press enter to continue...") => {
  return new Promise((resolve) => {
    const message = typeof text2 === "string" ? text2 : text2.get();
    console.log(import_chalk13.default.gray(message));
    const finish = () => {
      kl.stop();
      resolve();
    };
    const kl = getKeyListener((key) => {
      switch (key) {
        case "return":
          return finish();
      }
    });
  });
};
var countdown = async (totalSeconds, template = (s) => `Starting in ${s}s...`, complete) => {
  console.log();
  let lines = 1;
  for (let s = totalSeconds; s > 0; s--) {
    const textValue = template(s);
    moveUp(lines);
    lines = textValue.split("\n").length;
    console.log(import_chalk13.default.blackBright(textValue));
    await (0, import_swiss_ak18.wait)((0, import_swiss_ak18.seconds)(1));
  }
  moveUp(lines);
  if (complete) {
    console.log(complete);
  }
};
var wizard = (startObj = {}) => {
  let obj = { ...startObj };
  const history = [];
  history.push(obj);
  return {
    add(partial) {
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
var itemsToPromptObjects = (items, titles = [], titleFn) => {
  return items.map((item, index, arr) => ({ title: titleFn && titleFn(item, index, arr) || titles[index] || item + "", value: item }));
};
var utils = {
  itemsToPromptObjects
};

// src/tools/progressBar.ts
var import_chalk14 = __toESM(require("chalk"), 1);
var import_swiss_ak19 = require("swiss-ak");
var getColouredProgressBarOpts = (opts, randomise = false) => {
  let wrapperFns = [import_chalk14.default.yellowBright, import_chalk14.default.magenta, import_chalk14.default.blueBright, import_chalk14.default.cyanBright, import_chalk14.default.greenBright, import_chalk14.default.redBright];
  if (randomise) {
    wrapperFns = import_swiss_ak19.ArrayUtils.randomise(wrapperFns);
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
      result.prefix = truncate(result.prefix, result.prefixWidth, "\u2026");
    }
    return result;
  };
};
var progressBarUtils = {
  getColouredProgressBarOpts
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LogUtils,
  PathUtils,
  align,
  ask,
  center,
  centerLines,
  chlk,
  clr,
  concatLineGroups,
  explodePath,
  getBreadcrumb,
  getKeyListener,
  getLineCounter,
  getLog,
  getLogStr,
  getResponsiveValue,
  hasColor,
  justify,
  justifyLines,
  left,
  leftLines,
  limitToLength,
  limitToLengthStart,
  loading,
  moveUp,
  out,
  pad,
  processLogContents,
  progressBarUtils,
  right,
  rightLines,
  split,
  table,
  truncate,
  truncateStart,
  wrap
});
