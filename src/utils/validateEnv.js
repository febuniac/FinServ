const REQUIRED_ENV_VARS = ['DB_HOST', 'JWT_SECRET'];

function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

module.exports = { validateEnv, REQUIRED_ENV_VARS };
