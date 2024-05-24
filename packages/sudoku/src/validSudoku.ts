/**
 * Calculates the block index for a given row and column in a Sudoku board.
 *
 * @param {number} rowIdx - The row index of the cell.
 * @param {number} colIdx - The column index of the cell.
 * @param {number} blockSize - The size of the block (default is 3 for a standard 9x9 Sudoku).
 * @returns {number} The index of the block that the cell belongs to.
 */
function getBlockIdx(
  rowIdx: number,
  colIdx: number,
  blockSize: number,
): number {
  const blockRowIdx = rowIdx - (rowIdx % blockSize);
  const blockColIdx = colIdx - (colIdx % blockSize);
  return blockRowIdx + blockColIdx / blockSize;
}

/**
 * Validates a Sudoku board.
 *
 * @param board - The Sudoku board represented as a 2D array of numbers.
 * Each sub-array represents a row on the board.
 * @param [blockSize=3] - The size of the blocks in the Sudoku board.
 * For a standard 9x9 Sudoku, this is 3. For a 4x4 Sudoku, this would be 2.
 * @returns True if the Sudoku board is valid, false otherwise.
 * @throws If the board has an incorrect number of rows or columns.
 */
export function validSudoku(board: number[][], blockSize = 3): boolean {
  const size = blockSize * blockSize;

  // Ensure the board has the correct number of rows
  if (board.length !== size) {
    throw new Error(
      `Invalid number of rows\nExpected: ${size}. Received: ${board.length}`,
    );
  }

  const cols: Record<number, Set<number>> = {};
  const blocks: Record<number, Set<number>> = {};

  for (let rowIdx = 0; rowIdx < size; rowIdx++) {
    const currentRow = board[rowIdx];

    // Ensure the row has the correct length
    if (!currentRow || currentRow.length !== size) {
      throw new Error(
        `Invalid number of columns in row ${
          rowIdx + 1
        }\nExpected: ${size}. Received: ${currentRow?.length}`,
      );
    }

    // Validate row instantly
    const rowSet = new Set<number>(currentRow);
    if (rowSet.size !== size) return false;

    for (let colIdx = 0; colIdx < size; colIdx++) {
      const value = currentRow[colIdx];
      if (!value || value < 1 || value > size) return false;

      // Initialize sets if necessary and check for duplicates in the column
      cols[colIdx] ??= new Set<number>();
      if (cols[colIdx]?.has(value)) return false;
      cols[colIdx]?.add(value);

      // Initialize sets if necessary and check for duplicates in the block
      const blockIdx = getBlockIdx(rowIdx, colIdx, blockSize);
      blocks[blockIdx] ??= new Set<number>();
      if (blocks[blockIdx]?.has(value)) return false;
      blocks[blockIdx]?.add(value);
    }
  }

  return true;
}
