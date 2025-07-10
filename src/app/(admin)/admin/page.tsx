export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-lg">Total Berita</h3>
                    <p className="text-3xl mt-2">15</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-lg">Total Penduduk</h3>
                    <p className="text-3xl mt-2">1,234</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="font-bold text-lg">Kunjungan Hari Ini</h3>
                    <p className="text-3xl mt-2">78</p>
                </div>
            </div>
        </div>
    );
}