import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Resources from './pages/Resources';
import About from './pages/About';
import Contact from './pages/Contact';
import User from './pages/User';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/Cart'; // Import the Cart component
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [cart, setCart] = useState([]); // Initialize cart state

    return (
        <>
            <ToastContainer/>
            <Header />
            <Routes>
                <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user" element={<User />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart cart={cart} />} /> {/* Add the Cart route */}
            </Routes>
            <Footer />
        </>
    );
}

export default App;
