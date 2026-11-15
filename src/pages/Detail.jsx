import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ambilDetailProduk, backendTerhubung } from '../lib/data.js';
import { formatRupiah } from '../lib/format.js';

const EASE = [0.22, 1, 0.36, 1];
const naik = (i) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: EASE, delay: i * 0.08 },
});

export default function Detail({ id }) {
  const [produk, setProduk] = useState(undefined);
  const [gambarAktif, setGambarAktif] = useState(0);
  const kurangiGerak = useReducedMotion();
  const anim = kurangiGerak ? {} : naik;

  useEffect(() => {
    let hidup = true;
    ambilDetailProduk(id).then((d) => {
      if (hidup) {
        setProduk(d);
        setGambarAktif(0);
      }
    });
    return () => {
      hidup = false;
    };
  }, [id]);

  if (produk === undefined) return <p className="keadaan" style={{ paddingTop: 128 }}>Memuat detail produk…</p>;
  if (produk === null)
    return (
      <div className="halaman-isi">
        <a className="tautan-kembali" href="#/">← Kembali ke Katalog</a>
        <p className="keadaan">Produk tidak ditemukan.</p>
      </div>
    );

  const gambar = produk.gambar.length ? produk.gambar : ['/contoh/produk-1.svg'];

  return (
    <div className="halaman-isi">
      <a className="tautan-kembali" href="#/">← Kembali ke Katalog</a>
      {!backendTerhubung && (
        <div>
          <span className="lencana-contoh">Mode Contoh — backend belum terhubung</span>
        </div>
      )}
      <div className="detail-grid">
        <motion.div {...anim(0)}>
          <div className="detail-gambar">
            <motion.img
              key={gambarAktif}
              src={gambar[gambarAktif]}
              alt={produk.nama}
              initial={kurangiGerak ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
          {gambar.length > 1 && (
            <div className="galeri-mini">
              {gambar.map((g, i) => (
                <button key={g + i} data-aktif={i === gambarAktif} onClick={() => setGambarAktif(i)} aria-label={`Gambar ${i + 1}`}>
                  <img src={g} alt="" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <div className="detail-info">
          <motion.div {...anim(1)}>
            {produk.label && <span className="label-produk" style={{ position: 'static', display: 'inline-block' }}>{produk.label}</span>}
            <h2 style={{ marginTop: 8 }}>{produk.nama}</h2>
            <p className="harga-besar">{formatRupiah(produk.harga)}</p>
          </motion.div>

          <motion.div {...anim(2)}>
            <h3>Spesifikasi &amp; Deskripsi</h3>
            <p className="deskripsi">{produk.deskripsi || 'Belum ada deskripsi untuk produk ini.'}</p>
          </motion.div>

          <motion.div className="panel-aksi" {...anim(3)}>
            {produk.tipe === 'Affiliate' ? (
              <>
                <h4>Beli produk ini di:</h4>
                {produk.links.length > 0 ? (
                  <div className="tautan-market">
                    {produk.links.map((l) => (
                      <a key={l.platform + l.url} href={l.url} target="_blank" rel="noreferrer">
                        <span>{l.platform}</span>
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="catatan-form">Tautan marketplace belum tersedia untuk produk ini.</p>
                )}
              </>
            ) : (
              <>
                <h4>Pemesanan Titip Beli</h4>
                <p className="catatan-form">
                  Produk ini dibelikan langsung dari gerai resmi asal. Formulir pemesanan
                  titip beli akan tersedia di sini; sementara itu, sampaikan pesanan Anda
                  melalui kontak yang tertera pada halaman utama.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
