// components/Varieties.jsx
import Image from 'next/image';
import LupuloCard from './LupuloCard';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function getHops() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/lupulo-cards?populate=*`, {
      next: { revalidate: 60 }
    });
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function Varieties() {
  const hops = await getHops();

  return (
    // CORRECCIÓN 1: Eliminado 'overflow-hidden' y agregado 'relative'
    <section id="varieties" className="relative bg-amber-700 text-gray-100 py-20 px-[5%] min-h-screen flex flex-col items-center">
      
      {/* Fondo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Fondo"
          fill
          className="object-cover opacity-5"
          quality={50}
        />
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md text-center">
          Variedades de Lúpulo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-10">
          {hops.length === 0 && (
            <div className="col-span-full text-center text-white">No hay variedades.</div>
          )}

          {hops.map((hop) => (
            <LupuloCard key={hop.id} data={hop} />
          ))}
        </div>
      </div>
    </section>
  );
}
