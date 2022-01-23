const { v4: uuid } = require('uuid');

const boardSchema = require('../models/board.model');
const workspaceSchema = require('../models/workspace.model');
const validator = require('../lib/validators/board.validator');

const boardRouter = async (fastify) => {
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
  // List all boards
  fastify.get('/', validator.endpointBoardValidator, async (_request, reply) => {
    const boards = await boardSchema.find().populate('users', '-password');
    reply.code(200).send(boards);
  });
  // Get a board by id
  fastify.get('/:id', validator.queryBoardValidator, async (request, reply) => {
    const { id } = request.params;
    const board = await boardSchema.findById(id).populate('users', '-password');
    reply.code(200).send(board);
  });
  // Get a board by user id
  fastify.get('/user/:user', validator.queryBoardValidator, async (request, reply) => {
    const { user } = request.params;
    const boards = await boardSchema.find({ users: user }).populate('users', '-password');
    reply.code(200).send(boards);
  });
  // Create a board
  fastify.post('/', validator.createBoardValidator, async (request, reply) => {
    const {
      name, image, description, users, workspace,
    } = request.body;
    const board = await boardSchema.create({
      _id: uuid(),
      name,
      image,
      description,
      users,
    });
    await workspaceSchema.findByIdAndUpdate(workspace, {
      $push: { boards: board._id },
    }, { new: true });
    reply.code(201).send(board);
  });
  // Update a board
  fastify.put('/:id', validator.updateBoardValidator, async (request, reply) => {
    const { id } = request.params;
    const {
      name, image, description, users,
    } = request.body;
    const board = await boardSchema.findByIdAndUpdate(id, {
      name,
      image,
      description,
      users,
    }, { new: true });
    reply.code(204).send(board);
  });
  // Delete a board
  fastify.delete('/:id', validator.queryBoardValidator, async (request, reply) => {
    const { id } = request.params;
    const board = await boardSchema.findByIdAndDelete(id);
    reply.code(204).send(board);
  });
};

module.exports = boardRouter;
module.exports.autoPrefix = '/boards';
