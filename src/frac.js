const Fraction = require("fraction.js");

function MyFraction(...args) {
  Fraction.call(this, ...args);
}

MyFraction.prototype = Object.create(Fraction.prototype);
MyFraction.prototype.constructor = Fraction;
MyFraction.prototype.toString = MyFraction.prototype.toFraction;

const fraction = x => new MyFraction(x);

module.exports = fraction;
