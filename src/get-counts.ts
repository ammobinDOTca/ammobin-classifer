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
      const numberScore = words.reduce((score, word, index) => {
        const parsed = parseInt(word, 10);
        if (!isNaN(parsed) && parsed.toString() === word) {
          if (score === 0) {
            count = parsed;
            score = 1;
            if (index < 2 && words[index + 1] === 'rds') {
              score += 0.5;
            }
          } else {
            // if multiple numbers, probably not a good match
            score = 0.25;
          }
        }
        return score;
      }, 0);

      // give another point for each
      // give 0.5 points for 'of'
      const keyScore = words.reduce((score, word, index) => {
        const keywords = ['box', 'case', 'rounds', 'rds', 'crate', 'count', 'jar', 'brick', 'can'];
        if (keywords.indexOf(word) >= 0) {
          score++;
        } else if (word === 'of' &&
          index === 1 &&
          keywords.indexOf(words[index - 1]) >= 0) {
          // only give points if "<noun> of "
          score += 0.5;
        }
        return score;
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
