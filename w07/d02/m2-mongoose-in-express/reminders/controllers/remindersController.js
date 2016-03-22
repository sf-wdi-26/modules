var Reminder = require('../models/reminder');

var remindersController = {
  index: function(req, res) {
    Reminder.find({}, function(err, docs) {
      res.render("reminders/index", {reminders: docs});
    });
  },
  new: function(req, res) {
    res.render('reminders/new');
  },
  create: function(req, res) {
    var title = req.body.title;
    var body = req.body.body;
    Reminder.create({title: title, body: body}, function(err, data) {
      err ? res.redirect('reminders/new') : res.redirect('/reminders')
    });
  },
  show: function(req, res) {
    var id = req.params.id
    Reminder.findById(id, function(err, data) {
      err ? res.redirect('/reminders') : res.render('reminders/show', {reminder: data});
    });
  }
}

module.exports = remindersController;