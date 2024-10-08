
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
        case constants.DIVIDE_OPERATOR:
            return calculator.divide(num1, num2);
    }
}

function parseString(string) {
    // parses string and returns array of operands and operator
    // regular brackets to include separator into split array
    const regex = /([+\-*\\/])/;

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
        }

        // check if numbers already contain floating point and forbid entering second one for each number
        const dotForbidden = isDotForbidden(selectors.input.value);

        if (dotForbidden) {
            // forbid dot from buttons
            selectors.floatPoint.disabled = true;
            // forbid dot from keyboard
            if (value === ".") {
                value = "";
            }
        } else {
            selectors.floatPoint.disabled = false;
        }

        switch (value) {
            case "clear":
            case "Escape":
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
            case "Enter":
                performOperation(constants.EQUALS_OPERATOR);
                break;
            case "Shift":
                break;
            case "backspace":
            case "Backspace":
                removeLastElement();
                break;
            default:
                if (selectors.input.value === "0" && e.target.id !== "backspace-button") {
                    clearDefaultInputValue();
                }
                // check if only allowed characters, do not allow input of illegal buttons from keyboard
                const regexp = /[0-9\\*\\/\-+\.]/;
                if (value.match(regexp)) {
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
    selectors.input.value=constants.DIVISION_BY_ZERO_ERROR;
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
        let result = operate(elements);
        // check if it is a long float
        const regExp = /\d*\.\d{8,}/;
        // fix long float to 8 digits after the dot
        if (result.toString().match(regExp)) {
            result = result.toPrecision(8);
        }
        // append any operator, but the equals
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

function isDotForbidden(inputValue){
    // allow dot
    const case1regexp = /^.\d*$/;
    const case2regexp = /^.\d*\.?\d*[+\-\*\\]\d*/;
    // restrict dot
    const case3regexp = /^.?\d*\.\d*$/;
    const case4regexp = /^.\d*\.?\d*[+\-\*\\]\d*\.\d*/

    // do not allow dot
    if (inputValue.match(case3regexp) || inputValue.match(case4regexp)) {
        return true;
    }
    // allow dot
    return false;
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
    floatPoint: document.querySelector("#float-point"),
}

document.addEventListener('keydown', process);
selectors.buttonContainer.addEventListener('click', process);
setDefaultInputValue();