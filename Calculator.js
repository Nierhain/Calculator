
// input: '4+5/4 -6' | can contain: whitespaces, operators, numbers, false operators, false numbers, parenthesis
// output calculated value
// get string -> trim string -> parse string -> calculate -> ??? -> profit

let testCases = ['4+5 *3 -25/5','4+5/4-6','1+1-1+2-3']

const ADD_OPERATOR = '+'
const SUBTRACT_OPERATOR = '-'
const MULTIPLY_OPERATOR = '*'
const DIVIDE_OPERATOR = '/'

function calculate(calcString){
    let numbers = [], operators = [], result = 0
    calcString = trimString(calcString)
    numbers =  extractNumbers(calcString)
    operators = extractOperators(calcString)

    if(isSingleOperation(operators) || isSameOperationType(operators)){
        result = chainCalculation(numbers, operators)
    } else {
        result = arithmeticCalculation(numbers, operators)
    }
    return result
}

/*
 *
 *  PARSING INPUT
 * 
*/
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

/*
 *
 *  CHECK OPERATION TYPE(S)
 * 
*/

function isChainableCalculation(operators){
    return isSameOperationType(operators) || isSingleOperation(operators)
}

function isSingleOperation(ops){
    return ops.every((el) => {el == ADD_OPERATOR}) || ops.every((el) => {el == SUBTRACT_OPERATOR}) || ops.every((el) => {el == MULTIPLY_OPERATOR}) || ops.every((el) => {el == DIVIDE_OPERATOR})
}

function isSameOperationType(ops){
    return ops.every(el => el == ADD_OPERATOR || el == SUBTRACT_OPERATOR ) || ops.every(el => el == MULTIPLY_OPERATOR || el == DIVIDE_OPERATOR)
}

/*
 *
 *  CALCULATIONS
 * 
*/

function chainCalculation(numbers, operators){
    let result = 0
    do {
        result = calculationStep(operators[0], numbers[0], numbers[1])
        numbers.splice(0,2)
        numbers.unshift(result)
        operators.shift()
    } while(numbers.length > 1)
    return result
}

function arithmeticCalculation(numbers, operators) {
    let opIndex = 0, leftNumberIndex = 0, leftNumber = 0, result = 0

    do {
        // sample string: '4+5-6/12+7'
        // sample values: [4,5,6,12,7]
        // sample operators: ['+','-','/','+'] => 2 
        // indices:: operator: 2 | leftNumber: op | rightNumber: op + 1

        // find index of first multiplication/division
        // find indices of "left" and "right" number
        // calculate value
        // delete indices from original arrays
        // put result into array at leftNumberIndex

        opIndex = operators.findIndex(checkOperation)
        leftNumberIndex = opIndex
        rightNumberIndex = leftNumberIndex + 1
        leftNumber = calculationStep(operators[opIndex], numbers[leftNumberIndex], numbers[rightNumberIndex])
        operators.splice(opIndex, 1)
        numbers.splice(rightNumberIndex, 1)
        numbers[leftNumberIndex] = leftNumber
    } while(operators.includes(MULTIPLY_OPERATOR) || operators.includes(DIVIDE_OPERATOR))

    if(numbers.length > 1){
        result = chainCalculation(numbers, operators)
    } else {
        result = numbers[0] 
    }

    return result
}

function checkOperation(op){
    return op == MULTIPLY_OPERATOR || op == DIVIDE_OPERATOR
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

function userInput(){
    let userString = document.getElementById('inputfield').value
    document.getElementById('inputResult').textContent = calculate(userString)
}

// DEBUGGING / OUTPUT
function debugAll(){
    testCases.forEach((testCase) => console.log(calculate(testCase)))
}

function debugSingle(index){
    res = calculate(testCases[index])
    document.getElementById('result').textContent = res
}