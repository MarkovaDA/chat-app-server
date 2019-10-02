var HttpController = require('./../controllers/http.controller');
var MessageModel = require('./../schemas/message');
var DialogModel = require('./../schemas/dialog');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
class MessageController extends HttpController {

  getMessageListByDialogId(req, res) {
    var dialogId = req.params.id;

    MessageModel
      .find({dialog: dialogId})
      .populate(['dialog'])
      .exec((err, messages) => {
        if (err) {
            return super.handleNotFound()
        }

        res.status(200).json(messages);
    });
  }

  create(req, res) {
    const { text, unread, dialogId, userId } = req.body;

    var message = new MessageModel({
      text: text,
      unread: unread,
      dialog: dialogId,
      user: userId
    });

    message.save((err, message) => {
      if (err) {
        return res.status(400).json(err)
      }

      DialogModel.updateOne(
        { '_id': dialogId },
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

module.exports = new MessageController();