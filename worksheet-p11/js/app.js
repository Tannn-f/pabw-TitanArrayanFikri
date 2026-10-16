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
import { state } from "./state.js";
import { pasangPendengar } from "./events.js";
import { isiHalaman, render, renderFilmApi } from "./dom.js";
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
render(state.daftarFilm);

renderFilmApi(state);                     // "Memuat daftar film…"
try {
  const dataApi = await ambilFilm();      // ambil
  state.filmApi = dataApi;                // masuk ke state
} catch (galat) {
  state.galatApi = galat.message;
}
renderFilmApi(state);                     // baru digambar
