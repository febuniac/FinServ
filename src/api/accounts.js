const router = require('express').Router();
const AccountService = require('../services/accountService');

router.get('/', async (req, res) => {
  const accounts = await AccountService.list(req.user.id);
  res.json(accounts);
});
router.post('/', async (req, res) => {
  const account = await AccountService.create(req.body, req.user.id);
  res.status(201).json(account);
});
router.get('/:id', async (req, res) => {
  const account = await AccountService.getById(req.params.id);
  res.json(account);
});
module.exports = router;
