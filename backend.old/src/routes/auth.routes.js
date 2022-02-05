const { v4: uuid } = require('uuid');

// const {authService} = require('../services/auth.service')(fastify);
const User = require('../models/user.model');
const workspaceSchema = require('../models/workspace.model');
const validator = require('../middlewares/validators/auth.validator');

const authRouter = async (fastify) => {
  // Login
  fastify.post('/signin', validator.signInValidator, require('../services/auth.service')(fastify).signin);
  // Create a use
  fastify.post('/signup', validator.signUpValidator, async (request, reply) => {
    const {
      email, username, password, firstName, lastName,
    } = request.body;
    const user = await User.findOne({ email });
    if (user) {
      reply.code(409).send({ message: 'Email already exists' });
    }
    const newUser = new User({
      _id: uuid(),
      email,
      username,
      password,
      firstName,
      lastName,
    });
    await newUser.save();
    await workspaceSchema.create({
      _id: uuid(),
      name: `${firstName}'s workspace`,
      description: 'This is your workspace',
      users: [newUser._id],
    });
    reply.code(201).send({ message: 'User created successfully' });
  });
};

module.exports = authRouter;
