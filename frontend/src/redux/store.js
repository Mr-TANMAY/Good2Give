import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; // Import the reducer directly
import productReducer from  "./features/product/productSlice"; // Import the reducer directly
import orderReducer from "./features/orders/orderSlice";
const store = configureStore({
  reducer: {
    auth: authReducer, // Use the imported reducer directly
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
