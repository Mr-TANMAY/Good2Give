import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post("auth/login", { role, email, password });
      const data = response.data;

      if (data.success) {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("token", data.token);
        } else {
          return rejectWithValue("Local storage is not available.");
        }
        toast.success(data.message);

        // Perform role-based redirection
        if (data.user.role === "admin") {
          window.location.replace("/admin");
        } else if (data.user.role === "organisation") {
          window.location.replace("/organisation");
        } else if (data.user.role === "stores") {
          window.location.replace("/store");
        } else if (data.user.role === "hotel") {
          window.location.replace("/hotels");
        } else {
          window.location.replace("/user");
        }

        return data.user;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


//register
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

        // Perform role-based redirection
        setTimeout(() => {
          if (role === "admin") {
            window.location.replace("/admin");
          } else if (role === "organisation") {
            window.location.replace("/organisation");
          } else if (role === "store") {
            window.location.replace("/stores");
          } else if (role === "hotel") {
            window.location.replace("/hotels");
          } else {
            window.location.replace("/user");
          }
        }, 1000);

        return data;
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


  //current user
  export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async ({ rejectWithValue }) => {
      try {
        const res = await API.get("/auth/currentUser");
        if (res.data) {
          return res?.data;
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );