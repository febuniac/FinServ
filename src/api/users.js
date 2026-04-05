const router = require('express').Router();
const UserService = require('../services/userService');

router.post('/register', async (req, res) => {
  const user = await UserService.register(req.body);
  res.status(201).json(user);
});
router.post('/login', async (req, res) => {
  const token = await UserService.login(req.body);
  res.json({ token });
});
router.get('/profile', async (req, res) => {
  const profile = await UserService.getProfile(req.user.id);
  res.json(profile);
});
module.exports = router;
