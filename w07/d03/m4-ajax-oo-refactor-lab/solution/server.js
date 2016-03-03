// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api/todos/search', function search(req, res){
  res.send('ok')
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos})
});

app.post('/api/todos', function create(req, res) {
  var todo = req.body
  last_todo_id = todos[todos.length - 1]._id;
  todo._id = last_todo_id + 1
  todos.push(todo)
  res.json(todo)
});

app.get('/api/todos/:id', function show(req, res) {
  res.json({_id: 1, task:"", description: ""})
});

app.put('/api/todos/:id', function update(req, res) {
  console.log(req.params.id);
  for(i = 0; i < todos.length; i++){
    if(todos[i]._id == req.params.id){
      todos[i].task = req.body.task;
      todos[i].description = req.body.description;
    };
  };
  res.json(todos)
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = req['params']['id']
  todos.forEach(function(todo){
    if (todo._id == id){
      console.log(todo)
      todos.splice(id - 1, 1)
    }
  })
  console.log(todos)
  res.json({todos: todos})
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('server running on localhost://3000');
});
