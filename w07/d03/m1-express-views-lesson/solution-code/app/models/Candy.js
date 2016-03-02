var mongoose = require('mongoose');

var CandySchema = mongoose.Schema({
	name: String,
	color: String
});

var Candy = mongoose.model('Candy', CandySchema);

module.exports = Candy;
