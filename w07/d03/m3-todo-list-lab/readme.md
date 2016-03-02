# <img src="https://cloud.githubusercontent.com/assets/7833470/10899314/63829980-8188-11e5-8cdd-4ded5bcb6e36.png" height="60"> CRUD API: Create & Read

| Objectives |
| :--- |
| Explore the philosophy of Test Driven Development |
| Explore request specs (tests) for READ and CREATE |
| Implement Express routes to READ and CREATE data |

Please head on over to the [Todo API Lab](https://github.com/sf-wdi-26/test-driven-todo-api) and follow the instructions there. The notes below are for reference only.

## Testing Create & Read

#### Testing Setup

1. Install testing modules: `mocha`, `chai`, and `request`:

  ```zsh
  ➜  npm install --save mocha chai request
  ```

2. In the root directory of your Node/Express project, create a testing directory, a file for `mocha` options, and a file for your tests:

  ```zsh
  ➜  mkdir test
  ➜  touch test/mocha.opts
  ➜  touch test/blobsTest.js
  ```

3. In Sublime, edit your `mocha.opts` file to include `--recursive`. This allows you to run tests in all sub-directories at once.

  ```js
  /*
   * mocha.opts
   */

  --recursive
  ```

4. Also in Sublime, open your `package.json`, and change your testing script to `mocha`. This allows you to type `npm test` in your Terminal to run all your tests.

  ```js
  /*
   * package.json
   */

  {
    ...

    "scripts": {
      "test": "mocha"
    },

    ...
  }
  ```

#### Example Request Spec: Read (All)

```js
/*
 * blobsTest.js
 */

var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

describe('Blobs', function() {

  it('should list ALL blobs on GET /blobs', function (done) {
    request(baseUrl + '/blobs', function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
```

#### Example Request Spec: Read (One)

```js
/*
 * blobsTest.js
 */

...

describe('Blobs', function() {

  ...

  it('should list a SINGLE blob on GET /blobs/:id', function (done) {
    request(baseUrl + '/blobs', function (error, response, body) {
      var allBlobs = JSON.parse(body).blobs;
      var singleBlob = allBlobs[allBlobs.length - 1];
      request(baseUrl + '/blobs/' + singleBlob._id, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

});
```

#### Example Request Spec: Create

```js
/*
 * blobsTest.js
 */

...

describe('Blobs', function() {

  ...

  it('should add a NEW blob on POST /blobs', function (done) {
    request.post(
      {
        url: baseUrl + '/blobs',
        form: {
          name: 'WDI 24',
          location: 'SF'
        }
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

});
```

#### Testing Resources

* <a href="http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Vjyor66rSRs" target="_blank">Testing Node.js with Mocha and Chai</a> - Note the syntax of the tests in this article is a little different than what we're using. This is because they're using `chai-http` instead of `request` and `chai.should` instead of `chai.expect`. There are many different ways of putting together testing frameworks to build a testing stack, but no matter the stack, the logic behind the tests translates.
* <a href="http://mochajs.org" target="_blank">Mocha</a> - framework for running tests
* <a href="http://chaijs.com/api" target="_blank">Chai</a> **(expect)** - for *expect* assertions
* <a href="https://github.com/request/request" target="_blank">Request</a> - for handling HTTP requests and responses


## Todo API: Step by Step - Create & Read Routes

### `todos#index`

1. <details>
    <summary>Create a server route to handle the `GET` request (for all `todos`).</summary>
    ```js
    app.get('/api/todos', function index(req, res) {
        // What are you going to send back to the client?
    });
    ```
</details>

2. <details>
    <summary>Respond with the collection of `todos` (remember, we don't have a persistent database yet, so we're using an array called `todos` to represent our "database"). It's best practice to respond with an object rather than an array, so create an object with the key `todos`, and the value should be the collection of `todos`.</summary>
    ```js
    var todos = [
        { _id: 1, task: 'Laundry', description: 'Wash clothes' },
        { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
        { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
    ];

    app.get('/api/todos', function index(req, res) {
      res.json({ todos: todos });
    });
    ```

### `todos#show`

1. <details>
    <summary>Create a server route to handle the `GET` request (for one `todo`).</summary>
    ```js
    app.get('/api/todos/:id', function show (req, res) {
        // How would you know which todo is being requested?
    });
    ```
</details>

2. <details>
    <summary>Get the todo id from the URL params and save it to a variable.</summary>
    ```js
    app.get('/api/todos/:id', function show (req, res) {
      var todoId = parseInt(req.params.id);
      // How woud you grab the todo with that id?
    });
    ```
</details>

3. <details>
    <summary>Use the id to find the todo we want to update (remember, we don't have a persistent database yet, so we're using an array called `todos` to represent our "database"). **Hint:** This is a good opportunity to use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">filter</a>.</summary>
    ```js
    app.get('/api/todos/:id', function show(req, res) {
      var todoId = parseInt(req.params.id);

      var foundTodo = todos.filter(function (todo) {
        return todo._id == todoId;
      })[0];

      // What are you going to send back to the client?
    });
    ```
</details>

4. <details>
    <summary>Respond with the found todo.</summary>
    ```js
    app.get('/api/todos/:id', function show(req, res) {
       var todoId = parseInt(req.params.id);

       var foundTodo = todos.filter(function (todo) {
       return todo._id == todoId;
       })[0];

     res.json(foundTodo);
    });
    ```
</details>

### `todos#create`

1. <details>
    <summary>Create a server route to handle the `POST` request.</summary>
    ```js
    app.post('/api/todos', function create(req, res) {
        // Where does the data for the new todo live?
    });
    ```
</details>

2. <details>
    <summary>Create a new todo with form data (`req.body`).</summary>
    ```js
    app.post('/api/todos', function create(req, res) {
      var newTodo = req.body;

      // How would you "save" the new todo? How do you assign it an _id?
    });
    ```
</details>

3. <details>
    <summary>Set a sequential id for the new todo.</summary>
    ```js
    app.post('/api/todos', function create(req, res) {
      var newTodo = req.body;

      if (todos.length > 0) {
        newTodo._id = todos[todos.length - 1]._id + 1;
      } else {
        newTodo._id = 1;
      }

      // How would you "save" the new todo?
    });
    ```
</details>

4. <details>
    <summary>Add the new todo to the `todos` array (our "database").</summary>
    ```js
    app.post('/api/todos', function create(req, res) {
      var newTodo = req.body;

      if (todos.length > 0) {
        newTodo._id = todos[todos.length - 1]._id + 1;
      } else {
        newTodo._id = 1;
      }

      todos.push(newTodo);

      // What do you send back to the client?
    });
    ```
</details>

5. <details>
    <summary>Respond with the new todo.</summary>
    ```js
    app.post('/api/todos', function create(req, res) {
      var newTodo = req.body;

      if (todos.length > 0) {
        newTodo._id = todos[todos.length - 1]._id + 1;
      } else {
        newTodo._id = 1;
      }

      todos.push(newTodo);

      res.json(newTodo);
    });
    ```
</details>


## Challenges

1. Begin working on your [Todo API](https://github.com/sf-wdi-25/test-driven-todo-api). Follow the tests!
2. Use the steps above to implement routes for reading and creating todos.
3. Test your routes with Postman.

## Resources

* <a href="http://expressjs.com/api.html#req" target="_blank">Express Request Docs</a>
* <a href="http://expressjs.com/api.html#app.get" target="_blank">Express app.get()</a>
* <a href="http://expressjs.com/api.html#app.post.method" target="_blank">Express app.post()</a>
