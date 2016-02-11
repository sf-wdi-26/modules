# ActiveRecord Models

## Challenge

Your task is to write a RESTful routes & controllers for our Pizza Shop and fill in each with _actual code_. Earlier this week we had a skeleton, and now it's time to fill it out.

There are two important details to keep in mind. Tomorrow morning, we'll be demonstrating how to use HTML forms to send data from user input to our controller actions, which will be the final piece of the puzzle for creating a full blown web application.

* You don't have to create the controller actions for `new` and `edit`. Skip those until tomorrow (unless you want to jump ahead on your own).
* Use hashes full of dummy data to fill in details about new pizzas, or when updating pizzas, because (we'll work on making those real data)
    * i.e.
    ``` ruby
    asdf
    asdf
    asdf
    ```
* Don't forget what we learned about params! That'll come in handy in one or two of our controller actions.
* Use `tux` to test out your code first *before* placing inside your controller

> In the last 10 minutes, we'll walk through a complete solution example so you can gauge how you did!

## Exercise

####Requirements

- Write a RESTful controller for our pizza resource with `index`, `show`, `create`, `update`, and `delete` routes. You should be using (but not limited to) the following ActiveRecord methods:

  - `.find`
  - `.all`
  - `.new`
  - `.save`
  - `.update_attributes`
  - `.destroy`

- Fill in each controller action with the CRUD operation that is appropriate for that action
- Don't forget about `params`

#### Starter Code

The same code as our lesson is included in the `starter-code` folder. The Sinatra setup is ready to go, you just need to fill in your controller.

#### Deliverable

Shoot to create a complete RESTful controller with appropriate ActiveRecord methods inside and compare your work with the solution code when complete.

## Additional Resources

- [ActiveRecord Basics](http://guides.rubyonrails.org/active_record_basics.html)
