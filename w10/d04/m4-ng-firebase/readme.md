#🔥AngularFire🔥

##Learning Objectives

By the end of this lesson you will be able to:

* Write Javascript that communicates with a Firebase back-end
* Explain the difference between HTTP and Websocket protocols
* Integrate AngularFire into an Angular app
* Deploy your app to Firebase Hosting
* Implement 3-way data binding


##Firebase Intro

[Firebase](https://www.firebase.com/) is a Platform as a Service (PaaS) that provides a graphical interface to set up a back end, both the database and api.

We will be using the [AngularFire](https://www.firebase.com/docs/web/libraries/angular/guide/intro-to-angularfire.html) library to access Firebase from Angular. Google owns Firebase and developed Angular, so they work nicely together.

Let's take a look at this demo [Tetris Game](https://www.firebase.com/tutorial/#session/gf3bu09wvlf) to see how it can allow us to build real-time applications.

###Websockets

To achieve this kind of performance, we are using a different connection mechanism: Websockets. Instead of HTTP (HyperText Transfer Protocol), which supports the familiar request/response cycle, Websockets maintain a connection between your browser and the server, allowing data to be passed bidirectionally. These connections are persistent (always on), full-duplex (bi-directional) and real time.

Picture HTTP as the our *postal system*, you, abroad, send out some letters to a friend back home. The system delivers these letters through various paths and arrive safely. Your friend reads them and sends a letter back, knowing your location. In http, the server can not send you a message unless you first send a request: the request/response cycle.

Websockets are more like a *phone call*. You have the ability to hold a conversation, talking at the same time. Once you have initiated a connection with the server, both an you can send messages, as needed.

<figure>
    <img src="https://camo.githubusercontent.com/c0e4e20b1756769aa20540351c69b1757d1c9cb1/687474703a2f2f7777772e7075626e75622e636f6d2f626c6f672f77702d636f6e74656e742f75706c6f6164732f323031342f30392f576562536f636b6574732d4469616772616d2e706e67">
    <figcaption>A client can send an HTTP request to the server which can reply with status 426, "Upgrade Required". At that point the client can then send a new request with the appropriate upgrade headers while keeping the connection open.</figcaption>
</figure>

###Setup

```bash
bower install angular angularfire --save
```

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/firebase/firebase.js"></script>
<script src="bower_components/angularfire/dist/angularfire.min.js"></script>
```

###Adding Data

```js
// in JS console
var ref = new Firebase('https://sf-wdi-26.firebaseio-demo.com/');
firebaseRef.set({"WDI26": "Is learning Firebase"});
```

```js
ref.push({name: "<Your name>", message: "<Your message>"})
```

>What's the difference between `.set` and `.push`?

###Fetching Data

Using Firebase's native ability to handle web sockets, you trigger an event every time a child is added

```js
ref.on('child_added', function(snapshot) {
  console.log("new child:", snapshot.val());
});
```

>`.push` something to your backed and watch the callback get triggered.

More on data event listeners to [retrieve data](https://www.firebase.com/docs/web/guide/retrieving-data.html).

###Structuring Data

```js
var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
```

Now we can go to `https://sf-wdi-26.firebaseio-demo.com/users` and see the users we just created.

We can overwrite each of our following users, which is similar to a `PUT`.

```js
usersRef.child("alanisawesome").set({
  date_of_birth: "6/23/12",
  full_name: "Alan Turing"
});
usersRef.child("gracehop").set({
  date_of_birth: "12/9/06",
  full_name: "Grace Hopper"
});
```
We can also just update an attribute, which is similar to a `PATCH`.

```js
var hopperRef = usersRef.child("gracehop");
hopperRef.update({
  "nickname": "Amazing Grace"
});
```

##Rapid Prototyping

Let's take an app, ToEatly, that is a list of items we wish to eat in the future and build it out using Angular and Firebase.

###Integrating Angular

Click the "Dashboard" link on firebase to navigate to `firebase.com/account` (signup for an account if you don't have one). Here you will see a list of your existing Firebase backend applications and be enabled to create a new one. Create a new one and note its name.

`cd` into `starter-code` and let's start building out this application.

<details>
<summary>First we'll need to inject `firebase` as a dependency into our Angular application.</summary>

```js
var app = angular.module("ToEatly", ["firebase"]);
```
</details>

<details>
<summary>Now we can inject `$firebaseObject`, `$firebaseArray`, and `$firebaseAuth` into any of our controllers to help us manage objects, collections, and authentication respectively. Since we're working with a collection of foods let's use a [`$firebaseArray`](https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html) to store them.
</summary>

```js
app.controller("FoodCtrl", function($scope, $firebaseArray) {
  // change to your application URL
  var ref = new Firebase("https://sf-wdi-26.firebaseio.com/foods");
  // create a synchronized array to store a collection
  $scope.foods = $firebaseArray(ref);
});
```
</details>

<details>
<summary>In our html let's setup our view to use our angular app and controller. Then we can make a form that triggers an `addFood` function.</summary>

```html
<form ng-submit="addFood()">
    <input placeholder="name" ng-model="food.name">
    <input yuminess="yuminess" ng-model="food.yuminess">
    <button type="submit">Eat me!</button>
</form>
```
</details>

<details>
<summary>Next let's create the `addFood` function to actually send the food to our Firebase backend. Hint: your `$firebaseArray` has a `.$add` method on it.</summary>

```js
  $scope.addFood = function() {
    $scope.foods.$add({
      name: $scope.food.name,
      yumminess: $scope.food.yumminess
    });
  };
```
</details>

<details>
<summary>If we want to view our changes on the page we should use an `ng-repeat`.</summary>

```html
<div class="food" ng-repeat="food in foods">
    <b>Name:</b> {{food.name}} | <b>Yumminess:</b> {{food.yumminess}}
</div>
```
</details>

<details>
<summary>How can we modify the `addFood` function so that the form is cleared after it is submited?</summary>

```js
  $scope.addFood = function() {
    $scope.foods.$add({
      name: $scope.food.name,
      yumminess: $scope.food.yumminess
    });
    // clears form
    $scope.food = {};
  };
```
</details>

###User Stories

Figure out the following user stories on your own. Example solutions are in `solution-code`. User can

* Delete a food
* Edit a food

###Bonus

* Deploy your app to [Firebase Hosting](https://www.firebase.com/docs/hosting/guide/deploying.html)
