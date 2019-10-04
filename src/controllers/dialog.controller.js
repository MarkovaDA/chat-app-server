var HttpController = require('./../controllers/http.controller');
var DialogModel = require('./../schemas/dialog');
var UserModel = require('./../schemas/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

class DialogController extends HttpController {
  constructor(socket) {
    super();
    this.socket = socket;
    this.create = this.create.bind(this);
  }
  //authorized user dialog list
  getDialogList(req, res) {
    var authorId = req.activeUser._id;

    DialogModel
      .find({author: authorId})
      .populate(['author', 'partner', 'lastMessage'])
      .exec((err, list) => {
        if (err) {
            return super.notFound()
        }

        res.status(200).json(list);
    });
  }

  create(req, res) {
    req.body.author = req.activeUser._id;

    const { author, partner} = req.body;

    DialogModel.findOne({ author: new ObjectId(author), partner: new ObjectId(partner)}, (err, item) => {
        if (err) {
          res.status(403).json({message: 'Wrong selected partner'});
          return;
        }

        if (item) {
          res.status(403).json({message: 'Dialog with such partner has already exists'});
          return;
        }

        new DialogModel(req.body)
          .save(req, res, DialogModel)
          .then(dialog => {
            this.socket.emit(`NEW:DIALOG_to${dialog.partner}`, dialog);
            res.status(200).json(dialog);
        }).catch((err) => res.status(501).json(err));
      })
  }

  delete(req, res) {
    super.deleteModel(req, res, DialogModel);
  }
}

module.exports = DialogController;