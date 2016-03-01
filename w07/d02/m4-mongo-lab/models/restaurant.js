var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  // Restuarant EMBEDS Food
  foods: [FoodSchema]
});

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;