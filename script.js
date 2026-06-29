let grid = document.getElementById('grid');
let scoreDisplay = document.getElementById('score');
let squares =[];
let currentSnake = [2,1,0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 0;
let intervalTime = 200;
function createBoard(){    
    for(let i = 0;i<400;i==){
        let square = document.createElement('div');
        let squareChild[];
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();
