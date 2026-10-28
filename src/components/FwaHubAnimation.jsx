import { 
  Tv, 
  Laptop, 
  Smartphone, 
  Gamepad2, 
  Radio,
  Zap
} from 'lucide-react';
import { fwaHubDevices } from '../data';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function FwaHubAnimation() {
  const { siteConfig } = useSiteConfig();
  const renderDeviceIcon = (iconName, color) => {
    switch (iconName) {
      case 'Tv':
        return <Tv size={14} color={color} />;
      case 'Gamepad2':
        return <Gamepad2 size={14} color={color} />;
      case 'Laptop':
        return <Laptop size={14} color={color} />;
      case 'Smartphone':
        return <Smartphone size={14} color={color} />;
      default:
        return <Smartphone size={14} color={color} />;
    }
  };

  const outerDevices = fwaHubDevices.filter((d) => d.ring === 'outer');
  const innerDevices = fwaHubDevices.filter((d) => d.ring === 'inner');

  return (
    <div className="hub-container" style={{ position: 'relative', minHeight: '420px' }}>
      {/* Outer Rotating Ring */}
      <div className="ring-outer">
        {outerDevices.map((dev, idx) => (
          <div 
            key={idx}
            className="device-badge-orbit"
            style={dev.style}
          >
            {renderDeviceIcon(dev.iconName, dev.color)}
            <span>{dev.name}</span>
          </div>
        ))}
      </div>

      {/* Inner Rotating Ring (Reverse) */}
      <div className="ring-inner">
        {innerDevices.map((dev, idx) => (
          <div 
            key={idx}
            className="device-badge-orbit"
            style={dev.style}
          >
            {renderDeviceIcon(dev.iconName, dev.color)}
            <span>{dev.name}</span>
          </div>
        ))}
      </div>

      {/* Floating Center Router Hub */}
      <div className="hub-center">
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
          boxShadow: '0 20px 40px rgba(0, 87, 184, 0.25), inset 0 2px 6px rgba(255, 255, 255, 0.9)',
          border: '3px solid #00c7b5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Signal Indicator Dot */}
          <div style={{
            position: 'absolute',
            top: '14px',
            right: '24px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 10px #10b981'
          }}></div>

          <Radio size={42} color="#164391" style={{ marginBottom: '4px' }} />
          
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#164391',
            fontFamily: 'var(--font-heading)'
          }}>
            {siteConfig.brandName} FWA
          </div>
          <div style={{
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#00A388',
            textTransform: 'uppercase'
          }}>
            Plug &amp; Play
          </div>
        </div>

        {/* Speed Callout Tooltip */}
        <div style={{
          position: 'absolute',
          bottom: '-36px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-xl-blue)',
          color: '#ffffff',
          padding: '0.35rem 0.85rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          boxShadow: '0 6px 15px rgba(22, 67, 145, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Zap size={14} color="#facc15" />
          <span>Sinyal 5G/4G XL Terkuat</span>
        </div>
      </div>
    </div>
  );
}
