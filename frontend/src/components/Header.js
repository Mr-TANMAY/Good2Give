import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// Import the user icon from react-icons
import { FaUser } from 'react-icons/fa';

function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

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
            <div className="user-icon">
                <Link to="/user">
                    <FaUser size={30} /> {/* User icon */}
                </Link>
            </div>
        </header>
    );
}

export default Header;
