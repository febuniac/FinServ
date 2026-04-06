const router = require('express').Router();
const PaymentService = require('../services/paymentService');
const { errorResponse } = require('../utils/errorResponse');

router.post('/process', async (req, res) => {
  try {
    const result = await PaymentService.process(req.body);
    res.json(result);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to process payment');
  }
});
router.post('/refund', async (req, res) => {
  try {
    const result = await PaymentService.refund(req.body);
    res.json(result);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to process refund');
  }
});
router.get('/history', async (req, res) => {
  try {
    const history = await PaymentService.getHistory(req.user.id);
    res.json(history);
  } catch (err) {
    errorResponse(res, 500, err.message || 'Failed to retrieve payment history');
  }
});
module.exports = router;
