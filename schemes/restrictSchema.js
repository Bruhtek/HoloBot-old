const mongoose = require('mongoose');

const restrictSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  restrictType: {
    type: Number,
    default: 0,
  },
  restrictId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  }
})

module.exports = restrictSchema;