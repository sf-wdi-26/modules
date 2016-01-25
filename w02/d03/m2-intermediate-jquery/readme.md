# Intermedite jQuery

### Objectives
*After this lesson, students will be able to:*
- Describe event bubbling, delegation and how to bind events with jQuery
- Apply jQuery to manipulate, add, and remove DOM elements
- Add event listeners for standard events - click, mouse, keydown - and custom events and respond with an action
- Capture data from specific events and iterate on or manipulate the data
- Work with timer events within the context of the browser

### Preparation
*Before this lesson, students should already be able to:*

- Call JavaScript/jQuery in your HTML file
- Describe jQuery and it's use in manipulating the DOM
- Write simple jQuery to manipulate the DOM
- Read this: [Manipulating Elements - jQuery Learning Center](http://learn.jquery.com/using-jquery-core/manipulating-elements/)

## Page Setup - Codealong (10 mins)

#### Create Folder and Files

Welcome back to jQuery!  Since we've had a proper introduction, let's start building and setup our own `index.html` page and `app.js` file. With Terminal in your working directory where you keep your code:

```bash
mkdir first_jquery
cd first_jquery
touch index.html
mkdir js
touch js/app.js
subl .
```

#### Boilerplate

Create your HTML boilerplate using [Emmet](http://emmet.io/)). Include the jQuery library from the CDN and your `app.js` after it.  We'll also include the CDN of something called Bootstrap, a CSS framework that we will learn more about later, but for now, think of it as a whole bunch of CSS prewritten for us that we can use by calling it.  It's helpful now because it will make our simple demo easier on the eyes:

> Note: You might want to quickly show them Bootstrap's interface and a sample of the code that's available.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome Back to jQuery</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="https//code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="js/app.js"></script>
</head>
<body>

</body>
</html>
```

#### Starting HTML

We are going to display a list homes for sell in Lake Arrowhead. Here's some HTML to get us started - replace the existing `<body>` tags with the following:
```html
<body class="container">

    <h1 class="jumbotron">Lake Arrowhead Homes For Sale</h1>

    <table id="homes" class="table">
        <thead>
            <tr>
                <th>Address</th>
                <th>Sq. Ft.</th>
                <th>Bedrooms</th>
                <th>Baths</th>
                <th>Price</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>27374 Matterhorn Drive</td>
                <td>1,664</td>
                <td>3</td>
                <td>2</td>
                <td>$279,500</td>
                <td><button class="btn btn-xs btn-danger">Remove</button></td>
            </tr>
            <tr>
                <td>243 El Dorado</td>
                <td>4,900</td>
                <td>6</td>
                <td>6.5</td>
                <td>$990,000</td>
                <td><button class="btn btn-xs btn-danger">Remove</button></td>
            </tr>
            <tr>
                <td>1228 Klondike Drive</td>
                <td>2,158</td>
                <td>4</td>
                <td>2.5</td>
                <td>$400,000</td>
                <td><button class="btn btn-xs btn-danger">Remove</button></td>
            </tr>
        </tbody>
    </table>
	<br>
    <button id="addHome" class="btn btn-danger">Add Home</button>

</body>
```

#### Ensuring that the DOM is Ready

Since our script is in the `<head>`, it will be parsed before the DOM. If our code references any DOM elements, and since this is a jQuery lesson it most certainly will, we need to delay our code's execution until the DOM is built by the browser:

```js
$(document).ready(function() {
	alert("Everything is ready, let's do this");
});

// or, the shortcut version
$(function(){
	alert("Everything is ready, let's do this");
});
```

We're all set to get started. In Sublime, right-click anywhere on `index.html` in the editor and select `Open in Browser`.

Your page should load and the alert appear.

## Adding & Removing Classes - Demo (5 mins)

It looks like our designer styled our _Add Home_ button with Bootstrap's `btn-danger` class making it red. We may be code junkies, but even we know that the button should probably be a color other than red - let's make it green instead.

Change the button from red to green by removing the `btn-danger` class and adding the `btn-success` class with jQuery:

```js
$(function() {

    $('#addHome').removeClass('btn-danger').addClass('btn-success');

});
```
That's better!

## Add and Remove Classes - Independent Practice (5 mins)

Your turn! Add a class named "text-center" to the `<h1>` tag.

## Creating and Modifying Elements - Codealong (10 mins)

jQuery makes creating new elements easy. Lets add an anchor tag (link) to our page that takes our users to Zillow's site.

The jQuery function isn't just for selecting elements - it can create them! Just give it a string holding the HTML:

```js
var newLink = $( '<br><br><a id="zillowLink" href="http://www.zillow.com">Visit Zillow.com<a>' );
```

#### Adding the Element to the DOM

The `newLink` variable now holds our newly created element, however, we still need to add it to the page. One of the ways is to use the `appendTo()` method:

```js
newLink.appendTo('body');
```
`appendTo()` will insert the new elements at the end, but still inside of the specified element.

Other methods available include:

- `append()`
- `insertBefore()`
- `insertAfter()`
- `before()`
- `after()`
- `prepend()`
- `prependTo()`

We'll practice adding elements in a bit.

#### Check it Out

Refresh your page and there's the link!

The problem however is that the link takes us away from our page. Wouldn't it be better instead to open Zillow in another tab? We'll do that in the next section.

#### Modifying Attributes

jQuery makes it easy (that phrase never gets old) to modify the attributes of an element with the `attr()` method.

Lets use it to add a `target` attribute to our link:

```js
$('#zillowLink').attr( "target", "_blank" );
```

Nice!

We also can use the `removeAttr()` method to remove an attribute.

## Find the value of an attribute - Independent Practice (5 mins)

How do you think we would retrieve the value of an attribute?  Pair up, get on the web and find out, and then, `console.log` the value of the link's `href` attribute.


## Adding Event Listeners - Codealong (10 mins)

When our shiny green _Add Home_ button is clicked, we want to add one of the homes from an array that we will preloaded with a few homes.

jQuery has several ways to add event listeners. We will look at a couple of them in this lesson.

Here is a straight forward way to add an event listener to our _Add Home_ button:

```js
$('#addHome').click(function(evt){
	console.log(evt);
	console.log(this);
});
```
Refresh the page and open the console to see what the `evt` argument (jQuery's _event_ object) passed in by jQuery looks like and what `this` is set to.

jQuery's _event_ object can come in handy, especially when listening to mouse events. It is this object for example that would make writing a drawing or paint application possible.

Here is an alternative syntax. This syntax is preferred because the syntax above actually calls this next version internally.

```js
$('#addHome').on('click', function() {
	console.log(this);
});
```
In all cases, note that if you don't need to use the _event_ argument, you don't have to include it.

[These docs](http://api.jquery.com/category/events/) have a complete list of event methods.

In order to stay on the topic of event listeners, we'll write the code to insert a home a bit later.

#### Event Delegation - Intro (10 mins)

_Event delegation_ allows us to attach a single event listener to an element that will fire for all descendants matching a selector, whether those descendants exist now or are added in the future.

This is possible courtesy of something known as _event bubbling_, implemented in all major browsers. With event bubbling, un-handled events "bubble up" the DOM until a listener for that type of event is found. If there is no listener, so be it.

Doesn't this like a sound perfect approach for our _Remove_ buttons on each home? One event listener, regardless of how many homes in our table?! One event listener for all of the current rows in our table now, and for ones that we add later?! Yes, thanks to event delegation!

We need to decide which ancestor element to use.<br>

> Note: Identify the ancestor elements of our `<tr>` tags with the class.

Any ancestor element would work, but as they say, closer is usually better.

Let's put the handler on our `<tbody>` tag.  Also, to see how it's done, we will use a named function instead of an anonymous one:

```js
$('#homes tbody').on('click', 'tr', removeHome);

function removeHome() {
    console.log(this);
}
```

> Note: Discuss the differences about the way we used the `on()` method that made it perform event delegation?

## More DOM practice - Codealong (5 mins)

### Removing Elements

If our users click on the _Remove_ button, we obviously want to remove that home's row from the table:

```js
function removeHome() {
	$(this).remove();
}
```

No, it can't be that easy!

#### Removing Elements "Gracefully"

Currently, the sudden disappearance of the home's row is a little harsh. jQuery has some nice built-in [effects](http://learn.jquery.com/effects/intro-to-effects/) to help us out:

```js
function removeHome() {
	$(this).fadeOut(1000, function() {
		$(this).remove();
	});
}
```
Much better!

## Traversing the DOM - Demo (5 mins)

jQuery has [several methods to traverse the DOM](https://api.jquery.com/category/traversing/). However, to complete the next exercise, we need to know about the `children()` method.

We can use the `children()` method to select direct children (vs. all descendants) of an element.

For example, if we wanted to set the color of the text of our _Address_ and _Price_ cells in table header row blue and green respectively, we could do this:

```js
var cells = $('#homes thead tr').children();
cells.eq(0).css('color', 'blue');
cells.eq(4).css('color', 'green');
```
Note that the `children()` method can be passed in an additional selector string for further filtering.

## Add New Homes - Independent Practice (15 mins)

Now for what would appear to be our biggest challenge. However, you've already seen everything you need to make this happen! jQuery's there for you.

First, copy this array of new home data to your script:

```js
var newHomes = [
    {address: "27569 Cedarwood Drive", sf: "2,535", bedrooms: 3, baths: 2.5, price: "$496,500"},
    {address: "316 Annandale Drive", sf: "1,326", bedrooms: 4, baths: 2, price: "$275,000"},
    {address: "251 Grandview Road", sf: "3,800", bedrooms: 3, baths: 2, price: "$699,900"},
    {address: "28571 Manitoba", sf: "2,960", bedrooms: 4, baths: 3.5, price: "$775,000"}
];
```

- Use the home data to "fill" in the cells of newly created rows.
- It always helps to pseudocode (write the major coding steps in English).
- You can take a home from the beginning or end of the array - your call.

**Bonus**:

- If you have time, include a check for there being no more homes in the array to add and disable the _Add Home_ button.
- Add a button, that when clicked, restore all previously removed homes and appends them to the bottom of the table.
  - Hint: Take a look at the "Removing Elements" section in [these docs](http://learn.jquery.com/using-jquery-core/manipulating-elements/).

## Conclusion (5 mins)

- Describe how the event delegation syntax differs from the standard syntax.
- Explain how to ensure your jQuery doesn't run until after the DOM loads in the browser.
