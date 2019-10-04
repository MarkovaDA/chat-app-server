var HttpController = require('./../controllers/http.controller');
var MessageModel = require('./../schemas/message');
var DialogModel = require('./../schemas/dialog');
var mongoose = require('mongoose');
var omit = require('lodash/omit');

var ObjectId = mongoose.Types.ObjectId;
class MessageController extends HttpController {
  constructor(socket) {
    super();

    this.socket = socket;
    this.create = this.create.bind(this);
  }

  getMessageListByDialogId(req, res) {
    var dialogId = req.params.id;

    MessageModel
      .find({dialog: dialogId})
      .populate(['dialog'])
      .exec((err, messages) => {
        if (err) {
            return super.handleNotFound(res)
        }

        res.status(200).json(messages);
    });
  }

  create(req, res) {
    const { text, unread, dialog, user } = req.body;

    var message = new MessageModel({
      text: text,
      unread: unread,
      dialog: dialog,
      user: new ObjectId(user)
    });

    message.save((err, message) => {
      if (err) {
        return res.status(400).json(err)
      }

      MessageModel.populate(message, ['user', 'dialog'])
        .then(doc => {
          this.socket.emit(`NEW:MESSAGE_to${doc.dialog.author}`, omit(doc, 'user.password'))
        })
        .catch(() => {})

      DialogModel.updateOne(
        { '_id': dialog },
        { $set: { lastMessage: new ObjectId(message._id) }}, 
        (err, _) => {
          if (err) {
            return res.status(400).json(err)
          }

          res.status(201).json(message)
        })
    });
  }

  delete(req, res) {
    super.deleteModel(req, res, MessageModel);
  }
}

module.exports = MessageController;