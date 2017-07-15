import { classify } from './classifier';
import { shotgunGauges } from './shotgun-gauges';
import { centerFireCalibres } from './centerfire-calibres';
import { brands } from './brands';
describe('classifer()', () => {
  it('should pull 12-Gauge', () => {
    expect(classify(shotgunGauges, 'Federal 12-Gauge 2-3/4-in Rifled Slug ')).toEqual('12 ga');
  });
  describe('centerfire', () => {
    [
      ['Prvi Partizan Ammunition 222 Remington 50 Grain Soft Point', '.222 remington'],
      [' PRVI Ammunition .380 ACP 94gr JHP - Box of 50 ', '.380 acp'],
      ['Prvi Partizan (PPU) Rifle Ammo - 6.5x52mm Carcano, 139Gr, FMJ, 20rds Box ', '6.5x52mm carcano'],
      [' Norinco 7.62x51, 145 Grain FMJ, 1000rd Crate ', '.308 / 7.62 nato'],
      ['Hirtenberger 7.62x51 Nato 240 Battle Pack, Berdan Primed ', '.308 / 7.62 nato'],
      ['Sako Super Hammerhead 300 Win. Mag. 180gr Bonded Soft Point Boat Tail ', '.300 winchester short magnum'],
      [' FEDERAL 300WIN 180GR SPEER HOT CORE SP POWERSHOK ', '.300 winchester short magnum'],
      [' CCI 9mm Luger, 115 Grain FMJ , box of 50 ', '9mm'],
      [' BROWNING BPT 9mm Luger, 115 Grain FMJ , box of 50 ', '9mm'],
      ['Hirtenberger 7.62x51 Nato Boxer, Primed', '.308 / 7.62 nato']
    ].forEach(t => it(`"${t[0]} => ${t[1]}`, () =>
      expect(classify(centerFireCalibres, t[0]))
        .toEqual(t[1])));
  });

  describe('brands', () => {
    [
      [' Glock G22 Gen4 + 500 Round of PMC 40 S&W 180gr COMBO ', 'pmc'],
      ['IMI 5.56x45 NATO 62gr M855 Green Tip FMJ- Box of 30', 'imi'],
      [' Schmidt-Rubin Surplus, 7.5x55 Swiss, 480 Round ', 'surplus']

    ].forEach(t => it(`"${t[0]} => ${t[1]}`, () =>
      expect(classify(brands, t[0]))
        .toEqual(t[1])));
  });
});
