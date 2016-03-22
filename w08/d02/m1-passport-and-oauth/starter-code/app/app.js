var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var mongoose       = require('mongoose');
var passport       = require('passport');
var expressSession = require('express-session');
var cookieParser   = require("cookie-parser");
// adding keygen
var keygen = require("keygenerator");

var logout = require('express-passport-logout');


// Mongoose Setup
mongoose.connect('mongodb://localhost:27017/facebook-authentication-app');

// Middleware
app.use( cookieParser() );
// app.use(expressSession({secret: 'mySecretKey'}));
app.use(expressSession( {secret: keygen._({specials: true})} ));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Setting up the Passport Strategies
require("./config/passport")(passport)

// Add code here:

// routes
// home page
app.get('/', function(req, res){
  console.log(req)
  res.render('layout', {user: req.user});
});
// google
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
  })
);

// FAKEBOOK
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

// GITHUB
app.get('/auth/github', passport.authenticate('github', { scope: 'user'}));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });



// app.get("/logout", function(req, res){
//   req.logout();
//   // req.session.destroy( function (err) {});
//   req.session.delete;
//   req.session.destroy()
//   res.redirect("/")
// })

app.get('/logout', logout());

app.listen(3000);
