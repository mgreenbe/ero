const { array1dToString, array2dToString } = require("./pprint.js");

const pp1 = s => console.log(array1dToString(s));

const pp2 = s => console.log(array2dToString(s));

const subArray = (arr, indices) => arr.filter((_, i) => indices.includes(i));

const subMatrix = (matrix, rowIndices, columnIndices) =>
  subArray(matrix, rowIndices).map(row => subArray(row, columnIndices));

const row = (matrix, i) => matrix[i];

const col = (matrix, j) => matrix.map(row => row[j]);

const leadingIndex = (arr, isNonzero = x => x.valueOf() !== 0) => {
  return arr.findIndex(isNonzero);
};

const isUndefined = x => x === undefined || x === null || x === NaN;

const isIncreasing = arr =>
  arr.slice(0, -1).every((x, i) => isUndefined(arr[i + 1]) || x < arr[i + 1]);

const range = (a, b) => {
  let m, n;
  if (typeof b === "undefined") {
    m = 0;
    n = a;
  } else {
    m = a;
    n = b;
  }
  return Array(n - m).fill(null).map((_, i) => i + m);
};

const swap = (arr, i, j) =>
  Object.assign([], arr, { [i]: arr[j], [j]: arr[i] });

const scale = (arr, k, i) =>
  Object.assign([], arr, { [i]: arr[i].map(x => k * x) });

const transvect = (arr, k, i, j) => {
  const newRow = {
    [j]: arr[j].map((_, q) => arr[j][q] + k * arr[i][q])
  };
  return Object.assign([], arr, newRow);
};

function* ref(matrix) {
  let m = matrix.length,
    n = matrix[0].length,
    r = 0,
    A = matrix.map(row => Object.assign([], row.map(x => x)));
  for (let j = 0; j < n; j++) {
    let Aj = col(A, j);
    let i = Aj.findIndex((x, i) => i >= r && x === 1);
    if (i === -1) {
      i = Aj.findIndex((x, i) => i >= r && x !== 0);
    }
    if (i !== -1) {
      yield { A, j, obs: "piv" };
      if (i > r) {
        A = swap(A, i, r);
        console.log(array2dToString(A));
        yield { A, r, i, op: "swap" };
      }
      let a = A[r][j];
      if (A[r][j] !== 1) {
        A = scale(A, 1 / a, r);
        yield { A, a, r, op: "scale" };
      }
      let I = range(r + 1, m).filter(t => A[t][j] !== 0);
      if (I.length > 0) {
        yield { A, I, j, r, obs: "to-kill" };
      }
      for (let p of I) {
        let k = -A[p][j];
        A = transvect(A, k, r, p);
        console.log(array2dToString(A));
        yield { A, k, r, p, op: "transvect" };
      }
      yield { A, msg: `Columns 0 through ${j} are in REF.` };
      r += 1;
    } else {
      yield { A, j, obs: "npiv", msg: `Columns 0 through ${j} are in REF.` };
    }
  }
}

module.exports = { pp2, ref };

/*let A = [[0, 1, 2], [0, 2, 1], [2, 1, 1]];
pp2(A);
console.log("\n");
let g = ref(A);
pp2(g.next().value);
pp2(g.next().value);
pp2(g.next().value);
pp2(g.next().value);*/
