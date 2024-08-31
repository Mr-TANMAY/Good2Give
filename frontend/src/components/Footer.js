import React, { useState } from 'react';
import './Footer.css';
import { FaArrowUp, FaMoon, FaSun } from 'react-icons/fa';

function Footer() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <footer>
            <div className="footer-content">
                <p>Copyright © 2024 | Design by Tushar Parkar & Tanmay Kadam</p>
                <div className="footer-icons">
                    <button onClick={toggleDarkMode}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <a href="#top"><FaArrowUp /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
