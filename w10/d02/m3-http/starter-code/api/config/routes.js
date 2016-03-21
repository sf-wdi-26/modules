var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var presidentsController = require('../controllers/presidents');

// http://127.0.0.1:3000/presidents
router.route('/presidents')

  //GET all presidents
  .get(presidentsController.getAll)

  //POST a new blob
  .post(presidentsController.createPresident);


router.route('/presidents/:id')

  // GET return specific candy
  .get(presidentsController.getPresident)

  // PATCH update existing candy
  .patch(presidentsController.updatePresident)

  // DELETE remove specific candy from DB
  .delete(presidentsController.removePresident);


module.exports = router