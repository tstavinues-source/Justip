import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ambilProduk, backendTerhubung, hitungProduk, keluarAdmin, sesiAdmin } from '../lib/data.js';
import { formatRupiah } from '../lib/format.js';

const EASE = [0.22, 1, 0.36, 1];

// Angka statistik: hitung-naik hanya pada render pertama (kaidah gerak).
function AngkaNaik({ nilai }) {
  const ref = useRef(null);
  const terlihat = useInView(ref, { once: true });
  const kurangiGerak = useReducedMotion();
  const [tampil, setTampil] = useState(0);

  useEffect(() => {
    if (!terlihat || nilai === null) return;
    if (kurangiGerak) {
      setTampil(nilai);
      return;
    }
    const kontrol = animate(0, nilai, {
      duration: 0.8,
      ease: EASE,
      onUpdate: (v) => setTampil(Math.round(v)),
    });
    return () => kontrol.stop();
  }, [terlihat, nilai, kurangiGerak]);

  return <span ref={ref}>{nilai === null ? '…' : tampil}</span>;
}

export default function AdminDasbor() {
  const [siap, setSiap] = useState(false);
  const [total, setTotal] = useState(null);
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    let hidup = true;
    (async () => {
      if (backendTerhubung) {
        const sesi = await sesiAdmin();
        if (!sesi) {
          window.location.hash = '#/admin/login';
          return;
        }
      }
      if (!hidup) return;
      setSiap(true);
      hitungProduk().then((n) => hidup && setTotal(n)).catch(() => hidup && setTotal(0));
      ambilProduk().then((d) => hidup && setProduk(d)).catch(() => {});
    })();
    return () => {
      hidup = false;
    };
  }, []);

  async function keluar() {
    if (window.confirm('Apakah Anda yakin ingin keluar dari dasbor?')) {
      await keluarAdmin();
      window.location.hash = '#/admin/login';
    }
  }

  if (!siap) return <p className="keadaan">Memeriksa akses…</p>;

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="logo">JUSTIP<em>.</em> ADMIN</div>
        <nav>
          <a href="#/admin" data-aktif="true">Beranda Dasbor</a>
          <a href="#/" >Lihat Katalog</a>
        </nav>
        <button className="btn-keluar" onClick={keluar}>Keluar (Logout)</button>
      </aside>

      <main className="admin-utama">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          Selamat Datang, Admin
        </motion.h2>
        {!backendTerhubung && (
          <span className="lencana-contoh" style={{ margin: '0 0 16px' }}>
            Mode Contoh — backend belum terhubung
          </span>
        )}

        <div className="statistik-grid">
          <motion.div
            className="kartu-stat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.07 }}
          >
            <h3>Total Produk</h3>
            <p><AngkaNaik nilai={total} /></p>
          </motion.div>
          <motion.div
            className="kartu-stat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.14 }}
          >
            <h3>Pesanan Masuk</h3>
            <p><AngkaNaik nilai={0} /></p>
          </motion.div>
        </div>

        <motion.section
          className="tabel-bungkus"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
        >
          <h3>Ikhtisar Produk</h3>
          <table className="produk">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Tipe</th>
                <th>Label</th>
                <th>Harga</th>
              </tr>
            </thead>
            <tbody>
              {produk.map((p) => (
                <tr key={p.id}>
                  <td>{p.nama}</td>
                  <td>{p.tipe}</td>
                  <td>{p.label || '—'}</td>
                  <td className="harga-sel">{formatRupiah(p.harga)}</td>
                </tr>
              ))}
              {produk.length === 0 && (
                <tr>
                  <td colSpan={4}>Belum ada produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.section>
      </main>
    </div>
  );
}
