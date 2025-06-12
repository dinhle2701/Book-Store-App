const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true } // ✅ Thêm dòng này
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);