process.env.NODE_ENV = 'test';

const jwt = require('jsonwebtoken');

describe('Auth middleware', () => {
  let authMiddleware;
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.resetModules();
    authMiddleware = require('../middleware/auth');
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('returns 401 when no authorization header is present', () => {
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: { code: 401, message: 'Authentication required' } });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when token is invalid', () => {
    req.headers.authorization = 'Bearer invalid-token';
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: { code: 401, message: 'Invalid token' } });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next and sets req.user when token is valid', () => {
    const secret = 'test-secret';
    process.env.JWT_SECRET = secret;
    const token = jwt.sign({ id: 1, email: 'test@test.com' }, secret);
    req.headers.authorization = `Bearer ${token}`;
    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(1);
  });
});

describe('Rate limiter middleware', () => {
  let rateLimiter;
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.resetModules();
    rateLimiter = require('../middleware/rateLimiter');
    req = { ip: '127.0.0.1' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('allows requests under the rate limit', () => {
    rateLimiter(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns 429 when rate limit is exceeded', () => {
    for (let i = 0; i < 100; i++) {
      rateLimiter(req, res, jest.fn());
    }
    rateLimiter(req, res, next);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ error: { code: 429, message: 'Rate limit exceeded' } });
  });
});
