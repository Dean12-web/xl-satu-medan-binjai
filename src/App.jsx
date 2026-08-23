import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import OrderModal from './components/OrderModal';
import SeoHead from './components/SeoHead';

import HomePage from './pages/HomePage';
import PaketPage from './pages/PaketPage';
import FwaPage from './pages/FwaPage';
import CoveragePage from './pages/CoveragePage';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleSelectPlan = (pkg) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  const handleOpenRegister = (pkg = null) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            onNavigate={setActivePage}
            onSelectPlan={handleSelectPlan}
          />
        );
      case 'paket':
        return (
          <PaketPage
            onSelectPlan={handleSelectPlan}
            onNavigate={setActivePage}
          />
        );
      case 'fwa':
        return (
          <FwaPage
            onSelectPlan={handleSelectPlan}
            onNavigate={setActivePage}
          />
        );
      case 'coverage':
        return <CoveragePage />;
      default:
        return (
          <HomePage
            onNavigate={setActivePage}
            onSelectPlan={handleSelectPlan}
          />
        );
    }
  };

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Dynamic SEO Meta & Schema Manager */}
      <SeoHead activePage={activePage} />

      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Active Page View */}
      <main style={{ flexGrow: 1 }}>
        {renderActivePage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActivePage} />

      {/* Global Floating Action Elements */}
      <FloatingWhatsApp />

      {/* Order Confirmation Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedPackage(null);
        }}
        selectedPackage={selectedPackage}
      />
    </div>
  );
}

export default App;
