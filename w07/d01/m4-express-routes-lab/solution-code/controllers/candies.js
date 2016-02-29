
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST


candies = [
{id: 1, name: "Chewing Gum" , color: "Red"},
{id: 2, name: "Pez"         , color: "Green"},
{id: 3, name: "Marshmallow" , color: "Pink"},
{id: 4, name: "Candy Stick" , color: "Blue"}
]


// http://127.0.0.1:3000/candies
router.route('/')
  //GET all candies
  .get(function(req, res, next) {
    res.json(candies);
  })
  //POST a new blob
  .post(function(req, res) {
    candies.push(req.body)
    res.json(req.body);
  });

// Show a candy
router.route('/:id').get(function(req,res){

    candy = candies.filter(function(element){ return element["id"] == req.params.id })[0]
    res.json(candy)
  })
  .delete(function(req, res){
    for(i in candies){
      if(candies[i]["id"] == req.params.id){
        delete candies[i]
      }
    }
    res.json({message : 'deleted' });
  });

//Update a candy
router.put('/:id/edit', function(req, res) {
  for(i in candies){
    if(candies[i]["id"] == req.params.id){
      candies[i] = req.body
    }
  }
  res.format({
    json: function(){ res.json(req.body); }
  });
});



module.exports = router
