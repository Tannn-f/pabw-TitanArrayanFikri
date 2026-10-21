<script setup>
import { ref, reactive } from 'vue'
import { ratingMaksimal } from '../data.js'

const isi = reactive({ judul: '', tahun: '', rating: '' })
const galat = reactive({ judul: '', tahun: '', rating: '' })
const kolomJudul = ref(null)
const kolomTahun = ref(null)
const kolomRating = ref(null)
const kolom = { judul: kolomJudul, tahun: kolomTahun, rating: kolomRating }
const tombolNonaktif = ref(false)
const pesanForm = ref('')
const daftarKolom = ['judul', 'tahun', 'rating']

function cariGalat(nama) {
  const nilai = String(isi[nama]).trim()
  if (nama === 'judul' && nilai === '') {
    return 'Tulis judul filmnya, misalnya Inception. Spasi saja tidak dihitung.'
  }
  if (nama === 'tahun') {
    const tahun = Number(nilai)
    if (nilai === '' || !Number.isInteger(tahun) || tahun < 1888 || tahun > 2026) {
      return 'Isi tahun rilis dengan angka bulat 1888 sampai 2026, misalnya 2010.'
    }
  }
  if (nama === 'rating') {
    const rating = Number(nilai)
    if (nilai === '' || !(rating >= 1 && rating <= ratingMaksimal)) {
      return `Isi rating dengan angka 1 sampai ${ratingMaksimal}, misalnya 4.5.`
    }
  }
  return ''
}

function periksaKolom(nama) {
  galat[nama] = cariGalat(nama)
  return galat[nama] === ''
}

function perbarui(nama) {
  periksaKolom(nama)
  tombolNonaktif.value = !daftarKolom.every((n) => cariGalat(n) === '')
  pesanForm.value = ''
}

function kirim() {
  const kolomSalah = daftarKolom.filter((nama) => !periksaKolom(nama))
  if (kolomSalah.length > 0) {
    tombolNonaktif.value = true
    kolom[kolomSalah[0]].value.focus()
    return
  }
  pesanForm.value = `Siap dicatat: ${String(isi.judul).trim()} (${isi.tahun}), rating ${isi.rating}/${ratingMaksimal}.`
  isi.judul = ''
  isi.tahun = ''
  isi.rating = ''
}
</script>

<template>
  <form class="kartu form-film" action="/simpan" method="post" novalidate @submit.prevent="kirim">
    <div class="form-kolom form-lebar">
      <label for="judul-film">Judul Film</label>
      <input
        id="judul-film"
        ref="kolomJudul"
        v-model="isi.judul"
        type="text"
        name="judul-film"
        placeholder="Contoh: Inception"
        aria-describedby="galat-judul"
        :aria-invalid="galat.judul ? 'true' : null"
        required
        @input="perbarui('judul')"
      />
      <p id="galat-judul" class="pesan-galat">{{ galat.judul }}</p>
    </div>
    <div class="form-kolom">
      <label for="tahun-rilis">Tahun Rilis</label>
      <input
        id="tahun-rilis"
        ref="kolomTahun"
        v-model="isi.tahun"
        type="number"
        name="tahun-rilis"
        min="1888"
        max="2026"
        placeholder="2010"
        aria-describedby="galat-tahun"
        :aria-invalid="galat.tahun ? 'true' : null"
        required
        @input="perbarui('tahun')"
      />
      <p id="galat-tahun" class="pesan-galat">{{ galat.tahun }}</p>
    </div>
    <div class="form-kolom">
      <label for="rating-film">Rating Saya (1-5)</label>
      <input
        id="rating-film"
        ref="kolomRating"
        v-model="isi.rating"
        type="number"
        name="rating-film"
        min="1"
        max="5"
        step="0.1"
        placeholder="4.5"
        aria-describedby="galat-rating"
        :aria-invalid="galat.rating ? 'true' : null"
        required
        @input="perbarui('rating')"
      />
      <p id="galat-rating" class="pesan-galat">{{ galat.rating }}</p>
    </div>
    <button type="submit" :disabled="tombolNonaktif">Simpan</button>
    <p class="pesan-form" role="status">{{ pesanForm }}</p>
  </form>
</template>
