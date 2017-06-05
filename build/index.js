"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const natural = require("natural");
const shotgun_gauges_1 = require("./shotgun-gauges");
const rimfire_calibres_1 = require("./rimfire-calibres");
const centerfire_calibres_1 = require("./centerfire-calibres");
const brands_1 = require("./brands");
// reg ex to find commas so that we can later replace them with spaces to help with classification
const reg = new RegExp(',', 'g');
const rimfireClassifier = new natural.LogisticRegressionClassifier();
rimfireClassifier.addDocument('', 'unknown');
rimfire_calibres_1.rimfireCalibres.forEach(group => group.forEach(s => rimfireClassifier.addDocument(s, group[0])));
rimfireClassifier.train();
const centerFireClassifier = new natural.LogisticRegressionClassifier();
centerFireClassifier.addDocument('', 'unknown');
centerfire_calibres_1.centerFireCalibres.forEach(group => group.forEach(s => centerFireClassifier.addDocument(s, group[0])));
centerFireClassifier.train();
const shotgunClassifier = new natural.LogisticRegressionClassifier();
shotgunClassifier.addDocument('', 'unknown');
shotgun_gauges_1.shotgunGauges.forEach(group => group.forEach(s => shotgunClassifier.addDocument(s, group[0])));
shotgunClassifier.train();
const calibreClassifier = new natural.LogisticRegressionClassifier();
rimfire_calibres_1.rimfireCalibres.forEach(group => group.forEach(s => calibreClassifier.addDocument(s, group[0])));
centerfire_calibres_1.centerFireCalibres.forEach(group => group.forEach(s => calibreClassifier.addDocument(s, group[0])));
shotgun_gauges_1.shotgunGauges.forEach(group => group.forEach(s => calibreClassifier.addDocument(s, group[0])));
calibreClassifier.train();
const brandClassifier = new natural.LogisticRegressionClassifier();
brands_1.brands.forEach(group => group.forEach(s => brandClassifier.addDocument(s, group[0])));
brandClassifier.train();
/**
 * pull out a standard rimfire calibre
 * @param {string} str string containing a rimfire calibre
 * @returns {string} standardized rimfire calibre
 */
function classifyRimfire(str) {
    return rimfireClassifier.classify(str.replace(reg, ' '));
}
exports.classifyRimfire = classifyRimfire;
/**
 * pull out a standard centerfire calibre
 * @param {string} str string containing a centerfire calibre
 * @returns {string} standardized centerfire calibre
 */
function classifyCenterFire(str) {
    return centerFireClassifier.classify(str.replace(reg, ' '));
}
exports.classifyCenterFire = classifyCenterFire;
/**
 * pull out a standard shotgun calibre
 * @param {string} str string containing a shotgun calibre
 * @returns {string} standardized shotgun calibre
 */
function classifyShotgun(str) {
    return shotgunClassifier.classify(str.replace(reg, ' '));
}
exports.classifyShotgun = classifyShotgun;
/**
 * pull out a standard calibre and determine its type
 * @param {string} str
 * @returns {({ calibre: string, type: 'rimfire' | 'centerfire' | 'shotgun' })}
 */
function classifyAmmo(str) {
    const calibre = calibreClassifier.classify(str.replace(reg, ' '));
    let type;
    if (rimfire_calibres_1.rimfireCalibres.some(ls => ls[0] === calibre)) {
        type = 'rimfire';
    }
    else if (shotgun_gauges_1.shotgunGauges.some(ls => ls[0] === calibre)) {
        type = 'shotgun';
    }
    else {
        type = 'centerfire';
    }
    return {
        calibre,
        type
    };
}
exports.classifyAmmo = classifyAmmo;
/**
 * pull out a standard ammo brand
 * @param {string} str string containing an ammo brand
 * @returns {string} standardized ammo brand
 */
function classifyBrand(str) {
    return brandClassifier.classify(str.replace(reg, ' '));
}
exports.classifyBrand = classifyBrand;
//# sourceMappingURL=index.js.map