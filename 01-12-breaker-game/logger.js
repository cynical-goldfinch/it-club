const logEnabled = true;

const log = (...args) => {
    if (logEnabled) {
        console.log(...args);
    }
}
