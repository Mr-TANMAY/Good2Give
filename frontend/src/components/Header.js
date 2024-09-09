import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authAction';  // Correct import for logout action

import { BiUserCircle } from 'react-icons/bi';

function Header() {
    const { user } = useSelector((state) => state.auth); // Get user from Redux store
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    // State to manage the dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to show the dropdown
    const showDropdown = () => {
        setIsDropdownOpen(true);
    };

    // Function to hide the dropdown with a delay
    const hideDropdown = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 1000); // Short delay to allow moving the mouse to the dropdown
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear localStorage
        dispatch(logout());   // Dispatch the logout action from authAction.js
        toast("Logout successfully");
        navigate('/'); // Redirect to home after logout
    };
    
    // Handlers for Login and Register buttons
    const handleLogin = () => {
        navigate('/login');
    };
    
    const handleRegister = () => {
        navigate('/register');
    };
    return (
        <header>
            <div className="logo">
                <Link to="/" className="logo-text">
                    Good2Give
                </Link>
            </div>
            <nav className="nav-center">
                <ul>
                    <li>
                        <Link to="/" className={currentPath === "/" ? "active" : ""}>Home</Link>
                    </li>
                    <li>
                        <Link to="/how-it-works" className={currentPath === "/how-it-works" ? "active" : ""}>How it Works</Link>
                    </li>
                    <li>
                        <Link to="/resources" className={currentPath === "/resources" ? "active" : ""}>Resources</Link>
                    </li>
                    <li>
                        <Link to="/about" className={currentPath === "/about" ? "active" : ""}>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={currentPath === "/contact" ? "active" : ""}>Contact</Link>
                    </li>
                    {user && (
                        <li>
                            <BiUserCircle /> Welcome, {user?.role} &nbsp; <span class="badge text-bg-secondary">{user?.role}</span> {/* Show user role when logged in */}
                        </li>
                    )}
                </ul>
            </nav>
            <div className="header-icons">
                <Link to="/cart">
                    <FaShoppingCart size={30} />  {/* Cart icon */}
                </Link>
                <div
                    className="user-icon"
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
                >
                    <div className="user-icon-wrapper">
                        <FaUser size={30} /> {/* User icon */}
                    </div>
                    <div
                        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                    >
                        {user ? (
                            // Show Logout option if user is logged in
                            <button 
                                className="dropdown-item logout-button" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                {/* Show Login and Register options if user is not logged in */}
                                <button 
                                    className="dropdown-item login-button" 
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                                <button 
                                    className="dropdown-item register-button" 
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
