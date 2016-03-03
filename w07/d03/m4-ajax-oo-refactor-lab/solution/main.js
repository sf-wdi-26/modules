// wait for DOM to load before running JS
$(function() {
  app = new App();
  app.render();
  app.get();
  app.setUpPost();
  app.setUpPut();
  app.setUpDelete();
});

function App(){
  this.baseUrl = '/api/todos';
  this.allTodos = [];
  this.$todosList = $('#todos-list');
  this.$createTodo = $('#create-todo');
  this.$source = $('#todos-template').html();
  this.template = Handlebars.compile(this.$source);
};

App.prototype.render = function() {
    this.$todosList.empty();
    this.todosHtml = this.template({ todos: this.allTodos });
    this.$todosList.append(this.todosHtml);
};

App.prototype.get = function() {
  var app = this;
  // GET all todos on page load
  $.get(this.baseUrl, function (data) {
    console.log(data);
    app.allTodos = data.todos;
    app.render();
  });
};

App.prototype.setUpPost = function(){
  var app = this;
  this.$createTodo.on('submit', function (event) {
    event.preventDefault();
    var newTodo = $(this).serialize();

    // POST request to create new todo
    $.post(app.baseUrl, newTodo, function (data) {
      console.log(data);
      app.allTodos.push(data);
      app.render();
    });
    app.$createTodo[0].reset();
    app.$createTodo.find('input').first().focus();
  });
};

App.prototype.setUpPut = function(){
  var app = this;
  this.$todosList.on('submit', '.update-todo', function (event) {
      event.preventDefault();

      // find the todo's id (stored in HTML as `data-id`)
      var todoId = $(this).closest('.todo').attr('data-id');
      // find the todo to update by its id
      var todoToUpdate = app.allTodos.filter(function (todo) {
        return todo._id == todoId;
      })[0];

      // serialze form data
      var updatedTodo = $(this).serialize();

      // PUT request to update todo
      $.ajax({
        type: 'PUT',
        url: app.baseUrl + '/' + todoId,
        data: updatedTodo,
        success: function(data) {
          // replace todo to update with newly updated version (data)
          app.allTodos = data;
          app.render();
        }
      });
    })

App.prototype.setUpDelete = function(){
  var app = this;
  // for delete: click event on `.delete-todo` button
  this.$todosList.on('click', '.delete-todo', function (event) {
    event.preventDefault();

    // find the todo's id (stored in HTML as `data-id`)
    var todoId = $(this).closest('.todo').attr('data-id');

    // find the todo to delete by its id
    var todoToDelete = app.allTodos.filter(function (todo) {
      return todo._id == todoId;
    })[0];

    // DELETE request to delete todo
    $.ajax({
      type: 'DELETE',
      url: app.baseUrl + '/' + todoId,
      success: function(data) {
        // remove deleted todo from all todos
        app.allTodos.splice(app.allTodos.indexOf(todoToDelete), 1);

        // render all todos to view
        app.render();
      }
    });
  });
};
};
