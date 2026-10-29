import { fiberPackages, fwaPackages } from './packages';
import { siteConfig } from './siteConfig';

export const siteSeoConfig = {
  siteName: 'XL SATU Medan, Binjai & Deli Serdang',
  baseUrl: 'https://xlsatumedanbinjai.com',
  defaultTitle: 'XL SATU Medan, Binjai & Deli Serdang - Pasang WiFi Internet Rumah Fiber & FWA',
  defaultDescription: 'Promo pasang baru internet rumah fiber optik & nirkabel XL SATU super cepat hingga 400 Mbps + kuota HP sekeluarga khusus area Medan, Binjai & Deli Serdang. Gratis biaya instalasi!',
  defaultKeywords: 'XL SATU Medan, XL SATU Binjai, XL SATU Deli Serdang, Pasang WiFi Medan, Internet Rumah Fiber Medan, Paket XL SATU, XL SATU FWA, Internet Unlimited Medan, Pasang Internet Binjai, XL Axiata First Media Medan',
  defaultImage: 'https://xlsatumedanbinjai.com/assets/slide-1.webp',
  locale: 'id_ID',
  themeColor: '#164391',
  geo: {
    region: 'ID-SU',
    placename: 'Medan, Binjai, Deli Serdang, Sumatera Utara',
    position: '3.595196;98.672223',
    icbm: '3.595196, 98.672223'
  }
};

export const pageSeoData = {
  home: {
    title: 'XL SATU Medan, Binjai & Deli Serdang - Internet Rumah Fiber Optic & FWA Unlimited',
    description: 'Daftar pasang internet rumah fiber optik XL SATU di Medan, Binjai & Deli Serdang. Nikmati kecepatan super hingga 400 Mbps tanpa FUP, bonus kuota seluler sekeluarga, dan gratis biaya pasang.',
    keywords: 'XL SATU Medan, XL SATU Binjai, XL SATU Deli Serdang, internet rumah fiber medan, pasang wifi medan, pasang internet binjai, promo xl satu sumut, internet unmetered medan',
    path: '/'
  },
  paket: {
    title: 'Katalog Paket Internet Fiber & FWA XL SATU Medan, Binjai & Deli Serdang | Bebas FUP',
    description: 'Daftar harga promo paket internet rumah fiber XL SATU Medan, Binjai & Deli Serdang mulai 250 Mbps hingga 400 Mbps. Termasuk peminjaman router Wi-Fi dual band & kuota nomor XL sekeluarga.',
    keywords: 'paket xl satu medan, harga pasang wifi xl satu, paket internet fiber binjai, paket fiber deli serdang, xl satu 250 mbps, xl satu 350 mbps, xl satu 400 mbps, biaya pasang wifi medan',
    path: '/paket'
  },
  fwa: {
    title: 'XL SATU FWA Medan, Binjai & Deli Serdang - Internet Rumah Nirkabel Plug & Play',
    description: 'Solusi internet rumah nirkabel praktis XL SATU FWA berbasis sinyal 5G/4G XL Axiata terkuat di Medan, Binjai & Deli Serdang. Colok ke listrik langsung aktif tanpa tunggu teknisi tarik kabel.',
    keywords: 'xl satu fwa medan, modem wifi fwa binjai, fwa deli serdang, internet nirkabel rumah medan, pasang wifi tanpa kabel optic, xl satu fwa 100 gb, fwa unlimited medan',
    path: '/fwa'
  },
  coverage: {
    title: 'Cek Coverage Area Jaringan & Tiang ODP XL SATU Medan, Binjai & Deli Serdang',
    description: 'Formulir online cek ketersediaan tiang ODP fiber optik dan jangkauan sinyal BTS XL SATU di lokasi Anda area Kota Medan, Kota Binjai, dan Kab. Deli Serdang.',
    keywords: 'cek coverage xl satu medan, titik tiang odp xl satu medan, area fiber optik binjai, jangkauan sinyal xl satu deli serdang, cek odp wifi medan',
    path: '/coverage'
  }
};

