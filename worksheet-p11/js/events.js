import { state, pilihKategori } from "./state.js";
import { barisFilter, formFilm, saring, perbaruiForm, kirimForm } from "./dom.js";

export function pasangPendengar() {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return;
    pilihKategori(tombol.dataset.kategori);
    console.log(`Filter ${state.kategoriAktif}: ${saring(state).length} film`);
  });

  formFilm.addEventListener("input", (event) => {
    perbaruiForm(event.target);
  });

  formFilm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    kirimForm();
  });
}
