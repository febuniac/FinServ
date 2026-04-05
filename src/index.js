const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { logger } = require('./utils/logger');

const app = express();
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/accounts', require('./api/accounts'));
app.use('/api/v1/transactions', require('./api/transactions'));
app.use('/api/v1/payments', require('./api/payments'));
app.use('/api/v1/users', require('./api/users'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`FinSecure running on port ${PORT}`));
module.exports = app;
