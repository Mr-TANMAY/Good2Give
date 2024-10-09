// src/App.js
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoute from "./components/Routes/PublicRoute";
import Organisation from "./pages/Organisation";
import Store from "./pages/Store";
import Hotels from "./pages/Hotels";
import Admin from "./pages/Admin";
import User from "./pages/User";
import API from "./services/API";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/features/auth/authAction";
import Article from './pages/Article';
import Faq from './pages/Faq';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get("auth/currentUser");
        if (data?.success) {
          dispatch(getCurrentUser(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/article" element={<Article />} />
        <Route path="/faq" element={<Faq />} />
       
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              {user?.role === 'admin' ? <Admin /> : <Navigate to="/" />}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoutes>
              {user?.role === 'user' || user?.role === 'ngo' ? <User /> : <Navigate to="/" />}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoutes>
              {user?.role === 'ngo' ? <Organisation /> : <Navigate to="/" />}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoutes>
              {user?.role === 'store' ? <Store /> : <Navigate to="/" />}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hotels"
          element={
            <ProtectedRoutes>
              {user?.role === 'hotel' ? <Hotels /> : <Navigate to="/" />}
            </ProtectedRoutes>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
