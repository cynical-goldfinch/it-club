const animationIntervalInMilliseconds = 10;

const logo = document.getElementById('logo');
const logoHeight = logo.clientHeight;
const logoWidth = logo.clientWidth;

let logoX = 0;
let logoY = 0;
let xIncrement = 5;
let yIncrement = 5;

const changeLogoColor = () => {
    const randomBackgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`;
    logo.style.backgroundColor = randomBackgroundColor;
}

const onInterval = () => {
    if ((logoX + logoWidth + xIncrement > window.innerWidth) || (logoX + xIncrement < 0)) {
        xIncrement = -xIncrement;
        changeLogoColor();
    }
    if ((logoY + logoHeight + yIncrement > window.innerHeight) || (logoY + yIncrement < 0)) {
        yIncrement = -yIncrement;
        changeLogoColor();
    }

    logoX += xIncrement;
    logoY += yIncrement;
    logo.style.left = `${logoX}px`
    logo.style.top = `${logoY}px`
}

setInterval(onInterval, animationIntervalInMilliseconds);
