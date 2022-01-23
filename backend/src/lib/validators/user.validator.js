const queryValidator = require('./query.validator');

const userValidatorSchema = {
  type: 'object',
  required: ['email', 'username', 'password', 'firstName', 'lastName'],
  properties: {
    email: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
  },
};

const endpointUserValidator = {
  schema: {
    tags: ['users'],
    description: 'List users',
  },
};

const queryUserValidator = {
  schema: {
    tags: ['users'],
    description: 'Get a user by id',
  },
  params: queryValidator.queryIdParams,
};

const updateUserValidator = {
  schema: {
    tags: ['users'],
    description: 'Update a user',
  },
  body: userValidatorSchema,
  params: queryValidator.queryIdParams,
};

module.exports = {
  endpointUserValidator,
  queryUserValidator,
  updateUserValidator,
};
