function Vector(arr) {
  this.arr = arr;
  this.length = this.arr.length;

  this.mul = (k, i) => {
    console.log(k, typeof k, i);
    if (typeof i === "number") {
      const v = this.arr[i];
      const w = typeof v === "number" ? k * v : v.mul(k);
      return new Vector(Object.assign([], this.arr, { [i]: w }));
    } else {
      return new Vector(
        arr.map(x => (typeof x === "number" ? k * x : x.mul(k)))
      );
    }
  };

  this.add = W => {
    return new Vector(
      arr.map(
        (x, j) => (typeof x === "number" ? x + W.arr[j] : x.add(W.arr[j]))
      )
    );
  };

  this.minus = W => {
    return W ? this.add(W.mul(-1)) : this.mul(-1);
  };

  this.swap = (i, j) => {
    return new Vector(
      Object.assign([], this.arr, { [i]: this.arr[j], [j]: this.arr[i] })
    );
  };

  this.transvect = (k, i, j) => {
    const u = this.arr[i];
    const v = this.arr[j];
    const w = typeof u === "number" ? v + k * u : v.add(u.mul(k));
    return new Vector(
      Object.assign([], this.arr, {
        [j]: w
      })
    );
  };

  this.valueOf = () => {
    return this.arr.map(x => x.valueOf());
  };

  this.toArray = () => {
    return this.arr.map(
      x =>
        Object.getPrototypeOf(x) === Object.getPrototypeOf(this)
          ? x.toArray()
          : x
    );
  };
}

const vector = arr => {
  return new Vector(arr);
};

const matrix = arr2d => {
  return new Vector(arr2d.map(row => new Vector(row)));
};

module.exports = { vector, matrix };
