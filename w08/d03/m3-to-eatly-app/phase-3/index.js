// Dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);

// Configuration
mongoose.connect('mongodb://localhost/foods');
process.on('exit', function() { mongoose.disconnect() }); // Shutdown Mongoose correctly
app.set('view engine', 'hbs');  // sets view engine to handlebars
hbs.registerPartials(__dirname + '/views/partials'); // register partials
hbsutils.registerWatchedPartials(__dirname + '/views/partials'); // partial changes will restart nodemon
app.use(bodyParser.json());  // allows for parameters in JSON and html
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));  // allows for put/delete request in html form
app.use(express.static(__dirname + '/public'));  // assets in a `public` folder
var port = 3000;  // define a port to listen on

// Controllers
var pagesController = require('./controllers/pagesController');
var foodsController = require('./controllers/foodsController');

// Routes
app.get("/", pagesController.home);
app.get("/foods", foodsController.index);
app.post("/foods", foodsController.create);
app.delete("/foods/:id", foodsController.destroy);

// Start server
app.listen(port, function() {
  console.log("app is running on port:", port);
});
