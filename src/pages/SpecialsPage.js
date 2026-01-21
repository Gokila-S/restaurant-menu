import React, { useState } from 'react';
import { Header, DishDetailModal, Icon } from '../components';
import '../styles/App.css';

// Specials Data
const SPECIALS_DATA = [
    {
        id: 's1',
        category: 'weekly-special',
        image: 'https://images.unsplash.com/photo-1645177628172-a94c30a5f6ba?w=500&h=281&fit=crop&q=80',
        title: 'Sunday Brunch Special',
        description: 'Unlimited Idli, Vada, and Dosa with unlimited filter coffee. Available only on Sundays.',
        fullDescription: 'Join us for our Sunday Brunch Special! Enjoy unlimited servings of our famous soft idlis, crispy vadas, and golden dosas with an array of fresh chutneys and piping hot sambar. Unlimited filter coffee included. Perfect for a leisurely Sunday morning with family and friends.',
        time: 'All Day',
        price: 299,
        originalPrice: 450,
        discount: '33% OFF',
        spiceLevel: 'Mild',
        rating: 4.9,
        portion: 'Unlimited',
        tags: ['breakfast', 'vegetarian', 'special-offer'],
        validUntil: '2026-01-26',
        availability: 'Sundays Only'
    },
    {
        id: 's2',
        category: 'daily-special',
        image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=281&fit=crop&q=80',
        title: 'Chef\'s Thali Special',
        description: 'An elaborate South Indian thali with 5 curries, rice, chapati, dessert, and more.',
        fullDescription: 'Our Chef\'s Special Thali is a complete meal featuring 5 different curries (including one non-veg option), steamed rice, 3 rotis, rasam, curd, papad, pickle, salad, and a traditional dessert of the day. Changes daily based on chef\'s selection of the freshest ingredients.',
        time: '25 min',
        price: 350,
        originalPrice: 480,
        discount: '27% OFF',
        spiceLevel: 'Mild',
        rating: 4.8,
        portion: 'Serves 1',
        tags: ['main', 'thali', 'house-special'],
        validUntil: '2026-01-31',
        availability: 'Lunch & Dinner'
    },
    {
        id: 's3',
        category: 'combo-deal',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&h=281&fit=crop&q=80',
        title: 'Biryani Feast for Two',
        description: 'Two portions of Hyderabadi Biryani with raita, salan, and complimentary dessert.',
        fullDescription: 'Perfect for sharing! Get two generous portions of our signature Hyderabadi Chicken Biryani, served with cooling raita, spicy mirchi ka salan, and two servings of our special Qubani ka Meetha (apricot dessert). Save big with this combo deal!',
        time: '45 min',
        price: 499,
        originalPrice: 640,
        discount: '22% OFF',
        spiceLevel: 'Spicy',
        rating: 4.9,
        portion: 'Serves 2',
        tags: ['main', 'combo', 'non-veg'],
        validUntil: '2026-02-15',
        availability: 'All Day'
    },
    {
        id: 's4',
        category: 'weekend-special',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=281&fit=crop&q=80',
        title: 'Seafood Saturday',
        description: 'Special seafood platter with fish fry, prawn curry, and crab masala.',
        fullDescription: 'Our weekend seafood extravaganza! Crispy fish fry, aromatic prawn curry, and rich crab masala served with steamed rice and appam. Fresh catch prepared with authentic coastal spices and traditional recipes from Kerala and Tamil Nadu coastal regions.',
        time: '40 min',
        price: 650,
        originalPrice: 850,
        discount: '24% OFF',
        spiceLevel: 'Extra Spicy',
        rating: 4.7,
        portion: 'Serves 2',
        tags: ['main', 'seafood', 'weekend-special'],
        validUntil: '2026-01-25',
        availability: 'Saturdays Only'
    },
    {
        id: 's5',
        category: 'festive-special',
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&h=281&fit=crop&q=80',
        title: 'Festival Snack Platter',
        description: 'Assorted South Indian snacks perfect for celebrations - Bonda, Bajji, Vada, and more.',
        fullDescription: 'Celebrate with our Festival Snack Platter! A colorful assortment of Mysore Bonda, Onion Bajji, Medu Vada, Aloo Bonda, and Banana Bajji. Served with three types of chutneys and hot sambar. Perfect for sharing during festivals and special occasions.',
        time: '20 min',
        price: 180,
        originalPrice: 250,
        discount: '28% OFF',
        spiceLevel: 'Mild',
        rating: 4.6,
        portion: '12 pcs',
        tags: ['starter', 'vegetarian', 'festive'],
        validUntil: '2026-02-28',
        availability: 'All Day'
    },
    {
        id: 's6',
        category: 'dessert-special',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&h=281&fit=crop&q=80',
        title: 'Sweet Lovers Combo',
        description: 'Three traditional desserts - Payasam, Kesari, and Mysore Pak.',
        fullDescription: 'Indulge your sweet tooth with our Sweet Lovers Combo! Sample three beloved South Indian desserts: creamy coconut payasam, aromatic kesari bath, and rich ghee-laden Mysore Pak. Perfect ending to your meal or as a special treat for dessert lovers.',
        time: '10 min',
        price: 120,
        originalPrice: 180,
        discount: '33% OFF',
        spiceLevel: 'None',
        rating: 4.8,
        portion: 'Serves 2',
        tags: ['dessert', 'sweet', 'vegetarian'],
        validUntil: '2026-01-31',
        availability: 'All Day'
    }
];

