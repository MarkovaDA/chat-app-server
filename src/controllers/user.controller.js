var UserModel = require('./../schemas/user');
var HttpController = require('./../controllers/http.controller'); 
class UserController extends HttpController { 
    getUserById(req, res) {
        var id = req.params.id;

        UserModel.findById(id, (err, user) => {
            if (err) {
                return super.handleNotFound()
            }

            res.json(user);
        });
    }

    create(req, res) {
        super.createModel(req, res, UserModel);     
    }

    delete(req, res) {
        super.deleteModel(req, res, UserModel);
    }
}

module.exports = new UserController();