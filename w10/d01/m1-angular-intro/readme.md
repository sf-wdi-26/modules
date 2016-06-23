#Angular

| **Learning Objectives** |
| :---- |
| User Bower in a project to require Angular |
| Grok Angular's philosophy |
| Initialize Angular in an HTML view |
| Experiment with templating & expressions |
| Organize your code with controllers |
| Pass data between the View & Controller with $scope|
| Leverage built-in filters |
| Leverage built-in directives |
| Implement 2-way data binding |


#Prereading Highlights

[Angular Guide Introduction](https://docs.angularjs.org/guide/introduction)

* A "framework for dynamic web apps"
* "Lets you use HTML as your template language"
* Will "extend HTML's syntax"
* "Handles all of the DOM and AJAX glue code you once wrote by hand and puts it in a well-defined structure"
* Is "opinionated about how a CRUD application should be built"
* Comes with "Data-binding, basic templating directives, form validation, routing, deep-linking, reusable components and dependency injection"
* "Angular simplifies application development by presenting a higher level of abstraction to the developer"
* "Not every app is a good fit for Angular. Angular was built with the CRUD application in mind."
* "Angular is built around the belief that declarative code is better than imperative when it comes to building UIs and wiring software components together, while imperative code is excellent for expressing business logic."

##Bower

[Bower](http://bower.io/) is a **package manager for *front-end* dependencies**. Install it with:

```bash
npm install -g bower
```

Just like npm, Bower is a handy way to install files locally, but also gives us a convenient way to share our project code with other developers without needing to send along tons of third-party libraries using a `bower.json` file.

##HTML Setup

Create a new directory `ngFun`, inside initialize bower with `bower init` and hit enter a bunch of times to have it generate a `bower.json` file.

Pull down angular with bower with `bower install --save angular`.

Create a new file `index.html` and link your html file to angular `<script type="text/javascript" src="bower_components/angular/angular.js"></script>`.

In your HTML try changing the `<body>` to `<body ng-app>`. This will tell your HTML page to use use angular.

Create an empty `app.js` file in your `index.html` and require it in your `<head>` after angular.

Let's name our app `ngFun`. To do this we can create an empty angular module.

app.js

```js
var app = angular.module("ngFun", []);
```

Now update your `body` element to `<body ng-app="ngFun">`.

Great, we're up and running!

##Templates & Expressions

Angular creates it's views by templating directly into HTML with expressions. This is it's declarative way of building the UI.

Try writing any regular javascript expression inside double curly brackets, such as: `{{ __someExpression__ }}` and see what your HTML evaluates to. What happens when you express:

* `4 * 4`
* `"hola!".toUpperCase()`
* `['s','w','e','e','t','n','e','s','s'].join("")`

##Controllers & Scope

Controllers contain all the business logic for our application.

We can seed our application with some data, but first we have to create a controller.

app.js

```js
app.controller("PokemonCtrl", function() {
	//logic here
});
```

Most applications will have several controllers that map to a particular resource. In this case we're using Pokemon.

To use our controller in our View we have to declare it somewhere. Create a new `div` tag that will house our Pokemon Controller.

index.html

```html
<div ng-controller="PokemonCtrl">
	<!--placeholder for now-->
</div>
```

In order to pass data or behavior to our HTML view we need to use the `$scope` object. `$scope` is Angular's interface to pass data and behavior to our views. Both the View and Controller share access to the `$scope` object.

![scope](http://devgirl.org/wp-content/uploads/2013/03/concepts-controller.png)

Let's register some Pokemon with `$scope`! In order to user the `$scope` object, we need to explicitly pass it to our controller. This is known as [**dependency injection**](https://docs.angularjs.org/guide/di).

```js
app.controller("PokemonCtrl", function($scope){
  $scope.pokemon = [
    {
      Ndex: 25,
      name: 'Pikachu',
      type: 'Electric'
    },
    {
      Ndex: 10,
      name: 'Caterpie',
      type: 'Bug'
    },
    {
      Ndex: 39,
      name: 'Jigglypuff',
      type: 'Fairy'
    },
    {
      Ndex: 94,
       name: 'Gengar',
      type: 'Ghost'
    },
    {
      Ndex: 143,
      name: 'Snorlax',
      type: 'Normal'
    }
  ];
});
```

Great, now let's see if we can see them in our view by referencing the `pokemon` variable inside an expression and wrapping it in a `pre` tag.

```html
<div ng-controller="PokemonCtrl">
	<pre>{{ pokemon }}</pre>
</div>
```

That's cool, but it doesn't look very great. What if we could format our data so that the View knows to render it as JSON?

###Challenge

* Use an Angular [filter](https://docs.angularjs.org/guide/filter) to render the data as JSON! Here is a [list](https://docs.angularjs.org/api/ng/filter) of options you can implement.

* Pass a new variable `catchphrase` from the Controller to the View. Set it's value as "gotta catch 'em all!" and use an angular filter to uppercase it in the View.


##[Directives](https://docs.angularjs.org/guide/directive)

In Angular, we **add behavior to HTML** through directives. A directive is a marker on a HTML tag that tells Angular to run or reference Angular code. You've already used several!

Angular directives start with the prefix `ng-`

A few we already know:

`ng-app` turns ordinary HTML into an Angular application.

`ng-controller` registers a controller for a section of our application.

A few worth introducing:

`ng-model` binds an HTML element's value to a model.

`ng-repeat` iterates over a collection.


###ng-Model

Our user wants to be able to input their name in a field so that the application acknowledges them as the trainer for these Pokemon.

Above our list of Pokemon, but still inside our `PokemonCtrl` `div` tag, let's create an input field for our trainers name.

```html
  <div ng-controller="PokemonCtrl">
  
    <span>Enter your name:</span>
    <input/>
    
    <pre>{{ pokemon | json }}</pre>
    
  </div>
```

If we want our input field to map its value to an attribute `name` on a `trainer` object we could add an `ng-model` directive to it.

```html
<input ng-model="trainer.name"/>
```

Additionally if we want the value of the `trainer.name` variable to be printed onto our page in an `h1` tag, we can reference it in an expression, such that our HTML looks like:

```html
  <div ng-controller="PokemonCtrl">
  
    <h1>Trainer: {{trainer.name}}</h1>
    
    <span>Enter your name:</span>
    <input ng-model="trainer.name"/>
    
    <pre>{{ pokemon | json }}</pre>
    
  </div>
```


###Challenge

* How could we create a default value for the trainer's name so that when the page loads it is set to `Ash`?

###ng-repeat

`ngRepeat` is a very useful directive for iterating through a collection to render each item.

For example if we wanted to render a list of todos we could set the directive `ng-repeat` to equal `"todo in todos"`.

Let's say we want to print out an unordered list (`ul`) of many pokemon, where each of their names is printed out inside a list item (`li`). Given we've agreed to use `poke` as the singular form of `pokemon`, we could say something along the lines of:

```html
<ul>
	<li ng-repeat="poke in pokemon">{{poke.name}}</li>
</ul>
```

###Challenge

Render all the Pokemon into a bootstrap table, where each attribute is a column. The final result should look like this:

![pokemon-table](http://i.imgur.com/or1CwF7.png)

Hint: `bower install --save bootstrap-css-only`

###etc

There are many more directives. For now, know that they exist and why they may be useful. Beyond that, reference the documentation. You can find a comprehensive list [here](https://docs.angularjs.org/api/ng/directive). By now, you should know that looking things up as needed is a better strategy than attempting to memorize everything by heart.

###Challenge

* Sort the Pokemon by nDex number.
* Create an input tag so that I can search for a particular Pokemon.

##Custom Filters

We've been notified that there is a new set of Pokemon in an alternate universe consisting of arch-nemeses. Pikachu's arch nemesis is Uhcakip, while Snorlax's is Xalrons.

First, Angular doesn't have a built-in `reverse` filter, so let's create one.

```js
app.filter('reverse', function() {
  return function(input) {
    input = input || '';
    var out = input.split("").reverse().join("");
    // uppercase only first letter
    out = out.toLowerCase();
    out = out[0].toUpperCase() + out.slice(1);
    return out;
  };
});
```

###Challenge

* Create a new column in your table called "Nemesis" and populate it with that pokemon's name reversed (some Google searching may be required).
* Hint: Don't forget to require your custom filter as a dependency in your controller.

##Pro-tip: Minification in Angular

Remember the main goal in [minification](https://en.wikipedia.org/wiki/Minification_(programming)) is to save space and deliver the file quickly. A variable `myVariableName` may be renamed to `a` during minification. A computer doesn't care what the name is as long as they are consistent.

However, if you ever minify your angular code when delivering it to a client your variables will be renamed and this may cause problems because of this variable renaming. Currently, we're used to seeing code like this.

```js
app.controller("PokemonCtrl", function() {
  
});
```

To allow minifiers to rename the function parameters and have them still map to the correct injected services, we need to explicitly `$inject` the parameters we want into our controller as strings, which importantly do not get minified (only variables do).

```js
var PokemonCtrl = function($scope, $http) {
  
};
PokemonCtrl.$inject = ['$scope', '$http'];
app.controller('PokemonCtrl', PokemonCtrl);
```

**or** we can pass our controller an array that contains an array of our dependencies as strings and a function, whose arguments have a 1-to-1 correspondence to the array's items. This is the more common method.

```js
app.controller('PokemonCtrl', ['$scope', '$http', function($scope, $http) {
  
}]);
```

Again, while our parameters will get minified, the strings will not. The names of parameters are therefore preserved in the strings so that the injector can still them up as dependencies appropriately.

![happy pokemon](http://i.giphy.com/3oEduV4SOS9mmmIOkw.gif)
