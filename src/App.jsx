import { useState, useEffect, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SeoHead from './components/SeoHead';
import HomePage from './pages/HomePage';
import './App.css';

// Lazy load secondary pages and modals for minimal initial bundle
const PaketPage = lazy(() => import('./pages/PaketPage'));
const FwaPage = lazy(() => import('./pages/FwaPage'));
const CoveragePage = lazy(() => import('./pages/CoveragePage'));
const OrderModal = lazy(() => import('./components/OrderModal'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--color-xl-blue)' }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: 'var(--color-xl-blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Sync hash on initial load & on hash change
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.replace('#', '');
      if (['paket', 'fwa', 'coverage'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

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
        <Suspense fallback={<PageLoader />}>
          {renderActivePage()}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={setActivePage} />

      {/* Global Floating Action Elements */}
      <FloatingWhatsApp />

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Order Confirmation Modal */}
      {isOrderModalOpen && (
        <Suspense fallback={null}>
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => {
              setIsOrderModalOpen(false);
              setSelectedPackage(null);
            }}
            selectedPackage={selectedPackage}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
