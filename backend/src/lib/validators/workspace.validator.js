const queryValidator = require('./query.validator');

const workspaceValidatorSchema = {
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
  },
};

const endpointWorkspaceValidator = {
  schema: {
    tags: ['workspaces'],
    description: 'List workspaces',
  },
};

const queryWorkspaceValidator = {
  schema: {
    tags: ['workspaces'],
    description: 'Get a workspace by id',
  },
  params: queryValidator.queryIdParams,
};

const createWorkspaceValidator = {
  schema: {
    tags: ['workspaces'],
    description: 'Create a workspace',
  },
  body: workspaceValidatorSchema,
};

const updateWorkspaceValidator = {
  schema: {
    tags: ['workspaces'],
    description: 'Update a workspace',
  },
  body: workspaceValidatorSchema,
  params: queryValidator.queryIdParams,
};

module.exports = {
  endpointWorkspaceValidator,
  queryWorkspaceValidator,
  createWorkspaceValidator,
  updateWorkspaceValidator,
};
