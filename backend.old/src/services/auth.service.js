const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');

const User = require('../models/user.model');
const workspaceSchema = require('../models/workspace.model');

const authService = (fastify) => {
  const signin = async (request, reply) => {
    console.log('vira', request.body);
    console.log('reply', reply);
    const { email, password } = request.body;
    console.log('email', email);
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
  };
};

module.exports = { authService };
