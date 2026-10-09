# Catatan Lembar Kerja P9 — DOM, Event, dan Interaktivitas

Isi tabel di bawah dicatat dari halaman yang dijalankan lewat server lokal
(`python -m http.server` di folder `worksheet-p9/`, lalu buka
`http://127.0.0.1:8000/profil.html`) dan diperiksa di Chrome DevTools.
Bagian yang harus dijawab sendiri (tiket keluar, F.2, nilai F.3, F.4, tanda
tangan) sengaja tidak diisi di sini.

Topik halaman saya daftar film, jadi:

- "daftar proyek" di worksheet = `daftarFilm` di `js/app.js` (7 film);
- "kategori" = genre film. Di data, genre ditulis `"Sci-Fi / Drama"`, jadi
  satu film bisa masuk dua genre. Nilai `data-kategori` pada tombol harus sama
  huruf per huruf dengan salah satu genre itu (`Sci-Fi`, bukan `sci-fi`).

## Lembar A — Memilih elemen di halaman

### A.3 Daftar elemen yang akan saya isi

| Bagian halaman | Pemilih yang saya pakai | Diisi apa | Nama variabel |
| --- | --- | --- | --- |
| Daftar proyek (film per genre) | `#daftar` | satu kartu `<li>` untuk setiap film di `daftarFilm` | `wadah` |
| Baris tombol filter | `#filter` | satu pendengar `click` untuk kelima tombol; kelas `aktif` pada tombol terpilih | `barisFilter` |
| Pesan daftar kosong | `#pesan-kosong` | atribut `hidden` dilepas bila hasil saringan kosong | `kosong` |
| Form dan tiap kolomnya | `#form-film`, `#judul-film`, `#tahun-rilis`, `#rating-film`, `#form-film button[type='submit']` | pendengar `submit` dan `input`, pesan galat per kolom, `aria-invalid`, `disabled` | `formFilm`, `inputJudul`, `inputTahun`, `inputRating`, `tombolSimpan` |

Hasil uji pemilih di Console sebelum ditulis di `dom.js`:

```text
document.querySelector("#daftar")                 → <ul id="daftar" class="daftar-koleksi">
document.querySelector("#filter")                 → <div id="filter" class="filter-genre">
document.querySelector("#pesan-kosong")           → <p id="pesan-kosong" class="pesan-kosong" hidden>
document.querySelector("#form-film")              → <form id="form-film" class="kartu form-film">
document.querySelector("#judul-film")             → <input id="judul-film">   (#tahun-rilis, #rating-film juga ketemu)
document.querySelector("#form-film button[type='submit']") → <button type="submit">Simpan</button>
document.querySelectorAll("#filter button")       → NodeList(5)
typeof document.querySelectorAll("#filter button").map → "undefined"   (NodeList bukan array)
Array.from(document.querySelectorAll("#filter button")).map((t) => t.textContent)
                                                  → ["Semua", "Sci-Fi", "Animasi", "Drama", "Horor"]
```

### A.4 Sudah dikerjakan

| Sudah dikerjakan | Tanda |
| --- | --- |
| Folder `worksheet-p9/` berisi `profil.html`, seluruh CSS, dan `js/app.js` dari Pertemuan 8 | ✓ (commit pertama P9 berisi salinan apa adanya) |
| `profil.html` punya `ul#daftar`, `div#filter` bertombol `data-kategori`, dan `p#pesan-kosong` ber-`hidden` | ✓ bagian baru "Jelajah per Genre" |
| `js/dom.js` dibuat dan disambungkan sebelum `</body>` | ✓ dua `<script type="module">`: `app.js` lalu `dom.js` |
| Seluruh pemilih di tabel A.3 diuji di Console dan tidak ada yang `null` | ✓ (lihat hasil di atas) |
| Halaman dibuka lewat server lokal; Console tidak menampilkan 404 | ✓ |
| Panel Elements dipakai untuk memastikan nama id dan kelasnya | ✓ |

`app.js` hanya berubah di dua tempat: `export` pada `ratingMaksimal` dan
`daftarFilm`. Variabel modul tidak bisa dipanggil langsung dari Console, jadi
untuk "panggil setiap variabel elemen" `dom.js` sementara mencetaknya sekali:
`console.log({ wadah, kosong, barisFilter, ... })` — tidak ada yang `null`, dan
baris kedua mencetak `Data dari app.js: 7 film, rating maksimal 5`.

## Lembar B — Menyusun elemen dari data

`buatKartu(film)` membuat satu `<li class="kartu kartu-film">` berisi `<h3>`
judul, dua `<p class="meta">` (sutradara · tahun, lalu genre), dan
`<span class="lencana">` (rating bila sudah ditonton, prioritas bila masih
target). Semua isinya memakai `textContent`. `render(daftar)` mengosongkan
wadah di baris pertama (`wadah.textContent = ""`), lalu
`wadah.append(...daftar.map((film) => buatKartu(film)))`: `map` mengubah tujuh
object menjadi tujuh `<li>`, dan `append` memasukkan semuanya dalam satu
panggilan.

Karena `daftarFilm` hidup di dalam modul, di Console saya mengambilnya lewat
`(await import("./js/app.js")).daftarFilm` — modul yang sama dengan yang dipakai
halaman, bukan salinan.

### B.3 Bandingkan hasil kerja Anda

| Yang diperiksa | Hasil yang benar | Hasil yang saya dapat |
| --- | --- | --- |
| Jumlah kartu di halaman | Sama dengan panjang `daftarProyek` | `document.querySelectorAll("#daftar > li").length` → 7, `daftarFilm.length` → 7 |
| Satu kartu paling atas | Judulnya sama dengan data pertama | `Interstellar` = `daftarFilm[0].judul`; urutan ketujuh kartu sama dengan urutan data |
| Teks di dalam kartu | Tampil sebagai teks, bukan tag yang terurai | `<h3>` hanya berisi satu simpul teks (`#text`); tidak ada `<b>`, `<i>`, `<script>`, atau `<img>` yang terbentuk dari isi data. Kartu pertama: `<li class="kartu kartu-film"><h3>Interstellar</h3><p class="meta">Christopher Nolan · 2014</p><p class="meta">Sci-Fi / Drama</p><span class="lencana">Rating 5/5</span></li>` |

Cara memastikan: halaman dimuat ulang dua kali tanpa menyentuh Console →
tetap 7 kartu, dan Console tidak menampilkan pesan merah.
