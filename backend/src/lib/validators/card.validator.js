const queryValidator = require('./query.validator');

const cardValidatorSchema = {
  type: 'object',
  required: ['name', 'description', 'order', 'responsibles', 'list', 'board'],
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
    order: {
      type: 'number',
    },
    responsibles: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    list: {
      type: 'string',
    },
    board: {
      type: 'string',
    },
  },
};

const endpointCardValidator = {
  schema: {
    tags: ['cards'],
    description: 'List cards',
  },
};

const queryCardValidator = {
  schema: {
    tags: ['cards'],
    description: 'Get a card by id',
  },
  params: queryValidator.queryIdParams,
};

const createCardValidator = {
  schema: {
    tags: ['cards'],
    description: 'Create a card',
  },
  body: cardValidatorSchema,
};

const updateCardValidator = {
  schema: {
    tags: ['card'],
    description: 'Update a card',
  },
  body: cardValidatorSchema,
  params: queryValidator.queryIdParams,
};

module.exports = {
  endpointCardValidator,
  queryCardValidator,
  createCardValidator,
  updateCardValidator,
};
