/******************************|
|       Trie Dictionary        |
|******************************/
function Trie(seed, valid) {
  this.root = new Node(seed, valid);
}

function Node(letter, valid) {
  this.letter = letter;
  this.letters = createAlphaBet();
  this.valid = valid || false;
}

/******************************|
|       Trie Prototypes        |
|******************************/

Trie.prototype.add = function(word) {
    // normalize case
    var word = word.toLowerCase();
    console.log("\nAdding the word '" + word + "'");
    var current = this.root;
    var match = (word[0] === current.letter);
    // checks if word belongs in this Trie
    if(!match) {
      return false;
    }
    console.log("Skipping the node for   " + word[0]);
    while(word.length > 1) {
      // slice off the first letter from the word
      word = word.slice(1, word.length);
      // take the first letter from shortened word
      var letter = word[0];
      // alphabetical position of new first letter
      var position = letter.charCodeAt(0) - 97;
      // if position is empty, create a new node and dive in
      if(current.letters[position] === null){
        // instantiate a next variable
        console.log("Creating a new node for " + letter);
        var next = new Node(letter);
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

/******************************|
|        Helper Methods        |
|******************************/
Trie.prototype.printPrettyTrie = function() {
    var current = this.root;
    var isValid = current.valid ? 'valid' : '';
    console.log(current.letter + " " + isValid);
    print(current, '  ');
};

/******************************|
|       Helper Functions       |
|******************************/
function createAlphaBet() {
  // create empty spaces representing each position in the alphabet
  return new Array(26).fill(null);
}

function print(current, whitespace) {
  current.letters.forEach(function(element){
    if(element !== null) {
      var isValid = element.valid ? 'valid' : '';
      console.log(whitespace + element.letter + " " + isValid);
      // recursively call self & add more whitespace
      print(element, whitespace + '  ');
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

// prints out tree structure
trie.printPrettyTrie();
