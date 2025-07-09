import DataDisplay from "./DataDisplay";

async function getDataDesa() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/data`, { cache: 'no-store' });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Gagal mengambil data desa:", error);
    return null;
  }
}

export default async function DataDesaPage() {
  const dataDesa = await getDataDesa();

  if (!dataDesa) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-3xl font-bold">Data Desa</h1>
        <p className="mt-4 text-red-500">Gagal memuat data desa. Pastikan server backend berjalan.</p>
      </div>
    );
  }

  return (
    // Tambahkan container di sini untuk membatasi lebar halaman
    <div className="container mx-auto px-4 py-6 md:py-8">
      <DataDisplay totalData={dataDesa.totalData} detailDusun={dataDesa.detailDusun} />
    </div>
  );
}
