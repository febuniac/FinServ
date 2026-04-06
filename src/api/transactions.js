const router = require('express').Router();
const TransactionService = require('../services/transactionService');
const { errorResponse } = require('../utils/errorResponse');

router.get('/', async (req, res) => {
  try {
    const txns = await TransactionService.list(req.query);
    res.json(txns);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to list transactions');
  }
});
router.post('/transfer', async (req, res) => {
  try {
    const result = await TransactionService.transfer(req.body);
    res.json(result);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to process transfer');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const txn = await TransactionService.getById(req.params.id);
    if (!txn) return errorResponse(res, 404, 'Transaction not found');
    res.json(txn);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to retrieve transaction');
  }
});
module.exports = router;
