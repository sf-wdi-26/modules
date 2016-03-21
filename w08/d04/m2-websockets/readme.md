# Websockets with socket.io

### Objectives
*After this lesson, students will be able to:*

- Describe what realtime means, and how channels & open sockets push data to clients
- Set up websockets on the server side
- Use jQuery to update the client side

### Preparation
*Before this lesson, students should already be able to:*
- Create an Express app
- Configure an application to use middleware, nodemon, hbs, and morgan
- Write jQuery that updates the DOM



## Web basics recap - Intro (10 mins)

Let's take it back to unit 1 and talk about how the web works. In very simple terms: you have a client - a program that can make requests to the web - and a server - a computer somewhere that holds information/code. When you want some information, your browser sends a request to get some data and then the server responds. This can be with a GET request or an AJAX request, but in essence, the client is always saying "give me some data".

## What are the issues with this?

Well, the client is in 'control' - the server might have updates, but the client doesn't know about them - and the client has to request information it may not be familiar with.

Alas! In comes polling! The client can keep 'polling' the server to see if it has any more data.

## What are the issues with polling?

It's slow! Polling every `n` seconds isn't ideal, and if you poll too often, your bandwidth will go through the roof and slow your application down.

#### Enter Websockets

WebSockets solves all this. It maintains an open connection from Server <-> Client that we can use to 'push' information and get information, constantly, like push notifications on your phone (Gmail through Mail.app example).

Unlike HTTP requests, once a connection is established with websockets, you don't get continuous meta data like types, user-agents, cookies, dates, etc.


## Installing WebSockets - Codealong (15 mins)

