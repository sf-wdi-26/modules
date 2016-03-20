# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> Intro Angular Lab

**Objective:** Set up a new Angular app and apply your knowledge of Angular's built-in directives.

## Getting Started

1. Fork this repo, and clone it into your `develop` folder on your local machine.
2. Change directories into `intro-angular-lab`, and follow the instructions from this morning's module to set up a new Angular app. You will need:
    * `index.html` with links to the Angular CDN and `app.js`.
    * `ng-app` and `ng-controller` directives in the HTML.
    * `app.js` that initializes your Angular app and adds a controller.
3. Run `budo app.js --open` from your Terminal to start your server and open your app in the browser.
4. Implement solutions to the following challenges. Refer to the [solution branch](https://github.com/sf-wdi-26/intro-angular-lab/tree/solution) for guidance.

## Challenges

1. Inside your Angular controller, create an array of objects `$scope.moviesToWatch`, and use the `ngRepeat` directive to iterate over your list of movies and display them in the view.

2. Use the `orderBy` filter to sort the list of movies by name in descending order.

3. Include the text "`{{moviesToWatch.length}}` movies to watch", and use the `ngPluralize` directive so that the text displays "movie" when there is one movie and "movies" in all other cases.

4. Create a form on the page for a user to add a new movie to the list. Write a function called `addMovie` and use the `ngSubmit` directive to add the new movie to `$scope.moviesToWatch` when the user submits the form.

5. Use the `limitTo` filter to limit the number of movies displayed to five. **Bonus:** Add a link for the user to "View More". Clicking the link should allow the user to view the entire list of movies.

6. Put an icon next to each movie that resembles an "X" or a trash can. When the user clicks the icon, delete the movie from the list. **Hint:** Write a function called `deleteMovie`, and use the use the `ngClick` directive.

## Bonus

1. Implement a way for the user to mark a movie as "watched". Use the `ngStyle` or `ngClass` directive to strikethrough the text of the movie if it's been "watched".

2. Give each movie in `$scope.moviesToWatch` an image. Make a button in the view for the user to change the background. When the user clicks the button, set the app's background to a random movie image from `$scope.moviesToWatch`. Every time the user clicks the button, they should see a different background image.

## Submission

* As you make code changes, frequently commit and push to GitHub.
* Once you've finished the assignment and pushed your work to GitHub, create a readme.md in a w10/ folder with a link to your project and make a pull request to the homework repo.

## Optional Practice

* <a href="https://www.codeschool.com/courses/shaping-up-with-angular-js" target="_blank">Shaping up with Angular.js - Code School Tutorial</a>
* [Custom Directives Reading](https://github.com/sf-wdi-26/intro-angular-lab/blob/solution/custom-directives.md)

## Resources

* <a href="https://docs.angularjs.org/guide/directive#what-are-directives-" target="_blank">AngularJS Developer Guide - Directives</a>
* <a href="https://docs.angularjs.org/api/ng/directive" target="_blank">AngularJS API Reference - Directives</a>
* <a href="https://docs.angularjs.org/api/ng/filter" target="_blank">AngularJS API Reference - Filter Components</a>
