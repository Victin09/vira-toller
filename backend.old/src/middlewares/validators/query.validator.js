const queryIdParams = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
};

const queryUserParams = {
  type: 'object',
  properties: {
    user: { type: 'string' },
  },
};

module.exports = {
  queryIdParams,
  queryUserParams,
};
