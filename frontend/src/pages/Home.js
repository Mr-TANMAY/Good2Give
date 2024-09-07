import React from 'react';
import { useSelector } from 'react-redux';
import ImageSlider from '../components/ImageSlider';
import Statistics from '../components/Statistics';
import Goals from '../components/Goals';
import Products from '../components/Products';
import AdminHome from '../components/AdminHome';
import StoreHome from '../components/StoreHome';
import OrganisationHome from '../components/OrganisationHome';
import HotelHome from '../components/HotelHome';
import UserHome from '../components/UserHome';

function Home() {
    const { user } = useSelector((state) => state.auth);

    const renderHomeContent = () => {
        if (!user) {
            // Content for users who are not logged in
            return (
                <>
                    <ImageSlider />
                    <Statistics />
                    <Products />
                    <Goals />
                </>
            );
        }

        // Content based on user role
        switch (user.role) {
            case 'admin':
                return <AdminHome />;
            case 'store':
                return <StoreHome.js />;
            case 'organisation':
                return <OrganisationHome />;
            case 'hotel':
                return <HotelHome />;
            case 'user':
                return <UserHome />;

        }
    };

    return (
        <div className="home">
            {renderHomeContent()}
        </div>
    );
}

export default Home;
