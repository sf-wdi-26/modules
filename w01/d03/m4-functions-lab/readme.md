# Functions Lab

## Introduction

> *This can be a pair programming activity or done independently.*

This lab provides an opportunity to pracitce implementing some real-world functions.

## Exercise

#### Requirements

Please write code that implements various functions, following the requirements in the list below:

1. Define a function `maxOfTwoNumbers` that takes two numbers as arguments and returns the largest of them. Use the if-then-else construct available in Javascript. Do some googling to figure this out if you forget how conditionals work.
2. Define a function `maxOfThree` that takes three numbers as arguments and returns the largest of them.
3. Write a function `isCharacterAVowel` that takes a character (i.e. a string of length 1) and returns true if it is a vowel, false otherwise.
4. Define a function `sumArray` and a function `multiplyArray` that sums and multiplies (respectively) all the numbers in an array of numbers. For example, `sumArray([1,2,3,4])` should return 10, and `multiplyArray([1,2,3,4])` should return 24.
5. Write a function that return the number of arguments passed to the function when called.
6. Define a function `reverseString` that computes the reversal of a string. For example, reverseString("jag testar") should return the string "ratset gaj".
7. Write a function `findLongestWord` that takes an array of words and returns the length of the longest one.
8. Write a function `filterLongWords` that takes an array of words and a number `i` and returns the array of words that are longer than i characters long.


**Bonus**

1. Attach the function `reverseString` (from question 6) to the object String so that it is possible to call: `"General Assembly".reverseString()`.
2. Write a function that takes a string as argument and returns an object where:
  - the keys are the characters that occur in the string
  - the values are the number of occurences for each letter, regardless of the case

For example, calling the function with the string "General Assembly" will return:

```javascript
{
  a: 2,
  b: 1,
  e: 3,
  g: 1,
  l: 2,
  m: 1,
  n: 1,
  r: 1,
  s: 2,
  y: 1
}
```

#### Starter Code

Open the file `functions.js`. All the function names are already inside the file, you just need to implement them by adding code inside each one.

Use the Chrome dev tools console to practice executing your code.

#### Deliverable

You'll review the answers with the instructor in class.

## Additional Resources

- [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
