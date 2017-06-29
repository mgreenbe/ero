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

const op = (type, ...args) => {
  let k, i, j;
  switch (type) {
    case "swap":
      [i, j] = args;
      return { type, i, j };
    case "multiply":
    case "divide":
      [k, i] = args;
      return { type, k, i };
    case "add":
    case "subtract":
      [k, i, j] = args;
      return { type, k, i, j };
  }
};

module.exports = { pp2, ref };

const isRef = (A, isZero = x => x === 0, isOne = x => x === 1) => {
  let m = A.length,
    n = A[0].length,
    r = 0,
    pivs = [],
    colsInRef = [];

  for (let j = 0; j < n; j++) {
    let Aj = col(A, j),
      p = Aj.findIndex((x, i) => !isZero(x) && i >= r),
      a_pj = Aj[p];
    console.log(
      `r=${r},  pivs=${JSON.stringify(pivs)}, j=${j}, p=${p}, a_pj=${a_pj}`
    );
    if (p !== -1) {
      pivs.push(j);
      if (p === r && isOne(a_pj)) {
        // A_rj is a leading 1
        let q = Aj.findIndex((x, i) => !isZero(x) && i > r),
          a_qj = Aj[q];
        if (q === -1) {
          colsInRef.push(j);
        } else {
          // a nonzero entry below A_rj (kill it)
          //          op = `Add ${-a_qj} times row ${r} to row ${q}.`;
          return {
            value: false,
            pivs,
            colsInRef,
            op: op("subtract", a_qj, r, q)
          };
          r += 1;
        }
      } else if (p === r && !isOne(a_pj)) {
        //  A_rj !== 0, 1 (scale row r)
        //       op = `Multiply row ${r} by 1/${a_pj}.`;
        return {
          value: false,
          pivs,
          colsInRef,
          op: op("divide", a_pj, r)
        };
      } else {
        // A_rj = 0 but A_pj !== 0, p > r (swap rows r and p)
        //        op = `Swap rows ${r} and ${p}.`;
        return {
          value: false,
          pivs,
          colsInRef,
          op: op("swap", r, p)
        };
      }
      r += 1;
    } else {
      colsInRef.push(j);
    }
  }
  return { value: true, pivs };
};

console.log("\n");
let I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
pp2(I);
console.log(isRef(I));
console.log("\n");

let A = [[1, -10, 1], [0, 0, 1], [0, 0, 0]];
pp2(A);
console.log(isRef(A));
console.log("\n");

let B = [[-1, -10, 1], [0, 0, 1], [0, 0, 0]];
pp2(B);
console.log(isRef(B));
console.log("\n");

let C = [[1, -10, 1], [0, 0, 0], [2, 0, 6]];
pp2(C);
console.log(isRef(C));
console.log("\n");

let D = [[1, 0, 1], [0, 0, 3], [0, -2, 7]];
pp2(D);
console.log(isRef(D));
console.log("\n");

let E = [[0, 0, 3], [9, 0, 1]];
pp2(E);
console.log(isRef(E));
console.log("\n");
