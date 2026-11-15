import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ambilProduk, backendTerhubung } from '../lib/data.js';
import KartuProduk from '../components/KartuProduk.jsx';

const EASE = [0.22, 1, 0.36, 1];
const FILTER = [
  { kunci: 'semua', label: 'Semua' },
  { kunci: 'Justip', label: 'Titip Beli' },
  { kunci: 'Affiliate', label: 'Affiliate' },
];

const varianWadah = {
  tampil: { transition: { staggerChildren: 0.07 } },
};

const varianNaik = {
  tersembunyi: { opacity: 0, y: 24 },
  tampil: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.09 },
  }),
};

const LANGKAH = [
  {
    judul: 'Pilih produk',
    isi: 'Telusuri katalog dan buka halaman detail produk yang Anda inginkan.',
  },
  {
    judul: 'Sampaikan pesanan',
    isi: 'Untuk produk titip beli, ikuti petunjuk pemesanan pada halaman detail.',
  },
  {
    judul: 'Produk dikirim',
    isi: 'Produk dibelikan dari gerai resmi asal, lalu dikirim ke alamat Anda.',
  },
];

export default function Katalog() {
  const [produk, setProduk] = useState(null);
  const [galat, setGalat] = useState('');
  const [filter, setFilter] = useState('semua');
  const kurangiGerak = useReducedMotion();

  useEffect(() => {
    let hidup = true;
    ambilProduk()
      .then((d) => hidup && setProduk(d))
      .catch(() => hidup && setGalat('Maaf, gagal memuat produk saat ini.'));
    return () => {
      hidup = false;
    };
  }, []);

  // Tautan jangkar dari navigasi (#/#katalog) — gulir setelah render.
  useEffect(() => {
    if (!produk) return;
    const frag = window.location.hash.split('#')[2];
    if (frag) {
      const el = document.getElementById(frag);
      if (el) el.scrollIntoView({ behavior: kurangiGerak ? 'auto' : 'smooth' });
    }
  }, [produk, kurangiGerak]);

  const tampil = useMemo(() => {
    if (!produk) return [];
    return filter === 'semua' ? produk : produk.filter((p) => p.tipe === filter);
  }, [produk, filter]);

  return (
    <>
      <section className="hero">
        <motion.p className="kicker" variants={varianNaik} initial="tersembunyi" animate="tampil" custom={0}>
          Titip Beli · Affiliate Pilihan
        </motion.p>
        <motion.h1 variants={varianNaik} initial="tersembunyi" animate="tampil" custom={1}>
          Koleksi Eksklusif &amp;
          <br />
          Pilihan Terbaik
        </motion.h1>
        <motion.div variants={varianNaik} initial="tersembunyi" animate="tampil" custom={2}>
          <hr className="garis-emas" />
        </motion.div>
        <motion.p variants={varianNaik} initial="tersembunyi" animate="tampil" custom={3}>
          Temukan rangkaian produk premium dan layanan titip beli tepercaya kami.
        </motion.p>
        <motion.div variants={varianNaik} initial="tersembunyi" animate="tampil" custom={4}>
          <a className="btn-utama" href="#katalog" onClick={(e) => {
            e.preventDefault();
            document.getElementById('katalog')?.scrollIntoView({ behavior: kurangiGerak ? 'auto' : 'smooth' });
          }}>
            Lihat Koleksi
          </a>
        </motion.div>
      </section>

      <section className="katalog" id="katalog">
        <h2>Koleksi Terbaru</h2>
        <p className="sub">Produk pilihan dari gerai resmi, diperbarui berkala.</p>
        {!backendTerhubung && (
          <div className="tengah">
            <span className="lencana-contoh">Mode Contoh — backend belum terhubung</span>
          </div>
        )}

        <div className="filter-baris" role="tablist" aria-label="Saring tipe produk">
          {FILTER.map((f) => (
            <button
              key={f.kunci}
              className="filter-chip"
              data-aktif={filter === f.kunci}
              onClick={() => setFilter(f.kunci)}
              role="tab"
              aria-selected={filter === f.kunci}
            >
              {f.label}
            </button>
          ))}
        </div>

        {galat && <p className="keadaan">{galat}</p>}
        {!produk && !galat && <p className="keadaan">Memuat koleksi eksklusif…</p>}
        {produk && tampil.length === 0 && <p className="keadaan">Koleksi belum tersedia.</p>}

        {produk && tampil.length > 0 && (
          <motion.div className="produk-grid" variants={varianWadah} initial="tersembunyi" animate="tampil" layout>
            <AnimatePresence mode="popLayout">
              {tampil.map((p) => (
                <KartuProduk key={p.id} produk={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <section className="cara-pesan" id="cara-pesan">
        <h2>Cara Pesan</h2>
        <div className="langkah-grid">
          {LANGKAH.map((l, i) => (
            <motion.div
              key={l.judul}
              className="langkah"
              initial={kurangiGerak ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.09 }}
            >
              <div className="nomor">{i + 1}</div>
              <h3>{l.judul}</h3>
              <p>{l.isi}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
