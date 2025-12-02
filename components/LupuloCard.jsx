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

  // Manejo seguro de la URL de la imagen
  const getImageUrl = () => {
    if (!data.imagen) return '/placeholder-hop.png';
    
    // Si la URL ya es completa (comienza con http)
    if (data.imagen.url?.startsWith('http')) {
      return data.imagen.url;
    }
    
    // Si es una ruta relativa, construirla con la base
    const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || '';
    if (data.imagen.url?.startsWith('/')) {
      return `${STRAPI_BASE}${data.imagen.url}`;
    }
    
    // Intentar con formats si están disponibles
    if (data.imagen.formats?.medium?.url) {
      const mediumUrl = data.imagen.formats.medium.url;
      if (mediumUrl.startsWith('http')) return mediumUrl;
      if (mediumUrl.startsWith('/')) return `${STRAPI_BASE}${mediumUrl}`;
    }
    
    return '/placeholder-hop.png';
  };

  const imageUrl = getImageUrl();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setShowModal(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setShowModal(false);
  };

  return (
    <>
      {/* --- TARJETA PRINCIPAL --- */}
      <div className="relative bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 text-center flex flex-col items-center h-full border border-gray-700/50">
        
        {/* Contenedor de imagen */}
        <div className="relative w-full h-48 mb-5 bg-white rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={data.Variedad || 'Lúpulo'}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
        
        {/* Nombre de la variedad */}
        <h3 className="text-emerald-400 text-2xl font-serif uppercase mb-5">
          {data.Variedad}
        </h3>
        
        {/* Botones */}
        <div className="flex flex-col gap-3 w-full mt-auto">
          <button
            onClick={openModal}
            className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
          >
            Explorar
          </button>
          
          <a
            href="#contact"
            className="w-full border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-300 text-center no-underline"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>

      {/* --- MODAL CON PORTAL --- */}
      {mounted && showModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          
          {/* Overlay clickeable para cerrar */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={closeModal}
            aria-label="Cerrar modal"
          ></div>

          {/* Contenido del Modal */}
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl z-[10000] animate-fade-in">
            
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[10001] bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            {/* Contenido del HopCard */}
            <div className="p-4 md:p-6">
              <HopCard data={data} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}