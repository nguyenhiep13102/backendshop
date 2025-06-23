import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/OderProduct.js'; // đúng tên model Order của bạn

dotenv.config();

async function updatePaidAtForOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://root:123@cluster0.qg45u.mongodb.net/hiepct?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Order.updateMany(
      {
        isPaid: true,
        $or: [
          { paidAt: { $exists: false } },
          { paidAt: null }
        ]
      },
      {
        $set: {
          paidAt: new Date() // hoặc có thể là createdAt nếu bạn muốn dùng ngày tạo đơn
        }
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} orders with paidAt`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating orders:', error);
    process.exit(1);
  }
}

updatePaidAtForOrders();
