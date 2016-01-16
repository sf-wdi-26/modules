---
title: Functions and Scope
type: lesson
duration: "1:25"
creator:
  name: Gerry Mathe, Jesse Shawl
  city: London, Washington DC
competencies: Programming
---

# Functions and Scope

### Objectives
*After this lesson, students will be able to:*

- Describe why functions are created
- Use functions to break programs into smaller sub-programs
- Describe how parameters relate to functions
- Explain what scope is
- Compare global and local scope
- Describe the `this` keyword and how it is affected by scope
- Discuss the difference between public and private scope

### Preparation
*Before this lesson, students should already be able to:*

- Write basic JavaScript
- Use a text editor
- Use basic JavaScript types and declare variables

## Keep your code DRY using Functions - Intro (5 mins)

A function is a statement or a group of statements that can be called anywhere in the program so that the statements inside the function do not need to be written over and over again.

When writing functions in JavaScript, think of functions as an object, like a string or a number - this means that functions can be passed to other functions as an argument and can be used just like any other object we've been working with.

Functions are essential to write JavaScript and keep the code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).


## Defining Functions and Calling Functions - Codealong (15 mins)


A function can be defined using two different syntaxes. For example, we can define a function `eat` that receives one argument in either of the following ways:

```javascript
var speak = function(words){
alert(words);
}

function speak(words){
alert(words);
}
```

The difference is subtle but important. The first function declaration is assigning an "anonymous" function to a variable. The second function declaration is a named function. The practical difference is that the named function will be processed when the code is interpreted, so the function can be called before it's defined.

No matter what syntax you use, a function always has:

- A name
- An optional list of arguments - or information to use - defined by the parenthesis before the opening curly brace
- Statements inside the function - this is the code executed every the function is called


#### Calling Functions

Calling a function will execute the code defined inside this function.

Defining and calling a function is different - a function will not be called when it's defined.

You call a function by using parenthesis after the function's name `()`:


```javascript
var hello = function(){
  console.log("hello there")
}

hello();

=> hello there
```

#### Passing a function as an argument


A function can be passed as an argument to another function:


```javascript
function sayHello(name){
return 'hello '+ name;
}

function shout(a, foo) {
alert(foo(a));
}

shout('world!', sayHello);
// alert box that says "hello world!"
```

## Compilation - Intro (15 mins)

Before we talk about scope, there's a few things to understand before thinking about what scope actually means.

The code that you write *must* be translated into a form that the computer can understand.

Source code is human readable, *we hope*. This source code may be translated into a set of 1's and 0's that a computer's CPU can understand. Yep, the CPU is a chip on the computer that does all the processing.  There is a reason it's called the Central Processing Unit, or CPU.

`Source Code`  ==>  `1's and 0's`

...or, the source code may be translated into a another type of language, byte code, that can be understood by a Virtual Machine(VM).

`Source Code` ==> `byte code`

#### Compiled Languages

Some languages are *explicitly* compiled. In other words, the programmer must run particular commands to invoke compilation.

For example, the **C** and **C++** languages are explicitly compiled. The programmer must run a command like:

`gcc -o hello_world -c hello_world.c`

This is done to translate the C code in the hello_world.c file into an *executable* or *binary* file that contains the 1's and 0's understood by the CPU.

*gcc* is a **C** compiler.

So here's what happens:

`Source Code`  ==>  `1's and 0's`

`hello_world.c`  ==>  `hello_world`

#### Interpreted Languages
Some languages do *not* require the programmer to explicitly run a compiler. **JavaScript**, **Java**, **Ruby** are a couple of interpreted languages.

There is still compilation being done, but it's done automatically.

`Source Code` ==> `byte code`

#### From Source to Running Code.
There are two basic phases to go through when going from code in a file to a program running.

- Compile Time - a phase when the source code is translated to another form. For example, when we run a javascript program we will compile javascript to an intermediate language/bytecode that the JavaScript Virtual Machine(VM) understands.

- Runtime - a phase when the computer actually runs each statement in the program.  For example, this is when the computer runs the javascript program bytecode.

#### Variable Scope

The variable scope describes where in a program a variable can be seen. In other words, where it can be used. We'll see more later, but you've seen that variables declared within a function cannot be seen or used in the Global Scope.

#### Lexical Analysis

Part of the Compilation phase is Lexical Analysis. In general, Lexical Analysis scans through the source code, one character at a time, looking for language constructs like variables, functions, built-in keywords, etc.

It's during this time that the compiler builds variable scope and **declares** variable inside a variable scope.

Here's a quick summary of what your computer does when you're looking to run your JavaScript file:

	1. Read the Source Code in a JavaScript file into memory
	2. Compile the source code
		a. Lexical Analysis
		b. Build Scope
		c. Turn source code into a form understood by VM, bytecode
	3. Execute bytecode

## Building Scope - Demo (10 mins)

Scope is built during the Lexical Analysis part of the Compilation phase. When scope is built during this phase it's called **Lexical Scope**. This is very common in many programming languages.

Let's see how it works. Here's the code we'll work with:

> Note: You might want to ask students to take a few minutes to break down the functionality in these functions.

```javascript
var firstName = 'John'; // 1
var lastName = 'Dowd'; // 2
var age = 19; // 3

function displayPerson(fname, lname){ //4, 5
  var prefix = 'Mr'; // 6
  var fullName = null; // 6

  function getFullName(){ // 7
    var suffix = "Esq.";  // Everybody's a lawyer, eh.
    return  fullName = prefix + " " + fname + " " + lname + " " + suffix;
  };

  return getFullName();
};

function removeYears(){ // 8
  var minusYears = 10, age = 49;
  return age - minusYears;
};

console.log(displayPerson(firstName, lastName));
console.log(removeYears());

```

