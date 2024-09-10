import React from 'react';
import ImageSlider from '../components/ImageSlider';
import ProductList from './produts/ProductList';

function UserHome() {
    return (
        <div>
            <ImageSlider />
            <h1>Welcome User</h1>
            <ProductList/>
            {/* User-specific content */}
        </div>
    );
}

export default UserHome;
