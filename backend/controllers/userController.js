const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const booksCount = await Book.countDocuments();
    // const ordersCount = await Order.countDocuments();

    res.json({
      usersCount,
      booksCount,
      // ordersCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStats,
};
