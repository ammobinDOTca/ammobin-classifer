"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyBrand = exports.classifyAmmo = exports.classifyShotgun = exports.classifyCenterFire = exports.classifyRimfire = exports.brands = exports.centerFireCalibres = exports.rimfireCalibres = exports.shotgunGauges = void 0;
const shotgun_gauges_1 = require("./shotgun-gauges");
Object.defineProperty(exports, "shotgunGauges", { enumerable: true, get: function () { return shotgun_gauges_1.shotgunGauges; } });
const rimfire_calibres_1 = require("./rimfire-calibres");
Object.defineProperty(exports, "rimfireCalibres", { enumerable: true, get: function () { return rimfire_calibres_1.rimfireCalibres; } });
const centerfire_calibres_1 = require("./centerfire-calibres");
Object.defineProperty(exports, "centerFireCalibres", { enumerable: true, get: function () { return centerfire_calibres_1.centerFireCalibres; } });
const brands_1 = require("./brands");
Object.defineProperty(exports, "brands", { enumerable: true, get: function () { return brands_1.brands; } });
const classifier_1 = require("./classifier");
var get_counts_1 = require("./get-counts");
Object.defineProperty(exports, "getItemCount", { enumerable: true, get: function () { return get_counts_1.getItemCount; } });
/**
 * pull out a standard rimfire calibre
 * @param {string} str string containing a rimfire calibre
 * @returns {string} standardized rimfire calibre
 */
function classifyRimfire(str) {
    return classifier_1.classify(rimfire_calibres_1.rimfireCalibres, str);
}
exports.classifyRimfire = classifyRimfire;
/**
 * pull out a standard centerfire calibre
 * @param {string} str string containing a centerfire calibre
 * @returns {string} standardized centerfire calibre
 */
function classifyCenterFire(str) {
    return classifier_1.classify(centerfire_calibres_1.centerFireCalibres, str);
}
exports.classifyCenterFire = classifyCenterFire;
/**
 * pull out a standard shotgun calibre
 * @param {string} str string containing a shotgun calibre
 * @returns {string} standardized shotgun calibre
 */
function classifyShotgun(str) {
    return classifier_1.classify(shotgun_gauges_1.shotgunGauges, str);
}
exports.classifyShotgun = classifyShotgun;
/**
 * pull out a standard calibre and determine its type
 * @param {string} str
 * @returns {({ calibre: string, type: 'rimfire' | 'centerfire' | 'shotgun' })}
 */
function classifyAmmo(str) {
    const calibre = classifier_1.classify(shotgun_gauges_1.shotgunGauges.concat(rimfire_calibres_1.rimfireCalibres).concat(centerfire_calibres_1.centerFireCalibres), str);
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
        type,
    };
}
exports.classifyAmmo = classifyAmmo;
/**
 * pull out a standard ammo brand
 * @param {string} str string containing an ammo brand
 * @returns {string} standardized ammo brand
 */
function classifyBrand(str) {
    return classifier_1.classify(brands_1.brands, str, true);
}
exports.classifyBrand = classifyBrand;
//# sourceMappingURL=index.js.map