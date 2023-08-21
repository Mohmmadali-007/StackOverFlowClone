const config = require('config');
const appRoot = require('app-root-path');
const expressSwaggerGenerator = require('express-swagger-generator');

// routes
const testRoute = require('../modules/test/test.routes');


//middlewares
const { verifyToken, systemAdmin } = require('../middlewares/permissions');

const options = {
  swaggerDefinition: {
    info: {
      description: 'stack over flow',
      title: 'stack over flow API',
      version: '1.0.0',
    },
    host: config.get('SWAGGER_URL'),
    basePath: '/api',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
      API_KEY: {
        type: 'apiKey',
        in: 'header',
        name: 'Auth-Token',
      },
    },
  },
  basedir: `${appRoot}`,
  files: ['./src/modules/**/*.routes.js'] || ['./src/modules/**/**/*.routes.js'],
};

const initialize = (app) => {
  app.use('/api/test', testRoute);

  const expressSwagger = expressSwaggerGenerator(app);
  expressSwagger(options);
};

module.exports = { initialize };
