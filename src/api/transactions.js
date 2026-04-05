const router = require('express').Router();
const TransactionService = require('../services/transactionService');

router.get('/', async (req, res) => {
  const txns = await TransactionService.list(req.query);
  res.json(txns);
});
router.post('/transfer', async (req, res) => {
  const result = await TransactionService.transfer(req.body);
  res.json(result);
});
router.get('/:id', async (req, res) => {
  const txn = await TransactionService.getById(req.params.id);
  res.json(txn);
});
module.exports = router;
