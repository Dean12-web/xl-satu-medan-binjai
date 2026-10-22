import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const { buildGeneralConsultationUrl } = useSiteConfig();

  const handleWhatsAppClick = () => {
    window.open(buildGeneralConsultationUrl(), '_blank');
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
      {/* Speech Bubble Tooltip */}
      {showTooltip && (
        <div>
          <span>Chat Sales WhatsApp</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            style={{ background: 'none', color: '#94a3b8', padding: '2px', cursor: 'pointer' }}
            aria-label="Tutup Tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        type="button"
        className="floating-wa-btn"
        onClick={handleWhatsAppClick}
        aria-label="Chat WhatsApp Sales"
      >
        <MessageCircle size={24} />
        <span style={{ fontSize: '0.9375rem', letterSpacing: '0.01em' }}>
          Chat WhatsApp
        </span>
      </button>
    </div>
  );
}
