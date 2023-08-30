import { ArrayTools } from 'swiss-ak';
import { table } from '../tools/table';

export interface CharLookup<T> {
  hTop: T;
  hNor: T;
  hSep: T;
  hBot: T;
  mSep: T;
  bTop: T;
  bNor: T;
  bSep: T;
  bBot: T;
}

const tableCharactersBasic = (): CharLookup<string[]> => ({
  hTop: ['━', '┏', '┳', '┓'],
  hNor: [' ', '┃', '┃', '┃'],
  hSep: ['━', '┣', '╋', '┫'],
  hBot: ['━', '┗', '┻', '┛'],

  mSep: ['━', '┡', '╇', '┩'],

  bTop: ['─', '┌', '┬', '┐'],
  bNor: [' ', '│', '│', '│'],
  bSep: ['─', '├', '┼', '┤'],
  bBot: ['─', '└', '┴', '┘']
});

const ovAllCharact = (orig: string[], char: string) => ArrayTools.repeat(4, char);
const ovSeperators = (orig: string[], char: string) => [orig[0], char, char, char];
const ovOuterChars = (orig: string[], char: string) => [orig[0], char, orig[2], char];

const normalRows = ['hNor', 'bNor'];
const outerRows = ['hTop', 'hBot', 'bTop', 'bBot'];

const rowTypes: (keyof CharLookup<string[]>)[] = ['hTop', 'hNor', 'hSep', 'hBot', 'mSep', 'bTop', 'bNor', 'bSep', 'bBot'];

const applyOverrideChar = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (opts.overrideChar) {
    for (const rowType of rowTypes) {
      if (normalRows.includes(rowType)) {
        mapped[rowType] = ovSeperators(mapped[rowType], opts.overrideChar);
      } else {
        mapped[rowType] = ovAllCharact(mapped[rowType], opts.overrideChar);
      }
    }
  }
  return mapped;
};
const applyOverrideVerChar = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (opts.overrideVerChar || !opts.drawColLines) {
    const ovrd = opts.overrideVerChar || ' ';

    for (const rowType of rowTypes) {
      mapped[rowType] = ovSeperators(mapped[rowType], ovrd);
      // This used to replace the corner characters with horizontal lines. Keeping for reference.
      // if (normalRows.includes(rowType)) {
      //   // Normal row
      //   mapped[rowType] = ovSeperators(mapped[rowType], ovrd);
      // } else {
      //   // NOT normal row
      //   mapped[rowType] = ovAllCharact(mapped[rowType], mapped[rowType][0]);
      // }
    }
  }
  return mapped;
};
const applyOverrideHorChar = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (opts.overrideHorChar || !opts.drawRowLines) {
    const ovrd = opts.overrideHorChar;

    const copyVertsFrom = ['hNor', 'hNor', 'hNor', 'hNor', 'mSep', 'bNor', 'bNor', 'bNor', 'bNor'];

    for (const rowIndex in rowTypes) {
      const rowType = rowTypes[rowIndex];
      if (normalRows.includes(rowType)) {
        // Normal row
      } else {
        // NOT normal row
        if (ovrd) {
          mapped[rowType] = ovAllCharact(mapped[rowType], ovrd);
        } else {
          mapped[rowType] = [...mapped[copyVertsFrom[rowIndex]]];
        }
      }
    }
  }
  return mapped;
};
const applyOverrideCornChar = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (opts.overrideCornChar) {
    const ovrd = opts.overrideCornChar || ' ';

    for (const rowType of rowTypes) {
      if (!normalRows.includes(rowType)) {
        // NOT normal row
        mapped[rowType] = ovSeperators(mapped[rowType], ovrd);
      }
    }
  }
  return mapped;
};
const applyOverrideOuterChar = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (opts.overrideOuterChar) {
    const ovrd = opts.overrideOuterChar;

    for (const rowType of rowTypes) {
      if (outerRows.includes(rowType)) {
        // Outer row
        mapped[rowType] = ovAllCharact(mapped[rowType], ovrd);
      } else {
        // Not outer row
        mapped[rowType] = ovOuterChars(mapped[rowType], ovrd);
      }
    }
  }
  return mapped;
};
const applyDrawOuter = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (!opts.drawOuter) {
    for (const rowType of rowTypes) {
      if (outerRows.includes(rowType)) {
        // Outer row
        mapped[rowType] = ovAllCharact(mapped[rowType], ' ');
      } else {
        // Not outer row
        mapped[rowType] = ovOuterChars(mapped[rowType], ' ');
      }
    }
  }
  return mapped;
};

const applyOverrideCharSet = (mapped: CharLookup<string[]>, opts: table.FullTableOptions): CharLookup<string[]> => {
  if (opts.overrideCharSet) {
    const ovrd = opts.overrideCharSet;
    const ovrdRowTypes = Object.keys(ovrd) as (keyof CharLookup<string[]>)[];

    for (const rowType of ovrdRowTypes) {
      const ovrdRow = ovrd[rowType];
      if (rowTypes.includes(rowType) && ovrdRow && ovrdRow instanceof Array && ovrdRow.length) {
        mapped[rowType] = mapped[rowType].map((c, i) => ovrdRow[i] ?? c);
      }
    }
  }

  return mapped;
};

export const getTableCharacters = (opts: table.FullTableOptions): CharLookup<string[]> => {
  let mapped = tableCharactersBasic();

  mapped = applyOverrideChar(mapped, opts);

  mapped = applyOverrideOuterChar(mapped, opts);

  if (opts.overridePrioritiseVer) {
    mapped = applyOverrideHorChar(mapped, opts);
    mapped = applyOverrideVerChar(mapped, opts);
  } else {
    mapped = applyOverrideVerChar(mapped, opts);
    mapped = applyOverrideHorChar(mapped, opts);
  }

  mapped = applyOverrideCornChar(mapped, opts);
  mapped = applyDrawOuter(mapped, opts);

  mapped = applyOverrideCharSet(mapped, opts);

  return mapped;
};
