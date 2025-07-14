import * as fsP from 'fs/promises';
import { MathsTools, StringTools, TimeTools, ms, seconds, sortNumberedText, tryOr } from 'swiss-ak';
import { ActionBarConfig, getActionBar } from '../../../utils/actionBar';
import { getBasicFileInfo, getPathType, getStats, scanDir } from '../../../utils/fsUtils';
import { getActualLocationPath } from '../../../utils/aliases';
import { PathTools } from '../../PathTools';
import { colr } from '../../colr';
import { out } from '../../out';
import { getAskOptionsForState } from '../basicInput/customise';
import { PathContents, fsCache } from './cache';

export const loadPathContents = async (path: string): Promise<PathContents> => {
  if (fsCache.cache.has(path)) {
    return fsCache.cache.get(path);
  }
  return forceLoadPathContents(path);
};

export const forceLoadPathContents = async (displayPath: string): Promise<PathContents> => {
  let contents: PathContents = { dirs: [], files: [] };
  try {
    const targetPath = await getActualLocationPath(displayPath);
    const pathType = await getPathType(targetPath);

    if (pathType === 'd') {
      const scanResults = await scanDir(targetPath);

      const [dirs, files] = [scanResults.dirs, scanResults.files]
        .map((list) => list.filter((item) => item !== '.DS_Store')) // Filter out .DS_Store files
        .map((list) => sortNumberedText(list))
        .map((list) => list.map((item) => item.replace(/\r|\n/g, ' ')));

      contents = { ...contents, dirs, files };
    }
    if (pathType === 'f') {
      const [stat, info] = await Promise.all([
        //
        tryOr(undefined, () => getStats(targetPath)),
        tryOr(undefined, () => getBasicFileInfo(targetPath))
      ]);
      contents = { ...contents, info: { stat, info } };
    }
  } catch (err) {
    // ignore
  }

  fsCache.cache.set(displayPath, contents);

  return contents;
};

export const join = (...items: string[]) => {
  const result = items.join('/');
  return PathTools.removeDoubleSlashes(result || '/');
};

export const keyActionDict: ActionBarConfig = {
  move: {
    keys: '↑ ↓ ← →',
    label: 'Navigate'
  },
  r: {
    keys: 'R',
    label: `Refresh`
  },
  f: {
    keys: 'F',
    label: `New Folder`
  },
  o: {
    keys: 'O',
    label: `Open`
  },
  space: {
    keys: 'space',
    label: 'Toggle selection'
  },
  return: {
    keys: '⮐ ',
    label: 'Submit'
  }
};

export const getFEActionBar = (multi: boolean, pressed?: string, disabled: string[] = [], isError: boolean = false): string => {
  const theme = getAskOptionsForState(false, isError);
  const keyList = {
    single: ['move', 'r', 'f', 'o', 'return'],
    multi: ['move', 'r', 'f', 'o', 'space', 'return']
  }[multi ? 'multi' : 'single'];
  return theme.colours.specialInfo(getActionBar(keyList, keyActionDict, pressed, disabled));
};

export const FILE_CATEGORIES = {
  image: ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'gif', 'bmp', 'webp', 'psd', 'ai', 'cr2', 'crw', 'nef', 'pef', 'svg'],
  video: ['mp4', 'mov', 'wmv', 'avi', 'avchd', 'flv', 'f4v', 'swf', 'mkv', 'webm'],
  audio: ['mp3', 'aac', 'ogg', 'flac', 'alac', 'wav', 'aiff', 'dsd'],
  text: ['txt', 'rtf']
};

export const getFileCategory = (ext: string) => {
  const category = Object.keys(FILE_CATEGORIES).find((key) => FILE_CATEGORIES[key].includes(ext.toLowerCase()));
  return category || '';
};

export const getFileIcon = (ext: string) => {
  const { colours: col } = getAskOptionsForState(false, false);

  const category = getFileCategory(ext);
  const dispExt = ext.length % 2 === 0 ? ext : '.' + ext;

  // Images
  if (category === 'image') {
    const s = col.specialNormal('☀');
    return out.left(
      `╔══════════════╗
║  ${s}  ┌────┐${s}  ║
║ ${s}┌──┤▫▫▪▫│  ${s}║
╟──┤▫▪│▫▫▫▫├───╢
║▪▫│▫▫│▪▫▫▫│▫▪▫║
╚══╧══╧════╧═══╝`,
      16
    );
  }

  // Videos
  if (category === 'video') {
    return out.left(
      `┏┱──────────┲┓
┣┫╭────────╮┣┫
┣┫│${out.center(out.limitToLength(dispExt.toUpperCase(), 8), 8)}│┣┫
┣┫╰────────╯┣┫
┗┹──────────┺┛`,
      14
    );
  }

  // Audio
  if (category === 'audio') {
    return out.left(
      `┌──────────────┐
│   .∙¯¯¯¯∙.   │
│  /        \\  │
│ |    ()    | │
│  \\        /  │
│   '∙____∙'   │
└──────────────┘`,
      16
    );
  }

  // Other
  return out.left(
    `,╌╌╌╌╌.
╎       ⟍
╎${out.center(out.limitToLengthStart(dispExt, 8), 8)}╎
╎        ╎
╎        ╎
˸╌╌╌╌╌╌╌╌˸`,
    10
  );
};

export const humanFileSize = (size: number) => {
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return MathsTools.roundTo(0.01, size / Math.pow(1024, i)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export const getFilePanel = (path: string, panelWidth: number, maxLines: number) => {
  const { colours: col } = getAskOptionsForState(false, false);

  const { filename, ext } = PathTools.explodePath(path);

  const { stat, info } = fsCache.getPathContents(path)?.info || {};

  const result = [];

  result.push(out.center(getFileIcon(ext), panelWidth));

  const category = getFileCategory(ext);
  result.push(out.center(out.wrap(filename, panelWidth), panelWidth));
  result.push(out.center(col.specialFaded(`${ext.toUpperCase()} ${category ? `${StringTools.capitalise(category)} ` : ''}File`), panelWidth));

  result.push(out.center(col.decoration('─'.repeat(Math.round(panelWidth * 0.75))), panelWidth));

  const now = Date.now();

  const addItem = (title: string, value: string, extra?: string) => {
    result.push(out.split(`${colr.bold(col.specialFaded(title))}`, `${value}${extra ? col.specialFaded(` (${extra})`) : ''}`, panelWidth));
  };
  const addTimeItem = (title: string, time: ms, append?: string) => {
    addItem(title, `${TimeTools.toReadableDuration(now - time, false, 2)}${append || ''}`);
  };

  if (stat) {
    addItem(`Size`, `${humanFileSize(stat.size)}`);
    addTimeItem(`Modified`, stat.mtimeMs, ' ago');
    addTimeItem(`Created`, stat.ctimeMs, ' ago');
  }
  if (info) {
    if (['image', 'video'].includes(category) && info.width && info.height) addItem(`Dimensions`, `${info.width}×${info.height}`);
    if (['video', 'audio'].includes(category) && info.duration) addItem(`Duration`, TimeTools.toReadableDuration(seconds(info.duration), false, 2));
    if (['video'].includes(category) && info.framerate) addItem(`FPS`, `${info.framerate}`);
  }

  const resultStr = out.left(out.wrap(result.join('\n'), panelWidth), panelWidth);
  return col.specialNormal(out.utils.joinLines(out.utils.getLines(resultStr).slice(0, maxLines)));
};
