import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

API.interceptors.request.use((req) => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");

  // If a token is found, set the Authorization header
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
