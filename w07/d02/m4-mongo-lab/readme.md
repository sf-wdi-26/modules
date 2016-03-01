# Bite Me
This app has RESTful routes for the following actions: Index, Create, Destroy.

Can you modify this app to incorporate MongoDB instead of the hardcoded data?

## Setup

Install application packages/dependencies:
```
bower install
npm install
```

Run the server:
```
nodemon index.js
```


## Instructions

Our foods data is currently hardcoded in our main `index.js` and lives in active memory. When the server restarts, we lose our data. Your goal is integrate MongoDB into your routes so that you can permenantely save/persist data across sessions.

By the end of this process we should have the following application directory (note the `models` folder):
```
    models/
        index.js
        food.js
    public/
        css/
            main.css
        js/
            app.js
    views/
        index.html
    .gitignore
    bower.json
    index.js
    package.json
    README.md    
```

#### Step 1. Create the Food Model / Schema

Install mongoose:

``` bash
npm install --save mongoose
```

Next we want to create our models directory (this is where our database magic will happen):
``` bash
mkdir models
touch models/food.js
```


Let's create `Food` model. A `Food` has a few different characteristics: `name`, and `yumminess`.

To create a `Food` model we have to use a Schema:

```javascript
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var FoodSchema = new Schema({
    name: String,
    yuminess: String
});
```

[Here is a link to all of the different datatypes we can use in a Schema](http://mongoosejs.com/docs/schematypes.html)

Finally, at the bottom of `food.js` we need to create the `Food` model and export it (that way we can use it in other parts of our app):

```javascript
var Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
```

#### Step 2. Connect to the Database
Next, let's wire it all up:

First, open a new terminal tab and type `mongod` to start a local instance of MongoDB on your computer. This is only necessary the first time you use MongoDB or when you restart your computer. You MUST do this step or your database will not work!

``` bash
touch models/index.js
```

Inside of `models/index.js` we need to create and connect to our mongoose database (this is where the magic happens):

``` javascript
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bite_me_app");

module.exports.Food = require("./food");
```

#### Step 3. Sanity Check - Plug the database into node

Now that we've done all the hard work, all that's left is to "require" our models.

If you open the node REPL by typing `node` in the terminal, you can do the following:

``` bash
var db = require('./models');

db.Food.create({name: "foo", tastiness: "very"}, function (err, food) {
    if (err) { return console.log(err); };
    console.log(food);
});
```

Now you should be able to type the following, and see our new food item:

``` javascript
    db.Food.find({}, function(err, foods){
        if (err) { return console.log("BAD THING!"); }
        console.log(foods)
    })
```

**Now let's do it in the express app!**

#### Step 3. Plug the database into express


Add this line near the top of `index.js`:

```
var db = require('./models');
```

## Exercise

The time has come for us to swap out all our hardcoded data for live data from our database. This will require us to methodically alter each route to accomodate the new data store. Where should we start!?

Hint: Here's what our index route might look like:

``` javascript
app.get("/allthefoods", function(req, res){

    db.Food.find({}, function(err, foods){
        if (err) {
            console.log("BAD THING!");
            return res.sendStatus(400);
        }
        res.send(foods);
    })

})
```

## Stretch Exercise

Think about how we might incorporate restaurant and ingredient models in our app. How would we design a restaurant that had many foods, or foods that had many ingredients? Would we reference or embed that data? Remeber:
 
**Embedded Data** is directly nested inside of other data. Each record has a copy of the data. Example:

``` javascript
var TweetSchema = new Schema({
  body: {
    type: String,
    default: ""
  }
});

var UserSchema = new Schema({
  username: {
    type: String,
    default: ""
  },
  tweets: [TweetSchema]   // EMBEDDING :D
});
```

**Referenced Data** is stored as an id inside other data. The id can be used to look up the information. All records that reference the same data look up the same copy. Example:

``` javasript
var BookSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  author: [{
    // REFERENCING :D
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

var AuthorSchema = new Schema({
  name: {
    type: String,
    default: ""
  }
});

```

####Challenge 1

Implement a Restaurant model that EMBEDS our Foods model.

####Challenge 2
Implement an Ingredient model, and REFERENCE it in our Foods model.

Check the solution branch once you've **really** thought about it!

