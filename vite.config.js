import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Basis relatif agar hasil build bisa di-host dari subpath mana pun
// (Cloudflare Workers, GitHub Pages, dsb.) tanpa konfigurasi ulang.
export default defineConfig({
  plugins: [react()],
  base: './',
});
