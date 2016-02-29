# Debugging and Logging in Node

### Objectives
*After this lesson, students will be able to:*

- Add a middleware to use debugging & logging in your app
- Describe how to use debugging as a tool to see where problems happen
- Identify the most common Node/Express errors
- Trouble shoot the most common Node/Express errors

### Preparation
*Before this lesson, students should already be able to:*

- Explain what Node.js is & why it exists
- Use module.exports and require to organize code

## Debugging a NodeJS app - Intro (5 mins)

JavaScript is powerful - with callbacks, and the ability to work asynchronously, we've been writing that's fast and elegant.  But the asynchronous nature of JavaScript makes debugging a lot trickier than we're used to in Sinatra and Rails.

Debugging in Node.js is done through some specific packages and some tools provided by default.  In this lesson, we will talk about Middleware - yes, like we used in Sinatra - Morgan, Nodemon, and debugger

## Setting up our app for debugging - Codealong (15 mins)

#### Add Middleware for custom debugging.

You may have seen this word floating around or seen it when you did Sinatra (Rack Middleware). It's a bit of a funny concept but think about it as _something_ that sits in-between express and you...kind of. Let's look at an example.

By default, in most apps without debugging configuration, we'd be logging out the server port once it has started. That is it. We get no other information about requests or errors like we have in Rails. No biggie, though, we can use some _Middleware_ to achieve this.


Let's pretend we have an `app.js` file:

```javascript

.
.
.
app.set('view engine', 'ejs');

// Middleware
app.use(function(req, res, next) {
  console.log('%s request to %s from %s', req.method, req.path, req.ip);
  next();
});

app.get('/', function(req, res) {
.
.
.
```

After setting up our app and before our routes we tell our app to use a new function we are providing. That's all Middleware is! When writing custom Middleware, it's best practice to pass in the **req** object, the **res** object and finally **next**, even if we don't use it! In this case, we are simply logging out the request method ('GET'), the request path ('/') and the request IP ('127.0.0.1' - localhost). The request object provided by Express Callbacks will give you access to a lot of properties and methods that will be really useful debugging:

* ExpressJS request object Properties
    * req.app
    * req.baseUrl
    * req.body
    * req.cookies
    * req.fresh
    * req.hostname
    * req.ip
    * req.ips
    * req.originalUrl
    * req.params
    * req.path
    * req.protocol
    * req.query
    * req.route
    * req.secure
    * req.signedCookies
    * req.stale
    * req.subdomains
    * req.xhr

* ExpressJS request object Methods
    * req.accepts()
    * req.acceptsCharsets()
    * req.acceptsEncodings()
    * req.acceptsLanguages()
    * req.get()
    * req.is()
    * req.param()

You can find more details [here](http://expressjs.com/api.html#req).

## Working with Express debugging tools - Codealong (15 mins)

Open up an Express app, and let's configure our app to use Middleware.


Now that we have it up and running, not in the Console log of Chrome - because that wouldn't help us with server logic (yet) - but from the terminal console while the server is running: if you try and hit another path ('/fail') this will now show up in logger in the logs.

You may also notice the formatting of the string returned. This is 'node-speak' for this:

```javascript
console.log(req.method + ' request to ' + req.path + ' from ' + req.ip);
```

#### Next

Looking back at `app.js` sample, take a look at `next`:

```javascript
// Middleware
app.use(function(req, res, next) {
  console.log('%s request to %s from %s', req.method, req.path, req.ip);
  next();
});
```

This tells express to continue processing the request or the next piece of Middleware. You can edit the request from inside of a Middleware function so if you are writing your own - be careful!

---

## Better logging with Morgan and Nodemon - Demo (10 mins)

Now our logging Middleware is ok, but it's not great. If this was Sinatra or Rails we would go off and find the best logging gem so let's do the same with `npm`.

We're going to be using a module called `morgan`. So let's install it in the normal way. Don't forget to add `--save` so it get's added to the dependencies!

```bash
npm install morgan --save
```

Then we require it in our app.js (at the top):


```javascript
var morgan = require('morgan');
```

...and finally _use_ it!

```javascript
app.use(morgan('dev'));
```

Restart the server and check out the logging, now!

#### Sinatra/reloader equivalent: nodemon

Introducing [nodemon](https://github.com/remy/nodemon) - now, you don't have to keep restarting server, it does it for you!

```
npm install nodemon -g
```

Another syntax is:

```
npm install -g nodemon
```

The `-g` here has basically installed nodemon globally (more similar to the way that you install gems normally).

You start the app now with:

```
nodemon app.js
```

## Configure your app to use Morgan and Nodemon - Independent Practice (10 mins)

Take a few minutes and use what you just learned - plus, the official docs for both Morgan and Nodeman - to configure your application:

- [Nodemon](https://github.com/remy/nodemon)
- [Morgan](https://github.com/expressjs/morgan)

Try it out with `nodeman yourapp.js`

#### Binding.pry in Node - `debugger`! - Demo (10 mins)

We can add some debugger statements in our different Node apps and debug the code in real time using `node-inspector`. Let's install it:

```bash
npm install -g node-inspector
```

Now you can run:


```bash
node-debug app.js
```

When a Node app is running, v8 (the javascript engine executing the code) keeps a "backdoor" open so that it is possible for another program to view what is the code executed and change the code "in realtime" without re-starting the server. This will be done using the Chrome dev tools, when you type the command above, Node will automatically launch a new instance of Google Chrome and open an inspector window that basically gives you access to all the code you typed in the files. In the left sidebar of the window, just click on `app.js`, then add a debugger statement and click on the "execute script button":

<p align='center'>
<img src='http://s10.postimg.org/ycaokgsl1/Screen_Shot_2015_07_27_at_14_22_53.png'
</p>

The console should now be stopped where you added the `debugger`statement, if you click on the tab `console` in Chrome dev tools, then you can access the variable declared before the debugger statement, as if we were debugging JavaScript in the browser!

## Codealong - Debugging a Node app (25 mins)

Let's set up our app to use node-debug - in addition `Middleware`, `Morgan`, and `Nodemon` - and work through some problems we encounter.

> Note: Instructor should ensure that applications are properly configured with Middleware, Morgan, Nodemon, and node-inspector (with students) and then work through the errors in the existing code base with the class.

#### Conclusion (5 mins)

You will need to use Debugging a lot in NodeJS, and we've shown you how to install these tools in your application:

- Why can't you use the Chrome console to debug a Node.js model, controller, or `app.js` file without `node-inspector`?
- Describe the steps to be taken to set up an Express app to log like Rails.
