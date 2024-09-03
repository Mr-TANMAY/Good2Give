import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import default styles
import "./authAction.css";

// Custom Toast Styles
const toastStyle = {
  fontSize: "16px",
  borderRadius: "8px",
  padding: "10px",
  color: "#fff",
  background: "#333", // Default background
};

const successStyle = {
  ...toastStyle,
  background: "#28a745", // Green background for success
};

const errorStyle = {
  ...toastStyle,
  background: "#dc3545", // Red background for errors
};

// Define valid roles
const validRoles = ["admin", "user", "guest"]; // Adjust as needed

// Login action
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      if (!role || !email || !password) {
        toast.error("Please ensure all required fields are completed.", {
          style: errorStyle,
        });
        return rejectWithValue("All fields are required.");
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toast.error("Please provide a valid email address.", {
          style: errorStyle,
        });
        return rejectWithValue("Invalid email address.");
      }

      const response = await API.post("auth/login", { role, email, password });
      const data = response.data;

      if (data.success) {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("token", data.token);
        } else {
          console.error("Local storage is not available.");
          return rejectWithValue("Local storage is not available.");
        }

        toast.success("Login successful. Welcome back!", {
          style: successStyle,
        });
        return data;
      }

      toast.error("Login attempt was unsuccessful. Please verify your credentials.", {
        style: errorStyle,
      });
      return rejectWithValue(data.message || "Login failed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage, {
        style: errorStyle,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

// Register action
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
      // Check for required fields
      if (!role || !name || !email || !password) {
        toast.error("Please fill in all the mandatory fields.", {
          style: errorStyle,
        });
        return rejectWithValue("All required fields must be filled.");
      }

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toast.error("Please enter a valid email address.", {
          style: errorStyle,
        });
        return rejectWithValue("Invalid email address.");
      }

      // Validate role
      if (!validRoles.includes(role)) {
        toast.error("The selected role is not valid. Please choose a correct role.", {
          style: errorStyle,
        });
        return rejectWithValue("Invalid role.");
      }

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
        toast.success("Registration completed successfully. You can now log in.", {
          style: successStyle,
        });

        setTimeout(() => {
          window.location.replace("/login");
        }, 1000); // Adjust the delay as needed

        return data;
      } else {
        toast.error("Registration was not successful. Please review your information and try again.", {
          style: errorStyle,
        });
        return rejectWithValue(data.message || "Registration failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again later.";
      toast.error(errorMessage, {
        style: errorStyle,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

