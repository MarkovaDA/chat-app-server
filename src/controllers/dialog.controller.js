var HttpController = require('./../controllers/http.controller');
var DialogModel = require('./../schemas/dialog');

class DialogController extends HttpController {
  getDialogListByAuthorId(req, res) {
    var authorId = req.params.id;

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
    super.createModel(req, res, DialogModel);
  }

  delete(req, res) {
    super.deleteModel(req, res, DialogModel);
  }
}

module.exports = new DialogController();