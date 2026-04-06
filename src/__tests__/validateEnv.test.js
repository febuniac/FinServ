describe('validateEnv', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('throws when DB_HOST is missing', () => {
    delete process.env.DB_HOST;
    process.env.JWT_SECRET = 'test-secret';
    const { validateEnv } = require('../utils/validateEnv');
    expect(() => validateEnv()).toThrow('Missing required environment variables: DB_HOST');
  });

  it('throws when JWT_SECRET is missing', () => {
    process.env.DB_HOST = 'localhost';
    delete process.env.JWT_SECRET;
    const { validateEnv } = require('../utils/validateEnv');
    expect(() => validateEnv()).toThrow('Missing required environment variables: JWT_SECRET');
  });

  it('throws when multiple env vars are missing', () => {
    delete process.env.DB_HOST;
    delete process.env.JWT_SECRET;
    const { validateEnv } = require('../utils/validateEnv');
    expect(() => validateEnv()).toThrow('Missing required environment variables: DB_HOST, JWT_SECRET');
  });

  it('does not throw when all required env vars are set', () => {
    process.env.DB_HOST = 'localhost';
    process.env.JWT_SECRET = 'test-secret';
    const { validateEnv } = require('../utils/validateEnv');
    expect(() => validateEnv()).not.toThrow();
  });

  it('exports REQUIRED_ENV_VARS array', () => {
    const { REQUIRED_ENV_VARS } = require('../utils/validateEnv');
    expect(REQUIRED_ENV_VARS).toEqual(['DB_HOST', 'JWT_SECRET']);
  });
});
