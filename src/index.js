const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { logger } = require('./utils/logger');
const { validateEnv } = require('./utils/validateEnv');

if (process.env.NODE_ENV !== 'test') {
  validateEnv();
}

const app = express();
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

const apiRouter = require('./api');
app.use('/v1', apiRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => logger.info(`FinSecure running on port ${PORT}`));
}

function gracefulShutdown(signal) {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  if (server) {
    server.close(() => {
      logger.info('Server closed. All pending requests completed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;
module.exports.gracefulShutdown = gracefulShutdown;
module.exports._setServer = (s) => { server = s; };
