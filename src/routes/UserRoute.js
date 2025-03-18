import express from 'express';
import UserController from '../controllers/UserController.js';
let routes = express.Router();


routes.post('/', UserController.createUser)
routes.post('/login', UserController.loginUser)
export default routes;