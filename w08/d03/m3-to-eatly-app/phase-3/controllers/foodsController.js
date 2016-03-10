var Food = require("../models/food");

var foodsController = {
  index: function(req, res) {
    Food.find({}, function(err, foods) {
      // send back a JSON response of all the foods, reverse-ordered
      res.status(200).send(JSON.stringify(foods.reverse()));
    })
  },
  create: function(req, res) {
    var name = req.body.name;
    var yuminess = parseInt(req.body.yuminess);
    Food.create({name: name, yuminess: yuminess}, function(err, food) {
      err ?
        // handle error
        res.status(500).send() :
        // handle success
        res.status(201).send(JSON.stringify(food));
    });
  },
  destroy: function(req, res) {
    Food.remove({_id: req.params.id}, function(err, food) {
      err ?
        res.status(500).send() :
        res.status(204).send(JSON.stringify(food));
    })
  }
}

module.exports = foodsController;
