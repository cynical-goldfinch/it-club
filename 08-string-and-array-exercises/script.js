const defaultLogOutput = document.getElementById('consoleDisplay');
let currentLogOutput = defaultLogOutput;
const outputContainer = document.body;


const doExercise = (exerciseNumber, exercise) => {
    const exerciseHeader = document.createElement('h1');
    exerciseHeader.textContent = `Задача #${exerciseNumber}`;
    outputContainer.append(exerciseHeader);
    console.log(`======== Задача #${exerciseNumber} ========`);

    const exerciseLog = document.createElement('ul');
    exerciseLog.classList.add('console');
    outputContainer.append(exerciseLog);

    currentLogOutput = exerciseLog;
    exercise();
    currentLogOutput = defaultLogOutput;
}

const log = (...data) => {
    console.log(...data);

    const li = document.createElement('li');
    for (const loggedElement of data) {
        const div = document.createElement('div');
        if (Array.isArray(loggedElement)) {
            div.textContent = JSON.stringify(loggedElement).replaceAll(',', ', ');
        } else {
            div.textContent = JSON.stringify(loggedElement);
        }
        li.appendChild(div);
    }
    currentLogOutput.appendChild(li);
}

const exercise1 = () => {
    const process = input => {
        if (input.length > 1) {
            const output = input.slice(-2, -1);
            log(`Предпоследний символ в '${input}'`, output);
        } else {
            log(`Строка '${input}' содержит менее 2 символов`);
        }
    }
    process('Hello');
    process('Я');
    process('Мы');

}

const exercise2 = () => {
    const input = [1, '', 2, 3, '', 5];
    log('Исходный массив', input);
    const output = input.filter(element => element !== '');
    log('Массив без пустых элементов', output);
}

const exercise3 = () => {
    const process = (input1, input2) => {
        log('Массив 1', input1, 'Массив 2', input2);
        const output = input2.slice(0, input1.length);
        log('Массив 2, подрезанный до длины не больше массива 1', output);
    }
    process([1, 2, 3], [1, 2, 3, 4, 5]);
    process([1, 2, 3], [4, 5, 6, 7, 8, 9]);
    process([1, 2, 3], [4, 5]);
}

const exercise4 = () => {
    const output = [];
    for (let number = 10; number <= 1000; number++) {
        if (Math.floor((number / 10)) % 2 === 0) {
            output.push(number);
        }
    }
    log('Числа от 10 до 1000, у которых предпоследняя цифра чётная', output);
}

const exercise5 = () => {
    const process = input => {
        log('Исходный массив', input);

        const output = [...input];
        for (let i = 1; i < output.length; i = i + 2) {
            output[i - 1] = input[i];
            output[i] = input[i - 1];
        }
        log('Массив с переставленной каждой парой элементов', output);
    }
    process([1, 2, 3, 4, 5, 6]);
    process(['a', 'b', 'c'])
}

const exercise6 = () => {
    const input = "apple banana apricot orange avocado";
    log('Исходный текст', input);
    const output = input
        .split(' ')
        .filter(word => word.startsWith('a'));
    log("Слова на букву 'a'", output);
}

const exercise7 = () => {
    const process = input => {
        log('Исходное число', input);
        const output = input
            .toString()
            .split('')
            .sort()
            .join('');
        log("Цифры переставлены по возрастанию", output);
    };
    process(35142);
    process(509701);
}

const exercise8 = () => {
    const process = input => {
        log('Исходный массив', input);
        const output = input.filter(
            element =>
                element
                    .toString()
                    .replace('.', '')
                    .length
                < 3
        );
        log('Только элементы, у которых меньше 3 цифр', output);
    }
    process([12, 3456, 78, 90, 1234, 56]);
    process([12.34, 3.1, 71, 8.083, 0.5, 1.15]);
}

const exercise9 = () => {
    const input = "Hello, how are you?";
    log('Исходная строка', input);

    const output1 = input.replace(/[aeiou]/gi, '');
    log('Строка без гласных букв (использованы regular expressions)', output1);

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const output2 = output1
        .split('')
        .filter(symbol => !vowels.includes(symbol.toLowerCase()))
        .join('');
    log('Строка без гласных букв (использован фильтр букв)', output2);
}

const exercise10 = () => {
    const process = input => {
        log('Исходная строка', input);

        const output1 = input.replace(/.\b/g, letter => letter.toUpperCase())
        log('Строка с заглавной буквой в конце каждого слова (использован простенький regular expression)', output1);

        const output2 = input.replace(/\p{L}(?=\P{L}|$)/gu, letter => letter.toUpperCase())
        log('Строка с заглавной буквой в конце каждого слова (использован regular expression посложнее с поддержкой unicode)', output2);

        const output3 = input
            .split(' ')
            .map(word => `${word.slice(0, -1)}${word.at(-1).toUpperCase()}`)
            .join(' ')
        log('Строка с заглавной буквой в конце каждого слова (использован map на словах)', output3);

    };
    process("hello world this is a test");
    process("hello world, this is a test!");
    process("Привет, теперь я на русском.");
}

