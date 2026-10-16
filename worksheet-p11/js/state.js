import { daftarFilm } from "./data.js";
import { render, tandaiTombolAktif, renderFilmApi } from "./dom.js";

export const state = {
  daftarFilm,
  kategoriAktif: "semua",
  filmApi: null,
  galatApi: "",
};

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
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
