var UserModel = require('./../schemas/user');
// TODO
lastseen = (_, _, next) => {
  UserModel.updateOne({
    _id: '' //current user id
  }, {
    $set: {
      last_seen: new Date()
    }
  })

  next();
}