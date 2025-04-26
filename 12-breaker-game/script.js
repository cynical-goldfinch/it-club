const intervalDuration = 20;
const pixelSize = 20;
const boxRowCount = 10;

const pixelCountX = Math.floor(canvasWidth / pixelSize);
const pixelCountY = Math.floor(canvasHeight / pixelSize);

// console.log('Bounds', pixelCountX, pixelCountY);

const boxes = Array(pixelCountX).fill(undefined, 0)
    .map(_ => Array(pixelCountY).fill(false, 0));
let ballCoords = { x: 0, y: pixelCountY - 1 };
let ballVelocity = { x: 1, y: -1 };
let intervalHandle = undefined;

const moveCoords = (coords, velocity) => {
    return {
        x: coords.x + velocity.x,
        y: coords.y + velocity.y,
    }
}

const outOfBounds = (x, y) => {
    return x < 0
        || y < 0
        || x >= pixelCountX
        || y >= pixelCountY
}

const hasBoxOrWall = ({ x, y }) => {
    if (outOfBounds(x, y)) {
        return true;
    }
    return boxes[x][y];
}

const destroyBox = ({ x, y }) => {
    if (!outOfBounds(x, y)) {
        boxes[x][y] = false;
    }
}

const initBoxes = () => {
    boxes.forEach(column => column.fill(true, 0, boxRowCount));
};

const drawPixel = ({ x, y }, color = { h: 0, s: 100, l: 50 }) => {
    drawRect(
        x * pixelSize + 1,
        y * pixelSize + 1,
        pixelSize - 2,
        pixelSize - 2,
        color
    );
}

const drawBall = (ballCoords) => {
    drawPixel(ballCoords, { h: 237, s: 100, l: 65 });
}

const drawBoxes = () => {
    for (let x = 0; x < pixelCountX; x++) {
        for (let y = 0; y < pixelCountY; y++) {
            if (boxes[x][y]) {
                drawPixel({ x, y });
            }
        }
    }
}

const moveBall = () => {
    const diagonalNeighbourCoords = moveCoords(ballCoords, ballVelocity);
    const verticalNeighbourCoords = moveCoords(ballCoords, { x: 0, y: ballVelocity.y });
    const horizontalNeighbourCoords = moveCoords(ballCoords, { x: ballVelocity.x, y: 0 });

    // console.log('Current ball state', ballCoords, ballVelocity);
    // console.log('Relevant locations', diagonalNeighbourCoords, verticalNeighbourCoords, horizontalNeighbourCoords);
    // console.log('Boxes presence', hasBoxOrWall(diagonalNeighbourCoords), hasBoxOrWall(verticalNeighbourCoords), hasBoxOrWall(horizontalNeighbourCoords));

    if (hasBoxOrWall(horizontalNeighbourCoords) || hasBoxOrWall(verticalNeighbourCoords)) {
        if (hasBoxOrWall(horizontalNeighbourCoords)) {
            ballVelocity.x = -ballVelocity.x;
            destroyBox(horizontalNeighbourCoords)
        }
        if (hasBoxOrWall(verticalNeighbourCoords)) {
            ballVelocity.y = -ballVelocity.y;
            destroyBox(verticalNeighbourCoords)
        }
    } else if (hasBoxOrWall(diagonalNeighbourCoords)) {
        ballVelocity.x = -ballVelocity.x;
        ballVelocity.y = -ballVelocity.y;
        destroyBox(diagonalNeighbourCoords);
    }

    ballCoords = moveCoords(ballCoords, ballVelocity);
}

const onInterval = () => {
    clear();
    moveBall();
    drawBall(ballCoords);
    drawBoxes();
}

const pauseGame = () => {
    clearInterval(intervalHandle);
    intervalHandle = undefined;
}

const continueGame = () => {
    intervalHandle = setInterval(onInterval, intervalDuration);
}

const onPauseButtonClick = () => {
    intervalHandle == undefined
        ? continueGame()
        : pauseGame();
}

initBoxes();
intervalHandle = setInterval(onInterval, intervalDuration);