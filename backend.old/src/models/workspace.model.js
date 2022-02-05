const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  _id: {
    type: String,
    // _id: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  users: [{
    type: String,
    ref: 'User',
  }],
  boards: [{
    type: String,
    ref: 'Board',
  }],
});

module.exports = mongoose.model('Workspace', workspaceSchema);
