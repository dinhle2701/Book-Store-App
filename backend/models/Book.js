const mongoose = require('mongoose');
const { reviewSchema } = require('./Review'); // ✅ destructure đúng schema

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true, trim: true },
  img: { type: String, required: false },
  price: { type: String, required: true, trim: true },
  supplier: { type: String, required: true, trim: true },
  publisher: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  count: { type: Number, required: true, min: 0 },
  type: { type: String, required: true, trim: true },
  sold: { type: Number, default: 0, min: 0 },
  reviews: [reviewSchema] // ✅ dùng schema, không phải model
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
