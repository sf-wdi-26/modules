<!-- ---
title: Javascript Prototype Inheritance
type: lesson
duration: "1:10"
creator:
    name: Ben Hulan
    city: SF
competencies: Front-end intro
--- -->


# Prototype Inheritance in JavaScript:

### Objectives
*After this lesson, students will be able to:*

- Describe the diffences between inheritance in JavaScript versus other, classical programming languages
- Write constructor methods for Javascript objects
- Instantiate and differentiate new Javascript objects

### Preparation
*Before this lesson, students should already be able to:*

- Write basic Javascript

## Prototype Inheritance in JavaScript.  Intro (10 mins)
   
Prototype inheritance in javascript is one of the topics that can elevate your skills and understanding from a front-end web tinkerer and put you on the path to becoming a real developer.

Now we are talking about Object Oriented Programming -- specifically, the concept of inheritance.

Prototypes are used in every javascript library or framework out there, from [Angular](https://angularjs.org/) to [Zigfu](http://zigfu.com/)

There are a lot of places you can study this on your own:
[Douglas Crockford](http://shop.oreilly.com/product/9780596517748.do), [John Reisig](http://www.goodreads.com/book/show/4373732-secrets-of-the-javascript-ninja), [Cody Lindley](http://www.javascriptenlightenment.com/) and others have written volumes about prototypal inheritance in JS. [Nodeschool.io](http://nodeschool.io/) offers a workshop called planetproto that you may find useful. But unless you're already a developer, most of this information is conveyed 
in a way that I consider to be abstract and confusing.

My hope is today to simplify this concept and make it accessible from the start.

### Here's what makes inheritance different in JS:
- Javascript objects use Prototypal inheritance, as opposed to Classical.
- Classical inheritance refers to OOP languages that rely on classes to create instances of an object
- Prototype inheritance lets us create objects very quickly but it is more abstract than classical inheritance.
- One drawback of prototypal inheritance is that the only mechanism for privacy is scope. We can talk about that later.
- Prototyping also allows for Differential inheritance.

### Codealong (30 minutes)

#### The Problem:
- Eli wants blueberry pancakes
- Sam wants chocolate-chip pancakes
- Ben wants banana sour cream pancakes

This looks like a job for **Javascript!**

#### 1. The basic prototype setup.

Let's create an object literal called `pancakes` and an object called `pancakeBatter` with an array of basic ingredients

```javascript
var pancakes = {};

var pancakeBatter = {
    ingredients: ['flour', 'sugar', 'baking powder', 'salt', 'milk', 'eggs', 'vanilla extract']
};
```
Now we can assign pancakeBatter as the prototype of pancakes
```javascript
pancakes.__proto__ = pancakeBatter;
```

Our `pancakes` object is now linked to `pancakeBatter` forever. In other words, `pancakes` inherits the properties of `pancakeBatter` _even if they change_.

```javascript
console.log(pancakeBatter.isPrototypeOf(pancakes));
```

#### 2. Setup for differentiation.
Now let's create a few different types of pancakes

```javascript
var blueberryPancakes = {
    ingredients: {'batter': pancakeBatter.ingredients,
        'extras': 'blueberries'}
}

var chocolateChipPancakes = {
    ingredients: {'batter': pancakeBatter.ingredients,
        'extras': 'chocolate chips'}
}

var bananaSourCreamPancakes = {
    ingredients: {'batter': pancakeBatter.ingredients,
        'extras': ['lemon zest', 'bananas', 'sour cream']}
}
```
    
#### 3. Dynamic Lookups.
```javascript
// Let's assign pancakeBatter as the prototype of blueberryPancakes
blueberryPancakes.__proto__ = pancakeBatter

// You can check that one object is the prototype of another by doing:
console.log(pancakeBatter.isPrototypeOf(blueberryPancakes))
//=> true

console.log(pancakeBatter.isPrototypeOf(chocolateChipPancakes))
//=> false

// now let's change the prototype and try to prove it.
pancakeBatter.__proto__.instructions = "Mix together ingredients and cook on a griddle";

// check this out. If we ask for blueberryPancakes, it does not seem to know it's instructions:
blueberryPancakes
// => Object {ingredients: Object}

// but if we check for blueberryPancakes.instructions, it does!
blueberryPancakes.instructions
// => "Mix together ingredients and cook on a griddle"

// the others stay the same
chocolateChipPancakes.instructions
// =>undefined
```

#### 4. Constructor methods.

```javascript
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
```

#### 5. Property Assignment

The original pancakeBatter is based on a recipe from [Joy of Cooking](http://www.thejoykitchen.com/all-about-joy/book). The Banana Sour Cream Pancakes recipe is from a cookbook called [Barefoot Contessa](http://www.amazon.com/The-Barefoot-Contessa-Cookbook-Garten/dp/0609602195). Even though the latter inherits from the former, we need to alter the ingredients and instructions attributes of the `bananaSourCreamPancakes` object without affecting the prototype.


```javascript
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
```

Now we want to change a few values.

Let's try changing the quantity of sugar to 3

```javascript
bananaSourCreamPancakes.ingredients[2].quantity = 3;
```

_We just made a mistake. What is it? How would you propose to fix it?_

Now you've got to do the rest!

### Independent Practice (30 minutes)

Make the following changes to `bananaSourCreamPancakes` (and repair the others as necessary) using `for` loops, `if...else`, `forEach`, or by any other javascript you know!

_(As always, try NOT to look at the solution code, but instead, try to make your own solution and test it by using the tools we have already learned.)_

- change quantity of baking poweder to 2
- change quantity of salt to 1.5
- change quantity of eggs to 2
- change quanity of milk to 3/4 cup
- add 1 tsp lemon zest, 1/2 c sour cream, 2 ripe bananas to wet ingredients