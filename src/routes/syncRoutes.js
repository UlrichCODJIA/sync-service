/**
 * Express router for sync-related routes
 * @module routes/syncRoutes
 */

const express = require('express');
const syncController = require('../controllers/syncController');

const router = express.Router();

/**
 * @swagger
 * /sync:
 *   post:
 *     summary: Trigger plant data sync
 *     description: Triggers the plant data sync process to fetch updated plant data from the Plant Information Database API and send notifications to the mobile app.
 *     responses:
 *       200:
 *         description: Plant data synced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plant data synced successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/', syncController.syncPlantData);

module.exports = router;