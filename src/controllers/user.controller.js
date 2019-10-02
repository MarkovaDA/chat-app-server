var UserModel = require('./../schemas/user');
var HttpController = require('./../controllers/http.controller'); 
var createJWTToken = require('./../utils/createJWTToken');

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

    login(req, res) {
        //TODO: save cashed passwords
        const { username, password } = req.body;

        UserModel.findOne({username}, (err, user) => {
            if (err || !user) {
                return super.handleNotFound(res, 'User not found');
            }

            if (user.password === password) {
                const token = createJWTToken({ username, password});
                res.status(200).json({token}) 
            } else {
                super.handleUnauthorized(res)
            }
        })
    }

    create(req, res) {
        super.createModel(req, res, UserModel);     
    }

    delete(req, res) {
        super.deleteModel(req, res, UserModel);
    }
}

module.exports = new UserController();