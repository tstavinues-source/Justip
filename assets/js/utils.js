// ==========================================
// KUMPULAN FUNGSI ALAT BANTU (UTILITIES)
// ==========================================

/**
 * 1. FUNGSI FORMAT RUPIAH
 * Mengubah angka (contoh: 150000) menjadi format Rupiah (Rp 150.000)
 */
export function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

/**
 * 2. FUNGSI NOTIFIKASI POP-UP (TOAST)
 * Memunculkan pesan kecil di pojok layar tanpa mengganggu tampilan
 */
export function showNotification(pesan, tipe = 'success') {
    // Membuat kotak div baru untuk notifikasi
    const toast = document.createElement('div');
    
    // Mengatur warna: Merah Ruby jika error, Biru Navy jika sukses
    const backgroundColor = tipe === 'error' ? 'var(--accent-crimson, #9B1B30)' : 'var(--primary-navy, #1A2B4C)';
    
    // Memberikan gaya/desain langsung dari JavaScript
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = backgroundColor;
    toast.style.color = '#F9F9F6'; // Warna teks off-white
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '4px';
    toast.style.fontFamily = "'Inter', sans-serif";
    toast.style.fontSize = '14px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px

