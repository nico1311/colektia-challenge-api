const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '0.1.0',
      description: 'Simple CRUD API with Express',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJSDoc(options);
module.exports = specs;