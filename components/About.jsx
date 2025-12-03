// components/About.jsx
import Image from 'next/image';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Función robusta para obtener URL de imágenes
const getImageUrl = (imageEntry) => {
  if (!imageEntry) return null;

  // A veces Strapi devuelve el objeto directo, a veces dentro de attributes
  const imgData = imageEntry.attributes || imageEntry;
  
  // Priorizar formatos optimizados (medium/small)
  const format = imgData.formats?.medium || imgData.formats?.small;
  const url = format?.url || imgData.url;

  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`;
};

// Fetch de datos en el servidor
async function getAboutData() {
  try {
    // Cacheamos por 60 segundos
    const res = await fetch(`${STRAPI_BASE_URL}/api/abouts?populate=*`, { 
      next: { revalidate: 60 } 
    });

    if (!res.ok) throw new Error('Error fetching data');

    const json = await res.json();
    
    // Normalizamos la respuesta para facilitar el uso
    // Si es un array, tomamos el primero.
    const rawData = Array.isArray(json.data) ? json.data[0] : json.data;
    
    // Si no hay datos, retornamos null
    if (!rawData) return null;

    // Retornamos los atributos limpios
    return rawData.attributes || rawData;
  } catch (error) {
    console.error("Error en About:", error);
    return null;
  }
}

export default async function About() {
  const data = await getAboutData();

  // Estado de carga/error manejado silenciosamente o con fallback
  if (!data) {
    return null; // O un componente vacío si prefieres no mostrar nada si falla
  }

  const galeria = data.imagenes?.data || data.imagenes || [];

  return (
    // Usamos bg-[#006400] para mantener tu color "Dark Green" original
    <section id="about" className="relative bg-[#006400] text-white py-24 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-center">
      
      {/* --- FONDO --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Fondo decorativo"
          fill
          className="object-cover"
          quality={50}
        />
      </div>

      {/* --- CONTENIDO --- */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center drop-shadow-md border-b-4 border-green-400 pb-2">
          Sobre la Chacra
        </h2>

        {/* Texto Descriptivo */}
        {data.nosotros && (
          <div className="max-w-3xl text-lg leading-relaxed text-gray-100 mb-16 space-y-6 text-justify md:text-center font-light">
            {data.nosotros.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Galería de Imágenes */}
        {galeria.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {galeria.map((img, index) => {
              const imageUrl = getImageUrl(img);
              if (!imageUrl) return null;

              return (
                <div 
                  key={index} 
                  className="group relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-black/20 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-green-900/50"
                >
                  <Image
                    src={imageUrl}
                    alt="Imagen de la chacra"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Brillo al pasar el mouse */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <p className="text-gray-300 italic">Imágenes próximamente.</p>
          </div>
        )}

      </div>
    </section>
  );
}
