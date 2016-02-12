# Building & Submitting Forms

### Objectives

- Write an HTML form that relates to a model's attributes
- Describe how inputs transform into a params hash on the server side
- Use params to create a new instance of a model

### Preparation

*Before this lesson, students should already be able to:*

- Identify HTTP verbs
- Create a model
- Build a RESTful controller

## Intro (5 mins)

This is it – this is the fun part, when we get to tie all our MVC pieces together.

We've learned about creating models and how to interact with a database. We've learned about how to construct our controllers using REST & Sinatra. We've even learned how to render basic information in a view.

But now we're going to see the glue that ties this all together – forms.

For brevity, we're going to start with some starter code. While it would absolutely be good for you to build this all from scratch, it's important to make sure we focus right now on the one _new_ piece of passing information from views, to controllers, on to models, and back.

So in your starter-code folder, you should see a skeleton application with a bunch of work done already to get us going.

## Get To Know The code - Independnt Practice (5 minutes)

Take 5 minutes to familiarize yourself with what's in there – hunt around the code, `bundle install`, `rake db:create`, run the migrations, and fire up your `tux` console and make sure it works.


## New / CREATE - Codealong (20 mins)

Forms were made to take user input and save it to a database, so let's start with a form to make a new song, as we need songs in our database.

We'll start with our `/songs/new` view – find it in our views folder. We'll start by making a generic form.

```erb
<form class="song" id="add-song">
</form>
```

> If you add that class/ID the styles we pre-wrote will be applied automatically.

Now, forms need to know where to _send_ information and the HTTP verb they'll be using to submit a request. Which verb do we use to create a new resource? `POST`. What's the route we need to `POST` to? "/songs". This is all from our lesson on RESTful routing from earlier this week and is reinforced in our controller.

```erb
<form class="song" id="add-song" method="POST" action="/songs">
</form>
```

Now we've got a form that's going to `POST` to `/songs` – it'll hit our controller, find an action with that combination of URL & verb, and run that code.

But there's no information inside.

#### How to send information in a form!

Luckily, it's not that different from something we've seen before in Ruby – a hash.

In a hash there are keys & values. Each input in a form is a key/value pair. Let's see a complete example & dissect it.

```erb
<form class="song" id="add-song" method="POST" action="/songs">
  <label for="song_title">Title:</label>
  <input type='text' name='song[title]' id="song_title"/>

  <label for="song_published_in">Year Published:</label>
  <input type='text' name='song[published_in]' id="song_published_in"/>
</form>
```

The `name` is our key, and what someone types in the text field is our value. This would get translated on our controller side like:

```ruby
params = {
  song: {
    title: 'whatever the user wrote in the input box',
    published_in: 1943
  }
}
```

So if you did send that over, how would you access the song's title? ``params[:song][:title]``. What if you wanted to access the entire song hash? ``params[:song]``.

Lastly, let's add in a submit button. But you know the designer's rule – never submit, always something specific. Plus, let's encapsulate our label/input combos with some `divs` to get some grouping going on.

```erb
<form action="/songs" method="post" class='song' id="add-song">
  <div>
    <label for="song[title]">Title:</label>
    <input name="song[title]">
  </div>
  <div>
    <label for="song[published_in]">Year Published:</label>
    <input type="data" name="song[published_in]">
  </div>
  <div>
    <input type="submit" value="Add Song" class='btn'>
  </div>
</form>
```

Boom! Form, done.

#### The Controller Side

Even though your controller is already written for you in the `starter-code`, we should walk through it to reiterate how it works.

```ruby
# app.rb

# new
get '/songs/new' do
  @song = Song.new
  erb(:"songs/new")
end

# create
post '/songs' do
  @song = Song.new(params[:song])
  if @song.save
    redirect("/songs/#{@song.id}")
  else
    erb(:"songs/new")
  end
end
```

Remember, the *new* action is just there to render the form. `@song` is a placeholder for a new, empty Song object. The _form_ is the part saying "when you hit enter/hit my button, I'm going to POST to /songs!"

So the *create* action is the one doing the actual work to save it to the database. We're grabbing the information from the form with `params[:song]` (just like in our example a second ago), to instantiate a new instance of a Song object with all it's details. Remember, ```params``` acts just like a hash, so it's the same as doing:

```ruby
@song = Song.new({title: "whatever the user put in the input box"})
```

_Then_, we're just saying _if_ it saves (which it should here), redirect to this other page. If it _doesn't_ save, it'll just render our new view again.

> Why render and not redirect? We'll see in the next section.

Try it out, let's see if it works!

<img width="700" alt="new form" src="https://cloud.githubusercontent.com/assets/25366/8716380/5461375c-2b45-11e5-8890-a7b3862590ec.png">

