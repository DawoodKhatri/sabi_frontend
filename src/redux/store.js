import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/commonSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

export default configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    cart: cartReducer,
  },
});
