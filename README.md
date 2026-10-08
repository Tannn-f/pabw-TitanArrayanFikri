# PABW - Titan Arrayan Fikri - 25523234

Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.

## Pertemuan ke-3 - Halaman Profil Saya 

Topik halaman saya: Daftar film yang pernah saya tonton 

- Judul halaman: Daftar Catatan Film
- Deskripsi: daftar film yang pernah saya tonton beserta ratingnya
- Tautan navigasi: Daftar film, Tambah film, Target tontonan
- Dua bagian utama: Daftar Film, Tambah Film
- Kolom tabel: Judul Film, Sutradara, Tahun Rilis, Rating Saya
- Kolom form: Judul Film, Tahun Rilis, Rating Saya
- Gambar: poster-film.webp

# Catatan Penggunaan AI
Saya menggunakan AI pada bagian pembuatan form dan tabel data, sisanya saya tidak menggunakan AI

## Pertemuan ke-4 - Design token halaman profil
- Berkas gaya yang akan dibuat: tokens.css, base.css,
  layout.css, komponen.css, tema.css - Warna utama: #1D3A8C (biru), dipilih karena ...

### Token yang saya tetapkan
--color-bg: #F8FAFC (Latar Halaman)

--color-fg: #0F172A (Teks Utama - Kontras ke #F8FAFC adalah ~15.8:1, Lolos AA & AAA)

--color-surface: #FFFFFF (Latar Kartu & Panel)

--color-border: #D1D5DB (Garis Pemisah/Tepi)

--color-primary: #1D3A8C (Warna Utama/Tombol - Kontras teks putih di atasnya ~10.5:1, Lolos AA)

--color-danger: #B00020 (Peringatan/Tidak Valid)

--color-focus: #2563EB (Garis Fokus Papan Ketik)

--space-1 : 0.25rem ( jarak paling rapat di dalam komponen)

--space-2 : 0.5rem (jarak antar label dan isian)

--space-3 : 0.75rem (jarak didalm kartu)

--space-4 : 1rem (jarak standar antar elemen)

--space-6 : 1.5rem (jarak antar bagian halaman)

--radius-md : 0.5rem (sudut membulat pada tombol,kartu, isian)

--radius-full : 999px (bentuk pil, misalnya lencana)

--shadow-1 : 0 1px 3px rgba(0,0,0,.10) (bayangan halus kartu)

--text-sm : 0.875rem (keterangan dan teks bantu)

--text-md : 1rem (teks isi)

--text-xl : 1.5rem (judul bagian)

--text-3xl : 2.25rem (judul halaman)

## Pertemuan ke-4 - Flexbox dan Grid
## A.1 Kerangka Halaman
| Bagian Halaman | Peran | Nilai yang Saya Pakai |
| :--- | :--- | :--- |
| **Baris Pertama** | Kepala halaman: logo, judul, menu | `auto` · tinggi mengikuti isi |
| **Baris Kedua** | Isi: sidebar dan konten | `1fr` · mengisi sisa tinggi |
| **Baris Ketiga** | Kaki halaman | `auto` · tinggi mengikuti isi |
| **Kolom Isi** | Sidebar tetap, konten lentur | `16rem 1fr` · sidebar tetap |

## A.2 Sumbu dan Arah
| Komponen | Arah | Sumbu Utama | Sumbu Silang |
| :--- | :--- | :--- | :--- |
| **Navbar** | baris | horizontal | vertikal |
| **Baris tombol pada kartu** | baris | horizontal | vertikal |
| **Daftar menu samping** | kolom | vertikal | horizontal |

## A.3 Kapan Flex, Kapan Grid
| Bagian | Pilihan Saya | Alasan Satu Baris |
| :--- | :--- | :--- |
| **Kepala halaman** | `flex` | Menyusun elemen logo dan menu navigasi secara 1 dimensi dalam satu baris horizontal. |
| **Isi dua kolom** | `grid` | Membagi struktur 2 dimensi antara kolom sidebar (ukuran tetap) dan konten utama (lentur). |
| **Galeri kartu** | `grid` | Menghasilkan tata letak multi-kolom yang responsif secara otomatis tanpa bantuan media query. |
| **Isi di dalam satu kartu** | `flex` | Memosisikan komponen internal kartu (teks, tombol, ikon) secara linear 1D dengan alur fleksibel. |

