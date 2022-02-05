const { v4: uuid } = require('uuid');

const workspaceSchema = require('../models/workspace.model');
const validator = require('../lib/validators/workspace.validator');

const workspaceRouter = async (fastify) => {
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
  // List all workspaces
  fastify.get('/', validator.endpointWorkspaceValidator, async (_request, reply) => {
    const workspaces = await workspaceSchema.find().populate('users', '-password').populate('boards');
    reply.code(200).send(workspaces);
  });
  // Get a workspace by id
  fastify.get('/:id', validator.queryWorkspaceValidator, async (request, reply) => {
    const { id } = request.params;
    const workspace = await workspaceSchema.findById(id).populate('users', '-password')
      .populate('boards');
    reply.code(200).send(workspace);
  });
  // Get a workspace by user id
  fastify.get('/user/:user', validator.queryWorkspaceValidator, async (request, reply) => {
    const { user } = request.params;
    const workspaces = await workspaceSchema.find({ users: user }).populate('users', '-password');
    reply.code(200).send(workspaces);
  });
  // Create a workspace
  fastify.post('/', validator.createWorkspaceValidator, async (request, reply) => {
    const {
      name, image, description, users,
    } = request.body;
    const workspace = await workspaceSchema.create({
      _id: uuid(),
      name,
      image,
      description,
      users,
    });
    reply.code(201).send(workspace);
  });
  // Update a workspace
  fastify.put('/:id', validator.updateWorkspaceValidator, async (request, reply) => {
    const { id } = request.params;
    const {
      name, image, description, users,
    } = request.body;
    const workspace = await workspaceSchema.findByIdAndUpdate(id, {
      name,
      image,
      description,
      users,
    }, { new: true });
    reply.code(204).send(workspace);
  });
  // Delete a workspace
  fastify.delete('/:id', validator.queryWorkspaceValidator, async (request, reply) => {
    const { id } = request.params;
    await workspaceSchema.findByIdAndDelete(id);
    reply.code(205).send();
  });
};

module.exports = workspaceRouter;
module.exports.autoPrefix = '/workspaces';
