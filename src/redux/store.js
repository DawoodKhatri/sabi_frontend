import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/commonSlice";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    common: commonReducer,
    user: userReducer,
  },
});
