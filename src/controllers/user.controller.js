var UserModel = require('./../schemas/user');
var HttpController = require('./../controllers/http.controller'); 
var createJWTToken = require('../utils/create.jwt.token');
var encrypt = require('./../utils/encrypt');

class UserController extends HttpController {
    constructor(socket) {
        super();
        this.socket = socket;
    }

    getUsers(req, res) {
        UserModel.find({}, (err, list) => {
            if (err) {
                return super.notFound()
            }
            //TODO: cut out password
            res.json(list)
        })
    }

    getUserById(req, res) {
        var id = req.params.id;

        UserModel.findById(id, (err, user) => {
            if (err) {
                return super.notFound()
            }

            res.json(user);
        });
    }

    login(req, res) {
        const { username, password } = req.body;

        UserModel.findOne({username}, (err, user) => {
            if (err || !user) {
                return super.notFound(res, 'User not found');
            }

            if (encrypt.validPassword(password, user.password)) {
                const token = createJWTToken({ username, password});
                res.status(200).json({token}) 
            } else {
                super.unAuthorized(res)
            }
        })
    }

    logout() {

    }

    register(req, res) {
        const password = req.body.password;
        req.body.password = encrypt.generateHash(password);
        super.createModel(req, res, UserModel);     
    }

    delete(req, res) {
        req.params.id = req.activeUser._id;
        super.deleteModel(req, res, UserModel);
    }
}

module.exports = UserController;