const queryValidator = require('./query.validator');

const listValidatorSchema = {
  type: 'object',
  required: ['name', 'order', 'board'],
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
    },
    order: {
      type: 'number',
    },
    board: {
      type: 'string',
    },
  },
};

const endpointListValidator = {
  schema: {
    tags: ['lists'],
    description: 'List lists',
  },
};

const queryListValidator = {
  schema: {
    tags: ['lsits'],
    description: 'Get a list by id',
  },
  params: queryValidator.queryIdParams,
};

const createListValidator = {
  schema: {
    tags: ['lists'],
    description: 'Create a list',
  },
  body: listValidatorSchema,
};

const updateListValidator = {
  schema: {
    tags: ['lists'],
    description: 'Update a list',
  },
  body: listValidatorSchema,
  params: queryValidator.queryIdParams,
};

module.exports = {
  endpointListValidator,
  queryListValidator,
  createListValidator,
  updateListValidator,
};
