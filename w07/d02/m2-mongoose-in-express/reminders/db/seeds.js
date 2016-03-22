var mongoose = require('mongoose'),
        conn = mongoose.connect('mongodb://localhost/reminders'),
    Reminder = require('../models/reminder');

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

// clears db
  Reminder.remove({}, function(err){
    if (err){
      console.log(err);
    } else {
      Reminder.create(reminders, function(err, docs) {
        if (err) {
          console.log(err)
        } else {
          console.log("created:" + docs)
          mongooe.connection.close();
        }
      });
    }
  })
