const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use('/api/books', bookRoutes);
// app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/auth', authRoutes);

module.exports = app;
