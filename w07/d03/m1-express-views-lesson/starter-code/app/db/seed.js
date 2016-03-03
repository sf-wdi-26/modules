var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/candies-app');
var Candy = require("../models/Candy");

Candy.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

 var candies = [
  {name: "Chewing Gum", color: "Pink"},
  {name: "Pez", color: "Green"},
  {name: "Marshmallow", color: "White"},
  {name: "Candy Stick", color: "Blue"}
];

Candy.create(candies, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});