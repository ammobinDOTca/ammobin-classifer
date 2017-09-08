import { NGrams } from 'natural';
/**
 * parse a store listing to determine the item quantity
 * @param {string} str
 * @returns {number} determined quantity, returns 0 if not found
 */
export function getItemCount(str: string): number {
  const reg = new RegExp(',', 'g');

  const result = NGrams.ngrams(str.replace(reg, '').replace('rd', ' rd').toLowerCase(), 3, '', '')
    .map(words => {
      let count = null;
      const numberScore = words.reduce((numScore, word, index) => {
        const parsed = parseInt(word, 10);
        if (!isNaN(parsed) && parsed.toString() === word) {
          if (numScore === 0) {
            count = parsed;
            numScore = 1;
            if (index < 2 && words[index + 1] === 'rds') {
              numScore += 0.5;
            }
          } else {
            // if multiple numbers, probably not a good match
            numScore = 0.25;
          }
        }
        return numScore;
      }, 0);

      // give another point for each
      // give 0.5 points for 'of'
      const keyScore = words.reduce((kScore, word, index) => {
        const keywords = ['box', 'case', 'rounds', 'rds', 'crate', 'count', 'jar', 'brick', 'can', 'rnds'];
        if (keywords.indexOf(word) >= 0) {
          kScore++;
        } else if (word === 'of' &&
          index === 1 &&
          keywords.indexOf(words[index - 1]) >= 0) {
          // only give points if "<noun> of "
          kScore += 0.5;
        }
        return kScore;
      }, 0);

      let score = numberScore + keyScore;
      if (score <= 1) {
        return { score, words, count: null };
      }
      // combine points and return score and count
      return { score, words, count };

    }).sort((a, b) => b.score - a.score)[0];

  return result.count;
}
