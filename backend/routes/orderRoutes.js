const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Tạo đơn hàng
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/user/:email', orderController.getOrdersByUser);
router.get('/user/order/:orderId', orderController.getOrderDetailByUser);
// PUT update status
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
