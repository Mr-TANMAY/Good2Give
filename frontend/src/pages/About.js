import React from 'react';
import './About.css';

// Import images if located in the src folder
import missionImage from '../assets/images/a1.jpg';
import visionImage from '../assets/images/a2.jpg';
import logoImage from '../assets/images/logo1.png';
import teamImage from '../assets/images/a4.jpg';
import impactImage from '../assets/images/a3.jpg';

function About() {
    return (
        <div className="about">
            <h2 className="about-heading">About Us</h2>
            <p className="intro">
                At Good2Give, we bridge the gap between surplus food and those in need. Learn more about our mission, vision, and the impact we've made in the community.
            </p>

            {/* Logo and introductory content */}
            <section className="section about-section">
                <div className="section-left">
                    <img src={logoImage} alt="Good2Give Logo" className="about-image logo" />
                </div>
                <div className="section-right">
                    <p className="highlight-text">
                        “Good2Give connects food providers and NGOs, reducing waste and feeding those in need.”
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="section about-section">
                <div className="section-left">
                    <h3 className="section-title">Our Mission</h3>
                    <p>
                        India wastes about 40% of its food production, contributing to malnutrition and hunger. Good2Give’s mission is to address this by connecting food providers such as hotels, grocery stores, and households with nearby NGOs and individuals in need. Our platform enables the redistribution of surplus food to minimize waste and help those struggling with food insecurity.
                    </p>
                </div>
                <div className="section-right">
                    <img src={missionImage} alt="Our Mission" className="about-image" />
                </div>
            </section>

            {/* Vision Section */}
            <section className="section about-section">
                <div className="section-left">
                    <img src={visionImage} alt="Our Vision" className="about-image" />
                </div>
                <div className="section-right">
                    <h3 className="section-title">Our Vision and Goal</h3>
                    <p>
                        We envision a future where food waste is a thing of the past. Our goal is to create a world where surplus food is redirected to those in need, benefiting both the environment and our communities. By reducing waste, we contribute to a more sustainable planet.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="section about-section">
                <div className="section-left">
                    <h3 className="section-title">Our Team</h3>
                    <p>
                    We, two best friends, Mr. Tanmay Kadam and Mr. Tushar Parkar, founded Good2Give with a shared vision of reducing food waste and helping those in need. What started as a simple idea has grown into an initiative aimed at tackling food insecurity. As BSc Computer Science students at Patkar Varde College, we balance our academic journey with our passion for making a positive impact. While we began as a duo, we are eager to welcome many more to join us on this mission to make a lasting difference.
                    </p>
                </div>
                <div className="section-right">
                    <img src={teamImage} alt="Our Team" className="about-image" />
                </div>
            </section>

            {/* Impact Section */}
            <section className="section about-section">
                <div className="section-left">
                    <img src={impactImage} alt="Our Impact" className="about-image" />
                </div>
                <div className="section-right">
                    <h3 className="section-title">Our Impact</h3>
                    <p>
                    Since our inception, Good2Give is on a mission to create a significant impact by rescuing and redistributing surplus food across the country. While we are just beginning our journey, we are committed to reducing food waste and ensuring that nutritious meals reach those who need them the most. We believe that with time, effort, and support, we will help millions of people, reduce waste, and contribute to a more sustainable future.
                    </p>
                    <p className="impact-highlight">Join us in our journey to end food waste and hunger.</p>
                </div>
            </section>
        </div>
    );
}

export default About;