---
title: Controllers & RESTful Routing
type: lesson
duration: "1:25"
creator:
    name: Micah Rich
    city: LA
competencies: Server Applications
---

# Controllers & RESTful Routing

### Objectives

- Describe the purpose of a controller
- Identify all the RESTful actions and describe each one's purpose
- Write a route for each RESTful action, creating the equivalent of a Sinatra controller

### Preparation

- Create a Sinatra app with a GET request

## Intro (20 mins)

We're going to be building out a bigger web application today and see what the wide world of the web can handle. While we do this, we'll be using the concepts in this module for the rest  of the _entire_ course, so it's important to understand these concepts and how they work, today.

We won't be building our whole application, today – we're focusing on routing & controllers. A controller's job, remember, is to get the data it needs from your models, compile it together, and render a view.

Since we haven't yet jumped into making models, we're going to focus mostly on routes today. But by the end of the week, you'll have a complete Sinatra application that you build yourself, including all the code that goes inside the controller actions we build today.

#### It all starts with requests and responses: HTTP

HTTP is structured around verbs & resources, both of which we'll talk about today.  The web is "stateless", meaning it can't remember anything past the current action it's on. We get around that by storing information in a database – which we're talking about tomorrow – and by passing extra information (aka parameters/params) along with each request.

#### HTTP Verbs

Verbs describe what you can do with HTTP. It's the act of you, on the client/browser side, doing something on the web.  Well, What verbs can HTTP handle?

  - GET - for getting information
  - POST - for sending new information
  - PUT - for updating something that exists
  - PATCH - for updating just one tiny piece of something that exists
  - DELETE - for destroying something that exists

> Might be a good time to test their knowledge – call randomly on students & make them repeat the explanations/definitions to make sure those 5

#### Resources

Resources refer to the objects we're working with. When we're making an app about cars, we probably have a car resource. When we're making an app about dinosaurs, we'll probably have a dinosaur resource. We represent those resources in the URL structure – just by looking at a URL we should know what kind of object we're interacting with.  

