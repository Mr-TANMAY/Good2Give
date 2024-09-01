import React from 'react';
import ImageSlider from '../components/ImageSlider';
import Statistics from '../components/Statistics';
import Goals from '../components/Goals';
import Products from '../components/Products';

function Home() {
    return (
        <div className="home">
            <ImageSlider />
            <Statistics />
            <Products />  {/* Add the Products component here */}
            <Goals />
        </div>
    );
}

export default Home;
