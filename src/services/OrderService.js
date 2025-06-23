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
const DetailOrderbyid = async (id) => {
    try {
        console.log('truyen vao id ', id )
        const OrderbyID = await Order.findById(id); 
        return OrderbyID;
    } catch (error) {
        console.error("Error in getUserById Service:", error);
        throw error;
    }
};
const DeleteOneOrder = async(id,userId)=>{
    try{
        const order = await Order.findOne({ _id: id, user: userId });
        if (!order) {
            return {
                status: "error",
                message: "Không tìm thấy san pham để xoá!",
            };
        } 
        await order.deleteOne();

        return {
           
            status: "OK",
            message: "Xoá đơn hàng thành công !",
        };  
    }catch{
        throw e;
    }
};
const getOrdersByStatus = async(filter)=>{
    try{
        const orders = await Order.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

        return orders ; 
    }catch{
        throw e;
    }
};

export default {
    OrderProduct,  
    creatOrderProduct,
    getOrderDetail,
    DetailOrderbyid,
    DeleteOneOrder,
    getOrdersByStatus,
};