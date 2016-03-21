var Criminal = require('../models/Criminal');

// GET
function getAll(request, response) {
  Criminal.find(function(error, criminals) {
    if(error) response.json({message: 'Could not find any criminal'});

    response.json({criminals: criminals});
  }).select('-__v');
}

// POST
function createCriminal(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var criminal = new Criminal(request.body);

  criminal.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate criminal b/c:' + error});

    response.json({criminal: criminal});
  });
}

// GET
function getCriminal(request, response) {
  var id = request.params.id;

  Criminal.findById({_id: id}, function(error, criminal) {
    if(error) response.json({message: 'Could not find criminal b/c:' + error});

    response.json({criminal: criminal});
  }).select('-__v');
}

function updateCriminal(request, response) {
  var id = request.params.id;

  Criminal.findById({_id: id}, function(error, criminal) {
    if(error) response.json({message: 'Could not find criminal b/c:' + error});

    if(request.body.name) criminal.name = request.body.name;
    if(request.body.location) criminal.location = request.body.location;
    if(request.body.status) criminal.status = request.body.status;

    criminal.save(function(error) {
      if(error) response.json({messsage: 'Could not update criminal b/c:' + error});

      response.json({message: 'Criminal successfully updated', criminal: criminal});
    });
  }).select('-__v');
}

function removeCriminal(request, response) {
  var id = request.params.id;

  Criminal.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete criminal b/c:' + error});

    response.json({message: 'Criminal successfully deleted'});
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createCriminal: createCriminal,
  getCriminal: getCriminal,
  updateCriminal: updateCriminal,
  removeCriminal: removeCriminal
}