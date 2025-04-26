const intervalDuration = 20;
const pixelSize = 20;
const boxRowCount = 10;

const pixelCountX = Math.floor(canvasWidth / pixelSize);
const pixelCountY = Math.floor(canvasHeight / pixelSize);

const boxes = Array(pixelCountX).fill(undefined, 0)
    .map(_ => Array(pixelCountY).fill(false, 0));
let ballCoords = { x: 0, y: pixelCountY }; 1
let ballVelocity = { x: 1, y: 1 };


const moveCoords = (coords, velocity) => {
    return {
        x: coords.x + velocity.x,
        y: coords.y + velocity.y,
    }
}

const hasBox = ({ x, y }) => {
    if (
        x < 0
        || y < 0
        || x >= pixelCountX
        || y >= pixelCountY
    ) {
        return false;
    }
    return boxes[x][y];
}

const destroyBox = ({ x, y }) => {
    boxes[x][y] = false;
}

const initBoxes = () => {
    boxes.forEach(column => column.fill(true, 0, boxRowCount));
};

const drawPixel = ({ x, y }) => {
    drawRect(
        x * pixelSize + 1,
        y * pixelSize + 1,
        pixelSize - 2,
        pixelSize - 2
    );
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

    if (diagonalNeighbourCoords.x > pixelCountX - 1) {
        ballVelocity.x = -1;
    } else if (diagonalNeighbourCoords.x < 0) {
        ballVelocity.x = 1;
    }

    if (diagonalNeighbourCoords.y > pixelCountY - 1) {
        ballVelocity.y = -1;
    } else if (diagonalNeighbourCoords.y < 0) {
        ballVelocity.y = 1;
    }

    if (hasBox(horizontalNeighbourCoords) || hasBox(verticalNeighbourCoords)) {
        if (hasBox(horizontalNeighbourCoords)) {
            ballVelocity.x = -ballVelocity.x;
            destroyBox(horizontalNeighbourCoords)
        }
        if (hasBox(verticalNeighbourCoords)) {
            ballVelocity.y = -ballVelocity.y;
            destroyBox(verticalNeighbourCoords)
        }
    } else if (hasBox(diagonalNeighbourCoords)) {
        ballVelocity.x = -ballVelocity.x;
        ballVelocity.y = -ballVelocity.y;
        destroyBox(diagonalNeighbourCoords);
    }

    ballCoords = moveCoords(ballCoords, ballVelocity);
}

const onInterval = () => {
    clear();
    moveBall();
    drawPixel(ballCoords);
    drawBoxes();
}

initBoxes();
setInterval(onInterval, intervalDuration);