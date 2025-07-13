import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { onDemand } from 'swiss-ak';
import { PathTools } from '../../PathTools';

const execAsync = promisify(exec);

// MacOS alias files are files that point to a directory or file.
// They require special handling when listing directories.

const extraInfo = onDemand({
  isMacOS: () => process.platform === 'darwin'
});
const caches = onDemand({
  isMacOSAlias: () => new Map<string, boolean>(),
  resolveMacOSAlias: () => new Map<string, string | null>(),
  getActualLocationPath: () => new Map<string, string>()
});

export const couldBeMacOSAlias = (stats: fs.Stats): boolean => {
  if (!extraInfo.isMacOS) return false;
  return stats.isFile() && stats.size <= 10 * 1024; // 10KB
};

export const isMacOSAlias = (path: string): boolean => {
  if (!extraInfo.isMacOS) return false;
  if (caches.isMacOSAlias.has(path)) return caches.isMacOSAlias.get(path);
  const ALIAS_HEADER = '626f6f6b000000006d61726b00000000';

  try {
    const fileDescriptor = fs.openSync(path, 'r');
    const headerBuffer = new Uint8Array(16);

    try {
      fs.readSync(fileDescriptor, headerBuffer, 0, 16, 0);
      const fileHeader = Buffer.from(headerBuffer).toString('hex');
      const isAlias = fileHeader === ALIAS_HEADER;
      caches.isMacOSAlias.set(path, isAlias);
      return isAlias;
    } finally {
      fs.closeSync(fileDescriptor);
    }
  } catch (error) {
    caches.isMacOSAlias.set(path, false);
    return false;
  }
};

export const resolveMacOSAlias = async (path: string): Promise<string | null> => {
  if (!extraInfo.isMacOS) return null;
  if (caches.resolveMacOSAlias.has(path)) return caches.resolveMacOSAlias.get(path);

  try {
    // Use osascript to resolve the alias - most reliable method
    const script = `
      tell application "Finder"
        set aliasFile to POSIX file "${path.replace(/"/g, '\\"')}" as alias
        set originalFile to original item of aliasFile
        return POSIX path of (originalFile as string)
      end tell
    `;

    const { stdout } = await execAsync(`osascript -e '${script.replace(/'/g, "\\'")}'`);
    const destination = PathTools.removeTrailSlash(stdout.trim());

    if (destination && fs.existsSync(destination)) {
      caches.resolveMacOSAlias.set(path, destination);
      return destination;
    }
  } catch (error) {
    // Fallback: try using stat command
    try {
      const { stdout } = await execAsync(`stat -f %Y "${path.replace(/"/g, '\\"')}"`);
      const destination = PathTools.removeTrailSlash(stdout.trim());

      if (destination && destination !== path && fs.existsSync(destination)) {
        caches.resolveMacOSAlias.set(path, destination);
        return destination;
      }
    } catch (fallbackError) {
      // Both methods failed
    }
  }

  caches.resolveMacOSAlias.set(path, null);
  return null;
};

export const getActualLocationPath = async (originalPath: string): Promise<string> => {
  if (!extraInfo.isMacOS) return originalPath;
  if (caches.getActualLocationPath.has(originalPath)) return caches.getActualLocationPath.get(originalPath);

  // Handle edge cases
  if (!originalPath || originalPath === '/') {
    caches.getActualLocationPath.set(originalPath, originalPath);
    return originalPath;
  }

  // Check if the entire path is an alias first
  try {
    if (isMacOSAlias(originalPath)) {
      const destination = await resolveMacOSAlias(originalPath);
      if (destination) {
        // Recursively resolve the destination
        const resolvedPath = await getActualLocationPath(destination);
        caches.getActualLocationPath.set(originalPath, resolvedPath);
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
    caches.getActualLocationPath.set(originalPath, result);
    return result;
  } else {
    // No directory, just return the filename
    caches.getActualLocationPath.set(originalPath, originalPath);
    return originalPath;
  }
};
