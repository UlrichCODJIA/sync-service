/**
 * Service for interacting with the Plant Information Database API
 * @module services/plantService
 */

const axios = require('axios');
const axiosRetry = require('axios-retry').default;

const { generateSyncToken } = require('../utils/tokenUtils');
const logger = require('../utils/logger');

const axiosInstance = axios.create({
    baseURL: process.env.PLANT_DB_API_BASE_URL,
    timeout: 5000,
});

axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return error.response && error.response.status >= 500;
    },
});

/**
 * Get updated plant data from the Plant Information Database API
 * @function getUpdatedPlants
 * @param {Date} lastSyncTimestamp - The timestamp of the last sync
 * @returns {Promise<Array>} - Array of updated plant objects
 */
exports.getUpdatedPlants = async (lastSyncTimestamp) => {
    try {
        const syncToken = generateSyncToken({ secret: process.env.SYNC_SERVICE_SECRET });
        const response = await axiosInstance.get('/api/plants/sync', {
            headers: { 'Authorization': 'Bearer ' + syncToken },
            params: {
                timestamp: lastSyncTimestamp,
            },
        });
        return response.data;
    } catch (error) {
        logger.error('Error fetching updated plants:', error);
        throw error;
    }
};