export default class Character {
  constructor(attack) {
    this.baseAttack = attack;
    this.distance = 1;
    this._stoned = false;
  }

  get stoned() {
    return this._stoned;
  }

  set stoned(value) {
    this._stoned = value;
  }

  get attack() {
    const coef = Math.max(0.6, 1.1 - 0.1 * this.distance);
    let result = this.baseAttack * coef;
    if (this._stoned) {
      result -= Math.log2(this.distance) * 5;
    }
    return result;
  }

  set attack(value) {
    this.baseAttack = value;
  }
}