#Iterators from Scratch

|Learning Objectives|
| :--- |
| Implement iterators from scratch |
| Wrap functions into a utility object |

##Existing Iterators

JavaScript's `Array` comes with many built in iterators that help make our life easier as using `for` loops are clunky and unintuitive. Let's take moment to see what methods are native to an array... We can list all methods with: `Object.getOwnPropertyNames(Array.prototype)`. This is great, but have you ever considered how a function like `forEach` works under the hood?

##Building a Utility Object

We've seen that `jQuery` has its own iterators like `$.each(<array>, <callback>)` or `$.map(<array>, <callback>)`. Again, how do these functions work under the hood?

Notice JavaScript doesn't have any global functions, just a global object that functions can be attached to. Even `forEach` is not global, but simply part of an `Array`'s API. Similarly the creator of jQuery (John Resig) chose to package up all its utility functions into a single object, the `$` object. So let's do the same thing! 

This is a good design principal to avoid cluttering the global namespace and organize your code. As a quick example the object `lukeSkywalker` has two **methods**: `greet` and `useTheForce`, and two **attributes**: `firstName` and `lastName`.

```javascript
var lukeSkywalker = {
  firstName: "Luke",
  lastName: "Skywalker",
  greet: function() {
    return "Hi I'm " + this.firstName + " " + this.lastName; 
  },
  useTheForce: function(){
    return true;
  }
}
```
*Note: the keyword `this` used inside of a method always refers directly to the object the method belongs to. So in this example it is an alias for the `lukeSkywalker` object.*


###Challenge!

Create working code for:

* `.each`
* `.map`
* `.filter`
* `.reduce` (bonus)

Starter code has been provided in `/starter-code/iterators.js`. We will be placing our utility functions inside an object `o_o` just like jQuery's `$`.


##Moar learning ^_^

Checkout [lodash](https://lodash.com/). It is a collection of utility functions that makes our lives easier as JavaScript developers. Instead of using an object `$`, like jQuery, or `o_o` like we just did, it uses `_` (aka a `lodash`).
