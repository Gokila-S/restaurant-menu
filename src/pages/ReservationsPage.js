import React, { useState } from 'react';
import { Header, Icon } from '../components';
import '../styles/App.css';

export default function ReservationsPage({ setCurrentPage }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        occasion: '',
        specialRequests: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        
        if (!formData.date) {
            newErrors.date = 'Date is required';
        } else {
            const selectedDate = new Date(formData.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = 'Date cannot be in the past';
            }
        }
        
        if (!formData.time) {
            newErrors.time = 'Time is required';
        }
        
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        // Simulate form submission
        console.log('Reservation submitted:', formData);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: '2',
                occasion: '',
                specialRequests: ''
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="app">
            <Header currentPage="reservations" setCurrentPage={setCurrentPage} />
            
            <div className="reservations-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Reserve Your Table</h1>
                    <p className="hero-subtitle">Book a table for an unforgettable South Indian dining experience</p>
                </div>
            </div>

            <main className="reservations-main">
                <div className="reservations-container">
                    <div className="reservations-layout">
                        {/* Left Side - Contact Info */}
                        <div className="restaurant-info">
                            <h2>Visit Us</h2>
                            
                            <div className="info-section">
                                <div className="info-item">
                                    <Icon name="MapPin" />
                                    <div>
                                        <h3>Address</h3>
                                        <p>123 South Indian Street<br/>T. Nagar, Chennai - 600017<br/>Tamil Nadu, India</p>
                                    </div>
                                </div>
                                
                                <div className="info-item">
                                    <Icon name="Phone" />
                                    <div>
                                        <h3>Phone</h3>
                                        <p>+91 98765 43210<br/>+91 98765 43211</p>
                                    </div>
                                </div>
                                
                                <div className="info-item">
                                    <Icon name="Mail" />
                                    <div>
                                        <h3>Email</h3>
                                        <p>reservations@southindianrestaurant.com<br/>info@southindianrestaurant.com</p>
                                    </div>
                                </div>
                                
                                <div className="info-item">
                                    <Icon name="Clock" />
                                    <div>
                                        <h3>Opening Hours</h3>
                                        <p>
                                            <strong>Monday - Friday:</strong> 7:00 AM - 11:00 PM<br/>
                                            <strong>Saturday - Sunday:</strong> 6:30 AM - 11:30 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-note">
                                <p><strong>Note:</strong> Reservations are recommended for dinner and weekends. Walk-ins are welcome based on availability.</p>
                            </div>
                        </div>

                        {/* Right Side - Reservation Form */}
                        <div className="reservation-form-container">
                            <h2>Book Your Table</h2>
                            
                            {isSubmitted ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3>Reservation Confirmed!</h3>
                                    <p>We've received your reservation request. A confirmation email will be sent to {formData.email}</p>
                                    <p>See you on {new Date(formData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {formData.time}!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="reservation-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={errors.name ? 'error' : ''}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <span className="error-message">{errors.name}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={errors.email ? 'error' : ''}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <span className="error-message">{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={errors.phone ? 'error' : ''}
                                                placeholder="+91 98765 43210"
                                            />
                                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="guests">Number of Guests *</label>
                                            <select
                                                id="guests"
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleChange}
                                            >
                                                <option value="1">1 Guest</option>
                                                <option value="2">2 Guests</option>
                                                <option value="3">3 Guests</option>
                                                <option value="4">4 Guests</option>
                                                <option value="5">5 Guests</option>
                                                <option value="6">6 Guests</option>
                                                <option value="7">7 Guests</option>
                                                <option value="8">8 Guests</option>
                                                <option value="9+">9+ Guests</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="date">Reservation Date *</label>
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                className={errors.date ? 'error' : ''}
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                            {errors.date && <span className="error-message">{errors.date}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="time">Reservation Time *</label>
                                            <select
                                                id="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className={errors.time ? 'error' : ''}
                                            >
                                                <option value="">Select a time</option>
                                                <option value="07:00">07:00 AM</option>
                                                <option value="07:30">07:30 AM</option>
                                                <option value="08:00">08:00 AM</option>
                                                <option value="08:30">08:30 AM</option>
                                                <option value="09:00">09:00 AM</option>
                                                <option value="12:00">12:00 PM</option>
                                                <option value="12:30">12:30 PM</option>
                                                <option value="13:00">01:00 PM</option>
                                                <option value="13:30">01:30 PM</option>
                                                <option value="14:00">02:00 PM</option>
                                                <option value="18:00">06:00 PM</option>
                                                <option value="18:30">06:30 PM</option>
                                                <option value="19:00">07:00 PM</option>
                                                <option value="19:30">07:30 PM</option>
                                                <option value="20:00">08:00 PM</option>
                                                <option value="20:30">08:30 PM</option>
                                                <option value="21:00">09:00 PM</option>
                                                <option value="21:30">09:30 PM</option>
                                            </select>
                                            {errors.time && <span className="error-message">{errors.time}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="occasion">Special Occasion (Optional)</label>
                                        <select
                                            id="occasion"
                                            name="occasion"
                                            value={formData.occasion}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select an occasion</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="anniversary">Anniversary</option>
                                            <option value="business">Business Lunch/Dinner</option>
                                            <option value="celebration">General Celebration</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="specialRequests">Special Requests (Optional)</label>
                                        <textarea
                                            id="specialRequests"
                                            name="specialRequests"
                                            value={formData.specialRequests}
                                            onChange={handleChange}
                                            rows="4"
                                            placeholder="Any dietary restrictions, seating preferences, or special requests..."
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn primary reserve-btn">
                                        Reserve Table
                                    </button>

                                    <p className="form-note">* Required fields</p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
