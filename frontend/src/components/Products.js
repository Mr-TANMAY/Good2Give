// Products.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import image1 from '../assets/images/maggi.png'
const productList = [
    { id: 1, name: 'Product 1', image: image1, mrp: 100, discountedPrice: 80 },
    { id: 2, name: 'Product 2', image: 'path/to/image2.jpg', mrp: 150, discountedPrice: 120 },
    { id: 3, name: 'Product 3', image: 'path/to/image3.jpg', mrp: 200, discountedPrice: 150 },
    { id: 4, name: 'Product 4', image: 'path/to/image4.jpg', mrp: 250, discountedPrice: 200 },
    { id: 5, name: 'Product 5', image: 'path/to/image5.jpg', mrp: 300, discountedPrice: 250 },
    { id: 6, name: 'Product 6', image: 'path/to/image6.jpg', mrp: 350, discountedPrice: 300 },
    { id: 7, name: 'Product 7', image: 'path/to/image7.jpg', mrp: 400, discountedPrice: 350 },
    { id: 8, name: 'Product 8', image: 'path/to/image8.jpg', mrp: 450, discountedPrice: 400 },
];

function Products() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [quantity, setQuantity] = useState({});
    const navigate = useNavigate();

    const handleQuantityChange = (id, value) => {
        setQuantity((prev) => ({ ...prev, [id]: value }));
    };

    const addToCart = (product, qty) => {
        const updatedCart = [...cart, { ...product, quantity: parseInt(qty) }];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleMoreProducts = () => {
        navigate('/login'); // Adjust the path as needed
    };

    return (
        <div className="products">
            <h2>Products</h2>
            <div className="product-list">
                {productList.map((product) => {
                    const savings = product.mrp - product.discountedPrice;
                    return (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <div className="product-details">
                                <span className="product-price">MRP: ₹{product.mrp}</span>
                                <span className="product-discounted-price">Discounted: ₹{product.discountedPrice}</span>
                                <span className="you-save">You Save: ₹{savings}</span>
                                <div className="quantity-container">
                                    <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                                    <input
                                        type="number"
                                        id={`quantity-${product.id}`}
                                        min="1"
                                        value={quantity[product.id] || 1}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                        className="quantity-input"
                                    />
                                </div>
                            </div>
                            <div className="button-container">
                                <button onClick={() => addToCart(product, quantity[product.id] || 1)} className="add-to-cart-btn">Add to Cart</button>
                                <button onClick={() => navigate('/login')} className="buy-now-btn">Buy Now</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={handleMoreProducts} className="more-products-btn">More Products</button>
        </div>
    );
}

export default Products;
