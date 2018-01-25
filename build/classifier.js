"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * try to match str to the list
 * @param {string[][]} list mapping of string to first element in the list
 * @param {string} str
 * @returns {string} first element in matched list entry OR unknown if no results found
 */
function classify(list, str, workingWithBrands = false) {
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
        if (workingWithBrands) {
            // always take first match of brands
            // brand list to have brands that are also ammo types at the end
            // ie: if any other brand has 223 remington, pick that brand over remington
            if (bestMatch === '') {
                return match[0];
            }
            else {
                return bestMatch;
            }
        }
        else {
            if (match[0].length > bestMatch.length) {
                return match[0];
            }
            else {
                return bestMatch;
            }
        }
    }, '');
    return results && results.length ? results : 'UNKNOWN';
}
exports.classify = classify;
//# sourceMappingURL=classifier.js.map