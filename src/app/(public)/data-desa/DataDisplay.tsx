"use client";

import { useState } from "react";
import AnimatedNumber from "@/components/AnimatedNumber";
import PetaDesa from "@/components/PetaDesa";

// Definisikan tipe data untuk props
interface Dusun {
  id: string;
  nama_dusun: string;
  jumlah_pria: number;
  jumlah_wanita: number;
}
interface TotalData {
  jumlah_pria: number;
  jumlah_wanita: number;
  total_penduduk: number;
}
interface DataDesaProps {
  totalData: TotalData;
  detailDusun: Dusun[];
}

export default function DataDisplay({ totalData, detailDusun }: DataDesaProps) {
  // State untuk menyimpan data yang akan ditampilkan, defaultnya adalah total data
  const [selectedData, setSelectedData] = useState<Dusun | TotalData>(totalData);
  
  // State untuk melacak ID tombol yang aktif, defaultnya null (tidak ada yang aktif)
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fungsi yang dijalankan saat tombol dusun di-klik
  const handleSelectDusun = (clickedId: string) => {
    // Jika tombol yang diklik adalah tombol yang sedang aktif
    if (activeId === clickedId) {
      // Nonaktifkan tombol dan kembalikan data ke total desa
      setActiveId(null);
      setSelectedData(totalData);
    } else {
      // Jika tombol lain yang diklik, aktifkan tombol tersebut
      setActiveId(clickedId);
      const dusun = detailDusun.find(d => d.id === clickedId);
      if (dusun) {
        setSelectedData(dusun);
      }
    }
  };

  // Menentukan judul yang akan ditampilkan berdasarkan state
  const displayTitle = activeId 
    ? (selectedData as Dusun).nama_dusun 
    : 'Seluruh Desa';

  return (
    <div className="space-y-8">
      {/* Tampilan Data Penduduk dengan Angka Beranimasi */}
      <div className="p-6 bg-white border rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-center">Rincian Data Penduduk: {displayTitle}</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-500">Laki-laki</p>
            <div className="text-3xl font-semibold">
              <AnimatedNumber toValue={selectedData.jumlah_pria || 0} />
            </div>
          </div>
          <div>
            <p className="text-gray-500">Perempuan</p>
            <div className="text-3xl font-semibold">
              <AnimatedNumber toValue={selectedData.jumlah_wanita || 0} />
            </div>
          </div>
          <div>
            <p className="text-gray-500">Total Penduduk</p>
            <div className="text-3xl font-bold text-green-700">
              <AnimatedNumber 
                toValue={
                  'total_penduduk' in selectedData 
                    ? selectedData.total_penduduk 
                    : selectedData.jumlah_pria + selectedData.jumlah_wanita
                } 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tombol-tombol dusun dengan layout grid */}
      <div className="pt-2">
        <p className="w-full text-center text-sm text-gray-600 mb-3">Pilih dusun untuk melihat rincian:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {detailDusun.map(dusun => (
            <button 
              key={dusun.id} 
              onClick={() => handleSelectDusun(dusun.id)} 
              className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 font-semibold text-lg ${
                activeId === dusun.id 
                  ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {dusun.nama_dusun}
            </button>
          ))}
        </div>
      </div>
      
      {/* Peta dan Perangkat Desa */}
      <div className="grid lg:grid-cols-2 gap-8 pt-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Peta Wilayah</h3>
          <PetaDesa />
        </div>
        <div className="p-6 bg-white border rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Perangkat Desa</h3>
          <ul className="space-y-2">
            <li>Kepala Desa: [Nama]</li>
            <li>Sekretaris Desa: [Nama]</li>
            <li>Kepala Dusun Tlogowatu: [Nama]</li>
            <li>Kepala Dusun Mendak: [Nama]</li>
            <li>Kepala Dusun Sumberejo: [Nama]</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
