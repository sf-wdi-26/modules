var cardTemplate = {
	shape: ["square", "circle", "triangle" ],
	fill: ["none", "solid", "stripe"],
	number: [1,2,3],
	color: ["red", "green", "blue"]
}
function makeCard(shape, fill, number, color) {
	this.shape = shape;
	this.fill = fill;
	this.numer = number; 
	this.color = color
}

var carOne = {
	shape: ["square"],
	fill: ["none"],
	number: [1],
	color: ["red"]
}

var CardTwo = {
	shape: ["square"],
	fill: ["solid"],
	number: [2],
	color: ["red"]
}

var cardThree = {
	shape: ["square"],
	fill: ["stripe"],
	number: [3],
	color: ["red"]
}

