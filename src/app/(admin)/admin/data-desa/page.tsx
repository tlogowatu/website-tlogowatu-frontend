"use client";

import { useState, useEffect } from 'react';

// Tipe data untuk satu dusun
interface Dusun {
    id: string;
    nama_dusun: string;
    jumlah_pria: number;
    jumlah_wanita: number;
}

// Komponen untuk menampilkan grafik batang sederhana
const PopulationChart = ({ pria, wanita }: { pria: number; wanita: number }) => {
    const total = pria + wanita;
    const priaPercentage = total > 0 ? (pria / total) * 100 : 0;
    const wanitaPercentage = total > 0 ? (wanita / total) * 100 : 0;

    return (
        <div className="space-y-4">
            <div>
                <div className="flex justify-between mb-1 text-sm">
                    <span>Pria</span>
                    <span>{pria.toLocaleString('id-ID')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500" 
                        style={{ width: `${priaPercentage}%` }}
                    ></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-1 text-sm">
                    <span>Wanita</span>
                    <span>{wanita.toLocaleString('id-ID')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                        className="bg-pink-500 h-4 rounded-full transition-all duration-500" 
                        style={{ width: `${wanitaPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};


export default function KelolaDataDesaPage() {
    const [dusunList, setDusunList] = useState<Dusun[]>([]);
    // 1. Ubah state awal menjadi string kosong untuk pilihan default
    const [selectedDusunId, setSelectedDusunId] = useState('');
    const [pria, setPria] = useState<number | null>(null);
    const [wanita, setWanita] = useState<number | null>(null);
    
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // useEffect ini HANYA untuk mengambil daftar dusun dari API
    useEffect(() => {
        const fetchDusunList = async () => {
            setIsFetching(true);
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/data`);
                const data = await response.json();
                if (data.status === 'success') {
                    setDusunList(data.data.detailDusun);
                } else {
                    throw new Error(data.message || "Gagal memuat data dusun");
                }
            } catch (error: any) {
                setMessage({ type: 'error', text: error.message });
            } finally {
                setIsFetching(false);
            }
        };
        fetchDusunList();
    }, []);

    // useEffect ini berjalan SETELAH daftar dusun berhasil diambil
    // Tugasnya adalah mengisi form dengan data yang sesuai
    useEffect(() => {
        // Hanya isi form jika ada dusun yang dipilih (bukan string kosong)
        if (selectedDusunId && dusunList.length > 0) {
            const selectedData = dusunList.find(d => d.id === selectedDusunId);
            if (selectedData) {
                setPria(selectedData.jumlah_pria);
                setWanita(selectedData.jumlah_wanita);
            }
        } else {
            // Kosongkan form jika tidak ada yang dipilih
            setPria(null);
            setWanita(null);
        }
    }, [selectedDusunId, dusunList]);

    const handleDusunChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDusunId(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pria === null || wanita === null) return;

        setIsLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/data/${selectedDusunId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jumlah_pria: pria, jumlah_wanita: wanita })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Gagal memperbarui data');
            setMessage({ type: 'success', text: `Data dusun ${selectedDusunId} berhasil diperbarui!` });
            const updatedList = dusunList.map(d => 
                d.id === selectedDusunId ? { ...d, jumlah_pria: pria, jumlah_wanita: wanita } : d
            );
            setDusunList(updatedList);
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Data Desa</h1>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <p>Memuat data desa...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Data Desa</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Edit Data Penduduk</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pilih Dusun</label>
                            {/* 2. Gunakan value string kosong untuk opsi default */}
                            <select value={selectedDusunId} onChange={handleDusunChange} className="mt-1 w-full p-2 border rounded-md">
                                <option value="" disabled>Pilihlah dusun...</option>
                                {dusunList.map(dusun => (
                                    <option key={dusun.id} value={dusun.id}>{dusun.nama_dusun}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* 3. Tampilkan field input hanya jika dusun sudah dipilih */}
                        {selectedDusunId && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Jumlah Pria</label>
                                    <input type="number" value={pria ?? ''} onChange={(e) => setPria(parseInt(e.target.value) || 0)} required className="mt-1 w-full p-2 border rounded-md"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Jumlah Wanita</label>
                                    <input type="number" value={wanita ?? ''} onChange={(e) => setWanita(parseInt(e.target.value) || 0)} required className="mt-1 w-full p-2 border rounded-md"/>
                                </div>
                                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                                    {isLoading ? 'Memperbarui...' : 'Update Data'}
                                </button>
                            </>
                        )}
                        {message.text && <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
                    </form>
                </div>
                <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">
                            {selectedDusunId ? `Grafik Penduduk: ${dusunList.find(d => d.id === selectedDusunId)?.nama_dusun}` : 'Grafik Penduduk'}
                        </h2>
                        {selectedDusunId ? (
                            <PopulationChart pria={pria ?? 0} wanita={wanita ?? 0} />
                        ) : (
                            <p className="text-gray-500">Pilih dusun untuk melihat grafik.</p>
                        )}
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Rincian Data Semua Dusun</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-2">Nama Dusun</th>
                                    <th className="p-2 text-center">Pria</th>
                                    <th className="p-2 text-center">Wanita</th>
                                    <th className="p-2 text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dusunList.map(dusun => (
                                    <tr key={dusun.id} className="border-b">
                                        <td className="p-2 font-medium">{dusun.nama_dusun}</td>
                                        <td className="p-2 text-center">{dusun.jumlah_pria}</td>
                                        <td className="p-2 text-center">{dusun.jumlah_wanita}</td>
                                        <td className="p-2 text-center font-semibold">{dusun.jumlah_pria + dusun.jumlah_wanita}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}