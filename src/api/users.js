const router = require('express').Router();
const UserService = require('../services/userService');
const { errorResponse } = require('../utils/errorResponse');

router.post('/register', async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to register user');
  }
});
router.post('/login', async (req, res) => {
  try {
    const token = await UserService.login(req.body);
    res.json({ token });
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to login');
  }
});
router.get('/profile', async (req, res) => {
  try {
    const profile = await UserService.getProfile(req.user.id);
    res.json(profile);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to retrieve profile');
  }
});
module.exports = router;
