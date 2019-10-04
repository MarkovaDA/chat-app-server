var express = require('express');
var parser = require('body-parser');
var dotenv = require('dotenv');
var createRoutes = require('./routes');
var createMongoose = require('./db.connect');

var app = express();
var http = require('http').createServer(app);
var socket = require('socket.io')(http);

var mongoSanitize = require('express-mongo-sanitize');
var authMiddleware = require('./middleware/user.authorized');
var lastseenMiddleware = require('./middleware/user.lastseen');

createMongoose();


socket.on('connection', (socket) => {
  console.log('SOCKET CONNECTED')
});

dotenv.config();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(authMiddleware);
app.use(lastseenMiddleware);

createRoutes(app, socket);

http.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});