const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questSchema = new Schema({
  previewImg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  complexity: {
    type: Number,
    required: true,
  },
  gamers: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = mongoose.model('Quest', questSchema);
