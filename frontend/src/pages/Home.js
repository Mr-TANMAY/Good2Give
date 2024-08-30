import React from 'react';
import ImageSlider from '../components/ImageSlider';
import Statistics from '../components/Statistics';
import Goals from '../components/Goals';

function Home() {
    return (
        <div className="home">
            <ImageSlider />
            <Statistics />
            <Goals />
        </div>
    );
}

export default Home;
