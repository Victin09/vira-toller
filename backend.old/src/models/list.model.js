const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  _id: {
    type: String,
    // _id: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  board: {
    type: String,
    ref: 'Board',
  },
});

module.exports = mongoose.model('List', listSchema);
