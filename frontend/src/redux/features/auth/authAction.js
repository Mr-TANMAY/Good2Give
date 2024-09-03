import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post("auth/login", { role, email, password });
      const data = response.data;

      // Log the response data for debugging
      console.log("API Response:", data);

      if (data.success) {
        try {
          // Check if localStorage is available
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("token", data.token);
          } else {
            console.error("Local storage is not available.");
            return rejectWithValue("Local storage is not available.");
          }

          toast.success(data.message);
          return data;
        } catch (storageError) {
          console.error("Failed to store token:", storageError);
          return rejectWithValue("Failed to store token.");
        }
      }

      return rejectWithValue("Login failed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
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
        stores,
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
          stores,
          address,
          phone,
        });
  
        if (data.success) {
          toast.success("User registered successfully");
  
          // Delay the redirect to allow the toast to display
          setTimeout(() => {
            window.location.replace("/login");
          }, 1000); // Adjust the delay as needed
  
          return data;
        } else {
          return rejectWithValue(data.message || "Registration failed");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
  
        // Show error toast if registration fails
        toast.error(errorMessage);
        
        return rejectWithValue(errorMessage);
      }
    }
  );
