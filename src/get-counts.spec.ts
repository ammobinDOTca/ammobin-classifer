import { getItemCount } from './get-counts';
// tslint:disable:max-line-length
describe('get-count', () => {
  test('empty string', () => {
    expect(getItemCount('')).toBe(null);
  });

  test('only number (with no clauses)', () => {
    expect(getItemCount('must haveThreeSections 123')).toBe(null);
  });

  test('handle box of ("WINCHESTER Super X 12 Gauge, #2 Lead 1255, box of 25")', () => {
    expect(getItemCount('WINCHESTER Super X 12 Gauge, #2 Lead 1255, box of 25')).toEqual(25);
  });

  test('handle NumberRds ("Polish Army Surplus Pistol Ammo - 7.62x25mm, 85Gr, FMJ, Brass Case Corrosive aa Primed (Not aa), 2520rds Crate"', () => {
    expect(getItemCount('Polish Army Surplus Pistol Ammo - 7.62x25mm, 85Gr, FMJ, Brass Case Corrosive aa Primed (Not aa), 2520rds Crate')).toEqual(2520);
  });

  test('handle combined correct number and incorrect number around "box" keyword ("HEVI-Shot HEVI-Duty Home Defense Shotgun Ammo - 12Ga, 2-3/4", 30 Pellet, #4 Buck, 5rds Box, 1250fps")', () => {
    expect(getItemCount('HEVI-Shot HEVI-Duty Home Defense Shotgun Ammo - 12Ga, 2-3/4", 30 Pellet, #4 Buck, 5rds Box, 1250fps'))
      .toEqual(5);
  });

  test('handler ("BULK AMMO & STORAGE COMBO: Chinese Surplus Ammunition, 7.62x39, FMJ Corrosive with MTM Ammo Can - 300 Rounds")', () => {
    expect(getItemCount('BULK AMMO & STORAGE COMBO: Chinese Surplus Ammunition, 7.62x39, FMJ Corrosive with MTM Ammo Can - 300 Rounds')).toEqual(300);
  });

  test('handle no count ("Winchester Super-X .22 Win Mag 40-Grain Full Metal Jacket Rifle Ammunition"', () => {
    expect(getItemCount('Winchester Super-X .22 Win Mag 40-Grain Full Metal Jacket Rifle Ammunition')).toEqual(null);
  });

  test('handle brick', () => {
    expect(getItemCount(' Aguila - .22LR, 40gr, SV, LRN, Brick of 500 ')).toEqual(500);
  });

  test('handle comma', () => {
    expect(getItemCount('Chinese Surplus - 7.62x39, 123gr, FMJ, Crate of 1,500')).toEqual(1500);
  });

  test('"Challenger Target Loads Shotgun Ammo - Target, 20Ga, 2-3/4", 7/8oz, #7-1/2, 25rds Box, 120..." => 25', () => {
    expect(getItemCount('Challenger Target Loads Shotgun Ammo - Target, 20Ga, 2-3/4", 7/8oz, #7-1/2, 25rds Box, 120...')).toEqual(25);
  });

  // dont have way to deal with this
  test('handle CCI Blazer Handgun Brass Pistol Ammunition 9mm 115 Gr 50 Rounds FMJ #5200 ', () => {
    expect(getItemCount('CCI Blazer Handgun Brass Pistol Ammunition 9mm 115 Gr 50 Rounds FMJ #5200 ')).toEqual(50);
  });

  test('"PMC 223 Rem 55 FMJ-BT 1000/Cas" => 1000 rounds ', () => {
    expect(getItemCount('PMC 223 Rem 55 FMJ-BT 1000/Cas')).toEqual(1000);
  });

  test('".223 Remington Ammunition, 55gr HP by MFS. Zinc plated steel case. Non-Corrosive. 20 per box. Order a 500rd case (25 boxes) and get FREE Shipping (few exceptions may apply)" => 25', () => {
    expect(getItemCount('.223 Remington Ammunition, 55gr HP by MFS. Zinc plated steel case. Non-Corrosive. 20 per box. Order a 500rd case (25 boxes) and get FREE Shipping (few exceptions may apply)')).toEqual(25);
  });

  test('"Sako 308 WIN Super Hammerhead, JSP Bonded Core 180 Grain Box 20 #P629236A" -> 20', () => {
    expect(getItemCount('Sako 308 WIN Super Hammerhead, JSP Bonded Core 180 Grain Box 20 #P629236A')).toEqual(20);
  });

  test('"HIRTENBERGER 308 WIN (7.62×51) 146gr FMJ (Lead Core) 240/Pack " => 240', () => {
    expect(getItemCount('HIRTENBERGER 308 WIN (7.62×51) 146gr FMJ (Lead Core) 240/Pack ')).toEqual(240);
  });

  test('" Remington 223 UMC 55GR FMJ Freedom Bucket 300 RD " => 300', () => {
    expect(getItemCount(' Remington 223 UMC 55GR FMJ Freedom Bucket 300 RD ')).toEqual(300);
  });

  test('"Remington UMC Freedom Bucket - .223 Rem, 55gr, FMJ, Bucket of 300" => 300', () => {
    expect(getItemCount('Remington UMC Freedom Bucket - .223 Rem, 55gr, FMJ, Bucket of 300')).toEqual(300);
  });

});
