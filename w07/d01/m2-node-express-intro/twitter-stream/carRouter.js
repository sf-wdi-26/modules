require('./app')
var express = require('express');
// app.use("/cars", carRouter)

var carRouter = express.Router();
// Car Routes

carRouter.get('/', function(req, res) {
  res.render('index', { cars: ["Porsche", "Ferrari"]})
});

carRouter.get('/:id', function(req, res) {
  // SHOW
});

carRouter.get('/new', function(req, res) {
  // NEW
});

carRouter.post('/', function(req, res) {
  // CREATE
});

carRouter.get('/:id/edit', function(req, res) {
  // SHOW
});

carRouter.put('/:id', function(req, res) {
  // UPDATE
});

carRouter.delete('/:id', function(req, res) {
  // DELETE
});


module.exports.carRouter = carRouter;