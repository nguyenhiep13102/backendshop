import express from 'express';
import OrderController from '../controllers/OrderController.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';
let routes = express.Router();


routes.get('/get/:id', OrderController.OrderProduct);
routes.post('/creatOrder',authMiddlewares.authMiddleware,  OrderController.creatOrderProduct);
routes.get('/get-Order-detail/:id',authMiddlewares.authMiddleware,  OrderController.getOrderDetail);

export default routes;