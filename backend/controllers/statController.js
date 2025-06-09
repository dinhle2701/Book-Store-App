const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Order');

const getStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const booksCount = await Book.countDocuments();
    const ordersCount = await Order.countDocuments();

    res.json({
      usersCount,
      booksCount,
      ordersCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email role'); // chỉ dùng await là đủ
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}, 'username email role'); // chỉ dùng await là đủ
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getStats,
  getUsers,
  getOrders
};
