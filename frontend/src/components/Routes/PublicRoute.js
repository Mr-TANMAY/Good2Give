import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // Check if token exists in localStorage
  if (localStorage.getItem("token")) {
    // Redirect to the home page if the token is present
    return <Navigate to="/" />;
  } else {
    // Render the children if no token is present
    return children;
  }
};

export default PublicRoute;
