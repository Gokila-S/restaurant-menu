import React, { useState, useEffect } from 'react';
import Icon from '../common/Icon';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${isScrolled ? 'sticky-scrolled' : ''}`}>
            <div className="logo">🥗Foodify</div>
            <nav className="main-nav">
                <ul>
                    <li><a href="#menu" className="active">Menu</a><span className="active-indicator active-line"></span></li>
                    <li><a href="#specials">Specials</a><span className="active-indicator"></span></li>
                    <li><a href="#reservations">Reservations</a><span className="active-indicator"></span></li>
                    <li><a href="#contact">Contact</a><span className="active-indicator"></span></li>
                </ul>
            </nav>
            <div className="user-actions">
                <button className="add-recipe-btn">Order Online</button>
                <div className="user-avatar-dropdown">
                    <Icon name="User" />
                </div>
            </div>
        </header>
    );
};

export default Header;
