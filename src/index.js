const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { logger } = require('./utils/logger');

const app = express();
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

const apiRouter = require('./api');
app.use('/v1', apiRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => logger.info(`FinSecure running on port ${PORT}`));
}
module.exports = app;
