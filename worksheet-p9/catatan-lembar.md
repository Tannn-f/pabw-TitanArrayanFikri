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

## Lembar C — Satu pendengar untuk semua tombol

Pendengar `click` dipasang sekali di `#filter` (`barisFilter`).
`event.target.closest("button")` mencari tombol dari elemen yang benar-benar
diklik; bila hasilnya `null` (klik di sela tombol), fungsi langsung `return`.
Nilai `tombol.dataset.kategori` dicocokkan dengan genre film:
`film.genre.split(" / ").includes(kategori)` — `"Sci-Fi / Drama"` dipecah dulu
menjadi `["Sci-Fi", "Drama"]`, jadi pencocokannya tetap huruf per huruf.

Penanda aktif: `tandaiTombolAktif(tombol)` memakai
`classList.toggle("aktif", tombol === tombolAktif)` dan sekaligus mengisi
`aria-pressed`. Aturan `.aktif` di `komponen.css` mengganti latar dan warna
tulisan; `outline` sengaja tidak dipakai supaya tidak menimpa garis fokus
keyboard dari `:focus-visible`.

### C.2 Tombol yang sedang aktif

| Keadaan | Yang harus terjadi | Hasil yang saya dapat |
| --- | --- | --- |
| Halaman baru dibuka | Semua proyek tampil, tombol "semua" bertanda aktif | 7 kartu tampil; hanya tombol Semua yang berkelas `aktif` (dan `aria-pressed="true"`) |
| Klik satu kategori | Hanya proyek kategori itu yang tampil | Sci-Fi → 2 (Interstellar, Dune: Part Two); Animasi → 2 (Spirited Away, Grave of the Fireflies); Drama → 4 (Interstellar, Laskar Pelangi, Oppenheimer, Grave of the Fireflies). Kelas `aktif` pindah ke tombol yang diklik |
| Klik kategori kosong | Wadah kosong dan pesannya muncul, bukan halaman kosong | Horor → 0 kartu dan `#pesan-kosong` muncul: "Belum ada film dengan genre itu di catatan saya." Klik Semua → pesan hilang, 7 kartu kembali |
| Klik dua kali cepat | Jumlah kartu tidak berlipat | Dua klik beruntun pada Sci-Fi → Console mencetak dua baris `Filter Sci-Fi: 2 film` (dua klik, dua render), kartu tetap 2 |

Pemeriksaan tambahan:

- Klik di bagian `#filter` yang bukan tombol → tidak ada yang berubah dan tidak
  ada galat (`closest("button")` → `null`, lalu `return`).
- Animasi → Drama → Sci-Fi bergantian: 2 → 4 → 2 kartu, Console tanpa pesan
  merah.
- Uji teks: lewat Console `daftarFilm[0].judul` diubah sementara menjadi
  `"<b>Interstellar</b>"`, lalu tombol Semua diklik → kartu menampilkan
  `<b>Interstellar</b>` apa adanya, `document.querySelectorAll("#daftar b").length`
  → 0, dan `innerHTML` judulnya `&lt;b&gt;Interstellar&lt;/b&gt;`. Muat ulang
  mengembalikan data asli.

## Lembar D — Pola render dan validasi form

`render(daftar)` sekarang memegang ketiga pekerjaannya sendiri, berurutan:
`wadah.textContent = ""` → bila `daftar.length === 0`, `kosong.hidden = false`
lalu `return` → selain itu `kosong.hidden = true` dan kartu diisi ulang. Baris
`kosong.hidden = ...` yang di lembar C masih ada di pendengar klik sudah
dipindah ke dalam `render`. Pendengar tetap dipasang di luar `render`.

Form Tambah Film (sejak P3) di `dom.js`:

- `formFilm.noValidate = true` — tanpa ini peramban memeriksa `required` lebih
  dulu. Sudah dicoba: dengan `noValidate = false`, klik Simpan pada form kosong
  hanya memicu event `invalid` di ketiga kolom, dan event `submit` tidak pernah
  sampai ke `dom.js`, jadi pesan per kolom tidak muncul.
