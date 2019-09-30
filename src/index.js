var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var app = express();

var User = require('./schemas/user');

mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true});

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.send('Hello world!');
});

app.post('/create', function(req, res) {
  var user = new User(req.body);

  user.save().then(function(obj) {
    res.json(obj);
  }).catch(function(err) {
    res.json(err);
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});