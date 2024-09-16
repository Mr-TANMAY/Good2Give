// src/components/Statistics.js
import React from 'react';
import { FaUsers, FaIndustry, FaTrashAlt } from 'react-icons/fa';
import './Statistics.css';

function Statistics() {
    return (
        <div className="statistics">
            <div className="stat">
                <div className="stat-icon users-icon">
                    <FaUsers size={50} />
                </div>
                <h3>Population of India</h3>
                <p className="highlight">Approximately <span className="number">1.4 billion</span> people</p>
                <p className="details">India is the second most populous country in the world, with a population that continues to grow rapidly.</p>
            </div>
            <div className="stat">
                <div className="stat-icon industry-icon">
                    <FaIndustry size={50} />
                </div>
                <h3>Food Production in India</h3>
                <p className="highlight">Approximately <span className="number">300 million tons</span> of food produced annually</p>
                <p className="details">India is one of the largest producers of food in the world, yet a significant portion is wasted every year.</p>
            </div>
            <div className="stat">
                <div className="stat-icon waste-icon">
                    <FaTrashAlt size={50} />
                </div>
                <h3>Food Waste in India</h3>
                <p className="highlight">Approximately <span className="number waste-number">67 million tons</span> of food wasted annually</p>
                <p className="details">Food waste in India contributes to both economic loss and environmental challenges, highlighting the need for improved food management practices.</p>
            </div>
        </div>
    );
}

export default Statistics;
