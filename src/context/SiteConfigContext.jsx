/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as defaultSiteConfig } from '../data/siteConfig';
import { publicSettingService } from '../services/api';

const SiteConfigContext = createContext({
  siteConfig: defaultSiteConfig,
  loading: false,
  buildWhatsAppUrl: () => '',
  buildGeneralConsultationUrl: () => '',
  buildCoverageCheckUrl: () => '',
  buildOrderUrl: () => '',
});

export function SiteConfigProvider({ children }) {
  const [siteConfig, setSiteConfig] = useState(defaultSiteConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSettings = async () => {
      try {
        const data = await publicSettingService.getSettings();
        if (isMounted && data && typeof data === 'object') {
          setSiteConfig((prev) => ({
            ...prev,
            ...data,
            // Ensure socialMedia is preserved if not present in response
            socialMedia: data.socialMedia || prev.socialMedia,
          }));
        }
      } catch (error) {
        console.warn('Gagal fetch site-config dari API, pakai default fallback lokal:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSettings();
    return () => { isMounted = false; };
  }, []);

  const buildWhatsAppUrl = (text, customNumber = null) => {
    const number = customNumber || siteConfig.salesWhatsApp || defaultSiteConfig.salesWhatsApp;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  const buildGeneralConsultationUrl = () => {
    return buildWhatsAppUrl(
      'Halo Sales & Customer Service XL SATU Medan,Binjai dan Deli serdang, saya ingin konsultasi paket internet rumah dan info terbaru.'
    );
  };

  const buildCoverageCheckUrl = ({ fullName, whatsapp, selectedCity, selectedDistrict, addressDetails, gpsLocation }) => {
    const message = `Halo Sales XL SATU Medan & Binjai dan Deli serdang, saya ingin cek ketersediaan jaringan / tiang ODP fiber untuk alamat saya:\n\n` +
      `*Nama Lengkap:* ${fullName || '-'}\n` +
      `*No. WhatsApp:* ${whatsapp || '-'}\n` +
      `*Kota/Area:* ${selectedCity || '-'}\n` +
      `*Kecamatan:* ${selectedDistrict || 'Belum dipilih'}\n` +
      `*Detail Alamat:* ${addressDetails || '-'}\n` +
      `*Titik GPS:* ${gpsLocation || '-'}\n\n` +
      `Mohon dibantu info ketersediaan slot ODP dan jadwal pemasangan teknisi. Terima kasih!`;
    return buildWhatsAppUrl(message);
  };

  const buildOrderUrl = ({ selectedPackage, name, phone, city, address }) => {
    const planName = selectedPackage ? selectedPackage.name : 'Paket Internet XL SATU (Konsultasi)';
    const planPrice = selectedPackage ? (selectedPackage.promoPrice || selectedPackage.price) : '-';

    const message = `Halo Sales XL SATU Medan, Binjai dan Deli serdang, saya ingin mendaftar pemasangan baru:\n\n` +
      `*Pilihan Paket:* ${planName}\n` +
      `*Harga Promo:* ${planPrice}\n` +
      `*Nama Lengkap:* ${name || '-'}\n` +
      `*Nomor WhatsApp:* ${phone || '-'}\n` +
      `*Wilayah/Kota:* ${city || '-'}\n` +
      `*Alamat Pemasangan:* ${address || '-'}\n\n` +
      `Mohon dibantu proses verifikasi ODP dan jadwal instalasi teknisi. Terima kasih.`;
    return buildWhatsAppUrl(message);
  };

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        loading,
        buildWhatsAppUrl,
        buildGeneralConsultationUrl,
        buildCoverageCheckUrl,
        buildOrderUrl,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

export default SiteConfigContext;
