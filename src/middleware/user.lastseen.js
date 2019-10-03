var UserModel = require('./../schemas/user');

module.exports = (req, _, next) => {
  if (req.authData) {
    const username = req.authData.username;

    UserModel.updateOne(
      { username },
      { $set: { last_seen: new Date() } },
      (err) => {
        // TODO: process somehow this
        if (err) {
          return;
        }
      }
    )
  }

  next();
}