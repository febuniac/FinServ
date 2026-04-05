const rateLimit = {};
module.exports = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  if (!rateLimit[key]) rateLimit[key] = [];
  rateLimit[key] = rateLimit[key].filter(t => now - t < 60000);
  if (rateLimit[key].length >= 100) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  rateLimit[key].push(now);
  next();
};
