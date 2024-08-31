import React from 'react';
import './About.css';

// Import images if located in the src folder
import missionImage from '../assets/images/4.png';
import visionImage from '../assets/images/4.png';

function About() {
    return (
        <div className="about">
            <h2>About Us</h2>
            <p className="intro">
                Learn more about Good2Give, our mission, our team, and our impact in the community.
            </p>

            <section className="mission">
                <h3>Our Mission</h3>
                <img src={missionImage} alt="Our Mission" className="about-image" />
                <p>
                    India wastes about 40% of its food production, which is a significant percentage. This leads to malnutrition and starvation. Good2Give connects hotels, grocery stores, and households with nearby NGOs and individuals in need to reduce food waste. The platform facilitates the redistribution of surplus food and near-expiry grocery products, minimizing waste and supporting those facing food insecurity.
                </p>
            </section>

            <section className="vision">
                <h3>Our Vision and Goal</h3>
                <img src={visionImage} alt="Our Vision" className="about-image" />
                <p>
                    We envision a future where food waste is minimized, and surplus food is redirected to those in need. Our goal is to create a sustainable system that benefits the community and the environment by reducing waste and feeding the hungry.
                </p>
            </section>

            <section className="team">
                <h3>Our Team</h3>
                <p>
                    Meet the dedicated team behind Good2Give who are passionate about reducing food waste and helping those in need.
                </p>
            </section>

            <section className="tutor">
                <h3>Tutoring and Training</h3>
                <p>
                    We provide training and resources for households, hotels, and grocery stores to manage food better and reduce waste. Our programs aim to educate and empower communities to take action against food waste.
                </p>
            </section>

            <section className="impact">
                <h3>Our Impact</h3>
                <p>
                    Since our inception, Good2Give has made a significant impact by reducing food waste and feeding those in need. We continue to expand our reach and effectiveness, making a difference in communities across the country.
                </p>
            </section>
        </div>
    );
}

export default About;
