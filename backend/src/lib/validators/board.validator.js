const queryValidator = require('./query.validator');

const boardValidatorSchema = {
  type: 'object',
  required: ['name', 'description', 'image', 'users'],
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: 'string',
      minLength: 3,
      maxLength: 255,
    },
    image: {
      type: 'string',
    },
    users: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    workspace: {
      type: 'string',
    },
  },
};

const endpointBoardValidator = {
  schema: {
    tags: ['boards'],
    description: 'List boards',
  },
};

const queryBoardValidator = {
  schema: {
    tags: ['boards'],
    description: 'Get a board by id',
  },
  params: queryValidator.queryIdParams,
};

const createBoardValidator = {
  schema: {
    tags: ['boards'],
    description: 'Create a board',
  },
  body: boardValidatorSchema,
};

const updateBoardValidator = {
  schema: {
    tags: ['boards'],
    description: 'Update a board',
  },
  body: boardValidatorSchema,
  params: queryValidator.queryIdParams,
};

module.exports = {
  endpointBoardValidator,
  queryBoardValidator,
  createBoardValidator,
  updateBoardValidator,
};
