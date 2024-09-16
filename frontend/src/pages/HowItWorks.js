import React from 'react';
import './HowItWorks.css';
import { FaStore, FaCartPlus, FaSignInAlt, FaBox, FaHistory } from 'react-icons/fa';
import { IoMdContact } from 'react-icons/io';

function HowItWorks() {
    return (
        <div className="how-it-works">
            <h2>How It Works</h2>
            <p>Good2Give connects surplus food from sellers with those in need. Here’s how our platform works for different users:</p>
            
            <div className="content-wrapper">
                <div className="section buyer">
                    <div className="section-header">
                        <h3>User/Individual or NGO/Organization</h3>
                    </div>
                    <div className="steps">
                        <div className="step-card">
                            <FaSignInAlt className="step-icon" />
                            <h4>1. Register</h4>
                            <p>Sign up as a User/Individual or NGO/Organization. Provide your details and verify your email.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaSignInAlt className="step-icon" />
                            <h4>2. Login</h4>
                            <p>Log in to your account using your credentials to access the platform.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaCartPlus className="step-icon" />
                            <h4>3. Browse Products</h4>
                            <p>Browse through products listed by hotels and stores. Use filters to narrow your search.</p>
                        </div>
                        
                        <div className="step-card">
                            <IoMdContact className="step-icon" />
                            <h4>4. Purchase or Request</h4>
                            <p>Proceed with your purchase or request products for your community.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaHistory className="step-icon" />
                            <h4>5. Admin Approval</h4>
                            <p>All requests are subject to admin approval. You'll be notified once your request is processed.</p>
                        </div>
                    </div>
                </div>
                
                <div className="section seller">
                    <div className="section-header">
                        <h3>Hotels and Stores</h3>
                    </div>
                    <div className="steps">
                        <div className="step-card">
                            <FaStore className="step-icon" />
                            <h4>1. Register</h4>
                            <p>Sign up as a Hotel or Store. Provide your business details and verify your account.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaSignInAlt className="step-icon" />
                            <h4>2. Login</h4>
                            <p>Log in to your seller account to start managing your products.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaBox className="step-icon" />
                            <h4>3. List Products</h4>
                            <p>Add your surplus food products. Include details like name, description, and images.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaBox className="step-icon" />
                            <h4>4. Manage Products</h4>
                            <p>View and manage your products. Update details, remove items, or adjust availability.</p>
                        </div>
                        
                        <div className="step-card">
                            <FaHistory className="step-icon" />
                            <h4>5. View Product History</h4>
                            <p>Track the history of your products including sold items and request statuses.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
