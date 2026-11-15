import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { backendTerhubung, masukAdmin, sesiAdmin } from '../lib/data.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [galat, setGalat] = useState('');
  const [memuat, setMemuat] = useState(false);

  useEffect(() => {
    sesiAdmin().then((s) => {
      if (s) window.location.hash = '#/admin';
    });
  }, []);

  async function kirim(e) {
    e.preventDefault();
    setGalat('');
    setMemuat(true);
    try {
      await masukAdmin(email, password);
      window.location.hash = '#/admin';
    } catch {
      setGalat('Gagal: email atau kata sandi salah.');
      setMemuat(false);
    }
  }

  return (
    <div className="login-layar">
      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2>Akses Dasbor</h2>
        <p className="sub">Masukkan kredensial admin Anda.</p>
        {!backendTerhubung && (
          <p className="pesan-gal">
            Backend belum terhubung — login aktif setelah proyek Supabase Justip
            dibuat dan kunci akses dipasang.
          </p>
        )}
        {galat && <p className="pesan-gal">{galat}</p>}
        <form onSubmit={kirim}>
          <div className="input-grup">
            <label htmlFor="email">Email Admin</label>
            <input
              id="email" type="email" required placeholder="admin@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={!backendTerhubung}
            />
          </div>
          <div className="input-grup">
            <label htmlFor="password">Kata Sandi</label>
            <input
              id="password" type="password" required placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              disabled={!backendTerhubung}
            />
          </div>
          <button className="btn-ruby" type="submit" disabled={!backendTerhubung || memuat}>
            {memuat ? 'Memeriksa…' : 'Masuk ke Dasbor'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16 }}>
          <a className="tautan-kembali" href="#/">← Kembali ke Katalog</a>
        </p>
      </motion.div>
    </div>
  );
}
