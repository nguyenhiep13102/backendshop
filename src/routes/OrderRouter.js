import express from 'express';
import OrderController from '../controllers/OrderController.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';
let routes = express.Router();


routes.get('/get/:id', OrderController.OrderProduct);
routes.post('/creatOrder',authMiddlewares.authMiddleware,  OrderController.creatOrderProduct);
routes.get('/get-Order-detail/:id',authMiddlewares.authMiddleware,  OrderController.getOrderDetail);
routes.get('/DetailOrderbyid/:id',authMiddlewares.authMiddleware,  OrderController.DetailOrderbyid);
routes.post('/cancelOrder/:id',authMiddlewares.authMiddleware,  OrderController.DeleteOneOrder)
routes.get('/admin/getAllorders',OrderController.getAllorders )
routes.get('/admin/getAllorders2',authMiddlewares.authMiddleware,authMiddlewares.adminMiddlewarw,OrderController.getOrdersByStatus )
routes.post('/admin/update-status/:id',authMiddlewares.authMiddleware,authMiddlewares.adminMiddlewarw,OrderController.updateOrderStatus )

export default routes;