var Food = require("../models/food");

var pagesController = {
  // home page
  home: function(req, res) {
    // find all the foods, only get their name & yuminess, render the home page when done
    Food.find({}, function(err, foods) {
      res.render("pages/home", {foods: JSON.stringify(foods.reverse())});
    })
  }
}

module.exports = pagesController;
