import fs from 'fs';
import { cachier, minutes, onDemand } from 'swiss-ak';
import { PathTools } from '../tools/PathTools';
import { execute, getStats } from './fsUtils';

// MacOS alias files are files that point to a directory or file.
// They require special handling when listing directories.

const extraInfo = onDemand({
  isMacOS: () => process.platform === 'darwin'
});
const caches = onDemand({
  isMacOSAlias: () => cachier.create<boolean>(minutes(1)),
  resolveMacOSAlias: () => cachier.create<string | null>(minutes(1)),
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

export const resolveMacOSAlias = async (path: string): Promise<string | null> => {
  if (!extraInfo.isMacOS) return null;
  return caches.resolveMacOSAlias.getOrRunAsync(path, async () => {
    try {
      // Use osascript to resolve the alias - most reliable method
      const script = `
      tell application "Finder"
        set aliasFile to POSIX file "${path.replace(/"/g, '\\"')}" as alias
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
        const stdout = await execute(`stat -f %Y "${path.replace(/"/g, '\\"')}"`);
        const destination = PathTools.removeTrailSlash(stdout.trim());

        if (destination && destination !== path && fs.existsSync(destination)) {
          return destination;
        }
      } catch (fallbackError) {
        // Both methods failed
      }
    }

    return null;
  });
};

export const getActualLocationPath = async (originalPath: string): Promise<string> => {
  if (!extraInfo.isMacOS) return originalPath;
  return caches.getActualLocationPath.getOrRunAsync(originalPath, async () => {
    // Handle edge cases
    if (!originalPath || originalPath === '/') {
      return originalPath;
    }

    // Check if the entire path is an alias first
    try {
      const stats = await getStats(originalPath);
      if (couldBeMacOSAlias(stats) && isMacOSAlias(originalPath)) {
        const destination = await resolveMacOSAlias(originalPath);
        if (destination) {
          // Recursively resolve the destination
          const resolvedPath = await getActualLocationPath(destination);
          return resolvedPath;
        }
      }
    } catch (error) {
      // Continue with component resolution
    }

    // If not an alias, resolve parent directory and append filename
    const exploded = PathTools.explodePath(originalPath);

    if (exploded.dir) {
      const resolvedDir = await getActualLocationPath(exploded.dir);
      const result = exploded.filename ? resolvedDir + '/' + exploded.filename : resolvedDir;
      return result;
    } else {
      // No directory, just return the filename
      return originalPath;
    }
  });
};
