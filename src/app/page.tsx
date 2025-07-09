import AnimatedText from "@/components/AnimatedText";
import BeritaCarousel from "@/components/BeritaCarousel";
import bgDesaImage from "../../public/images/bg-desa.jpg";

export default function Home() {
  return (
    // Pembungkus utama, tidak memiliki container agar hero section bisa mentok
    <div>
      {/* ================================================= */}
      {/* 1. HERO SECTION (SATU LAYAR PENUH)              */}
      {/* ================================================= */}
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
        
        {/* Gambar Latar Belakang */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgDesaImage.src})` }}
        ></div>

        {/* Lapisan Gelap untuk Keterbacaan Teks */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten Teks di Tengah */}
        <div className="relative text-center text-white px-4">
          <AnimatedText delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Selamat Datang di Website
              <span className="block text-green-300 mt-2">Desa Tlogowatu</span>
            </h1>
          </AnimatedText>
          
          <AnimatedText delay={0.5}>
            <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
              Informasi terpusat seputar pemerintahan, berita, dan potensi desa.
            </p>
          </AnimatedText>
        </div>
      </div>

      {/* ================================================= */}
      {/* 2. KONTEN LANJUTAN DI BAWAH HERO SECTION         */}
      {/* ================================================= */}
      <div className="container mx-auto px-4 md:px-6 py-16 space-y-16">
        
        {/* Carousel Berita */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Berita Terkini</h2>
          <BeritaCarousel />
        </div>

        {/* Potensi Desa (Placeholder) */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Potensi Desa</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-green-700">Pertanian</h3>
              <p className="text-gray-600 mt-2">Lahan subur yang mendukung pertanian padi, jagung, dan palawija menjadi tulang punggung ekonomi desa.</p>
            </div>
            <div className="p-6 bg-white border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-green-700">Peternakan</h3>
              <p className="text-gray-600 mt-2">Warga aktif dalam beternak sapi, kambing, dan unggas untuk memenuhi kebutuhan lokal dan pasar sekitar.</p>
            </div>
            <div className="p-6 bg-white border rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-green-700">UMKM</h3>
              <p className="text-gray-600 mt-2">Kerajinan tangan dan produk makanan olahan lokal menjadi bukti kreativitas dan semangat wirausaha warga.</p>
            </div>
          </div>
        </div>
        
        {/* Peta (Placeholder) */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Peta Wilayah</h2>
          <div className="w-full h-80 bg-gray-200 border rounded-lg flex items-center justify-center max-w-5xl mx-auto shadow">
            <p className="text-gray-500">Komponen Peta GeoJSON akan ditampilkan di sini.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
