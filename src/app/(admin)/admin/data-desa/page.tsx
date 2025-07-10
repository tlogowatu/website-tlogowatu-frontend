"use client";

import { useState } from 'react';

const FormEditDataDesa = () => {
    const [dusun, setDusun] = useState('tlogowatu');
    const [pria, setPria] = useState(0);
    const [wanita, setWanita] = useState(0);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/data/${dusun}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jumlah_pria: pria, jumlah_wanita: wanita })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Gagal memperbarui data');

            setMessage({ type: 'success', text: `Data dusun ${dusun} berhasil diperbarui!` });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Data Penduduk</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pilih Dusun</label>
                    <select value={dusun} onChange={(e) => setDusun(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                        <option value="tlogowatu">Tlogowatu</option>
                        <option value="mendak">Mendak</option>
                        <option value="sumberejo">Sumberejo</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Jumlah Pria</label>
                    <input type="number" value={pria} onChange={(e) => setPria(parseInt(e.target.value))} required className="mt-1 w-full p-2 border rounded-md"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Jumlah Wanita</label>
                    <input type="number" value={wanita} onChange={(e) => setWanita(parseInt(e.target.value))} required className="mt-1 w-full p-2 border rounded-md"/>
                </div>
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                    {isLoading ? 'Memperbarui...' : 'Update Data'}
                </button>
                {message.text && <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
            </form>
        </div>
    );
};

export default function KelolaDataDesaPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Data Desa</h1>
            <div className="max-w-md">
                <FormEditDataDesa />
            </div>
        </div>
    );
}