# 🌐 XL SATU Medan & Binjai

> Portal Web Resmi Layanan Internet Rumah Fiber Optik & Nirkabel (FWA) XL SATU untuk Area Kota Medan, Kota Binjai, dan Kabupaten Deli Serdang (Sumatera Utara).

---

## 📌 Ringkasan Proyek

**XL SATU Medan & Binjai** adalah aplikasi web modern berbasis **React 19** dan **Vite** yang dirancang sebagai sarana informasi, katalog paket promo, pengecekan jangkauan tiang fiber (ODP / BTS), serta registrasi pelanggan secara instan via integrasi WhatsApp Sales.

Website ini dioptimalkan khusus untuk **Local SEO (Sumatera Utara)**, memiliki antarmuka responsif (*mobile-first*), performa tinggi, dan navigasi yang intuitif untuk mempermudah calon pelanggan memilih layanan internet terbaik untuk rumah maupun tempat usaha.

---

## ✨ Fitur-Fitur Utama

### 1. 🏠 Beranda Dinamis (*Home Page*)
- **Hero Slider Banner**: Carousel banner promo interaktif dengan tombol call-to-action (CTA) langsung ke katalog paket & konsultasi.
- **Showcase Keunggulan**: Informasi bebas FUP, gratis biaya instalasi (hemat s/d Rp 500.000), dan bonus kuota HP bersama sekeluarga.
- **Testimoni Pelanggan & FAQ Akordeon**: Panduan lengkap tanya-jawab seputar registrasi, jadwal teknisi, dan pembayaran.

### 2. 📦 Katalog Paket & Promo (*Paket Page*)
- **Filter Fleksibel**: Pemilihan kategori antara **Fiber Optic** (kabel murni kecepatan tinggi s/d 1 Gbps) dan **XL SATU FWA** (nirkabel tanpa kabel tiang).
- **Pricing Card Interaktif**: Menampilkan harga normal, harga promo coret, kuota internet rumah tanpa batas, dan kuota HP nomor XL.
- **Modal Registrasi Instan**: Pop-up konfirmasi order yang menyusun format pesan WhatsApp otomatis ke Sales Representative resmi.

### 3. 📡 XL SATU FWA (*Fixed Wireless Access Page*)
- **Visualisasi Animasi FWA Hub**: Ilustrasi interaktif alur koneksi nirkabel dari menara BTS XL Axiata langsung ke router rumah.
- **Solusi Alternatif Tanpa Tiang ODP**: Panduan bagi perumahan atau area yang belum terjangkau tiang fiber optik.

### 4. 🗺️ Cek Coverage & Peta ODP Interaktif (*Coverage Page*)
- **Peta Interaktif Leaflet**: Visualisasi titik Optical Distribution Point (ODP) dan BTS di seluruh kecamatan Medan, Binjai, dan Deli Serdang.
- **Pendeteksi Lokasi GPS**: Fitur *Geolocation API* untuk mengambil koordinat pelanggan secara akurat.
- **Formulir Validasi Alamat**: Form periksa jangkauan tiang yang langsung terhubung ke WhatsApp Sales dengan rincian nama, alamat lengkap, dan koordinat GPS.

### 5. 🔍 Optimasi SEO Lokal & Performa Tinggi
- **Komponen SeoHead**: Manajemen tag meta dinamis (OpenGraph, Twitter Cards, Geo-Meta Tags untuk Medan & Binjai `ID-SU`).
- **Structured Data (JSON-LD)**: Skema `LocalBusiness`, `Product`, dan `FAQPage` untuk memaksimalkan peringkat di mesin pencari Google.
- **Floating Quick-Action**: Tombol WhatsApp mengambang dengan indikator status respons cepat.

---

## 🛠️ Arsitektur & Teknologi

