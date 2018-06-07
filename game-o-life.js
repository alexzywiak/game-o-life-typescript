const { genBoard, runTurn } = require('./game-o-life-utils');

let board = genBoard(5);
console.log(board);

setInterval(() => {
    board = runTurn(board);
    console.log(board);
}, 1000);