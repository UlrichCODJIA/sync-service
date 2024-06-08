const jwt = require('jsonwebtoken');

/**
 * Generate a new sync token
 * @function generateSyncToken
 * @param {Object} payload - The payload to include in the token
 * @returns {string} - The generated sync token
 */
exports.generateSyncToken = (payload) => {
    const token = jwt.sign(payload, process.env.SYNC_TOKEN_SECRET, { expiresIn: '15m' });
    return token;
};