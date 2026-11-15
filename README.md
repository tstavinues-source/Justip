# Justip — Katalog Premium (React + Framer Motion)

Bangun ulang situs Justip dari HTML statis menjadi aplikasi **React + Vite**
dengan animasi **Framer Motion** (koreografi masuk berjenjang, transisi
tata letak saat penyaringan, panel info yang tumbuh dari objeknya) —
tumpukan yang sama dengan kreator dashboard modern, dengan identitas
Justip sendiri: Playfair Display, navy–alabaster–ruby, dan kaca hanya pada
navigasi melayang di atas hero.

## Menjalankan

```bash
npm install
npm run dev      # pengembangan (font dipulihkan otomatis dari assets-b64)
npm run build    # hasil produksi di dist/ — siap di-host statis di mana pun
```

Router memakai hash (`#/`, `#/produk/<id>`, `#/admin`, `#/admin/login`)
sehingga tidak butuh konfigurasi server.

## Backend (Supabase baru)

Proyek Supabase lama Justip sudah dihapus; aplikasi ini menunggu proyek baru:

1. Buat proyek di supabase.com (gratis).
2. Buka **SQL Editor**, tempel & jalankan `supabase/schema.sql`
   (tabel `produk`, `produk_gambar`, `produk_link_affiliate` + RLS:
   publik hanya membaca, menulis wajib login admin; bucket foto `produk`).
3. **Authentication → Users**: buat akun admin untuk dasbor.
4. Salin `.env.example` menjadi `.env`, isi `VITE_SUPABASE_URL` dan
   `VITE_SUPABASE_ANON_KEY` dari **Settings → API**, lalu `npm run build` ulang.

Selama `.env` belum terisi, aplikasi berjalan dalam **Mode Contoh**:
katalog menampilkan data fiktif berlabel jelas, dan login admin nonaktif.
Begitu backend terhubung, data contoh hilang dengan sendirinya.

## Struktur

- `src/lib/data.js` — satu-satunya lapisan yang menyentuh backend.
- `src/pages/` — Katalog, Detail, AdminLogin, AdminDasbor.
- `src/components/` — Navigasi (kaca melayang), KartuProduk, Kaki.
- `src/data/contoh.js` — data fiktif Mode Contoh.
- `assets-b64/fonts/` — font Playfair Display & Inter dalam base64;
  `scripts/decode-fonts.mjs` memulihkannya ke `public/fonts/` saat dev/build.
- `supabase/schema.sql` — skema + kebijakan RLS proyek baru.
- `DESAIN.md` — sistem desain terkunci.

## Cakupan

Sesuai situs lama: katalog publik, halaman detail (panel aksi Affiliate
berisi tautan marketplace; produk Titip Beli menampilkan panel pemesanan),
login admin, dan dasbor berisi statistik serta ikhtisar produk.
Formulir pemesanan titip beli dan CRUD produk penuh adalah tahap berikutnya.
