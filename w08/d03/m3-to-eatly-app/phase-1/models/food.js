// requiring mongoose dependency
var mongoose = require('mongoose');
// use bluebird to help mongoose use promises
// mongoose.promise = require('bluebird');

// defining schema for foods
var FoodSchema = new mongoose.Schema({
  name: {type: String, required: true},
  yuminess: Number,
  createdAt: { type : Date, default: Date.now() }
});

// create a method directly on the model: `all`
FoodSchema.statics.all = function all(cb) {

  // return
  //   this.model.find({})
  //   .catch(function(err) {
  //     console.log(err);
  //   })
  //   .then(function(foods) {
  //     cb(foods);
  //   })
  // ;

  return
    this.model.find({})
    .catch(function(err) {
      console.log(err);
    })
    .then(function(foods) {
      cb(foods);
    })
  ;
>>>>>>> d9975323f3f770a9ae1996ee3f04c67cb594c087
}

// todo: `FoodSchema.methods.updateAttributes`

// define the model
var Food = mongoose.model("Food", FoodSchema);
// export the model to any files that `require` this one
module.exports = Food;
