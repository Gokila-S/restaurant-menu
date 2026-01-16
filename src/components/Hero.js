import React from 'react';

const HeroSection = () => (
    <section className="hero-section">
        <div className="hero-content">
            <h1>Authentic South Indian Flavors</h1>
            <p>Experience the rich culinary heritage of South India with our traditional recipes and aromatic spices.</p>
            <div className="hero-cta-buttons">
                <button className="btn primary">View Today's Specials</button>
                <button className="btn secondary">Book a Table</button> 
            </div>
        </div>
        <div className="hero-illustration">
            <svg className="plate-illustration" viewBox="0 0 100 100" style={{width: '200px', height: '200px'}}>
                <circle cx="50" cy="50" r="40" fill="white" opacity="0.1" />
                <circle cx="50" cy="50" r="38" fill="white" opacity="0.15" />
                <circle cx="50" cy="50" r="35" fill="white" />
                <path d="M50 10 A30 30 0 0 1 75 30 L50 40 Z" fill="#22c55e" opacity="0.8" className="garnish-1"/> 
                <path d="M50 90 A30 30 0 0 1 25 70 L50 60 Z" fill="#ef4444" opacity="0.8" className="garnish-2"/> 
                <circle cx="65" cy="45" r="4" fill="#facc15" opacity="0.9" className="garnish-3"/> 
            </svg>
        </div>
    </section>
);

export default HeroSection;
