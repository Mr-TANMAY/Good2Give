import React from 'react';
import {Route, Routes } from 'react-router-dom';
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

function App() {
    return (
        <>
        <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user" element={<User />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/register" element = { < Register /> } />
            </Routes>
            
        <Footer />
        </>
    );
}

export default App;
