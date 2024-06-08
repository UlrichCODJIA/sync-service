/**
 * Error handling middleware
 * @module utils/errorHandler
 */

const logger = require('./logger');

module.exports = (err, res) => {
    logger.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ error: message });
};