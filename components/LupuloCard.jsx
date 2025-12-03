// components/LupuloCard.jsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';
import HopCard from './HopCard';

export default function LupuloCard({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Obtener URL de imagen
  const getImageUrl = () => {
    const imgData = data?.imagen;
    if (!imgData) return '/placeholder-hop.png';
    const url = imgData.formats?.small?.url || imgData.formats?.medium?.url || imgData.url;
    if (!url) return '/placeholder-hop.png';
    const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || '';
    return url.startsWith('http') ? url : `${STRAPI_BASE}${url}`;
  };

  const imageUrl = getImageUrl();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Manejo del scroll cuando el modal se abre
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Limpieza de seguridad al desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleOpenModal = () => {
    console.log("Abriendo modal para:", data.Variedad); // Debug
    setShowModal(true);
  };

  return (
    <>
      {/* --- TARJETA --- */}
      <div className="group relative bg-[#2a2a2a] rounded-xl shadow-lg border border-white/10 p-0 flex flex-col h-full hover:-translate-y-2 transition-all duration-300 overflow-hidden">
        
        {/* 
          CONTENEDOR IMAGEN
          - w-full: Ancho total
          - aspect-video o h-64: Altura fija
          - object-cover: Rellena sin deformar
        */}
        <div className="relative w-full h-64 overflow-hidden bg-gray-900">
          <Image
            src={imageUrl}
            alt={data.Variedad || 'Lúpulo'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradiente para que el texto resalte si se superpone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] via-transparent to-transparent opacity-90"></div>
        </div>
        
        {/* CONTENIDO TEXTO (Padding separado para no afectar la imagen) */}
        <div className="p-6 flex flex-col flex-grow items-center text-center -mt-12 relative z-10">
          <h3 className="text-green-400 text-2xl font-serif font-bold uppercase mb-6 drop-shadow-md bg-[#2a2a2a]/80 px-4 py-1 rounded-full backdrop-blur-sm">
            {data.Variedad}
          </h3>
          
          <div className="flex flex-col gap-3 w-full mt-auto">
            {/* Botón EXPLORAR corregido */}
            <button
              onClick={handleOpenModal}
              type="button"
              className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md cursor-pointer z-20"
            >
              Explorar
            </button>
            
            <a
              href="#contact"
              className="w-full border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 no-underline z-20"
            >
              Consultar
            </a>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {mounted && showModal && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          {/* Click afuera cierra */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl z-[10001]">
            <button
              onClick={() => setShowModal(false)}
              className="sticky top-4 float-right right-4 bg-red-600 text-white p-2 rounded-full z-50 hover:scale-110 transition-transform"
            >
              <X size={24} />
            </button>

            <div className="p-2 md:p-4">
              {/* Verifica que HopCard existe */}
              {HopCard ? <HopCard data={data} /> : <p className="text-black p-10">Componente HopCard no encontrado</p>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