| Komponen | Teknologi / Pustaka |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [React DOM 19](https://react.dev/) |
| **Build Tool & Bundler** | [Vite 5](https://vitejs.dev/) |
| **Styling** | Vanilla Modern CSS (CSS Variables, Flexbox/Grid, Animasi Halus) |
| **Pemetaan Interaktif** | [Leaflet](https://leafletjs.com/) (OpenStreetMap Tile Layer) |
| **Ikonografi** | [Lucide React](https://lucide.dev/) |
| **Linting & Kode Bersih** | ESLint 10 + React Hooks Plugins |

---

## 📂 Struktur Direktori

```plaintext
xl-satu-medan-binjai/
├── admin/                      # [SEPARATED] Admin CMS Dashboard Project
│   ├── src/
│   │   ├── components/admin/   # Komponen tab, sidebar, modal admin
│   │   ├── pages/              # LoginPage.jsx, AdminPage.jsx
│   │   ├── data/               # Master paket, seo, slides, config
│   │   ├── App.jsx             # Auth guard & state management sesi admin
│   │   └── main.jsx
│   ├── index.html              # HTML entry point portal admin
│   ├── package.json            # Dependensi admin (Vite, React 19, Lucide)
│   └── vite.config.js          # Port 5174
├── public/                     # Aset statis publik website (favicon, manifest)
├── src/                        # [PUBLIC] Frontend Website Utama Pengunjung
│   ├── assets/                 # Gambar logo, banner slide, ilustrasi
│   ├── components/             # Komponen modular website publik
│   │   ├── Navbar.jsx          # Navigasi utama dengan menu responsif
│   │   ├── Footer.jsx          # Informasi kontak, tautan medsos & legal
│   │   ├── HeroSlider.jsx      # Carousel banner promo beranda
│   │   ├── PricingCard.jsx     # Kartu paket internet & benefit
│   │   ├── OrderModal.jsx      # Modal formulir pendaftaran cepat WhatsApp
│   │   ├── CoverageMap.jsx     # Peta Leaflet interaktif titik ODP & BTS
│   │   ├── CoverageForm.jsx    # Form cek jangkauan + deteksi koordinat GPS
│   │   ├── FwaHubAnimation.jsx # Animasi interaktif modem FWA
│   │   ├── FloatingWhatsApp.jsx# Tombol floating chat WhatsApp
│   │   └── SeoHead.jsx         # Pengelola meta tags & schema JSON-LD
│   ├── data/                   # Sumber data konfigurasi & konten publik
│   ├── pages/                  # Halaman website publik (Home, Paket, FWA, Coverage)
│   ├── App.jsx                 # Routing internal website pengunjung
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── REST_API_DATABASE_DESIGN.md # Desain teknis arsitektur REST API & Database
├── index.html                  # HTML entry point website publik
├── package.json                # Dependensi & skrip proyek utama
└── vite.config.js              # Port 5173
```

---

## 🚀 Panduan Memulai (*Getting Started*)

### 1. Prasyarat Sistem
Pastikan Anda telah menginstal perangkat lunak berikut:
- **Node.js**: Versi 18.0.0 atau yang lebih baru
- **npm** atau **yarn / pnpm**

### 2. Instalasi Dependensi
Clone repositori ke komputer lokal Anda dan jalankan instalasi paket:

```bash
# Clone repositori
git clone https://github.com/Dean12-web/xl-satu-medan-binjai.git

# Masuk ke direktori proyek
cd xl-satu-medan-binjai

# Instal paket dependensi
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Server)

#### A. Website Utama (Publik)
```bash
npm run dev
```
Buka peramban (*browser*) Anda dan akses alamat 👉 **`http://localhost:5173`**.

#### B. Admin CMS Dashboard (Pengelola)
```bash
npm run dev:admin
# atau: cd admin && npm run dev
```
Buka peramban (*browser*) Anda dan akses alamat 👉 **`http://localhost:5174`**.
- Akun default: `admin` / `admin123`

---

### 4. Build untuk Lingkungan Produksi

```bash
# Build website publik saja (output: dist/)
npm run build

# Build admin CMS saja (output: admin/dist/)
npm run build:admin

# Build keduanya sekaligus
npm run build:all
```
Hasil build siap di-deploy secara terpisah ke hosting atau subdomain masing-masing.

### 5. Pemeriksaan Kode (*Linting*)
Jalankan ESLint untuk memastikan kerapian dan standarisasi kode:

```bash
npm run lint
```

---

## ⚙️ Konfigurasi & Kustomisasi

Seluruh data dinamis dan kontak terpusat pada direktori `src/data/`:

- **Nomor Kontak WhatsApp & Info Kantor**:  
  Edit file [`src/data/siteConfig.js`](file:///Users/yudi-macair/Desktop/xl-satu-medan-binjai/src/data/siteConfig.js) untuk memperbarui nomor WhatsApp sales, alamat XL Center Medan, atau teks generator pesan.
- **Katalog Paket & Harga**:  
  Edit file [`src/data/packages.js`](file:///Users/yudi-macair/Desktop/xl-satu-medan-binjai/src/data/packages.js) untuk mengubah nama paket, harga promo, kuota HP, atau kecepatan internet.
- **Titik Jaringan & Wilayah Coverage**:  
  Edit file [`src/data/coverageAreas.js`](file:///Users/yudi-macair/Desktop/xl-satu-medan-binjai/src/data/coverageAreas.js) untuk menambah kecamatan atau koordinat ODP baru di Medan & Binjai.
- **Banner Slider Promo**:  
  Edit file [`src/data/slides.js`](file:///Users/yudi-macair/Desktop/xl-satu-medan-binjai/src/data/slides.js).

---

## 📑 Roadmap & Dokumentasi Backend

Untuk rencana pengembangan fase berikutnya (integrasi Admin Dashboard CMS dan REST API backend berbasis relasional database):
- Silakan lihat dokumentasi lengkap di: [`REST_API_DATABASE_DESIGN.md`](file:///Users/yudi-macair/Desktop/xl-satu-medan-binjai/REST_API_DATABASE_DESIGN.md). Dokumen tersebut mencakup Entity Relationship Diagram (ERD), skema tabel database (MySQL / PostgreSQL), spesifikasi endpoint REST API, dan rancangan sistem autentikasi per-role.

---

## 📞 Informasi Kontak & Layanan

- **Wilayah Layanan**: Kota Medan, Kota Binjai, dan Kabupaten Deli Serdang, Sumatera Utara
- **Alamat Kantor**: XL Center Medan - Jl. Diponegoro No. 34, Medan Kota, Sumatera Utara
- **WhatsApp Sales**: [0877-8034-6500](https://wa.me/6287780346500)
