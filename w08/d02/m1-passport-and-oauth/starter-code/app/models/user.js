var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  },
  gh: {
    id: String,
    access_token: String,
    name: String
    // firstName: String,
    // lastName: String,
    // email: String
  },
  google: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});