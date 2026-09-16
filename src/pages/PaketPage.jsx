import { useState } from 'react';
import { Radio, Zap, CheckCircle2 } from 'lucide-react';
import { fiberPackages, fwaPackages, packageBenefits } from '../data';
import PricingCard from '../components/PricingCard';

export default function PaketPage({ onSelectPlan }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'fiber', 'fwa'

  const displayPackages = 
    activeTab === 'fiber' 
      ? fiberPackages 
      : activeTab === 'fwa' 
      ? fwaPackages 
      : [...fiberPackages, ...fwaPackages];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section style={{ background: 'linear-gradient(135deg, var(--color-xl-blue) 0%, #0057b8 100%)', color: '#ffffff', padding: '4rem 0 3.5rem' }}>
        <div className="container-xl" style={{ textAlign: 'center' }}>
          <span className="badge-pill badge-green" style={{ marginBottom: '1rem' }}>
            KATALOG RESMI MEDAN &amp; BINJAI
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '1rem' }}>
            Pilihan Paket Internet Rumah XL SATU
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
            Pilih paket internet sesuai kebutuhan kecepatan rumah tangga Anda. Bebas FUP, bonus kuota HP bersama, dan gratis biaya instalasi.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', padding: '0.4rem', borderRadius: 'var(--radius-full)', marginTop: '2.5rem', border: '1px solid rgba(255,255,255,0.2)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: activeTab === 'all' ? '#ffffff' : 'transparent',
                color: activeTab === 'all' ? 'var(--color-xl-blue)' : '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              Semua Paket ({fiberPackages.length + fwaPackages.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fiber')}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: activeTab === 'fiber' ? '#ffffff' : 'transparent',
                color: activeTab === 'fiber' ? 'var(--color-xl-blue)' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              <Zap size={16} />
              Fiber Optic ({fiberPackages.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('fwa')}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: activeTab === 'fwa' ? '#ffffff' : 'transparent',
                color: activeTab === 'fwa' ? 'var(--color-xl-blue)' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s'
              }}
            >
              <Radio size={16} />
              FWA Nirkabel ({fwaPackages.length})
            </button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container-xl" style={{ marginTop: '3.5rem' }}>
        <div className="pricing-grid">
          {displayPackages.map((pkg) => (
            <PricingCard
              key={pkg.id}
              pkg={pkg}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>

        {/* Benefits Strip */}
        <div style={{ marginTop: '4rem', background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', textAlign: 'center' }}>
            Semua Paket XL SATU Sudah Termasuk Fasilitas Premium:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {packageBenefits.map((benefit, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={22} color="var(--color-xl-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', color: '#1e293b', fontSize: '0.95rem' }}>
                    {benefit.title}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {benefit.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
