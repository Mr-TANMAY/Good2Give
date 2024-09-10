import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to get the token (you may store it in localStorage or Redux)
const getToken = () => localStorage.getItem('token'); // Adjust according to where you store the token

// Thunk to fetch orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const token = getToken(); // Get the token
    const response = await axios.get("http://localhost:8080/api/v1/orders", {
      headers: {
        Authorization: `Bearer ${token}` // Add the token to the Authorization header
      }
    });
    return response.data.orders; // Assuming the backend sends orders array in the response
  } catch (error) {
    console.error('Error fetching orders:', error.response);
    return rejectWithValue(error.response.data || 'Failed to fetch orders');
  }
});

// Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = getToken(); // Get the token
      const response = await axios.post(
        "http://localhost:8080/api/v1/orders/update-status",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}` // Add the token to the Authorization header
          }
        }
      );
      return response.data.order; // Assuming the updated order is returned in the response
    } catch (error) {
      console.error('Error updating order status:', error.response);
      return rejectWithValue(error.response.data || 'Failed to update order status');
    }
  }
);

// Initial state for orders slice
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Orders slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.map(order => ({
          ...order,
          buyer: order.buyer || { name: 'Unknown' }, // Handle cases where buyer data is missing
        }));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update order status';
      });
  },
});

export default orderSlice.reducer;
