const newBoxSize = 200;

const box = document.getElementsByClassName('box')[0];
const body = document.body;
const html = document.documentElement;

let currentBox = null;

const isPrimaryButtonPressed = event => event.buttons & 1;
const isAuxiliaryButtonPressed = event => event.buttons & 4;

const clipCoordinate = (coordinate, min, max) => {
    if (coordinate < min) {
        return min;
    } else if (coordinate > max) {
        return max;
    } else {
        return coordinate;
    }
}

const clipCoordinates = (x, y, width, height) => {
    const moveBounds = body.getBoundingClientRect();
    const newX = clipCoordinate(x, moveBounds.left, moveBounds.right - width);
    const newY = clipCoordinate(y, moveBounds.top, moveBounds.bottom - height);
    return { x: newX, y: newY };
}

const setBoxCoordinates = (box, { x, y }) => {
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
};


const createNewBox = (x, y) => {
    const newBox = document.createElement('div');
    newBox.classList.add('box');
    newBox.style.width = `${newBoxSize}px`;
    newBox.style.height = `${newBoxSize}px`;
    const newBoxCoordinates = clipCoordinates(
        x - Math.floor(newBoxSize / 2),
        y - Math.floor(newBoxSize / 2),
        newBoxSize,
        newBoxSize
    );
    setBoxCoordinates(newBox, newBoxCoordinates);
    body.appendChild(newBox);
    return newBox;
};

const bringBoxToFront = box => {
    const allBoxes = Array.from(document.querySelectorAll('.box'));
    allBoxes.sort((a, b) => a.style.zIndex - b.style.zIndex);

    let zIndex = 1;
    for (const someBox of allBoxes) {
        someBox.style.zIndex = zIndex++;
        someBox.classList.remove('top');
    }
    box.style.zIndex = zIndex;
    box.classList.add('top');
}

const handleBodyMouseDown = event => {
    const clickedBox = event.target.closest('.box');

    if (isAuxiliaryButtonPressed(event)) {
        if (clickedBox != null) {
            clickedBox.remove();
        }
    } else if (isPrimaryButtonPressed(event)) {
        if (clickedBox == null) {
            currentBox = createNewBox(event.clientX, event.clientY);
        } else {
            currentBox = clickedBox;
        }
        bringBoxToFront(currentBox);
    }
};

const handleBodyMouseUp = event => {
    if (isPrimaryButtonPressed(event)) {
        return;
    }
    currentBox = null;
};

const handleBodyMouseLeave = () => {
    currentBox = null;
}

const handleBodyMouseMove = event => {
    if (currentBox == null) {
        return;
    }

    const boxRect = currentBox.getBoundingClientRect();
    const newBoxCoordinates = clipCoordinates(
        boxRect.left + event.movementX,
        boxRect.top + event.movementY,
        boxRect.width,
        boxRect.height
    );
    setBoxCoordinates(currentBox, newBoxCoordinates);
}

body.addEventListener('mousedown', handleBodyMouseDown);
body.addEventListener('mouseup', handleBodyMouseUp);
body.addEventListener('mouseleave', handleBodyMouseLeave);
body.addEventListener('mousemove', handleBodyMouseMove);
