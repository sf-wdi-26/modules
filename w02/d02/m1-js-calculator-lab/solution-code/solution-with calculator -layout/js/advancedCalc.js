// Setup initial state variables
var inputs        = document.getElementsByTagName("input");
var display       = document.getElementsByClassName("display")[0];
var first_number  = "";
var second_number = "";
var operator      = null;
var log           = "";
var answer;

// Create eventListeners
for( var i=0; i<inputs.length; i++ ) {
  inputs[i].addEventListener("click", run);  
}

// Functions for calculator
function add(first_number, second_number) {
  return parseFloat(first_number) + parseFloat(second_number);
}

function subtract(first_number, second_number) {
  return parseFloat(first_number) - parseFloat(second_number);
}

function divide(first_number, second_number) {
  return parseFloat(first_number) / parseFloat(second_number);
}

function multiply(first_number, second_number) {
  return parseFloat(first_number) * parseFloat(second_number);
}

function calculate(first_number, second_number, operator) {
  switch (operator) {
    case "+":
      return add(first_number, second_number);
    case "-":
      return subtract(first_number, second_number);
    case "/":
      return divide(first_number, second_number);
    case "x":
      return multiply(first_number, second_number);
  }
}

function firstNumberEmpty(first_number) {
  return first_number === "";
}

function secondNumberEmpty(second_number) {
  return second_number === "";
}

function operatorEmpty(operator) {
  return operator === null;
}

function anyOperator(btn) {
  return btn === "-" || btn === "+" || btn === "/" || btn === "x";
}

function operatorExceptMinus(btn) {
  return btn === "+" || btn === "/" || btn === "x";
}

function equals(btn) {
  return btn === "=";
}

function negativeNumber(first_number, second_number) {
  return first_number === "-" || second_number === "-";
}

function blank(first_number, second_number, operator) {
  return firstNumberEmpty(first_number) && secondNumberEmpty(second_number) && operatorEmpty(operator);
}

function complete(first_number, second_number, operator) {
  return !firstNumberEmpty(first_number) && !secondNumberEmpty(second_number) && !operatorEmpty(operator);
}

function clearForm(btn, first_number, second_number, operator) {
  return btn == "c" || (equals(btn) && blank(first_number, second_number, operator)) || (equals(btn) && (secondNumberEmpty(second_number) || operatorEmpty(operator)));
}

function readyToCalculate(btn, first_number, second_number, operator) {
  return equals(btn) && complete(first_number, second_number, operator);
}

function operatorAfterMinus(btn, first_number, second_number) {
  return negativeNumber(first_number, second_number) && anyOperator(btn);
}

function allowChainingOperations(btn, first_number, second_number, operator) {
  return anyOperator(btn) && !firstNumberEmpty(first_number) && !secondNumberEmpty(second_number);
}

function operatorAfterOperator(btn, first_number, second_number, operator) {
  return operatorExceptMinus(btn) && !secondNumberEmpty(second_number) && !operatorEmpty(operator);
}

function allowNegativeFirstNumber(btn, first_number) {
  return btn === "-" && firstNumberEmpty(first_number);
}

function allowNegativeSecondNumber(btn, operator, second_number) {
  return btn === "-" && !operatorEmpty(operator) && secondNumberEmpty(second_number);
}

function setFirstNumber(operator) {
  return operatorEmpty(operator);
}

function setSecondNumber(first_number, operator) {
  return !firstNumberEmpty(first_number) && !operatorEmpty(operator);
}

function run() {
  var btn = this.value;

  // Clear form if c button is pressed and edge case for pressing equals as the first number
  if (clearForm(btn, first_number, second_number, operator)) {
    first_number  = "";
    second_number = "";
    operator      = null;
    answer        = undefined;
    display.value = "";

  // If all btns have been defined, calculate answer when = is pressed
  } else if (readyToCalculate(btn, first_number, second_number, operator)) {
    if (answer === undefined) {
      answer = calculate(first_number, second_number, operator);
    } else {
      answer = calculate(answer, second_number, operator);
    }
    display.value = answer;

    // Edge case for pressing / or x after typing minus number
  } else if (operatorAfterMinus(btn, first_number, second_number, operator)) {
    first_number = "";
    second_number = "";
    operator = null;
    answer = undefined;
    display.value = "ERROR";

    // Chaining operations together 
  } else if (allowChainingOperations(btn, first_number, second_number, operator)) {
    first_number = calculate(first_number, second_number, operator);
    operator = btn;
    second_number = "";
    display.value = first_number;

    // Edge case for chaining operators, except - for minus numbers 
  } else if (operatorAfterOperator(btn, first_number, second_number, operator)) {
    operator = btn;

    // Edge case for minus numbers for first number
  } else if (allowNegativeFirstNumber(btn, first_number)) {
    first_number += btn;
    display.value = first_number;

    // Edge case for minus numbers for second number
  } else if (allowNegativeSecondNumber(btn, operator, second_number)) {
    second_number += btn;
    display.value = second_number;
  
    // Set operator
  } else if (anyOperator(btn)) {
    operator = btn;

    // Set first number
  } else if (setFirstNumber(operator)) {
    first_number += btn;
    display.value = first_number;

    // Set second number
  } else if (setSecondNumber(first_number, operator)) {
    second_number += btn;
    display.value = second_number;

  }
  
  // Hack to show in console
  log += btn + " ";
  console.log(log);
  if (typeof answer !== 'undefined') {
    console.log(answer);
  }
}