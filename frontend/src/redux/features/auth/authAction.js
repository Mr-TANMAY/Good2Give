import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API"; // Ensure API is correctly configured
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// LOGIN ACTION
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post("auth/login", { role, email, password });
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        return { user: data.user, token: data.token };
      } else {
        return rejectWithValue(data.message || "Login failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// REGISTER ACTION
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      role,
      name,
      email,
      password,
      organisationName,
      hotelName,
      storeName,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("auth/register", {
        role,
        name,
        email,
        password,
        organisationName,
        hotelName,
        storeName,
        address,
        phone,
      });

      if (data.success) {
        toast.success("User registered successfully");
        return { user: data.user, token: data.token };
      } else {
        return rejectWithValue(data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// GET CURRENT USER ACTION
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/auth/currentUser");
      if (res.data.success) {
        return { user: res.data.user };
      }
      return rejectWithValue("Failed to fetch current user");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// LOGOUT ACTION
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      return;
    } catch (error) {
      return rejectWithValue("Logout failed.");
    }
  }
);

