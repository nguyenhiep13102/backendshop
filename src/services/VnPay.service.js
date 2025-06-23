// import qs from 'qs';
// import crypto from 'crypto';
// import moment from 'moment';
// import dotenv from 'dotenv';

// dotenv.config();

// const createPaymentUrl = ({ amount, orderId, ipAddr }) => {
//   const vnp_Params = {
//     vnp_Version: '2.1.0',
//     vnp_Command: 'pay',
//     vnp_TmnCode: process.env.VNP_TMNCODE,
//     vnp_Amount: amount * 100,
//     vnp_CurrCode: 'VND',
//     vnp_TxnRef: orderId,
//     vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
//     vnp_Locale: 'vn',
//     vnp_ReturnUrl: process.env.VNP_RETURN_URL,
//     vnp_IpAddr: ipAddr,
//     vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
//     vnp_ExpireDate: moment().add(15, 'minutes').format('YYYYMMDDHHmmss'),
//     vnp_OrderType: 'other',
//   };

//   const sortedParams = Object.fromEntries(Object.entries(vnp_Params).sort());
//   const signData = qs.stringify(sortedParams, { encode: false });

//   const signed = crypto
//     .createHmac('sha512', process.env.VNP_HASH_SECRET)
//     .update(signData)
//     .digest('hex');

//   sortedParams.vnp_SecureHash = signed;
//   return `${process.env.VNP_URL}?${qs.stringify(sortedParams, { encode: true })}`;
// };

// const verifyVNPayIPN = (params) => {
//   const secureHash = params.vnp_SecureHash;
//   const clonedParams = { ...params };
//   delete clonedParams.vnp_SecureHash;
//   delete clonedParams.vnp_SecureHashType;

//   const sortedParams = Object.fromEntries(Object.entries(clonedParams).sort());
//   const signData = qs.stringify(sortedParams, { encode: false });

//   const signed = crypto
//     .createHmac('sha512', process.env.VNP_HASH_SECRET)
//     .update(signData)
//     .digest('hex');

//   return {
//     isValid: signed === secureHash,
//     data: clonedParams,
//   };
// };

// export default {
//   createPaymentUrl,
//   verifyVNPayIPN,
// };
