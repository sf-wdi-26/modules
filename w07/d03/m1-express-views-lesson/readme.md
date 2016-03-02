# Views in Express

### Objectives
*After this lesson, students will be able to:*

- Create and render views in an Express application
- Explain the differences and similarities between the syntax of ERB and EJS
- Render partials and iterate over data in views

### Preparation
*Before this lesson, students should already be able to:*

- Write express controllers and models
- Connect Express models to Mongoose/MongoDB

## Views in Express - Intro (5 mins)

A lot of times, if we're looking to get a prototype up and running, we'll want to use a templating engine. Using Express out of the box, the view engine is Jade - an engine very similar to haml that relies on white space.  But if you're not familiar with haml - as we're not - EJS is another alternative that's easy to set up and comparable to the embedded ruby (ERB) we've used in Rails.

We are going to return to our `candies` app to focus on how to add views using EJS, include partials and passing data to our views.

## Setting up our app to use EJS - Codealong (10 mins)

First, let's require `ejs` in our applications `package.json`.  In dependencies, add:

```json
"ejs": "^2.3.3"
```
...and then:

`npm install`

Now, let's take a look at our `app.js` file and add the following:

```javascript
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
```

Let's look at a few things going on here: `path` is a core Node module dealing with paths.  In our example, we've added the [path.join()](https://nodejs.org/api/path.html#path_path_join_path1_path2) method. For us, this normalizes all the arguments into a path string which will help when we use the `__dirname` global variable and a file or folder.  After adding this, our Node app's view folder will look like:  `/Users/your_username/your_projects_folder/app/views`

It won't check for an existing path but it will transform the path string.

The second app.set() tells Express to use the ejs templating engine. This allows you to embed JavaScript to work with data with conditionals in your views.  For example, choosing not to render partials if a user is already logged in. The file path to your view files now will be `.ejs`

The middle line requires the `ejs` module in our app for files it encounters with the `.ejs` file extension.

Since we're ready to use `.ejs` now, let's set up our file structure to make sure our application can call the files properly. Create the following folder structure:

```
- views/
----- partials/
-------- candy/
------------ form.ejs
----- layout.ejs

```

## Set up your form - Independent Practice (10 mins)

Ok, you've done this before.  Set up your form real quick in `candy/form.ejs` with:

- A header that says "Create Candy!"
- A form with a POST method that submits to the `/candies` endpoint
- Two inputs for name and color that have `form-control classes` and placeholders
- A submit button

<!--
> Note: Provide students with the correct answer once time is up

```html
<h3>Create Candy!</h3>
<fieldset>
  <form method="POST" action="/candies">
    <div class="form-group col-md-4">
      <input name="name" class="form-control" placeholder="Name"/>
    </div>
    <div class="form-group col-md-4">
      <input name="color"  class="form-control" placeholder="Color"/>
    </div>
      <div class="form-group col-md-4">
        <input class="btn btn-primary col-md-12" type="submit" value="Submit">
      </div>
  </form>
</fieldset>
```
-->

## Set up our layout to iterate over data - Codealong (15 mins)

Let's create an index page that will double as our form.  But first let's make sure our application is set up to pass data from our database to our views if a user visits the `/candies` endpoint.

First, in our `config/routes.js` file, let's make sure our app can both get a list of all the candies and post a new candy from the same endpoint:

```javascript
var candiesController = require('../controllers/candies');

// http://127.0.0.1:3000/candies
router.route('/candies')

//GET all candies
   .get(candiesController.getAll)

//POST a new blob
   .post(candiesController.createCandy);
```

First, we require the controllers, then we set the candies routes and the `GET` AND `POST` actions that will occur when hitting this endpoint.  Now let's define these methods in our controller: `.getAll` and `.createCandy`.  We'll need to set up error handling and serve the response to the correct view with `.render`.  First, let's start with the `.getAll` function, together:

```javascript
// GET
function getAll(request, response) {
  Candy.find(function(error, candies) {
    if(error) response.json({message: 'Could not find any candy'});

    // response.json({message: candies});
    response.render('layout', {candies: candies});
  });
}
```

## Write a `createCandy` method that will pull from `name` and `color` inputs - Independent Practice (5 mins)

```javascript
// POST
function createCandy(request, response) {

  // fill in your code here

  candy.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate candy b/c:' + error});

    response.redirect('/candies');
  });  
}
```

<!--
> Note: Provide students with the correct answer once time is up

    ```
    console.log('in POST');
    console.log('body:',request.body);
    var candy = new Candy();

    candy.name = request.body.name;
    candy.color = request.body.color;
    ```
-->


## Let's make our layout! Code along (15 mins)

First, all the header stuff is exactly the same as it would be in a `.html` file - in `layout.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Candy App</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
</head>
```

Again, even though this is an `.ejs` file we're able to write html because we've set up our app to use the ejs templating engine, which can render HTML with embedded JavaScript.

Now, we're going to do two things.  First, because we're assuming we're at the `/candies` endpoint, we'll have the `canides` object with all of our candies and the associated attributes.  So let's iterate over that object with JavaScript.  Just like you would in Ruby, you specify that what's being read is JavaScript with opening and closing `<% %>`, if you want the code to execute; `<%= %>` if you want the code to execute and render on the browser. 

> Note: Recent versions of EJS have [a few more options](https://www.npmjs.com/package/ejs#tags)

So let's create a `<body>` and first, let's show all of our candies, with the name and color:

```html
<body>
  <h1>
    <a target="_blank" href="https://www.youtube.com/watch?v=mKli0y-Xr-Q">Candy Shoppe</a>
  </h1>
  <div class="container">
  <% for(var i=0; i< candies.length; i++) {  %>
    <ul>
      <li><b>Name : </b> <%= candies[i].name %></li>
      <li><b>Color : </b> <%= candies[i].color %></li>
    </ul>
  <% } %>
  </div>
</body>
```

Now, just like Rails, we can use partials within our layout.ejs page.  The method is `include` instead of `render`, though:


```html
...
    <hr>
    <div class="container">
        <% include ./partials/candy/form %>
    </div>
...
```

Now your `layout.ejs` page should look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Candy App</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="stylesheets/main.css" /></head>
<body>
    <h1>
        <a target="_blank" href="https://www.youtube.com/watch?v=mKli0y-Xr-Q">Candy Shoppe</a>
    </h1>
    <div class="container">
    <% for(var i=0; i< candies.length; i++) {  %>
    <ul>
      <li><b>Name : </b> <%= candies[i].name %></li>
      <li><b>Color : </b> <%= candies[i].color %></li>
    </ul>
    <% } %>
    </div>

    <hr>
    <div class="container">
        <% include ./partials/candy/form %>
    </div>

</body>
</html>
```


## Independent Practice (15 mins)

> ***Note:*** This can be a pair programming activity or done independently; the solution code for this lab does not cover the solution to this seciton

Expand on this application by doing the following:

- Add an update link with the `link_to` helper to each candy on your `/candies` page
- Create an update page where users can update information about their candy
  - The update functionality is written for you already!
- Create a footer as a separate partial and render it in the layout.ejs file
  - In the footer add in "Candies ©"

Use these [docs](http://www.embeddedjs.com/getting_started.html).



## Conclusion (5 mins)
- Describe how `ejs` compares to `erb`.
- Describe how to configure your Express app to use `ejs`.
- Identify some `ejs`-specific syntax used to use different partials.
