var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/quotes-app');
var Quote = require("../models/Quote");
Quote.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
});

 var quotes = [
  {text: "I feel lik I'm too busy writing history to read it.", author: "Kanye West"},
  {text: "More and more of our imports come from overseas.", author: "George W. Bush"},
  {text: "The worst thing a man can do is go bald. Never let yourself go bald.", author: "Donald Trump"}
];

Quote.create(quotes, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs);
    mongoose.connection.close();
  }
});