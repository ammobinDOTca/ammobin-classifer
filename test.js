const natural = require('natural')

const tokenizer = new natural.WordPunctTokenizer();
var NGrams = natural.NGrams;

const ff = [
  'HEVI-Shot HEVI-Duty Home Defense Shotgun Ammo - 12Ga, 2-3/4", 30 Pellet, #4 Buck, 5rds Box, 1250fps',
  'Polish Army Surplus Pistol Ammo - 7.62x25mm, 85Gr, FMJ, Brass Case Corrosive Berdan Primed (Not Reloadable), 2520rds Crate',
  'Federal American Eagle Rimfire Ammo - High Velocity, 22 LR, 38Gr, Copper-Plated HP, 40rds',
  'WINCHESTER Super X 12 Gauge, #2 Lead 1255, box of 25',
  'Federal American Eagle .22LR 38 Grain JHP 1260 fps AE22 - Box of 40',
  'BULK AMMO & STORAGE COMBO: Chinese Surplus Ammunition, 7.62x39, FMJ Corrosive with MTM Ammo Can - 300 Rounds',
]
ff.forEach(f => {
  console.log(NGrams.trigrams(f.replace('rds', ' rds')).map(words => {
    let count = NaN;
    const numberScore = words.reduce((score, word) => {
      if (!isNaN(parseInt(word, 10)) && parseInt(word, 10).toString() === word) {
        // console.log(word)
        if (score === 0) {
          count = parseInt(word, 10);
          score = 1;
        } else {
          // if multiple numbers, probs not a good match
          score = 0.25;
        }
      }
      return score;

    }, 0);
    //give another point for each
    //give 0.5 points for 'of'
    const keyScore = words.reduce((score, word, index) => {
      const lower = word.toLowerCase();
      if (['box', 'case', 'rounds', 'rds', 'crate'].indexOf(lower) >= 0) {
        score++;
      } else if (lower === 'of' && index === 1 && ['box', 'case', 'rounds', 'rds', 'crate'].indexOf(words[index - 1].toLowerCase()) >= 0) {
        // only give points if "<noun> of "
        score += 0.5;
      }
      return score;
    }, 0);
    // combine points and return score and count
    return { score: numberScore + keyScore, words, count };
  }).sort((a, b) => b.score - a.score)[0])
});



console.log(natural.JaroWinklerDistance("rounds", "rds"))
console.log(natural.LevenshteinDistance("rds", "rounds", {
  insertion_cost: 0,
  deletion_cost: 10,
  substitution_cost: 100
}));


