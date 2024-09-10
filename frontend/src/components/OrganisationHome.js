import React from 'react';
import ImageSlider from '../components/ImageSlider';
import ProductList from './produts/ProductList';
function OrganisationHome() {
    return (
        <div>
            <ImageSlider />
            <h1>Welcome Organisation</h1>
            <ProductList/>
            {/* Organisation-specific content */}
        </div>
    );
}

export default OrganisationHome;
