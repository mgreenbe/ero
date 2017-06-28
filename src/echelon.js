const subArray = (arr, indices) => arr.filter((_, i) => indices.includes(i));

const subMatrix = (matrix, rowIndices, columnIndices) =>
  subArray(matrix, rowIndices).map(row => subArray(row, columnIndices));

const leadingIndex = (arr, isNonzero = x => x.valueOf() !== 0) => {
  return arr.findIndex(isNonzero);
};

const isUndefined = x => x === undefined || x === null || x === NaN;

const isIncreasing = arr =>
  arr.slice(0, -1).every((x, i) => isUndefined(arr[i + 1]) || x < arr[i + 1]);

let a = [0, 0, 0, 4, 5, 6];
let b = ["a", "b", "c", "d", "e", "f"];
let c = ["A", "B", "C", "D", "E", "f"];
console.log(subMatrix([a, b, c], [0, 2], [0, 2, 4]));

console.log(isIncreasing([-1, 0, 2, undefined, 3, undefined]));
