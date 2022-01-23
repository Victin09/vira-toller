const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const User = require('../models/user.model');
const validator = require('../lib/validators/auth.validator');

const authRouter = async (fastify) => {
  // Login
  fastify.post('/signin', validator.signInValidator, async (request, reply) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      reply.code(401).send({ message: 'Invalid email or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      reply.code(401).send({ message: 'Invalid email or password' });
    }
    const token = fastify.jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'vira-toller');
    reply.code(200).send({ token });
  });
  // Create a user
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
    reply.code(201).send({ message: 'User created successfully' });
  });
};

module.exports = authRouter;
