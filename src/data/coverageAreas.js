export const cityConfigs = {
  'Kota Medan': {
    center: [3.5952, 98.6722],
    zoom: 12,
    badge: '21 Kecamatan Aktif',
    description: 'Pusat jaringan Fiber Optik FTTH XL SATU & BTS 5G/4G+ terlengkap di Kota Medan.'
  },
  'Kota Binjai': {
    center: [3.6006, 98.4854],
    zoom: 13,
    badge: '5 Kecamatan Aktif',
    description: 'Jaringan Fiber Optik dan BTS XL SATU FWA menjangkau seluruh kecamatan di Binjai.'
  },
  'Kab. Deli Serdang (Sekitar Medan)': {
    center: [3.5600, 98.7400],
    zoom: 11,
    badge: 'Kawasan Penyangga',
    description: 'Perluasan fiber optik di perbatasan Medan-Deli Serdang & pusat pemukiman padat.'
  }
};

export const coverageAreas = [
  {
    city: 'Kota Medan',
    center: [3.5952, 98.6722],
    zoom: 12,
    districts: [
      { name: 'Medan Amplas', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5350, lng: 98.7050, speed: 'Hingga 1 Gbps', odpCount: '65+ ODP', subAreas: ['Amplas', 'Marindal', 'Timbang Deli', 'Sitirejo'] },
      { name: 'Medan Area', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5800, lng: 98.6950, speed: 'Hingga 1 Gbps', odpCount: '90+ ODP', subAreas: ['Asia Mega Mas', 'Sukaramai', 'Kotamatsum', 'Pasar Merah'] },
      { name: 'Medan Barat', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5976, lng: 98.6744, speed: 'Hingga 1 Gbps', odpCount: '80+ ODP', subAreas: ['Kesawan', 'Merdeka Walk', 'Pulo Brayan Kota', 'Glugur Kota'] },
      { name: 'Medan Baru', status: 'Tersedia (Sinyal Penuh)', type: 'Fiber & FWA', lat: 3.5719, lng: 98.6548, speed: 'Hingga 1 Gbps', odpCount: '110+ ODP', subAreas: ['Jl. Dr. Mansyur', 'Kampus USU', 'Padang Bulan', 'Babura', 'Petisah Hulu'] },
      { name: 'Medan Belawan', status: 'Tersedia Sebagian', type: 'FWA & Fiber', lat: 3.7780, lng: 98.6850, speed: 'Hingga 300 Mbps', odpCount: '35+ ODP', subAreas: ['Belawan I', 'Belawan II', 'Bagan Deli', 'Sicanang'] },
      { name: 'Medan Deli', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6550, lng: 98.6820, speed: 'Hingga 1 Gbps', odpCount: '70+ ODP', subAreas: ['Mabar', 'Tanjung Mulia', 'Kota Bangun', 'Titi Papan'] },
      { name: 'Medan Denai', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5662, lng: 98.7180, speed: 'Hingga 1 Gbps', odpCount: '75+ ODP', subAreas: ['Menteng', 'Binjai', 'Tegal Sari Mandala', 'Denai'] },
      { name: 'Medan Helvetia', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6021, lng: 98.6395, speed: 'Hingga 1 Gbps', odpCount: '95+ ODP', subAreas: ['Kapten Muslim', 'Helvetia Tengah', 'Dwikora', 'Tanjung Gusta'] },
      { name: 'Medan Johor', status: 'Tersedia (High Speed)', type: 'Fiber & FWA', lat: 3.5284, lng: 98.6725, speed: 'Hingga 1 Gbps', odpCount: '120+ ODP', subAreas: ['Karya Jaya', 'Eka Rasmi', 'Gedung Johor', 'Pangkalan Masyhur', 'Kwitang'] },
      { name: 'Medan Kota', status: 'Tersedia (Sinyal Penuh)', type: 'Fiber & FWA', lat: 3.5852, lng: 98.6800, speed: 'Hingga 1 Gbps', odpCount: '130+ ODP', subAreas: ['Pusat Pasar', 'Mesjid', 'Teladan', 'Pandu', 'Sutomo'] },
      { name: 'Medan Labuhan', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6920, lng: 98.6750, speed: 'Hingga 1 Gbps', odpCount: '60+ ODP', subAreas: ['Martubung', 'Besar', 'Pekan Labuhan', 'Tangkahan'] },
      { name: 'Medan Maimun', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5740, lng: 98.6820, speed: 'Hingga 1 Gbps', odpCount: '85+ ODP', subAreas: ['Istana Maimun', 'Brigjend Katamso', 'Kampung Baru', 'Aur', 'Hamdan'] },
      { name: 'Medan Marelan', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6720, lng: 98.6480, speed: 'Hingga 1 Gbps', odpCount: '80+ ODP', subAreas: ['Marelan Raya', 'Tanah Enam Ratus', 'Rengas Pulau', 'Paya Pasir'] },
      { name: 'Medan Perjuangan', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5980, lng: 98.7020, speed: 'Hingga 1 Gbps', odpCount: '75+ ODP', subAreas: ['HM Yamin', 'Tegal Rejo', 'Sei Kera Hilir', 'Sidorame'] },
      { name: 'Medan Petisah', status: 'Tersedia (Sinyal Penuh)', type: 'Fiber & FWA', lat: 3.5932, lng: 98.6658, speed: 'Hingga 1 Gbps', odpCount: '105+ ODP', subAreas: ['Gatot Subroto', 'Plaza Medan Fair', 'Petisah Tengah', 'Sekip', 'Sei Putih'] },
      { name: 'Medan Polonia', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5550, lng: 98.6750, speed: 'Hingga 1 Gbps', odpCount: '70+ ODP', subAreas: ['Polonia', 'Mongonsidi', 'Sari Rejo', 'Suka Damai', 'Madras Hulu'] },
      { name: 'Medan Selayang', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5412, lng: 98.6360, speed: 'Hingga 1 Gbps', odpCount: '115+ ODP', subAreas: ['Setia Budi', 'Padang Bulan Selayang', 'Beringin', 'Sempakata', 'Asam Kumbang'] },
      { name: 'Medan Sunggal', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5684, lng: 98.6258, speed: 'Hingga 1 Gbps', odpCount: '125+ ODP', subAreas: ['Ringroad', 'Gagak Hitam', 'Sunggal', 'Babura Sunggal', 'Lalang'] },
      { name: 'Medan Tembung', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6050, lng: 98.7200, speed: 'Hingga 1 Gbps', odpCount: '85+ ODP', subAreas: ['Letda Sujono', 'Bantan', 'Bandar Selamat', 'Tembung', 'Sidorejo'] },
      { name: 'Medan Timur', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6062, lng: 98.6872, speed: 'Hingga 1 Gbps', odpCount: '90+ ODP', subAreas: ['Krakatau', 'Gaharu', 'Glugur Darat', 'Perintis Kemerdekaan'] },
      { name: 'Medan Tuntungan', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5050, lng: 98.6050, speed: 'Hingga 1 Gbps', odpCount: '70+ ODP', subAreas: ['Simpang Selayang', 'Jamin Ginting KM 11-14', 'Namu Gajah', 'Lau Cih'] }
    ]
  },
  {
    city: 'Kota Binjai',
    center: [3.6006, 98.4854],
    zoom: 13,
    districts: [
      { name: 'Binjai Kota', status: 'Tersedia (Sinyal Penuh)', type: 'Fiber & FWA', lat: 3.6006, lng: 98.4854, speed: 'Hingga 1 Gbps', odpCount: '75+ ODP', subAreas: ['Tanah Lapang Merdeka', 'Jl. Sudirman', 'Kartini', 'Satria', 'Setia'] },
      { name: 'Binjai Barat', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6080, lng: 98.4680, speed: 'Hingga 1 Gbps', odpCount: '50+ ODP', subAreas: ['Payaroba', 'Limau Mungkur', 'Bandar Senembah', 'Suka Maju'] },
      { name: 'Binjai Utara', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6250, lng: 98.4980, speed: 'Hingga 1 Gbps', odpCount: '65+ ODP', subAreas: ['Kebun Lada', 'Jati Utomo', 'Cengkeh Turi', 'Pahlawan', 'Namu Ukur'] },
      { name: 'Binjai Selatan', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5780, lng: 98.4820, speed: 'Hingga 1 Gbps', odpCount: '55+ ODP', subAreas: ['Pujidadi', 'Rambung Dalam', 'Tanah Merah', 'Bhakti Karya'] },
      { name: 'Binjai Timur', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6020, lng: 98.5150, speed: 'Hingga 1 Gbps', odpCount: '70+ ODP', subAreas: ['Tunggurono', 'Jl. Soekarno Hatta', 'Sumber Karya', 'Mencirim', 'Dataran Tinggi'] }
    ]
  },
  {
    city: 'Kab. Deli Serdang (Sekitar Medan)',
    center: [3.5600, 98.7400],
    zoom: 11,
    districts: [
      { name: 'Percut Sei Tuan', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6280, lng: 98.7420, speed: 'Hingga 1 Gbps', odpCount: '120+ ODP', subAreas: ['Bandar Khalipah', 'Tembung Pasar', 'Laut Dendang', 'Medan Estate (UNIMED)', 'Sampali'] },
      { name: 'Sunggal (Deli Serdang)', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5820, lng: 98.5950, speed: 'Hingga 1 Gbps', odpCount: '85+ ODP', subAreas: ['Diski', 'KM 12 Medan-Binjai', 'Mulyo Rejo', 'Paya Geli', 'Sei Mencirim'] },
      { name: 'Patumbak', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5120, lng: 98.7180, speed: 'Hingga 1 Gbps', odpCount: '60+ ODP', subAreas: ['Patumbak Kampung', 'Marindal II', 'Sigara-gara', 'Marendal I', 'Perbatasan Amplas'] },
      { name: 'Deli Tua', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.4980, lng: 98.6850, speed: 'Hingga 1 Gbps', odpCount: '55+ ODP', subAreas: ['Deli Tua Timur', 'Deli Tua Barat', 'Kedai Durian', 'Suka Makmur', 'Perbatasan Medan Johor'] },
      { name: 'Tanjung Morawa', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5320, lng: 98.7850, speed: 'Hingga 1 Gbps', odpCount: '75+ ODP', subAreas: ['Simpang Kayu Besar', 'Tanjung Morawa Pekan', 'Kawasan Industri KIM Star', 'Buntu Bedimbar', 'Limau Manis'] },
      { name: 'Labuhan Deli', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.6850, lng: 98.6750, speed: 'Hingga 1 Gbps', odpCount: '50+ ODP', subAreas: ['Helvetia Deli Serdang', 'Manunggal', 'Pematang Johar', 'Telaga Tujuh', 'Perbatasan Medan Utara'] },
      { name: 'Pancur Batu', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.5050, lng: 98.5720, speed: 'Hingga 1 Gbps', odpCount: '45+ ODP', subAreas: ['Simpang Tuntungan', 'Durin Simbelang', 'Namo Bintang', 'Hulu', 'Jl. Jamin Ginting KM 16-19'] },
      { name: 'Namo Rambe', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.4750, lng: 98.6500, speed: 'Hingga 500 Mbps', odpCount: '40+ ODP', subAreas: ['Batu Penjemuran', 'Jati Kesuma', 'Kuta Tengah', 'Perbatasan Karya Jaya Medan'] },
      { name: 'Hamparan Perak', status: 'Tersedia', type: 'Fiber & FWA', lat: 3.7120, lng: 98.6180, speed: 'Hingga 500 Mbps', odpCount: '40+ ODP', subAreas: ['Hamparan Perak Pekan', 'Klambir Lima', 'Tandam Hilir', 'Kota Rantang', 'Perbatasan Pinggiran Medan'] }
    ]
  }
];

