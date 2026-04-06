const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/errorResponse');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return errorResponse(res, 401, 'Authentication required');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    errorResponse(res, 401, 'Invalid token');
  }
};
