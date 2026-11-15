// DATA CONTOH (fiktif) — hanya tampil bila backend Supabase belum terhubung.
// Diganti data asli begitu VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY terisi.
export const PRODUK_CONTOH = [
  {
    id: 'contoh-1',
    nama: 'Tas Kulit Firenze — Cokelat Tua',
    harga: 2450000,
    label: 'Pilihan',
    deskripsi:
      'Tas selempang kulit sapi full-grain dari pengrajin Firenze. Jahitan tangan, lapisan suede, dan perangkat kuningan antik. Dititipbelikan langsung dari butik resmi.',
    tipe: 'Justip',
    gambar: ['/contoh/produk-1.svg'],
    links: [],
  },
  {
    id: 'contoh-2',
    nama: 'Parfum Maison Rubi — Eau de Parfum 50 ml',
    harga: 1780000,
    label: 'Baru',
    deskripsi:
      'Aroma mawar dan oud dengan dasar amber. Kemasan tersegel resmi, lengkap dengan kartu keaslian dari gerai asal.',
    tipe: 'Affiliate',
    gambar: ['/contoh/produk-2.svg'],
    links: [
      { platform: 'Shopee', url: 'https://shopee.co.id' },
      { platform: 'Tokopedia', url: 'https://tokopedia.com' },
    ],
  },
  {
    id: 'contoh-3',
    nama: 'Syal Wol Merino — Abu Taupe',
    harga: 890000,
    label: null,
    deskripsi:
      'Syal wol merino 100% dengan tenun rapat dan rumbai tangan. Hangat, ringan, dan tidak menimbulkan gatal di kulit.',
    tipe: 'Justip',
    gambar: ['/contoh/produk-3.svg'],
    links: [],
  },
  {
    id: 'contoh-4',
    nama: 'Set Perawatan Kulit Kyoto — 3 Langkah',
    harga: 1150000,
    label: 'Pilihan',
    deskripsi:
      'Rangkaian pembersih, esens, dan pelembap dari apotek Kyoto. Untuk kulit kering dan sensitif; petunjuk pemakaian berbahasa Indonesia disertakan.',
    tipe: 'Affiliate',
    gambar: ['/contoh/produk-4.svg'],
    links: [{ platform: 'Shopee', url: 'https://shopee.co.id' }],
  },
  {
    id: 'contoh-5',
    nama: 'Jam Tangan Klasik — Tali Kulit Camel',
    harga: 3275000,
    label: null,
    deskripsi:
      'Jam kuarsa Swiss dengan cangkang baja 38 mm dan tali kulit camel. Garansi internasional dua tahun dari gerai resmi.',
    tipe: 'Justip',
    gambar: ['/contoh/produk-5.svg'],
    links: [],
  },
  {
    id: 'contoh-6',
    nama: 'Cokelat Belgia Isi 24 — Edisi Musim Dingin',
    harga: 465000,
    label: 'Baru',
    deskripsi:
      'Praline cokelat Belgia isi 24 dalam kotak hadiah. Dikirim dengan kemasan pendingin agar tiba dalam keadaan sempurna.',
    tipe: 'Affiliate',
    gambar: ['/contoh/produk-6.svg'],
    links: [
      { platform: 'Tokopedia', url: 'https://tokopedia.com' },
      { platform: 'Shopee', url: 'https://shopee.co.id' },
    ],
  },
];
