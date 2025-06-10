const User = require('../models/User'); // đường dẫn tới model User
const bcrypt = require('bcrypt');

const initAdminAccount = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const newAdmin = new User({
        username: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'Admin', // đảm bảo field 'role' tồn tại trong model
        isActive: true
      });

      await newAdmin.save();
      console.log('✅ Admin mặc định đã được tạo');
    } else {
      console.log('ℹ️ Admin đã tồn tại');
    }
  } catch (error) {
    console.error('❌ Lỗi khi tạo tài khoản admin mặc định:', error);
  }
};

module.exports = initAdminAccount;
