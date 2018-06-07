const ALIVE = "@";
const DEAD = "-";

const genBoard = (n) => {
  const board = [];
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] = Math.random() > 0.5 ? ALIVE : DEAD;
    }
  }

  return board;
};

const getLiveNeighbors = (
  board,
  x,
  y,
  alive = ALIVE
) => {
  const vectors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
  ];
  return vectors.reduce((neighbors, vector) => {
    const nX = x + vector[0];
    const nY = y + vector[1];

    if (isInBounds(board, nX, nY) && board[nX][nY] === alive) {
      return neighbors + 1;
    }
    return neighbors;
  }, 0);
};

const isInBounds = (board, x, y) => {
  return x >= 0 && y >= 0 && x < board.length && y < board[0].length;
};

const forEachCell = (
  board,
  cb,
) => {
  return board.slice().map((row, x) => {
    return row.slice().map((cell, y) => {
      return cb(cell, x, y);
    });
  });
};

const runTurn = (board) => {
  return forEachCell(board, (cell, x, y) => {
    const neighbors = getLiveNeighbors(board, x, y);
    if (cell === ALIVE) {
      if (neighbors === 3 || neighbors === 2) {
        return ALIVE;
      }
      return DEAD;
    }

    if (neighbors === 3) {
      return ALIVE;
    }
    return DEAD;
  });
};

module.exports = {
  forEachCell,
  getLiveNeighbors,
  genBoard,
  isInBounds,
  runTurn
};
