
##### This In-Depth Guide will take you through all aspects of the UI-Router and its components and options. If you just need a quick reference guide visit the [API Reference](http://angular-ui.github.io/ui-router/site)

## State Manager

The new $stateProvider works similar to Angular's v1 router, but it focuses purely on state. 
* A state corresponds to a "place" in the application in terms of the overall UI and navigation. 
* A state describes (via the controller / template / view properties) what the UI looks like and does at that place. 
* States often have things in common, and the primary way of factoring out these commonalities in this model is via the state hierarchy, i.e. parent/child states aka nested states. 

### The simplest form of state
A state in its simplest form can be added like this (typically within module.config):  

```html
<!-- in index.html -->
<body data-ng-controller="MainCtrl">
  <section ui-view></section>
</body>
```
```javascript
// in app-states.js (or whatever you want to name it)
$stateProvider.state('contacts', {
  template: '<h1>My Contacts</h1>'
})
```

#### Where does the template get inserted?
When a state is activated, its templates are automatically inserted into the `ui-view` of its parent state's template. If it's a top-level state—which 'contacts' is because it has no parent state–then its parent template is index.html.

Right now, the 'contacts' state won't ever be activated. So let's see how we can activate a state. 

#### Activating a state
There are three main ways to activate a state:

1. Call `$state.go()`. High-level convenience method. [Learn More](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#stategoto--toparams--options)
2. Click a link containing the `ui-sref` directive. [Learn More](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-sref)
3. Navigate to the `url` associated with the state. [[Learn More|URL Routing]].

***

### Templates

There are several methods for configuring a state's template.

As seen above, the simplest way to set your template is via the `template` config property.  

```javascript
$stateProvider.state('contacts', {
  template: '<h1>My Contacts</h1>'
})
```

Instead of writing the template inline you can load a partial. (This is probably how you'll set templates most of the time.)  

```javascript
$stateProvider.state('contacts', {
  templateUrl: 'contacts.html'
})
```
`templateUrl` can also be a function that returns a url. It takes one preset parameter, stateParams, which is not injected.   

```javascript
$stateProvider.state('contacts', {
  templateUrl: function ($stateParams){
    return '/partials/contacts.' + $stateParams.filterBy + '.html';
  }
})
```
Or you can use a template provider function which can be injected, has access to locals, and must return template HTML, like this:  

```javascript
$stateProvider.state('contacts', {
  templateProvider: function ($timeout, $stateParams) {
    return $timeout(function () {
      return '<h1>' + $stateParams.contactId + '</h1>'
    }, 100);
  }
})
```
If you'd like your `<ui-view>` to have some default content before it's populated by a state activation, you can do that as well. The contents will be replaced as soon as a state is activated and populates the ui-view with a template.  
```html
<body>
    <ui-view>
        <i>Some content will load here!</i>
    </ui-view>
</body>
```

### Controllers
You can assign a controller to your template. **Warning:** The controller will **not** be instantiated if template is not defined. 

You set your `controller` like this:  

```javascript
$stateProvider.state('contacts', {
  template: '<h1>{{title}}</h1>',
  controller: function($scope){
    this.title = 'My Contacts';
  }
})
```

Or if you already have a `controller` defined on the module, like this:  

```javascript
$stateProvider.state('contacts', {
  template: ...,
  controller: 'ContactsCtrl'
})
```

Alternatively using the "controller as" syntax the above becomes:  

```javascript
$stateProvider.state('contacts', {
  template: '<h1>{{contact.title}}</h1>',
  controller: function(){
    this.title = 'My Contacts';
  },
  controllerAs: 'contact'
})
```
and

```javascript
$stateProvider.state('contacts', {
  template: ...,
  controller: 'ContactsCtrl as contact'
})
```

Or for more advanced needs you can use the `controllerProvider` to dynamically return a controller function or string for you:  

```javascript
$stateProvider.state('contacts', {
  template: ...,
  controllerProvider: function($stateParams) {
      var ctrlName = $stateParams.type + "Controller";
      return ctrlName;
  }
})
```

Controllers can use the this`.$on() method to listen for events fired by state transitions.

Controllers are instantiated on an as-needed basis, when their corresponding scopes are created, i.e. when the user manually navigates to a state via a URL, $stateProvider will load the correct template into the view, then bind the controller to the template's scope.
