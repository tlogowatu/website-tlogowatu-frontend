"use client";

import { useState } from 'react';

export default function TambahBeritaPage() {
    const [judul, setJudul] = useState('');
    const [isiBerita, setIsiBerita] = useState('');
    const [penulis, setPenulis] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage({ type: 'error', text: 'Gambar wajib diisi' });
            return;
        }
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('isi_berita', isiBerita);
        formData.append('penulis', penulis);
        formData.append('gambar', file);
        
        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/berita`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Gagal membuat berita');

            setMessage({ type: 'success', text: 'Berita berhasil dibuat!' });
            setJudul(''); 
            setIsiBerita(''); 
            setPenulis(''); 
            setFile(null);
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tambah Berita Baru</h1>
            <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
                        <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required className="mt-1 w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Isi Berita</label>
                        <textarea value={isiBerita} onChange={(e) => setIsiBerita(e.target.value)} required rows={10} className="mt-1 w-full p-2 border rounded-md"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Penulis</label>
                        <input type="text" value={penulis} onChange={(e) => setPenulis(e.target.value)} required className="mt-1 w-full p-2 border rounded-md"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gambar Utama</label>
                        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} required className="mt-1 w-full p-2 border rounded-md"/>
                    </div>
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                        {isLoading ? 'Menyimpan...' : 'Simpan Berita'}
                    </button>
                    {message.text && <p className={`mt-2 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>}
                </form>
            </div>
        </div>
    );
};