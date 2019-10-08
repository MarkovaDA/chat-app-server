var UserModel = require('./../schemas/user');
var SessionModel = require('./../schemas/session');
var HttpController = require('./../controllers/http.controller'); 
var createJWTToken = require('../utils/create.jwt.token');
var encrypt = require('./../utils/encrypt');

class UserController extends HttpController {
    constructor(socket) {
        super();
        this.socket = socket;
        this.getUsers = this.getUsers.bind(this);
    }

    getUserByToken(req, res) {
        res.status(200).json(req.activeUser);
    }

    getUsers(req, res) {
        UserModel.find({}, '-password, -last_seen', (err, list) => {
            if (err) {
                return super.notFound()
            }

            res.json(list);
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

                SessionModel.findOneAndUpdate({
                    userId: user._id
                }, {token}, {upsert: true}).then(() => {
                    res.status(200).json({token});
                }).catch((err) => {
                    res.status(500).json({message: 'Error during session creation'})
                })
            } else {
                super.unAuthorized(res)
            }
        })
    }

    logout(req, res) {
        SessionModel
            .findOneAndDelete({token: req.headers.token}, 
                (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(200).json(data);
            });
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