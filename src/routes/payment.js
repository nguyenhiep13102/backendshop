import express from 'express';
import dotenv from 'dotenv';
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat} from 'vnpay';
import Order from '../models/OderProduct.js';
import Product from '../services/ProductServices.js'
import VnPayController from '../controllers/VnPay.controller.js';
dotenv.config();
let routes = express.Router();

// routes.post('/creatvnpay',async(req, res)=>{
// const {orderId,access_token } = req.body;
// const OrderbyID = await Order.findById(orderId); 
// const vnpay = new VNPay({

//     tmnCode: 'J6BOXBQC',
//     secureSecret: 'B54GT5D9GPBJSCKQFYMISR73Z4IETDJK',
//     vnpayHost: 'https://sandbox.vnpayment.vn',
//     queryDrAndRefundHost: 'https://sandbox.vnpayment.vn', 

//     testMode: true,                
//     hashAlgorithm: 'SHA512',      
//     enableLog: true,              
//     loggerFn: ignoreLogger,         
//     endpoints: {
//         paymentEndpoint: 'paymentv2/vpcpay.html',         
//         queryDrRefundEndpoint: 'merchant_webapi/api/transaction', 
//         getBankListEndpoint: 'qrpayauth/api/merchant/get_bank_list', 
//     }
// });
// const tomorrow = new Date();
// tomorrow.setDate(tomorrow.getDate() + 1);

// const paymentUrl = vnpay.buildPaymentUrl({
//     vnp_Amount: `${OrderbyID.totalPrice}`,
//     vnp_IpAddr: '127.0.0.1',
//     vnp_TxnRef: `${orderId}`,
//     vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
//     vnp_OrderType: ProductCode.Other,
//     vnp_ReturnUrl: 'http://localhost:5001/api/payment/check-payment-vnpay',
//     vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
//     vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
//     vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
// });
// return res.status(201).json(paymentUrl)
// })
// routes.get('/check-payment-vnpay', async(req , res)=>{
//     console.log(req.query)
//     const {vnp_ResponseCode,vnp_TransactionStatus,vnp_TxnRef }= req.query
//     if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
//       const order = await Order.findById(vnp_TxnRef);
//        if (!order) {
//          return res.status(404).json({ status: 'error', message: 'Không tìm thấy đơn hàng!' });
//        }
//     const result = await Order.findByIdAndUpdate(
//       vnp_TxnRef,
//       { isPaid: true, paidAt: new Date(), status : 'confirmed'}, 
//       { new: true } 
//     );
//     console.log('Đơn hàng đã cập nhật:', result);
//       return res.redirect(`http://localhost:5173?status=success`);
//     } else {
//              const result = await Order.findByIdAndDelete(req.query.vnp_TxnRef);
//              for (const item of result.oderItems) {
//                   const product = await Product.getProductDetail(item.Product);
                  
//                   if (!product) {
//                      return res.status(404).json({ status: 'Err', message: `Không tìm thấy sản phẩm ID ${item.name}` });
//                    }
//                    if (item.amount > product.countInStock) {
//                      return res.status(400).json({ status: 'Err', message: `Sản phẩm "${product.name}" chỉ còn ${product.countInStock} săn phẩm  trong kho nên không đủ hàng tồn kho` });
//                    }}

//                    for (const item of result.oderItems) {
//                          const product = await Product.getProductDetail(item.Product);
//                          product.countInStock += item.amount;
//                          product.selled -= item.amount
                   
//                          await Product.updateProduct(item.Product, { countInStock: product.countInStock , selled: product.selled});
//                        }
//             console.log('Đã xóa:', result);
//             return res.redirect(`http://localhost:5173?status=error`);
//      }
// })
routes.post('/creatvnpay',VnPayController.createVNPayPayment);

routes.get('/check-payment-vnpay',VnPayController.handleVNPayIPN);
             
                     
export default routes;
