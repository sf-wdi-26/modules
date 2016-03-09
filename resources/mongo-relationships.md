# Relationships and Embedding in Mongo


## Learning Objectives

| Objectives |
| :---- |
| Describe one-to-one, one-to-many, and many-to-many data relationships |
| Build the appropriate queries for nested data relationships |
| Describe the difference between "Embedded" and "Reference" associations |
| Use an "Embedded" pattern to associate resources with Mongoose |
| Create, update, and delete data for the nested resource |

## Motivation

Real-world data usually consists of different types of things that are related to each other in some way. A banking app might need to track employees, customers, and accounts. A food ordering app needs to know about restaurants, menus, and its users!  We've seen that when data is very simple, we can combine it all into one model.  When data is more complex or less closely tied together, we often create two or more related models.

Today we'll look at two different ways to think about relationships between two data records. The first is *cardinality* - how many of each type of thing participate in the relationship? The second deals with where data is stored. Is a complete copy *embedded* in a related data record, or does the related record just have a smaller *reference* (say, to its id)?

## Cardinality

### One-to-One

Each person has one brain, and each (living human) brain belongs to one person.

<img src="https://raw.githubusercontent.com/sf-wdi-22-23/modules-23/master/w03-intro-backend-with-express/d4-weekend-lab/img/one_to_one.png" alt="one to one erd"  width="250">

One-to-one relationships can sometimes just be modeled with simple attributes. A person and a brain are both complex enough that we might want to have their data in different models, with lots of different attributes on each.


### One-to-Many

Each youtube creator has many videos, and each video was posted by one youtube creator.

<img src="https://raw.githubusercontent.com/sf-wdi-22-23/modules-23/master/w03-intro-backend-with-express/d4-weekend-lab/img/one_to_many.png" alt="one to many erd" width="250">

### Many-to-Many

Each student can go to many classes, and each class has many students.

<img src="https://raw.githubusercontent.com/sf-wdi-22-23/modules-23/master/w03-intro-backend-with-express/d4-weekend-lab/img/many_to_many.png" alt="many to many erd"  width="250">

### Entity Relationship Diagrams

Entity relationship diagrams (ERDs) represent the relationships between data or entities.

