const publicRouter = async (fastify) => {
  fastify.get('/', async (_request, reply) => {
    reply.send({ hello: 'world' });
  });
};

module.exports = publicRouter;
