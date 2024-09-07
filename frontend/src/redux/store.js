import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; // Import the reducer directly

const store = configureStore({
  reducer: {
    auth: authReducer, // Use the imported reducer directly
  },
});

export default store;
