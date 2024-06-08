const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Plant Sync Service API',
        version: '1.0.0',
        description: 'API documentation for the Plant Sync Service',
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;