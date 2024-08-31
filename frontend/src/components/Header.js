import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { FaUser } from 'react-icons/fa';

function Header() {
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

    return (
        <header>
            <div className="logo">
                <Link to="/" className="logo-text">
                    Good2Give
                </Link>
            </div>
            <nav>
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
                </ul>
            </nav>
            <div
                className="user-icon"
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
            >
                <div className="user-icon-wrapper">
                    <FaUser size={30} /> {/* User icon */}
                </div>
                {isDropdownOpen && (
                    <div
                        className="dropdown-menu"
                        onMouseEnter={showDropdown} // Keep it open when hovering over the dropdown
                        onMouseLeave={hideDropdown} // Hide when leaving the dropdown area
                    >
                        <Link to="/login" className="dropdown-item">Login</Link>
                        <Link to="/register" className="dropdown-item">Register</Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
