# Gulp Workflows

* Wouldn't it be nice if there was a way to convert ES6 to code every browser can support? Of course!
* Wouldn't it be cool if you could include module support from Node in client side code? Certainly.
* What could do this sort of magic for us? *Gulp Tasks*!

## Learning Objectives

By the end of this tutorial, you will understand:
* What Gulp is and what it can do
* How to install Gulp on your computer
* How to write a Gulp task and run it
* How to add use additional modules with Gulp

#### Introducing: Gulp

* Gulp is a software built on Node.
* It runs **tasks** that manipulate files on your system.
* It is an active, open-source project.
* There are many community-built plugins built to work directly with gulp.
* It is commonly used for transcompilation and minificiation to automate your workflow.

#### Installing Gulp

1. You'll want to install gulp globally. You can do this by running the `npm install gulp -g` command.
1. This states that we want to use `npm` to install the `gulp` package globally (for any project to use).
1. We also need to include gulp in our project. To do that, we will run `npm install gulp --save-dev`. Let's use `--save-dev` because any build processes typically happen just in a dev environment; a production environment should not be concerned with build tools.
1. Now, we should run `gulp`!

```bash
No gulpfile found
```

Oops, we ran into an error. Gulp requires that we store our tasks in a `gulpfile.js`. This should be in the same directory as your `package.json`. Make that file then run Gulp again.

```bash
Using gulpfile ~/path/to/gulpfile.js
Task 'default' is not in your gulpfile
Please check the documentation for proper gulpfile formatting
```

Another error! Ok, let's solve this problem by defining a Gulp task.

#### Defining a Gulp Task

* What is a task?
* A task is something we must do to achieve a result.
* In Gulp, we create tasks to perform tasks that can transform our code.
* A task may perform one job; it may also perform many at once.

In our `gulpfile.js` we need to include the `gulp` module. To do this, we should define a variable: `var gulp = require('gulp');` This will allow us to call upon Gulp to **create a task**.

##### My First (Default) Task

After declaring our `gulp` variable, we should create our first task. This will require us to call upon Gulp to define a task. We must also have a name for our task. By *default*, Gulp requires a `default` task. It is the first task that Gulp will look for when reading your `gulpfile.js`. Let's define our first (default) task:

```javascript
var gulp = require('gulp');

//define a task with the name of 'default'
// and a callback to perform when the task is ran
gulp.task('default', function() {
  console.log('I am the default task. Hear me roar');
});
```

In your terminal, run `gulp`. This will have the library look for a `default` task in your `gulpfile.js`. It will then execute the callback that you define for your task. The output will appear as follows:

```bash
Starting 'default'...
I am the default task. Hear me roar
Finished 'default' after 144 μs
```
#### Compiling Sass

Create a new directory `sass-to-css` and `cd` into it.

```bash
npm init
npm install --save-dev gulp gulp-sass
```

```js
//gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass');
```

Define a `styles` task that looks in a `/sass` directory for all `.scss` files, logs any errors that occur, and then compiles the result into a `/css` directory.

```js
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});
```
Create a `/sass` directory and `touch` a `main.scss` file inside.

Run `gulp styles` and it will find your `.scss` file and output a corresponding `.css` file for you.

Lastly let's add the task we just created to gulp's `default` task and have it run the task upon file changes by watching the file. Now every time you save, your `.scss` will trigger the `styles` gulp task and compile the changes for you!

To do this, at the bottom of your file add:

```js
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});
```

#### Compiling ES6

We've yet to talk about ES6, aka ECMAScript 2015, but it's the next iteration of JavaScript so let's get a taste for it. It's nice to write in, but not supported everywhere yet. Let's write some ES6 code and compile it to ES5, which is universally supported.

Create a new directory somewhere called `es6-to-es5` and `cd` into it.

Require all the modules we'll be using.

```bash
npm init
npm install --save-dev gulp gulp-babel babel-preset-es2015
```

Create a file for `gulp` to reference.

```bash
touch gulpfile.js
```

Inside the file do something similar to what we did to transpile our sass. Instead now we'll be using `gulp-babel` to help us transpile our ES6 to ES5.

Here we'll be creating a task called `scripts`. It will read in all our ES6 `.js` files living inside the `src` directory, pipe them through our babel to transpile them to ES5 and then send the output to corresponding files in the `dist` directory.

At the very bottom, just like previously, we're creating a default watch task that will execute the `scripts` task every time any `.js` file is saved inside our `src` directory. Pretty neat!

```js
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('scripts', function () {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default',function() {
    gulp.watch('src/**/*.js',['scripts']);
});
```

>Note: Babel is the transpiler we'll be using to convert our ES6 to ES5. `babel-preset-es2015` is one of the preset collection of [plugins](https://babeljs.io/docs/plugins/) we can use for it. It contains all the features for ES6 packed together, but in theory you could only require `es2015-arrow-functions` or `es2015-classes`, for example, if you wish to be more specific.

Let's try out some ES6. Below find some working ES6 code, take a moment to look it over. What are your thoughts?

```js
// define an ES6 class called Person
class Person {
  // define the method to run for each instantiation
  constructor(name, age, type="person") {
    this.name = name
    this.age = age
    this.type = type
  }
  // define a greet method
  greet() {
    return `Hi I'm ${this.name}!`
  }
}

// export the Person class
module.exports = Person
```

Run `gulp` in your project's root, then create an `app.js` file in your `src` directory and save it. What happened? Also in the root of your project, run `node` and require the `Person` class with `var Person = require(./dist/app.js)`.

>Note: we are requiring the transpiled ES5 code into node.

**Challenge: Can you instantiate a new person?**

Exciting stuff! Here's a quick look at some of the [new ES6 syntax](https://github.com/lukehoban/es6features). Take a moment to review it and then try out this [online quiz](http://tutorialzine.com/2015/11/think-you-know-es6-prove-it/) (open book is fine). It will introduce you to some new ES6 concepts. Feel free to jot down anything that's surprising and we'll discuss it. Feel free to try any of this fancy ES6 stuff out in your `src/app.js` file.

##### General Gulp Tips and Tricks

* You will need to re-run the `gulp` command every time you make a change to the `gulpfile.js`.
* There is `nodemon` [support](https://github.com/JacksonGariety/gulp-nodemon) for gulp.
* As mentioned previously, you can have `gulp` **watch** files for changes using [gulp-watch](https://www.npmjs.com/package/gulp-watch).
* You can bundle your multiple files into one output file with [gulp-concat](https://github.com/contra/gulp-concat).
* And also minify [JS](https://github.com/terinjokes/gulp-uglify) or [CSS](https://github.com/scniro/gulp-clean-css)!
