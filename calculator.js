
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
        num1: 0,
        num2: undefined,
        operator: undefined,
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
    // regular brackets to include separator into split array
    const regex = /([+\-*\\/])/

    if (string.match(/^[-]d*/)) {
        const strippedString = string.slice(1,);
        // brackets in regex help to keep separator as the element
        const strippedArray = strippedString.split(regex);
        strippedArray[0] = "-" + strippedArray[0];
        return strippedArray;
    }

    return string.split(regex);
}

function process(e) {
    let valueToParse = null;
    let elements = null;
    if (e.target.className !== "buttons") {
        switch (e.target.value) {
            case "clear":
                input.value = "";
                break;
            case "add":
                valueToParse = input.value;
                input.value += "+";
                elements = parseString(valueToParse);
                console.log(elements);
                if (elements.length === 3) {
                    const result = operate(Number(elements[0]), Number(elements[2]), elements[1]);
                    input.value = result + "+";
                }
                break;
            case "subtract":
                // rewrite by changing case names to actual operators and simplify
                // capture input prior to appending new operator to pass to the parser
                valueToParse = input.value;
                input.value += "-";
                elements = parseString(valueToParse);
                if (elements.length === 3) {
                    const result = operate(Number(elements[0]), Number(elements[2]), elements[1]);
                    input.value = result + "-";
                }
                break;    
            case "multiply":
                valueToParse = input.value;
                input.value += "*";
                elements = parseString(valueToParse);
                console.log(elements);
                if (elements.length === 3) {
                    const result = operate(Number(elements[0]), Number(elements[2]), elements[1]);
                    input.value = result + "*";
                }
                break;
            case "divide":
                valueToParse = input.value;
                input.value += "/";
                elements = parseString(valueToParse);
                console.log(elements);
                if (elements.length === 3) {
                    const result = operate(Number(elements[0]), Number(elements[2]), elements[1]);
                    input.value = result + "/";
                }
                break;
            case "equals":
                break;
            default:
                input.value += e.target.value;
                break;
        }
    }
}


const buttonContainer = document.querySelector(".buttons");
const input = document.querySelector(".calc-input");

buttonContainer.addEventListener('click', process);