// Specific ODP Key Hub Markers across Medan, Binjai & Deli Serdang
export const majorOdpNodes = [
  { id: 'ODP-01', name: 'Tiang ODP Fiber USU - Mansyur', city: 'Kota Medan', district: 'Medan Baru', lat: 3.5685, lng: 98.6570, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '12/16 Tersedia' },
  { id: 'ODP-02', name: 'Tiang ODP Gatot Subroto - Fair', city: 'Kota Medan', district: 'Medan Petisah', lat: 3.5910, lng: 98.6675, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '9/16 Tersedia' },
  { id: 'ODP-03', name: 'Tiang ODP Ringroad City Walks', city: 'Kota Medan', district: 'Medan Sunggal', lat: 3.5645, lng: 98.6270, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '14/16 Tersedia' },
  { id: 'ODP-04', name: 'Tiang ODP Setia Budi Residence', city: 'Kota Medan', district: 'Medan Selayang', lat: 3.5430, lng: 98.6385, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '11/16 Tersedia' },
  { id: 'ODP-05', name: 'Tiang ODP Karya Jaya Johor', city: 'Kota Medan', district: 'Medan Johor', lat: 3.5260, lng: 98.6740, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '15/16 Tersedia' },
  { id: 'ODP-06', name: 'Tiang ODP Krakatau Glugur', city: 'Kota Medan', district: 'Medan Timur', lat: 3.6080, lng: 98.6850, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '8/16 Tersedia' },
  { id: 'ODP-07', name: 'Tiang ODP Marelan Raya', city: 'Kota Medan', district: 'Medan Marelan', lat: 3.6690, lng: 98.6510, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '10/16 Tersedia' },
  { id: 'ODP-08', name: 'Tiang ODP Asia Mega Mas', city: 'Kota Medan', district: 'Medan Area', lat: 3.5825, lng: 98.6970, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '7/16 Tersedia' },
  { id: 'ODP-09', name: 'Tiang ODP Sudirman Merdeka Binjai', city: 'Kota Binjai', district: 'Binjai Kota', lat: 3.5995, lng: 98.4870, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '13/16 Tersedia' },
  { id: 'ODP-10', name: 'Tiang ODP Soekarno-Hatta Binjai Timur', city: 'Kota Binjai', district: 'Binjai Timur', lat: 3.6040, lng: 98.5120, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '14/16 Tersedia' },
  { id: 'ODP-11', name: 'Tiang ODP Kebun Lada Binjai Utara', city: 'Kota Binjai', district: 'Binjai Utara', lat: 3.6230, lng: 98.4960, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '10/16 Tersedia' },
  { id: 'ODP-12', name: 'Tiang ODP UNIMED - Tembung', city: 'Kab. Deli Serdang (Sekitar Medan)', district: 'Percut Sei Tuan', lat: 3.6260, lng: 98.7390, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '12/16 Tersedia' },
  { id: 'ODP-13', name: 'Tiang ODP KM 12 Medan-Binjai Diski', city: 'Kab. Deli Serdang (Sekitar Medan)', district: 'Sunggal (Deli Serdang)', lat: 3.5840, lng: 98.5920, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '9/16 Tersedia' },
  { id: 'ODP-14', name: 'Tiang ODP Kayu Besar Tg. Morawa', city: 'Kab. Deli Serdang (Sekitar Medan)', district: 'Tanjung Morawa', lat: 3.5300, lng: 98.7880, type: 'Fiber FTTH', status: 'Aktif 1 Gbps', slots: '11/16 Tersedia' }
];

