var mongoose = require('mongoose');

var ReminderSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: { type : Date, default: new Date() }
})

var Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = Reminder;