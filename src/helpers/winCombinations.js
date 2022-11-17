const wline = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
const hline = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const diagonal = [
  [0, 4, 8],
  [2, 4, 6],
];
export const winCombinations = [...wline, ...hline, ...diagonal];

const wlineH = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
];
const hlineH = [
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
];
const diagonalH = [
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];
export const winCombinationsH = [...wlineH, ...hlineH, ...diagonalH];
