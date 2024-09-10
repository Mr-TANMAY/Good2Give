// src/components/Statistics.js
import React from 'react';
import './Statistics.css';

function Statistics() {
    return (
        <div className="statistics">
            <div className="stat">
                <h3>Population of India</h3>
                <p>Approximately 1.4 billion people</p>
            </div>
            <div className="stat">
                <h3>Food Production in India</h3>
                <p>Approximately 300 million tons of food produced annually</p>
            </div>
            <div className="stat">
                <h3>Food Waste in India</h3>
                <p>Approximately 67 million tons of food wasted annually</p>
            </div>
        </div>
    );
}

export default Statistics;
