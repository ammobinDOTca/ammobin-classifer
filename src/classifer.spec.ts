import { classify } from './classifier'
import { shotgunGauges } from './shotgun-gauges'
import { centerFireCalibres } from './centerfire-calibres'
import { rimfireCalibres } from './rimfire-calibres'
import { brands } from './brands'

describe('classifer()', () => {
  describe('centerfire', () => {
    ;[
      ['Federal PowerShok 5RND Box 3" 1.25oz Slug 12GA', '12 ga'],
      ['Federal 12-Gauge 2-3/4-in Rifled Slug ', '12 ga'],
    ].forEach(t => it(`"${t[0]} => ${t[1]}`, () => expect(classify(shotgunGauges, t[0])).toEqual(t[1])))
  })

  describe('centerfire', () => {
    ;[
      ['Prvi Partizan Ammunition 222 Remington 50 Grain Soft Point', '.222 remington'],
      [' PRVI Ammunition .380 ACP 94gr JHP - Box of 50 ', '.380 acp'],
      ['Prvi Partizan (PPU) Rifle Ammo - 6.5x52mm Carcano, 139Gr, FMJ, 20rds Box ', '6.5x52mm carcano'],
      [' Norinco 7.62x51, 145 Grain FMJ, 1000rd Crate ', '.308 / 7.62 nato'],
      ['Hirtenberger 7.62x51 Nato 240 Battle Pack, Berdan Primed ', '.308 / 7.62 nato'],
      ['Sako Super Hammerhead 300 Win. Mag. 180gr Bonded Soft Point Boat Tail ', '.300 winchester magnum'],
      [' FEDERAL 300WIN 180GR SPEER HOT CORE SP POWERSHOK ', '.300 winchester magnum'],
      [' CCI 9mm Luger, 115 Grain FMJ , box of 50 ', '9mm'],
      [' BROWNING BPT 9mm Luger, 115 Grain FMJ , box of 50 ', '9mm'],
      ['Hirtenberger 7.62x51 Nato Boxer, Primed', '.308 / 7.62 nato'],
      ['Prvi Partizan Ammunition 6.5x52mm Mannlicher-Carcano 123 Grain Soft Point', '6.5x52mm carcano'],
      ['PRVI Ammunition 6.5x52 Carcano 139gr FMJ-BT - Box of 20 ', '6.5x52mm carcano'],
      ['Sellier & Bellot 300 AAC Blackout Ammunition, 124gr FMJ. ', '.300 aac blackout'],
      [' Sellier & Bellot 300 Blackout, 200gr FMJ Subsonic, Box of 20 ', '.300 aac blackout'],
      ['FEDERAL POWER SHOK 30 CARBINE 110 GR 30CA', '.30 carbine'],
      ['455 WEBLEY MKII', '.455 webley'],
      ['FIOCCHI AMMO 8MM FRENCH LEBEL REV', '8x50mmr lebel'],
      ['8x50R FRENCH LEBEL RIFLE PRVI PARTIZAN', '8x50mmr lebel'],
      ['7.62 Nagant FMJ 98gr FIOCCHI', '7.62x38mmr'],
      ['5.6 x 52R – 22 SAVAGE HIGH POWER FMJ 70gr Sellier & Bellot', '5.6x52mmr'],
      ['30 LUGER FMJ 93gr FIOCCHI', '7.65x21mm'],
    ].forEach(t => it(`"${t[0]} => ${t[1]}`, () => expect(classify(centerFireCalibres, t[0])).toEqual(t[1])))
  })

  describe('rimfire', () => {
    ;[
      [' Winchester 22 wmr 30 gr vmax ', '.22 wmr'],
      ['CCI 22LR Standard Velocity Lead RN 40gr 5000/case ', '.22 lr'],
      [' CCI 22LR MINI-MAG, HIGH-VELOCITY, 40Gr RN 5000/Case ', '.22 lr'],
      ['Aguila 22LR Interceptor Solid Point 40gr 1470FPS Ammunition ', '.22 lr'],
    ].forEach(t => it(`"${t[0]} => ${t[1]}`, () => expect(classify(rimfireCalibres, t[0])).toEqual(t[1])))
  })
  describe('brands', () => {
    ;[
      [' Glock G22 Gen4 + 500 Round of PMC 40 S&W 180gr COMBO ', 'pmc'],
      ['IMI 5.56x45 NATO 62gr M855 Green Tip FMJ- Box of 30', 'imi'],
      [' Schmidt-Rubin Surplus, 7.5x55 Swiss, 480 Round ', 'surplus'],
      ['Bulgarian Surplus, 7.62x39, 1320 Round Crate', 'surplus'],
      [' Priv Partisan - 7.62x39, 123gr, SP, Box of 20 ', 'ppu'],
      ['Schmidt-Rubin Surplus, 7.5x55 Swiss, 480 Round ', 'surplus'],
      ['Barnaul .223 Remington FMJ 500rds CASE', 'barnaul'],
      ['Barnaul .223 Remington FMJ 500rds CASE', 'barnaul'],
      [' Federal 223 Remington 55gr FMJ - 1000 Rounds ', 'federal'],
      [' REMINGTON 223 REMINGTON 55 PSP ', 'remington'],
      ['fiocchi ammunition 223 remington fmj boat tail 55 grain box 50 fio 223a ', 'fiocchi'],
    ].forEach(t => it(`"${t[0]} => ${t[1]}`, () => expect(classify(brands, t[0], true)).toEqual(t[1])))
  })
})
