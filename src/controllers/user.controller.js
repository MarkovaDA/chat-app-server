var UserModel = require('./../schemas/user');
var HttpController = require('./../controllers/http.controller'); 
var createJWTToken = require('../utils/create.jwt.token');
var encrypt = require('./../utils/encrypt');

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
        const { username, password } = req.body;

        UserModel.findOne({username}, (err, user) => {
            if (err || !user) {
                return super.handleNotFound(res, 'User not found');
            }

            if (encrypt.validPassword(password, user.password)) {
                const token = createJWTToken({ username, password});
                res.status(200).json({token}) 
            } else {
                super.handleUnauthorized(res)
            }
        })
    }

    register(req, res) {
        const password = req.body.password;
        req.body.password = encrypt.generateHash(password);
        super.createModel(req, res, UserModel);     
    }

    delete(req, res) {
        super.deleteModel(req, res, UserModel);
    }
}

module.exports = new UserController();