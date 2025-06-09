const Order = require('../models/Order');

// [POST] /api/orders - Tạo mới đơn hàng
const Book = require('../models/Book'); // đảm bảo bạn đã import model Book

exports.createOrder = async (req, res) => {
  try {
    const { name, email, phone, address, cartItems, status } = req.body;

    if (!name || !email || !address || !cartItems || cartItems.length === 0 || !status) {
      return res.status(400).json({ message: 'Thiếu thông tin đặt hàng' });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      cartItems,
      status,
      total,
    });

    const savedOrder = await newOrder.save();

    // 🔁 Cập nhật sách: giảm count, tăng sold
    for (const item of cartItems) {
      const book = await Book.findById(item._id); // item._id là id của book

      if (!book) continue;

      // Nếu số lượng mua vượt quá số lượng còn lại
      if (book.count < item.quantity) {
        return res.status(400).json({
          message: `Sách "${book.bookName}" chỉ còn lại ${book.count} cuốn`,
        });
      }

      book.count -= item.quantity;
      book.sold += item.quantity;

      await book.save();
    }

    res.status(201).json({
      message: 'Đặt hàng thành công',
      order: savedOrder,
    });
  } catch (error) {
    console.error('Lỗi khi đặt hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng' });
  }
};


// [GET] /api/orders - Lấy toàn bộ đơn hàng (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy tất cả đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// [GET] /api/orders/user/:email - Lấy danh sách đơn hàng theo user
exports.getOrdersByUser = async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Email nhận được:', email);

    if (!email) {
      return res.status(400).json({ message: 'Thiếu email người dùng' });
    }

    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    console.log('Orders tìm thấy:', orders);

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Không có đơn hàng nào cho người dùng này' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng của user:', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};



// [GET] /api/orders/user/order/:orderId?email=... - Lấy chi tiết đơn hàng cụ thể của user
exports.getOrderDetailByUser = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Thiếu email người dùng' });
    }

    const order = await Order.findOne({ _id: orderId, email });

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng phù hợp' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
