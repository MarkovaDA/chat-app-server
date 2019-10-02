const verifyToken = require('./../utils/verifyJWTToken');

module.exports = (req, res, next) => {
  if (req.path === '/user/login') {
    next()
    return;
  }

  verifyToken(token).then((user) => {
    req.user = user;
    next()
  }).catch(() => {
    res.status(403).json({
      message: `Invalid auth token provided`
    });
  })
}