const { v4: uuid } = require('uuid');

const cardSchema = require('../models/card.model');
const validator = require('../lib/validators/card.validator');
const generateCode = require('../utils/generate-code');

const cardRouter = async (fastify) => {
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
  // Get all cards
  fastify.get('/', validator.endpointCardValidator, async (_request, reply) => {
    const cards = await cardSchema.find();
    reply.code(200).send(cards);
  });
  // Get a card by id
  fastify.get('/:id', validator.queryCardValidator, async (request, reply) => {
    const { id } = request.params;
    const card = await cardSchema.findById(id);
    reply.code(200).send(card);
  });
  // Get a card by board id4
  fastify.get('/board/:board', validator.queryCardValidator, async (request, reply) => {
    const { board } = request.params;
    const cards = await cardSchema.find({ board });
    reply.code(200).send(cards);
  });
  // Get a card by list id
  fastify.get('/list/:list', validator.queryCardValidator, async (request, reply) => {
    const { list } = request.params;
    const cards = await cardSchema.find({ list });
    reply.code(200).send(cards);
  });
  // Create a card
  fastify.post('/', validator.createCardValidator, async (request, reply) => {
    const {
      name, description, order, list, board,
    } = request.body;
    const length = await cardSchema.find({ board }).countDocuments();
    const code = `${generateCode(board)}-${length}`;
    const card = await cardSchema.create({
      _id: uuid(),
      name,
      code,
      description,
      order,
      list,
    });
    reply.code(201).send(card);
  });
  // Update a card
  fastify.put('/:id', validator.updateCardValidator, async (request, reply) => {
    const { id } = request.params;
    const {
      name, description, order, list,
    } = request.body;
    const card = await cardSchema.findByIdAndUpdate(id, {
      name,
      description,
      order,
      list,
    });
    reply.code(200).send(card);
  });
  // Delete a card
  fastify.delete('/:id', validator.queryCardValidator, async (request, reply) => {
    const { id } = request.params;
    const card = await cardSchema.findByIdAndDelete(id);
    reply.code(204).send(card);
  });
};

module.exports = cardRouter;
module.exports.autoPrefix = '/cards';
