import UserRoute from "../routes/UserRoute.js";

let routes = (app ) => {
    app.use('/api/user', UserRoute)
};
export default routes ; 