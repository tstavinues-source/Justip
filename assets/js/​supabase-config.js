// Mengambil pustaka Supabase langsung dari internet (CDN)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// URL Utama proyek Supabase kamu (sudah disesuaikan)
const supabaseUrl = 'https://bktvzijjopgykgrnoggu.supabase.co';

// Kunci ANON (Publik) yang aman untuk ditaruh di sisi pengunjung
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdHZ6aWpqb3BneWtncm5vZ2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4MjE1MDAsImV4cCI6MjA5OTM5NzUwMH0.0wlD-p3Zl24DlTnhG9UxBXWzzOympYsUOSXxmO7614M';

// Mengaktifkan koneksi ke database Justip
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Koneksi Supabase berhasil disiapkan!");