export default function SpecialsPage({ setCurrentPage, onAddToOrder }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);

    const openModal = (special) => {
        setSelectedDish(special);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedDish(null), 300);
    };

    return (
        <div className="app">
            <Header currentPage="specials" setCurrentPage={setCurrentPage} />
            
            <div className="specials-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Today's Specials</h1>
                    <p className="hero-subtitle">Limited time offers on your favorite South Indian dishes</p>
                </div>
            </div>

            <main className="specials-main">
                <div className="specials-container">
                    <div className="specials-grid">
                        {SPECIALS_DATA.map(special => {
                            const spiceLevelClass = special.spiceLevel ? special.spiceLevel.toLowerCase().replace(/\s/g, '-') : 'none';
                            
                            return (
                                <div key={special.id} className="special-card" onClick={() => openModal(special)}>
                                    <div className="special-badge">{special.discount}</div>
                                    <div className="card-image-wrapper">
                                        <img 
                                            src={special.image} 
                                            alt={special.title} 
                                            className="dish-image"
                                            onError={(e) => { 
                                                e.target.onerror = null; 
                                                e.target.src = 'https://placehold.co/500x281/8B5CF6/ffffff?text=Image+Not+Available';
                                            }}
                                        />
                                        <div className="image-overlay"></div>
                                    </div>
                                    <div className="dish-info">
                                        <h3>{special.title}</h3>
                                        <p className="dish-description">{special.description}</p>
                                        
                                        <div className="special-meta">
                                            <span className="meta-item"><Icon name="Calendar" />{special.availability}</span>
                                            <span className={`meta-item spice-level ${spiceLevelClass}`}><Icon name="Flame" />{special.spiceLevel}</span>
                                        </div>

                                        <div className="special-pricing">
                                            <div className="price-section">
                                                <span className="original-price">₹{special.originalPrice}</span>
                                                <span className="special-price">₹{special.price}</span>
                                            </div>
                                            <span className="rating-display"><Icon name="Star" />{special.rating}</span>
                                        </div>

                                        <p className="valid-until">Valid until: {new Date(special.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {isModalOpen && selectedDish && (
                <DishDetailModal dish={selectedDish} onClose={closeModal} onAddToOrder={onAddToOrder} />
            )}
        </div>
    );
}
