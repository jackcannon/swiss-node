import { exec } from 'child_process';
import * as fsP from 'fs/promises';
import { fn, tryOr } from 'swiss-ak';

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
const intoLines = (out: string) => out.toString().split('\n').filter(fn.isTruthy);

export interface MiniProbeResult {
  width: number;
  height: number;
  duration: number;
  framerate: number;
}

export const getProbe = async (file: string): Promise<MiniProbeResult> => {
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

export const mkdir = (dir: string): Promise<string> => {
  return fsP.mkdir(dir, { recursive: true });
};

export const findDirs = async (dir: string = '.'): Promise<string[]> => {
  const stdout = await tryOr('', async () => await execute(`find ${dir} -type d -maxdepth 1 -execdir echo {} ';'`));
  return intoLines(stdout);
};

export const findFiles = async (dir: string = '.'): Promise<string[]> => {
  const stdout = await tryOr('', async () => await execute(`find ${dir} -type f -maxdepth 1 -execdir echo {} ';'`));
  return intoLines(stdout);
};

export const open = async (file: string): Promise<void> => {
  try {
    await execute(`open ${file}`);
  } catch (err) {
    // do nothing
  }
};

export const isFileExist = async (file: string) => {
  try {
    await execute(`[[ -f ${file} ]]`);
    return true;
  } catch (e) {
    return false;
  }
};

export const isDirExist = async (file: string) => {
  try {
    await execute(`[[ -d ${file} ]]`);
    return true;
  } catch (e) {
    return false;
  }
};
