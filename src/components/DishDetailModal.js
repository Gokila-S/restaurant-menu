import React, { useEffect, useRef } from 'react';
import Icon from './common/Icon';

const DishDetailModal = ({ dish, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOverlayClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    if (!dish) {
        return (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content" ref={modalRef}>
                    <div className="loading-state" style={{padding: '50px', textAlign: 'center'}}>
                        <h2>Loading Dish Details...</h2>
                        <p>If this persists, please try clicking the card again.</p>
                        <button className="modal-close-btn" onClick={onClose} style={{marginTop: '20px'}}>
                            <Icon name="X" /> Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const priceFormatted = `₹${dish.price}`;
    const spiceLevelClass = dish.spiceLevel ? dish.spiceLevel.toLowerCase().replace(/\s/g, '-') : 'none';

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" ref={modalRef}>
                <div className="modal-body">
                    <div className="modal-image-container">
                        <img 
                            src={dish.image} 
                            alt={dish.title} 
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = 'https://placehold.co/900x506/8B5CF6/ffffff?text=Image+Not+Available';
                            }}
                        />
                    </div>
                    <div className="modal-details">
                        <div className="modal-title-rating">
                            <h2>{dish.title}</h2>
                            <span className="modal-rating">{dish.rating} <Icon name="Star" /></span>
                        </div>
                        
                        <p className="full-description">
                            {dish.fullDescription || dish.description}
                        </p>

                        <div className="modal-meta-row">
                            <span className="modal-meta-item time-item"><Icon name="Clock" /> {dish.time}</span>
                            <span className={`modal-meta-item spice-level ${spiceLevelClass}`}><Icon name="Flame" /> {dish.spiceLevel}</span>
                            <span className="modal-meta-item"><Icon name="Users" /> {dish.portion}</span>
                        </div>

                        <div className="modal-tags">
                            {dish.tags.map(tag => (
                                <span key={tag} className={`tag-chip ${tag.toLowerCase()}`}>{tag}</span>
                            ))}
                        </div>

                        <div className="modal-actions">
                             <div className="price-tag">{priceFormatted}</div>
                             <button className="btn primary order-btn">Add to Order</button>
                        </div>

                         <button className="modal-close-btn" onClick={onClose}>
                            <Icon name="X" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishDetailModal;