We're going to add functionality to our application that will pull a constant stream of tweets from Twitter's API. First thing we need is to install the [socket.io](http://socket.io) package.  Jump into the starter code folder and:

```bash
npm install socket.io --save
```

Then, require it in our app with a few changes. First let's add a new require for the _http_ module which gives us the server that socket.io needs to listen to. In `app.js`

```javascript
var morgan  = require('morgan');
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
```

#### What's the difference between app & require('http')

This second way - creating an HTTP server yourself instead of having Express create one for you - is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance:

We need change at the bottom from `app` to `server`:

```javascript
server.listen(port);
```

Also under the `console.log('Server started on ' + port);` add:

```javascript
var io = require('socket.io')(server);
```


#### Add Twitter Streaming API

Great! We're also going to using another module called [twit](https://github.com/ttezel/twit) to use with the Twitter Streaming API.

```bash
npm install twit --save
```

And add to your `app.js`:

```javascript
var Twit = require('twit');
```

Now you can either use your own twitter accounts or create fake ones for this purpose.


##  Setting up our Twitter app - Demo (5 mins)

Just like when we did OAuth, to make any of our apps work with Twitter/Facebook, we need to declare our app as a Twitter application using apps.twitter.com.

Let's go to [Twitter](https://apps.twitter.com) and create a new 'app':

- **Name:** twitter-stream-in-node
- **Description:** Small app to stream tweets from twitter.
- **Website:** http://127.0.1.1

I'll have to navigate to **Keys and Access Tokens** and copy the keys and generate **My Access Token** and instantiate new Twit object.

Then I'll, add my key to ~/.zshrc:

```bash
export TWITTER_CONSUMER_KEY=''
export TWITTER_CONSUMER_SECRET=''
export TWITTER_ACCESS_TOKEN=''
export TWITTER_ACCESS_TOKEN_SECRET=''
```

And remember to source:

```bash
source ~/.zshrc
```

Alternatively, put your API keys in a secrets.js file and add this file to a gitignore so you don't share your keys on github!

## Set up your Twitter app - Independent Practice (5 mins)

Try it on your own - head to apps.twitter.com and set up your application; don't forget to add your keys to `~/.zshrc`.


## Instantiate new Twitter - Codealong (25 mins)

Do you remember environment variables ENV['something']. In JS, we can use:

```
process.env.VARIABLE
```

Create new Twit client in  `app.js`:

```javascript
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
```

You can console log this to see if it has worked:

```javascript
console.log(twitter);
```

#### Get Tweets

Now we connect to the Twitter Streaming API, using the twit module, get all the statuses (or tweets) and filter them on our keyword.

```javascript
var stream = twitter.stream('statuses/filter', { track: 'javascript' });
```



#### Server-side Websocket

Now we set up our websocket on the server-side. There are a number of reserved words - connect, connection, message, disconnect - that can't be used elsewhere. We want our tweets to stream when we connect to the page so we open a _connect_ channel.

Inside, we set up our tweet socket and finally we _emit_ our _tweet_ on the _tweets_ channel.

```javascript
io.on('connect', function(socket) {
  stream.on('tweet', function(tweet) {
    socket.emit('tweets', tweet);
  });
});
```


#### Client Side

Now that's the server side sorted, now let's do the client. Open up our `index.hbs` and add two things - first thing is to include our socket.io library in the header:

```html
 <script type="text/javascript" src="/socket.io/socket.io.js"></script>
```

Notice that the path is relative - that's being done for you by Node.

#### Let's check in Chrome's console

Open up Chrome's console using `cmd+alt+j`

```
> io
< function lookup(uri,opts){if(typeof uri=="object"){opts=uri;uri=undefined}opts=opts||{};var parsed=url(uri);var source=parsed.source;var id=parsed.id;var io;if(opts.forceNew||opts["force new connection"]||false===opts.multiplex){debug("ignoring socket cache for %s",source);io=Manager(source,opts)}else{if(!cache[id]){debug("new io instance for %s",source);cache[id]=Manager(source,opts)}io=cache[id]}return io.socket(parsed.path)}
```

Then in `index.hbs` add in our receiving code below `body`:

```html
 <script type="text/javascript">
  var socket = io();

    socket.on('connect', function() {
      console.log('Connected!');
    });

    socket.on('tweets', function(tweet) {
      console.log(tweet);
    });
</script>
```

We use one of the reserved events ('connect') to log out the fact we are connected, and then, we hook up to the _tweets_ channel and start logging out what is received.

This is great! We now have own tweets streaming but only to the console. Let's get it on the page with some jQuery.

#### Back to the server-side

Go back to our `app.js` and tidy up the tweet data we're sending through:

```javascript
stream.on('tweet', function (tweet) {
var data = {};
  data.name = tweet.user.name;
  data.screen_name = tweet.user.screen_name;
  data.text = tweet.text;
  data.user_profile_image = tweet.user.profile_image_url;
  socket.emit('tweets', data);
});
```

Note the change to: `socket.emit('tweets', data);`

#### Let's change the views

Now we can add this using jQuery. Append vs Prepend.

```html
 <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>
```

Add a container:

```html
 <div id="tweet-container"></div>
```

Render the tweets with jQuery and amend the script tag in `index.hbs`:

```html
 <script type="text/javascript">
  var socket = io();

    socket.on('connect', function() {
      console.log('Connected!');
    });

    socket.on('tweets', function(tweet) {
      var html = '<div class="row"><div class="col-md-6 col-md-offset-3 tweet"><img src="' + tweet.user_profile_image + '" class="avatar pull-left"/><div class="names"><span class="full-name">' + tweet.name + ' </span><span class="username">@' +tweet.screen_name + '</span></div><div class="contents"><span class="text">' + tweet.text + '</span></div></div></div>';
      $('#tweet-container').prepend(html);
    });
</script>
```

## Style your page - Independent Practice (15 mins)

- Create folders for css and javascript and explain about static files. Add to app.js.
- Then create a public folder with a css subfolder and a stylesheet called `style.css` within the css directory:
- Include bootstrap and your own style sheet and style the body and h1 tags and the tweet, names and contents classes.

##Closure (5 mins)

- How does websockets differ from HTTP requests? AJAX?
- Briefly, describe the steps needed to use websockets to set up a stream of tweets in your application.
