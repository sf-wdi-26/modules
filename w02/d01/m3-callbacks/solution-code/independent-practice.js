// Exercise: callback me maybe
//
// 1. create a function called `telephone` that logs "867-5309" when called.
// 2. write a seperate function called `blondie` that takes a function as a parameter (a first-order function).
// 3. `blondie` should log "call me on the line at... " when called, and then execute any function passed to it.

var telephone = function() {
  console.log("867-5309")
}
var blondie = function(func) {
  console.log("Call me on the line at... ");
  func();
}
blondie(telephone)

// Exercise: repeater
//
// create a function called repeater that takes an integer and a string as arguments.
// When called, the function should log the string to the console as many times as indicated by the integer.
// Write a seperate function called repeaterSetUp that takes an integer, a string, and a function as arguments.
// When called, repeaterSetUp should log "HERE WE GO" to the console, and then pass the integer and string passed to it to the function passed to it, which then executes.
// So if reapeterSetUp is passed 3 and "oi!", the terminal should print
//
// HERE WE GO
// oi!
// oi!
// oi!
// Note: parameters passed to a function can then be passed to a callback within that function. answer:

var repeater = function(int1, string) {
  for(var i=0; i < int1; i++) {
    console.log(string)
  }
}

var repeaterSetUp = function(int1, string, func){
  console.log("HERE WE GO");
  func(int1, string);
}

repeaterSetUp(3, "oi", repeater)
