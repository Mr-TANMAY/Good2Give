import React from 'react';
import Slider from 'react-slick';
import './ImageSlider.css';

// Import images
import image1 from '../assets/images/s1.png';
import image2 from '../assets/images/s3.png';
import image3 from '../assets/images/s5.jpg';
import image4 from '../assets/images/s6.png';
import image5 from '../assets/images/s7.png';

const images = [image1, image2, image3, image4, image5];

function ImageSlider() {
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Enable continuous loop
        speed: 400, // Transition speed in milliseconds
        slidesToShow: 1, // Number of slides to show at a time
        slidesToScroll: 1, // Number of slides to scroll at a time
        autoplay: true, // Enable automatic sliding
        autoplaySpeed: 2000, // Time between slides in milliseconds
        arrows: true, // Show navigation arrows
    };

    return (
        <div className="image-slider">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slider-item">
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImageSlider;
