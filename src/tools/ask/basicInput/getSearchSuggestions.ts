import { ArrayTools, MathsTools, OfType, fn } from 'swiss-ak';
import { out } from '../../out';

const WEIGHTS = {
  MATCH_PER_LETTER: 100,
  MATCH_CASE_PER_LETTER: 5,
  NEAR_START_TEXT: 50,
  NEAR_START_WORD: 50,
  SHORTER_TEXT: 1
};

// Very basic search suggestions
export const getSearchSuggestions = <T extends unknown>(
  searchText: string,
  items: T[],
  itemStringify: (item: T) => string,
  minScore: number = 0
): T[] => {
  if (searchText.length === 0) return items;

  const processed = items.map((value) => ({ value, text: out.utils.stripAnsi(itemStringify(value)) }));

  const longestText = processed.reduce((acc, item) => (item.text.length > acc.length ? item.text : acc), '');

  const withScores = processed.map(({ value, text }) => {
    let score = 0;
    const reasons: Partial<OfType<typeof WEIGHTS, number>> = {};

    if (text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
      reasons.MATCH_PER_LETTER = searchText.length * WEIGHTS.MATCH_PER_LETTER;
      score = reasons.MATCH_PER_LETTER;

      const startIndex = text.toLowerCase().indexOf(searchText.toLowerCase());
      const foundSegment = text.substring(startIndex, startIndex + searchText.length);
      const searchTextLetters = searchText.split('');
      const foundLetters = foundSegment.split('');
      const matchedCasesLetters = searchTextLetters.filter((l, i) => l === foundLetters[i]);
      const textBefore = text.substring(0, startIndex);
      const textAfter = text.substring(startIndex + searchText.length);
      const lastSpaceIndex = textBefore.lastIndexOf(' ');

      // Higher score for matching cases
      reasons.MATCH_CASE_PER_LETTER = Math.round(WEIGHTS.MATCH_CASE_PER_LETTER * matchedCasesLetters.length);

      // Higher score for nearer start (compared to the longest text in the list)
      reasons.NEAR_START_TEXT = Math.round(WEIGHTS.NEAR_START_TEXT * ((longestText.length - startIndex) / longestText.length));

      // Higher score for near start of word
      reasons.NEAR_START_WORD = Math.round(WEIGHTS.NEAR_START_WORD * MathsTools.clamp(0, (10 - (startIndex - lastSpaceIndex - 1)) / 10, 1));

      // Punish longer texts
      reasons.SHORTER_TEXT = -Math.round(WEIGHTS.SHORTER_TEXT * text.length);

      score += reasons.MATCH_CASE_PER_LETTER;
      score += reasons.NEAR_START_TEXT;
      score += reasons.NEAR_START_WORD;
      score += reasons.SHORTER_TEXT;
    }

    return {
      value,
      text,
      score,
      reasons
    };
  });

  const filtered = withScores.filter((item) => item.score >= minScore);

  const sorted = ArrayTools.sortByMapped(filtered, (item) => item.score, fn.desc);

  const values = sorted.map((item) => item.value);

  return values;
};
