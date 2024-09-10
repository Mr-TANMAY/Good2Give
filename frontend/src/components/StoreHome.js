import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { useSelector } from 'react-redux';
import AddProductForm from './Shared/Form/AddProductForm';
function StoreHome() {
    const userRole = useSelector((state) => state.auth.user.role)
    return (
        <div>
            <ImageSlider />
            <h1>Welcome Store</h1>
            {userRole === 'stores' && <AddProductForm/>}
            
        </div>
    );
}

export default StoreHome;
