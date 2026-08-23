import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle, 
  Search, 
  Navigation, 
  ShieldCheck, 
  Zap, 
  Wifi, 
  Layers, 
  CheckCircle2,
  Radio,
  ArrowRight
} from 'lucide-react';
import { coverageAreas } from '../data/coverageAreas';
import CoverageForm from '../components/CoverageForm';

export default function CoveragePage() {
  const [selectedCity, setSelectedCity] = useState(coverageAreas[0].city);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Scroll to Form smoothly
  const handleScrollToForm = () => {
    const formEl = document.getElementById('coverage-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Select district from directory grid and scroll to form
  const handleSelectDistrictFromCard = (cityName, districtName) => {
    setSelectedCity(cityName);
    setSelectedDistrict(districtName);
    handleScrollToForm();
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--color-xl-blue) 0%, var(--color-xl-teal) 100%)', 
        color: '#ffffff', 
        padding: '3.5rem 0 3.5rem', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container-xl" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            background: 'rgba(255, 255, 255, 0.2)', 
            padding: '0.35rem 0.85rem', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.78rem', 
            fontWeight: 700, 
            marginBottom: '1rem', 
            backdropFilter: 'blur(8px)' 
          }}>
            <MapPin size={14} />
            <span>PETA JANGKAUAN &amp; TITIK TIANG ODP SUMATERA UTARA</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Cek Ketersediaan Jaringan XL SATU di Lokasi Anda
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.05rem', maxWidth: '780px', margin: '0 auto 1.75rem' }}>
            Periksa ketersediaan tiang ODP fiber optik FTTH dan jangkauan sinyal BTS nirkabel XL SATU melalui formulir dan peta interaktif di bawah ini.
          </p>

          {/* Quick Stats Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '1rem', 
            maxWidth: '860px', 
            margin: '0 auto' 
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>21 Kecamatan</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Kota Medan (Fiber &amp; FWA)</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>5 Kecamatan</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Kota Binjai (Full Coverage)</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>1000+ ODP</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Titik Tiang Fiber Aktif</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(10px)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900 }}>Up to 1 Gbps</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Kecepatan Simetris 100% Optik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Coverage Form Section with Embedded Map */}
      <section className="container-xl" style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 30 }}>
        <CoverageForm
          selectedCity={selectedCity}
          selectedDistrict={selectedDistrict}
          onCityChange={(city) => setSelectedCity(city)}
          onDistrictChange={(dist) => setSelectedDistrict(dist)}
        />
      </section>

      {/* Area Coverage Status Directory */}
      <section className="container-xl" style={{ marginTop: '4.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-xl-blue)', background: '#e0f2fe', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Layers size={13} />
            <span>DIREKTORI WILAYAH JANGKAUAN</span>
          </div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#111827' }}>
            Daftar Wilayah Jangkauan Aktif Sumatera Utara
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
            Pilih kecamatan Anda di bawah untuk mengarahkan titik peta di formulir atau langsung lakukan verifikasi alamat.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {coverageAreas.map((area) => (
            <div
              key={area.city}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.75rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1.5px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={20} color="var(--color-xl-blue)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' }}>
                    {area.city}
                  </h3>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#0284c7', background: '#e0f2fe', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  {area.districts.length} Kecamatan
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
                {area.districts.map((dist) => (
                  <div
                    key={dist.name}
                    className="coverage-district-row"
                    onClick={() => handleSelectDistrictFromCard(area.city, dist.name)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      border: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: '#334155', display: 'block' }}>{dist.name}</span>
                      {dist.subAreas && dist.subAreas.length > 0 && (
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          {dist.subAreas.slice(0, 2).join(', ')}...
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#059669', background: '#d1fae5', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                        {dist.status}
                      </span>
                      <ArrowRight size={14} color="#94a3b8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Network Guarantee Cards */}
      <section className="container-xl" style={{ marginTop: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          padding: '2.5rem',
          color: '#ffffff',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem' }}>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
              Keunggulan Jaringan XL SATU di Wilayah Anda
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Didukung infrastruktur kabel optik bawah tanah dan tiang ODP resmi bersertifikasi internasional.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Zap size={28} color="var(--color-xl-teal)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                100% True Fiber Optic
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Koneksi langsung dari ODP ke modem rumah Anda tanpa penurunan kecepatan pada cuaca hujan.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Radio size={28} color="#38bdf8" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                Hybrid Fiber &amp; FWA Ready
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Area yang belum terjangkau tiang kabel otomatis dilayani oleh XL SATU FWA nirkabel kecepatan tinggi.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <ShieldCheck size={28} color="#4ade80" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                Pemasangan Cepat 1x24 Jam
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                Teknisi lokal Medan &amp; Binjai siap memasang instalasi kabel dan modem router Wi-Fi dalam 24 jam kerja.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
