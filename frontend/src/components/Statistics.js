import React from 'react';
import './Statistics.css';

function Statistics() {
    return (
        <div className="statistics">
            <div className="stat">
                <h3>Population Stats</h3>
                <p>Details about population stats</p>
            </div>
            <div className="stat">
                <h3>Food Production Stats</h3>
                <p>Details about food production stats</p>
            </div>
            <div className="stat">
                <h3>Waste Stats</h3>
                <p>Details about waste stats</p>
            </div>
        </div>
    );
}

export default Statistics;
