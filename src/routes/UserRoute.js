import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddlewares from '../middlewares/authMiddlewares.js';
let routes = express.Router();


routes.post('/sign-up', UserController.createUser);
routes.post('/sign-in', UserController.loginUser);
routes.put('/update-user/:id', UserController.updateUser);
routes.delete('/delete-user/:id', UserController.deleteUser);
routes.delete('/delete-user-admin/:id',authMiddlewares.authMiddleware,authMiddlewares.adminMiddlewarw, UserController.deleteUser);
routes.get('/getAll',authMiddlewares.authMiddleware,authMiddlewares.adminMiddlewarw, UserController.getAllUsers);
routes.get('/getUserDetail/:id', UserController.getUserDetail);
routes.post('/refresh-token', UserController.refreshToken);


export default routes;