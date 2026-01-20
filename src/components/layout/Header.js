import React, { useState, useEffect } from 'react';
import Icon from '../common/Icon';

const Header = ({ currentPage = 'menu', setCurrentPage }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (page) => {
        if (setCurrentPage) {
            setCurrentPage(page);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className={`navbar ${isScrolled ? 'sticky-scrolled' : ''}`}>
            <div className="logo" onClick={() => handleNavClick('menu')} style={{ cursor: 'pointer' }}>🥗Foodify</div>
            <nav className="main-nav">
                <ul>
                    <li>
                        <a 
                            onClick={(e) => { e.preventDefault(); handleNavClick('menu'); }} 
                            className={currentPage === 'menu' ? 'active' : ''}
                            style={{ cursor: 'pointer' }}
                        >
                            Menu
                        </a>
                        <span className={`active-indicator ${currentPage === 'menu' ? 'active-line' : ''}`}></span>
                    </li>
                    <li>
                        <a 
                            onClick={(e) => { e.preventDefault(); handleNavClick('specials'); }} 
                            className={currentPage === 'specials' ? 'active' : ''}
                            style={{ cursor: 'pointer' }}
                        >
                            Specials
                        </a>
                        <span className={`active-indicator ${currentPage === 'specials' ? 'active-line' : ''}`}></span>
                    </li>
                    <li>
                        <a 
                            onClick={(e) => { e.preventDefault(); handleNavClick('reservations'); }} 
                            className={currentPage === 'reservations' ? 'active' : ''}
                            style={{ cursor: 'pointer' }}
                        >
                            Reservations
                        </a>
                        <span className={`active-indicator ${currentPage === 'reservations' ? 'active-line' : ''}`}></span>
                    </li>
                    <li>
                        <a 
                            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} 
                            style={{ cursor: 'pointer' }}
                        >
                            Contact
                        </a>
                        <span className="active-indicator"></span>
                    </li>
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
