
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
        return num1 * num2;
    },

    memory: {
        firstNum: 0,
        secondNum: 0,
        storage: 0,
        operator,
    },

    operate: operate,

}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);

    }
}

export { calculator, memory };