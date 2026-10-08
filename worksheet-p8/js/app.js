// ===== Data halaman: ditulis sekali di sini, bukan di HTML =====
const judulHalaman = "Catatan Film Saya";
const ratingMaksimal = 5;

const profil = {
  nama: "Titan Arrayan Fikri",
  nim: "25523234",
  peran: "mahasiswa yang mencatat dan menilai setiap film yang sudah ditonton",
  genreFavorit: ["Sci-Fi", "Animasi", "Drama"],
};

// ===== Fungsi murni: hasilnya hanya bergantung pada argumen =====
const buatPerkenalan = ({ nama, peran }, jumlahFilm = 0) => {
  let kalimat = `${nama} — ${peran}.`;
  if (jumlahFilm > 0) {
    kalimat += ` Sejauh ini ${jumlahFilm} film sudah saya tonton.`;
  }
  return kalimat;
};

const formatGenre = (daftar) => daftar.join(" · ");

// ===== Menampilkan data ke halaman =====
const elemenJudul = document.querySelector("#judul-halaman");
const elemenPerkenalan = document.querySelector("#perkenalan");
const elemenGenre = document.querySelector("#genre-favorit");
const elemenKaki = document.querySelector("#kaki-halaman");

document.title = `${judulHalaman} — ${profil.nama}`;
elemenJudul.textContent = judulHalaman;
elemenPerkenalan.textContent = buatPerkenalan(profil);
elemenGenre.textContent = `Genre favorit: ${formatGenre(profil.genreFavorit)}`;
elemenKaki.textContent = `${profil.nama}, ${profil.nim}, ${new Date().getFullYear()}`;

// ===== Pemeriksaan di Console =====
console.log(buatPerkenalan(profil));
console.log(formatGenre(profil.genreFavorit));
