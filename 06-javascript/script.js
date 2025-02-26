// canvasWidth, canvasHeight
// drawLine(x1, y1, x2, y2)
// drawCircle(x, y, r)
// setLineColor(r, g, b)
// setLineWidth(width)
// clear()


const saturation = 35;
const lightness = 55;

// I cheated by changing the setLineColor() function to take HSL values instead of RGB in canvas.js
setLineColor(0, saturation, lightness);
setLineWidth(2);

const radius = 20;
let positionX = 0;
let positionY = radius;
let row = 0;
let column = 0;

console.log('canvasWidth', canvasWidth, 'canvasHeight', canvasHeight);

while (positionY - radius < canvasHeight) {
    while (positionX < canvasWidth) {
        const hue = (positionX / canvasWidth + positionY / canvasHeight) * 180;
        setLineColor(hue, saturation, lightness);

        drawCircle(positionX, positionY, radius);
        positionX += radius * 2;
        column++;
    }
    positionY += radius * 2;
    positionX = radius * (1 - row % 2);
    column = 0;
    row++;
}
