import UserRoute from "../routes/UserRoute.js";
import ProductRouter from '../routes/ProductRouter.js'

let routes = (app ) => {
    app.use('/api/user', UserRoute);
    app.use('/api/Product', ProductRouter)

};
export default routes ; 