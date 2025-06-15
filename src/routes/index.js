import UserRoute from "../routes/UserRoute.js";
import ProductRouter from '../routes/ProductRouter.js'
import OrderRouter from '../routes/OrderRouter.js'
let routes = (app ) => {
    app.use('/api/user', UserRoute);
    app.use('/api/Product', ProductRouter)
    app.use('/api/Order', OrderRouter)


};
export default routes ; 