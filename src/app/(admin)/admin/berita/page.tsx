"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BeritaRedirectPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/admin/berita/tambah');
    }, [router]);
    return <div className="flex items-center justify-center min-h-full">Mengarahkan...</div>;
}