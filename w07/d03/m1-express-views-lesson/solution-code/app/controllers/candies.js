var Candy = require('../models/Candy');

// GET
function getAll(req, res){
  Candy.find(function(err, candies){
    if(err) res.json({message: 'Could not find candy'});

    res.render('../views/layout', {candies: candies});
  });
}

// POST
function createCandy(req, res){
  console.log('in POST');
  console.log('body:',req.body);

  var candy = new Candy();
  candy.name = req.body.name;
  candy.color = req.body.color;

  candy.save(function(err){
    if(err) res.json({message: 'Could not get candy because: ' + err});
    res.redirect('/candies');
  });
}

// GET
function getCandy(req, res) {
  var id = req.params.id;

  Candy.findById({_id: id}, function(err, candy) {
    if(err) res.json({message: 'Could not find candy b/c:' + err});

    res.json({candy: candy});
  });
}

function updateCandy(req, res) {
  var id = req.params.id;

  Candy.findById({_id: id}, function(err, candy) {
    if(err) res.json({message: 'Could not find candy b/c: ' + err});

    if(req.body.name) candy.name = req.body.name;
    if(req.body.color) candy.color = req.body.color;

    candy.save(function(err) {
      if(err) res.json({messsage: 'Could not update candy b/c: ' + err});

      res.json({message: 'Candy successfully updated'});
    });
  });
}

function removeCandy(req, res) {
  var id = req.params.id;

  Candy.remove({_id: id}, function(err) {
    if(err) res.json({message: 'Could not delete candy b/c: ' + err});

    res.json({message: 'Candy successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  createCandy: createCandy,
  getCandy: getCandy,
  updateCandy: updateCandy,
  removeCandy: removeCandy
};
