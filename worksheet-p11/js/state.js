import { daftarFilm } from "./data.js";

export const state = {
  daftarFilm,
  kategoriAktif: "semua",
  filmApi: null, // null = masih dimuat
  galatApi: "",
};

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
}
