import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for adding product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/products/add",
        productData
      );
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching available products
export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.get(
        "http://localhost:8080/api/v1/products/list",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log('APi response:',response.data);
      
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data); // Pass the error message to the Redux state
    }
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],  // Initialize products as an empty array
    loading: false,  // Initialize loading as false
    error: null,    // Initialize error as null to handle errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;  // Reset error when fetching starts
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching products';  // Handle error
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productsSlice.reducer;

