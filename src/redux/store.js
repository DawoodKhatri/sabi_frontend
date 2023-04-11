import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/commonSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export const dispatch = (action) => store.dispatch(action);

export default store;
