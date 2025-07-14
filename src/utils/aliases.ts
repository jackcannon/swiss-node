import fs from 'fs';
import path from 'path';
import { cachier, minutes, onDemand } from 'swiss-ak';
import { PathTools } from '../tools/PathTools';
import { execute, getStats } from './fsUtils';
import { LOG } from '../../debug/livefilelog';

interface AliasResult {
  targetPath: string;
  targetType: 'd' | 'f';
}

// MacOS alias files are files that point to a directory or file.
// They require special handling when listing directories.

const extraInfo = onDemand({
  isMacOS: () => process.platform === 'darwin'
});
const caches = onDemand({
  isMacOSAlias: () => cachier.create<boolean>(minutes(1)),
  resolveMacOSAlias: () => cachier.create<AliasResult | undefined>(minutes(1)),
  getActualLocationPath: () => cachier.create<string>(minutes(1)),
  clear: () => () => {
    caches.isMacOSAlias.clear();
    caches.resolveMacOSAlias.clear();
    caches.getActualLocationPath.clear();
  }
});

export const couldBeMacOSAlias = (stats: fs.Stats): boolean => {
  if (!extraInfo.isMacOS) return false;
  return stats.isFile() && stats.size <= 10 * 1024; // 10KB
};

export const isMacOSAlias = (path: string): boolean => {
  if (!extraInfo.isMacOS) return false;
  return caches.isMacOSAlias.getOrRun(path, () => {
    const ALIAS_HEADER = '626f6f6b000000006d61726b00000000';

    try {
      const fileDescriptor = fs.openSync(path, 'r');
      const headerBuffer = new Uint8Array(16);

      try {
        fs.readSync(fileDescriptor, headerBuffer, 0, 16, 0);
        const fileHeader = Buffer.from(headerBuffer).toString('hex');
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

export const getActualLocationPath = async (originalPath: string): Promise<string> => {
  if (!extraInfo.isMacOS) return originalPath;
  return caches.getActualLocationPath.getOrRunAsync(originalPath, async () => {
    if (!originalPath || originalPath === '/') {
      return originalPath;
    }

    try {
      const stats = await getStats(originalPath);
      if (couldBeMacOSAlias(stats) && isMacOSAlias(originalPath)) {
        const destination = await resolveMacOSAlias(originalPath);
        if (destination?.targetPath) {
          const resolvedPath = await getActualLocationPath(destination.targetPath);
          return resolvedPath;
        }
      }
    } catch (error) {
      // ignore
    }

    const exploded = PathTools.explodePath(originalPath);

    if (exploded.dir) {
      const resolvedDir = await getActualLocationPath(exploded.dir);
      const resultPath = exploded.filename ? resolvedDir + '/' + exploded.filename : resolvedDir;

      if (resultPath !== originalPath) {
        return await getActualLocationPath(resultPath);
      }

      return resultPath;
    } else {
      return originalPath;
    }
  });
};

export const getActualLocationPathSync = (originalPath: string): string => {
  if (!extraInfo.isMacOS) return originalPath;
  return caches.getActualLocationPath.get(originalPath) ?? originalPath;
};

// alias resolution

export const resolveMacOSAlias = (filePath: string): Promise<AliasResult | undefined> => {
  return caches.resolveMacOSAlias.getOrRunAsync(filePath, async () => {
    const buf = fs.readFileSync(filePath);

    try {
      let result = undefined;
      if (buf.slice(0, 4).toString('ascii') === 'book') {
        result = decodeBookmarkAlias(buf);
      } else {
        result = decodeClassicAlias(buf);
      }

      if (result) return result;

      return resolveMacOSAliasFallback(filePath);
    } catch (e) {
      return resolveMacOSAliasFallback(filePath);
    }
  });
};

const resolvePathFromComponents = (pathComponents: string[]): string => {
  if (pathComponents.length === 0) return '';

  const cwd = process.cwd();
  const cwdExploded = PathTools.explodePath(cwd);

  let absolutePath = '';
  let foundIntersection = false;

  for (let i = 0; i < pathComponents.length; i++) {
    const component = pathComponents[i];
    const cwdIndex = cwdExploded.folders.indexOf(component);

    if (cwdIndex !== -1) {
      const beforeIntersection = cwdExploded.folders.slice(0, cwdIndex);
      const afterIntersection = pathComponents.slice(i);
      absolutePath = '/' + [...beforeIntersection, ...afterIntersection].join('/');
      foundIntersection = true;
      break;
    }
  }

  if (!foundIntersection) {
    if (pathComponents[0] && /^[a-zA-Z][a-zA-Z0-9._-]*$/.test(pathComponents[0])) {
      absolutePath = '/Users/' + pathComponents.join('/');
    } else {
      absolutePath = '/' + pathComponents.join('/');
    }
  }

  LOG(`resolvePathFromComponents`, { pathComponents, absolutePath });

  return absolutePath;
};

const decodeBookmarkAlias = (buf: Buffer): AliasResult | undefined => {
  if (buf.slice(0, 4).toString('ascii') !== 'book' || buf.slice(8, 12).toString('ascii') !== 'mark') {
    return undefined;
  }

  const pathComponents: string[] = [];
  let pos = 0x50;

  try {
    while (pos < buf.length - 20) {
      if (buf[pos] === 0x01 && buf[pos + 1] === 0x01 && buf[pos + 2] === 0x00 && buf[pos + 3] === 0x00) {
        pos += 4;

        let component = '';
        let strStart = pos;
        while (pos < buf.length && buf[pos] !== 0x00) {
          pos++;
        }

        if (pos > strStart) {
          component = buf.slice(strStart, pos).toString('utf8');

          component = component.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
          component = component.trim();

          if (component.length > 0 && component.length < 100 && !component.includes('\u0000') && /^[a-zA-Z0-9._-]+$/.test(component)) {
            pathComponents.push(component);
          }
        }

        while (pos < buf.length && buf[pos] === 0x00) {
          pos++;
        }

        if (pos < buf.length - 4) {
          const nextBytes = buf.slice(pos, pos + 4);
          if (nextBytes[0] <= 0x20 && nextBytes[1] === 0x00) {
            pos += 4;
          }
        }
      } else {
        pos++;
      }
    }
  } catch (e) {
    return undefined;
  }

  if (pathComponents.length > 0) {
    const validComponents = pathComponents.filter((comp) => (comp !== 'Macintosh' && comp !== 'HD' && !comp.includes('-')) || comp.length < 36);
    console.log(`decodeBookmarkAlias`, { pathComponents, validComponents });

    if (validComponents.length > 0) {
      const absolutePath = resolvePathFromComponents(validComponents);

      let targetType: 'd' | 'f' = 'd'; // Default to directory
      try {
        const stats = fs.statSync(absolutePath);
        targetType = stats.isDirectory() ? 'd' : 'f';
      } catch (e) {
        const filename = validComponents[validComponents.length - 1];
        targetType = filename.includes('.') ? 'f' : 'd';
      }

      return { targetPath: absolutePath, targetType };
    }
  }

  return undefined;
};

const decodeClassicAlias = (buf: Buffer): AliasResult | undefined => {
  const info: {
    targetType?: 'file' | 'directory';
    filename?: string;
    abspath?: string;
    path?: string;
  } = {};

  if (buf.readUInt16BE(4) !== buf.length) return undefined;

  const version = buf.readUInt16BE(6);
  if (version !== 2) return undefined;

  const type = buf.readUInt16BE(8);
  if (type !== 0 && type !== 1) return undefined;

  info.targetType = ['file', 'directory'][type] as 'file' | 'directory';

  const volNameLength = buf.readUInt8(10);
  if (volNameLength > 27) return undefined;

  const volSig = buf.toString('ascii', 42, 44);
  if (volSig !== 'BD' && volSig !== 'H+' && volSig !== 'HX') return undefined;

  const volType = buf.readUInt16BE(44);
  if (volType < 0 || volType > 5) return undefined;

  const fileNameLength = buf.readUInt8(50);
  if (fileNameLength > 63) return undefined;

  info.filename = buf.toString('utf8', 51, 51 + fileNameLength);

  const reserved = buf.slice(140, 150);
  if (
    reserved[0] !== 0 ||
    reserved[1] !== 0 ||
    reserved[2] !== 0 ||
    reserved[3] !== 0 ||
    reserved[4] !== 0 ||
    reserved[5] !== 0 ||
    reserved[6] !== 0 ||
    reserved[7] !== 0 ||
    reserved[8] !== 0 ||
    reserved[9] !== 0
  ) {
    return undefined;
  }

  let pos = 150;

  while (pos < buf.length) {
    const partType = buf.readInt16BE(pos);
    const length = buf.readUInt16BE(pos + 2);
    const data = buf.slice(pos + 4, pos + 4 + length);
    pos += 4 + length;

    if (partType === -1) {
      if (length !== 0) return undefined;

      break;
    }

    if (length % 2 === 1) {
      const padding = buf.readUInt8(pos);
      if (padding !== 0) return undefined;

      pos += 1;
    }

    switch (partType) {
      case 2:
        const parts = data.toString('utf8').split('\0');
        info.path = parts[0];
        break;
      case 18:
        info.abspath = data.toString('utf8');
        break;
    }
  }

  let absolutePath = info.abspath || info.path || '';
  if (!absolutePath) return undefined;

  if (!path.isAbsolute(absolutePath)) {
    const pathComponents = absolutePath.split('/').filter((comp) => comp.length > 0);
    absolutePath = resolvePathFromComponents(pathComponents);
  }

  const targetType: 'd' | 'f' = info.targetType === 'directory' ? 'd' : 'f';

  return { targetPath: absolutePath, targetType };
};

const resolveMacOSAliasFallback = async (actualPath: string): Promise<AliasResult | undefined> => {
  if (!extraInfo.isMacOS) return null;

  const absolutePath = path.resolve(actualPath);

  const targetPath = await (async () => {
    try {
      // Use osascript to resolve the alias - most reliable method
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
      // Fallback: try using stat command
      try {
        const stdout = await execute(`stat -f %Y "${absolutePath.replace(/"/g, '\\"')}"`);
        const destination = PathTools.removeTrailSlash(stdout.trim());

        if (destination && destination !== absolutePath && fs.existsSync(destination)) {
          return destination;
        }
      } catch (fallbackError) {
        // Both methods failed
      }
    }
  })();

  if (!targetPath) return undefined;

  const stats = await getStats(targetPath);
  const targetType = stats.isDirectory() ? 'd' : 'f';

  return { targetPath, targetType };
};
