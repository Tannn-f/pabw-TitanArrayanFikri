<script setup>
import { judulHalaman, buatPerkenalan, formatGenre, filmDitonton } from '../data.js'

const props = defineProps({
  profil: { type: Object, required: true },
})
</script>

<template>
  <header class="hero">
    <div class="wadah hero-isi">
      <h1>{{ judulHalaman }}</h1>
      <p class="hero-intro">{{ buatPerkenalan(props.profil, filmDitonton.length) }}</p>
      <p class="hero-genre">Genre favorit: {{ formatGenre(props.profil.genreFavorit) }}</p>
    </div>
    <nav class="wadah" aria-label="Navigasi utama">
      <ul>
        <li><a href="#daftar-film">Daftar Film</a></li>
        <li><a href="#jelajah-genre">Jelajah Genre</a></li>
        <li><a href="#film-ghibli">Film Ghibli</a></li>
        <li><a href="#tambah-film">Tambah Film</a></li>
        <li><a href="#target-tontonan">Target Tontonan</a></li>
      </ul>
    </nav>
  </header>
</template>
