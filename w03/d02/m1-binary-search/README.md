# Binary Search

Binary search is a type of search method used to find the position of a target item in a sorted array.

``` js
function binarySearch(array, target) {
  // your code here
};

var sample = [0, 1, 3, 5, 8, 13, 21];
var target = 1;

binarySearch(sample, 1); 
// 2 (the index it is located at in the sample array)

```

The binary search algorithm begins by comparing the target value to the value of the middle element of the sorted array.

``` js
var low = 0;
var high  = array.length - 1;
var mid = Math.floor((low + high) / 2);

mid;
//  =>  3
```

If the target value is equal to the middle element's value, then the position is returned and the search is finished.

``` js
array[mid] === target // 3 === 1
// Nope, keep going
```

If the target value is less than the middle element's value, then the search continues on the lower half of the array; or if the target value is greater than the middle element's value, then the search continues on the upper half of the array.

``` js
array[mid] > target // 3 > 1
// Yep, move to lower half

array[mid] < target // 3 < 1
// Nope, you shouldn't be here
```

This process continues, eliminating half of the elements, and comparing the target value to the value of the middle element of the remaining elements - until the target value is either found (and its associated element position is returned), or until the entire array has been searched (and "not found" is returned).

[Source Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)

## A real-life example

Searching for a name in a telephone book using [Binary Search](https://study.cs50.net/binary_search) (an awesome introduction to the concept).

### A Few Words About Recursion:

Recursion is a technique where a function calls itself to do the same repetitive task 
on smaller versions of the original argument.

We're going to create a function to `countRecursively` which calls itself. Often developers just use a letter to represent a big word they don't want to type:

``` js
var countR = function(num){
    console.log(num);
    if(num > 0) {
        countR(num-1)
    };
};

```

For simple tasks you may be able to accomplish the same result with a `do while` statement:

``` js
var countD = function(num){
    var i = 0;
    do {
       i += 1;
       console.log(i);
    } while (i < num);
};

```

Here is another recursive function: 

``` js
var singBottles = function(c){
  if (c > 0){
      console.log(c + ' bottles of beer on the wall, '
      + c + ' bottles of beer! 
      Take one down, pass it around, ' + (c-1) + ' 
      bottles of beer on the wall!');
      c--;
      singBottles(c);
  } else {
      console.log("*BUUUUUUUURP!!!*");
  }
}

```

Binary search offers an excellent challenge to practice writing a recursive function.


## Exercise

Each student will be assigned a number. Based on their number, the students will sort themselves lowest to highest. The instructor will then act as the `mid` variable, determining which half of the students to continue navigating through in search of the target value.

After this real-life demo, students will pseudocode their plan for implementing a binary search, swap solutions with a partner from across the room, exchange feedback, and then start coding.


**Stretch**

1. Implement a recursive solution (instead of iterative).
1. Implement a solution for an array of names (strings).
1. Refactor the string search to alphebetize and capitalize first and last initials
1. Implement a solution that handles non-unique data sets. ```// no solution provided```


### Sample Data

``` js
var primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 
	41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103,
	107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 
	173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 
	239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 
	311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 
	383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 
	457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 
	523, 541];

// string arrays to sort:
var array = ["Jan", "Feb", "mar", "Apr", "May", "Jun", "jul",
	"Aug", "Sept", "Oct", "Nov", "Dec"];

var wdi_26_students = ['Rider', 'Jasmine', 'Caleb', 'Lucca',
	'jessie', 'Anna', 'Monq', 'Vien', 'Brian', 'Daniel F.', 
	'Cindy', 'Annabel', 'Derek', 'Al', 'Nidhi', 'tashi', 
	'Leslie', 'Jehnean', 'Christina', 'Josh', 'matt', 
	'Franchini', 'Will', 'Lena', 'Ivan', 'Nicholas', 'Daniel S.'];


```


## Solutions
[Solutions](solutions.js)

### Further Reading (Includes sample code in Ruby and C++)

- [Big O Notation cheatsheet](http://bigocheatsheet.com/)
- [Carnagie Mellon University - Binary Search](http://www.cs.cmu.edu/~15110-f12/Unit05PtB-handout.pdf)
- [Rob Bell - beginner's guide to Big O notation](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)
