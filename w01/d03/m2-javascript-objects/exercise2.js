// var monkey = {
// 	name: "fred",
// 	species: "spaceMonkey",
// 	foodsEaten: "kryptonite",
// 	eatSomething: function (food) {
// 		return "i eats" + food;
// 	},
// 	introduce: function () {
// 		return "hi my name is " + monkey.name +
// 		" i am a " + monkey.species + 
// 		" i eat " + monkey.foodsEaten;
// 	}
// };

// console.log(monkey.introduce());
// var monkey2 = new monkey {};
// monkey2.name = "foo";
// console.log(monkey2.name);

function Monkey(name, species) {
  this.name       = name;
  this.species    = species;
  this.foodsEaten = [];
  this.eatSomething = function(food) {
    this.foodsEaten.push(food);
  }
  this.introduce = function() {
    console.log("My name is "+ this.name +
    ". I come from the "+ this.species + 
    " family. I have eaten "+ 
    this.foodsEaten);
    // .join(", ") + ".");
  }
}

// var monkey1 = new Monkey("Jack", "Howler");
// monkey1.eatSomething("banana");
// monkey1.introduce();

var monkey2 = new Monkey("fred", "foo barius");
monkey2.eatSomething("peach");
monkey2.eatSomething("my poop");
monkey2.eatSomething("farts");
monkey2.introduce();