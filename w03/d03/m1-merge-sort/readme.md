#Merge Sort

##Why Merge Sort?
Merge sort is the first powerful sorting algorithm that you will encounter in the wilds of the real world (baked into Safari and Firefox). It uses an extremely efficient application of the 'Divide and Conquer' concept to lists of elements. We worked on Bubble Sort yesterday, now let us up our game and work on Merge Sort!

##How does it work?
Merge Sort works on the basic principal of dividing your list into sub-lists (recursively) until your sub-lists are of length one or zero. Once your sub-lists are at that size, you merge with a neighboring sub-list. When you merge them, you merge them in ascending or descending order, depending on your implementation.

##Visualizations
![merge-sort-visualization](https://camo.githubusercontent.com/c9d3bf4590b7284596375ffa0cd98ee62699a757/68747470733a2f2f776562646f63732e63732e75616c62657274612e63612f253745686f6c74652f5432362f4c65637475726536466967362e676966)

##How would I build it?
There are TWO functions that work together to accomplish a Merge Sort:

-  The `mergeSort` function takes an array, cuts it in half [recursively](https://en.wikipedia.org/wiki/Recursion_(computer_science)) until it has divided the whole array into single items. At this point the recursive calls finally starts returning to the function that invoked it. Here a seperate `merge` function is run on a pair of returned results which merges them together (see visualization above).
-  The `merge` function takes two arrays as parameters, looks at the the first elements of the two lists, and assembles a resulting list based on the two lists 'zipped' together by pushing the lowest to highest valued elements. The `merge` function **is not recursive**.

####Recursion
![recursion](https://upload.wikimedia.org/wikipedia/commons/6/62/Droste.jpg)

##Drill
Pseudocode your own implementation of `merge`.

**Bonus**: Pseudocode an implementation of `mergeSort`.
