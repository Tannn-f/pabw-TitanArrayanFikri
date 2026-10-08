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
