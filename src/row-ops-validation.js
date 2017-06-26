const validateSwapSingle = (matrix, value) => {
  if (!value) {
    return "Fill in required fields.";
  } else if (!Number.isInteger(value)) {
    return "Rows indices are nonnegative integers.";
  } else if (value >= matrix.length) {
    return "That row doesn't exist.";
  }
};

const validateSwapBoth = (matrix, swap_i, swap_j) => {
  if (swap_i === swap_j) {
    return "Row indices must be distinct.";
  }
};

const validateScaleRow = (matrix, value) => {
  if (!Number.isSafeInteger(value)) {
    return "Row indices are nonnegative integers.";
  } else if (value >= matrix.length) {
    return "That row doesn't exist.";
  }
};

const validateScaleConstant = (matrix, value) => {
  if (typeof value !== "number") {
    return "Enter a number.";
  } else if (value === 0) {
    return "Enter a <i>nonzero</i> number.";
  }
};
