import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; // Import the reducer directly
import productReducer from  "./features/product/productSlice"; // Import the reducer directly
const store = configureStore({
  reducer: {
    auth: authReducer, // Use the imported reducer directly
    products: productReducer,
  },
});

export default store;
