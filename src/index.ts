import natural = require('natural');
import { shotgunGauges } from './shotgun-gauges';
import { rimfireCalibres } from './rimfire-calibres';
import { centerFireCalibres } from './centerfire-calibres';
import { brands } from './brands';
// reg ex to find commas so that we can later replace them with spaces to help with classification
const reg = new RegExp(',', 'g');

const rimfireClassifier = new natural.LogisticRegressionClassifier();
rimfireClassifier.addDocument('', 'unknown');
rimfireCalibres.forEach(group => group.forEach(s => rimfireClassifier.addDocument(s, group[0])));
rimfireClassifier.train();

const centerFireClassifier = new natural.LogisticRegressionClassifier();
centerFireClassifier.addDocument('', 'unknown');
centerFireCalibres.forEach(group => group.forEach(s => centerFireClassifier.addDocument(s, group[0])));
centerFireClassifier.train();

const shotgunClassifier = new natural.LogisticRegressionClassifier();
shotgunClassifier.addDocument('', 'unknown');
shotgunGauges.forEach(group => group.forEach(s => shotgunClassifier.addDocument(s, group[0])));
shotgunClassifier.train();

const calibreClassifier = new natural.LogisticRegressionClassifier();
rimfireCalibres.forEach(group => group.forEach(s => calibreClassifier.addDocument(s, group[0])));
centerFireCalibres.forEach(group => group.forEach(s => calibreClassifier.addDocument(s, group[0])));
shotgunGauges.forEach(group => group.forEach(s => calibreClassifier.addDocument(s, group[0])));
calibreClassifier.train();

const brandClassifier = new natural.LogisticRegressionClassifier();
brands.forEach(group => group.forEach(s => brandClassifier.addDocument(s, group[0])));
brandClassifier.train();

/**
 * pull out a standard rimfire calibre
 * @param {string} str string containing a rimfire calibre
 * @returns {string} standardized rimfire calibre
 */
export function classifyRimfire(str: string): string {
  return rimfireClassifier.classify(str.replace(reg, ' '));
}

/**
 * pull out a standard centerfire calibre
 * @param {string} str string containing a centerfire calibre
 * @returns {string} standardized centerfire calibre
 */
export function classifyCenterFire(str: string): string {
  return centerFireClassifier.classify(str.replace(reg, ' '));
}

/**
 * pull out a standard shotgun calibre
 * @param {string} str string containing a shotgun calibre
 * @returns {string} standardized shotgun calibre
 */
export function classifyShotgun(str: string): string {
  return shotgunClassifier.classify(str.replace(reg, ' '));
}

/**
 * pull out a standard calibre and determine its type
 * @param {string} str
 * @returns {({ calibre: string, type: 'rimfire' | 'centerfire' | 'shotgun' })}
 */
export function classifyAmmo(str: string): { calibre: string, type: 'rimfire' | 'centerfire' | 'shotgun' } {
  const calibre = calibreClassifier.classify(str.replace(reg, ' '));
  let type;
  if (rimfireCalibres.some(ls => ls[0] === calibre)) {
    type = 'rimfire';
  } else if (shotgunGauges.some(ls => ls[0] === calibre)) {
    type = 'shotgun';
  } else {
    type = 'centerfire';
  }

  return {
    calibre,
    type
  };
}

/**
 * pull out a standard ammo brand
 * @param {string} str string containing an ammo brand
 * @returns {string} standardized ammo brand
 */
export function classifyBrand(str: string): string {
  return brandClassifier.classify(str.replace(reg, ' '));
}
