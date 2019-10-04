var HttpController = require('./../controllers/http.controller');
var DialogModel = require('./../schemas/dialog');

class DialogController extends HttpController {
  constructor(socket) {
    super();
    this.socket = socket;
  }
  //authorized user dialog list
  getDialogList(req, res) {
    var authorId = req.activeUser._id;

    DialogModel
      .find({author: authorId})
      .populate(['author', 'partner', 'lastMessage'])
      .exec((err, list) => {
        if (err) {
            return super.handleNotFound()
        }

        res.status(200).json(list);
    });
  }

  create(req, res) {
    req.body.author = req.activeUser._id;
    super.createModel(req, res, DialogModel);
  }

  delete(req, res) {
    super.deleteModel(req, res, DialogModel);
  }
}

module.exports = DialogController;