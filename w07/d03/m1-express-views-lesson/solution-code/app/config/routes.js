var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

// require the controller
var candiesController = require('../controllers/candies');

// http://127.0.0.1:3000/candies
router.route('/candies')

  //GET all candies
  .get(candiesController.getAll)

  //POST a new blob
  .post(candiesController.createCandy);


router.route('/candies/:id')

  // GET return specific candy
  .get(candiesController.getCandy)

  // PATCH update existing candy
  .patch(candiesController.updateCandy)

  // DELETE remove specific candy from DB
  .delete(candiesController.removeCandy);


module.exports = router
