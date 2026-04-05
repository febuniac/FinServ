const router = require('express').Router();
const PaymentService = require('../services/paymentService');

router.post('/process', async (req, res) => {
  const result = await PaymentService.process(req.body);
  res.json(result);
});
router.post('/refund', async (req, res) => {
  const result = await PaymentService.refund(req.body);
  res.json(result);
});
router.get('/history', async (req, res) => {
  const history = await PaymentService.getHistory(req.user.id);
  res.json(history);
});
module.exports = router;
