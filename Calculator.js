
// input: '4+5/4 -6' | can contain: whitespaces, operators, numbers, false operators, false numbers
// output calculated value
// get string -> trim string -> parse string -> calculate -> ??? -> profit

let testCases = ['4+5 *3 -25/5','4+5/4-6','1+1']

const ADD_OPERATOR = '+'
const SUBTRACT_OPERATOR = '-'
const MULTIPLY_OPERATOR = '*'
const DIVIDE_OPERATOR = '/'

function calculate(calcString){
    let numbers = [], operators = [], result = 0
    calcString = trimString(calcString)
    numbers =  extractNumbers(calcString)
    operators = extractOperators(calcString)

    do {
        result += calculationStep(operators[0], numbers[0], numbers[1])
        numbers.splice(0,2)
        operators.shift()
        numbers.unshift(result)
    } while( numbers.length > 1)

    outputResult(result)
    return result
}

function trimString(str){
    return str.replace(/\s/g, '')
}

function extractNumbers(str){
    let parsedNumbers = []
    arr = str.split(/\W/g)
    arr.forEach(element => {
        parsedNumbers.push(Number.parseFloat(element))
    })

    return parsedNumbers
}

function extractOperators(str){
    return str.replace(/\d/g, '').split('')
}

function calculationStep(operator, leftNumber, rightNumber) {
    let result = 0
    switch (operator) {
        case ADD_OPERATOR:
            result = leftNumber + rightNumber
            break;
        case SUBTRACT_OPERATOR:
            result = leftNumber - rightNumber
            break;
        case MULTIPLY_OPERATOR:
            result = leftNumber * rightNumber
            break;
        case DIVIDE_OPERATOR:
            result = leftNumber / rightNumber
            break;
    }
    return result
}


// DEBUGGING / OUTPUT
function debugAll(){
    testCases.forEach((testCase) => calculate(testCase))
}

function debugSingle(index){
    res = calculate(testCases[index])
    document.getElementById('result').textContent = res
}

function outputResult(result){
    console.log(result)
}