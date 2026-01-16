import React, { useState } from 'react';
import Icon from './common/Icon';

const DishCard = ({ dish, onCardClick }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const difficultyClass = dish.difficulty.toLowerCase().replace(/\s/g, '-');
    const priceFormatted = `₹${dish.price}`;

    const handleClick = (e) => {
        if (!e.target.closest('.bookmark-btn')) {
            onCardClick(dish);
        }
    };

    return (
        <div className="dish-card" onClick={handleClick}>
            <div className="card-image-wrapper">
                <img 
                    src={dish.image} 
                    alt={dish.title} 
                    className="dish-image" 
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = 'https://placehold.co/500x281/8B5CF6/ffffff?text=Image+Not+Available';
                    }}
                />
                <div className="image-overlay"></div>
                <button 
                    className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        setIsBookmarked(!isBookmarked);
                    }}
                >
                    <Icon name="Bookmark" />
                </button>
            </div>
            <div className="dish-info">
                <h3>{dish.title}</h3>
                <p className="dish-description">{dish.description}</p>
                
                <div className="dish-meta">
                    <span className="meta-item time-item"><Icon name="Clock" />{dish.time}</span>
                    <span className={`meta-item difficulty ${difficultyClass}`}>{dish.difficulty}</span>
                    <span className="meta-item price-item">{priceFormatted}</span>
                </div>
                
                <div className="dish-stats-row">
                    <span className="rating-display"><Icon name="Star" />{dish.rating}</span>
                    <div className="dish-tags">
                        {dish.tags.slice(0, 2).map(tag => (
                            <span key={tag} className={`tag-chip ${tag.toLowerCase()}`}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishCard;
