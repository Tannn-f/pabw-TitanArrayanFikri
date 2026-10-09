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

// Satu-satunya tempat yang menggambar daftar film.
function render(daftar) {
  wadah.textContent = ""; // 1. kosongkan lebih dulu
  if (daftar.length === 0) { // 2. periksa keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;
  wadah.append(...daftar.map((film) => buatKartu(film))); // 3. isi ulang
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
  console.log(`Filter ${kategori}: ${terpilih.length} film`);
});

// Mengembalikan pesan galat satu kolom, atau "" bila isinya sudah layak.
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

// Menulis pesan di bawah kolomnya dan menandai kolom itu; hasilnya true bila kolom sah.
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
formFilm.noValidate = true; // pesan per kolom di bawah menggantikan gelembung bawaan peramban

// Validasi berjalan saat mengetik; satu pendengar di form melayani ketiga kolom.
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
