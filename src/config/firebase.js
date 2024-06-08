/**
 * Module for initializing the Firebase Admin SDK
 * @module config/firebase
 */

const admin = require('firebase-admin');

var serviceAccount = require("../../" + process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;