// Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: parseInt(value) } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);
    const totalSaved = cart.reduce((acc, item) => acc + ((item.mrp - item.discountedPrice) * item.quantity), 0);

    return (
        <div className="cart">
            <h2>Cart</h2>
            <div className="cart-list">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <div className="cart-price-info">
                                    <span className="cart-mrp">MRP: ₹{item.mrp}</span>
                                    <span className="cart-discounted-price">Discounted: ₹{item.discountedPrice}</span>
                                    <span className="cart-you-save">You Save: ₹{item.mrp - item.discountedPrice}</span>
                                    <div className="quantity-container">
                                        <label htmlFor={`cart-quantity-${item.id}`}>Quantity:</label>
                                        <input
                                            type="number"
                                            id={`cart-quantity-${item.id}`}
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            className="quantity-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cart-buttons">
                                <button onClick={() => removeItem(item.id)} className="remove-btn">Remove</button>
                                <button onClick={() => navigate('/login')} className="buy-now-btn">Buy Now</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="checkout-container">
                    <h3>Total Price: ₹{totalPrice}</h3>
                    <h3>Total Saved: ₹{totalSaved}</h3>
                    <div className="checkout-buttons">
                        <button onClick={() => navigate('/login')} className="checkout-btn">Checkout</button>
                        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
