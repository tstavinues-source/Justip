// Lapisan data Justip — satu-satunya tempat yang menyentuh backend.
// Bila VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY terisi (.env), data dibaca
// dari Supabase proyek Justip. Bila belum, aplikasi memakai DATA CONTOH lokal
// (src/data/contoh.js) agar tampilan bisa dinilai — data contoh selalu
// ditandai dengan lencana "Mode Contoh" di layar.
import { createClient } from '@supabase/supabase-js';
import { PRODUK_CONTOH } from '../data/contoh.js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const backendTerhubung = Boolean(url && anon);
export const supabase = backendTerhubung ? createClient(url, anon) : null;

function bentukProduk(baris) {
  return {
    id: baris.id,
    nama: baris.nama_produk,
    harga: baris.harga,
    label: baris.label_produk || null,
    deskripsi: baris.deskripsi || '',
    tipe: baris.tipe_produk || 'Justip',
    gambar: (baris.produk_gambar || []).map((g) => g.url_gambar).filter(Boolean),
    links: (baris.produk_link_affiliate || []).map((l) => ({
      platform: l.platform,
      url: l.url_link,
    })),
  };
}

export async function ambilProduk() {
  if (!backendTerhubung) return PRODUK_CONTOH;
  const { data, error } = await supabase
    .from('produk')
    .select('*, produk_gambar(url_gambar)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(bentukProduk);
}

export async function ambilDetailProduk(id) {
  if (!backendTerhubung) {
    return PRODUK_CONTOH.find((p) => String(p.id) === String(id)) || null;
  }
  const { data, error } = await supabase
    .from('produk')
    .select('*, produk_gambar(url_gambar), produk_link_affiliate(platform, url_link)')
    .eq('id', id)
    .single();
  if (error) return null;
  return bentukProduk(data);
}

export async function hitungProduk() {
  if (!backendTerhubung) return PRODUK_CONTOH.length;
  const { count, error } = await supabase
    .from('produk')
    .select('*', { count: 'exact', head: true });
  if (error) throw error;
  return count || 0;
}

// --- Sesi admin (Supabase Auth) ---
export async function sesiAdmin() {
  if (!backendTerhubung) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function masukAdmin(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function keluarAdmin() {
  if (backendTerhubung) await supabase.auth.signOut();
}
