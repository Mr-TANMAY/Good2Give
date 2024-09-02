import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./authAction";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Define additional reducers here if needed
  },
  extraReducers: (builder) => {
    //user login
    // Handle the pending state for user login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state for user login
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;

      // Clear any previous error on successful login
      state.error = null;
    });

    // Handle the rejected state for user login
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;

      // Optionally, clear the user and token on login failure
      state.user = null;
      state.token = null;
    });

    //user Registration

    // Handle the pending state for registration
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Handle the fulfilled state for user registration
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;

      // Clear any previous error on successful registration
      state.error = null;
    });

    // Handle the rejected state for user registration
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;

      // Optionally, clear the user and token on registration failure
      state.user = null;
      state.token = null;
    });
  },
});

export default authSlice.reducer;
