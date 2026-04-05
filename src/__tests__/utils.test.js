describe('Logger module', () => {
  let logger;

  beforeEach(() => {
    jest.resetModules();
  });

  it('exports a logger object with expected methods', () => {
    const { logger: loggerInstance } = require('../utils/logger');
    logger = loggerInstance;
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.warn).toBe('function');
  });

  it('defaults to info log level', () => {
    delete process.env.LOG_LEVEL;
    const { logger: loggerInstance } = require('../utils/logger');
    expect(loggerInstance.level).toBe('info');
  });

  it('respects LOG_LEVEL environment variable', () => {
    process.env.LOG_LEVEL = 'debug';
    const { logger: loggerInstance } = require('../utils/logger');
    expect(loggerInstance.level).toBe('debug');
    delete process.env.LOG_LEVEL;
  });
});
