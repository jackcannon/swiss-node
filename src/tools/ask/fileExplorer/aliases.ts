import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { onDemand } from 'swiss-ak';

const execAsync = promisify(exec);

// MacOS alias files are files that point to a directory or file.
// They require special handling when listing directories.

const extraInfo = onDemand({
  isMacOS: () => process.platform === 'darwin'
});

export const couldBeMacOSAlias = (stats: fs.Stats): boolean => {
  if (!extraInfo.isMacOS) return false;
  return stats.isFile() && stats.size <= 10 * 1024; // 10KB
};

const macOsAliasCache = new Map<string, boolean>();
const aliasDestinationCache = new Map<string, string | null>();

export const isMacOSAlias = (path: string): boolean => {
  if (!extraInfo.isMacOS) return false;
  if (macOsAliasCache.has(path)) return macOsAliasCache.get(path);
  const ALIAS_HEADER = '626f6f6b000000006d61726b00000000';

  try {
    const fileDescriptor = fs.openSync(path, 'r');
    const headerBuffer = new Uint8Array(16);

    try {
      fs.readSync(fileDescriptor, headerBuffer, 0, 16, 0);
      const fileHeader = Buffer.from(headerBuffer).toString('hex');
      const isAlias = fileHeader === ALIAS_HEADER;
      macOsAliasCache.set(path, isAlias);
      return isAlias;
    } finally {
      fs.closeSync(fileDescriptor);
    }
  } catch (error) {
    macOsAliasCache.set(path, false);
    return false;
  }
};

export const resolveMacOSAlias = async (path: string): Promise<string | null> => {
  if (!extraInfo.isMacOS) return null;
  if (aliasDestinationCache.has(path)) return aliasDestinationCache.get(path);

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
    const destination = stdout.trim();

    if (destination && fs.existsSync(destination)) {
      aliasDestinationCache.set(path, destination);
      return destination;
    }
  } catch (error) {
    // Fallback: try using stat command
    try {
      const { stdout } = await execAsync(`stat -f %Y "${path.replace(/"/g, '\\"')}"`);
      const destination = stdout.trim();

      if (destination && destination !== path && fs.existsSync(destination)) {
        aliasDestinationCache.set(path, destination);
        return destination;
      }
    } catch (fallbackError) {
      // Both methods failed
    }
  }

  aliasDestinationCache.set(path, null);
  return null;
};
