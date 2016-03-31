#[Redux](https://github.com/reactjs/redux)

##Learning Objectives

* Articulate the Redux pattern
* Keep track of your application's state with a **store** 
* Define and emit **actions** to update your state
* Calculate diffs to your state with **reducers**
* Integrate Redux into a React component

##Philosophy

Redux's main purpose is to **manage the state of an application**. It's patterns are expressly inspired by [Flux](https://github.com/facebook/flux), Facebook recommended way to manage state amongst React components and [Elm](https://github.com/elm-lang), a functional programming language.

###Three Principles

Redux has three very important design choices:

* **Single source of truth**: The entire state of your application is stored as an object within your application's store. More specifically this object is a state tree, an object that contains other objects, representing the application's state.
* **State is read-only**: The *only* way to mutate your application's state is to emit an action and create a *new* state object. All actions are dispatched to a centralized location, which helps make your state easier to keep track of.
* **Changes are made with pure functions**: Changes to your state are determined by reducers, which are pure functions that take in the previous state and an action. Using this information, it determines the updated state. Your application may start with a single reducer, but as the application grows, different reducers can manage different parts of the application's state.

###Redux Architecture

![redux-architecture](https://camo.githubusercontent.com/83fef7601c50c8b025953579e5c5be3aa47ee51d/687474703a2f2f692e696d6775722e636f6d2f30756e68744e512e6a7067)

##Redux Like Button

Let's take a look at implementing a simple like button to see how actions, reducers, and a store may work together to maintain its state.

In `starter-code` run `npm install` to install all the dependancies and get your gulp task running. In a separate tab run `npm start` to get your server started on port 3000.

First let's create a like button in our `index.html` in addition to a place where we can see the total likes. Giving them both `id`'s will help us reference them later.

```html
<h3 id="total-likes"></h3>
<button id="like-button">Like</button>
```

Now in our `index.jsx` (we'll use actual JSX later) let's select these elements.

```js
const likeButton = document.getElementById("like-button")
const totalLikes = document.getElementById("total-likes")
```

Now we're going to create a reducer, which we'll later register with a store and start dispatching actions to it!

```js
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    default:
      return state
  }
}
```

The above store's state defaults to 0. If it is passed an action of type "LIKE", then it increments it's state by 1. Otherwise it does nothing.

Now using this reducer, we can create a store for our application. At the top of our file let's import Redux.

```js
import { createStore } from 'redux'
```

What is this syntax? It's how we [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) a specific member (distinct piece) of the Redux module (library).

>Note: `import Redux from 'redux'` doesn't work because Redux doesn't `export` anything by `default`, as a result it just has modular members you can import from the Redux module. If you do want to import everything it can be done with the syntax, `import * as Redux from 'redux'`. Then you could access its `createStore` member with `Redux.createStore`. However we're going to prefer the above syntax.

Using Redux's `createStore` method, let's now create a store for our application. This store will contain the applications state and know how to update it appropriately because we will give it our reducer.

```js
// create a store, where the state lives
const store = createStore(likes);
```

Now we can get our application's state at any time by calling `store.getState()`. We know we're going to want the number of likes in our store reflected on the section of our html page, `#total-likes`. To display the current state to our user, we'll have to update the view everytime the state changes. It will be helpful to have a function that can do this for us.

```js
// update the DOM with the new state
const renderView = () => {
  totalLikes.innerText = store.getState();
}
```

Everytime this function is run it will update our view to display the latest of our state.

How many times is `renderView` being called at the moment? None. Let's call it once so that on page load the initial state is shown as being `0`, which our reducer has defined for us in the line: `const likes = (state = 0, action) => {...}`.

```js
// called once for initialization
renderView()
```

But how does the view know to update when changes to the store are made? It doesn't. That's why we have to subscribe functions to the store. Any function that is subscribed to the store will get run any time the store is updated. Nifty!

```js
// re-render every time the store is updated
store.subscribe(renderView)
```

Lastly we need to dispatch a "LIKE" event to our reducer when the user clicks the `#like-button`.

```js
// make the like button dispatch a "LIKE" action
likeButton.addEventListener('click', () => {
  store.dispatch({type: 'LIKE'})
})
```

Try it out!

<details>
<summary>Example Code</summary>

```js
"use strict"
import {createStore} from 'redux'
const likeButton = document.getElementById("like-button")
const totalLikes = document.getElementById("total-likes")

// reducer for the like button
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    case 'DISLIKE':
      return state - 1
    default:
      return state
  }
}

// create a store, where the state lives
const store = createStore(likes);

// update the DOM with the new state
const renderView = () => {
  totalLikes.innerText = store.getState();
}

// re-render every time the store is updated
store.subscribe(renderView)

// called once for initialization
renderView()

// make the like button dispatch an action
likeButton.addEventListener('click', () => {
  store.dispatch({type: 'LIKE'})
})
```

</details>


##Challenge: Dislike!

<details>
<summary>On your own create a `dislike` button that trigger a `DISLIKE` action and decrements the state by 1 each time it is clicked.</summary>

Update the reducer to include a new "DISLIKE" action type that decrements the state by 1

```js
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    case 'DISLIKE':
      return state - 1
    default:
      return state
  }
}
```

Make a dislike button

```html
<button id="dislike-button">Dislike</button>
```

Target the button

```js
const dislikeButton = document.getElementById("dislike-button")
```

Add an event to your dislike button that triggers a DISLIKE action.

```js
dislikeButton.addEventListener('click', () => {
  store.dispatch({type: 'DISLIKE'})
})
```

</details>

##Integrating React

Let's refactor much of our JavaScript by introducing a React component called `LikeCounter`. First get of any code that's concerned with updating our view as we'll use React to take care of it.

Now let's import `react` and `react-dom` into our project.

```js
import React from 'react'
import ReactDOM from 'react-dom'
```

And create a `LikeCounter` component

```js
const LikeCounter = React.createClass({
  like() {
    store.dispatch({type: 'LIKE'})
  },
  render() {
    return (
      <div>
        <h3>{this.props.likeCount}</h3>
        <button onClick={this.like}>Like</button>
      </div>
    )
  }
})
```

This component will get passed the `likeCount` as a prop. Additionally it has a function `like` that when triggered dispatches a `LIKE` action to our reducer.

Now our `renderView` function can get updated to re-render our react component and pass in our store's state into it as a prop, `likeCount`.

```js
const renderView = () => {
  ReactDOM.render(
    <LikeCounter likeCount={store.getState()}/>,
    document.getElementById("like-counter")
  )
}
```

Don't forget to make a place on your HTML page for the component to live.

```html
<div id="like-counter"></div>
```

Also, just like before, ensure that `renderView` gets called once initially and is also called anytime the state is updated.

```js
// render every time the store is updated
store.subscribe(renderView)

// called once for initialization
renderView();
```


##Challenge: Dislike it again!

<details>
<summary>Make a `dislike` method for your `LikeCounter` component that dispatches a `'DISLIKE'` action when the dislike button is clicked.</summary>

```js
"use strict"

import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

// like-button component

const LikeCounter = React.createClass({
  like() {
    store.dispatch({type: 'LIKE'})
  },
  dislike() {
    store.dispatch({type: 'DISLIKE'})
  },
  render() {
    return (
      <div>
        <h3>{this.props.likeCount}</h3>
        <button onClick={this.like}>Like</button>
        <button onClick={this.dislike}>Dislike</button>
      </div>
    )
  }
})

// reducer for the like button
const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    case 'DISLIKE':
      return state - 1
    default:
      return state
  }
}

// create a store, where the state lives
const store = createStore(likes);

const renderView = () => {
  ReactDOM.render(
    <LikeCounter likeCount={store.getState()}/>,
    document.getElementById("like-counter")
  )
}

// render every time the store is updated
store.subscribe(renderView)

// called once for initialization
renderView();
```

</details>

##Adding To Eatly

Let's add another component to our application that's just a list of foods we want to eat, aka to Eatly!

We'll need to create a new reducer for our application to keep track of our foods. This reducer will take one action by default, `ADD_FOOD`. When we add a food, it will return all the original foods plus the new food we intend to add.

```js
const foods = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      // return an entirely new list of foods using the spread operator
      return [
        ...state,
        {
          name: action.name
        }
      ]
    default:
      return state
  }
}
```

If we have two reducers in our application we need to use the `combineReducers` member of our Redux module, so let's import it.

```js
import { createStore, combineReducers } from 'redux'
```

We can combine our reducers into a single application reducer and then pass that into our store instead.

```js
// pack separate reducers into a single one for the application
const app = combineReducers({foods,likes})
// use the single reducer to generate our single application-wide store
const store = createStore(app)
```

Now we need to create `FoodList` component in React that allows the user to input a new food and see a list of foods rendered. For now we'll only worry about allowing them to input the food's `name`. We can collect user input as follows.

```js
// Food list React component
const FoodList = React.createClass({
  // set initial state
  getInitialState() {
    return {
      name: null
    }
  },
  // update state when the input is changed
  handleNameChange(e) {
    this.setState({name: e.target.value})
  },
  // form submit function
  addFood(e) {
    e.preventDefault()
    store.dispatch({
      type: 'ADD_FOOD',
      name: this.state.name
    })
    // clear form
    this.setState({name: null})
  },
  // initial render function
  render() {
    return(
      <div>
        <form onSubmit={this.addFood}>
          <input placeholder="Name" value={this.state.name} onChange={this.handleNameChange} autoFocus />
          <button>Add Food</button>
        </form>
        {/* list of the foods */}
        <ul>
          {this.props.foods.map((food, index) =>
            <li key={index}>
              {food.name}
            </li>
          )}
        </ul>
      </div>
    )
  }
})
```

Now to deal with rendering two components. We can create an `App` component that is the parent of all our other components, `FoodList` and `LikeCounter`, which we render instead.

```js
const App = React.createClass({
  render() {
    return(
      <div>
        <FoodList foods={store.getState().foods}/>
        <LikeCounter likeCount={store.getState().likes}/>
      </div>
    )
  }
})
```

And update our `renderView` function and html page accordingly.

```js
const renderView = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById("app")
  )
}
```

```html
<body>
  <div id="app"></div>
</body>
```

<details>
<summary>Now take the time to refactor the `components` and `reducers` into separate directories/files as necessary. Inside me is what our application should look like at this point. </summary>

```js
"use strict"

import { createStore, combineReducers } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

const foods = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      // return an entirely new list of foods using spread operator
      return [
        ...state,
        {
          name: action.name
        }
      ]
    default:
      return state
  }
}

const likes = (state = 0, action) => {
  switch(action.type) {
    case 'LIKE':
      return state + 1
    case 'DISLIKE':
      return state - 1
    default:
      return state
  }
}

// pack separate reducers into a single one for the application
const app = combineReducers({foods,likes})

// use the single reducer to generate our single application-wide store
const store = createStore(app)

const LikeCounter = React.createClass({
  like() {
    store.dispatch({type: 'LIKE'})
  },
  dislike() {
    store.dispatch({type: 'DISLIKE'})
  },
  render() {
    return (
      <div>
        <h3>{this.props.likeCount}</h3>
        <button onClick={this.like}>Like</button>
        <button onClick={this.dislike}>Dislike</button>
      </div>
    )
  }
})

// Food list React component
const FoodList = React.createClass({
  // set initial state
  getInitialState() {
    return {
      name: null
    }
  },
  // update state when the input is changed
  handleNameChange(e) {
    this.setState({name: e.target.value})
  },
  // form submit function
  addFood(e) {
    e.preventDefault()
    store.dispatch({
      type: 'ADD_FOOD',
      name: this.state.name
    })
    // clear form
    this.setState({name: null})
  },
  // initial render function
  render() {
    return(
      <div>
        <form onSubmit={this.addFood}>
          <input placeholder="Name" value={this.state.name} onChange={this.handleNameChange} autoFocus />
          <button>Add Food</button>
        </form>
        {/* list of the foods */}
        <ul>
          {this.props.foods.map((food, index) =>
            <li key={index}>
              {food.name}
            </li>
          )}
        </ul>
      </div>
    )
  }
})

const App = React.createClass({
  render() {
    return(
      <div>
        <FoodList foods={store.getState().foods}/>
        <LikeCounter likeCount={store.getState().likes}/>
      </div>
    )
  }
})

// Render the App component to the page
const renderView = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById("app")
  )
}

store.subscribe(renderView);

renderView()
```

</details>

An example solution can be found inside `solution-code`.

##Bonus: Yumminess

Add a yumminess (or any other) input to your `FoodList` component; update and render the state accordingly!

##Helpful Redux Middleware & Complementary Modules

>Note: Redux has middleware for it, to extend its behavior.

* If you want to dispatch actions asynchronously checkout [thunk](https://github.com/gaearon/redux-thunk)
* [React-redux](https://github.com/reactjs/react-redux) can dry up some of your code, guide [here](http://redux.js.org/docs/basics/UsageWithReact.html)
* [Writing tests](http://redux.js.org/docs/recipes/WritingTests.html)
* Ensure your state is never mutated with [immutable](https://facebook.github.io/immutable-js/)
* Going back in time in Redux with [UndoHistory](http://redux.js.org/docs/recipes/ImplementingUndoHistory.html)

##More Videos & Blog Posts

* Nice [video tutorial](https://egghead.io/series/getting-started-with-redux) by the creator
* Another [getting started](http://www.jchapron.com/2015/08/14/getting-started-with-redux/) tutorial
* A [cartoon intro](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.wcukeamlp) to redux
* [Redux way of doing things](http://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1/)
* [Full-stack Redux](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

##Final Questions

<details>
<summary>What are Redux's: Three Priciples?</summary>

* The entire state of your application is stored in a **single object**.
* This object is **never mutated** but instead used to create a state object each time an action is taken.
* Reducers are **pure functions**, meaning that provided with a specific input they will always return an expected output.

</details>

<details><summary>What is the Purpose of a Reducer?</summary>

A reducer takes in an **original state** and an **action type** to decide what the **updated state** of the application will become.

</details>

<details><summary>Why do Redux and React play well together? Can you use Redux with other client-side frameworks?</summary>

React is just a **view layer**, so Redux helps **control the state** of the application as your data changes.

</details>



