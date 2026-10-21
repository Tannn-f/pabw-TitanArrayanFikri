<script setup>
import { ref, computed, onMounted } from 'vue'
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'
import { pilihKategori } from './state.js'
import { ambilFilm } from './api.js'
import {
  judulHalaman,
  ratingMaksimal,
  profil,
  formatRating,
  buatKeteranganPoster,
  targetTontonan,
  filmUrutRating,
  filmPoster,
  rataRating,
} from './data.js'

const identitas = profil
const tahunIni = new Date().getFullYear()
const filmApi = ref(null)
const galatApi = ref('')

document.title = `${judulHalaman} — ${profil.nama}`

const statusApi = computed(() => {
  if (galatApi.value !== '') {
    return `Daftar film gagal dimuat (${galatApi.value}). Periksa koneksi lalu muat ulang halaman.`
  }
  if (filmApi.value === null) {
    return 'Memuat daftar film…'
  }
  if (!Array.isArray(filmApi.value) || filmApi.value.length === 0) {
    return 'API membalas, tetapi belum ada film untuk ditampilkan.'
  }
  return ''
})

const daftarApi = computed(() => (statusApi.value === '' ? filmApi.value : []))

onMounted(async () => {
  try {
    filmApi.value = await ambilFilm()
  } catch (galat) {
    galatApi.value = galat.message
  }
})
</script>

<template>
  <KepalaProfil :profil="identitas" />

  <main class="wadah">
    <section id="daftar-film">
      <div class="kepala-bagian">
        <h2>Daftar Film</h2>
        <p>
          Rata-rata rating saya {{ formatRating(rataRating.toFixed(1), ratingMaksimal) }}. Tabel diurutkan dari
          rating tertinggi.
        </p>
      </div>

      <div class="daftar-film-isi">
        <figure class="sorotan-film">
          <img
            src="/poster-film.webp"
            alt="Poster film Interstellar menampilkan seorang astronaut berdiri di lanskap planet es"
            width="640"
            height="360"
            loading="lazy"
          />
          <figcaption>{{ buatKeteranganPoster(filmPoster, ratingMaksimal) }}</figcaption>
        </figure>

        <div class="table-wrap">
          <table>
            <caption>
              Daftar Film yang Pernah Saya Tonton
            </caption>
            <thead>
              <tr>
                <th scope="col">Judul Film</th>
                <th scope="col">Sutradara</th>
                <th scope="col">Tahun Rilis</th>
                <th scope="col">Rating Saya</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="film in filmUrutRating" :key="film.id">
                <th scope="row">{{ film.judul }}</th>
                <td>{{ film.sutradara }}</td>
                <td>{{ film.tahun }}</td>
                <td>
                  <span class="rating">
                    <span class="bintang" :style="{ '--persen': `${(film.rating / ratingMaksimal) * 100}%` }" aria-hidden="true">★★★★★</span>
                    {{ formatRating(film.rating, ratingMaksimal) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="jelajah-genre">
      <div class="kepala-bagian">
        <h2>Jelajah per Genre</h2>
        <p>
          Seluruh film di catatan saya, yang sudah maupun yang belum ditonton.
          Pilih satu genre untuk menyaringnya.
        </p>
      </div>
      <TombolFilter />
      <button type="button" class="tombol-tema tombol-atur-ulang" @click="pilihKategori('semua')">
        Atur ulang pilihan
      </button>
      <DaftarProyek />
    </section>

    <section id="film-ghibli">
      <div class="kepala-bagian">
        <h2>Film Studio Ghibli</h2>
        <p>Daftar ini dimuat langsung dari Studio Ghibli API.</p>
      </div>
      <p v-show="statusApi !== ''" class="pesan-kosong" role="status">{{ statusApi }}</p>
      <ul class="daftar-koleksi">
        <li v-for="film in daftarApi" :key="film.id" class="kartu kartu-film">
          <h3>{{ film.title }}</h3>
          <p class="meta">{{ film.director }} · {{ film.release_date }}</p>
        </li>
      </ul>
    </section>

    <section id="tambah-film">
      <div class="kepala-bagian">
        <h2>Tambah Film</h2>
        <p>Baru selesai menonton? Catat judul, tahun rilis, dan nilainya.</p>
      </div>
      <FormKontak />
    </section>

    <section id="target-tontonan">
      <div class="kepala-bagian">
        <h2>Target Tontonan</h2>
        <p>
          Daftar film yang berencana saya tonton dalam waktu dekat beserta
          prioritasnya:
        </p>
      </div>
      <ul class="daftar-target">
        <li
          v-for="film in targetTontonan"
          :key="film.id"
          class="kartu-target"
          :data-prioritas="film.prioritas ?? ''"
        >
          <strong>{{ film.judul }}</strong>
          <span class="meta">{{ film.genre }}</span>
          <span class="meta">{{ film.sutradara }} · {{ film.tahun }}</span>
          <span class="lencana">Prioritas: {{ film.prioritas ?? 'Belum ditentukan' }}</span>
        </li>
      </ul>
    </section>
  </main>

  <footer>
    <p class="wadah">{{ profil.nama }}, {{ profil.nim }}, {{ tahunIni }}</p>
  </footer>
</template>