- `cariGalat(kolom)` membaca `kolom.value.trim()` dan mengembalikan pesan yang
  menyebut cara memperbaikinya, atau `""` bila isinya layak.
- `periksaKolom(kolom)` menulis pesan itu ke `.pesan-galat` milik kolomnya
  (dicari dengan `kolom.closest(".form-kolom")`) dan memasang atau melepas
  `aria-invalid="true"`. Garis merah dan tampil-tidaknya pesan diatur CSS dari
  `aria-invalid` (menggantikan `:user-invalid` dari P3), jadi tampilan dan
  pemeriksaan berasal dari satu sumber. Setiap kolom juga punya
  `aria-describedby` ke pesannya.
- Satu pendengar `input` di form memeriksa kolom yang sedang diketik, lalu
  `tombolSimpan.disabled = !sah`.
- Pendengar `submit`: `event.preventDefault()` di baris pertama, periksa
  ketiga kolom, fokus ke kolom salah yang pertama. Bila semua layak,
  `#pesan-form` (`role="status"`) menampilkan ringkasan lewat `textContent`, lalu
  form dikosongkan.

### D.3 Periksa hasil kerja Anda

| Yang diperiksa | Hasil yang benar | Hasil yang saya dapat |
| --- | --- | --- |
| Kirim form kosong | Halaman tidak dimuat ulang; pesan galat muncul | Tidak ada navigasi (penanda yang dipasang di `window` sebelum klik masih ada). Ketiga kolom `aria-invalid="true"` dan pesannya muncul di bawah masing-masing; fokus pindah ke Judul Film; tombol Simpan nonaktif |
| Perbaiki satu kolom | Pesannya hilang begitu isinya layak | Judul diketik `Inception` → pesan judul langsung hilang; pesan tahun dan rating tetap tampil |
| Isi hanya spasi | Masih dinyatakan tidak sah | Judul berisi tiga spasi → tetap `aria-invalid="true"`, pesan "Tulis judul filmnya, misalnya Inception. Spasi saja tidak dihitung." muncul (`"   ".trim()` → `""`) |
| Tombol kirim | Menunggu sampai seluruh kolom layak | Tahun 1500 → nonaktif; tahun 2010 tetapi rating kosong → nonaktif; rating 7 → nonaktif; rating 4.5 → aktif. Enter di kolom rating → "Siap dicatat: Inception (2010), rating 4.5/5.", form kosong lagi, halaman tidak dimuat ulang |

Pemeriksaan tambahan: judul diisi `<img src=x onerror="alert(1)">` lalu
dikirim → pesan menampilkan tulisan itu apa adanya, `#pesan-form img` → 0
elemen, tidak ada alert.

## Lembar E — Membaca gejala, bukan menebaknya

Kasus 1–4 sengaja dipicu untuk latihan lembar ini (satu baris diubah, gejala
dicatat, lalu baris itu dikembalikan). Kasus 5 terjadi sungguhan saat lembar A.

### E.4 Catat kasus yang saya temui

