import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { useSelector } from 'react-redux';
import AddProductForm from './Shared/Form/AddProductForm';
import './StoreHome.css'; // Import the CSS for styling

function StoreHome() {
  const userRole = useSelector((state) => state.auth.user.role);

  return (
    <div className="store-home-container">
      <ImageSlider />
      <h1 className="store-heading">Welcome to the Store</h1>
      {userRole === 'stores' && <AddProductForm />}
    </div>
  );
}

export default StoreHome;
