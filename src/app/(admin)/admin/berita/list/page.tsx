"use client";

import { useState, useEffect, useCallback } from 'react';

interface BeritaItem {
    id: string;
    slug: string;
    judul: string;
    penulis: string;
}

export default function ListBeritaPage() {
    const [berita, setBerita] = useState<BeritaItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0); // State untuk memicu re-fetch

    const fetchBerita = useCallback(async () => {
        setIsLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/berita`); 
            const data = await response.json();
            if (data.status === 'success') {
                const filteredData = data.data.map((item: any) => ({
                    id: item.id,
                    slug: item.slug,
                    judul: item.judul,
                    penulis: item.penulis,
                }));
                setBerita(filteredData);
            }
        } catch (error) {
            console.error("Gagal memuat daftar berita:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBerita();
    }, [fetchBerita, key]);

    const handleBeritaDeleted = () => setKey(prevKey => prevKey + 1);

    const handleDelete = async (slug: string) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            await fetch(`${apiUrl}/berita/${slug}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Berita berhasil dihapus.');
            handleBeritaDeleted();
        } catch (error) {
            alert('Gagal menghapus berita.');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Semua Berita</h1>
            <div className="p-6 bg-white rounded-lg shadow-md">
                {isLoading ? (
                    <p>Memuat daftar berita...</p>
                ) : (
                    <div className="space-y-3">
                        {berita.length > 0 ? berita.map(item => (
                            <div key={item.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                                <div>
                                    <p className="font-semibold">{item.judul}</p>
                                    <p className="text-sm text-gray-500">Oleh: {item.penulis}</p>
                                </div>
                                <button onClick={() => handleDelete(item.slug)} className="flex-shrink-0 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                                    Hapus
                                </button>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 py-4">Belum ada berita.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}