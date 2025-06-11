const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const statRoutes = require('./routes/statRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://book-store-app-mauve.vercel.app', 'http://localhost:3000'],  // Chỉ cho phép frontend của bạn trên Vercel này
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-email']
}));
app.use(express.json());

// Routes
app.use('/api/book', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stat', statRoutes)
app.use('/api/orders', orderRoutes);

app.use('/static/uploads', express.static('static/uploads'));

module.exports = app;