<img width="700" alt="index works!" src="https://cloud.githubusercontent.com/assets/25366/8716386/70c8d256-2b45-11e5-80fe-86223262bbc7.png">



## Edit / PUT Form - Independent Practice (5 minutes)

Awesome, now it's your turn to practice what we just did. Take 5 minutes and do what we just did for your edit page. No copy-and-pasting, do it from scratch.

> 5 minutes later...

## Edit / PUT - Codealong (20 minutes)

You should end up with something that looks like:

```erb
<h2>Edit Song</h2>

<form class="song" id="add-song" action="/songs/<%= @song.id %>" method="PUT">
  <label for="song_title">Title:</label>
  <input type="text" name="song[title]" id="song_title">

  <label for="song_published_in">Year Published:</label>
  <input type="text" name="song[published_in]" id="song_published_in">

  <div>
    <input type="submit" class="btn">
  </div>
</form>
```

If you missed one or two details, don't sweat it. Important things to realize:

- The form action uses ERB to make sure it's going to the correct route – isn't that cool? Feels sneaky, but is totally what it's made for.
- There's one fun thing & important thing we're missing in our inputs.
- If you had the method `put`, that's a good catch (because that's the verb we need to use), but we'll see how we really need to do it in a second.

##### Form actions are the route the form will send to

So for different types of forms, you'll want to change that to reflect where in our RESTful controller this information should go.

##### Form inputs for an edit action need values!

This isn't something you should have known ahead of time, but imagine how you'd want an edit form to look when you see it – the inputs should be pre-filled with the data that's already saved in our database, so we can change it if we want.

Like this, essentially, if you can ignore the word "New" in the header:

<img width="700" alt="new form" src="https://cloud.githubusercontent.com/assets/25366/8716380/5461375c-2b45-11e5-8890-a7b3862590ec.png">

That's done with a few simple value additions to our form:

```erb
<h2>Edit Song</h2>

<form class="song" id="add-song" action="/songs/<%= @song.id %>" method="PUT">
  <label for="song_title">Title:</label>
  <input type="text" name="song[title]" id="song_title" value="<%= @song.title %>">

  <label for="song_published_in">Year Published:</label>
  <input type="text" name="song[published_in]" id="song_published_in" value="<%= @song.published_in %>">

  <div>
    <input type="submit" value="Add song" class="btn">
  </div>
</form>
```

Adding a value and using some ERB means it can pre-fill that text input! Remember, in our `edit` controller action, `@song` is not a new song, but one we found based on the `params[:id]` in the URL.


##### Lastly, PUT is close but not quite right

There's one tiny thing we need to know about edit/update. Despite having learned about the HTTP verbs PUT, PATCH, and DELETE – modern browsers actually don't fully support those methods in form elements. They only support GET & POST.

Of course, we're not going to let that stop us from doing it the right way, with PUT & DELETE methods. Sinatra gives us a useful tool to make it work.

In your `config.ru`, add this sweet one-liner just before our `run` command:

```ruby
use Rack::MethodOverride
run SongsApp
```

Rack::MethodOverride comes with our framework & lets us turn a POST into a PUT/DELETE just by adding an input to our form. So check this slight modification out:

```diff
- <form action="/songs/<%= @song.id %>" method="put" class='song' id="edit-song">
+ <form action="/songs/<%= @song.id %>" method="POST" class='song' id="edit-song">
+   <input type="hidden" name="_method" value="put">

  <div>
    <label for="song[title]">Title:</label>
    <input name="song[title]">
  </div>

  <div>
    <label for="song[published_in]">Year Published:</label>
    <input name="song[published_in]">
  </div>

  <div>
    <input type="submit" value="Add Song" class='btn'>
  </div>
</form>
```

By including that config middleware (that's what it's called), using a POST in our form, and adding in a _hidden_ input to tell it we actually need it to be a PUT, we've got a fantastic working edit form.

You'll notice our controller is almost exactly the same as `create`, but with `update_attributes` instead of `.new` & `.save`.

Try it! Make sure it works.

## DELETE - Independent Practice (5 minutes)

> ***Note:*** _This can be a pair programming activity or done independently._

Our last step, of course, to complete the whole picture, is DELETE, which acts just like PUT, but it doesn't need to send any information, just the request is enough.

Take the next 5 minutes to replace the fake "Delete Song" link in the index page with a tiny form that actually sends a DELETE request.

_Hint: if you give it a class of 'delete', we've pre-styled it to look just like a link!_

## Conclusion (5 mins)
- Demonstrate the syntax of a form and how its inputs translate to our params hash.
- How do we make sure an edit form has input data pre-populated?
- What steps do we need to do to make sure Sinatra knows how to handle a PUT or DELETE request?
