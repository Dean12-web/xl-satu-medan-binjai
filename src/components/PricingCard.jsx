import { CheckCircle2, ArrowRight, Star } from 'lucide-react';

export default function PricingCard({ pkg, onSelectPlan }) {
  const isFiber = pkg.type === 'Fiber';

  return (
    <div className={`plan-card ${pkg.isPopular ? 'featured' : ''}`}>
      {/* Popular Badge */}
      {pkg.badge && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10
        }}>
          <span className={`badge-pill ${pkg.isPopular ? 'badge-green' : 'badge-blue'}`}>
            <Star size={12} style={{ fill: 'currentColor' }} />
            {pkg.badge}
          </span>
        </div>
      )}

      {/* Card Header with gradient */}
      <div className="plan-card-header">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-xl-blue)', marginBottom: '0.35rem', paddingRight: pkg.badge ? '5rem' : '0' }}>
          {pkg.name}
        </h3>

        {isFiber && pkg.baseSpeed && (
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>
            Kecepatan Internet dengan Speed Booster
          </div>
        )}

        {/* Speed Bars Meter (For Fiber) */}
        {isFiber && (
          <div className="speed-meter-bars">
            {Array.from({ length: pkg.maxLevel || 7 }).map((_, index) => (
              <div
                key={index}
                className={`speed-bar ${index < (pkg.speedLevel || 3) ? 'filled' : ''}`}
              />
            ))}
          </div>
        )}

        {/* Speed Value Highlight */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
          {pkg.baseSpeed && (
            <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 700 }}>
              {pkg.baseSpeed}
            </span>
          )}
          <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-xl-blue)', fontFamily: 'var(--font-heading)' }}>
            {pkg.speed}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Ideal For Tags */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            Ideal Untuk Aktivitas:
          </p>
          <div className="tags-cloud">
            {pkg.idealFor.map((tag, idx) => (
              <span key={idx} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Features Checklist */}
        <ul className="features-checklist">
          {pkg.features.map((feat, idx) => (
            <li key={idx}>
              <CheckCircle2 size={18} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Pricing & CTA Button */}
        <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
          {pkg.originalPrice && (
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>
              Mulai dari <span style={{ textDecoration: 'line-through' }}>{pkg.originalPrice}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', fontFamily: 'var(--font-heading)' }}>
              {pkg.promoPrice}
            </span>
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>
              {pkg.period}
            </span>
          </div>
          <div style={{ fontSize: '0.725rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            Harga setelah PPN 11%: <strong>{pkg.taxPrice}</strong>
          </div>

          <button
            type="button"
            className={pkg.isPopular ? 'btn-primary' : 'btn-secondary'}
            style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem' }}
            onClick={() => onSelectPlan(pkg)}
          >
            <span>Saya Pilih Ini</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
