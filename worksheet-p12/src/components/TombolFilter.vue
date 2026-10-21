<script setup>
import { state, pilihKategori } from '../state.js'

const daftarKategori = [
  { nilai: 'semua', label: 'Semua' },
  { nilai: 'Sci-Fi', label: 'Sci-Fi' },
  { nilai: 'Animasi', label: 'Animasi' },
  { nilai: 'Drama', label: 'Drama' },
  { nilai: 'Horor', label: 'Horor' },
]
</script>

<template>
  <div class="filter-genre" role="group" aria-label="Saring film menurut genre">
    <button
      v-for="kategori in daftarKategori"
      :key="kategori.nilai"
      type="button"
      :class="{ aktif: state.kategoriAktif === kategori.nilai }"
      :aria-pressed="state.kategoriAktif === kategori.nilai"
      @click="pilihKategori(kategori.nilai)"
    >
      {{ kategori.label }}
    </button>
  </div>
</template>
