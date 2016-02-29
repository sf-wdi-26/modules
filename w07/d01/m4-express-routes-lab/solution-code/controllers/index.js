var express = require('express')
  , router = express.Router()

router.use('/candies', require('./candies'))



module.exports = router
