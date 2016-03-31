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

This tutorial is **optional**. Its almost the end of the course and if you have something else you'd rather invest your time on for the rest of the morning, that is up to you. This tutorial also is pretty time consuming and a bit challenging. It takes some thinking, not just copy and pasting. Which is great!

To practice how to set up and integrate Angular and Rails work through the "Wiring Everything Up" section. Keep going through to the end to learn and practice Auth using Devise with Angular and Rails. The solution code only takes you through Wiring Everything Up for now. 

If you want to do a simpler version of this tutorial, just skip the comments and upvotes parts and simply add, and delete posts.

#### Gotcha's in this tutorial:
1. CDN links do not have 'https:' prefix, and will need it to work.

2. It can be a little unclear what they are doing as far as adding things to the angular.module. This tutorial doesn't use the `var app =` pattern, it chains things together. If you get a 'MainCtrl is not a function' error, this might be what is going on. Ask fellow students or an instructor or check the solution-code if you are having a lot of trouble.

3. This tutorial temporarily uses inline templating. This is a bad practice AND a bit confusing. However this is **only temporary**. You will factor these out once you get to the rails part. It will make sense when you get there.

4. Use `python -m SimpleHTTPServer 8000
`

5. You aren't crazy. The post show page instructions are confusing. Ask for help or check the solution if you need to.

6. Restart your server after bower installs and asset changes.

8. Resolve in Angular is new to you and can be confusing. [Here](http://www.undefinednull.com/2014/02/17/resolve-in-angularjs-routes-explained-as-story/)'s a nice resource explaining it.
7. In Wiring Everything Up, make sure you return 'o' at the **end** of the flapperNews factory or you will run into all kinds of problems by returning the object too soon.

### Solution

Checkout the `solution-code` directory.
