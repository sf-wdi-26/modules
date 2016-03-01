var express = require('express'),
        app = express(),
    // var app = require('express')();
   mongoose = require('mongoose'),
 bodyParser = require('body-parser'),
methodOverride = require('method-override'),
        port = 3000;

// config
mongoose.connect('mongodb://localhost/reminders');
process.on('exit', function() {mongoose.disconnect() });
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));  
app.use(express.static(__dirname + '/public'));

// controllers
var remindersController = require('./controllers/remindersController');

// routes
// nodemon is trippin on this get

app.get("/reminders", remindersController.index);
app.get('/reminders/new', remindersController.new);
app.post('/reminders', remindersController.create);
app.get('/reminders/:id', remindersController.show);

app.listen(port);
