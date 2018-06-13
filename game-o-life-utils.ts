const ALIVE = "@";
const DEAD = "-";

type Cell = typeof ALIVE | typeof DEAD;
type LifeBoard = Cell[][];

const genBoard = (n: number) => {
  const board: LifeBoard = [];
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] = Math.random() > 0.5 ? ALIVE : DEAD;
    }
  }

  return board;
};

const getLiveNeighbors = (
  board: LifeBoard,
  x: number,
  y: number,
  alive: string = ALIVE
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

const isInBounds = (board: LifeBoard, x: number, y: number) => {
  return x >= 0 && y >= 0 && x < board.length && y < board[0].length;
};

const forEachCell = (
  board: LifeBoard,
  cb: (cell: Cell, x:number, y:number) => Cell,
) => {
  return board.slice().map((row, x) => {
    return row.slice().map((cell, y) => {
      return cb(cell, x, y);
    });
  });
};

const runTurn = (board: LifeBoard) => {
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
