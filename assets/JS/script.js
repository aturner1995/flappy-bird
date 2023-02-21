const bird = document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const ground = document.querySelector('.ground');
const scoreEl = document.querySelector('.score');

let birdLeft = 220;
let birdBottom = 250;
let gravity = 2;
let isGameOver = false;
let gap = 450;
let score = 0;

const startGame = () => {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
}

let gameTimerId = setInterval(startGame, 20);

const control = (e) => {
    if (e.keyCode === 32) {
        jump();
    }
}

const jump = () => {
    if (birdBottom < 490) {
        birdBottom += 50;
        bird.style.bottom = birdBottom + 'px'
    }
}

const createObstacle = () => {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    const topObstacle = document.createElement('div');
    if (!isGameOver) {
        obstacle.classList.add('obstacle');
        topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    const moveObstacle = () => {
        obstacleLeft -= 2
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        if (obstacleLeft === -60) {
            clearInterval(timerId);
            gameDisplay.removeChild(obstacle);
            gameDisplay.removeChild(topObstacle);
        }
        if (
            obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap-200) ||
            birdBottom === 0) {
            gameOver();  
            clearInterval(timerId) 
        }
    }

    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) {
        setTimeout(createObstacle, 3000);
    };
}

const scoreTracker = () => {
    score += 1;
    scoreEl.textContent ='Score: ' + score;
}

let scoreValue = setInterval(scoreTracker,3000);

const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(scoreValue);
    isGameOver = true;
    document.removeEventListener('keyup', control)
}




document.addEventListener('keyup', control);

startGame();
createObstacle();