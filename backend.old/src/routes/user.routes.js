const userSchema = require('../models/user.model');

const validator = require('../lib/validators/user.validator');

const userRouter = async (fastify) => {
  // Register a hook that will be called before the route handler and check
  // if the user is authenticated
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      fastify.log.error(err);
      reply.code(401).send({ message: 'Authentication failed' });
    }
  });
  // List all users
  fastify.get('/', validator.endpointUserValidator, async (_request, reply) => {
    const users = await userSchema.find();
    reply.code(200).send(users);
  });
  // Get a user by id
  fastify.get('/:id', validator.queryUserValidator, async (request, reply) => {
    const { id } = request.params;
    const user = await userSchema.findById(id);
    reply.code(200).send(user);
  });
  // Update a user
  fastify.put('/:id', validator.updateUserValidator, async (request, reply) => {
    const { id } = request.params;
    const {
      firstName, lastName, email, username,
    } = request.body;
    const user = await userSchema.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      username,
    }, { new: true });
    reply.code(204).send(user);
  });
  // Delete a user
  fastify.delete('/:id', validator.queryUserValidator, async (request, reply) => {
    const { id } = request.params;
    await userSchema.findByIdAndDelete(id);
    reply.code(205).send();
  });
};

module.exports = userRouter;
module.exports.autoPrefix = '/users';
