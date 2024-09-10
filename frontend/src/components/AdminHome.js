import React from 'react';
import ImageSlider from '../components/ImageSlider';
import AdminOrderManagement from './AdminOrderManagement';
import 'react-toastify/dist/ReactToastify.css';
import './StoreHome.css'; //
function AdminHome() {
    return (
        <div>
            <ImageSlider />
            <h1 className="store-heading">Welcome Admin</h1>
            <AdminOrderManagement/>
            {/* Admin-specific content */}
        </div>
    );
}

export default AdminHome;
