var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foods');
var REPL = require("repl");

var repl = REPL.start("> ");

// model requirements
repl.context.Food = require("../models/food");

// listen for an `exit` event
repl.on("exit", function () {
  console.log("Ciao!");
  // disconnect the database connection
  mongoose.disconnect(function() {
    // exit the repl
    process.exit();
  });
})
