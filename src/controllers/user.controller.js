var UserModel = require('./../schemas/user');

class UserController { 
    index(req, res) {
        var id = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                });
            }

            res.json(user);
        });
    }

    create(req, res) {
        var user = new UserModel(req.body);
        
        user.save().then((obj) => {
            res.json(obj);
        }).catch((err) => {
            res.json(err);
        });        
    }
}

module.exports = new UserController();