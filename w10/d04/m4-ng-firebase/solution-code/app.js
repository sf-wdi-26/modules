// strict error checking
'use strict';

var app = angular.module("ToEatly", ["firebase"]);
app.controller("FoodCtrl", function($scope, $firebaseArray) {
  // change to your application URL
  var ref = new Firebase("https://sf-wdi-26.firebaseio.com/foods");
  // create a synchronized array to store a collection
  $scope.foods = $firebaseArray(ref);
  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addFood = function() {
    $scope.foods.$add({
      name: $scope.food.name,
      yumminess: $scope.food.yumminess
    });
    // clears form
    $scope.food = {};
  };
});
