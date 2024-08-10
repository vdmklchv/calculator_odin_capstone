const num="3+2";
const num2="-3+2";

function parseString(string) {
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

console.log(parseString(num));