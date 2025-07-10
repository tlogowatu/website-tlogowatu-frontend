import Link from 'next/link';

// Mendefinisikan tipe data untuk detail berita
interface BeritaDetail {
  id: string;
  judul: string;
  isi_berita: string;
  penulis: string;
  url_gambar: string;
  tanggal_publikasi: string;
}

// Fungsi untuk mengambil data satu berita dari API backend
async function getDetailBerita(slug: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/berita/${slug}`, { cache: 'no-store' });

    if (!res.ok) {
      // Jika berita tidak ditemukan, ini akan ditangkap oleh error boundary Next.js
      throw new Error('Gagal mengambil detail berita');
    }
    const data = await res.json();
    return data.data as BeritaDetail;
  } catch (error) {
    console.error(error);
    // Melempar error agar bisa ditangani oleh Next.js (misal, menampilkan halaman not-found.tsx)
    throw new Error('Gagal memuat data berita.');
  }
}

// Komponen Halaman Detail Berita (Server Component)
export default async function DetailBeritaPage({ params }: { params: { slug: string } }) {
  const berita = await getDetailBerita(params.slug);

  return (
    // Container untuk membatasi lebar konten di tengah
    <div className="container mx-auto px-4 py-6 md:py-8">
      <article className="max-w-4xl mx-auto">
        {/* Tombol kembali ke daftar berita */}
        <Link href="/berita" className="text-green-600 hover:underline mb-6 block">
          &larr; Kembali ke Daftar Berita
        </Link>
        
        {/* Judul Berita */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {berita.judul}
        </h1>
        
        {/* Informasi Penulis dan Tanggal */}
        <p className="text-gray-500 mb-6">
          Oleh {berita.penulis} | Dipublikasikan pada {new Date(berita.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        
        {/* Gambar Utama Berita */}
        <img 
          src={berita.url_gambar} 
          alt={berita.judul} 
          className="w-full rounded-lg mb-8 shadow-lg" 
        />
        
        {/* Isi Konten Berita */}
        <div className="prose lg:prose-xl max-w-none whitespace-pre-wrap">
          {berita.isi_berita}
        </div>
      </article>
    </div>
  );
}