![Entity Relationship Diagram example](https://www.edrawsoft.com/images/examples/entity-relationship-diagram.png)

Note: Attributes can be represented as line items under a heading (like all of the Item1, Item2, Item3 under each heading above) or as ovals stemming from the heading's rectangle.  

<a href="http://docs.oracle.com/cd/A87860_01/doc/java.817/a81358/05_dev1.htm" target="_blank">More guidelines for ERDs</a>



## Embed or Reference?

While cardinality is often determined by real-world characteristics of a relationship, the decision to embed or reference data is a design decision.


**Embedded Data** is directly nested *inside* of other data. Each record has a copy of the data.

![](http://docs.mongodb.org/manual/_images/data-model-denormalized.png)

**Referenced Data** is stored as an *id* inside other data. The id can be used to look up the information. All records that reference the same data look up the same copy.

![](http://docs.mongodb.org/manual/_images/data-model-normalized.png)



### Tradeoffs

There are tradeoffs of *efficiency* and *consistency* depending on which one you choose.

It's often more *efficient* to embed data because you don't have to make a separate request or a separate database query -- the first request or query gets you all the information you need.

It's easier to stay *consistent* when you reference data because you only keep one copy around. You don't have to worry that you'll forget to update or delete one copy of the data.



###Scenario

How would you design the following?

* A `User` that has many `Tweets`?
* A `Food` that has many `Ingredients`?


### Setting Up Relationships with Mongoose

**Embedding Data**

```javascript
var tweetSchema = new Schema({
  body: {
    type: String,
    default: ""
  }
});

var userSchema = new Schema({
  username: {
    type: String,
    default: ""
  },
  tweets: [tweetSchema]   // EMBEDDING :D
});
```

**Referencing Data**

```javascript
var foodSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  ingredients: [{
    // REFERENCING :D
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  }]
});

var ingredientSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  origin: {
    type: String,
    default: ""
  }
});
```



## Route Design

Remember to always make "RESTful" routes. RESTful routes are the most popular modern convention for designing resource paths for nested data. Here is an example of an application that has routes for `Store` and `Item` models:

### RESTful Routing
|| | |
|---|---|---|
| **HTTP Verb** | **Path** | **Description** |
| GET | /store | Get all stores |
| POST | /store | Create a store |
| GET | /store/:id | Get a store |
| DELETE | /store/:id | Delete a store |
| GET | /store/:store_id/items | Get all items from a store |
| POST | /store/:store_id/items | Create an item for a store |
| GET | /store/:store_id/items/:item_id | Get an item from a store |
| DELETE | /store/:store_id/items/:item_id | Delete an item from a store |

*In routes, avoid nesting resources deeper than shown above.*



There are trade-offs between *efficiency* and *consistency* depending on which type of data relationship you choose.

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

### Route to Create Embedded Data

```js
// create todo embedded in list
app.post('/api/lists/:listId/todos', function (req, res) {
  // set the value of the list id
  var listId = req.params.listId;

  // store new todo in memory with data from request body
  var newTodo = new Todo(req.body.todo);

  // find list in db by id and add new todo
  List.findOne({_id: listId}, function (err, foundList) {
    foundList.todos.push(newTodo);
    foundList.save(function (err, savedList) {
      res.json(newTodo);
    });
  });
});
```

### Route to Update Embedded Data

```js
// update todo embedded in list
app.put('/api/lists/:listId/todos/:id', function (req, res) {
  // set the value of the list and todo ids
  var listId = req.params.listId;
  var todoId = req.params.id;

  // find list in db by id
  List.findOne({_id: listId}, function (err, foundList) {
    // find todo embedded in list
    var foundTodo = foundList.todos.id(todoId);
    // update todo text and completed with data from request body
    foundTodo.text = req.body.todo.text;
    foundTodo.completed = req.body.todo.completed;
    foundList.save(function (err, savedList) {
      res.json(foundTodo);
    });
  });
});
```

### Route to Delete Embedded Data

```js
// delete todo embedded in list
app.delete('/api/lists/:listId/todos/:id', function (req, res) {
  // set the value of the list and todo ids
  var listId = req.params.listId;
  var todoId = req.params.id;

  // find list in db by id
  List.findOne({_id: listId}, function (err, foundList) {
    // find todo embedded in list
    var foundTodo = foundList.todos.id(todoId);
    // remove todo
    foundTodo.remove();
    foundList.save(function (err, savedList) {
      res.json(foundTodo);
    });
  });
});
```
<!--
## Challenges

**Setting up an Embedded Model**

1. Write a file called `post.js` that has a post model with an attribute `comments` that contains an embedded comment schema.

**Writing User/Tweets Routes**

The following challenges are psuedo code. Write a method for each example.

Here's an example where **Monsters have many Broods**:

1. Write a route to create a new Monster.

  ```js
    app.post('/monsters', function(req, res) {
      var monster = req.body.monster;
      Monster.create(monster, function (err, monster) {
        res.status(200).json(monster);
      });
    });
  ```

1. Write a route to create a new Brood that belongs to a Monster.

  ```js
    app.post('/monsters/:id/broods', function(req, res) {
      Monster.findById(req.params.id, function(err, monster) {
        var brood = req.body.brood;
        monster.brood.push(brood);
        monster.save(function(err) {
          res.status(200).json(brood);
        });
      });
    });
  ```

In the following challenges imagine that **Users have many Tweets**

2. Write a route to create a new User.
3. Return an array of all the users.
4. Return an array of all tweets of a specific user.
5. Create a new post that belongs to a user (who's id is in the `req.params.id`).
6. Delete a post that belongs to a user (make sure to build the route to include the user and the post's id's - see example above).
7. Update a post that belongs to a user (ditto on their id's!).


**Questions**

1. What are three examples of times when you would use embedded association pattern?
1. What are three you would use a reference association pattern?
-->

# <img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="60">  Mongoose Reference (Relationships) & Populate

| Objectives |
| :---- |
| Describe one-to-one, one-to-many and many-to-many data **relationships**. |
| Write mongoose schemas for referenced data. |
| Build the appropriate queries for referenced data relationships using `populate()`. |

<img src="http://38.media.tumblr.com/03750c098377d076ab1d0cc990c5a401/tumblr_mhj8zkpHcB1r4xpb7o3_250.gif" width="400px">

#### Setup

```js
// pull in mongoose module with require
var mongoose = require('mongoose');

```

The above code is the standard boilerplate mongoose setup that you will see in any seed.js or Model file.

This next snippet only needs to happen once in your server-side code or models. It will usually be in your main server code (`server.js`) or in your models index (`/models/index.js`) if you have one.

```js
// connect to the mongoose database, `console` collection
mongoose.connect('mongodb://localhost/console');
```

When we actually want to start setting up MongoDB data, we start with the Schema:

```js
// giving mongoose.Schema a shorter name for convenience
var Schema = mongoose.Schema;

// set up the videogame console schema
/* Console Schema */
var consoleSchema = new Schema({
  name: String,
  manufacturer: String,
  released: Date
});
```

The `consoleSchema` describes a videogame console such as Nintendo, Sega, or XBox.


```js
/* Game Schema */
var gameSchema = new Schema({
  name: String,
  developer: String,
  released: Date,
  // I'm telling consoles to EXPECT references to Console documents
  consoles: [{type: Schema.Types.ObjectId, ref: 'Console'}]
});
```
The `Game Schema` above describes an actual videogame such as Super Mario Bros., MegaMan, Final Fantasy, and Skyrim.

Note the specific code on line 7 within the `[]` brackets. With the brackets, we're letting the Game Schema know that each game will have an array called `consoles` in it. Inside the `[]`, we're describing what kind of data will go inside a game's `consoles` array as we work with the database. In this case we are telling the Game Schema that we will be filling the `consoles` array with ObjectIds, which is the type of that big beautiful `_id` that Mongo automatically generates for us.

If you forgot, it looks like this: `55e4ce4ae83df339ba2478c6`. That's what's going on with `type: Schema.Types.Objectid`.

When we have the code `ref: 'Console'`, that means that we will be storing ONLY ObjectIds associated with the `Console` document type. Basically, we will only be putting `Console` ObjectIds inside the `consoles` array -- not the whole console object, and not any other kind of data object.

Now that we have our schemas defined, let's compile them all into active models so we can start creating documents!

```js
/* Compiling models from the above schemas */
var Game = mongoose.model('Game', gameSchema);
var Console = mongoose.model('Console', consoleSchema);
```

Let's make two objects to test out creating a Console document and Game document.

```js
/* make a new Console document */
var nin64 = new Console ({
 name: 'Nintendo 64',
 manufacturer: 'Nintendo',
 released: 'September 29, 1996'
});
```

```js
/* make a new Game document */
var zelda = new Game ({
  name: 'The Legend of Zelda: Ocarina of Time',
  developer: 'Nintendo',
  release: new Date('April 27, 2000'),
  consoles: []
});
```

Notice that consoles is empty within the Game document. That will be filled with ObjectIds later on.

Now we will create a `Console` document using the `nin64` object we made above. While inside the console creation callback function, we'll also create our `Game` document. We do this inside the `Console` creation because we can easily access the newly created `nintendo64` object this is available to us as a callback return in line 3.

After we create the `Game` document, we push the `nintendo64` console document into the `zeldaGame` consoles array. Since we already told the Game Schema that we will only be storing ObjectIds instead of actual `Console` documents in the `consoles` array, mongoose will convert `nintendo64` to it's unique `_id` .

```js
nin64.save(function(err, nintendo64) {
 if(err) {return console.error(err);}
 else console.log(nintendo64);
});
zelda.consoles.push(nin64);
zelda.save();
```

This is the result after executing the code we've written thus far:

```js
{ __v: 0,
  name: 'The Legend of Zelda: Ocarina of Time',
  developer: 'Nintendo',
  _id: 55e4eb857d6157f4d41a2981,
  consoles: [ 55e4eb857d6157f4d41a2980 ] }
```

What are we looking at?

1. Line 1: `__v` represents the number of times the document has been accessed.

1. Line 2: The name property of the Game Document we have created.

1. Line 3: The developer property of the Game Document we have created.

1. Line 4: The unique `_id` created by Mongoose for our Game Document.

1. Line 5: The consoles array with a single `ObjectId` that is associated with our Console Document.

Lets print out the Console Document `nintendo64` to make sure the `ObjectId` in consoles matches the `_id` we see for this game:

```js
Console.findOne({_id: "55e4eb857d6157f4d41a2980"}, function (err, foundConsole){
 if(err) {return console.error(err);}
 console.log(foundConsole);
});

{ _id: 55e4eb857d6157f4d41a2980,
  name: 'Nintendo 64',
  manufacturer: 'Nintendo',
  released: Sun Sep 29 1996 00:00:00 GMT-0700 (PDT),
  __v: 0 }
```

Sure enough, the only `ObjectId` from the game's `consoles` array matches the Console Document `_id` we created!. What's going on? The Game Document consoles has a single `Objectid` that contains the '*address*' or the '*location*' where it can find the Console Document if and when it needs it. This keeps our Game Document small, since it doesn't have to have so much information packed into it. When we need the Console Document data, we have to ask for it explicitly. Until then, mongoose is happy to show just the `ObjectId` associated with each console in the game's `consoles` array.

## The `populate()` method

When we want to get full information from a Console Document we have inside the Game Document consoles array, we use the method call `.populate()`.

```js
Game.findOne({ name: 'The Legend of Zelda: Ocarina of Time' })
  .populate('consoles')
  .exec(function(err, game) {
    if(err){return console.error(err);}
    if (game.consoles.length > 0) {
      for (var i=0; i<game.consoles.length; i++) {
        console.log("/nI love " + game.name + " for the " + game.consoles[0].name);
      }
    }
    else {
      console.log('Game has no consoles.');
    }
    console.log(game);
  });
```

Let's go over this method call line by line:

1. Line 1: We call a method to find only **one** Game Document that matches the name: `The Legend of Zelda: Ocarina of Time`.

1. Line 2: We ask the consoles array within that Game Document to fetch the actual Console Document instead of the `ObjectId` referencing that Console Document.

1. Line 3: When we use `find` without a callback, then `populate`, like here, we can put a callback inside an `.exec()` method call. Technically we have made a query with `find`, but only executed it when we call `.exec()`.

1. Lines 4-12: If we have any errors, we will log them.  Otherwise, we can display the entire Game Document **including** the populated consoles array.

1. Line 13 demonstrates that we are able to access both data from the original Game Document we found **and** the referenced Console Document we summoned.

<details>
  <summary>What is the actual output from the above `findOne()` method call with populate?</summary>

  ```js
  { _id: 55e4eb857d6157f4d41a2981,
    name: 'The Legend of Zelda: Ocarina of Time',
    developer: 'Nintendo',
    __v: 1,
    consoles:
     [ { _id: 55e4eb857d6157f4d41a2980,
         name: 'Nintendo 64',
         manufacturer: 'Nintendo',
         released: Sun Sep 29 1996 00:00:00 GMT-0700 (PDT),
         __v: 0 }
     ]
  }

  I love The Legend of Zelda: Ocarina of Time on the Nintendo 64
  ```
</details>

Now, instead of seeing **only** the `ObjectId` that pointed us to the `Console` document, we can see the **entire** `Console` document. Notice that the `Console` document's `_id` is exactly the same as the `ObjectId` that was previously referencing it. They are one in the same!

# Exercises

### Setup

<details>
  <summary>Create a small node project which can connect to your MongoDB using Mongoose.</summary>

  Give up?

  ```zsh
  cd ~/develop
  mkdir mongoose-games
  cd mongoose-games
  touch server.js
  npm init
  npm install mongoose --save
  subl server.js
  nodemon server.js
  ```
</details>
<!--
### Base Exercises

1. Assemble the code in this module's README into your `server.js` file and refactor it to create your own models that use referenced documents. Be creative and make it interesting and relevant (easier said than done).
1. Create at least 5 'top-level' documents (in my case, five games) and at least 3 referenced documents (in my case, three consoles).
1. Demonstrate the ability to display the documents with just an ObjectId for the referenced documents.
1. Finally, call `populate()` on a query and demonstrate the **full** referenced documents as in the README with the Legend of Zelda: Ocarina of Time and the Nintendo 64.

### Stretch Exercises

1. Add another model to your code to create a multi-tiered structure.
1. Incorporate both embedded and referenced models.

### Tips:

* Use `.remove` or `.findOneAndRemove` if your database gets cluttered.

* This `server.js` file might not work exactly because of the *asynchronous* nature of the database operations we're doing. (They can finish in any order -- test this out with console logs in every callback.) Still, each individual snippet of code will be something we can incorporate into our server code later.
-->
