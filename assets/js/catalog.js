// Memanggil koneksi database dan alat bantu
import { supabase } from './supabase-config.js';
import { formatRupiah } from './utils.js';

// Fungsi utama untuk memuat produk
async function muatProduk() {
    const wadahProduk = document.querySelector('.produk-grid');
    wadahProduk.innerHTML = '<p>Memuat koleksi eksklusif...</p>';

    // Mengambil data dari tabel 'produk' dan mengambil link gambar dari tabel 'produk_gambar'
    const { data, error } = await supabase
        .from('produk')
        .select(`
            *,
            produk_gambar (url_gambar)
        `)
        .order('created_at', { ascending: false }); // Urutkan dari yang paling baru

    // Jika terjadi kesalahan saat mengambil data
    if (error) {
        console.error("Gagal mengambil data:", error);
        wadahProduk.innerHTML = '<p>Maaf, gagal memuat produk saat ini.</p>';
        return;
    }

    // Jika database masih kosong
    if (!data || data.length === 0) {
        wadahProduk.innerHTML = '<p>Koleksi belum tersedia.</p>';
        return;
    }

    // Kosongkan teks loading
    wadahProduk.innerHTML = ''; 

    // Proses pembuatan kartu produk secara otomatis
    data.forEach(produk => {
        // Ambil gambar pertama jika ada, jika tidak pakai gambar kotak kosong
        const gambarUtama = (produk.produk_gambar && produk.produk_gambar.length > 0) 
                            ? produk.produk_gambar[0].url_gambar 
                            : 'https://via.placeholder.com/300x400?text=JUSTIP';
        
        // Cek apakah ada label (Best Seller, Promo, dll)
        const elemenLabel = produk.label_produk 
                            ? `<span class="label-produk">${produk.label_produk}</span>` 
                            : '';

        // Template HTML untuk setiap satu produk
        const kartuHTML = `
            <div class="kartu-produk">
                <div class="gambar-wadah">
                    ${elemenLabel}
                    <img src="${gambarUtama}" alt="${produk.nama_produk}">
                </div>
                <div class="info-produk">
                    <h3>${produk.nama_produk}</h3>
                    <p class="harga">${formatRupiah(produk.harga)}</p>
                    <a href="detail.html?id=${produk.id}" class="btn-detail">Lihat Detail</a>
                </div>
            </div>
        `;
        
        // Masukkan kartu ke dalam halaman
        wadahProduk.innerHTML += kartuHTML;
    });
}

// Jalankan fungsi ini otomatis sesaat setelah halaman website terbuka
document.addEventListener('DOMContentLoaded', muatProduk);
