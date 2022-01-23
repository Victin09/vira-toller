const { v4: uuid } = require('uuid');

const listSchema = require('../models/list.model');
const validator = require('../lib/validators/list.validator');

const listRouter = async (fastify) => {
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
  // List all lists
  fastify.get('/', validator.endpointListValidator, async (_request, reply) => {
    const lists = await listSchema.find();
    reply.code(200).send(lists);
  });
  // Get a list by id
  fastify.get('/:id', validator.queryListValidator, async (request, reply) => {
    const { id } = request.params;
    const list = await listSchema.findById(id);
    reply.code(200).send(list);
  });
  // Get lists by board id
  fastify.get('/board/:board', validator.queryListValidator, async (request, reply) => {
    const { board } = request.params;
    const lists = await listSchema.find({ board });
    reply.code(200).send(lists);
  });
  // Create a list
  fastify.post('/', validator.createListValidator, async (request, reply) => {
    const {
      name, board,
    } = request.body;
    const list = await listSchema.create({
      _id: uuid(),
      name,
      board,
    });
    reply.code(201).send(list);
  });
  // Update a list
  fastify.put('/:id', validator.updateListValidator, async (request, reply) => {
    const { id } = request.params;
    const {
      name, board,
    } = request.body;
    const list = await listSchema.findByIdAndUpdate(id, {
      name,
      board,
    }, { new: true });
    reply.code(204).send(list);
  });
  // Delete a list
  fastify.delete('/:id', validator.queryListValidator, async (request, reply) => {
    const { id } = request.params;
    const list = await listSchema.findByIdAndDelete(id);
    reply.code(204).send(list);
  });
};

module.exports = listRouter;
module.exports.autoPrefix = '/lists';
