import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import cloudinaryReducer from "./cloudinary.reducer";
import cartReducer from "./cart.reducer";
import drawerReducer from "./drawer.reducer";
import cartOrderReducers from "./cartOrder.reducer";
import couponReducers from "./coupon.reducer";
import codReducers from "./cod.reducer";
import adminReducers from "./admin.reducer";
import searchReducers from "./search.reducer";

export default combineReducers({
    auth: authReducer,
    product: productReducer,
    route: routeReducer,
    user: userReducer,
    category: categoryReducer,
    cloudinary: cloudinaryReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    cartOrder:cartOrderReducers,
    coupon: couponReducers,
    COD: codReducers,
    admin:adminReducers,
    search:searchReducers,
    
})