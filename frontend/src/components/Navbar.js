import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/features/auth/authAction";

function Navbar() {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {token ? (
                    <>
                        {user?.role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}
                        {user?.role === "store" && <li><Link to="/store">Store Dashboard</Link></li>}
                        {user?.role === "organisation" && <li><Link to="/organisation">Organisation Dashboard</Link></li>}
                        {user?.role === "hotel" && <li><Link to="/hotels">Hotel Dashboard</Link></li>}
                        <li><Link to="/cart">Cart</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
