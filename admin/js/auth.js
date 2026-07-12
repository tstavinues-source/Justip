// Memanggil konfigurasi Supabase dan Utils (mundur 2 folder pakai ../../)
import { supabase } from '../../assets/js/supabase-config.js';
import { showNotification } from '../../assets/js/utils.js';

// Fungsi 1: Mengecek apakah admin sudah login sebelumnya
async function cekSesiLogin() {
    // Meminta Supabase mengecek apakah ada sesi aktif di HP/Browser ini
    const { data: { session } } = await supabase.auth.getSession();
    
    // Jika sudah login, langsung lempar ke halaman dasbor (index.html milik admin)
    if (session) {
        window.location.replace('index.html');
    }
}

// Menjalankan pengecekan sesi otomatis saat halaman dibuka
document.addEventListener('DOMContentLoaded', cekSesiLogin);

// Fungsi 2: Menangani tombol "Masuk" ditekan
const formLogin = document.getElementById('login-form');

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah halaman berkedip (refresh)

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;
        const tombolMasuk = formLogin.querySelector('button');

        // Ubah teks tombol saat loading
        tombolMasuk.innerText = "Memeriksa...";
        tombolMasuk.disabled = true;

        // Mengirim data login ke Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: emailInput,
            password: passwordInput,
        });

        if (error) {
            // Jika password salah atau email tidak ada
            showNotification('Gagal: Email atau Kata Sandi salah.', 'error');
            tombolMasuk.innerText = "Masuk ke Dasbor";
            tombolMasuk.disabled = false;
        } else {
            // Jika sukses
            showNotification('Login berhasil! Mengalihkan...', 'success');
            setTimeout(() => {
                window.location.replace('index.html');
            }, 1500);
        }
    });
}
