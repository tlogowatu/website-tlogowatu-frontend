"use client";

import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LatLngExpression } from 'leaflet';

// Definisikan tipe untuk fitur GeoJSON
interface GeoJsonFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    color: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

const PetaDesa = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    // Ambil data GeoJSON dari folder public
    fetch('/data/peta-dusun.geojson')
      .then(res => res.json())
      .then(data => setGeoJsonData(data));
  }, []);

  const onEachFeature = (feature: GeoJsonFeature, layer: any) => {
    // Atur warna polygon berdasarkan properti di GeoJSON
    layer.setStyle({
      color: feature.properties.color,
      weight: 2,
      fillOpacity: 0.5,
    });
    // Tambahkan tooltip yang muncul saat di-hover
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      direction: 'center',
      className: 'font-bold'
    });
  };

  const mapCenter: LatLngExpression = [-7.7265, 110.6155]; // Titik tengah peta

  if (!geoJsonData) {
    return <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg"></div>;
  }

  return (
    <MapContainer center={mapCenter} zoom={15} style={{ height: '400px', width: '100%' }} className="rounded-lg shadow-md">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default PetaDesa;