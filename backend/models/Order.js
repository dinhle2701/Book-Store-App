const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  status: String,
  cartItems: [
    {
      id: String,
      bookName: String,
      price: Number,
      quantity: Number,
      img: String,
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
