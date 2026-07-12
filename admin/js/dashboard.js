import { supabase } from '../../assets/js/supabase-config.js';
import { showNotification } from '../../assets/js/utils.js';

// FUNGSI 1: Proteksi Halaman (Cek Login)
async function cekAksesAdmin() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        // Jika tidak ada sesi (belum login), kembalikan ke halaman login
        window.location.replace('login.html');
    } else {
        // Jika aman, tampilkan isi halaman yang tadi disembunyikan (display: none)
        document.body.style.display = 'block';
        hitungTotalProduk(); // Panggil fungsi penghitung statistik
    }
}

// FUNGSI 2: Mengambil angka statistik untuk ditampilkan di dasbor
async function hitungTotalProduk() {
    // Menghitung jumlah baris di tabel produk
    const { count, error } = await supabase
        .from('produk')
        .select('*', { count: 'exact', head: true });
        
    if (!error) {
        document.getElementById('stat-produk').innerText = count;
    } else {
        document.getElementById('stat-produk').innerText = "Error";
    }
}

// FUNGSI 3: Logika Tombol Keluar (Logout)
const tombolLogout = document.getElementById('btn-logout');
if (tombolLogout) {
    tombolLogout.addEventListener('click', async () => {
        const konfirmasi = confirm("Apakah Anda yakin ingin keluar dari dasbor?");
        if (konfirmasi) {
            await supabase.auth.signOut(); // Hapus sesi dari Supabase
            window.location.replace('login.html'); // Lempar kembali ke halaman login
        }
    });
}

// Jalankan fungsi proteksi tepat setelah halaman terbuka
document.addEventListener('DOMContentLoaded', cekAksesAdmin);

