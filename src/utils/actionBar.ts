import { fn } from 'swiss-ak';
import { out } from '../tools/out';
import { table } from '../tools/table';
import { colr } from '../tools/colr';

type actionBarId = string;

export interface ActionBarConfigItem {
  keys: string; // Display for keys to press
  label: string;
}
export interface ActionBarConfig {
  [id: actionBarId]: ActionBarConfigItem;
}

export const getActionBar = (
  ids: (actionBarId | false | undefined)[],
  config: ActionBarConfig,
  pressedId?: actionBarId,
  disabledIds: actionBarId[] = []
) => {
  const keyList = (ids.filter(fn.isTruthy) as actionBarId[]).filter((key) => config[key]);
  const row = keyList.map((key) => {
    const { keys, label } = config[key];
    return ` [ ${keys} ] ${label} `;
  });

  const format: table.TableFormatConfig[] = [];

  if (pressedId) {
    format.push({ formatFn: colr.darkBg.whiteBg.black, col: keyList.indexOf(pressedId) });
  }
  if (disabledIds.length) {
    disabledIds.forEach((key) => format.push({ formatFn: colr.dim.strikethrough, col: keyList.indexOf(key) }));
  }

  return out.utils.joinLines(
    table.getLines([row], undefined, { drawOuter: false, drawColLines: false, drawRowLines: false, alignCols: ['center'], colWidths: [200], format })
  );
};
