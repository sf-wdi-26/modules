# Sinatra Setup / Layouts & Templating

### Objectives

- Compare layouts to views
- Explain the benefit of creating multiple HTML pages with only one view using a template
- Use ERB syntax render data in a view
- Describe how gems relate to the Gemfile
- Use Gemfile to install Sinatra
- Create a Rail-like folder structure in a Sinatra app
- Explain briefly concepts of MVC

## Intro (20 mins)

Today we're doing something really exciting – we're getting past programming basics and starting to dive into making web apps!

- What would be the difficulty of just using HTML to build web applications? This is why we need templating and data.
- We'll be dealing with storing data over the next few days.

#### What is MVC? Why do we care?
  - **models** represent our data, our objects and contain our important "business logic"
  - **views** are what's rendered on the page after our data is pumped in our application
  - **controllers** grab the data & combine it with views
  - **routes**, in web applications, just map a URL to a controller action

#### What is Sinatra? Rails? And why are we using Sinatra to build up to Rails?
- Today, we're going to do an overview of setting up a Sinatra app, which means we'll lightly touch on each part of the MVC framework. Don't worry – we'll be going into depth on each section much more in the next few days

#### Why are you going to like Sinatra?
  - Super fast & easy to build stuff
  - Very flexible – once you get it, you can build however they like

## Set up a Sinatra project from nothing
First, `mkdir` & `cd` into `first_sinatra_app` folder. Then, run `gem install bundler`.

#### Now, Rubygems:
These are little libraries people build & open source. Anyone can make and publish one, and in the real world, it speeds up development. We're gonna use a lot of libraries, but we're also going to make you build the important stuff yourself; this way,you learn the concepts you need to know

Bundler is a tool that lets us define what gems we need and install them for each project

Run `bundle init` - this will create a Gemfile for us. What's inside?

  - Source is always rubygems. open it up & do a search for sinatra, find version
  - Change `'Rails'` to `'sinatra'`
  - Explain `~>`

Run `bundle install` – now, it installs all the _other_ gems Sinatra depends on

Let's `touch config.ru` and copy & paste Bundler setup:

```ruby
require 'rubygems'
require 'bundler'
Bundler.require
```

Now, `touch app.rb` and `git init` so we can keep track of our progress.

...And now, we're ready to start writing some code.

## Setting up our first mini app - Codealong (15 mins)
`app.rb` is where most of our code can go for now. Later we'll have too much and will want to break it up into smaller pieces. To start, let's keep it simple.

We'll need to make 4 things, that's it. Write these down on the board or on your desk, so you can remember them and cross them out as we go. We'll basically need one of these every time we make a new piece of our application, it can be our checklist for what to do.

We need to create:

  1. A Model, our data
  2. A View, for rendering HTML pages
  3. A Controller, for connecting views & models
  4. A Route, to tell our app which URL to listen for


#### Let's get started!

Make a new class and inherit from our sweet Sinatra library:

```ruby
class FirstSinatraApp < Sinatra::Base
end
```

Since we're writing a Ruby file, we need to make sure it's required in our configurations:

- In `config.ru`:

```ruby
require 'rubygems'
require 'bundler'
Bundler.require

require './app'
run FirstSinatraApp
```

#### Our First Route, Our First Controller Action

We'll make a GET request, and in the next modeul, we'll talk about the different types of requests you can make to your server. For now, you can imagine that a GET request is for when you need to GET some information and spit something out to the client.

Our first route, and coincidentally, our first controller action:

```ruby
get "/" do # this is the route, a ROOT route. our homepage!
  "WDI is awesome." # this is the view we're going to render, straight text
end
```

Let's get crazy & start it up: `rackup` in terminal.

See the URL & port number? copy that, open it in your browser! http://localhost:9292/

Cancel the server (ctrl + c in terminal), change the words, & restart.

## Creating A View - Codealong (15 mins)

That's awesome - great start, but we can't just be rendering _text_. We need some HTML.

#### Templating
This is the foundation of making advanced applications – we can use code to create different HTML files for us, so we don't have to write them all by hand. The end product the same - multiple HTML files - but the code makes it so HTML can be created _on the fly_.

Let's do it:

- `mkdir views`
- `touch views/layout.erb`
- ERB stands for embedded ruby. Ruby embedded in HTML!

#### Layout First
If views were a sandwich, the layout would be the bread, and the views would be the meat. The layout is like a shell our views get piped through to spit out a final HTML document:

   ![erb-rendering](https://cloud.githubusercontent.com/assets/25366/8539041/07a72c44-242b-11e5-95bc-1d1275a1307c.png)

Now, in `layouts.erb`, write an empty HTML document:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Our First Sinatra App</title>
  </head>
  <body>
    <h1>Our First Sinatra App</h1>
  </body>
</html>
```

Now, let's add a `yield`:

```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Our First Sinatra App</title>
  </head>
  <body>
    <h1>Our First Sinatra App</h1>
    <%= yield %>
  </body>
</html>
```

#### <%= %> vs. <% %>
- `<%= %>` Spits something out - as in whatever code the return value of the code you execute, get's printed to the page.  It's an ERB tag to show 'something' to the user.
- `<% %>` Does NOT spit something out - it's an ERB tag to run Ruby that doesn't need direct output, like `.each`

#### Back to our app

Change our controller action to:

```ruby
get "/" do
  erb "WDI is awesome." # this puts the string into our 'yield'
end
```

`rackup`, see if it worked!

## Finally, Views - Codealong (15 minutes)

You'll need add a new route & controller action to list Blue Eye's best songs, and then spit them out in an HTML page, so open up your controller, add a new action, but make the route "/songs" instead of your root route and add an array:

```ruby
get "/songs" do
  @songs = ["Fly Me To The Moon", "New York, New York", "Luck Be A Lady"]
end
```

Now, let's tell it to use ERB to render our page! Like this:

```ruby
get "/songs" do
  @songs = ["Fly Me To The Moon", "New York, New York", "Luck Be A Lady"]
  erb :'songs' # this is the path to our view file!
end
```

Make a new view! `touch` & open `views/songs.erb`.  We're making a list, so let's use `ul`. Normally we'd make an `li` for each song, but let's pretend we have hundreds of songs – how do use ERB to do that for us? How would we do it in regular Ruby? `.each`!

```erb
<ul>
  <% @songs.each do |song| %>
    <li>
      <%= song %>
    </li>
  <% end %>
</ul>
```

`rackup` and see what we've created!

## Conclusion (5 mins)
Wow, you've set up a Sinatra app from scratch - writing routes and controller actions that renders a view.  Let's review these questions to wrap up:

- What do M, V, & C all stand for? What are each of their roles?
- What's a rubygem, and what does Bundler do?
