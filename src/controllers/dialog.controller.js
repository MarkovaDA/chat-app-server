var DialogModel = require('./../schemas/dialog');

class DialogController {
  get(req, res) {
    var authorId = req.params.id;

    DialogModel
      .find({author: authorId})
      .populate(['author', 'partner'])
      .exec((err, list) => {
        if (err) {
            return res.status(404).json({
                message: `Not found`
            });
        }

        res.status(200).json(list);
    });
  }

  create(req, res) {
    var dialog = new DialogModel({
      author: req.body.author,
      partner: req.body.partner,
      lastMessage: req.body.messageId
    });

    dialog.save((err, item) => {
      if (err) {
        return res.status(400).json(err)
      }

      res.status(201).json(item)
    });
  }

  delete(req, res) {
    DialogModel.findOneAndDelete({_id: req.params.id}, (err, dialog) => {
        if (err) {
          return res.status(404).json({message: `Not found`})
        } 

        if (!user) {
            res.status(404).json({message: `Not found`})
        } else {
            res.status(204).json(dialog)
        }
    })
  }

}

module.exports = new DialogController();