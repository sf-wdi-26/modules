# ActiveRecord Finders

## Introduction

To put those excellent finder methods you've learned to good use, your task is to write a RESTful controller for our Pizza Shop and fill in all the methods with _actual code_. Earlier this week we had a skeleton, and now it's time to fill it out.

There are two important details to keep in mind. Tomorrow morning, we'll be demonstrating how to use HTML forms to send data from user input to our controller actions, which will be the final piece of the puzzle for creating a full blown web application. So for now:

1. You don't have to create the controller acts to display forms, like new and edit. Skip those until tomorrow, unless you want to jump ahead on your own.
2. Use hashes full of dummy data to fill in details about new pizzas, or when updating pizzas, because we'll work on making those real data tomorrow

> Hint: Don't forget what we learned about params! That'll come in handy in one or two of our controller actions.

We'll be walking around to help if you come across anything you don't understand. In the last 10 minutes, we'll walk through a complete solution example so you can gauge how you did!

## Exercise

####Requirements

- Write a RESTful controller for our pizza resource.  You should use the following ActiveRecord methods:

  - ```.find```
  - ```.all```
  - ```.new```
  - ```.update_attributes```
  - ```.destroy```

- Fill in each controller action with CRUD operations that are appropriate for that action

- Be sure to lean on ```params```

#### Starter Code

The same code as our lesson is included in the `starter-code` folder. The Sinatra setup is ready to go, you just need to fill in your controller.

#### Deliverable

There can't be a picture without giving away the entire answer!  But shoo to create a complete RESTful controller with appropriate ActiveRecord methods inside.

## Additional Resources

- [ActiveRecord Basics](http://guides.rubyonrails.org/active_record_basics.html)
