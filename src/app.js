require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const swaggerUi = require('swagger-ui-express');
const axios = require('axios');

const app = express();

require('dotenv').config()
const connectDB = require('./config/db');
const syncRoutes = require('./routes/syncRoutes');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const swaggerSpec = require('./swagger');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/sync', syncRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err, req, res, next) => {
    errorHandler(err, res);
});

// Schedule sync job
const syncSchedule = process.env.SYNC_SCHEDULE || '*/15 * * * *';
cron.schedule(syncSchedule, () => {
    logger.info("syncing");
    axios.post(`${process.env.APP_BASE_URL}/sync`)
        .catch(error => {
            logger.error('Error during sync');
        });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    logger.info(`Sync service listening on port ${PORT}`);
});