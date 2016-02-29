var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;

var router  = express.Router();kk
// var carRouter = require('./carRouter')
// var carRouter = express.Router();
var carRouter = require('./routes')

var bodyParser = require('body-parser')
var lsRoutes = require('express-ls-routes')

// set

app.set('views', './views');
app.set('view engine', 'ejs')

// middleware
app.use(function(req, res, next) {
  console.log('%s request to %s from %s', req.method, req.path, req.ip);
  next();
});

app.get('/', lsRoutes(app), function (req, res) {
  res.json(200, req.routes)
})

// app.use(bodyParser.urlencoded({ extended: false }));

// // Home

// app.get('/', function(req, res) {
//   // res.send('Hello you mother fucker');
//   res.render('index', { header: 'index!'})
// });

// router.get('/contact', function(req, res) {
//   res.render('contact', { header: 'contact!'});
// });

// router.get('/about', function(req, res) {
//   res.render('about', { header: 'about!'});
// });

// app.use('/', router);

// end

app.use("/cars", carRouter)

app.listen(port);

module.exports.app = app;
