const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Đăng ký
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'User',
        });

        await newUser.save();
        res.status(201).json({ message: 'Register successful' });
    } catch (error) {
        res.status(500).json({ message: 'Register failed', error: error.message });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign(
            { id: user._id, role: user.role, iss: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
