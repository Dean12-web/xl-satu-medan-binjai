export const fiberPackages = [
  {
    id: 'fiber-250',
    name: '250 Mbps Internet 1 Bulan',
    type: 'Fiber',
    baseSpeed: '100 Mbps',
    speed: '250 Mbps',
    speedBooster: true,
    speedLevel: 3,
    maxLevel: 7,
    originalPrice: 'Rp269.000',
    promoPrice: 'Rp229.000',
    taxPrice: 'Rp254.190',
    period: '/bulan*',
    badge: 'Paling Populer',
    isPopular: true,
    idealFor: [
      'Browsing',
      'Sosial Media',
      'Streaming 4K',
      'Video Conference HD',
      'Game Online',
      'Upload Konten HD'
    ],
    features: [
      'Kecepatan hingga 250 Mbps (Speed Booster)',
      'Hingga 10 Perangkat Sekaligus',
      'Gratis Biaya Pemasangan & Instalasi',
      'Termasuk Router Wi-Fi Dual Band',
      'Bonus Kuota HP Sekeluarga 25 GB',
      'Bebas Kuota FUP (Unlimited)'
    ]
  },
  {
    id: 'fiber-350',
    name: '350 Mbps Internet 1 Bulan',
    type: 'Fiber',
    baseSpeed: '150 Mbps',
    speed: '350 Mbps',
    speedBooster: true,
    speedLevel: 5,
    maxLevel: 7,
    originalPrice: 'Rp339.000',
    promoPrice: 'Rp279.000',
    taxPrice: 'Rp309.690',
    period: '/bulan*',
    badge: 'Rekomendasi Keluarga',
    isPopular: true,
    idealFor: [
      'Browsing Cepat',
      'Sosial Media',
      'Streaming 4K Multidevice',
      'Video Conference 4K',
      'Game Online Low Latency',
      'Upload Konten 4K'
    ],
    features: [
      'Kecepatan hingga 350 Mbps (Speed Booster)',
      'Hingga 12 Perangkat Sekaligus',
      'Gratis Biaya Pemasangan & Instalasi',
      'Termasuk Router Wi-Fi Dual Band High Range',
      'Bonus Kuota HP Sekeluarga 50 GB',
      'Bonus Akses Vidio Platinum & Catchplay+'
    ]
  },
  {
    id: 'fiber-400',
    name: '400 Mbps Internet 1 Bulan',
    type: 'Fiber',
    baseSpeed: '300 Mbps',
    speed: '400 Mbps',
    speedBooster: true,
    speedLevel: 7,
    maxLevel: 7,
    originalPrice: 'Rp409.000',
    promoPrice: 'Rp300.000',
    taxPrice: 'Rp333.000',
    period: '/bulan*',
    badge: 'Kecepatan Maksimal',
    isPopular: false,
    idealFor: [
      'Smart Home Terintegrasi',
      'Streaming 8K & VR',
      'Content Creator & Live Streamer',
      'Pro Gamer & E-Sports',
      'Multi-User Heavy Download'
    ],
    features: [
      'Kecepatan super hingga 400 Mbps',
      'Hingga 14+ Perangkat Sekaligus',
      'Gratis Biaya Pemasangan & Priority Support',
      'Termasuk Router Wi-Fi 6 Terbaru',
      'Bonus Kuota HP Sekeluarga 100 GB',
      'Akses Hiburan Komplit & VIP Server'
    ]
  }
];

export const fwaPackages = [
  {
    id: 'fwa-lite',
    name: 'XL SATU FWA Lite 100GB',
    type: 'FWA',
    speed: 'Up to 30 Mbps',
    originalPrice: 'Rp179.000',
    promoPrice: 'Rp149.000',
    taxPrice: 'Rp165.390',
    period: '/bulan*',
    badge: 'Nirkabel Praktis',
    isPopular: false,
    idealFor: ['Kos & Apartemen', 'Work from Home', 'Browsing & Streaming HD'],
    features: [
      'Koneksi Nirkabel Tanpa Tarik Kabel Fiber',
      'Kuota Utama 100 GB / bulan',
      'Plug & Play Langsung Nyala',
      'Termasuk Modem Wi-Fi 4G LTE XL',
      'Bonus Kuota Nomor XL 15 GB'
    ]
  },
  {
    id: 'fwa-premium',
    name: 'XL SATU FWA Premium Unlimited',
    type: 'FWA',
    speed: 'Up to 100 Mbps',
    originalPrice: 'Rp299.000',
    promoPrice: 'Rp249.000',
    taxPrice: 'Rp276.390',
    period: '/bulan*',
    badge: 'Best Seller FWA',
    isPopular: true,
    idealFor: ['Rumah Baru Tanpa Jalur ODP', 'Streaming 4K', 'Keluarga 4-8 Device'],
    features: [
      'Kecepatan Nirkabel 5G/4G XL Axiata Terbaik',
      'Internet Rumah Tanpa Batas (Unlimited)',
      'Router High-Gain Dual Band Termasuk',
      'Aktivasi Instan Hari Ini Juga',
      'Bonus Kuota Bersama XL 50 GB'
    ]
  }
];

export const allPackages = [...fiberPackages, ...fwaPackages];
