import { reactive } from 'vue'
import { daftarFilm } from './data.js'

export const state = reactive({
  daftarFilm: daftarFilm,
  kategoriAktif: 'semua',
})

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}