## Pertemuan ke-8 - JavaScript Modern ES6+, Struktur Data, dan Array Methods

Folder: `worksheet-p8/` — halaman Catatan Film dari Pertemuan 6 yang isinya
sekarang disusun dari data JavaScript di `js/app.js`.

Cara membuka (harus lewat server lokal, bukan klik dua kali):

```bash
cd worksheet-p8
python -m http.server 8000
```

lalu buka `http://localhost:8000/profil.html` (atau klik kanan `profil.html` →
Open with Live Server).

Karena skrip memakai `type="module"`, variabel di `app.js` tidak bisa dipanggil
langsung dari Console (hasilnya `ReferenceError: profil is not defined`). Untuk
memeriksanya: DevTools → Sources → `app.js`, pasang breakpoint di baris terakhir,
muat ulang, lalu ketik nama variabelnya di Console.

### B.4 Data profil saya

| Data | Nama variabel yang saya pakai | Isi |
| :--- | :--- | :--- |
| Nama lengkap | `profil.nama` | `"Titan Arrayan Fikri"` |
| Kalimat peran | `profil.peran` | `"mahasiswa yang mencatat dan menilai setiap film yang sudah ditonton"` |
| Daftar keahlian (minimal tiga) — di halaman saya berupa genre favorit | `profil.genreFavorit` | `["Sci-Fi", "Animasi", "Drama"]` |
| Satu nilai angka yang dipakai nanti | `ratingMaksimal` | `5` (angka, bukan `"5"`) — dipakai `formatRating` untuk menulis `4.5/5` |
| Judul halaman (dipakai di dua tempat) | `judulHalaman` | `"Catatan Film Saya"` — mengisi `<title>` dan `<h1>` |
| Daftar proyek — di halaman saya berupa daftar film | `daftarFilm` | array berisi 7 object `{ judul, sutradara, tahun, genre, sudahDitonton, rating, prioritas }` |

Dua fungsi murni wajib: `buatPerkenalan({ nama, peran }, jumlahFilm = 0)` dan
`formatGenre(daftar)`. Fungsi murni tambahan: `formatRating`, `hitungRataRating`
(memakai `reduce`), `buatBarisFilm`, `buatItemTarget`, `buatKeteranganPoster`.
`let` dipakai di `buatPerkenalan` karena kalimatnya ditambah bila `jumlahFilm > 0`.

### D.4 Pemeriksaan data saya

| Yang diperiksa | Hasil yang benar | Hasil saya |
| :--- | :--- | :--- |
| `console.table` | Seluruh isi tampil sebagai tabel, jumlah barisnya sama dengan isi array | `console.table(daftarFilm)` tampil 7 baris (indeks 0–6), sama dengan 7 object di `app.js`; `console.table(profil.genreFavorit)` tampil 3 baris |
| `filter` pada satu label | Hanya isi yang cocok yang tersisa, dan jumlahnya masuk akal | `filter` pada `sudahDitonton` → 3 film (Interstellar, Laskar Pelangi, Spirited Away); kebalikannya → 4 target tontonan; 3 + 4 = 7 |
| `find` satu isi | Yang muncul satu object; kalau tidak ada, hasilnya `undefined` | `find` judul `"Interstellar"` → satu object (dipakai untuk keterangan poster); `find` judul `"Inception"` → `undefined`, dan `filmTidakAda?.sutradara` tidak melempar galat |
| `map` pada `daftarFilm` | Panjang array hasil sama dengan array asal | `judulFilm.length === daftarFilm.length` → `true` (7 dan 7) |
| Data asli setelah `sort` | Urutan `daftarFilm` tidak berubah karena memakai salinan | `[...filmDitonton].sort(...)` → Interstellar, Spirited Away, Laskar Pelangi; `judulFilm` yang dibuat sesudah sort masih berurutan asli (Interstellar, Laskar Pelangi, Spirited Away, …) |

### E.5 Galat yang saya temui

