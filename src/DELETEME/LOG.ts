import fsP from 'fs/promises';
import { queue } from 'swiss-ak';
import util from 'util';

const logItems: string[] = [];

const logFile = './debug/LOG.txt';

export const LOG = async (...args) => {
  logItems.push(args.map((arg) => util.inspect(arg, { showHidden: false, depth: null, colors: true })).join(' '));
  await queue.add('log', () => fsP.writeFile(logFile, logItems.join('\n')));
};
