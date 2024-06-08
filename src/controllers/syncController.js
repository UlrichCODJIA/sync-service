/**
 * Controller for handling plant data sync
 * @module controllers/syncController
 */

const Sync = require('../models/sync');
const plantService = require('../services/plantService');
const firebaseService = require('../services/firebaseService');
const errorHandler = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * Sync plant data from the Plant Information Database API
 * @function syncPlantData
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
exports.syncPlantData = async (req, res) => {
    try {
        const lastSync = await Sync.findOne();
        const updatedPlants = await plantService.getUpdatedPlants(lastSync ? lastSync.lastSyncTimestamp : null);

        for (const plant of updatedPlants) {
            const message = {
                notification: {
                    title: 'Plant Data Updated',
                    body: `The data for ${plant.scientificName} has been updated.`,
                },
                data: {
                    plantId: plant._id,
                    scientificName: plant.scientificName,
                    commonNames: plant.commonNames.join(', '),
                    description: plant.description,
                },
            };

            // await firebaseService.sendNotification('plant_updates', message);
            // logger.info(`Notification sent for ${plant.scientificName}`);
        }

        await Sync.findOneAndUpdate({}, { lastSyncTimestamp: new Date() }, { upsert: true });

        logger.info(`Synced ${updatedPlants.length} updated plants`);
        res.status(200).json({ message: 'Plant data synced successfully' });
    } catch (error) {
        errorHandler(error, res);
    }
};