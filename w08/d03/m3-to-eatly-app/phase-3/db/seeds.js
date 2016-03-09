var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/foods');
var Food = require("../models/food");
Food.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
})

var foods = [
  {
    name: "sushiritto",
    yuminess: 10
  },
  {
    name: "flapjacks",
    yuminess: 7
  },
  {
    name: "chia seeds",
    yuminess: 3
  }
];

Food.create(foods, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs)
    mongoose.connection.close();
  }
});
