import {
  judulHalaman,
  ratingMaksimal,
  profil,
  buatPerkenalan,
  formatGenre,
  formatRating,
  buatBarisFilm,
  buatItemTarget,
  buatKeteranganPoster,
  filmDitonton,
  targetTontonan,
  filmUrutRating,
  filmPoster,
  rataRating,
} from "./data.js";

const elemenJudul = document.querySelector("#judul-halaman");
const elemenPerkenalan = document.querySelector("#perkenalan");
const elemenGenre = document.querySelector("#genre-favorit");
const elemenRingkasan = document.querySelector("#ringkasan-film");
const elemenKeteranganPoster = document.querySelector("#keterangan-poster");
const elemenIsiTabel = document.querySelector("#isi-tabel-film");
const elemenDaftarTarget = document.querySelector("#daftar-target");
const elemenKaki = document.querySelector("#kaki-halaman");

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
export const barisFilter = document.querySelector("#filter");
export const formFilm = document.querySelector("#form-film");
const inputJudul = document.querySelector("#judul-film");
const inputTahun = document.querySelector("#tahun-rilis");
const inputRating = document.querySelector("#rating-film");
const tombolSimpan = document.querySelector("#form-film button[type='submit']");
const pesanForm = document.querySelector("#pesan-form");

const elemenStatusApi = document.querySelector("#status-api");
const elemenDaftarApi = document.querySelector("#daftar-api");


export function isiHalaman() {
  document.title = `${judulHalaman} — ${profil.nama}`;
  elemenJudul.textContent = judulHalaman;
  elemenPerkenalan.textContent = buatPerkenalan(profil, filmDitonton.length);
  elemenGenre.textContent = `Genre favorit: ${formatGenre(profil.genreFavorit)}`;
  elemenRingkasan.textContent = `Rata-rata rating saya ${formatRating(rataRating.toFixed(1), ratingMaksimal)}. Tabel diurutkan dari rating tertinggi.`;
  elemenKeteranganPoster.textContent = buatKeteranganPoster(filmPoster, ratingMaksimal);
  elemenIsiTabel.innerHTML = filmUrutRating.map((film) => buatBarisFilm(film, ratingMaksimal)).join("");
  elemenDaftarTarget.innerHTML = targetTontonan.map((film) => buatItemTarget(film)).join("");
  elemenKaki.textContent = `${profil.nama}, ${profil.nim}, ${new Date().getFullYear()}`;
}


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


export function render(daftar) {
  wadah.textContent = "";
  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  wadah.append(...daftar.map((film) => buatKartu(film)));
}

export function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
    tombol.setAttribute("aria-pressed", tombol === tombolAktif);
  });
}


function buatKartuApi(film) {
  const li = document.createElement("li");
  li.className = "kartu kartu-film";

  const judul = document.createElement("h3");
  judul.textContent = film.title;

  const info = document.createElement("p");
  info.className = "meta";
  info.textContent = `${film.director} · ${film.release_date}`;

  li.append(judul, info);
  return li;
}

export function renderFilmApi(state) {
  elemenDaftarApi.textContent = "";
  elemenStatusApi.hidden = false;
  if (state.galatApi !== "") {
    elemenStatusApi.textContent = `Daftar film gagal dimuat (${state.galatApi}). Periksa koneksi lalu muat ulang halaman.`;
    return;
  }
  if (state.filmApi === null) {
    elemenStatusApi.textContent = "Memuat daftar film…";
    return;
  }
  if (!Array.isArray(state.filmApi) || state.filmApi.length === 0) {
    elemenStatusApi.textContent = "API membalas, tetapi belum ada film untuk ditampilkan.";
    return;
  }
  elemenStatusApi.hidden = true;
  elemenDaftarApi.append(...state.filmApi.map((film) => buatKartuApi(film)));
}


function cariGalat(kolom) {
  const isi = kolom.value.trim();
  if (kolom === inputJudul && isi === "") {
    return "Tulis judul filmnya, misalnya Inception. Spasi saja tidak dihitung.";
  }
  if (kolom === inputTahun) {
    const tahun = Number(isi);
    if (isi === "" || !Number.isInteger(tahun) || tahun < 1888 || tahun > 2026) {
      return "Isi tahun rilis dengan angka bulat 1888 sampai 2026, misalnya 2010.";
    }
  }
  if (kolom === inputRating) {
    const rating = Number(isi);
    if (isi === "" || !(rating >= 1 && rating <= ratingMaksimal)) {
      return `Isi rating dengan angka 1 sampai ${ratingMaksimal}, misalnya 4.5.`;
    }
  }
  return "";
}


function periksaKolom(kolom) {
  const pesan = cariGalat(kolom);
  kolom.closest(".form-kolom").querySelector(".pesan-galat").textContent = pesan;
  if (pesan === "") {
    kolom.removeAttribute("aria-invalid");
  } else {
    kolom.setAttribute("aria-invalid", "true");
  }
  return pesan === "";
}

const daftarKolom = [inputJudul, inputTahun, inputRating];
formFilm.noValidate = true;

export function perbaruiForm(kolom) {
  periksaKolom(kolom);
  const sah = daftarKolom.every((kolom) => cariGalat(kolom) === "");
  tombolSimpan.disabled = !sah;
  pesanForm.textContent = "";
}

export function kirimForm() {
  const kolomSalah = daftarKolom.filter((kolom) => !periksaKolom(kolom));
  if (kolomSalah.length > 0) {
    tombolSimpan.disabled = true;
    kolomSalah[0].focus();
    return;
  }
  pesanForm.textContent = `Siap dicatat: ${inputJudul.value.trim()} (${inputTahun.value}), rating ${inputRating.value}/${ratingMaksimal}.`;
  formFilm.reset();
}
