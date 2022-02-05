const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Board', boardSchema);
