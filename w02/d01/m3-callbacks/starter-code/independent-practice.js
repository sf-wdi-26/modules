// Exercise: callback me maybe
//
// 1. create a function called telephone that logs "867-5309" when called.

function telephone () {
	console.log("867-5309");

}
// 2. write a seperate function called Blondie that takes a function as a parameter.

	function blondie (callback) {
		console.log("call me on the line at");
		callback();
	}) 
// 3. blondie should log "call me on the line at " when called, and then execute any function passed to it.
	blondie(telephone);
	
// Your code here!

// ___________________________________________

// Exercise: repeater
//
// create a function called repeater that takes an integer and a string as arguments.
// When called, the function should log the string to the console as many times as indicated by the integer.

// Write a seperate function called repeaterSetUp that takes an integer, a string, and a function as arguments.
// When called, repeaterSetUp should log "HERE WE GO" to the console, and then pass the integer and string passed to it to the function passed to it, which then executes.
// So if reapeterSetUp is passed 3 and "oi!", the terminal should print

function repeater (i,s) {
	for (var j = 0; j < i; j++) {
		console.log(s);
	};
}

function repeaterSetUp (i,s,callback) {
	console.log("HERE WE GO");
	callback(i,s);
}

//
// HERE WE GO
// oi!
// oi!
// oi!
// Note: parameters passed to a function can then be passed to a callback within that function. answer:

// Your code here
