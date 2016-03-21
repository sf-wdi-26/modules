var morgan  = require('morgan');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var router  = express.Router();
// this is different than usual
var server  = require('http').createServer(app);
var port = process.env.PORT || 3000

var keys = require('./secrets.js')

var Twit = require('twit');

// middlewares
app.set('views', './views');
app.set('view engine', 'hbs');
// app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));

app.use(morgan('dev'));

app.use('/', router)

// Integrate socket
var io = require('socket.io')(server);

var twitter = new Twit({
  consumer_key: keys.TWITTER_CONSUMER_KEY,
  consumer_secret: keys.TWITTER_CONSUMER_SECRET,
  access_token: keys.TWITTER_ACCESS_TOKEN,
  access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET
});

// var stream;
// var searchTerm;

var stream = twitter.stream('statuses/filter', { track: 'javascript'});

io.on('connect', function(socket) {
  stream.on('tweet', function(tweet) {
    socket.emit('tweets', tweet);
  });
});

// io.on('connect', function(socket) {
//   socket.on('updateTerm', function (searchTerm) {
//     socket.emit('updatedTerm', searchTerm);

//     // Start stream
//     if (stream) {
//       stream.stop();
//     }

//     stream = twitter.stream('statuses/filter', { track: searchTerm, language: 'en' });

//     stream.on('tweet', function (tweet) {
//       var data = {};
//       data.name = tweet.user.name;
//       data.screen_name = tweet.user.screen_name;
//       data.text = tweet.text;
//       data.user_profile_image = tweet.user.profile_image_url;
//       socket.emit('tweets', data);
//     });
//   });
// });

// ROUTES
router.get('/', function (req,res){
  res.render('index', { header: 'Twitter Search'});
})

app.listen(port)