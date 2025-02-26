const $canvasWrapper = document.getElementById('canvas-wrapper');
const $canvas = document.getElementById('canvas');
const canvasWidth = $canvasWrapper.clientWidth;
const canvasHeight = $canvasWrapper.clientHeight;
$canvas.width = canvasWidth;
$canvas.height = canvasHeight;

const ctx = $canvas.getContext('2d');

const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};

const drawCircle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.stroke();
};

const setLineColor = (h, s, l) => {
    ctx.strokeStyle = `hsl(${h} ${s}% ${l}%)`;
};

const setLineWidth = (width) => {
    ctx.lineWidth = width;
};

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
