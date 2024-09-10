import React from 'react';
import ImageSlider from '../components/ImageSlider';
import ProductList from './produts/ProductList';
import './StoreHome.css';
function UserHome() {
    return (
        <div>
            <ImageSlider />
            <h1 className="store-heading">Welcome User</h1>
            <ProductList/>
            {/* User-specific content */}
        </div>
    );
}

export default UserHome;
