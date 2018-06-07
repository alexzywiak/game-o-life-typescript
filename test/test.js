const assert = require('assert');
const { forEachCell, genBoard, isInBounds, getLiveNeighbors } = require('../game-o-life-utils');

describe('stoof', () => {
    it('generates a board', () => {
        const n = 3;
        const board = genBoard(n);
        assert(board.length === n);
        assert(board[0].length === n);
    });
    
    it('does more stoof', () => {
        const board = [[0, 1, 2], [3, 4, 5]];
        const newBoard = forEachCell(board, () => {
            return 100;
        });

        assert(newBoard.every(row => row.every(cell => cell === 100)));
        assert(!board.some(row => row.some(cell => cell === 100)));
    });

    it('determines if in bounds', () => {
        const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        assert(isInBounds(board, 0, 0));
        assert(isInBounds(board, 2, 2));
        assert(!isInBounds(board, -1, 0));
        assert(!isInBounds(board, 0, -1));
        assert(!isInBounds(board, 3, 0));
        assert(!isInBounds(board, 0, 4));
    });

    it('counts neighbors', () => {
        const board = [[0, 1, 0], [0, 0, 0], [0, 1, 0]];
        assert.equal(getLiveNeighbors(board, 0, 0, 1), 1);
        assert.equal(getLiveNeighbors(board, 1, 1, 1), 2);
    });
});