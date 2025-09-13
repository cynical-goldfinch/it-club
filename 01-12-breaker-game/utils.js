const coordsView = document.getElementById('coords');

const onMouseMove = (event) => {
    const rect = $canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);

    coordsView.innerText = `(${x}, ${y})`;
}
