import React, { useState } from 'react';
import MenuPage from './pages/MenuPage';
import SpecialsPage from './pages/SpecialsPage';
import ReservationsPage from './pages/ReservationsPage';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage setCurrentPage={setCurrentPage} />;
      case 'specials':
        return <SpecialsPage setCurrentPage={setCurrentPage} />;
      case 'reservations':
        return <ReservationsPage setCurrentPage={setCurrentPage} />;
      default:
        return <MenuPage setCurrentPage={setCurrentPage} />;
    }
  };

  return renderPage();
}

export default App;
