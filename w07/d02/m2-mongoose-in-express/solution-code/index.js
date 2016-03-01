// Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuration
mongoose.connect('mongodb://localhost/reminders');
process.on('exit', function() { mongoose.disconnect() }); // Shutdown Mongoose correctly
app.set("view engine", "hbs");  // sets view engine to handlebars
app.use(bodyParser.json());  // allows for parameters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));  // allows for put/delete request in html form
app.use(express.static(__dirname + '/public'));  // looks for assets like stylesheets in a `public` folder
var port = 3000;  // define a port to listen on

// Controllers
var remindersController = require("./controllers/remindersController");

// Routes
app.get("/reminders", remindersController.index);
app.get("/reminders/new", remindersController.new);
app.post("/reminders", remindersController.create);

// Start server
app.listen(port, function() {
  console.log("app is running on port:", port);
});
