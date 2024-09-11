import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for adding a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/products/add",
        productData
      );
      return response.data.product; // Adjusted to return a single product
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching available products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts", // Fixed the action type name
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get("http://localhost:8080/api/v1/products/list", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data); // Pass the error message to the Redux state
    }
  }
);

// Fetch user-specific products
export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/user-products/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch purchased products
export const fetchPurchasedProducts = createAsyncThunk(
  'products/fetchPurchasedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        "http://localhost:8080/api/v1/orders/user-purchases",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.orders; // Assuming response contains orders related to the user.
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Initialize products as an empty array
    userProducts: [], // Initialize user-specific products
    purchasedProducts: [], // New state for purchased products
    loading: false, // Initialize loading as false
    error: null, // Initialize error as null to handle errors
    status: "idle", // Status for tracking fetchUserProducts state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when fetching starts
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Set fetched products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching products"; // Handle error
      })
      // Add a new product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Add the new product to the state
      })
      // Fetch user-specific products
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPurchasedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchasedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.purchasedProducts = action.payload; // Set fetched purchased products
      })
      .addCase(fetchPurchasedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
