const router = require('express').Router();

router.use('/accounts', require('./accounts'));
router.use('/transactions', require('./transactions'));
router.use('/payments', require('./payments'));
router.use('/users', require('./users'));

module.exports = router;
