#Relationships in Mongo


##Learning Objectives

| Objectives |
| :---- |
| Gain a deeper understanding of Mongo/Mongoose's ability to handle relationships |
| Compare and contrast embedded & referenced data |
| Design routes for nested resources |
| Build the appropriate queries for nested relationships |

##Relationships in Mongo

There are two ways to form relationships in a document-based database...

####Embedded Data

* **Embedded Data** is a document directly nested *inside* of other data

####Referenced Data

* **Referenced Data** contains an *id* of a document that can be found somewhere else

There is a tradeoff between *efficiency* and *consistency* depending on which one you choose. Neither is better or worse, they are just different.

###Scenario: 

For each situation would you use embedded or referenced data? Discuss with a partner and be prepared to explain why.

* A `User` that has many `Tweets`?
* A `Food` that has many `Ingredients`?


###Implementation

Tip: Noteworthy code lines are denoted with the comment: `NOTE`.

**Referencing Data**

```javascript
var foodSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  ingredients: [{
    type: Schema.Types.ObjectId,  // NOTE
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
  tweets: [tweetSchema]	  // NOTE
});
```

##Route Design

In order to *read* & *create* nested data we need to design appropriate routes.

The most popular, modern convention is RESTful routing. Here is an example of an application that has routes for `Store` and an `Item` models:

####RESTful Routing
|| | |
|---|---|---|
| **HTTP Verb** | **Path** | **Description** | **Controller#action**
| GET | /store | Get all stores | stores#index |
| POST | /store | Create a store | stores#create |
| GET | /store/:id | Get a store | stores#show |
| PUT/PATCH | /store/:id | Update a store | stores#update |
| DELETE | /store/:id | Delete a store | stores#destroy |
| GET | /store/:storeId/items | Get all items from a store | items#index |
| POST | /store/:storeId/items | Create an item for a store | items#create |
| GET | /store/:storeId/items/:itemId | Get an item from a store | items#show |
| PUT/PATCH | /store/:storeId/items/:itemId | Update an item from a store | items#update |
| DELETE | /store/:storeId/items/:itemId | Delete an item from a store | items#destroy |

*In routes resources should not be nested more than one level deep*
>Note: These routes omit the commonly used `#new` and `#edit` actions, which is common if the server is rendering HTML instead of JSON.

##Queries Exercise

####Goal

Create and navigate through relational data in MongoDB

####Setup
* startup mongoDB with `mongod`
* `cd` into the folder `exercise` in this directory
* `node console.js` to enter into a REPL where you can interact with your DB

####Tips
* save your successful code into your text-editor for each successful step

>Note: All your models will be nested inside an object `db`.

####Steps

	1) Create a user
	
	2) Create tweets embedded in that user
	
	3) List all the users
	
	4) List all tweets of a specific user
	
	5) Create several ingredients
	
	6) Create a food that references those ingredients
	
	7) List all the Foods
	
	8) List all the ingredients in a Food