What makes up a URL? Which is the "resource" part?

  ![resource diagram](https://cloud.githubusercontent.com/assets/25366/8561247/75b73966-24d7-11e5-896a-06506648c4fe.png)

## Combining Verbs & Resources = RESTful Controller - Codealong (15 mins)

Let's see how the two work together - you can follow along. In the `starter-code`, we've already set up a simple Sinatra app for you, so we can focus just what we cover for the codealong.

Open up `starter-code` folder in terminal & editor. Based on what we learned yesterday, what are the first two things you do after you set up a new app? `bundle install` && `git init`.  There are only a set number of RESTful verbs – remember these! They're the architecture of the modern internet, and all modern web developers need to know what these are and how to write them. We're going to combine a verb & a resource URL to create each.

But what should our hypothetical resource be? What sort of object should we make an application around? Default: books!

First, let's pseudocode with comments in our controller: we'll write our verb first in all caps and then a string that'll be what the URL might be like:

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have

  # POST "/books" - Create a new book, add it to our list

  # GET "/books/3" - Just get the information associated one specific book (that already exists, book id = 3)

  # PUT "/books/3" - Updates a specific book (book id = 3)

  # PATCH "/books/3" - Partially updates a specific book (book id = 3)

  # DELETE "/books/3" - Deletes a specific book (book id = 3)

end
```

That's some nice pseudocode, good commenting. Knowing what we already know about Sinatra's routing & controller actions, let's see if we can start filling these in!

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have
  get "/books" do
    # some code here
  end

end
```

Nice. Keep going:

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have
  get "/books" do
    # some code here
  end

  # POST "/books" - Create a new book, add it to our list
  post "/books" do
    # some code here
  end

end
```

Dig it. Next up, we get to learn something new:

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have
  get "/books" do
    # some code here
  end

  # POST "/books" - Create a new book, add it to our list
  post "/books" do
    # some code here
  end

  # GET "/books/3" - Just get one specific book (that already exists)
  get "/books/:id" do
    # some code here
  end

end
```

That's interesting! What's `:id` all about? Parameters. That's us defining that we _expect_ a parameter there, and we want to call it `id`. Of course, we could call it `:bagel` if we want, but `:id` is a convention we'll see a lot, because when we get into using databases, our database will give each object a unique ID – so when we ask for book #3, we can trust we're getting the book we want back.

Before we keep going, let's see how we'll be able to use what we've built. We won't do much with it until we have a database to look to for stored data, but for now you can store it in your brain that those _parameters_ are stored in a hash that's named _params_, which you can access inside your method!

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books/3" - Just get one specific book (that already exists)
  get "/books/:id" do
    params[:id] # => would return 3 in our example!
  end

end
```

If our route said `/books/:bagel`, guess how we'd access it? `params[:bagel]`. Booyah.

## Independent Practice (10 minutes)

Now that you're seeing the pattern, try to fill out the other actions on your own, and we'll reconvene in 10 minutes to see how you did.  Then, we'll talk about one more super important detail to controller design.

Refer to Sinatra's documentation if you're super stuck but try your best without the docs, first.

## Codealong (10 minutes)

Awesome, great work. Everyone's should look something like this:

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have
  get "/books" do
    # some code here
  end

  # POST "/books" - Create a new book, add it to our list
  post "/books" do
    # some code here
  end

  # GET "/books/3" - Just get one specific book (that already exists)
  get "/books/:id" do
    # some code here
  end

  # PUT "/books/3" - Updates a specific book
  put "/books/:id" do
    # some code here
  end

  # PATCH "/books/3" - Partially updates a specific book
  patch "/books/:id" do
    # some code here
  end

  # DELETE "/books/3" - Deletes a specific book
  delete "/books/:id" do
    # some code here
  end
end
```

### Common names for all these things

If you can imagine an application you might use to keep a library of books - like we're building - try to picture the interface.

Maybe you'd have a list of books, and you could click on each book to get details about it; maybe there's be a button to add a new book that would bring you to a form you could fillto add this book to your shelf; or maybe on each book's page, you'd see a little link to edit its details, and one button to delete it from our shelf.

There's two of those things we _don't_ have in our current design – the pages to create a new book and to edit an existing book.

If we're _asking_ the application server to give us a page with a form on it to create or edit a book, which verb do you think we're going to use? What might the routes be?

```ruby
class RestfulControllerApp < Sinatra::Base

  # GET "/books" - Gets all the books we have
  get "/books" do
    # some code here
  end

  # GET "/books/new" - Give us a form to fill out details of a new book
  get "/books/new" do
    # some code here
  end

  # POST "/books" - Create a new book, add it to our list
  post "/books" do
    # some code here
  end

  # GET "/books/3" - Just get one specific book (that already exists)
  get "/books/:id" do
    # some code here
  end

  # GET "/books/3/edit" - Give us a form to edit a book's details
  get "/books/:id/edit" do
    # some code here
  end

  # PUT "/books/3" - Updates a specific book
  put "/books/:id" do
    # some code here
  end

  # PATCH "/books/3" - Partially updates a specific book
  patch "/books/:id" do
    # some code here
  end

  # DELETE "/books/3" - Deletes a specific book
  delete "/books/:id" do
    # some code here
  end
end
```

Boom. Now we've got a RESTful controller, with actions that match everything we'd need to do to interact completely with a resource.

We call this **CRUD** – *Create*, *Read*, *Update*, and *Destroy*. Now we can do anything!


## One Last Thing! - Independent (5 minutes)

Each of these routes & controller actions we've made has a common name to refer to it, just sort of convention you'll see in the world of build web apps – especially when we get to Rails, next week.

Before we go, let's try to define them. Here's a list of the common words, you see if you can match them up to the correct controller actions!

- INDEX
- NEW
- CREATE
- SHOW
- EDIT
- UPDATE
- DESTROY


## Conclusion (5 mins)
- What HTTP verbs exist that you need to know?
- What's a resource?
- Which controller actions use which verbs?
- What are the 7 common names for actions a RESTful controller needs?
