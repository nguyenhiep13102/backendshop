
import OrderService from '../services/OrderService.js'
import Product from '../services/ProductServices.js'
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
export default {
    OrderProduct,
 creatOrderProduct , 
 getOrderDetail,
};
