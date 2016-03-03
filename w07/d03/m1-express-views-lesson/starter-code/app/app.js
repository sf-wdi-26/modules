var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || '3000';
var cookieParser = require('cookie-parser');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/candies-app');

var routes = require('./config/routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up our app to accept to use EJS
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');





app.use(routes);

app.listen(port);
