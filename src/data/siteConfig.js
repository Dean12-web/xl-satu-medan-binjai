export const siteConfig = {
  brandName: 'XL SATU',
  brandTagline: 'Medan, Binjai & Deli Serdang',
  region: 'Sumatera Utara',
  partnerLabel: 'Mitra Resmi XL Axiata Sumatera Utara',
  salesWhatsApp: '6287780346500',
  salesWhatsAppDisplay: '0877-8034-6500',
  officeAddress: 'XL Center Medan - Jl. Diponegoro No. 34, Medan Kota, Sumatera Utara',
  myXLAppUrl: 'https://my.xl.co.id',
  installationFeeSavings: 'Rp 500.000',
  standardCableLimit: '150-200 meter',
  defaultHeroInterval: 6000,
  socialMedia: [
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'XL SATU Medan',
      url: 'https://web.facebook.com/people/Sadan-Stock/100076125108797',
      color: '#1877F2'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@xlsatumedan',
      url: 'https://www.instagram.com/xlsatumedan.id',
      color: '#E4405F'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      handle: '0877-8034-6500',
      url: 'https://wa.me/6287780346500',
      color: '#25D366'
    }
  ]
};

export const SALES_WHATSAPP_NUMBER = siteConfig.salesWhatsApp;

export const buildWhatsAppUrl = (phoneNumber, text) => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
};

export const buildGeneralConsultationUrl = () => {
  return buildWhatsAppUrl(
    siteConfig.salesWhatsApp,
    'Halo Sales & Customer Service XL SATU Medan, Binjai & Deli Serdang, saya ingin konsultasi paket internet rumah dan info terbaru.'
  );
};

export const buildCoverageCheckUrl = ({ fullName, whatsapp, selectedCity, selectedDistrict, addressDetails, gpsLocation }) => {
  const message = `Halo Sales XL SATU Medan, Binjai & Deli Serdang, saya ingin cek ketersediaan jaringan / tiang ODP fiber untuk alamat saya:\n\n` +
    `*Nama Lengkap:* ${fullName || '-'}\n` +
    `*No. WhatsApp:* ${whatsapp || '-'}\n` +
    `*Kota/Area:* ${selectedCity || '-'}\n` +
    `*Kecamatan:* ${selectedDistrict || 'Belum dipilih'}\n` +
    `*Detail Alamat:* ${addressDetails || '-'}\n` +
    `*Titik GPS:* ${gpsLocation || '-'}\n\n` +
    `Mohon dibantu info ketersediaan slot ODP dan jadwal pemasangan teknisi. Terima kasih!`;
  return buildWhatsAppUrl(siteConfig.salesWhatsApp, message);
};

export const buildOrderUrl = ({ selectedPackage, name, phone, city, address }) => {
  const planName = selectedPackage ? selectedPackage.name : 'Paket Internet XL SATU (Konsultasi)';
  const planPrice = selectedPackage ? (selectedPackage.promoPrice || selectedPackage.price) : '-';

  const message = `Halo Sales XL SATU Medan, Binjai & Deli Serdang, saya ingin mendaftar pemasangan baru:\n\n` +
    `*Pilihan Paket:* ${planName}\n` +
    `*Harga Promo:* ${planPrice}\n` +
    `*Nama Lengkap:* ${name || '-'}\n` +
    `*Nomor WhatsApp:* ${phone || '-'}\n` +
    `*Wilayah/Kota:* ${city || '-'}\n` +
    `*Alamat Pemasangan:* ${address || '-'}\n\n` +
    `Mohon dibantu proses verifikasi ODP dan jadwal instalasi teknisi. Terima kasih.`;
  return buildWhatsAppUrl(siteConfig.salesWhatsApp, message);
};
