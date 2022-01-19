class DiceRoll {
  constructor(a, b, c, refObj = {}) {
    [this.a, this.b, this.c] = [a, b, c];
    this.discard = refObj.discard;
  }

  roll(ignore = false) {
    if (!this.discard || ignore) {
      let sum = 0;
      for (let i = 1; i <= this.a; i++) {
        let r = random(this.b);
        sum += r;
      }
      return sum + this.c;
    } else if (this.discard === 'least') {
      let arr = [], min = this.b;
      for (let i = 0; i < this.a; i++) {
        let r = random(this.b);
        if (r < min) {min = r}
        arr.push(r + this.c);
      }
      arr.splice(arr.indexOf(min), 1);
      let sum = arr.reduce((prev, curr) => {
        return prev + curr;
      });
      return sum;
    }
  }
}

// Generates a random number from 1 to max inclusive
const random = max => {
  return Math.floor(Math.random() * max + 1);
}

module.exports.DiceRoll = DiceRoll;
module.exports.random = random;
