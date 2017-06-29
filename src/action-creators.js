const set = (key, value) => {
  return {
    type: "set",
    payload: { key, value }
  };
};

const swapOp = (i, j) => {
  return {
    type: "swap",
    payload: { i, j }
  };
};

const multiplyOp = (i, k) => {
  return {
    type: "multiply",
    payload: { i, k }
  };
};

const transvectOp = (i, j, k) => {
  return {
    type: "transvect",
    payload: { i, j, k }
  };
};

const giveHint = () => {
  return { type: "hint" };
};
export { set, swapOp, multiplyOp, transvectOp, giveHint };
