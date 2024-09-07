import React from 'react';
import ImageSlider from '../components/ImageSlider';

function AdminHome() {
    return (
        <div>
            <ImageSlider />
            <h1>Welcome Admin</h1>
            {/* Admin-specific content */}
        </div>
    );
}

export default AdminHome;
