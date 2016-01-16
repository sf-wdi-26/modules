# JavaScript Objects

### Objectives
*After this lesson, students will be able to:*

- Compare objects and key-value stores to arrays as data structures
- Explain the difference between object properties and methods
- Create empty objects and objects with multiple properties and methods using object literal syntax
- Compare adding and retrieving properties to an existing object using the dot and bracket notations
- Access properties of an object using keys and helper methods (.hasOwnProperty)
- Iterate over the keys of an object to return and manipulate values

### Preparation
*Before this lesson, students should already be able to:*

- Create and manipulate variables with javascript
- Use the chrome dev tools console

Objects in JavaScript
=====

## Opening

### What is an object?

* Objects are a type of data structure that is nearly universal across programming languages, although they may have different names in different languages
* Like arrays, objects can hold multiple pieces of data of varying types; but unlike arrays, objects use named keys rather than indices to order and access those pieces of data
* Objects in general are made up of two things – properties and methods. Properties are data attached to an object that describe it or are related to it in some way. Methods are just functions, but because they're attached to an object, you can think of them as actions that the object can invoke on itself
* In JavaScript, an object is a type of key-value store, or a way to group many pairs of keys and values together, so sometimes it's used like a hash (in Ruby) or a dictionary (in other languages)

Example: A car has properties, a type of engine, a color, a certain number of seats etc. Following the same logic, a JavaScript object may have **properties** and **values** for these properties.

Aside from the values `null` and `undefined`, **everything in JavaScript is an object**.

### Collections of name-value pairs

Javascript objects work as lists of keys (**A property name**) and corresponding values (**A property value**).

This way of storing/reading data is widely used across programs and languages because it’s highly customisable and quick to implement.

A key can be either a name, a number or a string, the corresponding value to a key can be any value part of JavaScript, including arrays, `null` or `undefined`and even another object. Objects structures can therefore be nested (objects inside objects) and of any complexity.

## Creating Objects

There are 4 different ways to create an object.

#### Object constructor

The [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) constructor creates an object wrapper for the given value.

```javascript
var myObject = new Object();
```

#### Object literal syntax

