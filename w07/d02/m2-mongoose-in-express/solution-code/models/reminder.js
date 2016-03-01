// requiring mongoose dependency
var mongoose = require('mongoose');

// defining schema for reminders
var ReminderSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: { type : Date, default: Date.now() }
});
// define the model
var Reminder = mongoose.model("Reminder", ReminderSchema);
// export the model to any files that `require` this one
module.exports = Reminder;
