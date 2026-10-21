<script setup>
import { computed } from 'vue'
import { state } from '../state.js'
import { ratingMaksimal } from '../data.js'

const filmTampil = computed(() =>
  state.daftarFilm.filter(
    (film) => state.kategoriAktif === 'semua' || film.genre.split(' / ').includes(state.kategoriAktif)
  )
)
</script>

<template>
  <ul class="daftar-koleksi">
    <li
      v-for="film in filmTampil"
      :key="film.id"
      class="kartu kartu-film"
      :data-prioritas="film.sudahDitonton ? null : (film.prioritas ?? '')"
    >
      <h3>{{ film.judul }}</h3>
      <p class="meta">{{ film.sutradara }} · {{ film.tahun }}</p>
      <p class="meta">{{ film.genre }}</p>
      <span class="lencana">
        {{
          film.sudahDitonton
            ? `Rating ${film.rating}/${ratingMaksimal}`
            : `Target · Prioritas ${film.prioritas ?? 'belum ditentukan'}`
        }}
      </span>
    </li>
  </ul>
  <p v-if="filmTampil.length === 0" class="pesan-kosong">
    Belum ada film dengan genre itu di catatan saya.
  </p>
</template>
