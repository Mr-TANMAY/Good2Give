import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { FaUser,} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authAction'; // Correct import for logout action
import { BiUserCircle } from 'react-icons/bi';

function Header() {
    const { user } = useSelector((state) => state.auth); // Get user from Redux store
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentPath = location.pathname;

    // State to manage the user dropdown visibility
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    // State to manage the resources dropdown visibility
    const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

    // Function to show the user dropdown
    const showUserDropdown = () => {
        setIsUserDropdownOpen(true);
    };

    // Function to hide the user dropdown
    const hideUserDropdown = () => {
        setTimeout(() => {
            setIsUserDropdownOpen(false);
        }, 200); // Delay for better UX
    };

    // Function to show the resources dropdown
    const showResourcesDropdown = () => {
        setIsResourcesDropdownOpen(true);
    };

    // Function to hide the resources dropdown
    const hideResourcesDropdown = () => {
        setTimeout(() => {
            setIsResourcesDropdownOpen(false);
        }, 200); // Delay for better UX
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear localStorage
        dispatch(logout());   // Dispatch the logout action from authAction.js
        toast("Logout successfully");
        navigate('/'); // Redirect to home after logout
    };

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
                    <li
                        className="resources-menu"
                        onMouseEnter={showResourcesDropdown}
                        onMouseLeave={hideResourcesDropdown}
                    >
                        <Link to="#" className={currentPath === "/resources" ? "active" : ""}>Resources</Link>
                        <div className={`dropdown-menu resources-dropdown ${isResourcesDropdownOpen ? 'show' : ''}`}>
                            <Link to="/article" className="dropdown-item">Articles</Link>
                            <Link to="/faq" className="dropdown-item">FAQ</Link>
                        </div>
                    </li>
                    <li>
                        <Link to="/about" className={currentPath === "/about" ? "active" : ""}>About us</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={currentPath === "/contact" ? "active" : ""}>Contact</Link>
                    </li>
                    {user && (
                        <li>
                            <BiUserCircle /> Welcome, {user?.role} &nbsp;
                            <span className="badge text-bg-secondary">{user?.role}</span> {/* Show user role when logged in */}
                        </li>
                    )}
                </ul>
            </nav>
            <div className="header-icons">
                <div
                    className="user-icon"
                    onMouseEnter={showUserDropdown}
                    onMouseLeave={hideUserDropdown}
                >
                    <div className="user-icon-wrapper">
                        <FaUser size={30} /> {/* User icon */}
                    </div>
                    <div
                        className={`dropdown-menu ${isUserDropdownOpen ? 'show' : ''}`}
                        onMouseEnter={showUserDropdown}
                        onMouseLeave={hideUserDropdown}
                    >
                        {user ? (
                            <button className="dropdown-item logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <button className="dropdown-item login-button" onClick={handleLogin}>
                                    Login
                                </button>
                                <button className="dropdown-item register-button" onClick={handleRegister}>
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
