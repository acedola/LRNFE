// components/Varieties.jsx
'use client';

import { useState, useEffect } from 'react';
import LupuloCard from './LupuloCard';
import Image from 'next/image';

export default function Varieties() {
  const [hops, setHops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchHops = async () => {
      try {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
        
        const res = await fetch(`${STRAPI_URL}/api/lupulo-cards?populate=*`);
        const json = await res.json();

        if (json.data) {
          setHops(json.data);
        }
      } catch (error) {
        console.error('Error cargando lúpulos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHops();
  }, []);

  return (
    <section id="varieties" className="relative bg-amber-700 text-gray-100 overflow-hidden py-20 px-[5%] min-h-screen flex flex-col justify-center items-center text-center">
      {/* --- Capa de fondo --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Lúpulos Río Negro Fondo"
          fill
          className="object-cover opacity-5"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* --- Contenido --- */}
      <h2 className="text-4xl md:text-5xl mb-4 text-white relative z-10">
        Variedades de Lúpulo
      </h2>
      <p className="relative z-10 mb-8">
        {/* Texto descriptivo opcional */}
      </p>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl w-full">
        {loading && (
          <div className="col-span-full flex justify-center">
            <div className="text-white text-lg animate-pulse">
              Cargando variedades...
            </div>
          </div>
        )}

        {!loading && hops.length > 0 ? (
          hops.map((hop) => (
            <LupuloCard key={hop.id} data={hop} />
          ))
        ) : (
          !loading && hops.length === 0 && (
            <div className="col-span-full text-center">
              <p className="text-gray-300 text-lg">
                No hay variedades disponibles en este momento.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}