/**
 * Standard error response helper.
 * Ensures all error responses follow a consistent format:
 * { error: { code: <HTTP status code>, message: <error description> } }
 *
 * @param {object} res - Express response object
 * @param {number} code - HTTP status code
 * @param {string} message - Error message
 * @returns {object} Express response
 */
const errorResponse = (res, code, message) =>
  res.status(code).json({ error: { code, message } });

module.exports = { errorResponse };
