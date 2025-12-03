// components/MapComponent.jsx
'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

// IMPORTANTE: ssr: false es lo que evita que falle al cargar
const MapInner = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#2a2a2a] animate-pulse flex items-center justify-center rounded-xl border border-white/10">
      <span className="text-gray-400 text-sm font-medium">Cargando mapa...</span>
    </div>
  ),
});

export default function MapComponent() {
  return (
    <section id="mapa" className="relative w-full py-20 px-4 bg-[#1a1a1a] flex flex-col items-center overflow-hidden">
      {/* Fondo Decorativo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Fondo decorativo"
          fill
          className="object-cover"
          quality={50}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-md">
          Dónde Encontrarnos
        </h2>
        
        <div className="w-full h-[400px] md:h-[500px] shadow-2xl rounded-xl border-4 border-white/10 overflow-hidden relative">
          <MapInner />
        </div>

        <p className="mt-6 text-gray-400 text-center max-w-2xl">
          Ubicados en el corazón del Alto Valle. <br/>
          <span className="text-sm italic">Haga clic en el marcador para ver la ubicación en Google Maps.</span>
        </p>
      </div>
    </section>
  );
}
