import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connectToDatabase from '../config/connect.js';
import User from '../models/UserModel.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await connectToDatabase(); // Kết nối MongoDB

    

    // Dữ liệu mẫu
    const users = [
      {
        name: ' amin',
        email: 'amin@example.com',
        password: bcrypt.hashSync('123456', 10), // Mã hóa mật khẩu
        isAdmin: false,
        phone: '0987654321',
      },
     
    ];

    // Thêm dữ liệu vào MongoDB
    const createdUsers = await User.insertMany(users);
    console.log('✅ Dữ liệu User đã được thêm thành công:', createdUsers);

    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi thêm dữ liệu User:', error);
    process.exit(1);
  }
};

// Chạy seed
seedUsers();
