import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Navigation, Send, AlertCircle, Sparkles } from 'lucide-react';
import { coverageAreas as fallbackAreas, findNearestDistrictAndOdp } from '../data';
import { publicCoverageService } from '../services/api';
import { useSiteConfig } from '../context/SiteConfigContext';
import CoverageMap from './CoverageMap';

export default function CoverageForm({
  selectedCity: propSelectedCity,
  selectedDistrict: propSelectedDistrict,
  onCityChange,
  onDistrictChange
}) {
  const { buildCoverageCheckUrl } = useSiteConfig();
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedCity, setSelectedCity] = useState(propSelectedCity || '');
  const [selectedDistrict, setSelectedDistrict] = useState(propSelectedDistrict || '');
  const [addressDetails, setAddressDetails] = useState('');
  const [gpsLocation, setGpsLocation] = useState('');
  const [userCoords, setUserCoords] = useState(null); // { lat, lng }
  const [isLocating, setIsLocating] = useState(false);
  const [locatingError, setLocatingError] = useState('');

/* eslint-disable react-hooks/set-state-in-effect */
  const [coverageAreas, setCoverageAreas] = useState(fallbackAreas);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchAreas = async () => {
      try {
        const data = await publicCoverageService.getAreas();
        if (isMounted && data && data.length > 0) {
          setCoverageAreas(data);
          setSelectedCity((prev) => prev || data[0].city);
        }
      } catch (error) {
        console.warn('Gagal fetch area dari API, pakai data fallback lokal:', error);
      }
    };

    fetchAreas();
    return () => { isMounted = false; };
  }, []);

  // Sync state ketika prop berganti
  useEffect(() => {
    if (propSelectedCity) {
      setSelectedCity(propSelectedCity);
    }
  }, [propSelectedCity]);

  useEffect(() => {
    if (propSelectedDistrict !== undefined) {
      setSelectedDistrict(propSelectedDistrict);
    }
  }, [propSelectedDistrict]);

  // Handle ganti kota
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict('');
    if(onCityChange) onCityChange(city);
  };

  // Hande ganti district
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    if(onDistrictChange) onDistrictChange(district);
  };

  // Handle lokasi terpilih dari map (Click / Geser)
  const handleMapLocationSelect = ({lat, lng, coordsStr}) => {
    setUserCoords({lat, lng});
    setGpsLocation(coordsStr);
    setLocatingError('');

    const nearest = findNearestDistrictAndOdp(lat, lng);
    if(nearest && nearest.city && !selectedDistrict){
      setSelectedCity(nearest.city);
      if(nearest.district){
        setSelectedDistrict(nearest.district.name);
      }
    }
  };

  // Handle GPS detection via "Lokasi saya" button
  const handleGetLocation = () => {
    if(!navigator.geolocation){
      setLocatingError('Browser Anda tidak mendukung geolokasi GPS.');
      return;
    }

    setIsLocating(true);
    setLocatingError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        const coordsStr = `Lat ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`;
        setGpsLocation(coordsStr);
        setUserCoords({lat: latitude, lng: longitude});
        setIsLocating(false);

        const nearest = findNearestDistrictAndOdp(latitude, longitude);
        if(nearest && nearest.city){
          setSelectedCity(nearest.city);
          if(nearest.district){
            setSelectedDistrict(nearest.district.name);
          }
        }
      },
      () => {
        setIsLocating(false);
        setLocatingError('Tidak dapat mendeteksi lokasi GPS. Pastikan izin lokasi aktif atau klik langsung pada peta.');
      },
      {timeout:10000,enableHighAccuracy:true}
    );
  };

  // Fetch 2: Submit form -> Simpan lead ke API, lalu buka WhatsApp
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!fullName || !whatsapp){
      toast.warning('Mohon lengkapi Nama lengkap dan Nomor WhatsApp Anda.');
      return;
    }
  
    setIsSubmitting(true);

    try {
      await publicCoverageService.submitInquiry({
        name: fullName,
        phone: whatsapp,
        city: selectedCity,
        district: selectedDistrict,
        address: addressDetails,
        gps_coordinates: gpsLocation,
        package_name: 'Cek Coverage',
        selectedPackage: { name: 'Cek Coverage' },
        source: 'Formulir Cek Jangkauan ODP',
      });
    } catch (error) {
      console.warn('Gagal menyimpan lead ke server, lanjut ke WhatsApp:', error);
    } finally{
      setIsSubmitting(false);

      const waUrl = buildCoverageCheckUrl({
        fullName,
        whatsapp,
        selectedCity,
        selectedDistrict,
        addressDetails,
        gpsLocation
      });
      window.open(waUrl, '_blank');
    }
  };

  const currentCityData = coverageAreas.find((c) => c.city === selectedCity) || coverageAreas[0];

  return (
    <div id="coverage-form-section" className="glass-card coverage-form-card" style={{ padding: '2.5rem', maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0f2fe', color: 'var(--color-xl-blue)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Sparkles size={14} color="var(--color-xl-blue)" />
          <span>VERIFIKASI JANGKAUAN ODP FIBER &amp; FWA</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
          Formulir Pengecekan Titik Jaringan (ODP)
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Isi data calon pelanggan dan gunakan tombol <strong>"Lokasi Saya"</strong> atau klik pada peta untuk menentukan koordinat presisi rumah Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
        {/* Full Name */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
            Nama Lengkap Calon Pelanggan *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Contoh: Budi Pratama"
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              border: '1.5px solid #d1d5db',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
            Nomor WhatsApp Aktif *
          </label>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Contoh: 081234567890"
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              border: '1.5px solid #d1d5db',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        {/* City & District Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
              Wilayah / Kota *
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1.5px solid #d1d5db',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              {coverageAreas.map((area) => (
                <option key={area.city} value={area.city}>
                  {area.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
              Kecamatan
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1.5px solid #d1d5db',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="">-- Pilih Kecamatan --</option>
              {currentCityData.districts.map((dist) => (
                <option key={dist.name} value={dist.name}>
                  {dist.name} ({dist.status})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GPS Location Tracker & Embedded Map directly below Titik Koordinat */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
            Titik Koordinat GPS / Titik Lokasi Rumah (Opsional)
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
            <input
              type="text"
              readOnly
              value={gpsLocation}
              placeholder="Klik 'Lokasi Saya' atau klik titik pada peta di bawah"
              style={{
                flexGrow: 1,
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                border: '1.5px solid #d1d5db',
                background: '#f8fafc',
                fontSize: '0.9rem',
                color: '#475569'
              }}
            />
            <button
              type="button"
              className="btn-green"
              style={{ padding: '0.85rem 1.25rem', whiteSpace: 'nowrap' }}
              onClick={handleGetLocation}
              disabled={isLocating}
            >
              <Navigation size={18} />
              {isLocating ? 'Mencari...' : 'Lokasi Saya'}
            </button>
          </div>
          {locatingError && (
            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <AlertCircle size={14} />
              {locatingError}
            </p>
          )}

          {/* Clean Map Embedded Directly Below Titik Koordinat */}
          <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <CoverageMap
              userCoords={userCoords}
              onLocationSelect={handleMapLocationSelect}
            />
          </div>
        </div>

        {/* Detail Alamat / Patokan */}
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#374151', marginBottom: '0.4rem' }}>
            Alamat Lengkap &amp; Patokan Rumah *
          </label>
          <textarea
            rows={3}
            required
            value={addressDetails}
            onChange={(e) => setAddressDetails(e.target.value)}
            placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, dan patokan (misal: dekat Masjid Al-Falah / depan Alfamart)"
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              border: '1.5px solid #d1d5db',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Submit Action */}
        <div style={{ paddingTop: '0.5rem' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', padding: '1.05rem', fontSize: '1.05rem', borderRadius: '12px', fontWeight: 800 }}
          >
            <Send size={20} />
            {isSubmitting ? 'Menyimpan & Menghubungkan...' : 'Kirim & Cek Jangkauan via WhatsApp Sales'}
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.65rem' }}>
            ⚡ Gratis Biaya Pengecekan Lokasi &amp; Pemasangan Teknisi Resmi XL SATU
          </p>
        </div>
      </form>
    </div>
  );
}
