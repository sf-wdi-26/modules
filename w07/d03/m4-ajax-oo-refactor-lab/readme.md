# <img src="https://cdn.tutsplus.com/gamedev/authors/legacy/Steven%20Lambert/2012/10/28/object-oriented-programming-gamedev.png" height="60"> OOP

| Objectives |
| :--- |
| Refactor Existing Front End JavaScript into OOP |
| Reinforce OOP JavaScript concepts |

## In your last lab we worked did some test driven development to create a JSON api using Express. For this lab we are going to take the front end JavaScript we were given and refactor it into OOP.

#### Requirements

1. Inside of the document ready, we should declare

  ```js
      var app = new App();
  ```

2. Methods can be called on `app` from inside the document ready,

  ```
    app.render();
  ```
 but nothing should be defined!

3. Define all of your variables on App:
  ```js
    function App(){
      this.baseUrl = '/api/todos';
      ...
    };
  ```

4. Attach all of your functions to App's prototype:
  ```js
    App.prototype.render = function() {
      this.$todosList.empty();
      ...
    };
  ```

5. Get that much set up, and then when in doubt, run the code and debug errors one by one.

## Resources
[OOP in JS: What you need to know](http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/)