| Pesan galat (apa adanya) | Baris | Sebabnya | Yang saya ubah |
| :--- | :--- | :--- | :--- |
| Tidak ada pesan merah, tetapi kolom Sutradara di tabel berisi `undefined` | `app.js:102` | Label salah tulis: `film.sutradra`, padahal di data labelnya `sutradara`. Properti yang tidak ada bernilai `undefined`, bukan galat | Samakan label huruf per huruf dengan data: `film.sutradara` |
| `Uncaught TypeError: Cannot set properties of null (setting 'innerHTML') at app.js:139:26` | `app.js:139` (sumbernya baris 129) | `querySelector("#isi-tabel-flim")` tidak menemukan elemen karena id di HTML `isi-tabel-film`, jadi hasilnya `null`. Skrip berhenti di baris 139, sehingga daftar target dan footer ikut kosong | Samakan selektor dengan id di HTML: `#isi-tabel-film` |
| `inputRating.value + 1` menghasilkan `"4.51"`, bukan `5.5` (kolom Rating Saya diisi 4.5) | Console | Nilai dari kolom isian selalu teks (`typeof` → `"string"`), jadi `+` menyambung teks, bukan menjumlahkan | Ubah dulu menjadi angka: `Number(inputRating.value) + 1` → `5.5` |
| `GET http://127.0.0.1:8000/favicon.ico 404 (File not found)` | `favicon.ico:1` (bukan dari `app.js`) | Halaman tidak menyebut ikon, jadi peramban otomatis meminta `/favicon.ico` yang tidak ada | Tambah `<link rel="icon" href="data:," />` di `<head>` (ikon kosong, tidak ada permintaan ke server) |

Tangkapan layar Console (Chrome):

1. [Saat galat muncul](worksheet-p8/tangkapan-layar/01-galat-muncul.png) — tabel dan daftar target kosong karena skrip berhenti di baris 139.
2. [Setelah diperbaiki](worksheet-p8/tangkapan-layar/02-setelah-diperbaiki.png) — tidak ada pesan merah, halaman terisi dari data.
3. [Data tampil sebagai tabel](worksheet-p8/tangkapan-layar/03-data-sebagai-tabel.png) — hasil `console.table` untuk genre favorit, `daftarFilm`, hasil `filter`, dan salinan yang diurutkan.

Catatan: Chrome masih menampilkan **1 issue** berwarna biru (bukan galat):
gambar poster memakai `loading="lazy"` padahal tampil di layar awal. Itu saran
kinerja dari HTML Pertemuan 3, bukan kesalahan JavaScript.

### F.1 Periksa satu per satu

- [x] **Berkas** — `profil.html` dan folder `js/` ada di repositori, terbuka tanpa galat di Console
- [x] **Skrip** — `<script type="module" src="js/app.js"></script>` ada satu kali, tepat sebelum `</body>`
- [x] **Data** — identitas (`profil`), genre favorit (`profil.genreFavorit`), dan daftar film (`daftarFilm`) tersimpan sebagai `const` di `app.js`, tidak ditulis di HTML
- [x] **Fungsi** — `buatPerkenalan` dan `formatGenre` murni, masing-masing satu pekerjaan, memakai `return`
- [x] **Array methods** — `filter`, `map`, `find` (dan `reduce`) dipakai pada data yang benar; `sort` hanya pada salinan `[...filmDitonton]`
- [x] **Console** — tidak ada pesan merah; tiga tangkapan layar ada di `worksheet-p8/tangkapan-layar/`
- [x] **Deklarasi AI** — lihat bagian di bawah
- [x] **Git** — satu commit per lembar (A–F) dengan pesan yang menjelaskan isinya

### Catatan Penggunaan AI (Pertemuan 8)

Dibantu AI (Claude Code):

- Kode `js/app.js` (data, fungsi murni, array methods, bagian yang mengisi halaman) dan perubahan
  `profil.html` (id pada elemen, baris `<script>`, ikon kosong) ditulis dengan bantuan AI, mengikuti
  perintah worksheet lembar A–F.
- Pemicuan tiga kasus galat E.4, pencatatan pesannya di tabel E.5, tangkapan layar Console, serta
  isi tabel B.4 dan D.4 di README ini juga dibantu AI.

Dikerjakan sendiri:

- Topik halaman dan isi datanya (daftar film, rating, dan target tontonan) berasal dari halaman saya
  sendiri di Pertemuan 3–6.
