import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { useSelector } from 'react-redux';
import AddProductForm from './Shared/Form/AddProductForm';
import './StoreHome.css';

function HotelHome() {
    const userRole = useSelector((state) => state.auth.user.role)
    return (
        <div>
            <ImageSlider />
            <h1 className="store-heading">Welcome Hotel</h1>
            {userRole === 'hotel' && <AddProductForm/>}
            {/* Hotel-specific content */}
        </div>
    );
}

export default HotelHome;
