var UserController = require('./controllers/user.controller');
var DialogController = require('./controllers/dialog.controller');
var MessageController = require('./controllers/message.controller');

module.exports = (app, socket) => {
  const userController = new UserController(socket);
  const dialogController = new DialogController(socket);
  const messageController = new MessageController(socket);

  app.get('/', (_, res) => {
    res.send('Hello world!');
  });
  
  app.get('/user/:id', userController.getUserById);
  
  app.post('/user/register', userController.register);
  app.post('/user/login', userController.login);
  app.delete('/user/delete/:id', userController.delete);
  
  app.get('/dialogs', dialogController.getDialogList);
  app.post('/dialog/create', dialogController.create);
  app.delete('/dialog/:id', dialogController.delete);
  
  app.get('/messages/:id', messageController.getMessageListByDialogId);
  app.post('/message/create', messageController.create);
}