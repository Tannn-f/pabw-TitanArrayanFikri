const ALAMAT = "https://ghibliapi.vercel.app/films";

export async function muat() {
  const respons = await fetch(ALAMAT);
  console.log("status", respons.status, "ok", respons.ok);
  console.log("jenis isi", respons.headers.get("Content-Type"));
  if (!respons.ok) {
    throw new Error("status " + respons.status);
  }
  return respons.json();
}

muat()
  .then((data) => console.log("data dari API", data))
  .catch((galat) => console.error("Gagal memuat:", galat.message));
