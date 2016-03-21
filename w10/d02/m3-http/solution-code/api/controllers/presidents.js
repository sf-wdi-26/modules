var President = require('../models/President');

// GET
function getAll(request, response) {
  President.find(function(error, presidents) {
    if(error) response.json({message: 'Could not find any president'});

    response.json({presidents: presidents});
  });
}

// POST
function createPresident(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var president = new President(request.body);

  president.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate president b/c:' + error});

    response.json({president: president});
  });
}

// GET
function getPresident(request, response) {
  var id = request.params.id;

  President.findById({_id: id}, function(error, president) {
    if(error) response.json({message: 'Could not find president b/c:' + error});

    response.json({president: president});
  });
}

function updatePresident(request, response) {
  var id = request.params.id;

  President.findById({_id: id}, function(error, president) {
    if(error) response.json({message: 'Could not find president b/c:' + error});

    if(request.body.name) president.name = request.body.name;
    if(request.body.start) president.start = request.body.start;
    if(request.body.end) president.end = request.body.end;

    president.save(function(error) {
      if(error) response.json({messsage: 'Could not update president b/c:' + error});

      response.json({message: 'President successfully updated', president: president});
    });
  });
}

function removePresident(request, response) {
  var id = request.params.id;

  President.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete president b/c:' + error});

    response.json({message: 'President successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  createPresident: createPresident,
  getPresident: getPresident,
  updatePresident: updatePresident,
  removePresident: removePresident
}