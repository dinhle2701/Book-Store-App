require('dotenv').config(); 
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5555;
const MONGO_URI = 'mongodb://localhost:27017/bookstore'; // hoặc dùng MongoDB Atlas

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
