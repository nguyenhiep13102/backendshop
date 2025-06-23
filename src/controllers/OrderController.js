
import OrderService from '../services/OrderService.js'
import Product from '../services/ProductServices.js'
import Order from '../models/OderProduct.js';
const OrderProduct = async (req, res) => {
      try {
    const {orderId } = req.body;
     console.log(orderId );
  
        const response = await OrderService.OrderProduct(orderId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};
const creatOrderProduct = async (req, res) => {
      try {
        const {
         oderItems,
        shippingAddress,
        paymentMethod,
         itemsPrice,
      shippingPrice,
      taxiPrice,
      totalPrice,
      user
     
    } = req.body;
    
    if(!oderItems ||!shippingAddress || !paymentMethod ||!itemsPrice ||shippingPrice === undefined || shippingPrice === null ||!taxiPrice ||!totalPrice ||!user ){
        return res.status(200).json({
            status :'Err',
            message : 'thieu truong truyen vao',
        })
    }
    for (const item of oderItems) {
     const product = await Product.getProductDetail(item.Product);
     console.log('in ra san pham ',product )
     if (!product) {
        return res.status(404).json({ status: 'Err', message: `Không tìm thấy sản phẩm ID ${item.name}` });
      }
      if (item.amount > product.countInStock) {
        return res.status(400).json({ status: 'Err', message: `Sản phẩm "${product.name}" chỉ còn ${product.countInStock} săn phẩm  trong kho nên không đủ hàng tồn kho` });
      }}

    for (const item of oderItems) {
      const product = await Product.getProductDetail(item.Product);
      product.countInStock -= item.amount;
      product.selled += item.amount

      await Product.updateProduct(item.Product, { countInStock: product.countInStock , selled: product.selled});
    }
     if (!oderItems || oderItems.length === 0) {
         return res.status(400).json({ message: 'Không có sản phẩm trong đơn hàng' });
       }
       const newOrder = {
      oderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxiPrice,
      totalPrice,
      user,
    };
        const response = await OrderService.creatOrderProduct(newOrder);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};
const getOrderDetail = async (req, res) => {
    try {
        const  userId  = req.params.id; 
        console.log(userId);

        if (!userId) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        const result = await OrderService.getOrderDetail(userId);
        return res.status(200).json(result);

      
    } catch (error) {
        console.error("Error in getUserDetail Controller:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
const DetailOrderbyid = async (req, res) => {
    try {
        const  id  = req.params.id; 
        

        if (!id) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }
        const result = await OrderService.DetailOrderbyid(id);
        return res.status(200).json(result);

      
    } catch (error) {
        console.error("Error in getUserDetail Controller:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
const DeleteOneOrder = async (req, res) => {
    try {
       const { id } = req.params;
       const userId = req.user._id;
       const order = await OrderService.DetailOrderbyid(id);
       if (order.status === 'shipping') {
       return res.status(400).json({ message: 'Không thể hủy đơn đang giao hàng.' });
        }
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Thiếu ID don hang !',
            });
        }
        const result = await OrderService.DeleteOneOrder(id,userId);
         if (result.status === "error") {
            return res.status(400).json(result);
        }

       
        return res.status(200).json(result);    
    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: "Lỗi server: " + e.message,
        });
    }
};
const getAllorders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') // Nếu muốn hiển thị tên/email người đặt
      .sort({ createdAt: -1 }); // Sắp xếp mới nhất

    res.status(200).json({
      status: 'OK',
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy đơn hàng: ' + error.message,
    });
  }
};
export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    // Tạo điều kiện lọc
    const filter = {};
    if (status) {
      filter.status = status;
    }
const orders = await OrderService.getOrdersByStatus(filter);
    res.status(200).json({
      status: 'OK',
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy đơn hàng: ' + error.message,
    });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    

    const validStatuses = ['pending', 'confirmed', 'paid', 'shipping', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Trạng thái không hợp lệ!' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Không tìm thấy đơn hàng!' });
    }

    order.status = status;

    // Cập nhật ngày tương ứng nếu có
    if (status === 'confirmed') {
      order.confirmedAt = new Date();
    } else if (status === 'cancelled') {
      order.cancelledAt = new Date();
    } else if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({
      status: 'OK',
      message: 'Cập nhật trạng thái đơn hàng thành công!',
      data: order,
    });
  } catch (error) {
    console.error('Lỗi cập nhật đơn hàng:', error);
    res.status(500).json({ status: 'error', message: 'Lỗi server khi cập nhật đơn hàng.' });
  }
};
export default {
    OrderProduct,
 creatOrderProduct , 
 getOrderDetail,
 DetailOrderbyid,
 DeleteOneOrder,
 getAllorders,
 getOrdersByStatus,
 updateOrderStatus,
};