// BTS FWA High-Capacity Towers
export const btsTowerNodes = [
  { id: 'BTS-01', name: 'BTS Macro XL Medan Barat Kesawan', city: 'Kota Medan', lat: 3.5990, lng: 98.6760, radiusM: 3500, band: '5G / 4G+ Ultra Carrier' },
  { id: 'BTS-02', name: 'BTS Macro XL Medan Selayang Padang Bulan', city: 'Kota Medan', lat: 3.5480, lng: 98.6340, radiusM: 3800, band: '5G / 4G+ High Speed' },
  { id: 'BTS-03', name: 'BTS Macro XL Binjai Kota', city: 'Kota Binjai', lat: 3.6030, lng: 98.4830, radiusM: 4000, band: '4G+ MIMO XL SATU FWA' },
  { id: 'BTS-04', name: 'BTS Macro XL Deli Serdang Percut', city: 'Kab. Deli Serdang (Sekitar Medan)', lat: 3.6330, lng: 98.7450, radiusM: 4200, band: '4G+ High Throughput' }
];

// Distance Calculation Helpers
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of earth in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function findNearestDistrictAndOdp(lat, lng) {
  let nearestDistrict = null;
  let nearestCity = null;
  let minDistrictDist = Infinity;

  // Search all districts
  for (const cityGroup of coverageAreas) {
    for (const district of cityGroup.districts) {
      const dist = calculateDistanceKm(lat, lng, district.lat, district.lng);
      if (dist < minDistrictDist) {
        minDistrictDist = dist;
        nearestDistrict = district;
        nearestCity = cityGroup.city;
      }
    }
  }

  // Search nearest ODP node
  let nearestOdp = null;
  let minOdpDist = Infinity;
  for (const odp of majorOdpNodes) {
    const dist = calculateDistanceKm(lat, lng, odp.lat, odp.lng);
    if (dist < minOdpDist) {
      minOdpDist = dist;
      nearestOdp = odp;
    }
  }

  return {
    city: nearestCity,
    district: nearestDistrict,
    districtDistanceKm: minDistrictDist,
    nearestOdp,
    odpDistanceMeters: Math.round(minOdpDist * 1000)
  };
}

import { SALES_WHATSAPP_NUMBER, CS_PHONE_NUMBER } from './siteConfig';
export { SALES_WHATSAPP_NUMBER, CS_PHONE_NUMBER };
