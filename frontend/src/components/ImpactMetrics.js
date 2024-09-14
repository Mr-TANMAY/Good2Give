import React, { useState, useEffect } from 'react';
import "../components/ImpactMetrics.css";

function ImpactMetrics() {
  const [mealsSaved, setMealsSaved] = useState(0);
  const [partners, setPartners] = useState(0);
  const [peopleFed, setPeopleFed] = useState(0);
  const [ngosConnected, setNgosConnected] = useState(0); // New state for NGOs/Organizations connected

  useEffect(() => {
    const incrementCounters = () => {
      if (mealsSaved < 500) setMealsSaved(mealsSaved + 1);
      if (partners < 50) setPartners(partners + 1);
      if (peopleFed < 1000) setPeopleFed(peopleFed + 1);
      if (ngosConnected < 50) setNgosConnected(ngosConnected + 1); // Increment NGOs/Organizations connected
    };

    const interval = setInterval(incrementCounters, 50);
    return () => clearInterval(interval);
  }, [mealsSaved, partners, peopleFed, ngosConnected]);

  return (
    <div className="impact-metrics-section">
      <h2>Our Impact</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>{mealsSaved}+</h3>
          <p>Meals Saved</p>
        </div>
        <div className="metric-card">
          <h3>{partners}+</h3>
          <p>Hotels/Stores Partnered</p>
        </div>
        <div className="metric-card">
          <h3>{peopleFed}+</h3>
          <p>People Fed</p>
        </div>
        <div className="metric-card"> {/* New card for NGOs/Organizations connected */}
          <h3>{ngosConnected}+</h3>
          <p>NGOs/Organizations Connected</p>
        </div>
      </div>
    </div>
  );
}

export default ImpactMetrics;
