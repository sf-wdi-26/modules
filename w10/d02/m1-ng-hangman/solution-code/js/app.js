console.log('app.js loaded!');

// initialize the application
var app = angular.module("hangmanApp", []);

app.controller("hangmanCtrl", function($scope) {
  // initialize a new game
  $scope.hangman = new HangmanGame("elephant");
  // helper function for the view
  $scope.guessLetter = function(input) {
    // guess the letter
    $scope.hangman.guess(input);
    // clear the input
    $scope.hangman.input = "";
  }
});
