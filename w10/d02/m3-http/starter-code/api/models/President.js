var mongoose = require('mongoose');

var PresidentSchema = mongoose.Schema({
	name: String,
  start: Number,
	end: Number
});

module.exports = mongoose.model('President', PresidentSchema);