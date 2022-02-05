const signInValidatorSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
};

const signUpValidatorSchema = {
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

const signInValidator = {
  schema: {
    tags: ['auth'],
    description: 'Sign in',
  },
  body: signInValidatorSchema,
};

const signUpValidator = {
  schema: {
    tags: ['auth'],
    description: 'Sign up',
  },
  body: signUpValidatorSchema,
};

module.exports = {
  signInValidator,
  signUpValidator,
};
