#Angular $http & $resource

| Learning Objectives |
| :--- |
| Review $http
| Refactor $http using $resource in a service factory |

##$http Review

[$http](https://docs.angularjs.org/api/ng/service/$http) is a core Angular service that facilitates communication with remote HTTP servers via the browser's XMLHttpRequest object or via JSONP. It is very similar to jQuery's $.ajax function.

###For example

```js
// app.js
var app = angular.module('exampleApp', []);
app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  // run on page load
  $http.get('/wines').then(function(response) {
    //pass response to view
    $scope.wines = response.data;
  });
  // allow the view to execute the function later
  $scope.createWine = function() {
    $http.post('/wines', newObject).then(function(response) {
        // do something on success
    });
  };
}]);
```

Read more about the available shortcut methods in the [$http docs](https://docs.angularjs.org/api/ng/service/$http/#shortcut-methods).

##$resource

$resource in Angular is a helper method that gives us all of the $http CRUD verbs in one method. Kind of like how
```ruby
resources :criminals
```
will give you all of the CRUD routes in Ruby on Rails

Of course these aren't routes, they are AJAX requests. Here's an example:

```js
app.factory("Wine", function($resource) {
  return $resource("http://daretodiscover.herokuapp.com/wines/:id")
});

app.controller('WineController',function($scope, Wine) {
  var wine = Wine.get({ id: $scope.id }, function() {
    console.log(wine);
  }); // get() returns a single wine
};
```

### What is a factory?
1. A factory is like a Service in Angular, but it is NOT a constructor function.
2. A factory returns an object.

From the Angular Docs:
```
It is important to realize that invoking a $resource object method immediately returns an empty reference (object or array depending on isArray). Once the data is returned from the server the existing reference is populated with the actual data. This is a useful trick since usually the resource is assigned to a model which is then rendered by the view. Having an empty object results in no rendering, once the data arrives from the server then the object is populated with the data and the view automatically re-renders itself showing the new data. This means that in most cases one never has to write a callback function for the action methods.
```

##Challenges
Refactor your Infamous Criminals app from yesterday to use $resource!

##Links
[Angular $resource docs](https://docs.angularjs.org/api/ngResource/service/$resource)
[CRUD using $resource](http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/)
