import { shotgunGauges } from './shotgun-gauges'
import { rimfireCalibres } from './rimfire-calibres'
import { centerFireCalibres } from './centerfire-calibres'
import { brands } from './brands'
import { classify } from './classifier'
export { getItemCount } from './get-counts'
export { shotgunGauges, rimfireCalibres, centerFireCalibres, brands }
/**
 * pull out a standard rimfire calibre
 * @param {string} str string containing a rimfire calibre
 * @returns {string} standardized rimfire calibre
 */
export function classifyRimfire(str: string): string {
  return classify(rimfireCalibres, str)
}

/**
 * pull out a standard centerfire calibre
 * @param {string} str string containing a centerfire calibre
 * @returns {string} standardized centerfire calibre
 */
export function classifyCenterFire(str: string): string {
  return classify(centerFireCalibres, str)
}

/**
 * pull out a standard shotgun calibre
 * @param {string} str string containing a shotgun calibre
 * @returns {string} standardized shotgun calibre
 */
export function classifyShotgun(str: string): string {
  return classify(shotgunGauges, str)
}

/**
 * pull out a standard calibre and determine its type
 * @param {string} str
 * @returns {({ calibre: string, type: 'rimfire' | 'centerfire' | 'shotgun' })}
 */
export function classifyAmmo(str: string): { calibre: string; type: 'rimfire' | 'centerfire' | 'shotgun' } {
  const calibre = classify(shotgunGauges.concat(rimfireCalibres).concat(centerFireCalibres), str)
  let type
  if (rimfireCalibres.some(ls => ls[0] === calibre)) {
    type = 'rimfire'
  } else if (shotgunGauges.some(ls => ls[0] === calibre)) {
    type = 'shotgun'
  } else {
    type = 'centerfire'
  }

  return {
    calibre,
    type,
  }
}

/**
 * pull out a standard ammo brand
 * @param {string} str string containing an ammo brand
 * @returns {string} standardized ammo brand
 */
export function classifyBrand(str: string): string {
  return classify(brands, str, true)
}
