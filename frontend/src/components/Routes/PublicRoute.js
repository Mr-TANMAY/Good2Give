import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    // Redirect to the home page if the token is present
    return <Navigate to="/" />;
  } else {
    // Render the children if no token is present
    return children;
  }
};

export default PublicRoute;
