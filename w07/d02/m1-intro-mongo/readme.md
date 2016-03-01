# MongoDB
## Learning Objectives

- Compare and contrast relational to document based (NoSql)
- Setup local mongo db server
- CRUD documents using mongo CLI

## Framing

[Mongo](https://www.mongodb.org) is an open-source document-based non-relational data store that provides:
- High Performance
- High Availability
- Automatic Scaling

> We've learned a considerable amount about relational databases. We use join-tables & foreign keys in relational databases to query our database in complex ways. These joins can result in complicated queries and be taxing on a database. When dealing with **less complex associations**, a non-relational databases may be more effective. This not to say Mongo is a better or worse solution than Postgres or other SQL libraries, but an alternative solution.

![CAP](http://d2-data.com/douglas-bernardini/wp-content/uploads/2015/09/CAP-SAMPLES.jpg)

The above chart illustrates the CAP theorem, which states that it is impossible for a distributed computer system to simultaneously provide all three of the following guarantees:

* Consistency — all nodes on the network see the same data at the same time)
* Availability — a guarantee that every request receives a response
* Partition tolerance — a partitioned system continues to operate despite network failures

##Relational SQL Databases vs. MongoDB Terminology

![Relational vs Non-relational](https://camo.githubusercontent.com/fbd52e2a254672a98b2dd08d1e20fac4a4706f0f/687474703a2f2f342e62702e626c6f6773706f742e636f6d2f2d65647a325f5172467643452f556e7a42684b5a453346492f41414141414141414145732f62544573716e5a465458772f73313630302f53514c2d4d6f6e676f44422b436f72726573706f6e64656e63652e504e47)
![tables vs documents](https://camo.githubusercontent.com/825f5c750e74e38094764159461de96cd04297d9/687474703a2f2f64617461636f6e6f6d792e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031342f30372f53514c2d76732e2d4e6f53514c2e706e67)

##SQL vs noSQL
A great analogy from a fellow StackOverflow:

>"NoSQL (or schema-less, or document-store, or what-have-you) databases store information like you would recipes in a book. When you want to know how to make a cake, you go to that recipe, and all of the information about how to make that cake (ingredients, preparation, mixing, baking, finishing, etc.) are all on that one page.

>SQL is like shopping for the ingredients for the recipe. In order to get all of your ingredients into your cart, you have to go to many different aisles to get each ingredient. When you are done shopping, your grocery cart will be full of all of the ingredients you had to run around and collect.

>Wouldn't it be nicer if there was a store was organized by recipe, so you could go to one place in the store and grab everything you need from that one spot? Granted you'll find ingredients like eggs in 50 different places, so there's a bit of overhead when stocking the shelves, but from a consumer standpoint it was much easier/faster to find what they were looking for."

-[mgoffin, Jan 20 '13 at 19:15](http://stackoverflow.com/questions/14428069/sql-and-nosql-analogy-for-the-non-technical/14428221#14428221)  

## Documents

- A MongoDB database consists of _documents_ (you can also refer to them as records).
- A _document_ in MongoDB is composed of _field_ and _value_ pairs.
- Fields, aka keys, may store other documents, arrays, and arrays of documents as their values.

#### Data Format

Lets take a look of what a MongoDB _document_ may look like:

```js
{
    _id: ObjectId("5099803df3f4948bd2f98391"),
    name: { first: "Alan", last: "Turing" },
    birth: new Date('Jun 23, 1912'),
    death: new Date('Jun 07, 1954'),
    contributions: [ "Turing machine", "Turing test", "Turingery" ],
    views: 1250000
}
```

__What does this data structure remind you of?__ JSON!

A MongoDB _document_ is very much like JSON, except it is stored in the database in a format known as _BSON_ (think - _Binary JSON_).

_BSON_ basically extends _JSON_ with additional data types, such as __ObjectID__ and __Date__ shown above.

#### The Document *_id*

The *_id* is a special field represents the document's _primary key_ and will always be listed as the first field. It must be unique.

We can explicitly set the *_id* like this:

```js
{
  _id: 2,
  name: "Suzy"
}
```
or this...

```js
{
  _id: "ABC",
  name: "Suzy"
}
```
However, it's more common to allow MongoDB to create it implicitly for us using its _ObjectID_ data type.

#### Collections

MongoDB stores documents in collections.

- Collections are analogous to tables in relational databases.
- Does **NOT** require its documents to have the same schema.
- Documents stored in a collection must have a unique `_id` field that acts as a primary key.

#### Key Differences of MongoDB

- **Schema-less**
The documents in a MongoDB collection can have completely different types and number of fields from each other.<br>__How does this compare to a SQL database like PostgreSQL?__

- **No Join Tables**
In a SQL/Relational database, we break up related data into separate tables.

In MongoDB, we often _embed_ related data in a single document, you'll see an example of this later.

The supporters of MongoDB highlight the lack of table joins as a performance advantage since joins are expensive in terms of computer processing.


## Installing, Creating a DB, and Inserting Documents - Code-along

#### Installation

You may already have MongoDB installed on your system, lets check in terminal. Enter: `mongod` (note the lack of a "b" at the end").

If you receive an error, lets use _Homebrew_ to install MongoDB:

1. Update Homebrew's database (this might take a bit of time)<br>`brew update`
2. Then install MongoDB

 `brew install mongodb`

MongoDB by default will look for data in a folder named `/data/db`. We would have had to create this folder, but Homebrew did it for us (hopefully).

#### Start Your Engine

`mongod` is the name of the actual database engine process. The installation of MongoDB does not set mongoDB to start automatically. A common source of errors when starting to work with MongoDB is forgetting to start the database engine.

To start the database engine, type `mongod` in terminal.

Press `control-c` to stop the engine.

#### Creating a Database and Inserting Documents

MongoDB installs with a client app, a JavaScript-based shell, that allows us to interact with MongoDB directly.

Start the app in terminal by typing `mongo`. If you got an error, check if `mongod` is running in the background.

The mongo interface will load and change the prompt will change to `>`.

List the shell's commands available: `> help`

## Think-pair-share (2min):
- What jumps out as important?
- Try it

## Helpful commands
- `show dbs`: show database names
- `show collections`:  show collections in current database
- `use <db_name>`: set current database
- `db.foo.find()`: list objects in collection foo

Also:

- `<tab>` key completion
- `<up-arrow>` and the `<down-arrow>` for history.

In the mongo REPL we want to connect to create/connect to a database.

We *want* to work with the `restaurants` database:

```js
use restaurant_db
```

Verify:

```js
> db
restaurant_db
```

Common Mistake:
`show dbs`
> note we don't see restaurants listed. It isn't until we add a document to our database does it list the DB in `show dbs`

## Create a record

### Insert

- use `insert()` to add documents to a collection

```js
db.restaurants.insert(
   {
      name: "Cookies Corner",
      address : {
         street : "1970 2nd St NW",
         zipcode : 20001,
      },
      yelp: "http://www.yelp.com/biz/cookies-corner-washington",
});
```

> The db is the database we're connected to. In this case, `restaurant_db`. `.restaurants` is then referring to a collection in our `restaurant_db`. We use the `.insert()` to add the document inside the parentheses.

### Show all
```js
> show collections
restaurants
system.indexes
```

```js
> db.restaurants.find()
```

- name
- address
- yelp

What is surprising/unexpected?

- where did restaurants come from?
- `_id`?
- [ObjectId](https://docs.mongodb.org/manual/reference/object-id/)

New Record:
- If the document passed to the insert() method does not contain the _id field, the mongo shell automatically adds the field to the document and sets the field’s value to a generated ObjectId.

New collection:
- If you attempt to add documents to a collection that does not exist, MongoDB will create the collection for you.

## Dropping a Database

```
use milk-n-cookies
db.dropDatabase()
```

Drops the **current** database.

### Exercise: Add a few more restaurants.

ProTip: I recommend you construct your statements in your editor and copy/paste.  It will help you now & later. Can you insert multiple restaurants at one time?

Let's recreate the steps together:
Where are we now?
```
db
```

1. Create DB
2. Use the appropriate DB
3. Insert multiple restaurants

```js
db.restaurants.remove({});
db.restaurants.insert([
  {
      name: "Cookies Corner",
      address: {
         street: "1970 2nd St NW",
         zipcode: 20001,
      },
      yelp: "http://www.yelp.com/biz/cookies-corner-washington"
  },
  { name: "The Blind Dog Cafe", address: { street: "944 Florida Ave",
        zipcode: 20001 }, yelp: "http://www.yelp.com/biz/the-blind-dog-cafe-washington-2?osq=cookies" },
  {name: "Birch & Barley", address: { street: "1337 14th St NW", zipcode: 20005}, yelp: "http://www.yelp.com/biz/birch-and-barley-washington?osq=Restaurants+cookies"},
  {name: "Captain Cookie and the Milk Man", address: { street: "Dupont Circle", zipcode: 20036 }, yelp: "http://www.yelp.com/biz/captain-cookie-and-the-milk-man-washington-5" },
  {name: "J’s Cookies", address: { street: "1700 N Moore St", zipcode: 22209}, yelp: "http://www.yelp.com/biz/js-cookies-arlington" }
])
db.restaurants.count()
```

#### Find by Conditions (like `where`)

Key: Value pairs

```js
db.restaurants.find({name: "Cookies Corner"});
db.restaurants.find({"address.zipcode": 20001});
```

>Note: that we can search for nested data, such as the `address.zipcode` by using a string as the key.

## Update/Delete

### You do:

[Update](http://docs.mongodb.org/manual/core/write-operations-introduction/) a restaurant to have a new key-value par `{state: "DC"}`

```js
db.restaurants.update(
  {name: "Cookies Corner"},
  { $set: { state: "DC" }}
)
```

> Note: the first key value pair finds the document you'd like to update, the second is what values you'd like to set and third is any additional options

Verify:

```js
db.restaurants.find()
```

#### Delete a document

```js
db.restaurants.remove({ name: "Cookies Corner" })
```

> Note: this will remove all restaurants with the name `"Cookies Corner"`

## Quick Review

* Compare and contrast relational with non-relational databases. What give an example of when each would be useful.
* What is a `collection` comparable to in a relational (SQL) database? What about a `document`? How about a `field`?

## Helpful References
- [CRUD Intro](http://docs.mongodb.org/manual/core/crud-introduction/)
- [CRUD Commands](http://docs.mongodb.org/manual/reference/crud/)
