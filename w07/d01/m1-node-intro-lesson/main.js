var car = require('./car')

var porshe = new car()
porshe.accelerate(60);
porshe.color = "blue";
var corvette = new car();
corvette.accelerate(20);

console.log(corvette);
console.log(porshe);