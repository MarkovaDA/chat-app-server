var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');

var userController = require('./controllers/user.controller');
var dialogController = require('./controllers/dialog.controller');
var messageController = require('./controllers/message.controller');

var app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/chat',
  (err) => {
    if (err) throw err
  }
)

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.get('/user/:id', userController.getUserById);
app.post('/user/create', userController.create);
app.delete('/user/delete/:id', userController.delete);

app.get('/dialog/:id', dialogController.getDialogListByAuthorId);
app.post('/dialog/create', dialogController.create);
app.delete('/dialog/:id', dialogController.delete);

app.get('/message?dialog=:id', messageController.getMessageListByDialogId);
app.post('/message/create', messageController.create);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});