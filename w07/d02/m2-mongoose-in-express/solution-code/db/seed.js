var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/reminders');
var Reminder = require("../models/reminder");
Reminder.remove({}, function(err) {
  if (err) {
    console.log("ERROR:", err);
  }
})

var reminders = [
  {
    title: "Cat",
    body: "Figure out his halloween costume for next year"
  },
  {
    title: "Laundry",
    body: "Color-code socks"
  },
  {
    title: "Spanish",
    body: "Learn to count to ten to impress the ladies"
  }
];

Reminder.create(reminders, function(err, docs) {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Created:", docs)
    mongoose.connection.close();
  }
});
