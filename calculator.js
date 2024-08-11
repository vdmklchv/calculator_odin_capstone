
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

function operate(elements) {
    const num1 = Number(elements[0]);
    const num2 = Number(elements[2]);
    const operator = elements[1];

    
    switch (operator) {
        case constants.ADD_OPERATOR:
            return calculator.add(num1, num2);
        case constants.SUBTRACT_OPERATOR:
            return calculator.subtract(num1, num2);
        case constants.MULTIPLY_OPERATOR:
            return calculator.multiply(num1, num2);
            ;
        case constants.DIVIDE_OPERATOR:
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
        strippedArray[0] = constants.SUBTRACT_OPERATOR + strippedArray[0];
        return strippedArray;
    }

    return string.split(regex);
}

function process(e) {
    if (e.target.className !== "buttons") {
        let value = null;
        if (e.type === "click") {
            value = e.target.value;
        } else if (e.type === "keydown") {
            value = e.key;
            if (value === "Enter") {
                value = "equals";
            }
        }
        switch (value) {

            case "clear":
                setDefaultInputValue();
                enableOperatingButtons();
                break;
            case "add":
                performOperation(constants.ADD_OPERATOR);
                break;
            case "subtract":
                performOperation(constants.SUBTRACT_OPERATOR);
                break;    
            case "multiply":
                performOperation(constants.MULTIPLY_OPERATOR);
                break;
            case "divide":
                performOperation(constants.DIVIDE_OPERATOR);
                break;
            case "equals":
                performOperation(constants.EQUALS_OPERATOR);
                break;
            default:
                if (selectors.input.value === "0" && e.target.id !== "backspace-button") {
                    clearDefaultInputValue();
                }
                if (e.target.id !== "backspace-button") {
                    if (e.type === "click") {
                        selectors.input.value += e.target.value;
                    } else {
                        selectors.input.value += e.key;
                    }
                }
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
    if (selectors.input.value === "0") {
        clearDefaultInputValue();
    }
    if (operator !== constants.EQUALS_OPERATOR) {
        selectors.input.value += operator;
    }
    const elements = parseString(valueToParse);
    if (elements.length === 3) {
        if (isDividingByZero(elements)) {
            processDividingByZero();
            disableOperatingButtons();
            return;
        }
        const result = operate(elements);
        selectors.input.value = operator === constants.EQUALS_OPERATOR ? result : result + operator;
    }    
}

function setDefaultInputValue() {
    selectors.input.value = "0";
}

function clearDefaultInputValue() {
    selectors.input.value = "";
}

function removeLastElement() {
    selectors.input.value = selectors.input.value.slice(0, -1);
    if (selectors.input.value === "") {
        selectors.input.value = "0";
    }
}

const constants = {
    ADD_OPERATOR: "+",
    SUBTRACT_OPERATOR: "-",
    MULTIPLY_OPERATOR: "*",
    DIVIDE_OPERATOR: "/",
    EQUALS_OPERATOR: "=",
    DIVISION_BY_ZERO_ERROR: "division by 0",
}


const selectors = {
    buttonContainer: document.querySelector(".buttons"),
    input: document.querySelector(".calc-input"),
    operatingButtons: document.querySelectorAll(".buttons > button:not(:first-child"),
    backspaceButton: document.querySelector("#backspace-button"),
}

document.addEventListener('keydown', process);
selectors.buttonContainer.addEventListener('click', process);
selectors.backspaceButton.addEventListener('click', removeLastElement);
setDefaultInputValue();