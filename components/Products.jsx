'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL;
  console.log('Fetching from:', `${STRAPI_BASE}/api/productos-derivados?populate=*`);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${STRAPI_BASE}/api/productos-derivados?populate=*`);
        const json = await res.json();
        
        if (json.data) {
          setProducts(json.data);
        }
      } catch (error) {
        console.error("Error al cargar productos derivados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [STRAPI_BASE]);

  return (
    <section id="products" className="relative bg-[#8B0000] text-gray-100 min-h-screen flex flex-col justify-center items-center text-center py-20 px-4 overflow-hidden">
      
      {/* --- Capa de fondo (Logo marca de agua) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Lúpulos Río Negro Fondo"
          fill
          className="object-cover opacity-5"
          sizes="100vw"
        />
      </div>

      {/* --- Contenido Principal --- */}
      <div className="relative z-10 w-full max-w-7xl">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Productos Derivados
        </h2>
        
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
          Más allá de la flor, exploramos todas las posibilidades que el lúpulo nos ofrece. Descubre nuestra línea de productos únicos.
        </p>

        {/* --- Grid de Productos --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {loading && (
            <div className="col-span-full text-center text-white/70 animate-pulse">
              Cargando productos...
            </div>
          )}

          {!loading && products.length > 0 && products.map((product) => {
            const imgData = product.imagen;
            const rawImgUrl = imgData?.formats?.large?.url || imgData?.url || null;

            let imgUrl = '/images/placeholder.jpg';
            if (rawImgUrl) {
              imgUrl = rawImgUrl.startsWith('http') ? rawImgUrl : `${STRAPI_BASE}${rawImgUrl}`;
            }

            return (
              <div 
                key={product.id} 
                className="bg-[#2a2a2a] rounded-xl shadow-2xl p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative w-full h-64 mb-5 overflow-hidden rounded-lg">
                  <Image
                    src={imgUrl}
                    alt={product.titulo || 'Producto derivado'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <h3 className="text-[#4ade80] text-2xl font-bold mb-4 font-serif">
                  {product.titulo}
                </h3>
                
                <p className="text-gray-300 text-sm md:text-base mb-6 flex-grow">
                  {product.descripcion}
                </p>

                <a 
                  href="#contact" 
                  className="mt-auto px-6 py-2 border border-[#4ade80] text-[#4ade80] rounded-md font-bold hover:bg-[#4ade80] hover:text-[#1a1a1a] transition-all duration-300"
                >
                  Quiero más info
                </a>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
