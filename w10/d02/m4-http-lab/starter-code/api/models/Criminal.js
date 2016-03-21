var mongoose = require('mongoose');

var CriminalSchema = mongoose.Schema({
	name: String,
  location: String,
	status: String
});

module.exports = mongoose.model('Criminal', CriminalSchema);

