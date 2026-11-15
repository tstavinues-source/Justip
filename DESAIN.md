# Justip React — Sistem Desain Terkunci (2026-11-15)

## Design read (satu kalimat)
Katalog titip beli premium untuk pembeli Indonesia: tenang, mahal, dan
terpercaya — serif Playfair untuk judul, gerak Framer Motion yang halus
sebagai tanda kualitas, produk sebagai panggung utama.

## Tiga dial (halaman publik)
Variance 8 · Motion 6 · Density 4 (bawaan halaman publik di skill
web_design_taste). Panel admin terpisah: Variance 3 · Motion 3 · Density 6.

## Palet (turunan token lama Justip, diselaraskan kaidah warna mewah)
- Navy pekat `#1A2B4C` — warna utama (pengganti hitam; dari token lama).
- Alabaster `#F9F9F6` — latar terang (dari token lama).
- Ruby diredupkan `#9B1B30` — aksen aksi saja, ≤10% layar (dari token lama;
  dipakai seperti signature, bukan banjir warna).
- Champagne `#E6CFA7` — tetesan aksen pada permukaan navy (garis tipis,
  label, harga di hero) — bukan latar, bukan teks di latar terang.
- Teks utama `#2C3E50`, teks sekunder navy 70%.
Rasio 70 netral / 20 navy / 10 ruby+champagne. Emas #FFD700 dilarang.
Glow neon ungu/biru ala @code.xr dilarang.

## Tipografi
- Judul & logo: Playfair Display 600 (identitas lama dipertahankan).
- Isi & UI: Inter 400/500/600. Angka harga: tabular-nums, bobot 600.
- Judul mengandung kata benda + kategori (aturan salinan skill); tanpa
  kata terlarang; tanpa tanda seru di salinan pemasaran.

## Gerak (resep Kaidah gerak skill, Framer Motion asli kali ini)
- Masuk halaman: stagger 60–100 ms, 300–450 ms, spring lembut
  (Framer Motion `spring` damping ±26, stiffness ±260 atau ease
  [0.22, 1, 0.36, 1]).
- Grid katalog: kartu masuk berurutan saat pertama tampil; layout
  bertransisi (Framer Motion `layout`) saat filter berubah — bukan render ulang keras.
- Hover kartu: naik 2–4 px + bayangan mendalam 180–220 ms; gambar produk
  skala 1.03 di dalam bingkainya.
- Detail produk: gambar & info masuk sebagai satu koreografi; panel aksi
  (Affiliate / Form Justip) muncul dari bawah objeknya.
- Navigasi melayang berkaca HANYA di atas hero (blur 16 px, latar navy
  translusen, tepi terang 1 px) — satu-satunya permukaan kaca; katalog dan
  admin tetap polos demi keterbacaan.
- Angka statistik admin: hitung-naik hanya render pertama.
- `prefers-reduced-motion` dihormati (fade instan).

## Komponen & cakupan (persis fitur lama, dipoles)
Publik: navigasi melayang, hero, grid katalog (kartu: gambar, label,
nama, harga Rupiah, tombol detail), halaman detail (galeri gambar,
deskripsi, panel aksi per tipe produk), footer sederhana.
Admin: login, dasbor (statistik total produk & pesanan), daftar produk.
Form pemesanan Justip dan CRUD produk penuh BUKAN cakupan tahap ini
(di versi lama pun masih placeholder).

## Lapisan data (menunggu keputusan backend user)
Satu modul `src/lib/data.js` membungkus semua akses data agar backend
(Supabase baru / Firebase / statis) bisa ditukar tanpa menyentuh komponen.
Skema produk mengikuti skema lama: nama_produk, harga, label_produk,
deskripsi, tipe_produk (Affiliate|Justip), gambar[] (url), link_affiliate[]
(platform, url).
