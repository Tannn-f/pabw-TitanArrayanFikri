import { state, pilihKategori } from "./state.js";
import { barisFilter, formFilm, render, tandaiTombolAktif, perbaruiForm, kirimForm } from "./dom.js";

export function pasangPendengar() {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return; // klik di sela tombol, abaikan
    pilihKategori(tombol.dataset.kategori);
    // genre ditulis "Sci-Fi / Drama", jadi dipecah dulu lalu dicocokkan per genre
    const terpilih = state.daftarFilm.filter(
      (film) => state.kategoriAktif === "semua" || film.genre.split(" / ").includes(state.kategoriAktif)
    );
    tandaiTombolAktif(tombol);
    render(terpilih);
    console.log(`Filter ${state.kategoriAktif}: ${terpilih.length} film`);
  });

  formFilm.addEventListener("input", (event) => {
    perbaruiForm(event.target);
  });

  formFilm.addEventListener("submit", (event) => {
    event.preventDefault(); // halaman tidak dimuat ulang
    kirimForm();
  });
}
