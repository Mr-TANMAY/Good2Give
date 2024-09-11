import React from 'react';
import ImageSlider from '../components/ImageSlider';
import ProductList from './produts/ProductList';
import PurchasedProductsSidebar from './PurchasedProductsSidebar';
import './StoreHome.css';
function OrganisationHome() {
    return (
        <div>
            <ImageSlider />
            <h1 className="store-heading">Welcome Organisation</h1>
            <ProductList/>
            <PurchasedProductsSidebar/>
            {/* Organisation-specific content */}
        </div>
    );
}

export default OrganisationHome;
