const verifyToken = require('../utils/verify.jwt.token');

module.exports = (req, res, next) => {
  // temporary decision
  if (req.path === '/user/login' || req.path === '/user/register' ) {
    next()
    return;
  }
  
  verifyToken(req.headers.token).then((user) => {
    req.user = user;
    next()
  }).catch(() => {
    res.status(403).json({
      message: `Invalid auth token provided`
    });
  })
}