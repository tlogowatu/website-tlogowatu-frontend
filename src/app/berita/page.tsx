import Link from 'next/link';
import BeritaCarousel from '@/components/BeritaCarousel';

// Mendefinisikan tipe data untuk setiap artikel berita
interface Berita {
  id: string;
  slug: string;
  judul: string;
  penulis: string;
  url_gambar: string;
  tanggal_publikasi: string;
}

// Fungsi untuk mengambil data semua berita dari API backend
async function getBerita() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/berita`, { cache: 'no-store' });

    if (!res.ok) {
      console.error("Gagal mengambil data berita. Status:", res.status);
      return [];
    }

    const data = await res.json();
    return (data.data as Berita[]) || [];
  } catch (error) {
    console.error("Terjadi kesalahan saat fetch berita:", error);
    return [];
  }
}

export default async function BeritaPage() {
  const daftarBerita = await getBerita();

  return (
    // Pembungkus utama untuk membuat carousel mentok kanan-kiri
    <div>
      {/* 1. Carousel Berita Utama (Full-width) */}
      <div className="mb-12">
        <BeritaCarousel />
      </div>

      {/* 2. List Semua Berita (Contained) */}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Semua Berita</h2>
        {daftarBerita.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {daftarBerita.map((berita) => (
              <Link href={`/berita/${berita.slug}`} key={berita.id} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                <img 
                  src={berita.url_gambar} 
                  alt={berita.judul} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{berita.judul}</h3>
                  <p className="text-sm text-gray-500">
                    Oleh {berita.penulis} - {new Date(berita.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">Belum ada berita yang dipublikasikan atau gagal memuat data.</p>
        )}
      </div>
    </div>
  );
}
