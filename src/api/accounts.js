const router = require('express').Router();
const AccountService = require('../services/accountService');
const { errorResponse } = require('../utils/errorResponse');

router.get('/', async (req, res) => {
  try {
    const accounts = await AccountService.list(req.user.id);
    res.json(accounts);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to list accounts');
  }
});
router.post('/', async (req, res) => {
  try {
    const account = await AccountService.create(req.body, req.user.id);
    res.status(201).json(account);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to create account');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const account = await AccountService.getById(req.params.id);
    if (!account) return errorResponse(res, 404, 'Account not found');
    res.json(account);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to retrieve account');
  }
});
module.exports = router;
