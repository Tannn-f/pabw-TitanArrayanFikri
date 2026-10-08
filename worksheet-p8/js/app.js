// ===== Data halaman: ditulis sekali di sini, bukan di HTML =====
const judulHalaman = "Catatan Film Saya";
const ratingMaksimal = 5;

const profil = {
  nama: "Titan Arrayan Fikri",
  nim: "25523234",
  peran: "mahasiswa yang mencatat dan menilai setiap film yang sudah ditonton",
  genreFavorit: ["Sci-Fi", "Animasi", "Drama"],
};

const kalimat = `Nama saya ${profil.nama}, dan saya punya ${profil.genreFavorit.length} genre film favorit.`;
console.log(kalimat);

// ===== Menampilkan data ke halaman =====
const elemenJudul = document.querySelector("#judul-halaman");
const elemenKaki = document.querySelector("#kaki-halaman");

document.title = `${judulHalaman} — ${profil.nama}`;
elemenJudul.textContent = judulHalaman;
elemenKaki.textContent = `${profil.nama}, ${profil.nim}, ${new Date().getFullYear()}`;
