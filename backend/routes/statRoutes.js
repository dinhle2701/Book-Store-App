// routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const { getStats, getUsers, getOrders } = require('../controllers/statController');

router.get('/', getStats);
router.get('/user', getUsers)
router.get('/order', getOrders)

module.exports = router;