This is also called an [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

This is equivalent to the syntax above, and is the one we use to create JSON objects.

```javascript
var myObject = {};
```

#### Constructor function

It is also possible to use a `function` statement to create an object that serves as a "constructor function."

The first step is to write a function that will define the object. By convention, this function we start the function name with a capital letter. Once the function is defined (in the current scope), you can create a new object by using the keyword `new`.

```javascript
function Classroom(name, numberOfStudents) {
  this.name = name;
  this.numberOfStudents = numberOfStudents;
}

var wdi = new Classroom("WDI 4 London", 25);
```

#### Object.create

It is possible to use the syntax [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

This method can take an object in argument as the prototype, allowing you to create an object without having to use a constructor function.


```javascript
var Person = {
  type: "Human",
  displayType: function(){
    console.log(this.type);
  }
}

var person1 = Object.create(Person);
person1.displayType();
=> Human

var person2 = Object.create(Person);
person2.type = "Man";
person2.displayType();
=> Man
```

## Object Properties

Objects in JavaScript **always** have properties associated with them.

You can think of a property on a JavaScript object as a type of variable that contains a value. The properties of an object can be accessed using "dot notation":

```javascript
var Person = {
  name: "Gerry"
}

Person.name
=> "Gerry"
```

You can define or re-assign a property by assigning it a value using `=` as you would a normal variable.

```javascript
var Person = {
  name: "Gerry"
}

Person.name
=> "Gerry"

Person.name = "Alex"
Person.name
=> "Alex"
```

## Creating an object with properties

We are going to create an object `classroom` that contains properties `name` and `campus`:

```javascript
var classroom = new Object();
=> undefined

classroom.name = "WDI 2";
=> "WDI 2"

classroom.campus = "London";
=> "London"

classroom
=> Object {name: "WDI 2", campus: "London"}
```

#### Bracket notation

There is another way to set properties on a JavaScript object.

```javascript
classroom["name"]   = "WDI 2";
classroom["campus"] = "London";
```

This syntax can also be used to read properties of an object:

```javascript
console.log(classroom["name"]);
=> "WDI 2";

var property = "campus";

console.log(classroom[property]);
=> "London";
```

For more details see [MDN's Documentation on Property Accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors).


#### Deleting properties

If you want to delete a property of an object (and by extension, the value attached to the property), you need to use the [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) operator:

The following code shows how to remove a property:

```
var classroom = {name: "WDI 2", campus: "London", start: "1/1/2000"};
delete classroom.start;
classroom
=> {name: "WDI 2", campus: "London"}
```

## Object methods

As we've said before, the value of a property can be anything in JavaScript, means we can also attach functions to objects properties. When a function is attached to a property, this function becomes a `method`. Methods are defined the exact same way as a function, except that they have to be defined as the property of an object.

```javascript
var classroom = {
  name: "WDI 2",
  campus: "London",
  start: "1/1/2000",
  sayHello: function() {
    console.log("Hello");
  }
};
```

To call the method, we add a pair of parentheses to execute it:

```
classroom.sayHello();
=> Hello
```

#### Assigning a previously-defined function

We can attach regular functions to objects as methods, even after they are created.

```
var sayHello = function() { console.log("Hello"); }

classroom.sayHello = sayHello;  

classroom.sayHello()
=> Hello
```

##`this` for object references

In JavaScript, `this` is a keyword that refers to the current object. When used in a method on an object, it will always refer to the current object.


```
var classroom = {
  name: "WDI 2",
  campus: "London",
  start: "1/1/2000",
  classInfo: function(){
    console.log("This is " + this.name + " and the class starts on " + this.start);
  }
};

classroom.classInfo()
=> This is WDI 2 and it starts on 1/1/2000
```

## We Do: Getters and setters

> A getter is a method that gets the value of a specific property. A setter is a method that sets the value of a specific property. You can define getters and setters on any predefined core object or user-defined object that supports the addition of new properties. The syntax for defining getters and setters uses the object literal syntax.

```javascript
var o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2
    }
};

console.log(o.a);
=> 7

console.log(o.b);
=> 8

o.c = 50;
console.log(o.a);
=> 25
```

This section from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Creating_new_objects#Defining_getters_and_setters)

#### Enumerating properties of an object

There are three native ways to list the properties of an object:

* **for...in loops** This method traverses all enumerable properties of an object and its prototype chain
* **Object.keys(o)**  This method returns an array with all the own (not in the prototype chain) enumerable properties' names ("keys") of an object o.
* **Object.getOwnPropertyNames(o)** This method returns an array containing all own properties' names (enumerable or not) of an object o.

**Loop over an objects properties**


You can use the bracket notation with for...in to iterate over all the enumerable properties of an object.

```javascript
var myCar = {make: "Ford", model: "Mustang", year: 1969};

function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}

showProps(myCar, "Car");
=> Car.make = Ford
=> Car.model = Mustang
=> Car.year = 1969
```

This section from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Creating_new_objects#Objects_and_properties)


## Comparing Objects

In JavaScript, if two objects are created separately, they are distinct, even if they are given the same properties.

```javascript
var student = {name: "Chris"};
=> undefined

var student2 = {name: "Chris"};
=> undefined

student == student2
=> false

student === student
=> true
```

If you're confused by the difference between `==` and `===` review MDN's notes on [equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality_()) and [strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity_strict_equality_())

## Independent Monkey Exercise (20 minutes)

- Create a `monkey` object, which has the following properties:

  - `name`
  - `species`
  - `foodsEaten`

  And the following methods:

  - `eatSomething(thingAsString)`
  - `introduce`: producers a string introducing itself, including its name, species, and what it's eaten

- Create 3 monkeys total. Make sure all 3 monkeys have all properties set and methods defined.

- Exercise your monkeys by retrieving their properties and using their methods. Practice using both syntaxes for retrieving properties (dot notation and brackets).

## Conclusion (5 mins)

We will use objects in JavaScript every day, and you will have plenty of time to practice creating and using objects in Javascript. There are a lot of resources available on the web for you to dive deeper, but the most detailed and understandable one is probably MDN.

- [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Intro to Object-Orientated Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
- [Objects in Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

<!--

* All programming can be boiled down to data & behavior
* OOP is about creating taxonomies
* OOP is a stylistic approach to organizing code

-->