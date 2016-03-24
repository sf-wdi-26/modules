# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60"> Wait... What's Node/Express/MongoDB again?

Recap:

### What is Node?
- Node.js is a webserver that operates on the V8 Google Chrome JavaScript runtime, allowing you to write server-side code in JavaScript.
- Node.js provides the ability to handle requests and issue responses.
- It is fast.
- It is fast largely because it is asynchronous, meaning code can run in parallel without "blocking" the call stack (the list of other concurrent commands).

### What is Express JS?
- Express is a framework built on top of Node.js that makes development of web servers more intuitive and quicker.
- Express allows us to easily set up routes that will trigger actions such as rendering pages or returning JSON.

### Hello World in Express  

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
})

var server = app.listen(3000);
```  

### Express file tree

```
├── server.js           // your server code
├── package.json        // lists dependencies; changed by npm install --save somePackage
├── public              // i.e. client-side
│   ├── images          // images to serve to client
│   ├── javascripts
│       └── app.js      // client-side javascript file
│   └── stylesheets
│       └── style.css
├── vendor              // optional 2nd public dir for jQuery & bootstrap if we choose not to use CDNs
├── views               // html files that we'll serve
│   └── index.html
└── node_modules        // don't edit files in here!
    ├── express         // etc
```

## Request Response Cycle

Remember that the interwebs is many clients querying many servers. We've done a lot with clients and APIs, and now we want to write the server side code that handles the request and then responds with some data.

![request](http://i.imgur.com/YXgj8.png)  


## Route Design

Remember to always make "RESTful" routes. RESTful routes are the most popular modern convention for designing resource paths for nested data. Here is an example of an application that has routes for `Store` and `Item` models:

### RESTful Routing

| **HTTP Verb** | **Path** | **Description** |
|---|---|---|
| GET | /store | Get all stores |
| POST | /store | Create a store |
| GET | /store/:id | Get a store |
| DELETE | /store/:id | Delete a store |
| GET | /store/:store_id/items | Get all items from a store |
| POST | /store/:store_id/items | Create an item for a store |
| GET | /store/:store_id/items/:item_id | Get an item from a store |
| DELETE | /store/:store_id/items/:item_id | Delete an item from a store |

*In routes, avoid nesting resources deeper than shown above.*

### What is MongoDB?

`MongoDB` is a no-SQL database. `Mongoose` is a library or "wrapper" that gives us a bunch of convenience methods for working with MongoDB records (kind of like jQuery's convenience methods for manipulating the DOM). Generally we will not be interacting _directly_ with MongoDB, instead we'll be working with `mongoose`.

## Express/MongoDB Integration
Here's how you would set up an Express application with a "Todo" model (so we can start CRUDing todos!).

1. In your Express application, create a folder called `models` with a file for your first model. In the example, we have a `Todo` model, so the filename is `todo.js`. Your folder structure should look similar to this:

  ```
  | your-app-name
    | models
      - todo.js
    | public
      | scripts
        - main.js
      | styles
        - main.css
    | views
      - index.html
    - .gitignore
    - package.json
    - readme.md
    - server.js
  ```

2. <details>
  <summary>In your model file (e.g. `todo.js`), create the model schema, and export it so that you can require it in other parts of your app.</summary>
  ```js
  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var TodoSchema = new Schema({
    task: String,
    description: String
  });

  var Todo = mongoose.model('Todo', TodoSchema);

  module.exports = Todo;
  ```
</details>

3. <details>
  <summary>In `server.js`, require your model.</summary>
  ```js
  var Todo = require('./models/todo');
  ```
</details>

## Embedded Data Example: To-Do Lists

Imagine you have a database of todo `Lists`, each with many `Todos`. Since todos only belong to one list, you could use embedded data to store todos inside the list they belong to. If you needed to update or delete a todo, you would first need to find the associated list, then the todo to update or delete.

```js
// List model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // require Todo model
    Todo = require('./todo');

var ListSchema = new Schema({
  name: String,
  // embed todos in list
  todos: [TodoSchema]
});

var List = mongoose.model('List', ListSchema);
module.exports = List;
```

```js
// Todo model

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  text: String,
  completed: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
```



Head over to [Tunely](https://github.com/sf-wdi-25/tunely/tree/solutions_sprint_6) in its final form so we can walk down memory lane.

You are now ready.  [Let us make MEAN!](https://github.com/sf-wdi-25/mean_todo)

## Documents to review

[Express Review](https://github.com/sf-wdi-25/notes/tree/master/week-03-ajax-json-express/day-03-intro-express/dawn-express)  

[Express Review Pt. 2](https://github.com/sf-wdi-25/notes/tree/master/week-03-ajax-json-express/day-03-intro-express/dusk-express)  

[MongoDB Introduction](https://github.com/sf-wdi-25/notes/tree/master/week-04-mongo-database/day-01-mongo/dawn-mongo)  

[Embedded Documents in MongoDB](https://github.com/sf-wdi-25/notes/tree/master/week-04-mongo-database/day-01-mongo/dusk-schemas_and_embedding)
