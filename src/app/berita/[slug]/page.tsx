import Link from 'next/link';

interface BeritaDetail {
  id: string;
  judul: string;
  isi_berita: string;
  penulis: string;
  url_gambar: string;
  tanggal_publikasi: string;
}

async function getDetailBerita(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/berita/${slug}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Gagal mengambil detail berita');
  }
  const data = await res.json();
  return data.data as BeritaDetail;
}

export default async function DetailBeritaPage({ params }: { params: { slug: string } }) {
  const berita = await getDetailBerita(params.slug);

  return (
    <article className="max-w-4xl mx-auto">
       <Link href="/berita" className="text-green-600 hover:underline mb-6 block">&larr; Kembali ke Daftar Berita</Link>
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{berita.judul}</h1>
      <p className="text-gray-500 mb-6">
        Oleh {berita.penulis} | Dipublikasikan pada {new Date(berita.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <img src={berita.url_gambar} alt={berita.judul} className="w-full rounded-lg mb-8 shadow-lg" />
      <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: berita.isi_berita }}>
      </div>
    </article>
  );
}