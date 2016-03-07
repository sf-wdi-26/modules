var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'), //used to manipulate POST
    passport = require("passport")

var candiesController = require('../controllers/candies');
var usersController = require('../controllers/users');


var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}


// http://127.0.0.1:3000/candies
router.route('/candies')

  //GET all candies
  .get(candiesController.getAll)

  //POST a new blob
  .post(isAuthenticated, candiesController.createCandy);


router.route('/candies/:id')

  // GET return specific candy
  .get(candiesController.getCandy)

  // PATCH update existing candy
  .patch(candiesController.updateCandy)

  // DELETE remove specific candy from DB
  .delete(isAuthenticated, candiesController.removeCandy);




router.route('/login/facebook').get( usersController.getLogin);


router.route('/login/facebook/callback').get(usersController.getCallback);

router.route('/logout').get(usersController.logout);


module.exports = router