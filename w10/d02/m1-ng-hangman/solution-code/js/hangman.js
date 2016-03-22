console.log('hangmanGame loaded');

// HangmanGame
// to use:
// 1. var game = new HangmanGame('supersecretword');
// 2. game.guess('t');
var HangmanGame = function(secretWord, tries) {
  this.secretWord = secretWord;
  this.input = "";
  this.guesses = [];
  this.triesRemaining = tries || 7;
  this.completedWord = this.wordSoFar();
  this.gameWon = null;
};

// user can guess a letter
HangmanGame.prototype.guess = function(guess) {
  // don't continue if the game is over
  if (this.gameWon !== null) {
    console.log("the game is over");
    return false;
  }
  // check if the letter has already been guessed
  var alreadyGuessed = this.guesses.indexOf(guess) !== -1;
  // only add unique letters
  if (!alreadyGuessed) {
    // default to
    this.guesses.push(guess);
    // can't add a letter if the game has already been lost
  } else if (this.gameWon === false) {
    console.log("you have already lost the game");
  } else {
    console.log("this letter has already been guessed")
    return this.isWinner();
  }
  // determine if letter is in word
  if (this.isLetterInWord(guess, this.secretWord)) {
    console.log('found ' + guess + ' in the word: ', this.secretWord);
  } else {
    this.triesRemaining--;
  }
  this.completedWord = this.wordSoFar();
  return this.isWinner();
};

//////////////////////
// Helper functions //
//////////////////////

// wordSoFar returns the word completed up till now
HangmanGame.prototype.wordSoFar = function() {
  var newSecretWord = '';
  for (var index in this.secretWord) {
    var currentLetter = this.secretWord[index];
    if(this.guesses.indexOf(currentLetter) > -1) {
      newSecretWord += currentLetter;
    } else {
      newSecretWord += '_';
    }
  }
  this.completedWord = newSecretWord;
  return newSecretWord;
};

// determines win/lose status
HangmanGame.prototype.isWinner = function() {
  if(this.triesRemaining === 0) {
    console.log("Sorry, you lose.")
    this.gameWon = false;
  // user wins if there are no more underscores in word
} else if( !this.isLetterInWord("_", this.completedWord) ) {
    console.log("Yay, you win!")
    this.gameWon = true;
  } else {
    this.gameWon = null;
  }
};

// returns true if the letter is in the word, false if not
HangmanGame.prototype.isLetterInWord = function(guess, word) {
  // determine if the letter is in the word
  return word.split('').indexOf(guess) > -1;
};
