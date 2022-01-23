const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
    required: true,
  },
  responsibles: [{
    type: String,
    ref: 'User',
  }],
  list: {
    type: String,
    ref: 'List',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', cardSchema);