const exercise11 = () => {
    const output = [];
    for (let number = 1; number <= 1000; number++) {
        const digitSum = number
            .toString()
            .split('')
            .map(Number)
            .reduce((runningSum, element) => runningSum + element, 0);
        if (digitSum === 13) {
            output.push(number);
        }
    }
    log('Числа от 1 до 1000, сумма цифр которых равна 13', output);
}

const exercise12 = () => {
    const cutString = (cutLength, str) => str.slice(0, cutLength);

    const process = (cutLength, str) => {
        const output = cutString(cutLength, str);
        log(`Строка '${str}', обрезанная до ${cutLength} символов`, output);
    }
    process(5, 'I am a string');
    process(13, 'The quick brown fox is quite tired of jumping');
}

const exercise13 = () => {
    const zodiacSigns = [
        { sign: "Козерог", start: 1222, end: 1231 },
        { sign: "Козерог", start: 101, end: 119 },
        { sign: "Водолей", start: 120, end: 218 },
        { sign: "Рыбы", start: 219, end: 320 },
        { sign: "Овен", start: 321, end: 419 },
        { sign: "Телец", start: 420, end: 520 },
        { sign: "Близнецы", start: 521, end: 620 },
        { sign: "Рак", start: 621, end: 722 },
        { sign: "Лев", start: 723, end: 822 },
        { sign: "Дева", start: 823, end: 922 },
        { sign: "Весы", start: 923, end: 1022 },
        { sign: "Скорпион", start: 1023, end: 1121 },
        { sign: "Стрелец", start: 1122, end: 1221 },
    ];

    const findZodiac = (date) => {
        const dateAsNumber = (date.getMonth() + 1) * 100 + date.getDate();
        return zodiacSigns.find(zodiac => zodiac.start <= dateAsNumber && zodiac.end >= dateAsNumber).sign;
    }

    const process = (date) => {
        const output = findZodiac(date);
        log(`Знак зодиака для даты ${date.toLocaleDateString('ru-RU', { dateStyle: 'long' })}`, output);
    }
    process(new Date('1970-03-17'));
    process(new Date('2012-11-22'));
    process(new Date('2025-08-22'));
    process(new Date('2025-01-01'));
    process(new Date('2025-09-22'));
}

const exercise14 = () => {
    const findDivisors = number => {
        const divisors = [];

        if (number == 0) {
            return [];
        }

        if (number < 2) {
            return [number];
        }

        let candidate = 2;
        let leftToDivide = number
        while (candidate <= leftToDivide) {
            if (leftToDivide % candidate == 0) {
                divisors.push(candidate);
                leftToDivide = leftToDivide / candidate;
                candidate = 2;
            } else {
                candidate++;
            }
        }
        return divisors;
    };

    const sumDivisors = number => {
        const divisors = findDivisors(number);
        const divisorSum = divisors.reduce((runningSum, divisor) => runningSum += divisor, 0);
        return divisorSum;
    };

    const process = (number) => {
        const divisors = findDivisors(number);
        const divisorSum = sumDivisors(number);
        log(`Делители числа ${number}`, divisors, `Сумма делителей числа ${number}`, divisorSum);
    }
    process(0);
    process(1);
    process(2);
    process(5);
    process(36);
    process(9875327);
}

const exercise15 = () => {
    const daysLeftUntilEndOfMonth = () => {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const daysLeft = lastDayOfMonth.getDate() - today.getDate();
        return daysLeft
    }

    const daysLeft = daysLeftUntilEndOfMonth();
    log('Осталось дней до конца текущего месяца', daysLeft);
}

const exercise16 = () => {
    const getNearestWeekdays = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1)
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1)

        const toWeekdayString = date => date.toLocaleDateString('ru-RU', { weekday: 'short' });
        return {
            next: toWeekdayString(tomorrow),
            curr: toWeekdayString(today),
            prev: toWeekdayString(yesterday),
        };
    }

    const weekdays = getNearestWeekdays();
    log('Предыдущий, текущий и следующий дни недели', weekdays);
}

doExercise(1, exercise1);
doExercise(2, exercise2);
doExercise(3, exercise3);
doExercise(4, exercise4);
doExercise(5, exercise5);
doExercise(6, exercise6);
doExercise(7, exercise7);
doExercise(8, exercise8);
doExercise(9, exercise9);
doExercise(10, exercise10);
doExercise(11, exercise11);
doExercise(12, exercise12);
doExercise(13, exercise13);
doExercise(14, exercise14);
doExercise(15, exercise15);
doExercise(16, exercise16);