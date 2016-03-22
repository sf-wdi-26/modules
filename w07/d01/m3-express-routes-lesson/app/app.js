
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var bodyParser = require('body-parser');

var candies = [{
    id: 16,
    name: "Chewing Gum",
    color: "Red"
},
{
    id: 20, 
    name: "Pez",
    color: "Green"
},
{
    id: 304,
    name: "Marshmallow",
    color: "Pink"
},
{
    id: 404,
    name: "Candy Stick",
    color: "Blue"
}];

var candy = {};

app.set('views', './views');
app.set('view engine', 'ejs');

// Middleware
app.use(function(req, res, next) {
    console.log('%s request to %s from %s', req.method, req.path, req.ip);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); 

router.get('/', function(req, res){
    res.render('index', { header: 'index!'});
});

router.get('/candies', function(req, res){
    res.json(candies);
});

router.post('/candies', function(req, res){
    // console.log(req.body);
    candy = req.body;

    candies.push(candy);
    res.json(candies);
});

router.get('/candies/:id', function(req, res){
    for (var i = 0; i < candies.length; i++){
        if ( req.params.id == candies[i].id){
            candy = candies[i];
            res.json(candy);
        }
    }
});

router.get('/candies/:id/edit', function(req, res) {
  // SHOW
});

router.put('/candies/:id', function(req, res) {
  var candyUpdate = req.body;
  console.log(candyUpdate);
  candies.params.name = req.body.name;
  candies.params.color = req.body.color;
});

router.delete('/candies/:id', function(req, res) {
  // DELETE
});

app.use('/', router);

app.listen(port);
console.log('Server started on ' + port);