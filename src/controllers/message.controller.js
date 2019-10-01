var MessageModel = require('./../schemas/message');

class MessageController {
  // get messages by dialogId
  get(req, res) {
    var dialogId = req.params.id;

    MessageModel
      .find({dialog: dialogId})
      .populate(['dialog'])
      .exec((err, messages) => {
        if (err) {
            return res.status(404).json({
                message: `Not found`
            });
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
      user: userId  // how wrote the message
    });

    message.save((err, message) => {
      if (err) {
        return res.status(400).json(err)
      }

      res.status(201).json(message)
    });
  }
}

module.exports = new MessageController();