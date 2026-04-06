const { errorResponse } = require('../utils/errorResponse');

describe('errorResponse helper', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('sets the correct HTTP status code', () => {
    errorResponse(res, 400, 'Bad request');
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns structured error with code and message', () => {
    errorResponse(res, 404, 'Not found');
    expect(res.json).toHaveBeenCalledWith({
      error: { code: 404, message: 'Not found' },
    });
  });

  it('handles 401 Unauthorized', () => {
    errorResponse(res, 401, 'Authentication required');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: { code: 401, message: 'Authentication required' },
    });
  });

  it('handles 429 Rate limit', () => {
    errorResponse(res, 429, 'Rate limit exceeded');
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({
      error: { code: 429, message: 'Rate limit exceeded' },
    });
  });

  it('handles 500 Internal Server Error', () => {
    errorResponse(res, 500, 'Internal server error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: { code: 500, message: 'Internal server error' },
    });
  });

  it('returns the response object for chaining', () => {
    const result = errorResponse(res, 400, 'Bad request');
    expect(result).toBe(res);
  });
});
