import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../services/API";
import { getCurrentUser } from "../../redux/features/auth/authAction";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await API.get("auth/currentUser");
        if (data?.success) {
          dispatch(getCurrentUser(data));
        }
      } catch (error) {
        localStorage.clear();
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
