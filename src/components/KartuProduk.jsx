import { motion } from 'framer-motion';
import { formatRupiah } from '../lib/format.js';

const varianKartu = {
  tersembunyi: { opacity: 0, y: 24 },
  tampil: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  keluar: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
};

export default function KartuProduk({ produk }) {
  const gambar = produk.gambar[0] || '/contoh/produk-1.svg';
  return (
    <motion.article
      className="kartu-produk"
      variants={varianKartu}
      initial="tersembunyi"
      animate="tampil"
      exit="keluar"
      layout
    >
      <div className="gambar-wadah">
        {produk.label && <span className="label-produk">{produk.label}</span>}
        <img src={gambar} alt={produk.nama} loading="lazy" />
        <span className="label-tipe">{produk.tipe}</span>
      </div>
      <div className="info-produk">
        <h3 title={produk.nama}>{produk.nama}</h3>
        <p className="harga">{formatRupiah(produk.harga)}</p>
        <a className="btn-detail" href={`#/produk/${produk.id}`}>
          Lihat Detail
        </a>
      </div>
    </motion.article>
  );
}
