const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
})


module.exports = mongoose.model('Books', bookSchema);