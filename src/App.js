import React, { useState } from 'react';
import MenuPage from './pages/MenuPage';
import SpecialsPage from './pages/SpecialsPage';
import ReservationsPage from './pages/ReservationsPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [orderItems, setOrderItems] = useState([]);
  const [orderNotification, setOrderNotification] = useState(null);

  const handleAddToOrder = (dish) => {
    setOrderItems([...orderItems, { ...dish, orderId: Date.now() }]);
    setOrderNotification(`${dish.title} added to order!`);
    
    setTimeout(() => {
      setOrderNotification(null);
    }, 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage setCurrentPage={setCurrentPage} onAddToOrder={handleAddToOrder} />;
      case 'specials':
        return <SpecialsPage setCurrentPage={setCurrentPage} onAddToOrder={handleAddToOrder} />;
      case 'reservations':
        return <ReservationsPage setCurrentPage={setCurrentPage} />;
      default:
        return <MenuPage setCurrentPage={setCurrentPage} onAddToOrder={handleAddToOrder} />;
    }
  };

  return (
    <>
      {orderNotification && (
        <div className="order-notification">
          ✓ {orderNotification}
        </div>
      )}
      {renderPage()}
    </>
  );
}

export default App;
