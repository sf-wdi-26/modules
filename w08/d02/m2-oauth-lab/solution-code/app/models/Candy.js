var mongoose = require('mongoose');

var CandySchema = mongoose.Schema({
	name: String,
	color: String
});

module.exports = mongoose.model('Candy', CandySchema);