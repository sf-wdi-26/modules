#All you can Eatly!

Let's build a single page todo-style application that tracks all the things we want to eat!

##Learning Objectives

Synthesize the past few weeks worth of knowledge to build a single-page todo-style app

* AJAX
* Front-end Javascript
* jQuery
* Client-side templating
* Server-side templating
* Express
* Restful routing
* Mongo/Mongoose

## Phase 1 (I do)

Our team has already set the table for us by completing this user-story:

`User can see a list of foods`

Let's get started their project: [phase 1](./phase-1)

## Phase 2 (We do)

Where's the beef? Well, let's get some foods whipped-up by accomplishing the next user-story:

`User can create a new food, without the page reloading`

Here is what the application could look like at the end of [phase-2](./phase-2).

## Phase 3 (We do)

Clean up your mess! Mise en place, as the chefs say:

`User can delete a food, without the page reloading`

Here is what the application could look like at the end of [phase-3](./phase-4).

## Phase 4 (You do)

Your goal is to improve the `createFood` method (in the client-side `app.js`) where the comments say `OPTIMIZE`.

>Note: `createFood` calls `renderFoods` after it has run. `renderFoods` helps maintain state, but unfortunately re-renders **all** the foods to achieve this. This process is slightly inefficient...

Consider creating a new method, `renderFood` (it's singular).

* It should change nothing from the user's perspective rather than (imperceptibly) optimize performance.
* It should template the result of **only** the most recently created food onto the top of the page.
* It should only run **after** the server has responded that the food was successfully added to the database.
