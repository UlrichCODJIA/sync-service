/**
 * Service for sending notifications via Firebase Cloud Messaging
 * @module services/firebaseService
 */

const admin = require('../config/firebase');
const logger = require('../utils/logger');

/**
 * Send a notification to a Firebase Cloud Messaging topic
 * @function sendNotification
 * @param {string} topic - The topic to send the notification to
 * @param {Object} message - The notification message
 * @returns {Promise<void>}
 */
exports.sendNotification = async (topic, message) => {
    try {
        await admin.messaging().sendToTopic(topic, message);
        logger.info('Notification sent successfully');
    } catch (error) {
        logger.error('Error sending notification:', error);
        throw error;
    }
};