// 1. let's create an object literal called 'pancakes'
var pancakes = {};

// and an object called 'pancakeBatter' with an array of basic ingredients
var pancakeBatter = {
    ingredients: ['flour', 'sugar', 'baking powder', 'salt', 'milk', 'eggs', 'vanilla extract']
};

// Now we can assign pancakeBatter as the prototype of pancakes
pancakes.__proto__ = pancakeBatter;

// Our pancakes object is now linked to pancakeBatter
// pancakes 'inherits' the properties of pancakeBatter
console.log(pancakeBatter.isPrototypeOf(pancakes));


//2.  now let's create a blueberryPancakes object
var blueberryPancakes = {
    ingredients: {'batter': pancakeBatter.ingredients,
        'extras': 'blueberries'}
}

// ...a chocoloateChipPancakes object
var chocolateChipPancakes = {
    ingredients: {'batter': pancakeBatter.ingredients,
        'extras': 'chocolate chips'}
}

// ...and a bananaSourCreamPancakes object
var bananaSourCreamPancakes = {
    ingredients: {'batter': pancakeBatter.ingredients,
        'extras': ['lemon zest', 'bananas', 'sour cream']}
}


// 3. Prototypes allow Dynamic Lookups.
// Let's assign pancakeBatter as the prototype of blueberryPancakes
blueberryPancakes.__proto__ = pancakeBatter

// You can check that one object is the prototype of another by doing:
console.log(pancakeBatter.isPrototypeOf(blueberryPancakes))
//=> true

console.log(pancakeBatter.isPrototypeOf(chocolateChipPancakes))
//=> false

// now let's change the prototype and try to prove it.
pancakeBatter.prototype.instructions = "Mix together ingredients and cook on a griddle";


// now if we check for blueberryPancakes.instructions
blueberryPancakes.instructions
// => "Mix together ingredients and cook on a griddle"

// but the others stay the same
chocolateChipPancakes.instructions
// =>undefined


//4. Constructor methods
// Here we create the object explicitly:
var iWantExplicitPancakes = Object.create(pancakeBatter);

// Here we use a constructor method.
var CookPancakes = {
new :  function() {
    return Object.create(pancakeBatter);
    }
}

// we can call the constructor like this:
var iWantPancakes = CookPancakes.new();

// To truly understand this, we need to get the difference between __proto__ and the prototype property
// Let's make a prototype function called Breakfast. It is common to capitalize prototype functions

function Breakfast(name) {
    this.name = name;
}

// All functions in javascript have a prototype property by default
// we can add properties to this function prototype, like so:
Breakfast.prototype.kind = 'pancakes'

Breakfast.__proto__ === Breakfast.prototype //=> false

// When we create a new instance of the object using new
var buttermilkPancakes = new Breakfast('Buttermilk');

// the __proto__ of the new object points to Breakfast.prototype
buttermilkPancakes.__proto__ == Breakfast.prototype //=> true

// In the new object we have access to properties defined in Breakfast.prototype
buttermilkPanckaes.kind //=> pancakes


// This becomes more powerful when you create complex objects with functions as property values.
var myBreakfast = {
    kind : 'Banana Sour Cream Pancakes',
    get_kind : function ( ) {
        return this.kind;
    },
    flavor : function ( ) {
        return this.review || 'No reviews yet';
    }
};


// 5. Property Assignment.
// The original pancakeBatter is based on a recipe from Joy of Cooking
// but the Banana Sour Cream Pancakes recipe is from a cookbook called Barefoot Contessa.
// Even though the latter inherits from the former, we can alter the ingredients of the bananaSourCreamPancakes
// object without affecting the prototype.

var pancakeBatter = {};

var ingredients = [
        {"ingredient": "all-purpose flour", "type": "dry", "quantity": 1.75, "unit": "cups"},
        {"ingredient": "baking powder", "type": "dry", "quantity": 1, "unit": "tbsp"},
        {"ingredient": "sugar", "type": "dry", "quantity": 1, "unit": "tbsp"},
        {"ingredient": "salt", "type": "dry", "quantity": 0.5, "unit": "tsp"},
        {"ingredient": "eggs", "type": "wet", "quantity": 3, "unit": "large"},
        {"ingredient": "melted butter", "type": "wet", "quantity": 8, "unit": "tbsp"},
        {"ingredient": "milk", "type": "wet", "quantity": 1.5, "unit": "cups"},
        {"ingredient": "vanilla extract", "type": "wet", "quantity": 2, "unit": "tsp"}
    ];

