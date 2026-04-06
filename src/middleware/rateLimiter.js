const { errorResponse } = require('../utils/errorResponse');

const rateLimit = {};
module.exports = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  if (!rateLimit[key]) rateLimit[key] = [];
  rateLimit[key] = rateLimit[key].filter(t => now - t < 60000);
  if (rateLimit[key].length >= 100) {
    return errorResponse(res, 429, 'Rate limit exceeded');
  }
  rateLimit[key].push(now);
  next();
};
