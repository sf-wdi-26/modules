---
title: Building your first Rails app
type: lab
duration: "1:25"
creator:
    name: Gerry Mathe
    city: London
competencies: Server Applications
---


# Building your first Rails app

## Introduction

> ***Note:*** _This can be a pair programming activity or done independently._

We've covered the basics of Ruby on Rails today, but coding is about practice.  In this lab, we expect you to create a rails app from scratch, then you will need to apply all the concepts we've covered today: adding a model, adding a controller, and mapping the right routes to access this controller's methods.  Feel free to choose an app with a model of your choice and see some examples below as inspiration.  

Also, think about css - it's always better to have a nice looking app!

## Exercise

#### Requirements

- Create a Rails app from scratch, [using PostgreSQL](https://www.digitalocean.com/community/tutorials/how-to-setup-ruby-on-rails-with-postgres) as the database
- Generate a model.  Examples could be:
  - A blog app with a Post model
  - A photo storing app with a Picture model
  - A mock-Twitter app with a Tweet model (see below)
- Generate a controller & matching routes, not using `resources`
  - The routes file need to have the seven restful routes defined

**Bonus:**
- Add some styling to your app
- Add static pages and link them in the app footer
- After you've given your app, CRUD functionality and create corresponding the corresponding views.  Views [in Rails](http://guides.rubyonrails.org/getting_started.html) are just like Sinatra!

#### Deliverable

Here's some inspiration for what your Rails app could look like:

![Rails app screenshot](https://cloud.githubusercontent.com/assets/402501/8434920/5aeca6ac-1f46-11e5-901f-94ccb3659888.png)

## Additional Resources

- Check the [Rails Guides](http://guides.rubyonrails.org/)
- More details about routing [Routing](http://guides.rubyonrails.org/routing.html)
- [Setting up](https://www.digitalocean.com/community/tutorials/how-to-setup-ruby-on-rails-with-postgres) Rails with PostgreSQL
