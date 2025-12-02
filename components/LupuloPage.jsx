'use client';
import { useEffect, useState } from 'react';
import HopCard from '../components/HopCard';

export default function LupuloPage() {
  const [hops, setHops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHops = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://striking-bee-a1b63d1ef8.strapiapp.com'}/api/lupulo-cards?populate=*`
        );
        const data = await response.json();
        setHops(data.data || []);
      } catch (error) {
        console.error("Error fetching hops:", error);
        setError("No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchHops();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Variedades de Lúpulo
      </h1>
      
      {hops.length > 0 ? (
        <div className="max-w-6xl mx-auto space-y-6">
          {hops.map((hop) => (
            <div key={hop.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <HopCard data={hop} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p>No hay variedades disponibles.</p>
        </div>
      )}
    </div>
  );
}