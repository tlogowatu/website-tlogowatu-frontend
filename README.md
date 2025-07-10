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
    git clone https://github.com/tlogowatu/website-tlogowatu-frontend
    cd website-desa
    ```

2.  **Install Dependensi**
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

### Tampilan Publik
* **Halaman Beranda:** Menampilkan *hero section* layar penuh, diikuti dengan carousel berita, potensi desa, dan peta.
* **Halaman Data Desa:** Menampilkan data kependudukan dengan tombol interaktif dan peta wilayah.
* **Halaman Berita:** Menampilkan carousel berita utama dan daftar semua berita.

### Panel Admin
* **Halaman Login (`/login`):** Halaman login yang terisolasi dari layout publik untuk akses admin.
* **Dasbor Admin (`/admin`):**
    * Layout modern dengan **sidebar navigasi** yang persisten.
    * Halaman utama dasbor yang menampilkan ringkasan data.
    * Halaman **Kelola Berita** (`/admin/berita`) dengan form untuk membuat berita baru.
    * Halaman **Kelola Data Desa** (`/admin/data-desa`) dengan form untuk memperbarui data penduduk per dusun.
    * Rute admin dilindungi dan hanya bisa diakses setelah login berhasil.
