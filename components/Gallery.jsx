// components/Gallery.jsx
import Image from 'next/image';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Función auxiliar para obtener la mejor URL de imagen disponible
const getImageUrl = (img) => {
  if (!img) return null;
  
  // Priorizamos formatos optimizados (large o medium) para la galería
  // para no descargar la imagen original de 20MB si existe una de 1000px
  const format = img.formats?.large || img.formats?.medium || img.formats?.small;
  const url = format?.url || img.url;
  
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`;
};

async function getGalleryData() {
  try {
    const apiUrl = `${STRAPI_BASE_URL}/api/galleries?populate=*`;
    // Cacheamos por 60 segundos
    const response = await fetch(apiUrl, { next: { revalidate: 60 } });

    if (!response.ok) return null;
    
    const json = await response.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error('Error loading gallery:', error);
    return null;
  }
}

export default async function Gallery() {
  const galleryContent = await getGalleryData();

  // Si no hay datos, mostramos un estado vacío elegante
  if (!galleryContent) {
    return (
      <section id="gallery" className="bg-black text-white min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-500">Galería no disponible momentáneamente.</p>
      </section>
    );
  }

  const galeriaFotos = galleryContent.fotos || [];

  return (
    <section id="gallery" className="relative bg-black text-white py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col items-center overflow-hidden">
      
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
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-md">
          Nuestra Chacra en Imágenes
        </h2>
        
        {/* Descripción */}
        {galleryContent.parrafo && (
          <div className="max-w-3xl text-lg md:text-xl text-gray-300 mb-12 space-y-4 font-light">
            {galleryContent.parrafo.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* GRID DE FOTOS */}
        {galeriaFotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {galeriaFotos.map((image) => {
              const imageUrl = getImageUrl(image);
              if (!imageUrl) return null;

              return (
                <div 
                  key={image.id} 
                  className="group relative h-72 md:h-80 w-full overflow-hidden rounded-xl bg-gray-900 shadow-lg border border-white/10"
                >
                  <Image
                    src={imageUrl}
                    alt={image.alternativeText || image.name || "Imagen de la chacra"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // Eliminamos 'unoptimized' para aprovechar la optimización de Next.js
                  />
                  
                  {/* Overlay al hacer hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 border border-white/10 rounded-lg">
            <p className="text-gray-400">No hay imágenes para mostrar.</p>
          </div>
        )}
        
      </div>
    </section>
  );
}
