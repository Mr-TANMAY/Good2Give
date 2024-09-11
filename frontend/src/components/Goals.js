import React from 'react';
import './Goals.css';
import g1 from '../assets/images/g1.jpg';
import g2 from '../assets/images/g2.jpg';
import g3 from '../assets/images/g3.png';
import g4 from '../assets/images/g4.jpg';

function Goals() {
    return (
        <div className="goals">
            <h2>Our Vision and Goals</h2>
            <div className="goal-content">
                <div className="goal-item">
                    <img src={g1} alt="Reducing Food Waste" />
                    <h3>Reduce Food Waste</h3>
                    <p>Our primary goal is to drastically cut down food waste by connecting surplus food from hotels and stores with individuals and organizations in need. We aim to make a significant impact on food wastage across the community.</p>
                </div>
                <div className="goal-item">
                    <img src={g2} alt="Support Local Communities" />
                    <h3>Support Local Communities</h3>
                    <p>We strive to support local communities by ensuring that excess food reaches those who need it the most. By partnering with local businesses and NGOs, we help strengthen community ties and foster a spirit of giving.</p>
                </div>
                <div className="goal-item">
                    <img src={g3} alt="Promote Sustainable Practices" />
                    <h3>Promote Sustainable Practices</h3>
                    <p>Our platform promotes sustainable practices by encouraging food donation and reducing wastage. We advocate for practices that contribute to a more sustainable and eco-friendly environment.</p>
                </div>
                <div className="goal-item">
                    <img src={g4} alt="Enhance Food Security" />
                    <h3>Enhance Food Security</h3>
                    <p>We aim to enhance food security by ensuring that surplus food is redistributed efficiently. By improving access to food for vulnerable populations, we work towards a future where no one goes hungry.</p>
                </div>
            </div>
        </div>
    );
}

export default Goals;
