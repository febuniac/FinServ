process.env.NODE_ENV = 'test';

const request = require('supertest');

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

const app = require('../index');

describe('Health check endpoint', () => {
  it('GET /health returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('returns JSON content type', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});

describe('Unknown routes', () => {
  it('returns 404 for undefined routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404);
  });
});
