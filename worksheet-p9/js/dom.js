import { daftarFilm, ratingMaksimal } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");
const formFilm = document.querySelector("#form-film");
const inputJudul = document.querySelector("#judul-film");
const inputTahun = document.querySelector("#tahun-rilis");
const inputRating = document.querySelector("#rating-film");
const tombolSimpan = document.querySelector("#form-film button[type='submit']");

// Satu film menjadi satu kartu. Isinya masuk lewat textContent, jadi selalu dibaca sebagai teks.
function buatKartu(film) {
  const li = document.createElement("li");
  li.className = "kartu kartu-film";
  if (!film.sudahDitonton) {
    li.dataset.prioritas = film.prioritas ?? "";
  }

  const judul = document.createElement("h3");
  judul.textContent = film.judul;

  const info = document.createElement("p");
  info.className = "meta";
  info.textContent = `${film.sutradara} · ${film.tahun}`;

  const genre = document.createElement("p");
  genre.className = "meta";
  genre.textContent = film.genre;

  const lencana = document.createElement("span");
  lencana.className = "lencana";
  lencana.textContent = film.sudahDitonton
    ? `Rating ${film.rating}/${ratingMaksimal}`
    : `Target · Prioritas ${film.prioritas ?? "belum ditentukan"}`;

  li.append(judul, info, genre, lencana);
  return li;
}

function render(daftar) {
  wadah.textContent = ""; // kosongkan dulu, supaya kartu lama tidak bertumpuk
  wadah.append(...daftar.map((film) => buatKartu(film)));
}

function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
    tombol.setAttribute("aria-pressed", tombol === tombolAktif);
  });
}

// Satu pendengar di induk melayani kelima tombol filter.
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return; // klik di sela tombol, abaikan
  const kategori = tombol.dataset.kategori;
  // genre ditulis "Sci-Fi / Drama", jadi dipecah dulu lalu dicocokkan per genre
  const terpilih = daftarFilm.filter(
    (film) => kategori === "semua" || film.genre.split(" / ").includes(kategori)
  );
  tandaiTombolAktif(tombol);
  render(terpilih);
  kosong.hidden = terpilih.length > 0;
  console.log(`Filter ${kategori}: ${terpilih.length} film`);
});

render(daftarFilm);
