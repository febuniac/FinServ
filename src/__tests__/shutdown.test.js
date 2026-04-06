process.env.NODE_ENV = 'test';

jest.mock('../models/db', () => jest.fn());
jest.mock('../services/accountService', () => ({
  list: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
}));
jest.mock('../services/transactionService', () => ({
  list: jest.fn(),
  getById: jest.fn(),
  transfer: jest.fn(),
}));
jest.mock('../services/paymentService', () => ({
  process: jest.fn(),
  refund: jest.fn(),
  getHistory: jest.fn(),
}));
jest.mock('../services/userService', () => ({
  register: jest.fn(),
  login: jest.fn(),
  getProfile: jest.fn(),
}));
jest.mock('../utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

const { logger } = require('../utils/logger');

describe('Graceful shutdown handler', () => {
  let exitSpy;

  beforeEach(() => {
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    exitSpy.mockRestore();
  });

  it('calls server.close and exits with 0 on SIGTERM when server is running', (done) => {
    const app = require('../index');
    const { gracefulShutdown, _setServer } = app;

    const mockServer = {
      close: jest.fn((cb) => cb()),
    };
    _setServer(mockServer);

    gracefulShutdown('SIGTERM');

    expect(logger.info).toHaveBeenCalledWith('SIGTERM received. Starting graceful shutdown...');
    expect(mockServer.close).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Server closed. All pending requests completed.');
    expect(exitSpy).toHaveBeenCalledWith(0);

    _setServer(null);
    done();
  });

  it('calls server.close and exits with 0 on SIGINT when server is running', (done) => {
    const app = require('../index');
    const { gracefulShutdown, _setServer } = app;

    const mockServer = {
      close: jest.fn((cb) => cb()),
    };
    _setServer(mockServer);

    gracefulShutdown('SIGINT');

    expect(logger.info).toHaveBeenCalledWith('SIGINT received. Starting graceful shutdown...');
    expect(mockServer.close).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(0);

    _setServer(null);
    done();
  });

  it('exits immediately with 0 when no server is running', () => {
    const app = require('../index');
    const { gracefulShutdown, _setServer } = app;

    _setServer(null);

    gracefulShutdown('SIGTERM');

    expect(logger.info).toHaveBeenCalledWith('SIGTERM received. Starting graceful shutdown...');
    expect(exitSpy).toHaveBeenCalledWith(0);
  });

  it('logs the correct signal name in shutdown message', () => {
    const app = require('../index');
    const { gracefulShutdown, _setServer } = app;

    _setServer(null);

    gracefulShutdown('SIGTERM');
    expect(logger.info).toHaveBeenCalledWith('SIGTERM received. Starting graceful shutdown...');

    jest.clearAllMocks();

    gracefulShutdown('SIGINT');
    expect(logger.info).toHaveBeenCalledWith('SIGINT received. Starting graceful shutdown...');
  });
});
