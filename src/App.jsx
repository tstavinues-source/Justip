import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigasi from './components/Navigasi.jsx';
import Kaki from './components/Kaki.jsx';
import Katalog from './pages/Katalog.jsx';
import Detail from './pages/Detail.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDasbor from './pages/AdminDasbor.jsx';

// Router hash sederhana — cocok untuk hosting statis tanpa konfigurasi server.
// Rute: #/ (katalog) · #/produk/<id> · #/admin/login · #/admin
function bacaRute() {
  const mentah = window.location.hash.replace(/^#/, '') || '/';
  const bersih = mentah.split('#')[0]; // buang jangkar dalam halaman (#/ + #katalog)
  const bagian = bersih.split('/').filter(Boolean);
  if (bagian[0] === 'produk' && bagian[1]) return { nama: 'detail', id: decodeURIComponent(bagian[1]) };
  if (bagian[0] === 'admin' && bagian[1] === 'login') return { nama: 'admin-login' };
  if (bagian[0] === 'admin') return { nama: 'admin' };
  return { nama: 'katalog' };
}

export default function App() {
  const [rute, setRute] = useState(bacaRute);

  useEffect(() => {
    const dengar = () => setRute(bacaRute());
    window.addEventListener('hashchange', dengar);
    return () => window.removeEventListener('hashchange', dengar);
  }, []);

  useEffect(() => {
    if (!window.location.hash.includes('#katalog') && !window.location.hash.includes('#cara-pesan')) {
      window.scrollTo({ top: 0 });
    }
  }, [rute]);

  const halamanAdmin = rute.nama === 'admin' || rute.nama === 'admin-login';

  return (
    <div className={halamanAdmin ? 'admin-bungkus' : undefined}>
      {!halamanAdmin && <Navigasi />}
      <AnimatePresence mode="wait">
        <motion.main
          key={rute.nama + (rute.id || '')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {rute.nama === 'katalog' && <Katalog />}
          {rute.nama === 'detail' && <Detail id={rute.id} />}
          {rute.nama === 'admin-login' && <AdminLogin />}
          {rute.nama === 'admin' && <AdminDasbor />}
        </motion.main>
      </AnimatePresence>
      {!halamanAdmin && <Kaki />}
    </div>
  );
}
