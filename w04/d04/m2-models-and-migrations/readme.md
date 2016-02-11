# ActiveRecord Models

## Challenge

Your task is to write a RESTful routes & controllers for our Pizza Shop and fill in each with _actual code_. Earlier this week we had a skeleton, and now it's time to fill it out.

There are two important details to keep in mind. Tomorrow morning, we'll be demonstrating how to use HTML forms to send data from user input to our controller actions, which will be the final piece of the puzzle for creating a full blown web application.

* You don't have to create the controller actions for `new` and `edit`. Skip those until tomorrow (unless you want to jump ahead on your own).
* Hardcode your params for now. You'll need to specifically in your `create` and `update` actions. We'll get those to be real data tomorrow.

```ruby
#create
post "/pizzas" do
    params = {name: "Red Anchove Delight", sauce: 'red', cheese:true, mushrooms:true, extra_toppings: "anchoves"}
    #...
```

* Definitely use `tux` to test out if your code works *before* placing inside your controller!!
* Feel free to test out your routes with the [`curl`](http://conqueringthecommandline.com/book/curl#cid25) command (use `localhost:9292` as the url you'll hit).
    * Tip: [how to send a POST request with curl, using parameters!](http://conqueringthecommandline.com/book/curl#uid105)

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

###Resources

- [Rails Guides: ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html)
