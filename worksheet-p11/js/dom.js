import { daftarFilm, ratingMaksimal } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");
const formFilm = document.querySelector("#form-film");
const inputJudul = document.querySelector("#judul-film");
const inputTahun = document.querySelector("#tahun-rilis");
const inputRating = document.querySelector("#rating-film");
const tombolSimpan = document.querySelector("#form-film button[type='submit']");
const pesanForm = document.querySelector("#pesan-form");


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
  wadah.textContent = ""; 
  if (daftar.length === 0) { 
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  wadah.append(...daftar.map((film) => buatKartu(film))); 
}

function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
    tombol.setAttribute("aria-pressed", tombol === tombolAktif);
  });
}


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
  console.log(`Filter ${kategori}: ${terpilih.length} film`);
});


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

formFilm.addEventListener("input", (event) => {
  periksaKolom(event.target);
  const sah = daftarKolom.every((kolom) => cariGalat(kolom) === "");
  tombolSimpan.disabled = !sah;
  pesanForm.textContent = "";
});

formFilm.addEventListener("submit", (event) => {
  event.preventDefault(); // halaman tidak dimuat ulang
  const kolomSalah = daftarKolom.filter((kolom) => !periksaKolom(kolom));
  if (kolomSalah.length > 0) {
    tombolSimpan.disabled = true;
    kolomSalah[0].focus();
    return;
  }
  pesanForm.textContent = `Siap dicatat: ${inputJudul.value.trim()} (${inputTahun.value}), rating ${inputRating.value}/${ratingMaksimal}.`;
  formFilm.reset();
});

render(daftarFilm);
