// Load external modules
require('dotenv').config();
const path = require('path');
const autoload = require('fastify-autoload');
const jwt = require('fastify-jwt');
const oas = require('fastify-oas');
const fastify = require('fastify')({
  logger: {
    level: 'info',
    prettyPrint: process.env.NODE_ENV || 'development' !== 'production'
      ? {
        translateTime: 'HH:MM:ss Z d/m/yyyy',
      }
      : false,
  },
});
// Load app modules
const databaseConnection = require('./config/database/database-connector.config');
const swaggerConfig = require('./config/swagger.config');

// Register plugins
fastify.register(jwt, {
  secret: process.env.JWT_SECRET,
});
fastify.register(oas, swaggerConfig);
// fastify.register(autoload, {
//   dir: path.join(__dirname, 'routes'),
//   options: {
//     prefix: '/api/v1',
//   },
// });
fastify.register(require('./routes/auth.routes'), { prefix: '/api/v1' });

fastify.register(databaseConnection, {
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 27017,
  name: process.env.DATABASE_NAME || 'test',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
});

const bootstrap = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(2);
  }
};
bootstrap();

module.exports = bootstrap;
