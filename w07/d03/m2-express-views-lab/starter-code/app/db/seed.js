var mongoose = require('mongoose'),
  conn = mongoose.connect('mongodb://localhost/quotes-app'),
  Quote = require('../models/Quote');

Quote.remove({}, function(err){
  if (err) {console.log(err)};
})

var quotes = [
  {text: "I feel lik I'm too busy writing history to read it.", author: "Kanye West"},
  {text: "More and more of our imports come from overseas.", author: "George W. Bush"},
  {text: "The worst thing a man can do is go bald. Never let yourself go bald.", author: "Donald Trump"}
];

Quote.create(quotes, function(err, data) {
  err ? conole.log(err) : console.log("added: ", data);
  mongoose.connection.close();
});

