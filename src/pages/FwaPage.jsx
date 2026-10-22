import { useState, useEffect } from 'react';
import { 
  Radio, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  PlugZap, 
  Clock 
} from 'lucide-react';
import { fwaPackages as fallbackFwaPackages, fwaSteps } from '../data';
import { publicPackageService } from '../services/api';
import FwaHubAnimation from '../components/FwaHubAnimation';
import PricingCard from '../components/PricingCard';

export default function FwaPage({ onSelectPlan, onNavigate }) {
  const [fwaList, setFwaList] = useState(fallbackFwaPackages);

  useEffect(() => {
    let isMounted = true;
    const fetchFwa = async () => {
      try {
        const data = await publicPackageService.getPackages('FWA');
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setFwaList(data);
        }
      } catch (error) {
        console.warn('Gagal fetch paket FWA dari API, pakai data fallback lokal:', error);
      }
    };

    fetchFwa();
    return () => { isMounted = false; };
  }, []);
  const renderStepIcon = (name, size = 24) => {
    switch (name) {
      case 'Clock':
        return <Clock size={size} />;
      case 'PlugZap':
        return <PlugZap size={size} />;
      case 'Zap':
        return <Zap size={size} />;
      default:
        return <Zap size={size} />;
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Section with Interactive Hub */}
      <section style={{ background: 'linear-gradient(180deg, #031b4e 0%, #164391 100%)', color: '#ffffff', padding: '4rem 0 5rem', overflow: 'hidden' }}>
        <div className="container-xl">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 199, 181, 0.2)', color: 'var(--color-xl-teal)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                <Sparkles size={14} />
                <span>INTERNET NIRKABEL PRAKTIS &amp; CEPAT</span>
              </div>

              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', lineHeight: '1.2' }}>
                XL SATU FWA<br />
                <span style={{ color: 'var(--color-xl-teal)' }}>Plug &amp; Play Tanpa Tarik Kabel</span>
              </h1>

              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Solusi internet rumah nirkabel berkecepatan tinggi memanfaatkan sinyal BTS 5G/4G XL Axiata terkuat di area Medan &amp; Binjai. Cukup colok ke listrik, Wi-Fi rumah langsung menyala tanpa perlu tunggu teknisi tarik kabel!
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  type="button"
                  className="btn-green"
                  onClick={() => {
                    const elem = document.getElementById('fwa-packages-section');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ padding: '0.85rem 1.75rem' }}
                >
                  <span>Pilih Paket FWA</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => onNavigate('coverage')}
                  style={{ background: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)', padding: '0.85rem 1.5rem' }}
                >
                  <Radio size={18} />
                  <span>Cek Sinyal BTS XL</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Orbit Hub Animation */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FwaHubAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Easy Setup */}
      <section className="container-xl" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 30 }}>
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          {fwaSteps.map((stepItem, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: stepItem.iconBg, 
                color: stepItem.iconColor, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0 
              }}>
                {renderStepIcon(stepItem.iconName, 24)}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: stepItem.stepColor, textTransform: 'uppercase' }}>
                  {stepItem.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
                  {stepItem.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Packages Section */}
      <section id="fwa-packages-section" className="container-xl" style={{ marginTop: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge-pill badge-blue" style={{ marginBottom: '0.5rem' }}>
            PILIHAN PAKET NIRKABEL
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginTop: '0.5rem' }}>
            Katalog Paket XL SATU FWA
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Pilihan ideal untuk kost, apartemen, ruko, maupun rumah yang belum terjangkau tiang ODP fiber.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {fwaList.map((pkg) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