| Gejala yang saya lihat | Sebabnya | Baris yang saya ubah |
| --- | --- | --- |
| **Pemilih `null`, halaman diam.** Daftar di "Jelajah per Genre" kosong, klik Sci-Fi dan Animasi tidak mengubah apa pun. Panel Event Listeners untuk `div#filter`: *No event listeners*. Console: `Uncaught TypeError: Cannot read properties of null (reading 'addEventListener') at dom.js:61:13`. Form juga tidak terlindungi: diisi benar lalu Simpan → halaman pindah ke `/simpan` dan server menjawab `501 Unsupported method ('POST')` | `document.querySelector(".filter")` — titik berarti kelas, padahal `filter` adalah id (kelasnya `filter-genre`), jadi hasilnya `null`. Galat dilaporkan di baris 61 (tempat `null` dipakai), sumbernya di baris 5. Skrip berhenti di baris 61, sehingga `render(daftarFilm)` di baris terakhir dan pendengar form tidak pernah dijalankan | `dom.js:5` `".filter"` → `"#filter"` |
| **Pendengar ganda.** Daftar tetap benar dan tidak ada pesan merah, tetapi baris `Filter …` di Console bertambah: klik pertama 1 baris, klik kedua 2 baris, klik ketiga 4 baris. Jumlah pendengar `click` di `#filter` (Event Listeners / `getEventListeners`): 1 → 2 → 4 → 8 | Blok `barisFilter.addEventListener(...)` dipindah ke dalam `render`. Setiap `render` memasang satu pendengar baru, dan karena fungsinya arrow function yang dibuat ulang, peramban menganggapnya pendengar yang berbeda. `render` dipanggil dari dalam pendengar itu sendiri, jadi jumlahnya berlipat dua setiap klik | Blok pendengar dikembalikan ke luar `render` (`dom.js:60–72`), dipasang sekali |
| **Isi daftar kosong.** Klik Sci-Fi → 0 kartu dan pesan "Belum ada film dengan genre itu di catatan saya.", padahal Interstellar dan Dune: Part Two bergenre Sci-Fi. Console tanpa galat; hanya log `Filter sci-fi: 0 film` | `data-kategori="sci-fi"` di `profil.html` (huruf kecil, ikut gaya `"semua"`), sedangkan di data tertulis `"Sci-Fi"`. `includes` membandingkan huruf per huruf, jadi tidak ada yang cocok. Pesan kosong membuat tampilan tetap rapi, tetapi justru menutupi salah ketiknya; yang membongkarnya log jumlah hasil di Console | `profil.html` tombol kedua: `data-kategori="Sci-Fi"` |
| **`closest` menghasilkan `null`.** Klik di bagian `#filter` yang bukan tombol (sebelah kanan tombol Horor) → `Uncaught TypeError: Cannot read properties of null (reading 'dataset') at dom.js:64:27` | Yang diklik `div#filter` itu sendiri; `closest("button")` naik ke atas dan tidak menemukan tombol, jadi `null` | `dom.js:63` `if (!tombol) return;` dikembalikan |
| **Semua pemilih baru `null`** (`#daftar`, `#filter`, `#pesan-kosong`, `#form-film`) dan `dom.js` tidak berjalan sama sekali, padahal `profil.html` sudah disimpan | Tab baru memakai `profil.html` versi lama dari cache peramban (`python -m http.server` tidak melarang cache), jadi elemen baru dan `<script src="js/dom.js">` belum ada di halaman | Tidak ada baris kode; cache dimatikan (DevTools → Network → *Disable cache*, atau Ctrl+Shift+R) lalu dimuat ulang |

### Tangkapan layar

Diambil dari Chrome dengan DevTools bawaan Chrome yang tersambung ke tab
halaman; halaman (kiri) dan DevTools (kanan) dipotret pada saat yang sama lalu
disandingkan.

1. [`tangkapan-layar/01-halaman-diam.png`](tangkapan-layar/01-halaman-diam.png)
   — kasus 1: daftar kosong, `div#filter` terpilih di Elements dan panel Event
   Listeners-nya kosong, Console menunjukkan `TypeError` di `dom.js:61`.
2. [`tangkapan-layar/02-setelah-diperbaiki.png`](tangkapan-layar/02-setelah-diperbaiki.png)
   — pemilih `#filter` benar: 7 kartu, panel Event Listeners menunjukkan satu
   `click` di `div#filter` (`dom.js:61`) walau tombol sudah diklik tiga kali;
   Console mencetak satu baris per klik.
3. [`tangkapan-layar/03-filter-bekerja.png`](tangkapan-layar/03-filter-bekerja.png)
   — filter Animasi aktif: 2 kartu, `ul#daftar` di Elements berisi tepat dua
   `<li>`, Console `Filter Animasi: 2 film`.