var instructions =  ["Stir together dry ingredients.",
            "Stir together wet ingredients.",
            "Add wet ingredients to dry ingredients and stir slightly to form a lumpy batter.",
            "Scoop .25 cups at a time onto buttered griddle over medium high heat.",
            "Cook until slightly brown on each side."];

pancakeBatter.ingredients = ingredients;
pancakeBatter.instructions = instructions;


var blueberryPancakes = Object.create(pancakeBatter);
blueberryPancakes.extras = [{"ingredient": "blueberries", "type": "dry", "quantity": 0.25, "unit": "lb"}];


var chocolateChipPancakes = Object.create(pancakeBatter);
chocolateChipPancakes.extras = [{"ingredient": "chocolate chips", "type": "dry", "quantity": 0.25, "unit": "lb"}];


var bananaSourCreamPancakes = Object.create(pancakeBatter);
// now we want to change a few values.

// change quantity of sugar to 3


// remove quantity from flour, baking powder, salt, eggs and milk:
ingredients = [
        {"ingredient": "all-purpose flour", "type": "dry", "unit": "cups"},
        {"ingredient": "baking powder", "type": "dry", "unit": "tbsp"},
        {"ingredient": "sugar", "type": "dry", "quantity": 1, "unit": "tbsp"},
        {"ingredient": "salt", "type": "dry", "unit": "tsp"},
        {"ingredient": "eggs", "type": "wet", "unit": "large"},
        {"ingredient": "melted butter", "type": "wet", "quantity": 8, "unit": "tbsp"},
        {"ingredient": "milk", "type": "wet", "unit": "cups"},
        {"ingredient": "vanilla extract", "type": "wet", "quantity": 2, "unit": "tsp"}
    ];

// now you can differentiate:
chocolateChipPancakes.ingredients[2].quantity = 1.75;
blueberryPancakes.ingredients[2].quantity = 1.75;

bananaSourCreamPancakes.ingredients[2].quantity = 3;


// change quanity of all-purpose flour to 1.5
for (var i = 0; i < bananaSourCreamPancakes.ingredients.length; i++){
    for (var key in bananaSourCreamPancakes.ingredients[i]) {
        if (bananaSourCreamPancakes.ingredients[i][key] == "all-purpose flour"){
            bananaSourCreamPancakes.ingredients[i].quantity = 1.5;
        }
    }
}




// restore default values for basic pancakes:
chocolateChipPancakes.ingredients[1].quantity = 1;
blueberryPancakes.ingredients[1].quantity = 1;
chocolateChipPancakes.ingredients[3].quantity = .5;
blueberryPancakes.ingredients[3].quantity = .5;
chocolateChipPancakes.ingredients[4].quantity = 3;
blueberryPancakes.ingredients[4].quantity = 3;
chocolateChipPancakes.ingredients[6].quantity = 1.5;
blueberryPancakes.ingredients[6].quantity = 1.5;

// change quantity of baking poweder to 2
// change quantity of salt to 1.5
// change quantity of eggs to 2
// change quanity of milk to 3/4 cup

for (var i = 0; i < bananaSourCreamPancakes.ingredients.length; i++){
    for (var key in bananaSourCreamPancakes.ingredients[i]) {
        if (bananaSourCreamPancakes.ingredients[i][key] == "baking powder"){
            bananaSourCreamPancakes.ingredients[i].quantity = 2;
        } else if (bananaSourCreamPancakes.ingredients[i][key] == "salt"){
            bananaSourCreamPancakes.ingredients[i].quantity = 1.5;
        } else if (bananaSourCreamPancakes.ingredients[i][key] == "eggs"){
            bananaSourCreamPancakes.ingredients[i].quantity = 2;
        } else if (bananaSourCreamPancakes.ingredients[i][key] == "milk"){
            bananaSourCreamPancakes.ingredients[i].quantity = 0.75;
        }
    }
}

// add 1 tsp lemon zest, 1/2 c sour cream, 2 ripe bananas to wet ingredients

bananaSourCreamPancakes.extras = [
    {"ingredient": "lemon zest", "type": "wet", "quantity": 1, "unit": "tsp"},
    {"ingredient": "sour cream", "type": "wet", "quantity": 0.5, "unit": "cups"},
    {"ingredient": "ripe bananas", "type": "wet", "quantity": 2, "unit": ""}
];

