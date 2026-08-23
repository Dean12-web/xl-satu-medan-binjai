import slide1 from '../assets/slide-1.webp';
import slide2 from '../assets/slide-2.webp';
import slide3 from '../assets/slide-3.webp';

export const heroSlides = [
  {
    id: 'slide-1',
    title: 'Internet Rumah Super Cepat - XL SATU Kasih Lebih',
    badge: 'INTERNET RUMAH SUMUT',
    image: slide1,
    imageAlt: 'Promo Internet Rumah XL SATU Medan & Binjai Slide 1',
    primaryCta: {
      target: 'paket',
      isNav: true
    },
    tabLabel: 'Fiber Unlimited'
  },
  {
    id: 'slide-2',
    title: 'Jaringan 100% Fiber Optic XL SATU Unlimited Tanpa FUP',
    badge: '100% FIBER OPTIC',
    image: slide2,
    imageAlt: 'XL SATU High Speed Fiber Optic Slide 2',
    primaryCta: {
      target: 'coverage',
      isNav: true
    },
    tabLabel: 'Cek Tiang ODP'
  },
  {
    id: 'slide-3',
    title: 'XL SATU FWA Praktis Nirkabel Colok Langsung Aktif',
    badge: 'SOLUSI NIRKABEL PRAKTIS',
    image: slide3,
    imageAlt: 'XL SATU FWA Router Nirkabel Slide 3',
    primaryCta: {
      target: 'fwa',
      isNav: true
    },
    tabLabel: 'FWA Tanpa Kabel'
  }
];

export default heroSlides;

