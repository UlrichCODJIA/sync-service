# Plant Sync Service

The Plant Sync Service is responsible for syncing plant data from the Plant Information Database to the mobile app. It fetches updated plant data based on the last sync timestamp and sends notifications to the app using Firebase Cloud Messaging.

## Features

- Fetches updated plant data from the Plant Information Database API
- Sends notifications to the mobile app via Firebase Cloud Messaging
- Schedules periodic sync jobs using node-cron
- Implements error handling and logging
- Follows best practices for production-ready code

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Firebase Admin SDK
- Axios with Axios Retry
- Winston for logging
- Jest for testing

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in the `.env` file
4. Start the server: `npm start`

## API Endpoints

- `POST /sync`: Triggers the plant data sync process

## API Documentation

The API documentation is generated using Swagger. To view the documentation, start the server and navigate to `http://localhost:4000/api-docs` in your web browser.

The documentation provides detailed information about each API endpoint, including request/response formats, authentication requirements, and error codes. It also includes examples and sample code snippets to help developers integrate with the Plant Information Database API easily.

## Configuration

The following environment variables need to be set in the `.env` file:

- `MONGODB_URI`: MongoDB connection URI
- `FIREBASE_SERVICE_ACCOUNT_KEY`: Path to the Firebase service account key file
- `PLANT_DB_API_BASE_URL`: Base URL of the Plant Information Database API
- `PLANT_DB_API_ACCESS_TOKEN`: Access token for the Plant Information Database API
- `SYNC_SCHEDULE`: Cron schedule for the sync job (default: every 15 minutes)
- `APP_BASE_URL`: Base URL of the sync service
- `PORT`: Port number for the sync service (default: 4000)

## Testing

Run the test suite using the following command:

`npm test`

## Deployment

The sync service can be deployed to a hosting platform like Google Cloud Run or AWS Elastic Beanstalk. Ensure that the necessary environment variables are set up in the deployment environment.

## License

This project is licensed under the MIT License.
