// components/Products.jsx
import Image from 'next/image';

// Definimos la URL base (asegúrate de tener esta variable en tu .env.local)
const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Función auxiliar para resolver la URL de la imagen de Strapi
const getStrapiUrl = (imageData) => {
  if (!imageData) return '/images/placeholder.jpg'; // Imagen por defecto si no hay nada
  
  const url = imageData.formats?.medium?.url || imageData.url;
  
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_BASE}${url}`;
};

// Función para obtener datos en el servidor
async function getProducts() {
  try {
    // Revalidate: 60 -> Actualiza los datos cada 60 segundos (Incremental Static Regeneration)
    const res = await fetch(`${STRAPI_BASE}/api/productos-derivados?populate=*`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Error fetching products');
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error al cargar productos derivados:", error);
    return []; // Retornamos array vacío para no romper la página
  }
}

export default async function Products() {
  // 1. Los datos se cargan antes de renderizar el HTML
  const products = await getProducts();

  return (
    <section id="products" className="relative bg-[#8B0000] text-gray-100 min-h-screen flex flex-col justify-center items-center text-center py-20 px-4 overflow-hidden">
      
      {/* --- Capa de fondo (Logo marca de agua) --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Nota: Opción de calidad baja para fondos decorativos */}
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Fondo decorativo"
          fill
          className="object-cover opacity-5"
          sizes="100vw"
          quality={50} 
        />
      </div>

      {/* --- Contenido Principal --- */}
      <div className="relative z-10 w-full max-w-7xl">
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
          Productos Derivados
        </h2>
        
        <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
          Más allá de la flor, exploramos todas las posibilidades que el lúpulo nos ofrece. Descubre nuestra línea de productos únicos.
        </p>

        {/* --- Grid de Productos --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Caso: No hay productos */}
          {products.length === 0 && (
            <div className="col-span-full p-10 bg-black/20 rounded-lg">
              <p className="text-xl text-gray-300">Próximamente nuevos productos.</p>
            </div>
          )}

          {/* Mapeo de productos */}
          {products.map((product) => {
            const imageUrl = getStrapiUrl(product.imagen);

            return (
              <div 
                key={product.id} 
                className="group bg-[#2a2a2a] rounded-xl shadow-xl p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/5"
              >
                {/* Contenedor Imagen */}
                <div className="relative w-full h-64 mb-5 overflow-hidden rounded-lg bg-gray-800">
                  <Image
                    src={imageUrl}
                    alt={product.titulo || 'Producto derivado'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <h3 className="text-green-400 text-2xl font-bold mb-3 font-serif leading-tight">
                  {product.titulo}
                </h3>
                
                <p className="text-gray-300 text-sm md:text-base mb-6 flex-grow line-clamp-4">
                  {product.descripcion}
                </p>

                <a 
                  href="#contact" 
                  className="mt-auto px-8 py-2 border border-green-500 text-green-400 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300"
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
