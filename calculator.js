
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

function parseString(string) {
    // parses string and returns numbers and operators
    // regular brackets to include separator into split array
    const regex = /([+\-*\\/])/

    if (string.match(/^[-]d*/)) {
        const strippedString = string.slice(1,);
        const strippedArray = strippedString.split(regex);
        strippedArray[0] = "-" + strippedArray[0];
        return strippedArray;
    }

    return string.split(regex);
}

function process(e) {
    if (e.target.className !== "buttons") {
        switch (e.target.value) {
            case "clear":
                setDefaultInputValue();
                enableOperatingButtons();
                break;
            case "add":
                performOperation("+");
                break;
            case "subtract":
                performOperation("-");
                break;    
            case "multiply":
                performOperation("*");
                break;
            case "divide":
                performOperation("/");
                break;
            case "equals":
                performOperation("=");
                break;
            default:
                if (selectors.input.value === "0") {
                    clearDefaultInputValue();
                }
                selectors.input.value += e.target.value;
                break;
        }
    }
}

function isDividingByZero(elements) {
    return elements[1] === "/" && Number(elements[2]) === 0;
}

function processDividingByZero() {
    selectors.input.value="division by 0";
}

function disableOperatingButtons() {
    for (let button of selectors.operatingButtons) {
        button.disabled = "disabled";
    }
}

function enableOperatingButtons() {
    for (let button of selectors.operatingButtons) {
        button.disabled = false;
    }
}

function performOperation(operator) {
    // capture input prior to appending new operator to pass to the parser
    const valueToParse = selectors.input.value;
    if (operator !== "=") {
        selectors.input.value += operator;
    }
    const elements = parseString(valueToParse);
    if (elements.length === 3) {
        if (isDividingByZero(elements)) {
            processDividingByZero();
            disableOperatingButtons();
            return;
        }
        const result = operate(Number(elements[0]), Number(elements[2]), elements[1]);
        selectors.input.value = operator === "=" ? result : result + operator;
    }    
}

function setDefaultInputValue() {
    selectors.input.value = "0";
}

function clearDefaultInputValue() {
    selectors.input.value = "";
}

const selectors = {
    buttonContainer: document.querySelector(".buttons"),
    input: document.querySelector(".calc-input"),
    operatingButtons: document.querySelectorAll(".buttons > button:not(:first-child"),
}


selectors.buttonContainer.addEventListener('click', process);
setDefaultInputValue();