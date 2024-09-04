import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart"; // Import the Cart component
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoute from "./components/Routes/PublicRoute";
import Organisation from "./pages/Organisation";
import Store from "./pages/Store";
import Hotels from "./pages/Hotels";
import Admin from "./pages/Admin";
import User from "./pages/User";

function App() {
  const [cart, setCart] = useState([]); // Initialize cart state

  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home cart={cart} setCart={setCart} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart cart={cart} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <Admin />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoutes>
              <User />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoutes>
              <Organisation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoutes>
              <Store />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hotels"
          element={
            <ProtectedRoutes>
              <Hotels />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
