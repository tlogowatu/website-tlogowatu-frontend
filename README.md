# Frontend - Website Profil Desa Tlogowatu

Ini adalah aplikasi frontend untuk menampilkan profil Desa Tlogowatu. Dibuat menggunakan Next.js dengan App Router dan di-styling dengan Tailwind CSS.

## Teknologi yang Digunakan

* **Next.js**: Framework React untuk aplikasi web modern.
* **React**: Library JavaScript untuk membangun antarmuka pengguna.
* **TypeScript**: Superset JavaScript untuk pengetikan statis.
* **Tailwind CSS**: Framework CSS untuk styling cepat.
* **Framer Motion**: Library untuk animasi.
* **Embla Carousel**: Library untuk komponen carousel.
* **React Leaflet**: Library untuk menampilkan peta interaktif.

## Persiapan Awal

Sebelum memulai, pastikan Anda memiliki:

1.  **Node.js** terinstal di komputer Anda.
2.  Server **backend** sudah berjalan di `http://localhost:8000`.

## Instalasi & Konfigurasi

1.  **Clone Repositori**
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    cd website-desa
    ```

2.  **Install Dependensi**
    Jalankan perintah berikut di terminal:
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment (.env.local)**
    Buat file bernama `.env.local` di folder utama proyek dan isi dengan alamat API backend Anda:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    ```

4.  **Persiapan Aset Statis**
    * **Gambar Latar:** Pastikan Anda memiliki gambar di `public/images/bg-desa.jpg`.
    * **Data Peta:** Pastikan Anda memiliki file GeoJSON di `public/data/peta-dusun.geojson`.

## Menjalankan Server Pengembangan

Untuk menjalankan server frontend, gunakan perintah:
```bash
npm run dev
```
Buka browser Anda dan akses `http://localhost:3000`.

## Fitur Utama

* **Halaman Beranda:** Menampilkan *hero section* layar penuh dengan gambar latar, diikuti dengan carousel berita terkini, potensi desa, dan peta wilayah.
* **Halaman Data Desa:** Menampilkan data kependudukan agregat dan rincian per dusun dengan tombol interaktif dan peta wilayah dusun.
* **Halaman Berita:** Menampilkan carousel berita utama dan daftar semua berita dalam format kartu.
* **Halaman Detail Berita:** Menampilkan konten lengkap satu artikel berita.
* **Animasi:** Menggunakan Framer Motion untuk animasi teks dan angka yang dinamis.