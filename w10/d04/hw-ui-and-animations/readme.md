# Animations Homework

## Exploration and Discovery
Pick one or more of the activities below for your personal growth and development. Pick any project we've worked on this week and add some animation. Make it awesome! Upload and submit your pull request. We will share in class tomorrow morning!

### ngClass

Go crazy experimenting with your own `ngClass` expressions:

- Add more class names and booleans as properties of your `ngClass` object string
- Try `ngClass` inside the `ngRepeat`
- Make a checkbox with a class directly on it that toggles some style on/off
- Make some changeable data in one part of the interface change the style of an element style in a separate part of the interface
- Try using an `ngClick` to toggle an arbitrary piece of data that affects multiple pieces of the interface at once

Play with it and you'll start seeing how powerful it is. Let's see what you come up with!

### Transitions & Keyframes Independent Practice 

Now that we've seen two simple examples, play around with animations. Add keyframes to animate different properties. Use transitions over hover on other elements, and see what CSS properties you can subtly animate.

There are a lot of CSS properties to play with and a lot of possibilities.  For instance:

- Change font weight or color when you hover over a winner
- Trying changing both opacity and color when fading in
- How could you make something fade _out_?
- Most importantly – **what simple animations could you add to help guide a user to know what to do with this page?** How could you use animation to show them how the interface works?

### Do it the Angular Way!

Follow the tutorial and incorporate your own animations.

### Add UI-Bootstrap

The community-made library UI-Bootstrap refactors many Bootstrap Components that relied on jQuery to instead use Angular.  

Follow the UI-Bootstrap getting started guide to add UI-Bootstrap to your project. Don't worry about changing the styles of existing elements in the starter code, but as you experiment with adding elements today, you can try the UI-Bootstrap versions.

The Bootstrap docs say you should add `<meta name="viewport" content="width=device-width, initial-scale=1">`.  What does the `viewport` meta tag do? 

### Explore External Modules

UI-Bootstrap was built as part of a larger Angular-UI project that has many modules. (You can see their list at <a href="https://angular-ui.github.io/">Angular-UI</a>.) Those are only one group of modules; many more exist. There's no real central location to find a comprehensive list of community-built angular modules, but some sites have tried - like <a href="http://ngmodules.org/" target="_blank">ngmodules.org</a>. You'll also find articles or posts online like <a href="https://codegeekz.com/18-best-angularjs-directives-for-developers/" target="_blank">18 Best AngularJS Directives for Developers</a>. As with Ruby gems and Node modules, you'll get into the habit of checking if "there's a ____ for that." Just be careful to check when an external module was last updated, whether it has good documentation, whether it's maintained, etc.

### Add an External Directive

Try incorporating community-made Angular modules into an existing Angular project (like the Awwwards sample).  Feel free to try any you'd like.  Here are a few ideas:

  * Add the <a href="https://github.com/urish/angular-moment" target="_blank">angular-moment</a> directive to show a date and time in your app that ticks down by the second.

  * Add the `currentWeather` directive from the Angular Custom Directives <a href="https://github.com/sf-wdi-26/intro-angular-lab/blob/solution/custom-directives.md" target="_blank">reading</a>.

  * Add the <a href="https://github.com/allenhwkim/angularjs-google-maps" target="_blank">ngMap</a> directive to display a map in your app centered on SF. **Hint:** <a href="http://allenhwkim.tumblr.com/post/70986888283/google-map-as-the-simplest-way" target="_blank">This blog post</a> has some very helpful examples.


### Useful links:

- [The `Applying Animations` step of the official Angular Tutorial](https://docs.angularjs.org/tutorial/step_12)
- [Angular Developer Guide / Animations](https://docs.angularjs.org/guide/animations)
- [Angular API Reference / ngAnimate](https://docs.angularjs.org/api/ngAnimate)
- [Angular ngClass Source Code](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngClass.js)
- [Angular form validation](https://docs.angularjs.org/guide/forms)
- [Animate.css Library](https://daneden.github.io/animate.css/)
- [TweenMax, AKA GreenSock](http://greensock.com/)
