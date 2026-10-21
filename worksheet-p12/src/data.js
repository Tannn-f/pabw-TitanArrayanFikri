export const judulHalaman = "Catatan Film Saya";
export const ratingMaksimal = 5;

export const profil = {
  nama: "Titan Arrayan Fikri",
  nim: "25523234",
  peran: "mahasiswa yang mencatat dan menilai setiap film yang sudah ditonton",
  genreFavorit: ["Sci-Fi", "Animasi", "Drama"],
};

export const daftarFilm = [
  {
    id: 1,
    judul: "Interstellar",
    sutradara: "Christopher Nolan",
    tahun: 2014,
    genre: "Sci-Fi / Drama",
    sudahDitonton: true,
    rating: 5,
    prioritas: null,
  },
  {
    id: 2,
    judul: "Laskar Pelangi",
    sutradara: "Riri Riza",
    tahun: 2008,
    genre: "Drama / Keluarga",
    sudahDitonton: true,
    rating: 4.5,
    prioritas: null,
  },
  {
    id: 3,
    judul: "Spirited Away",
    sutradara: "Hayao Miyazaki",
    tahun: 2001,
    genre: "Animasi / Fantasi",
    sudahDitonton: true,
    rating: 5,
    prioritas: null,
  },
  {
    id: 4,
    judul: "Oppenheimer",
    sutradara: "Christopher Nolan",
    tahun: 2023,
    genre: "Biografi / Drama",
    sudahDitonton: false,
    rating: null,
    prioritas: "Tinggi",
  },
  {
    id: 5,
    judul: "Dune: Part Two",
    sutradara: "Denis Villeneuve",
    tahun: 2024,
    genre: "Sci-Fi / Petualangan",
    sudahDitonton: false,
    rating: null,
    prioritas: "Tinggi",
  },
  {
    id: 6,
    judul: "The Dark Knight",
    sutradara: "Christopher Nolan",
    tahun: 2008,
    genre: "Aksi / Kejahatan",
    sudahDitonton: false,
    rating: null,
    prioritas: "Sedang",
  },
  {
    id: 7,
    judul: "Grave of the Fireflies",
    sutradara: "Isao Takahata",
    tahun: 1988,
    genre: "Animasi / Drama",
    sudahDitonton: false,
    rating: null,
    prioritas: "Sedang",
  },
];

export const buatPerkenalan = ({ nama, peran }, jumlahFilm = 0) => {
  let kalimat = `${nama} — ${peran}.`;
  if (jumlahFilm > 0) {
    kalimat += ` Sejauh ini ${jumlahFilm} film sudah saya tonton.`;
  }
  return kalimat;
};

export const formatGenre = (daftar) => daftar.join(" · ");

export const formatRating = (rating, maks) => `${rating}/${maks}`;

const hitungRataRating = (daftar) => {
  if (daftar.length === 0) {
    return 0;
  }
  const total = daftar.reduce((jumlah, film) => jumlah + film.rating, 0);
  return total / daftar.length;
};

export const buatBarisFilm = (film, maks) => `
  <tr>
    <th scope="row">${film.judul}</th>
    <td>${film.sutradara}</td>
    <td>${film.tahun}</td>
    <td>
      <span class="rating">
        <span class="bintang" style="--persen: ${(film.rating / maks) * 100}%" aria-hidden="true">★★★★★</span>
        ${formatRating(film.rating, maks)}
      </span>
    </td>
  </tr>`;

export const buatItemTarget = (film) => `
  <li class="kartu-target" data-prioritas="${film.prioritas ?? ""}">
    <strong>${film.judul}</strong>
    <span class="meta">${film.genre}</span>
    <span class="meta">${film.sutradara} · ${film.tahun}</span>
    <span class="lencana">Prioritas: ${film.prioritas ?? "Belum ditentukan"}</span>
  </li>`;

export const buatKeteranganPoster = (film, maks) =>
  `Poster ${film.judul} (${film.tahun}) karya ${film.sutradara} — film yang saya beri nilai ${formatRating(film.rating, maks)}.`;

export const filmDitonton = daftarFilm.filter((film) => film.sudahDitonton);
export const targetTontonan = daftarFilm.filter((film) => !film.sudahDitonton);
export const filmUrutRating = [...filmDitonton].sort((a, b) => b.rating - a.rating);
export const filmPoster = daftarFilm.find((film) => film.judul === "Interstellar");
export const judulFilm = daftarFilm.map((film) => film.judul);
export const rataRating = hitungRataRating(filmDitonton);
export const filmTidakAda = daftarFilm.find((film) => film.judul === "Inception");
