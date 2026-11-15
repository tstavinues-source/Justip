// Font disimpan di repo sebagai .b64 (teks) karena alur push berkas
// hanya menangani teks UTF-8. Skrip ini mengembalikannya menjadi
// .woff2 di public/fonts/ sebelum dev/build (predev & prebuild).
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const akar = join(dirname(fileURLToPath(import.meta.url)), '..');
const sumber = join(akar, 'assets-b64', 'fonts');
const tujuan = join(akar, 'public', 'fonts');
mkdirSync(tujuan, { recursive: true });
for (const berkas of readdirSync(sumber)) {
  if (!berkas.endsWith('.b64')) continue;
  const nama = berkas.replace(/\.b64$/, '');
  writeFileSync(join(tujuan, nama), Buffer.from(readFileSync(join(sumber, berkas), 'utf8'), 'base64'));
  console.log('font dipulihkan:', nama);
}
