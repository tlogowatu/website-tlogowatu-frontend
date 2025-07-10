"use client";

import { useEffect, useState } from 'react';

interface SummaryData {
    totalBerita: number;
    totalPenduduk: number;
    kunjunganHariIni: number;
}

export default function AdminDashboardPage() {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/dashboard/summary`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setSummary(data.data);
                }
            } catch (error) {
                console.error("Gagal mengambil data summary:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSummary();
    }, []);

    const StatCard = ({ title, value }: { title: string, value: number | string }) => (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-bold text-lg text-gray-600">{title}</h3>
            {isLoading ? (
                <div className="h-9 w-20 mt-2 bg-gray-200 rounded animate-pulse"></div>
            ) : (
                <p className="text-3xl font-semibold mt-2">{value}</p>
            )}
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Berita" value={summary?.totalBerita ?? 0} />
                <StatCard title="Total Penduduk" value={summary?.totalPenduduk ?? 0} />
                <StatCard title="Kunjungan Hari Ini" value={summary?.kunjunganHariIni ?? 0} />
            </div>
        </div>
    );
}