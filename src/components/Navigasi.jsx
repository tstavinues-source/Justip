import { motion, useReducedMotion } from 'framer-motion';

export default function Navigasi() {
  const kurangiGerak = useReducedMotion();
  return (
    <div className="navigasi-bungkus">
      <motion.header
        className="navigasi"
        initial={kurangiGerak ? false : { y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="logo" href="#/">
          JUSTIP<em>.</em>
        </a>
        <nav>
          <a href="#/">Beranda</a>
          <a href="#/#katalog">Katalog</a>
          <a href="#/#cara-pesan">Cara Pesan</a>
        </nav>
      </motion.header>
    </div>
  );
}
