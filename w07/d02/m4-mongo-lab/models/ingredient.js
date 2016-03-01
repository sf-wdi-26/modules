var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  title: {
    type: String,
    default: ""
  }
});

var Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;