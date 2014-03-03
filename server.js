
var express = require('express');
var app = express();
app.use(express.bodyParser());


app.get('/', function(req, res) {
    res.type('text/plain');
    res.json(quotes);
});

app.get('/list/:id', function(req, res) {

    if (quotes.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No quote found');
    }

    var response = quotes[req.params.id];
    res.json(response);
});

app.post('/list', function(req, res) {
    if (!req.body.hasOwnProperty('author') ||
            !req.body.hasOwnProperty('text')) {
        res.statusCode = 400;
        return res.send('Error 400: Post syntax incorrect.');
    }

    var newList = {
        list: req.body.list,
        items: req.body.items
    };

    quotes.push(newQuote);
    res.json(true);
});


app.delete('/list/:id', function(req, res) {
  if(quotes.length <= req.params.id) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }

  quotes.splice(req.params.id, 1);
  res.json(true);
});

app.listen(3000);
console.log('Listening on port 3000');