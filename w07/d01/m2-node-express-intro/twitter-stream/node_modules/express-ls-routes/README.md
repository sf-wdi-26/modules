express-ls-routes
=================

*Updated: supports express3 and express4!*

It's a cli that lets you list the routes in your express app:

```
$ routes

GET    /my-app/:id
POST   /my-app
...
```

And a middleware that can expose the same information in a route in your app:

```
$ curl localhost:3000

[
  "GET   /my-app/:id",
  "POST  /my-app"
  ...
]

```

## Install

```
npm install express-ls-routes --save
```

## CLI

#### Running

Simply run:

```
routes
```

Note that this requires `./node_modules/.bin` to be in your path.  If it's not, use the command:

```
node_modules/.bin/routes
```

In this case, definitely consider adding an npm scripts entry (see below).

#### Setup

The cli depends on your routes being listed in one file.  It depends on your file being formatted like this, where your express app is called 'app' or 'server'.  The route handlers can be inline functions or references to other modules.

```
app.get('/my-app/:id', ...)
app.post('/my-app', ...)
...

```

This is because the cli doesn't actually run the express app.  It just parses the static js file contents to derive your app's routes.

#### routes.js Location

The cli shouldn't require configuration if you use the default file locations.  By default, the cli expects the `routes.js` file to be located at:

```
app/config/routes.js
```
You can change this behavior by doing two things:

- Run the cli via npm scripts by adding it in `package.json`:

```
"scripts": {
  "routes": "routes"
}
```

- Add config in `package.json` for the `routes.js` location:

```
"config": {
  "routes": "app/another/location/myRoutes.js"
}
```

## Middleware

#### Setup

The middleware doesn't depend on your `routes.js` file being in any specific location as in the case of the cli because it actually interrogates your express `app` to determine what routes have been attached to it.  But, because of this, you must use this middleware after all the routes you want the middleware to know about have been attached.  This will mean that you usually put the endpoint that lists routes as the last route in your app.

Pass your express `app` to the middleware, and it will attach routes as json `routes` on the request (`req`) object:

```
var lsRoutes = require('express-ls-routes')

app.get('/', lsRoutes(app), function (req, res) {
  res.json(200, req.routes)
})
```
