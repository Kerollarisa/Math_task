import Magician from '../src/js/Magician.js';
import Daemon from '../src/js/Daemon.js';

describe('Magician', () => {
  test('атака на 1-й клетке = 100%', () => {
    const m = new Magician(100);
    expect(m.attack).toBeCloseTo(100, 10);
  });

  test('атака на 2-й клетке = 90%', () => {
    const m = new Magician(100);
    m.distance = 2;
    expect(m.attack).toBeCloseTo(90, 10);
  });

  test('атака на 5-й клетке = 60%', () => {
    const m = new Magician(100);
    m.distance = 5;
    expect(m.attack).toBeCloseTo(60, 10);
  });

  test('атака дальше 5-й клетки = 60% (зажато)', () => {
    const m = new Magician(100);
    m.distance = 10;
    expect(m.attack).toBeCloseTo(60, 10);
  });

  test('дурман на 2-й клетке = 85 (пример из задания)', () => {
    const m = new Magician(100);
    m.distance = 2;
    m.stoned = true;
    expect(m.attack).toBeCloseTo(85, 10);
  });

  test('дурман на 1-й клетке: Math.log2(1) = 0, штрафа нет', () => {
    const m = new Magician(100);
    m.distance = 1;
    m.stoned = true;
    expect(m.attack).toBeCloseTo(100, 10);
  });

  test('getter/setter stoned', () => {
    const m = new Magician(100);
    expect(m.stoned).toBe(false);
    m.stoned = true;
    expect(m.stoned).toBe(true);
  });

  test('setter attack меняет базовую атаку', () => {
    const m = new Magician(50);
    expect(m.attack).toBeCloseTo(50, 10);
    m.attack = 100;
    expect(m.attack).toBeCloseTo(100, 10);
  });
});

describe('Daemon', () => {
  test('атака на 1-й клетке = 100%', () => {
    const d = new Daemon(100);
    expect(d.attack).toBeCloseTo(100, 10);
  });

  test('setter attack меняет базовую атаку', () => {
    const d = new Daemon(50);
    expect(d.attack).toBeCloseTo(50, 10);
    d.attack = 100;
    expect(d.attack).toBeCloseTo(100, 10);
  });

  test('getter/setter stoned', () => {
    const d = new Daemon(100);
    expect(d.stoned).toBe(false);
    d.stoned = true;
    expect(d.stoned).toBe(true);
  });

  test('дурман на 3-й клетке', () => {
    const d = new Daemon(100);
    d.distance = 3;
    d.stoned = true;
    // 100 * 0.8 - Math.log2(3) * 5 ≈ 80 - 7.9248 ≈ 72.075
    expect(d.attack).toBeCloseTo(100 * 0.8 - Math.log2(3) * 5, 10);
  });
});