// Generate Schema.org JSON-LD Structured Data
export const generateJsonLdSchema = (pageKey = 'home', customPackages = null) => {
  const page = pageSeoData[pageKey] || pageSeoData.home;
  const canonicalUrl = `${siteSeoConfig.baseUrl}${page.path === '/' ? '' : page.path}`;

  // Organization & LocalBusiness
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TelecommunicationsProvider',
    '@id': `${siteSeoConfig.baseUrl}/#organization`,
    name: siteSeoConfig.siteName,
    alternateName: 'XL SATU Sumatera Utara (Medan, Binjai & Deli Serdang)',
    url: siteSeoConfig.baseUrl,
    logo: `${siteSeoConfig.baseUrl}/xl-icon.webp`,
    image: siteSeoConfig.defaultImage,
    description: siteSeoConfig.defaultDescription,
    telephone: siteConfig.salesWhatsApp,
    priceRange: 'Rp149.000 - Rp409.000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Diponegoro No. 34',
      addressLocality: 'Medan',
      addressRegion: 'Sumatera Utara',
      postalCode: '20152',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 3.595196,
      longitude: 98.672223
    },
    areaServed: [
      { '@type': 'City', name: 'Kota Medan' },
      { '@type': 'City', name: 'Kota Binjai' },
      { '@type': 'AdministrativeArea', name: 'Kabupaten Deli Serdang' }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    sameAs: [
      'https://www.xl.co.id',
      'https://satu.xl.co.id',
      'https://my.xl.co.id'
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteSeoConfig.baseUrl}/#website`,
    url: siteSeoConfig.baseUrl,
    name: siteSeoConfig.siteName,
    description: siteSeoConfig.defaultDescription,
    inLanguage: 'id-ID',
    publisher: {
      '@id': `${siteSeoConfig.baseUrl}/#organization`
    }
  };

  // WebPage Schema
  const webpageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    inLanguage: 'id-ID',
    isPartOf: {
      '@id': `${siteSeoConfig.baseUrl}/#website`
    }
  };

  // OfferCatalog Schema for packages (Gunakan data paket live jika ada, atau fallback lokal)
  const activePackages = Array.isArray(customPackages) && customPackages.length > 0 
    ? customPackages 
    : [...fiberPackages, ...fwaPackages];

  const offerCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Katalog Paket Internet XL SATU Medan, Binjai & Deli Serdang',
    itemListElement: activePackages.map((pkg) => {
      const priceRaw = String(pkg.promoPrice || pkg.price || '0').replace(/[^0-9]/g, '');
      const isFiber = pkg.type === 'Fiber' || !pkg.type;
      const targetPath = isFiber ? 'paket' : 'fwa';
      const featuresStr = Array.isArray(pkg.features) ? pkg.features.join(', ') : (pkg.description || '');

      return {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: pkg.name || `XL SATU ${pkg.speed || ''}`,
          description: featuresStr
        },
        price: priceRaw || '0',
        priceCurrency: 'IDR',
        availability: 'https://schema.org/InStock',
        url: `${siteSeoConfig.baseUrl}/${targetPath}`
      };
    })
  };

  // FAQ Schema (Bantu Rich Snippet Google Search FAQ)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Berapa biaya pasang baru internet XL SATU di Medan dan Binjai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pemasangan baru internet rumah XL SATU Fiber dan FWA di area Medan, Binjai, dan Deli Serdang 100% GRATIS biaya instalasi teknisi dan sudah dipinjamkan modem WiFi berkecepatan tinggi.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apa saja syarat berlangganan pasang WiFi XL SATU?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Syaratnya sangat mudah: cukup siapkan Foto KTP asli yang masih berlaku, nomor WhatsApp aktif, alamat email, dan share lokasi/titik alamat pemasangan untuk cek ketersediaan tiang ODP fiber.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah internet XL SATU ada batasan kuota (FUP)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tidak ada. Paket internet rumah fiber XL SATU bersifat Truly Unlimited tanpa batasan FUP (Fair Usage Policy), sehingga kecepatan internet tetap stabil 24 jam non-stop sekeluarga.'
        }
      },
      {
        '@type': 'Question',
        name: 'Berapa lama proses pemasangan teknisi ke rumah?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Setelah formulir pendaftaran dan verifikasi ID disetujui, teknisi resmi XL SATU akan datang melakukan penarikan kabel dan instalasi perangkat dalam waktu 1x24 jam hingga maksimal 2x24 jam.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apa perbedaan antara XL SATU Fiber dan XL SATU FWA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XL SATU Fiber menggunakan kabel fiber optik langsung dari tiang ODP ke rumah dengan kecepatan hingga 400 Mbps. Sedangkan XL SATU FWA menggunakan modem nirkabel berbasis sinyal 5G/4G+ XL Axiata, colok listrik langsung aktif tanpa perlu tarik kabel luar.'
        }
      }
    ]
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      localBusinessSchema,
      websiteSchema,
      webpageSchema,
      offerCatalogSchema,
      faqSchema
    ]
  };
};
