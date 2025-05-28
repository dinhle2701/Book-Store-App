const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    supplier: { type: String, required: true, trim: true },
    publisher: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    count: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, trim: true },
    sold: { type: Number, default: 0, min: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
