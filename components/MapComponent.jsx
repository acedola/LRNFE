'use client';

import { useEffect, useState, useRef } from 'react';

const LOCATION = {
  lat: -39.144668167376445,
  lng: -67.14869259287129,
};

export default function MapComponent() {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // Cargar todo dinámicamente
    const loadMap = async () => {
      try {
        // Cargar CSS
        await import('leaflet/dist/leaflet.css');
        
        // Cargar Leaflet
        const L = (await import('leaflet')).default;
        
        // Cargar react-leaflet
        const { MapContainer, TileLayer, Marker, Popup } = await import('react-leaflet');
        
        // Configurar iconos
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
          iconUrl: '/leaflet/images/marker-icon.png',
          shadowUrl: '/leaflet/images/marker-shadow.png',
        });
        
        // Guardar componentes
        mapRef.current = { MapContainer, TileLayer, Marker, Popup, L };
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };
    
    loadMap();
  }, []);

  if (!isLoaded || !mapRef.current) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Inicializando mapa...</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = mapRef.current;

  // Icono personalizado
  const customIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6" width="32px" height="32px">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: '',
  });

  return (
    <div >
      <MapContainer
        center={[LOCATION.lat, LOCATION.lng]}
        zoom={9}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ height: '50vh', width: '100vw' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <Marker position={[LOCATION.lat, LOCATION.lng]} icon={customIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg text-blue-600">Ubicación</h3>
              <p className="text-sm text-gray-700">
                Lat: {LOCATION.lat.toFixed(6)}<br />
                Lng: {LOCATION.lng.toFixed(6)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
    </div>
  );
}