Node will load this file and pass the source code on to it's Javascript VM.  Then, the VM will run do a Lexical Analysis of this source and build Variable Scope as described in the following steps:

1. Found 'var firstName' variable declaration.  
Put firstName variable in Global Scope.  
2. Found 'var lastName' variable declaration.  
Put lastName in Global Scope.  
3. Found 'var age' variable declaration.  
Put age in Global Scope.  
4. Found 'var displayPerson' declaration.  
Put age in displayPerson in Global Scope.

  - Notice that displayPerson's value is a function. So, create a inner scope and process this function.

5. Found the firstName and lastName declarations.

   > Note: functions arguments behave just like local variables.  Put them in the displayPerson function scope.  

6. Found prefix, fullName variable declarations.  
Put them in the displayPerson function scope.  
7. Found getFullName declaration.  
Put getFullName in the displayPerson function scope.

 - Notice that getFullName is a function. So, create an inner scope and  process this function.
 - All done with getFullName function, no more variable declarations.
 - All done with displayPerson function, no more variable declarations.

![Scope](https://i.imgur.com/Ex9a0qB.png)

8. Found removeYears variable declaration.
Put removeYears in Global scope.  

**Notice that removeYears value is a function. So, create a inner scope and process this function.**

9. Found age and minusYears variable declarations.  
Put these in the function's scope.

![](https://i.imgur.com/cA6kaw5.png)



## The Terminology of Scope - Codealong (10 mins)


There are different terminologies to talk about scope in Javascript. If you read about `(function|global|lexical|public/private)scope` or `closure` or `namespace`, all these keywords are referring to the `scope`, one way or another.

#### Global Scope

Before you write a line of JavaScript, you're in what we call the `Global Scope`. If we declare a variable, it's defined globally:

```javascript
var name = 'Gerry';
```

Global scope can be really confusing when you run into namespace clashes. You won't want to use global scoping for all your variables, as using global scope the right way is quite complex, but every Javascript program uses the global scope in one way or another.

> Note: If time permits, instructors may want to briefly go over what [namespace](http://www.codeproject.com/Articles/829254/JavaScript-Namespace) means in JavaScript.

#### Local scope

Local scope refers to any scope that is defined right past the global one. If you define a function, this function will have its own scope inside the body of the function. Any function defined inside another function has a also a local scope and can refer to the parent scope, but this logic doesn't work the other way around.

#### Function scope - can't get inside from outside!

A variable defined inside a function cannot be accessed outside the function, this is the scope function:

```javascript
var a = "this is the global scope";
function myFunction() {
	var b = "this variable is defined in the local scope";
}
myFunction();
alert(b);
```

This will throw a reference error because the variable `b` is not accessible outside of the scope if the function where it is defined.

#### Accessing variables in the same scope

In the logic defined above, the fact that a variable cannot be accessed by the parent scope works only in one way.

A function can access variables of the parent scope. In other words, a function defined in the global scope can access all variables defined in the global scope.

```javascript
// Global Scope
var a = "Hello";

// This function is defined in the global scope
function sayHello(name) {
	return a + " " + name;
}

sayHello("WDI");
=> "Hello WDI";
```

#### Nested function scope

When a function is defined inside another function, it is possible to access variables defined in the parent from the child:

```javascript
  var a = 1;

  function getScore () {
    var b = 2,
    c = 3;

    function add() {
    return a + b + c;
    }

    return add();
  }

  getScore();
  => 6
```

## `this` - Codealong (5 mins)



A function's `this` keyword is always referring to the current context

#### This in the Global context

In the global scope, this refers to the global object:

```javascript
this === window
=> true

this.document === document
=> true

this.aValue = "WDI";
=> "WDI"
console.log(window.aValue);
=> "WDI"
```

#### As an object method

If a function is part of an object (we then call it a method), `this` refers to the object that has been defined and called:

```javascript
var wdi = {
  name: "WDI",
  whatsTheName = function() {
    return this.name;
  }

wdi.whatsTheName();
=> "WDI"
```

## Independent Practice - Write some functions (15 mins)

Work through as many as these exercises as you can within the next 15 mins - use the [starter-code](starter-code) provided!

1. Write a function `lengths` that accepts a single parameter as an argument, namely
an array of strings. The function should return an array of numbers where each
number is the length of the corresponding string.

```javascript
var words = ["hello", "what", "is", "up", "dude"]
lengths(words)  # => [5, 4, 2, 2, 4]
```

2. Write a Javascript function called `transmogrifier`. This function should accept three arguments, which you can assume will be numbers. Your function should return the "transmogrified" result.

The transmogrified result of three numbers is the product of the first two numbers, raised to the power of the third number.

For example, the transmogrified result of 5, 3, and 2 is `(5 times 3) to the power of 2` is 225. Use your function to find the following answers.

```javascript

transmogrifier(5, 4, 3)
transmogrifier(13, 12, 5)
transmogrifier(42, 13, 7)

```

3.  Write a function `wordReverse` that accepts a single argument, a string. The
method should return a string with the order of the words reversed. Don't worry
about punctuation.

```javascript
wordReverse("Now I know what a TV dinner feels like")
# => "like feels dinner TV a what know I Now"
wordReverse("Put Hans back on the line")
# => "line the on back Hans Put"
```

## Conclusion (5 mins)

The only way to master JavaScript scope is to practice. You'll have a lot of confusing errors with the JavaScript you write at the beginning of your journey into programming! This will force you to name variables and functions the right way to make sure there is no conflict.

- Describe a function.
- Explain what happens before JavaScript code is executed.
- Explain the difference between local and global scope.

For more details about functions and scope [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions).
