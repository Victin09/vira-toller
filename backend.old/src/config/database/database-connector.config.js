const mongooose = require('mongoose');
const fastifyPlugin = require('fastify-plugin');

const databaseConnection = async (fastify, opts) => {
  const {
    host,
    port,
    name,
    user,
    password,
  } = opts;

  const url = user && password === 'root'
    ? `mongodb://${host}:${port}/${name}`
    : `mongodb://${user}:${password}@${host}:${port}/${name}`;

  fastify.log.info({ url });
  try {
    await mongooose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    fastify.log.info(`Connected to database on ${url}`);
  } catch (err) {
    fastify.log.error('Error connecting to database');
    process.exit(2);
  }
};

module.exports = fastifyPlugin(databaseConnection);
