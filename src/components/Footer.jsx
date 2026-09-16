import React from 'react';
import { ShieldCheck, Phone, MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import { footerNavigation, popularCoverageAreas, siteConfig } from '../data';
import logo from '../assets/xl-icon.webp';

function SocialIcon({ type, size = 20 }) {
  switch (type) {
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.676.15s-.777.98-.952 1.18-.351.226-.652.075c-.301-.15-1.27-.468-2.42-1.494-.895-.798-1.5-1.783-1.675-2.084-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.233-.244-.586-.492-.507-.676-.516-.175-.01-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.029-1.053 2.508 0 1.48 1.078 2.908 1.229 3.109.15.2 2.122 3.24 5.14 4.544.718.31 1.279.496 1.716.635.722.23 1.38.197 1.9.12.58-.087 1.782-.728 2.032-1.431.25-.702.25-1.303.175-1.43-.075-.128-.276-.204-.577-.354zm-5.452 7.424h-.008a10.02 10.02 0 0 1-5.11-1.402l-.366-.217-3.8 1 1.016-3.704-.239-.38a10.038 10.038 0 0 1-1.536-5.324c0-5.545 4.51-10.055 10.057-10.055 2.686 0 5.21 1.047 7.109 2.946a10.015 10.015 0 0 1 2.943 7.11c0 5.547-4.512 10.058-10.064 10.058zm8.537-18.596A11.937 11.937 0 0 0 12.02 0C5.393 0 .02 5.373.02 12c0 2.112.55 4.175 1.597 5.992L0 24l6.17-1.618A11.954 11.954 0 0 0 12.02 24c6.627 0 12-5.373 12-12 0-3.207-1.249-6.22-3.515-8.486z" />
        </svg>
      );
    default:
      return <ExternalLink size={size} />;
  }
}

export default function Footer({ onNavigate }) {
  return (
    <footer style={{ backgroundColor: 'var(--color-xl-blue)', color: '#ffffff', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container-xl">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          {/* Col 1: Brand Info, Logo & Social Media */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div 
              className="footer-logo-wrapper"
              onClick={() => onNavigate('home')}
              title={`Beranda ${siteConfig.brandName} ${siteConfig.brandTagline}`}
            >
              <div className="footer-logo-box">
                <img 
                  src={logo} 
                  alt={`${siteConfig.brandName} ${siteConfig.brandTagline}`} 
                  className="footer-logo-img" 
                />
              </div>
              <span className="brand-location-tag" style={{ marginLeft: 0 }}>
                {siteConfig.brandTagline}
              </span>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.875rem', lineHeight: '1.65' }}>
              Layanan internet rumah fiber &amp; nirkabel super cepat dengan kuota HP sekeluarga resmi dari XL Axiata untuk area {siteConfig.brandTagline}, dan sekitarnya.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-xl-teal)', fontSize: '0.8125rem', fontWeight: 600 }}>
              <ShieldCheck size={18} />
              <span>{siteConfig.partnerLabel}</span>
            </div>

            {/* Social Media Accounts */}
            {siteConfig.socialMedia && siteConfig.socialMedia.length > 0 && (
              <div style={{ marginTop: '0.25rem' }}>
                <span style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.65rem' }}>
                  Media Sosial Resmi:
                </span>
                <div className="footer-social-list">
                  {siteConfig.socialMedia.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-btn"
                      aria-label={item.name}
                      title={`${item.name} (${item.handle})`}
                    >
                      <SocialIcon type={item.id} size={19} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Menu Navigasi */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Layanan &amp; Navigasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              {footerNavigation.map((link) => (
                <li key={link.id}>
                  <button 
                    type="button" 
                    onClick={() => onNavigate(link.id)} 
                    className="footer-nav-btn"
                  >
                    <ChevronRight size={14} style={{ color: 'var(--color-xl-teal)', opacity: 0.8 }} />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Area Jangkauan Populer */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Area {siteConfig.brandTagline}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem' }}>
              {popularCoverageAreas.map((area) => (
                <span 
                  key={area}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              *Tersedia di ribuan titik tiang ODP fiber &amp; BTS 4G/5G seluruh Sumut.
            </p>
          </div>

          {/* Col 4: Layanan Kontak */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Kontak Sales &amp; CS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.85)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} color="var(--color-xl-teal)" />
                <span>Call Center: <strong>{siteConfig.callCenterNumber}</strong> (Bebas Pulsa XL)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={16} color="var(--color-xl-teal)" />
                <span>Sales WhatsApp: <strong>{siteConfig.salesWhatsAppDisplay}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <MapPin size={16} color="var(--color-xl-teal)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{siteConfig.officeAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          paddingTop: '1.5rem',
          fontSize: '0.8125rem',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <div>
            &copy; 2012 - {new Date().getFullYear()} {siteConfig.brandName}. All Rights Reserved. XL Axiata Group.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }}>Syarat &amp; Ketentuan</span>
            <span style={{ cursor: 'pointer' }}>Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

