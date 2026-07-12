import { supabase } from './supabase-config.js';
import { formatRupiah } from './utils.js';

async function muatDetail() {
    // Membaca ID dari URL (misal: detail.html?id=5)
    const urlParams = new URLSearchParams(window.location.search);
    const idProduk = urlParams.get('id');
    const wadah = document.getElementById('detail-wadah');

    // Jika tidak ada ID di URL, tampilkan error
    if (!idProduk) {
        wadah.innerHTML = '<p style="text-align:center;">Produk tidak ditemukan.</p>';
        return;
    }

    // Mengambil data produk spesifik dari Supabase
    const { data, error } = await supabase
        .from('produk')
        .select('*, produk_gambar(url_gambar), produk_link_affiliate(platform, url_link)')
        .eq('id', idProduk)
        .single();

    if (error || !data) {
        wadah.innerHTML = '<p style="text-align:center;">Gagal memuat informasi produk.</p>';
        return;
    }

    // Menentukan gambar
    const gambarUtama = (data.produk_gambar && data.produk_gambar.length > 0)
                        ? data.produk_gambar[0].url_gambar
                        : 'https://via.placeholder.com/400x500?text=JUSTIP';

    // LOGIKA PENTING: Menentukan apa yang muncul di bawah deskripsi
    let areaAksi = '';
    
    if (data.tipe_produk === 'Affiliate') {
        // Jika affiliate, siapkan tombol (logika detailnya kita buat nanti)
        areaAksi = `
            <div style="margin-top: 20px; padding: 15px; background: #f0f4f8; border-radius: 6px;">
                <p style="font-size: 14px; margin-bottom: 10px;"><b>Beli produk ini di:</b></p>
                <button class="btn-primary" style="width:100%">Menuju Marketplace</button>
            </div>
        `;
    } else {
        // Jika Justip, siapkan tempat untuk Form Dinamis
        areaAksi = `
            <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 6px;">
                <p style="font-size: 14px; margin-bottom: 10px;"><b>Formulir Pemesanan Justip</b></p>
                <p style="font-size: 12px; color: gray;">(Formulir akan dimuat di sini)</p>
            </div>
        `;
    }

    // Menggabungkan semua data ke dalam HTML
    wadah.innerHTML = `
        <div class="detail-grid">
            <div class="detail-gambar">
                <img src="${gambarUtama}" alt="${data.nama_produk}">
            </div>
            <div class="detail-info">
                <h2>${data.nama_produk}</h2>
                <p class="harga-besar">${formatRupiah(data.harga)}</p>
                
                <div class="deskripsi-produk">
                    <h3 style="font-size:14px; margin-bottom:5px;">Spesifikasi & Deskripsi:</h3>
                    <p style="font-size:14px; opacity:0.8;">${data.deskripsi || 'Belum ada deskripsi untuk produk ini.'}</p>
                </div>
                
                ${areaAksi}
            </div>
        </div>
    `;
}

// Jalankan saat halaman dibuka
document.addEventListener('DOMContentLoaded', muatDetail);
