
const calculator = {
    add: (num1, num2) => {
        return num1 + num2;
    },

    subtract: (num1, num2) => {
        return num1 - num2;
    },

    multiply: (num1, num2) => {
        return num1 * num2;
    },

    divide: (num1, num2) => {
        return num1 / num2;
    },

    memory: {
        firstNum: 0,
        secondNum: 0,
        storage: 0,
        operator: "",
    },

    operate: operate,

}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return calculator.add(num1, num2);
        case "-":
            return calculator.subtract(num1, num2);
        case "*":
            return calculator.multiply(num1, num2);
            ;
        case "/":
            return calculator.divide(num1, num2);
    }
}

function process(e) {
    if (e.target.className !== ".buttons") {
        switch (e.target.value) {
            case "clear":
                input.value = "";
                break;
            case "add":
                input.value += "+";
                storeNumber(input.value, false);
                break;
            case "subtract":
                input.value += "-";
                storeNumber(input.value, false);
                break;
            case "multiply":
                input.value += "*";
                storeNumber(input.value, false);
                break;
            case "divide":
                input.value += "/";
                storeNumber(input.value, false);
                break;
            case "equals":
                storeNumber(input.value, true);
                const result = calculator.operate(calculator.memory.firstNum, calculator.memory.secondNum, calculator.memory.operator);
                input.value = result;
                break;
            default:
                input.value += e.target.value;
                break;
        }
    }
}

function storeNumber(inputValue, equalsPressed) {
    if (!equalsPressed) {
        const num1  = Number(inputValue[-1]) ? Number(inputValue) : Number(inputValue.slice(0, -1));
        const operator = inputValue.slice(-1);
        calculator.memory.operator = operator;
        calculator.memory.firstNum = num1;
    } else {
        const regex = /(\d+(\.\d+)?)$/;
        const match = inputValue.match(regex);
        if (match) {
            calculator.memory.secondNum = parseFloat(match);

        }

    }
}

const buttonContainer = document.querySelector(".buttons");
const input = document.querySelector(".calc-input");

buttonContainer.addEventListener('click', process);