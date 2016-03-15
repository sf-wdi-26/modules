/******************************|
|       Trie Dictionary        |
|******************************/
function Trie(seed, valid) {
  this.root = new Node(seed, valid);
}

function Node(letter, valid) {
  this.letter = letter;
  this.letters = createArray();
  this.valid = valid || false;
}

/******************************|
|       Trie Prototypes        |
|******************************/

Trie.prototype.add = function(word) {
    console.log("\nAdding the word '" + word + "'");
    // protect from root damage
    var current = this.root;
    console.log("CURRENT", current)
    var match = (word[0] === current.letter);

    // checks if word belongs in this Trie
    if(!match) {
      return false;
    }
    console.log("Skipping the node for   " + word[0]);
    while(word.length>1){
      //console.log(word);
      // remove first letter from word (it already belongs)
      word = word.slice(1,word.length);
      var firstLetter = word[0];
      // position of new fisrt letter
      var position = firstLetter.charCodeAt(0) - 97;
      // if position is empty, create a new node and dive in
      if(current.letters[position] === 0){
        // instantiate a next variable
        console.log("Creating a new node for " + firstLetter);
        var next = new Node(firstLetter);
        // set the new node's letter to the this.root's current letter
        // add next to the letters array in this.root
        current.letters[position] = next;
        // go 'down' the tree one level
        current = current.letters[position];

      // else position is filled, shift and dive in
      } else {
        console.log("Skipping the node for   " + word[0]);
        // go 'down' the tree one level
        current = current.letters[position];
      }
    }
    return current.valid = true;
};
// 
// Trie.prototype.exists = function(word) {
//     // TODO: returns whether or not the word exists within the Trie
//     return false;
// };

/* New recursive structure: helper and recursive methods */
Trie.prototype.printPrettyTrie = function() {
    // protects the this.root from being smashed down to a leaf
    var current = this.root;
    console.log("\nPrinting DEPTH first:\n");
    console.log(current.letter + " " + (current.valid ? 'valid' : ''));
    print(current, '  ');
};

Trie.prototype.printTrieList = function(word) {
    var wordList = [];
    // TODO: prints all of the words contained within the Trie
    console.log("Total List Length: " + wordList.length)
};

/******************************|
|       Helper Functions       |
|******************************/
function createArray() {
  return Array.apply(null, Array(26))
    .map(Number.prototype.valueOf,0);
}

function print(current, space) {
    current.letters.forEach(function printLetter(element){
      if(element !== 0){
        console.log(space + element.letter + " " + (element.valid ? 'valid' : ''));
        print(element, space + '  ');
      }
    });
}

/******************************|
|         Driver Code          |
|******************************/
var trie = new Trie('a', true);

var wordList = ['a', 'ace', 'aces', 'aced', 'acre', 'acres', 'act', 'acted', 'acting', 'acts'];
wordList.forEach(function(word) {
  trie.add(word);
});

// checks for existence of words previously added (all should be true)
// var first = trie.exists('ace');
// var second = trie.exists('acre');
// var third = trie.exists('acted');
//
// prints out tree structure
trie.printPrettyTrie();

// // prints out full list of words
// trie.printTrieList();
