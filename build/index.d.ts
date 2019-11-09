import { shotgunGauges } from './shotgun-gauges';
import { rimfireCalibres } from './rimfire-calibres';
import { centerFireCalibres } from './centerfire-calibres';
import { brands } from './brands';
export { getItemCount } from './get-counts';
export { shotgunGauges, rimfireCalibres, centerFireCalibres, brands };
/**
 * pull out a standard rimfire calibre
 * @param {string} str string containing a rimfire calibre
 * @returns {string} standardized rimfire calibre
 */
export declare function classifyRimfire(str: string): string;
/**
 * pull out a standard centerfire calibre
 * @param {string} str string containing a centerfire calibre
 * @returns {string} standardized centerfire calibre
 */
export declare function classifyCenterFire(str: string): string;
/**
 * pull out a standard shotgun calibre
 * @param {string} str string containing a shotgun calibre
 * @returns {string} standardized shotgun calibre
 */
export declare function classifyShotgun(str: string): string;
/**
 * pull out a standard calibre and determine its type
 * @param {string} str
 * @returns {({ calibre: string, type: 'rimfire' | 'centerfire' | 'shotgun' })}
 */
export declare function classifyAmmo(str: string): {
    calibre: string;
    type: 'rimfire' | 'centerfire' | 'shotgun';
};
/**
 * pull out a standard ammo brand
 * @param {string} str string containing an ammo brand
 * @returns {string} standardized ammo brand
 */
export declare function classifyBrand(str: string): string;
