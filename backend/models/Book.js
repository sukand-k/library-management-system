const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  isbn: String,
  copies: { type: Number, default: 1 },   // total copies
  available: { type: Number, default: 1 },// available to borrow
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
