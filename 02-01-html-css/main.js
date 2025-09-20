const button = document.getElementById('unique-button');

function sayHello() {
    console.log('Hello in function');
}

const sayBye = () => {
    console.log('Bye in function');
}

const changeColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
};

// button.addEventListener('click', changeColor);
