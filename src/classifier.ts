/**
 * try to match str to the list
 * @param {string[][]} list mapping of string to first element in the list
 * @param {string} str
 * @returns {string} first element in matched list entry OR unknown if no results found
 */
export function classify(list: string[][], str: string): string {
  const commas = new RegExp(',', 'g');
  const argTendra = new RegExp('×', 'g');
  const whitespace = new RegExp(/\s/, 'g');
  const s = str
    .replace(commas, ' ')
    .replace(argTendra, 'x')
    .replace(whitespace, '')
    .toLowerCase();

  const results = (list.filter(cg => {
    return !!cg.find(cal => s.indexOf(cal) >= 0);
  }) || [])
    .reduce((bestMatch, match) => {
      if (match[0].length > bestMatch.length) {
        return match[0];
      } else {
        return bestMatch;
      }
    }, '');

  return results && results.length ? results : 'UNKNOWN';
}
