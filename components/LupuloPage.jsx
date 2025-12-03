// app/lupulos/page.jsx (o donde tengas esta página)
import HopCard from '../components/HopCard';

// Definimos la URL fuera para mantener limpieza
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://striking-bee-a1b63d1ef8.strapiapp.com';

// Función para obtener datos en el servidor
async function getHops() {
  try {
    // Revalidate: 60 segundos (ISG)
    const res = await fetch(`${STRAPI_URL}/api/lupulo-cards?populate=*`, {
      next: { revalidate: 60 } 
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching hops:", error);
    return null; // Retornamos null para manejar el error en la UI
  }
}

export default async function LupuloPage() {
  const hops = await getHops();

  // Caso de Error en la carga
  if (hops === null) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-red-900/20 p-8 rounded-xl border border-red-700/50">
          <h2 className="text-red-400 text-xl font-bold mb-2">Error de conexión</h2>
          <p className="text-gray-300 mb-4">No pudimos cargar las variedades. Por favor verifica tu conexión.</p>
          <a href="/" className="text-white underline hover:text-red-300">Volver al inicio</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Catálogo de <span className="text-emerald-500">Lúpulos</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Explora en detalle las características técnicas de nuestras variedades.
        </p>
      </header>
      
      {hops.length > 0 ? (
        <div className="max-w-5xl mx-auto space-y-12">
          {hops.map((hop) => (
            // Envolvemos cada HopCard en un contenedor con diseño
            <div 
              key={hop.id} 
              className="bg-[#222] rounded-2xl overflow-hidden shadow-xl border border-white/5 hover:border-emerald-500/30 transition-colors duration-300"
            >
              {/* Renderizamos el componente de detalle directamente */}
              <div className="p-2 md:p-6">
                <HopCard data={hop} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center text-gray-400">
          <div className="bg-white/5 p-8 rounded-full mb-4">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <p className="text-xl">No hay variedades disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
}
