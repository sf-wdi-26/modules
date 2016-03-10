var morgan  = require('morgan');
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var router  = express.Router();
var server  = require('http').createServer(app);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

router.get('/', function(req, res) {
  res.render('index', { header: 'Twitter Search'});
});

router.get('/contact', function(req, res) {
  res.render('contact', { header: 'contact!'});
});

router.get('/about', function(req, res) {
  res.render('about', { header: 'about!'});
});

app.use('/', router);
// app.listen(port);
server.listen(port);

console.log('Server started on ' + port);

// Integrate socket
var io = require('socket.io')(server);

var Twit = require('twit');
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream;
var searchTerm;

io.on('connect', function(socket) {
  socket.on('updateTerm', function (searchTerm) {
    socket.emit('updatedTerm', searchTerm);

    // Start stream
    if (stream) {
      stream.stop();
    }

    stream = twitter.stream('statuses/filter', { track: searchTerm, language: 'en' });

    stream.on('tweet', function (tweet) {
      var data = {};
      data.name = tweet.user.name;
      data.screen_name = tweet.user.screen_name;
      data.text = tweet.text;
      data.user_profile_image = tweet.user.profile_image_url;
      socket.emit('tweets', data);
    });
  });
});
