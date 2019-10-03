var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var dotenv = require('dotenv');

var userController = require('./controllers/user.controller');
var dialogController = require('./controllers/dialog.controller');
var messageController = require('./controllers/message.controller');

dotenv.config();

var app = express();
var mongoSanitize = require('express-mongo-sanitize');
var authMiddleware = require('./middleware/user.authorized');
var lastseenMiddleware = require('./middleware/user.lastseen');

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
app.use(mongoSanitize());
app.use(authMiddleware);
app.use(lastseenMiddleware);

app.get('/', (_, res) => {
  res.send('Hello world!');
});

app.get('/user/:id', userController.getUserById);

app.post('/user/register', userController.register);
app.post('/user/login', userController.login);
app.delete('/user/delete/:id', userController.delete);

app.get('/dialog/:id', dialogController.getDialogListByAuthorId);
app.post('/dialog/create', dialogController.create);
app.delete('/dialog/:id', dialogController.delete);

app.get('/message?dialog=:id', messageController.getMessageListByDialogId);
app.post('/message/create', messageController.create);

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
