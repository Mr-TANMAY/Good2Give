import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

// Request interceptor to add the Authorization header
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error) // Handle request error
);

// Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can customize error handling here (e.g., show notifications)
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
