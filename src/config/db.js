/**
 * Module for connecting to the MongoDB database
 * @module config/db
 */
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;