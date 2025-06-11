require('dotenv').config(); 
const app = require('./app');
const mongoose = require('mongoose');
const initAdminAccount = require('./utils/initAdmin'); // đường dẫn chính xác

const PORT = process.env.PORT || 5555;
const MONGO_URI = "mongodb://localhost:27017/bookstore";


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');

    await initAdminAccount();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
