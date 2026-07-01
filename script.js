let grid = document.getElementById('grid');
let scoreDisplay = document.getElementById('score');
let squares =[];
let currentSnake = [2,1,0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let timerId = 20;
let intervalTime = 200;
function createBoard(){    
    for(let i = 0;i<400;i++){
        let square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard();
function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2,1,0];
    score = 0; direction = 1; intervalTime = 200;
    scoreDisplay.textContent = score;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    generateApple()
    timerId = setInterval(move, intervalTime);
}
function endGame() {
    return clearInterval(timerId);
}
function handleSwipe(){
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;

    let absDx = Math.abs(dx);
    let absDy = Math.abs(dy);

    if (Math.max(absDx,absDy)>30){
        if (absDx > absDy){
            if (dx>0) changeDir(-1);
            else changeDir(1);
        } else{
            if (dy>0) changeDir(20);
            else changeDir(-20);
        }
    }
}
function move(){

    //בדיקת פסילה
    let hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    let hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    let hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    let hitLeft = (currentSnake[0] % 20 === 0 && direction === -1);
    let hitSelf = squares[currentSnake[0] + direction]?.classList.contains('snake');
    if (hitBottom|| hitLeft || hitRight || hitTop || hitSelf){
        return endGame;
    }
    let tail = currentSnake.pop();
    let newHead = currentSnake[0] + direction;
    squares[tail].classList.remove('snake');
    squares[newHead].classList.add('snake');
    currentSnake.unshift(newHead);

    if (squares[newHead].classList.contains('apple')){
        squares[appleIndex].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        score++; scoreDisplay.textContent = score;
        generateApple();
    }
    document.addEventListener('touchstart', a => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    },false);

    document.addEventListener('touchend', a => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe()
    },false);

   
}
function generateApple(){
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
}
//שינוי כיוון
function changeDir(newDir){
    //מניעת פניית פרסה
    if (direction + newDir !== 0){;
        direction = newDir;
    }
}
//חצים במחשב
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeDir(-20);
    if (e.key === 'ArrowDown') changeDir(20);
    if (e.key === 'ArrowLeft') changeDir(-1);
    if (e.key === 'ArrowRight') changeDir(1);
})

