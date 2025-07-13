import { exec } from 'child_process';
import fsP from 'fs/promises';
import { tryOr } from 'swiss-ak';
import { explodePath } from '../tools/PathTools';
import { FILE_CATEGORIES } from '../tools/ask/fileExplorer/helpers';
import { couldBeMacOSAlias, isMacOSAlias } from '../tools/ask/fileExplorer/aliases';

const execute = (command: string): Promise<string> => {
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

export interface BasicFileInfo {
  width: number;
  height: number;
  duration: number;
  framerate: number;
}

export const getBasicFileInfo = async (file: string): Promise<BasicFileInfo> => {
  const ext = explodePath(file).ext;
  if (FILE_CATEGORIES.video.includes(ext.toLowerCase())) {
    return getFFProbe(file);
  }
  if (FILE_CATEGORIES.image.includes(ext.toLowerCase())) {
    return getFileInfo(file);
  }
  return { width: undefined, height: undefined, duration: undefined, framerate: undefined };
};

// Uses the file command - For images
const getFileInfo = async (file: string): Promise<BasicFileInfo> => {
  const stdout = (await tryOr('', async () => await execute(`file ${file}`))).toString();

  const [width, height] = (stdout.match(/([0-9]{2,})x([0-9]{2,})/g) || [''])[0]
    .split('x')
    .map(Number)
    .filter((n) => n);

  return {
    width,
    height,
    duration: undefined,
    framerate: undefined
  };
};

// Uses the ffprobe command - For videos
const getFFProbe = async (file: string): Promise<BasicFileInfo> => {
  const stdout = await tryOr('', async () => await execute(`ffprobe -select_streams v -show_streams ${file} 2>/dev/null | grep =`));
  const props = Object.fromEntries(
    stdout
      .toString()
      .split('\n')
      .map((line) => line.split('=').map((str) => str.trim()))
  );
  const asNumber = (val: string): number => (Number.isNaN(Number(val)) ? 0 : Number(val));

  const framerate = asNumber(props.avg_frame_rate.split('/')[0]) / asNumber(props.avg_frame_rate.split('/')[1]);

  return {
    width: asNumber(props.width),
    height: asNumber(props.height),
    duration: asNumber(props.duration),
    framerate
  };
};

export const mkdir = async (dir: string): Promise<string> => {
  const result = await fsP.mkdir(dir, { recursive: true });
  return result;
};

export const scanDir = async (dir: string = '.') => {
  try {
    const found = await fsP.readdir(dir, { withFileTypes: true });
    const files: string[] = [];
    const dirs: string[] = [];

    for (const file of found) {
      if (file.isDirectory()) {
        dirs.push(file.name);
      } else if (file.isFile()) {
        files.push(file.name);
      } else if (file.isSymbolicLink()) {
        try {
          const fullPath = dir.endsWith('/') ? `${dir}${file.name}` : `${dir}/${file.name}`;
          const targetStat = await fsP.stat(fullPath);

          if (targetStat.isDirectory()) {
            dirs.push(file.name);
          } else if (targetStat.isFile()) {
            files.push(file.name);
          }
        } catch (err) {
          continue;
        }
      }
    }

    return { files, dirs };
  } catch (err) {
    return { files: [], dirs: [] };
  }
};

// Tries opening in finder. If fails will progressively try to open the parent directory in the best way possible (prefers using -R flag)
export const openFinder = async (file: string, pathType: 'f' | 'd', revealFlag: boolean = true, count: number = 0): Promise<void> => {
  try {
    await execute(`open ${revealFlag ? '-R ' : ''}"${file}"`);
  } catch (err) {
    if (count > 6) return undefined;
    const exploded = explodePath(file);

    if (pathType === 'f') {
      return openFinder(exploded.dir, 'd', true, count + 1);
    }
    if (revealFlag) {
      return openFinder(file, pathType, false, count + 1);
    }
    return openFinder(exploded.dir, 'd', true, count + 1);
  }
};

export const getPathType = async (path: string): Promise<'d' | 'f'> => {
  try {
    const stat = await fsP.stat(path);
    const type = stat.isFile() ? 'f' : stat.isDirectory() ? 'd' : undefined;

    if (couldBeMacOSAlias(stat) && isMacOSAlias(path)) {
      return 'f';
    }

    return type;
  } catch (err) {
    return undefined;
  }
};
