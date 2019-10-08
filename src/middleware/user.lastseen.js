var UserModel = require('./../schemas/user');

module.exports = (req, _, next) => {
  if (req.authData) {
    const username = req.authData.username;
    
    UserModel.findOneAndUpdate(
      { username },
      { $set: { last_seen: new Date() } }
    ).select('-password').exec( (err, user) => {
      req.activeUser = user;
      next();
      // TODO: process somehow this
      if (err) {
        return;
      }
    })
  } else {
    next()
  }
}