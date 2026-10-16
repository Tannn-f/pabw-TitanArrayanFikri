import { daftarFilm } from "./data.js";
import { render, tandaiTombolAktif, renderFilmApi } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;
const KATEGORI_BAWAAN = "semua";

export function simpan(state) {
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try { return JSON.parse(localStorage.getItem(KUNCI)); }
  catch { return null; }
}

const tersimpan = muat();

export const state = {
  daftarFilm,
  kategoriAktif: tersimpan === null ? KATEGORI_BAWAAN : tersimpan.kategoriAktif,
  filmApi: null,
  galatApi: "",
};

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
  tandaiTombolAktif(state);
  render(state);
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = KATEGORI_BAWAAN;
  tandaiTombolAktif(state);
  render(state);
}

export function simpanFilmApi(data) {
  state.filmApi = data;
  renderFilmApi(state);
}

export function catatGalatApi(pesan) {
  state.galatApi = pesan;
  renderFilmApi(state);
}
