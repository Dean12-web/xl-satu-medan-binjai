import { useState } from 'react';
import logo from '../assets/xl-icon.webp';
import { 
  Menu, 
  X, 
  PhoneCall, 
  ChevronRight 
} from 'lucide-react';
import { navItems } from '../data';
import { useSiteConfig } from '../context/SiteConfigContext';

export const renderBrandTagline = (tagline) => {
  const text = tagline || 'Medan, Binjai & Deli Serdang';
  if (text.includes('&')) {
    const parts = text.split('&');
    return (
      <>
        <span className="brand-tag-line">{parts[0].trim()}</span>
        <span className="brand-tag-line">&amp; {parts[1].trim()}</span>
      </>
    );
  }
  return text;
};

export default function Navbar({ activePage, setActivePage, onOpenRegister }) {
  const { siteConfig } = useSiteConfig();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="top-bar">
        <div className="container-xl top-bar-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#00c7b5', animation: 'pulseDot 1.5s infinite' }}></span>
            <span>Mau Berlangganan Internet Rumah {siteConfig.brandName} {siteConfig.brandTagline}?</span>
          </div>
          <button 
            type="button" 
            className="top-bar-btn"
            onClick={() => onOpenRegister(null)}
          >
            Daftar Sekarang!
          </button>
        </div>
      </div>

      {/* STICKY MAIN HEADER */}
      <header className="site-header">
        <div className="container-xl nav-container">
          {/* Logo Brand */}
          <div 
            className="brand-logo"
            onClick={() => handleNavClick('home')}
          >
            <img src={logo} alt={siteConfig.brandName} className="brand-logo-img" />
            <span className="brand-location-tag">
              {renderBrandTagline(siteConfig.brandTagline)}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  style={{ background: 'transparent' }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="cta-desktop">
            <button
              type="button"
              className="btn-green"
              style={{ padding: '0.5rem 1.15rem', fontSize: '0.875rem' }}
              onClick={() => onOpenRegister(null)}
            >
              <PhoneCall size={16} />
              Daftar Pasang
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button 
            type="button" 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Buka Menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div 
          className="drawer-backdrop" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="brand-logo" onClick={() => handleNavClick('home')}>
            <img src={logo} alt={siteConfig.brandName} className="brand-logo-img drawer-logo-img" />
            <span className="brand-location-tag">
              {renderBrandTagline(siteConfig.brandTagline)}
            </span>
          </div>
          <button 
            type="button"
            aria-label="Tutup Menu Navigasi"
            className="drawer-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  background: isActive ? '#f0f7ff' : 'transparent',
                  color: isActive ? '#164391' : '#334155',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  textAlign: 'left'
                }}
                onClick={() => handleNavClick(item.id)}
              >
                <span>{item.label}</span>
                <ChevronRight size={16} color="#cbd5e1" />
              </button>
            );
          })}
        </div>

        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <button
            type="button"
            className="btn-green"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenRegister(null);
            }}
          >
            <PhoneCall size={18} />
            Hubungi Sales Medan
          </button>
        </div>
      </div>
    </>
  );
}
