const playBoardView = document.querySelector('.play-board');
const scoreView = document.querySelector('.score');
const highScoreView = document.querySelector('.high-score');
const controlViews = document.querySelectorAll('.controls i');

let gameOver = false;
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

const changeDirection = event => {
    if (event.key === 'ArrowUp' && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (event.key === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (event.key === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (event.key === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const initGame = () => {
    const playBoardFragment = document.createDocumentFragment();
    
    const foodView = document.createElement('div');
    foodView.classList.add('food');
    foodView.style.gridArea = `${foodY} / ${foodX}`;
    
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        scoreView.textContent = `Score: ${score}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    
    for (let i = 0; i < snakeBody.length; i++) {
        const snakeSegmentView = document.createElement('div');
        snakeSegmentView.classList.add('head');
        snakeSegmentView.style.gridArea = `${snakeBody[i][1]} / ${snakeBody[i][0]}`;
        playBoardFragment.appendChild(snakeSegmentView);
    }
    
    playBoardFragment.appendChild(foodView);

    playBoardView.innerHTML = playBoardFragment.innerHTML;
    // removeChildren(playBoardView);
    // playBoardView.appendChild(playBoardFragment);
};

const removeChildren = (element) => {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 200);

document.addEventListener('keydown', changeDirection);