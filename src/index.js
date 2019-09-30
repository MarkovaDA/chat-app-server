var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var User = require('./schemas/user');
var UserController = require('./controllers/user.controller');

var app = express();

mongoose.connect('mongodb://localhost:27017/chat', 
  { useNewUrlParser: true },
  { useCreateIndex: true }
);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.send('Hello world!');
});
app.get('/:id', UserController.index);
app.post('/create', UserController.create);

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});