// ===== Data halaman: ditulis sekali di sini, bukan di HTML =====
const judulHalaman = "Catatan Film Saya";
const ratingMaksimal = 5;

const profil = {
  nama: "Titan Arrayan Fikri",
  nim: "25523234",
  peran: "mahasiswa yang mencatat dan menilai setiap film yang sudah ditonton",
  genreFavorit: ["Sci-Fi", "Animasi", "Drama"],
};

const daftarFilm = [
  {
    judul: "Interstellar",
    sutradara: "Christopher Nolan",
    tahun: 2014,
    genre: "Sci-Fi / Drama",
    sudahDitonton: true,
    rating: 5,
    prioritas: null,
  },
  {
    judul: "Laskar Pelangi",
    sutradara: "Riri Riza",
    tahun: 2008,
    genre: "Drama / Keluarga",
    sudahDitonton: true,
    rating: 4.5,
    prioritas: null,
  },
  {
    judul: "Spirited Away",
    sutradara: "Hayao Miyazaki",
    tahun: 2001,
    genre: "Animasi / Fantasi",
    sudahDitonton: true,
    rating: 5,
    prioritas: null,
  },
  {
    judul: "Oppenheimer",
    sutradara: "Christopher Nolan",
    tahun: 2023,
    genre: "Biografi / Drama",
    sudahDitonton: false,
    rating: null,
    prioritas: "Tinggi",
  },
  {
    judul: "Dune: Part Two",
    sutradara: "Denis Villeneuve",
    tahun: 2024,
    genre: "Sci-Fi / Petualangan",
    sudahDitonton: false,
    rating: null,
    prioritas: "Tinggi",
  },
  {
    judul: "The Dark Knight",
    sutradara: "Christopher Nolan",
    tahun: 2008,
    genre: "Aksi / Kejahatan",
    sudahDitonton: false,
    rating: null,
    prioritas: "Sedang",
  },
  {
    judul: "Grave of the Fireflies",
    sutradara: "Isao Takahata",
    tahun: 1988,
    genre: "Animasi / Drama",
    sudahDitonton: false,
    rating: null,
    prioritas: "Sedang",
  },
];

// ===== Fungsi murni: hasilnya hanya bergantung pada argumen =====
const buatPerkenalan = ({ nama, peran }, jumlahFilm = 0) => {
  let kalimat = `${nama} — ${peran}.`;
  if (jumlahFilm > 0) {
    kalimat += ` Sejauh ini ${jumlahFilm} film sudah saya tonton.`;
  }
  return kalimat;
};

const formatGenre = (daftar) => daftar.join(" · ");

const formatRating = (rating, maks) => `${rating}/${maks}`;

const hitungRataRating = (daftar) => {
  if (daftar.length === 0) {
    return 0;
  }
  const total = daftar.reduce((jumlah, film) => jumlah + film.rating, 0);
  return total / daftar.length;
};

const buatBarisFilm = (film, maks) => `
  <tr>
    <th scope="row">${film.judul}</th>
    <td>${film.sutradara}</td>
    <td>${film.tahun}</td>
    <td>${formatRating(film.rating, maks)}</td>
  </tr>`;

const buatItemTarget = (film) => `
  <li>
    <strong>${film.judul}</strong> — Genre: ${film.genre} — Prioritas: ${film.prioritas ?? "Belum ditentukan"}
  </li>`;

const buatKeteranganPoster = (film, maks) =>
  `Poster ${film.judul} (${film.tahun}) karya ${film.sutradara} — film yang saya beri nilai ${formatRating(film.rating, maks)}.`;

// ===== Mengolah data dengan array methods =====
const filmDitonton = daftarFilm.filter((film) => film.sudahDitonton);
const targetTontonan = daftarFilm.filter((film) => !film.sudahDitonton);
const filmUrutRating = [...filmDitonton].sort((a, b) => b.rating - a.rating);
const filmPoster = daftarFilm.find((film) => film.judul === "Interstellar");
const judulFilm = daftarFilm.map((film) => film.judul);
const rataRating = hitungRataRating(filmDitonton);

// ===== Menampilkan data ke halaman =====
const elemenJudul = document.querySelector("#judul-halaman");
const elemenPerkenalan = document.querySelector("#perkenalan");
const elemenGenre = document.querySelector("#genre-favorit");
const elemenRingkasan = document.querySelector("#ringkasan-film");
const elemenKeteranganPoster = document.querySelector("#keterangan-poster");
const elemenIsiTabel = document.querySelector("#isi-tabel-film");
const elemenDaftarTarget = document.querySelector("#daftar-target");
const elemenKaki = document.querySelector("#kaki-halaman");

document.title = `${judulHalaman} — ${profil.nama}`;
elemenJudul.textContent = judulHalaman;
elemenPerkenalan.textContent = buatPerkenalan(profil, filmDitonton.length);
elemenGenre.textContent = `Genre favorit: ${formatGenre(profil.genreFavorit)}`;
elemenRingkasan.textContent = `Rata-rata rating saya ${formatRating(rataRating.toFixed(1), ratingMaksimal)}. Tabel diurutkan dari rating tertinggi.`;
elemenKeteranganPoster.textContent = buatKeteranganPoster(filmPoster, ratingMaksimal);
elemenIsiTabel.innerHTML = filmUrutRating.map((film) => buatBarisFilm(film, ratingMaksimal)).join("");
elemenDaftarTarget.innerHTML = targetTontonan.map((film) => buatItemTarget(film)).join("");
elemenKaki.textContent = `${profil.nama}, ${profil.nim}, ${new Date().getFullYear()}`;

// ===== Pemeriksaan di Console =====
console.log(buatPerkenalan(profil, filmDitonton.length));
console.log(formatGenre(profil.genreFavorit));

console.table(profil.genreFavorit);
console.table(daftarFilm);
console.table(filmDitonton);
console.table(filmUrutRating);
console.log(filmPoster);

const filmTidakAda = daftarFilm.find((film) => film.judul === "Inception");
console.log(filmTidakAda);
console.log(filmTidakAda?.sutradara ?? "Inception belum ada di daftar");

console.log(judulFilm.length === daftarFilm.length);
console.log(judulFilm);
