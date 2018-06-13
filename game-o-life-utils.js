var ALIVE = "@";
var DEAD = "-";
var genBoard = function (n) {
    var board = [];
    for (var i = 0; i < n; i++) {
        board[i] = [];
        for (var j = 0; j < n; j++) {
            board[i][j] = Math.random() > 0.5 ? ALIVE : DEAD;
        }
    }
    return board;
};
var getLiveNeighbors = function (board, x, y, alive) {
    if (alive === void 0) { alive = ALIVE; }
    var vectors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1]
    ];
    return vectors.reduce(function (neighbors, vector) {
        var nX = x + vector[0];
        var nY = y + vector[1];
        if (isInBounds(board, nX, nY) && board[nX][nY] === alive) {
            return neighbors + 1;
        }
        return neighbors;
    }, 0);
};
var isInBounds = function (board, x, y) {
    return x >= 0 && y >= 0 && x < board.length && y < board[0].length;
};
var forEachCell = function (board, cb) {
    return board.slice().map(function (row, x) {
        return row.slice().map(function (cell, y) {
            return cb(cell, x, y);
        });
    });
};
var runTurn = function (board) {
    return forEachCell(board, function (cell, x, y) {
        var neighbors = getLiveNeighbors(board, x, y);
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
    forEachCell: forEachCell,
    getLiveNeighbors: getLiveNeighbors,
    genBoard: genBoard,
    isInBounds: isInBounds,
    runTurn: runTurn
};
