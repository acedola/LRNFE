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

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  return (
    <>
      {/* --- TARJETA --- */}
      {/* CORRECCIÓN 1: md:hover:-translate-y-2 (Solo mueve en escritorio) */}
      <div className="group relative bg-[#2a2a2a] rounded-xl shadow-lg border border-white/10 p-0 flex flex-col h-full transition-all duration-300 md:hover:-translate-y-2 overflow-hidden">
        
        <div className="relative w-full h-64 overflow-hidden bg-gray-900">
          <Image
            src={imageUrl}
            alt={data.Variedad || 'Lúpulo'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] via-transparent to-transparent opacity-90"></div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow items-center text-center -mt-12 relative z-10">
          <h3 className="text-green-400 text-2xl font-serif font-bold uppercase mb-6 drop-shadow-md bg-[#2a2a2a]/90 px-4 py-1 rounded-full backdrop-blur-sm border border-white/5">
            {data.Variedad}
          </h3>
          
          <div className="flex flex-col gap-3 w-full mt-auto">
            {/* BOTÓN EXPLORAR */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evita conflictos de eventos
                setShowModal(true);
              }}
              type="button"
              // CORRECCIÓN 2: active:scale-95 para feedback táctil
              className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-md cursor-pointer z-20 hover:bg-green-600 active:bg-green-800 active:scale-95 transition-all duration-200 touch-manipulation"
            >
              Explorar
            </button>
            
            <a
              href="#contact"
              className="w-full border border-green-500 text-green-400 font-bold py-3 px-4 rounded-lg transition-all duration-200 no-underline z-20 hover:bg-green-500 hover:text-white active:scale-95"
            >
              Consultar
            </a>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {mounted && showModal && createPortal(
        // CORRECCIÓN 3: z-[99999] para estar ENCIMA del Navbar (que es 100)
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl z-[100000]">
            {/* Botón Cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="sticky top-4 float-right right-4 bg-red-600 text-white p-2 rounded-full z-50 hover:scale-110 transition-transform shadow-lg"
              style={{ marginRight: '10px', marginTop: '10px' }}
            >
              <X size={24} />
            </button>

            <div className="p-2 md:p-4 pt-12 md:pt-4"> {/* Padding top extra en móvil para la X */}
              <HopCard data={data} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
