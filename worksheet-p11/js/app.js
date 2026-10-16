import {
  profil,
  daftarFilm,
  buatPerkenalan,
  formatGenre,
  filmDitonton,
  filmUrutRating,
  filmPoster,
  judulFilm,
  filmTidakAda,
} from "./data.js";
import { state, simpanFilmApi, catatGalatApi } from "./state.js";
import { pasangPendengar } from "./events.js";
import { isiHalaman, render, tandaiTombolAktif, renderFilmApi } from "./dom.js";
import { ambilFilm } from "./api.js";

isiHalaman();

console.log(buatPerkenalan(profil, filmDitonton.length));
console.log(formatGenre(profil.genreFavorit));

console.table(profil.genreFavorit);
console.table(daftarFilm);
console.table(filmDitonton);
console.table(filmUrutRating);
console.log(filmPoster);

console.log(filmTidakAda);
console.log(filmTidakAda?.sutradara ?? "Inception belum ada di daftar");

console.log(judulFilm.length === daftarFilm.length);
console.log(judulFilm);

pasangPendengar();
tandaiTombolAktif(state);
render(state);

renderFilmApi(state);
try {
  simpanFilmApi(await ambilFilm());
} catch (galat) {
  catatGalatApi(galat.message);
}
