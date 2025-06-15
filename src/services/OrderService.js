import Order from '../models/OderProduct.js';

const OrderProduct = async (orderId) => {
   

 const order = await Order.findById(orderId)
  .populate('oderItems.Product'); 

   console.log(order.oderItems[0].Product.name);
  
    return {
        status: "success",
        code: 201,
        data: order
    };
};

const creatOrderProduct = async (newOrder) => {
 const CreatOrder = await Order.create(newOrder);
 console.log('in ra order',newOrder )
    return {
        status: "success",
        code: 201,
        data: CreatOrder,
    };
};
const getOrderDetail = async (userId) => {
    try {
      const orders = await Order.find({ user: userId });
            return {
        status: "success",
        code: 201,
        data: orders,
    };
    } catch (error) {
        console.error("Error in getUserById Service:", error);
        throw error;
    }
};


export default {
    OrderProduct,  
    creatOrderProduct,
    getOrderDetail,
};