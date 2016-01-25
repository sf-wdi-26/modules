// Setup initial state variables
// Variables defined in global scope, not the best idea
var numbers   = document.getElementsByClassName("number");
var operators = document.getElementsByClassName("operator");
var display   = document.getElementsByClassName("display")[0];
var eq        = document.getElementsByClassName("eq")[0];
var clear     = document.getElementsByClassName("clear")[0];
var first_number  = "";
var second_number = "";
var operator      = "";
var answer;

// Setup eventListeners
for( var i=0; i<numbers.length; i++ ) {
  numbers[i].addEventListener("click", updateDisplay);
}

for( var i=0; i<operators.length; i++ ) {
  operators[i].addEventListener("click", setOperator);
}

eq.addEventListener("click", function(){
  calculate(first_number, second_number, operator)
});

clear.addEventListener("click", clearForm);

// Functions for calculator
function add(first_number, second_number) {
  return first_number + second_number;
}

function subtract(first_number, second_number) {
  return first_number - second_number;
}

function divide(first_number, second_number) {
  return first_number / second_number;
}

function multiply(first_number, second_number) {
  return first_number * second_number;
}

function calculate(first_number, second_number, operator) {
  switch (operator) {
    case "+":
      display.value = add(first_number, second_number);
      break;
    case "-":
      display.value = subtract(first_number, second_number);
      break;
    case "/":
      display.value = divide(first_number, second_number);
      break;
    case "x":
      display.value = multiply(first_number, second_number);
      break;
  }
}

function clearForm() {
  first_number  = "";
  second_number = "";
  operator      = "";
  display.value = "";
}

function updateDisplay() {
  var btn = this.value;
  display.value = btn;
  
  if(typeof first_number !== 'number') {
    first_number = parseFloat(btn);
  } else {
    second_number = parseFloat(btn);
  }
}

function setOperator() {
  operator = this.value;
}