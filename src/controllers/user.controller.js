var UserModel = require('./../schemas/user');

class UserController { 
    getUserById(req, res) {
        var id = req.params.id;

        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: `Not found`
                });
            }

            res.json(user);
        });
    }

    create(req, res) {
        var user = new UserModel(req.body);
        
        user.save((err, user) => {
            if (err) {
                return res.status(400).json(err)
            }

            res.status(200).json(user)
        });     
    }

    delete(req, res) {
        UserModel.findOneAndDelete({_id: req.params.id}, (err, user) => {
            if (err) {
              return res.status(404).json({message: `Not found`})
            } 

            if (!user) {
                res.status(404).json({message: `Not found`})
            } else {
                res.status(204).json(user)
            }
        })
    }
}

module.exports = new UserController();