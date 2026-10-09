import { daftarFilm, ratingMaksimal } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");
const formFilm = document.querySelector("#form-film");
const inputJudul = document.querySelector("#judul-film");
const inputTahun = document.querySelector("#tahun-rilis");
const inputRating = document.querySelector("#rating-film");
const tombolSimpan = document.querySelector("#form-film button[type='submit']");

// Variabel modul tidak bisa dipanggil langsung dari Console, jadi dicetak sekali di sini.
console.log({ wadah, kosong, barisFilter, formFilm, inputJudul, inputTahun, inputRating, tombolSimpan });
console.log(`Data dari app.js: ${daftarFilm.length} film, rating maksimal ${ratingMaksimal}`);
