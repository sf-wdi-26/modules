---
title: Controllers and Routes in Rails
type: lesson
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---

# Controllers and Routes in Rails

### Objectives
*After this lesson, students will be able to:*

- Explain custom routes vs. resources
- Explain the actions in a RESTful controller
- Create a Rails controller with matching RESTful routes

### Preparation
*Before this lesson, students should already be able to:*

- Explain the difference between HTTP request/response and how the two relate
- Describe the difference between Sinatra and Rails
- Create a new rails project



## Intro - Routing in Rails (20 mins)

In this lesson, we are going to talk about "routing" with a focus around the MVC pattern.

As a reminder, MVC is a pattern defining a web app in three parts:
* The (M)odels, holding all the business logic
* The (V)iews, rendering the database content as a readable format
* The (C)ontrollers, linking views and models



```

                                          -----> Model <----> DB
                                         |         |
            response        request      |         |
   Browser <-------- router -------> controller <--
                             GET         ^
                             PUT         |
                             POST         -----> view <----> html/images/css/js
                             DELETE

```

When a user makes a request to the browser, the web-application needs to know what content to show them.

Let's compare with code that we have previously written.


In Sinatra we defined the routes within our controller action:

```ruby
  get '/recipes' do
    @recipes = Recipe.all
    erb :'recipes/index'
  end

  get '/recipes/new' do
    @recipe = Recipe.new
    @categories = Category.all
    erb :'recipes/new'
  end
```

A "route" is a combination of the path that was requested and the HTTP verb that was used to request that path.


Rails has a "routing engine" that separates this from the controller. The configuration for the routing engine is held in the file `config/routes.rb`.


```ruby

Rails.application.routes.draw do
#code goes here
end

```

All the ruby code inside the block above will be related to defining routes.

## Demo - Creating routes in a Rails app (15 mins)

First, Let's create a new rails app:

```bash
rails new routes_and_controllers
cd routes_and_controllers
```

Let's create a controller.

```
  touch app/controllers/home_controller.rb
```


Add the method about_us in the controller home:

```ruby
  class HomeController < ApplicationController

    ## This is a controller action called about_us
    def about_us
      render text: "hello from Rails! This is all about us..."
    end

  end
```

At the moment, this action can not be accessed via an http route, we need to add a route handler.


In `config/routes.rb` delete all the comments and replace with:

```ruby
  get '/about_us', to: 'home#about_us'
```

- `get` is the http verb to use for this request
- `/about_us` is the `uri` to call to access this resource
- ` to: 'home#about_us'` is a key defining which method and controller will be used


Let's have a look at when we spin up a local server:

```
$ rails s
```

Visit `http://localhost:3000/about_us` in the browser. You should see the text "hello from Rails! This is all about us..." rendered in the browser; thus, we know that the route `/about_us` rendered the method `about_us` in the controller.  These two elements, the route definition in ```routes.rb``` and the method in the controller, are linked.


## The Resources Shortcut - Codealong (20 mins)

Let's create another rails app:

```bash
   rails new blog_routes_app
   cd blog_routes_app
```

To explain the concept of resourceful/restful routes, we will scaffold the Post resource:

```
rails g scaffold post title content
```

This command will create all the MVC structure for the resource blog and then add the line below to the `routes.rb` file:

```
resources :posts
```

This line hides some powerful rails magic - it's actually mapping the seven restful methods from the controller `posts` to the related http routes with the correct HTTP verbs and uris:



| REST Route type | HTTP Verb | URI | ruby method name|
|-----------------|-----------|-----|-----------------|
|index|    GET    |     /posts(.:format)          |   posts#index|
|create|    POST   |     /posts(.:format)          |   posts#create|
|new|    GET    |     /posts/new(.:format)      |   posts#new |
|edit|    GET    |     /posts/:id/edit(.:format) |   posts#edit|
|show|    GET    |     /posts/:id(.:format)      |   posts#show|
|update|    PUT    |     /posts/:id(.:format)      |   posts#update|
|destroy|    DELETE |     /posts/:id(.:format)      |   posts#destroy|

YES! These seven routes have been created just by adding `resources :posts` in the file `routes.rb`

If we had to create these routes individually in ```routes.rb```, it would looks like this:

```ruby
get    "/posts"          , to: "posts#index"
post   "/posts"          , to: "posts#create"
get    "/posts/new"      , to: "posts#new"
get    "/posts/:id/edit" , to: "posts#edit"
get    "/posts/:id"      , to: "posts#show"
put    "/posts/:id"      , to: "posts#update"
delete "/posts/:id"      , to: "posts#destroy"
```

## Independent Practice (15 mins)


Re-use the application "blog" we've just created and add three routes to it manually:

* faqs
* terms_and_conditions
* team

These three routes will be accessed via a GET request. When the user is accessing a route, the browser should display the name of the route, therefore, you'll need to create the related method in a controller (Hint: call your controller "StaticPages" and [read up](http://stackoverflow.com/questions/4479233/static-pages-in-ruby-on-rails) on static pages in Rails).

Then, create a "categories" controller using scaffold, remove the line added in routes.rb by the generator (`resources : categories`) and re-create the seven restful routes matching the 7 methods in the categories controller manually.


##Conclusion (10 mins)

#### Questions

* What are the four HTTP verbs that we've used ?
* What are the seven methods for a Restful resource ?
* Is routing part of MVC ?
* Where is the routing logic in Sinatra ?

During this introduction to routing in Rails, we have just reviewed the basics of handling HTTP requests in a web app. This is a concept that we will practice everyday from now so don't be worried - you'll have a lot of occasions to practice.
