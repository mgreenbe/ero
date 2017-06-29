const col = (matrix, j) => matrix.map(row => row[j]);

const op = (opType, ...args) => {
  let k, i, j;
  switch (opType) {
    case "swap":
      [i, j] = args;
      return { opType, i, j };
    case "multiply":
    case "divide":
      [k, i] = args;
      return { opType, k, i };
    case "transvect":
    case "add":
    case "subtract":
      [k, i, j] = args;
      return { opType, k, i, j };
    default:
      throw Error(
        "Unrecognized operation type --- valid ones are swap, multiply, divide, add, and subtract."
      );
  }
};

const isRef = (
  A,
  isZero = x => x === 0,
  isOne = x => x === 1,
  neg = x => -x,
  inv = x => 1 / x
) => {
  let n = A[0].length,
    r = 0,
    pivs = [],
    colsInRef = [];

  const f = (x, i) => x && !isZero(x) && i > r;

  const g = (x, i) => x && !isZero(x) && i >= r;

  for (let j = 0; j < n; j++) {
    let Aj = col(A, j);
    let p = Aj.findIndex(g),
      a_pj = Aj[p];
    /*    console.log(
      `r=${r},  pivs=${JSON.stringify(pivs)}, j=${j}, p=${p}, a_pj=${a_pj}`
    ); */
    if (p !== -1) {
      pivs.push(j);
      if (p === r && isOne(a_pj)) {
        // A_rj is a leading 1
        let q = Aj.findIndex(f),
          a_qj = Aj[q];
        if (q === -1) {
          colsInRef.push(j);
        } else {
          // a nonzero entry below A_rj (kill it)
          //          op = `Add ${-a_qj} times row ${r} to row ${q}.`;
          return Object.assign(
            {
              value: false,
              pivs,
              colsInRef
            },
            op("transvect", neg(a_qj), r, q)
          );
        }
      } else if (p === r && !isOne(a_pj)) {
        //  A_rj !== 0, 1 (scale row r)
        //       op = `Multiply row ${r} by 1/${a_pj}.`;
        return Object.assign(
          {
            value: false,
            pivs,
            colsInRef
          },
          op("multiply", inv(a_pj), r)
        );
      } else {
        // A_rj = 0 but A_pj !== 0, p > r (swap rows r and p)
        //        op = `Swap rows ${r} and ${p}.`;
        return Object.assign(
          {
            value: false,
            pivs,
            colsInRef
          },
          op("swap", r, p)
        );
      }
      r += 1;
    } else {
      colsInRef.push(j);
    }
  }
  return { value: true, pivs };
};

const _isRef = A =>
  isRef(
    A,
    x => x.valueOf() === 0,
    x => x.valueOf() === 1,
    x => x.neg(),
    x => x.inverse()
  );

export default _isRef;
