import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { useSelector } from 'react-redux';
import AddProductForm from './Shared/Form/AddProductForm';

function HotelHome() {
    const userRole = useSelector((state) => state.auth.user.role)
    return (
        <div>
            <ImageSlider />
            <h1>Welcome Hotel</h1>
            {userRole === 'hotel' && <AddProductForm/>}
            {/* Hotel-specific content */}
        </div>
    );
}

export default HotelHome;
