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

const getPageFromUrl = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#+/, '').toLowerCase();
  if (['paket', 'fwa', 'coverage'].includes(path)) return path;
  if (['paket', 'fwa', 'coverage'].includes(hash)) return hash;
  return 'home';
};

function App() {
  const [activePage, setActivePage] = useState(() => getPageFromUrl());
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Sync URL on initial load & on browser back/forward or hash change
  useEffect(() => {
    const handleUrlChange = () => {
      const page = getPageFromUrl();
      setActivePage(page);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Centralized Navigation Handler with PushState
  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    const newPath = pageId === 'home' ? '/' : `/${pageId}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page: pageId }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            onNavigate={handleNavigate}
            onSelectPlan={handleSelectPlan}
          />
        );
      case 'paket':
        return (
          <PaketPage
            onSelectPlan={handleSelectPlan}
            onNavigate={handleNavigate}
          />
        );
      case 'fwa':
        return (
          <FwaPage
            onSelectPlan={handleSelectPlan}
            onNavigate={handleNavigate}
          />
        );
      case 'coverage':
        return <CoveragePage />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
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
        setActivePage={handleNavigate}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Active Page View */}
      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={<PageLoader />}>
          {renderActivePage()}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

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
