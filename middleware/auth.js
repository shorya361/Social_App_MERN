const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token
  const token = req.header('x-auth-token');

  // Check if NO token
  if (!token) {
    return res.status(401).json({
      msg: ' No token ,authorization denied',
    });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
