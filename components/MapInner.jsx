// components/MapInner.jsx
'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LOCATION = {
  lat: -39.144668167376445,
  lng: -67.14869259287129,
};

export default function MapInner() {
  const [customIcon, setCustomIcon] = useState(null);

  // 1. Creamos el icono SOLO cuando el componente se monta en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const icon = new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#15803d" width="48px" height="48px" stroke="white" stroke-width="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        `)}`,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
        className: 'drop-shadow-xl'
      });
      setCustomIcon(icon);
    }
  }, []);

  // Si el icono no está listo, no renderizamos el mapa todavía
  if (!customIcon) return null;

  return (
    <MapContainer
      // 2. LA SOLUCIÓN AL ERROR "Map container is being reused":
      // El 'key' obliga a React a tratar este mapa como una instancia nueva si se vuelve a montar.
      key="lupulos-map" 
      center={[LOCATION.lat, LOCATION.lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="w-full h-full z-0 bg-gray-200"
    >
      {/* 3. TileLayer es lo que lanzaba el error de 'appendChild' si el mapa no estaba listo */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      
      <Marker position={[LOCATION.lat, LOCATION.lng]} icon={customIcon}>
        <Popup className="custom-popup">
          <div className="text-center min-w-[160px] p-2">
            <h3 className="font-bold !text-green-900 text-lg mb-1 uppercase leading-tight">
              Lúpulos Río Negro
            </h3>
            <p className="!text-gray-700 text-sm font-medium m-0 mb-3">
              Nuestra Chacra
            </p>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${LOCATION.lat},${LOCATION.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 !text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors no-underline shadow-sm"
            >
              Cómo llegar
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
