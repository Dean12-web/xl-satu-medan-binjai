import { useState, useEffect } from 'react';
import { 
  Wifi, 
  Smartphone, 
  CreditCard, 
  Zap, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Users
} from 'lucide-react';
import { 
  fiberPackages as fallbackFiberPackages, 
  quickActions, 
  homeKeyFeatures, 
  firstMediaBannerContent, 
  myXlAppShowcaseContent 
} from '../data';
import { publicPackageService } from '../services/api';
import HeroSlider from '../components/HeroSlider';
import PricingCard from '../components/PricingCard';

export default function HomePage({ onNavigate, onSelectPlan }) {
  const [packages, setPackages] = useState(fallbackFiberPackages);

  useEffect(() => {
    let isMounted = true;
    const fetchFiberPackages = async () => {
      try {
        const data = await publicPackageService.getPackages('Fiber');
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setPackages(data);
        }
      } catch (error) {
        console.warn('Gagal fetch paket fiber dari API, pakai data fallback lokal:', error);
      }
    };

    fetchFiberPackages();
    return () => { isMounted = false; };
  }, []);
  // Dynamic Icon Resolver
  const renderIcon = (name, size = 24) => {
    switch (name) {
      case 'Zap':
        return <Zap size={size} />;
      case 'MapPin':
        return <MapPin size={size} />;
      case 'Wifi':
        return <Wifi size={size} />;
      case 'Users':
        return <Users size={size} />;
      case 'CreditCard':
        return <CreditCard size={size} />;
      case 'Smartphone':
        return <Smartphone size={size} />;
      default:
        return <Zap size={size} />;
    }
  };

  return (
    <div>
      {/* 1. HERO SLIDER SECTION */}
      <HeroSlider onNavigate={onNavigate} onSelectPlan={onSelectPlan} />

      {/* 2. QUICK ACTIONS STRIP */}
      <section className="container-xl quick-actions-bar">
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <div key={action.id} className="quick-card" onClick={() => onNavigate(action.id)}>
              <div 
                className="quick-icon-wrap" 
                style={{ background: action.iconWrapBg, color: action.iconColor }}
              >
                {renderIcon(action.iconName, 24)}
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1f2937' }}>
                  {action.title}
                </h3>
                <div style={{ color: 'var(--color-xl-green)', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                  {action.actionText} <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section className="features-section">
        <div className="container-xl">
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
            Keunggulan Internet Rumah Unlimited dari XL SATU
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
            Koneksi rumah stabil dengan jaringan 100% Fiber Optic dan integrasi paket seluler terlengkap.
          </p>

          <div className="features-grid">
            {homeKeyFeatures.map((feat, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-circle" style={{ color: feat.iconColor }}>
                  {renderIcon(feat.iconName, 32)}
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>
                  {feat.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRICING PACKAGES */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="badge-pill badge-blue" style={{ marginBottom: '0.5rem' }}>
              PAKET TERPOPULER MEDAN &amp; BINJAI
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginTop: '0.5rem' }}>
              Pilihan Paket Sesuai Kebutuhan Rumah Anda
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Semua paket sudah termasuk Speed Booster, peminjaman router Wi-Fi, dan gratis biaya instalasi.
            </p>
          </div>

          <div className="pricing-grid">
            {packages.map((pkg) => (
              <PricingCard
                key={pkg.id}
                pkg={pkg}
                onSelectPlan={onSelectPlan}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate('paket')}
              style={{ padding: '0.9rem 2.25rem' }}
            >
              <span>Lihat Seluruh Paket &amp; Perbandingan Lengkap</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTEGRASI FIRST MEDIA & XL AXIATA BANNER */}
      <section style={{ padding: '4rem 0', background: '#ffffff' }}>
        <div className="container-xl">
          <div style={{
            background: 'linear-gradient(135deg, #031b4e 0%, #164391 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            color: '#ffffff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge-pill badge-green" style={{ marginBottom: '1rem' }}>
                {firstMediaBannerContent.badge}
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem', lineHeight: '1.25' }}>
                First Media Kini Jadi <span style={{ color: 'var(--color-xl-teal)' }}>XL SATU</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                {firstMediaBannerContent.description}
              </p>
              <button
                type="button"
                className="btn-green"
                onClick={() => onNavigate(firstMediaBannerContent.ctaTarget)}
              >
                <MapPin size={18} />
                {firstMediaBannerContent.ctaText}
              </button>
            </div>

            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.3)', minHeight: '260px' }}>
              <img
                src={firstMediaBannerContent.image}
                alt={firstMediaBannerContent.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. MYXL APP SHOWCASE */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(180deg, #e6f3ff 0%, #ffffff 100%)' }}>
        <div className="container-xl">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={myXlAppShowcaseContent.image}
                alt={myXlAppShowcaseContent.imageAlt}
                style={{ maxWidth: '320px', width: '100%', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(22, 67, 145, 0.25)', border: '4px solid #ffffff' }}
              />
            </div>

            <div>
              <span className="badge-pill badge-blue" style={{ marginBottom: '0.75rem' }}>
                {myXlAppShowcaseContent.badge}
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
                {myXlAppShowcaseContent.title}
              </h2>
              <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {myXlAppShowcaseContent.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {myXlAppShowcaseContent.features.map((featText, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600, fontSize: '0.9rem' }}>
                    <CheckCircle2 size={20} color="var(--color-xl-green)" />
                    <span>{featText}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
