import mongoose from "mongoose";

const  orderSchema = new mongoose.Schema({
    oderItems:[
    {
         name: {type: String , required :true},
         amount: {type : Number ,required : true },
         image: {type : String , required: true},
         price: {type: Number , required: true},
         discount : {type: Number},
         Product :{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required : true ,
         },
    },
    ],
    shippingAddress : {
        fullName: {type: String , required : true},
        adress: {type: String, required: true},
        city: {type : String, required : true},      
        phone: {type: String , required : true},
    },
    paymentMethod: {type: String , required: true},
    itemsPrice: { type : Number , required: true},
    shippingPrice: {type :Number, required : true},
    taxiPrice: {type : Number , required :true },
    totalPrice: {type: Number , required : true },
    user: {type: mongoose.Schema.Types.ObjectId , ref : 'User', required : true},
    isPaid : {type: Boolean, default: false},
    paidAt :{type : Date , default: null},
    isDelivered: {type : Boolean , default: false},
    deliveredAt :{type: Date },
      status: {
    type: String,
    enum: ['pending', 'confirmed', 'paid', 'shipping', 'delivered', 'cancelled'],
    default: 'pending',
  },
  confirmedAt: { type: Date },
  cancelledAt: { type: Date },



},
{
    timestamps : true ,
}
 );
const Order = mongoose.model('Order',orderSchema);
 export default Order;