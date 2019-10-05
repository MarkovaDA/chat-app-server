const jwt = require('jsonwebtoken');
const sessionModel = require('./../schemas/session');

const verify = token => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_TOKEN, (err, decodedUser) => {
    if (err || !decodedUser) {
      return reject(err);
    }

    sessionModel.findOne({token}, (err, data) => {
      if (err || !data) {
        return reject(err);
      }

      resolve(decodedUser);
    })
  });
})

module.exports = verify;