var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var userController = require('./controllers/user.controller');
var dialogController = require('./controllers/dialog.controller');
var messageController = require('./controllers/message.controller');

var app = express();

mongoose.connect('mongodb://localhost:27017/chat', 
  { useNewUrlParser: true },
  { useCreateIndex: true },
  { useFindAndModify: true }
);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.get('user/:id', userController.get);
app.post('user/create', userController.create);
app.delete('user/delete/:id', userController.delete);

app.get('/dialogs/:id', dialogController.get);
app.post('/dialogs', dialogController.create);
app.delete('/dialogs/:id', dialogController.delete);

app.get('/messages/dialog/:id', messageController.get);
app.post('/messages/dialog', messageController.create);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});