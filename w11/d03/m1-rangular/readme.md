# Angular + Rails

## Learning Objectives

* Explain how Angular and Rails work together
* Set up an Angular app embeded in a Rails view
* Use Angular to make requests to a Rails based RESTful API

## Why Rails and Angular?

* Rails is a powerful backend framework that requires little configuration and is quick to build due to its **convention over configuration** philosophy.
* Angular is a powerful front end framework that makes one page apps and DOM manipulation easy, keeps front end code organized, and includes powerful helper methods.
* These two frameworks work beautifully together to create powerful, modern web applications.

### Two design patterns:

* Decoupled: Rails with Angular, like MEAN, can be done in two design patterns. One can create a decoupled app, in which the front end and backend live and function independently from one another.
* Embedded: Like with the MEAN stack, the Angular app can be nested inside of the Rails app and served from a single route. This is the pattern we will be exploring today.

### One view + a JSON API

* The basic idea of this pattern is we set up one route that returns an html.erb file. Then we set up the rest of our routes to return JSON so our Angular app can CRUD them. Here's an example:

```ruby
# app/config/routes.rb
root to: 'home#angular'
resources :posts, only: [:index, :create, :show]
```

```ruby
# app/controllers/home_controller.rb
class HomeController < ApplicationController
  def angular
    render 'layouts/application'
  end
end
```
```html
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
    ...
  </head>
  <body ng-app="myApp" ng-cloak>
  ...
  </body>
</html>
```

```ruby
# app/controllers/posts_controller.rb
class PostsController < ApplicationController
  respond_to :json

  def index
  respond_with Post.all
  end

  def create
    respond_with Post.create(post_params)
  end

  def show
    respond_with Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:link, :title)
  end
end
```

All of the Javascripts that make up the Angular app will live in app/assets/javascripts. for example:

```js
// app/assets/javascripts/app.js
var app = angular.module('myApp', [])
```

### The Lab:

* Head over to [Thinkster.io](https://thinkster.io/angular-rails) and start their tutorial for Angular and Rails. It uses all of the same strategies and patterns we've gone over.

This tutorial is **optional**. Its almost the end of the course and if you have something else you'd rather invest your time on for the rest of the morning, that is up to you.
To practice how to set up and integrate Angular and Rails work through the "Wiring Everything Up" section. Keep going through to the end to learn and practice Auth using Devise with Angular and Rails.

### Solution

Checkout the `solution-code` directory.
