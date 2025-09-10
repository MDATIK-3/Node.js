const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FinTech API',
      version: '1.0.0',
      description: 'Simple FinTech API with user operations',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'], // Path to JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
