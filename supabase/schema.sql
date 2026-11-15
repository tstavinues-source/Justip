-- ============================================================
-- Justip — skema database untuk proyek Supabase BARU
-- Cara pakai: buka proyek Supabase → SQL Editor → tempel seluruh
-- berkas ini → Run. Aman dijalankan ulang (idempotent sebisanya).
-- Skema ini meniru persis struktur lama Justip agar aplikasi
-- (lama maupun React baru) membaca data dengan cara yang sama.
-- ============================================================

-- ---------- Tabel produk ----------
create table if not exists public.produk (
  id           bigint generated always as identity primary key,
  nama_produk  text not null,
  harga        numeric not null default 0,
  label_produk text,
  deskripsi    text,
  tipe_produk  text not null default 'Justip'
               check (tipe_produk in ('Justip', 'Affiliate')),
  created_at   timestamptz not null default now()
);

-- ---------- Tabel gambar produk (satu produk, banyak gambar) ----------
create table if not exists public.produk_gambar (
  id         bigint generated always as identity primary key,
  produk_id  bigint not null references public.produk (id) on delete cascade,
  url_gambar text not null,
  urutan     int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- Tabel tautan affiliate (satu produk, banyak marketplace) ----------
create table if not exists public.produk_link_affiliate (
  id        bigint generated always as identity primary key,
  produk_id bigint not null references public.produk (id) on delete cascade,
  platform  text not null,
  url_link  text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_produk_gambar_produk on public.produk_gambar (produk_id);
create index if not exists idx_produk_link_produk on public.produk_link_affiliate (produk_id);

-- ============================================================
-- Keamanan (RLS): publik hanya MEMBACA; menulis wajib login admin.
-- ============================================================
alter table public.produk enable row level security;
alter table public.produk_gambar enable row level security;
alter table public.produk_link_affiliate enable row level security;

drop policy if exists "publik baca produk" on public.produk;
create policy "publik baca produk" on public.produk
  for select to anon, authenticated using (true);

drop policy if exists "admin kelola produk" on public.produk;
create policy "admin kelola produk" on public.produk
  for all to authenticated using (true) with check (true);

drop policy if exists "publik baca gambar" on public.produk_gambar;
create policy "publik baca gambar" on public.produk_gambar
  for select to anon, authenticated using (true);

drop policy if exists "admin kelola gambar" on public.produk_gambar;
create policy "admin kelola gambar" on public.produk_gambar
  for all to authenticated using (true) with check (true);

drop policy if exists "publik baca link" on public.produk_link_affiliate;
create policy "publik baca link" on public.produk_link_affiliate
  for select to anon, authenticated using (true);

drop policy if exists "admin kelola link" on public.produk_link_affiliate;
create policy "admin kelola link" on public.produk_link_affiliate
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Storage: bucket publik "produk" untuk foto produk.
-- Baca: publik. Unggah/ubah/hapus: hanya login admin.
-- ============================================================
insert into storage.buckets (id, name, public)
values ('produk', 'produk', true)
on conflict (id) do nothing;

drop policy if exists "publik baca foto produk" on storage.objects;
create policy "publik baca foto produk" on storage.objects
  for select to anon, authenticated using (bucket_id = 'produk');

drop policy if exists "admin kelola foto produk" on storage.objects;
create policy "admin kelola foto produk" on storage.objects
  for all to authenticated
  using (bucket_id = 'produk') with check (bucket_id = 'produk');

-- ============================================================
-- Sesudah skema ini jalan:
-- 1. Authentication → Users → Add user: buat akun admin
--    (email + kata sandi) untuk masuk dasbor Justip.
-- 2. Settings → API: salin Project URL + anon public key ke
--    berkas .env aplikasi (lihat .env.example), lalu build ulang.
-- 3. Tambahkan produk pertama lewat Table Editor (produk →
--    produk_gambar → produk_link_affiliate) untuk menguji katalog.
-- ============================================================
