var Quote = require('../models/Quote');


// INDEX
function getAll(req, res) {
  Quote.find(function(err, quotes) {
    if(err) res.json({message: 'Could not find any quote'});

    // res.json({quotes: quotes});
    res.render('./index', {quotes: quotes});

  });
}

// NEW
function newQuote(req,res){
  // console.log('hello from new quote');
  res.render('./quotes/new');
}

// CREATE
function createQuote(req, res) {
  console.log('in POST');
  // console.log('body:',req.body);
  var quote = new Quote({'text': req.body.quote.text, 'author': req.body.quote.author});
  console.log(quote);

  quote.save(function(err) {
    if(err) res.json({messsage: 'Could not ceate quote: ' + err});
    // res.json(quote);
    res.redirect("/quotes");
  });
}

// SHOW
function getQuote(req, res) {
  var id = req.params.id;
    if (id == "hello"){
      console.log("yes, it is hello");
      res.render('hello');
    } else {
    Quote.findById({_id: id}, function(err, quote) {
      if(err) {
        res.json({ message: 'Could not get quote: ' + id });
      } else {
        res.json({quote: quote});
      }
    });
   }
}

// UPDATE
function updateQuote(req, res) {
  var id = req.params.id;
  Quote.findById({_id: id}, function(err, quote) {
    if(err) res.json({message: 'Could not update quote: ' + err});

    if (req.body.text) { 
      quote.text = req.body.text;
    }
    if (req.body.author) {
      quote.author = req.body.author; 
    }

    quote.save(function(err) {
      if(err) res.json({messsage: 'Could not save updated quote: ' + err});

      res.json({message: 'Quote successfully updated'});
    });
  });
}

// DELETE
function removeQuote(req, res) {
  var id = req.params.id;

  Quote.remove({_id: id}, function(err) {
    if(err) res.json({message: 'Could not delete quote: ' + err});

    res.json({message: 'Quote successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  newQuote: newQuote,
  createQuote: createQuote,
  getQuote: getQuote,
  updateQuote: updateQuote,
  removeQuote: removeQuote
};