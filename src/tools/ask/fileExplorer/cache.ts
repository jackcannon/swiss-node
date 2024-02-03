import * as fs from 'fs';
import { BasicFileInfo } from '../../../utils/fsUtils';

export interface PathContents {
  dirs: string[];
  files: string[];
  info?: {
    stat: fs.Stats;
    info: BasicFileInfo;
  };
}

export const fsCache = {
  cache: new Map<string, PathContents>(),
  getPathContents: (path: string): PathContents => fsCache.cache.get(path)
};
