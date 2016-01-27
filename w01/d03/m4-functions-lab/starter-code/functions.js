// Question 1
function maxOfTwoNumbers(a,b) {
	if (a > b ) {
		return "a is larger than b";
	} else if (b > a) {
		return "b is larger than a";
	} else {
		return "they are equal";
	}
}

maxOfTwoNumbers(4,9);

console.log("fuck you node");

// Question 2
function maxOfThree(a,b,c) {
	if (a > b && a > c) {
		return a + " is the largest ";
	} else if (b > c && b > a) {
		return b  + " is the largest";
	} else if (c > a && c > b) {
		return c + " is the largest";
	}
}

maxOfThree(9,5,7);

// Question 3
function isCharacterAVowel(vowel) {
	if ( vowel == 'a' ||
		vowel == 'e' ||
		vowel == 'i' ||
		vowel == 'o' ||
		vowel == 'u' ||
		vowel == 'y' ) {
		return "is a vowel";
	} else {
		return "not a vowel";
	}
}

isCharacterAVowel("i");

// Question 4
function sumArray(array) {
	var sum = 0
	for (var i = 0; i < array.length; i++) {
		sum += array[i];
	};
 	return sum;
}


// Question 4
function multiplyArray(array) {
	var multiplied = 1;
	for (var i = 0; i < array.length; i++) {
		// need to account for 0 in array;
		// if (array[i] = 0) {
		// 	i = 1;
		// };
		multiplied = multiplied * array[i];
	}
 	return multiplied;
}

multiplyArray([4,1,5]);


// Question 5
var numberOfArguments = function(args){
	return arguments.length;
}

numberOfArguments(1,2,3);


// Question 6
var reverseString = function (string){
	var revString = "";
	for (var i = string.length - 1; i >= 0; i--) {
		revString += string[i]
	};
  	return revString;
  	console.log(revString);
};

reverseString("hola");

// Question 7
function findLongestWord (wordsArray) {
	longest = 0;
	for (var i = 0; i < wordsArray.length; i++) {
		if (wordsArray.length > longest)
		longest = wordsArray[i].length;
	};
	return longest;
}

findLongestWord(["test", "one"]);


// Question 8
function filterLongWords (wordsArray, j) {
	newArray = [];
	for (var i = 0; i < wordsArray.length; i++) {
		if (wordsArray[i].length > j) {
			newArray.push(wordsArray[i]);
		}
  	}
  	return newArray;
}

filterLongWords(["test", "one", "ahsdaksjdhads"], 3);

// Bonus 1
// Attach the function reverseString (from question 6) to the 
// object String so that it is possible to call: "General Assembly".reverseString().


// Bonus 2
function charactersOccurencesCount() {
  
}

