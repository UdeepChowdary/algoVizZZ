// 14. N-Queens Backtracking Step Generator
export function generateNQueens(N = 4) {
  const board = Array.from({ length: N }, () => Array(N).fill(0));
  const steps = [];

  function isSafe(b, row, col) {
    for (let i = 0; i < col; i++) if (b[row][i] === 1) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (b[i][j] === 1) return false;
    for (let i = row, j = col; i < N && j >= 0; i++, j--) if (b[i][j] === 1) return false;
    return true;
  }

  function solve(col) {
    if (col >= N) return true;
    for (let i = 0; i < N; i++) {
      steps.push({ board: board.map(r => [...r]), curr: [i, col], N, line: 4, vars: { row: i, col }, note: `Testing queen placement at row ${i}, col ${col}` });
      if (isSafe(board, i, col)) {
        board[i][col] = 1;
        steps.push({ board: board.map(r => [...r]), curr: [i, col], N, line: 5, vars: { row: i, col }, note: `Safe position found! Placed Queen at row ${i}, col ${col}` });
        if (solve(col + 1)) return true;
        board[i][col] = 0;
        steps.push({ board: board.map(r => [...r]), curr: [i, col], N, line: 7, vars: { row: i, col }, note: `Backtracking! Removed Queen from row ${i}, col ${col}` });
      }
    }
    return false;
  }

  solve(0);
  steps.push({ board: board.map(r => [...r]), curr: null, N, line: 2, vars: {}, note: `N-Queens (${N}x${N}) Solution Found!` });
  return steps;
}
