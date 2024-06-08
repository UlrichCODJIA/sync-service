/**
 * Mongoose model for storing sync information
 * @module models/sync
 */

const mongoose = require('mongoose');

const syncSchema = new mongoose.Schema({
    lastSyncTimestamp: {
        type: Date,
        default: Date.now,
    },
});

const Sync = mongoose.model('Sync', syncSchema);

module.exports = Sync;