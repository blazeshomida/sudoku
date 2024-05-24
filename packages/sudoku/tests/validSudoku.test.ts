import { expect, test } from "vitest";
import { validSudoku } from "../src/validSudoku";

// Valid 9x9 Sudoku grid
const valid9x9Grid = [
  [8, 3, 5, 4, 1, 6, 9, 2, 7],
  [2, 9, 6, 8, 5, 7, 4, 3, 1],
  [4, 1, 7, 2, 9, 3, 6, 5, 8],
  [5, 6, 9, 1, 3, 4, 7, 8, 2],
  [1, 2, 3, 6, 7, 8, 5, 4, 9],
  [7, 4, 8, 5, 2, 9, 1, 6, 3],
  [6, 5, 2, 7, 8, 1, 3, 9, 4],
  [9, 8, 1, 3, 4, 5, 2, 7, 6],
  [3, 7, 4, 9, 6, 2, 8, 1, 5],
];

// Valid 4x4 Sudoku grid with block size 2
const valid4x4Grid = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 3, 4, 1],
  [4, 1, 2, 3],
];

// Invalid Sudoku grid with duplicate in a row (also checks columns and blocks)
const invalidGrid = [
  [1, 3, 5, 4, 1, 6, 9, 2, 7], // duplicate 1 in the first row
  [2, 9, 6, 8, 5, 7, 4, 3, 1],
  [4, 1, 7, 2, 9, 3, 6, 5, 8],
  [5, 6, 9, 1, 3, 4, 7, 8, 2],
  [1, 2, 3, 6, 7, 8, 5, 4, 9],
  [7, 4, 8, 5, 2, 9, 1, 6, 3],
  [6, 5, 2, 7, 8, 1, 3, 9, 4],
  [9, 8, 1, 3, 4, 5, 2, 7, 6],
  [3, 7, 4, 9, 6, 2, 8, 1, 5],
];

// Invalid Sudoku grid with an out-of-range value
const outOfRangeGrid = [
  [8, 3, 5, 4, 1, 6, 9, 2, 7],
  [2, 9, 6, 8, 5, 7, 4, 3, 1],
  [4, 1, 7, 2, 9, 3, 6, 5, 8],
  [5, 6, 9, 1, 3, 4, 7, 8, 2],
  [1, 2, 3, 6, 7, 8, 5, 4, 9],
  [7, 4, 8, 5, 2, 9, 1, 6, 3],
  [6, 5, 2, 7, 8, 1, 3, 9, 4],
  [9, 8, 1, 3, 4, 5, 2, 7, 6],
  [3, 7, 4, 9, 6, 2, 8, 1, 10], // out-of-range value (10)
];

// Invalid grid size (not 9x9 or 4x4)
const invalidSizeGrid9x9 = [
  [8, 3, 5, 4, 1, 6, 9, 2, 7],
  [2, 9, 6, 8, 5, 7, 4, 3, 1],
  [4, 1, 7, 2, 9, 3, 6, 5, 8],
  [5, 6, 9, 1, 3, 4, 7, 8, 2],
  [1, 2, 3, 6, 7, 8, 5, 4, 9],
  [7, 4, 8, 5, 2, 9, 1, 6, 3],
  [6, 5, 2, 7, 8, 1, 3, 9, 4],
  [9, 8, 1, 3, 4, 5, 2, 7, 6],
]; // only 8 rows

const invalidSizeGrid4x4 = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 3, 4, 1],
]; // only 3 rows

test("should return true for a valid 9x9 sudoku grid", () => {
  expect(validSudoku(valid9x9Grid)).toBe(true);
});

test("should return true for a valid 4x4 sudoku grid with block size 2", () => {
  expect(validSudoku(valid4x4Grid, 2)).toBe(true);
});

test("should return false for an invalid sudoku grid with duplicate values", () => {
  expect(validSudoku(invalidGrid)).toBe(false);
});

test("should return false for a sudoku grid with an out-of-range value", () => {
  expect(validSudoku(outOfRangeGrid)).toBe(false);
});

test("should throw an error for a 9x9 sudoku grid with incorrect size", () => {
  expect(() => validSudoku(invalidSizeGrid9x9)).toThrow(/invalid.*rows/i);
});

test("should throw an error for a 4x4 sudoku grid with incorrect size", () => {
  expect(() => validSudoku(invalidSizeGrid4x4, 2)).toThrow();
});
