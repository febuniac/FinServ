process.env.NODE_ENV = 'test';

const request = require('supertest');

// Mock dependencies that require external services (db, stripe, etc.)
jest.mock('../models/db', () => jest.fn());

// Mock all service dependencies before requiring app
jest.mock('../services/accountService', () => ({
  list: jest.fn().mockResolvedValue([{ id: 1, name: 'Savings' }]),
  getById: jest.fn().mockResolvedValue({ id: 1, name: 'Savings' }),
  create: jest.fn().mockResolvedValue({ id: 2, name: 'Checking' }),
}));
jest.mock('../services/transactionService', () => ({
  list: jest.fn().mockResolvedValue([{ id: 1, amount: 100 }]),
  getById: jest.fn().mockResolvedValue({ id: 1, amount: 100 }),
  transfer: jest.fn().mockResolvedValue({ id: 2, amount: 50 }),
}));
jest.mock('../services/paymentService', () => ({
  process: jest.fn().mockResolvedValue({ id: 'pi_1', status: 'succeeded' }),
  refund: jest.fn().mockResolvedValue({ id: 're_1', status: 'succeeded' }),
  getHistory: jest.fn().mockResolvedValue([{ id: 'pi_1' }]),
}));
jest.mock('../services/userService', () => ({
  register: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
  login: jest.fn().mockResolvedValue('mock-jwt-token'),
  getProfile: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
}));
jest.mock('../utils/logger', () => ({
  logger: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
}));

const app = require('../index');

describe('API versioning prefix', () => {
  describe('routes are accessible under /v1 prefix', () => {
    it('GET /v1/accounts/:id returns 200', async () => {
      const res = await request(app).get('/v1/accounts/1');
      expect(res.status).toBe(200);
    });

    it('GET /v1/transactions returns 200', async () => {
      const res = await request(app).get('/v1/transactions');
      expect(res.status).toBe(200);
    });

    it('POST /v1/transactions/transfer returns 200', async () => {
      const res = await request(app)
        .post('/v1/transactions/transfer')
        .send({ from_account: 1, to_account: 2, amount: 50 });
      expect(res.status).toBe(200);
    });

    it('GET /v1/transactions/:id returns 200', async () => {
      const res = await request(app).get('/v1/transactions/1');
      expect(res.status).toBe(200);
    });

    it('POST /v1/payments/process returns 200', async () => {
      const res = await request(app)
        .post('/v1/payments/process')
        .send({ amount: 1000, payment_method: 'pm_test' });
      expect(res.status).toBe(200);
    });

    it('POST /v1/payments/refund returns 200', async () => {
      const res = await request(app)
        .post('/v1/payments/refund')
        .send({ payment_intent_id: 'pi_1' });
      expect(res.status).toBe(200);
    });

    it('POST /v1/users/register returns 201', async () => {
      const res = await request(app)
        .post('/v1/users/register')
        .send({ email: 'test@test.com', password: 'pass' });
      expect(res.status).toBe(201);
    });

    it('POST /v1/users/login returns 200', async () => {
      const res = await request(app)
        .post('/v1/users/login')
        .send({ email: 'test@test.com', password: 'pass' });
      expect(res.status).toBe(200);
    });

  });

  describe('unversioned routes return 404', () => {
    it('GET /accounts returns 404', async () => {
      const res = await request(app).get('/accounts');
      expect(res.status).toBe(404);
    });

    it('GET /users/profile returns 404', async () => {
      const res = await request(app).get('/users/profile');
      expect(res.status).toBe(404);
    });

    it('GET /transactions returns 404', async () => {
      const res = await request(app).get('/transactions');
      expect(res.status).toBe(404);
    });

    it('POST /payments/process returns 404', async () => {
      const res = await request(app).post('/payments/process');
      expect(res.status).toBe(404);
    });
  });

  describe('health check remains at root', () => {
    it('GET /health returns 200 with status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });
});
