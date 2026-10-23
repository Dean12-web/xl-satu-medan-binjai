import { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { coverageAreas as fallbackAreas } from '../data';
import { publicOrderService, publicCoverageService } from '../services/api';
import { useSiteConfig } from '../context/SiteConfigContext';

import { validateIndonesianPhone, sanitizeString, safeOpenExternal } from '../utils/validation';

export default function OrderModal({ isOpen, onClose, selectedPackage }) {
  const { siteConfig, buildOrderUrl } = useSiteConfig();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [areas, setAreas] = useState(fallbackAreas);
  const [city, setCity] = useState(fallbackAreas[0]?.city || 'Kota Medan');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchAreas = async () => {
      try {
        const data = await publicCoverageService.getAreas();
        if (isMounted && data && data.length > 0) {
          setAreas(data);
          setCity((prev) => prev || data[0].city);
        }
      } catch (error) {
        console.warn('Gagal fetch area di OrderModal, pakai fallback:', error);
      }
    };
    fetchAreas();
    return () => { isMounted = false; };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = sanitizeString(name, 100);
    const cleanPhone = phone.trim();
    const cleanAddress = sanitizeString(address, 500);

    if (!cleanName) {
      setErrorMessage('Mohon lengkapi Nama lengkap Anda.');
      return;
    }

    if (!validateIndonesianPhone(cleanPhone)) {
      setErrorMessage('Nomor WhatsApp tidak valid. Gunakan format nomor Indonesia (contoh: 081234567890).');
      return;
    }

    setLoading(true);

    try {
      await publicOrderService.createOrder({
        name: cleanName,
        phone: cleanPhone,
        city,
        address: cleanAddress,
        selectedPackage,
        source: 'Landing Page Modal Order'
      });
    } catch (error) {
      console.warn('Gagal menyimpan lead ke server, melanjutkan via Whatsapp:', error);
    } finally {
      setLoading(false);
      const waUrl = buildOrderUrl({
        selectedPackage,
        name: cleanName,
        phone: cleanPhone,
        city,
        address: cleanAddress
      });
      safeOpenExternal(waUrl);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-xl-blue) 0%, #0066cc 100%)',
          color: '#ffffff',
          padding: '1.5rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-xl-teal)', fontWeight: 700 }}>
              Formulir Pendaftaran
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
              Langganan {siteConfig.brandName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '50%',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Selected Package Highlight if any */}
        {selectedPackage && (
          <div style={{ background: '#f0f7ff', padding: '1rem 1.75rem', borderBottom: '1px solid #e0f2fe', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Paket Dipilih:</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-xl-blue)' }}>
                {selectedPackage.name}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Harga Promo:</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-xl-green)' }}>
                {selectedPackage.promoPrice}
              </div>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Nama Lengkap Anda *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Muhammad Rizky"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #d1d5db',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Nomor WhatsApp Aktif *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 081298765432"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #d1d5db',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Wilayah Domisili *
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #d1d5db',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              {areas.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>
              Alamat Pemasangan &amp; Patokan Rumah *
            </label>
            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, dan patokan sekitar"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1.5px solid #d1d5db',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            <span>Gratis Biaya Pasang (Hemat {siteConfig.installationFeeSavings}) &amp; Bebas Biaya Pendaftaran</span>
          </div>

          {errorMessage && (
            <div style={{ color: '#dc2626', fontSize: '0.8125rem', background: '#fee2e2', padding: '0.5rem 0.75rem', borderRadius: '8px', fontWeight: 600 }}>
              {errorMessage}
            </div>
          )}

          <div style={{ paddingTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn-green"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', borderRadius: '10px' }}
            >
              {loading ? <Loader2 size={18} className='animate-spin' /> : <Send size={18} />}
              <span>{loading ? 'Menyimpan & Menghubungkan...' : 'Kirim Pendaftaran ke WhatsApp'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
