var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");
var server = app.listen(3000);
var io = require('socket.io').listen(server);


app.set("views", __dirname + "/views");
app.use(logger('dev'));
app.set('view engine', 'hbs');
app.use(express.static("public", __dirname + "/public"));
app.use(bodyParser.json());

app.get("/", function(request, response) { response.render("index"); });

//POST Will create a new message and send it to all the socket subscribers
app.post("/message", function(request, response) {
  var message = request.body.message;
  if((message == undefined) || (message.trim().length == 0)) {
    return response.json(400, {error: "Message is invalid"});
  }
  var name = request.body.name;
  io.sockets.emit("incomingMessage", {message: message, name: name});
  response.json(200, {message: "Message received"});

});
