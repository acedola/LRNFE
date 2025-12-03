// components/Hero.jsx
import Image from 'next/image';

// URL de la API (Directamente en el cuerpo del archivo o config)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://striking-bee-a1b63d1ef8.strapiapp.com';
const API_URL = `${API_BASE_URL}/api`;

// Función para obtener datos en el servidor
async function getHeroData() {
  try {
    // 'no-store' para datos en tiempo real, o 'force-cache' si cambian poco
    const res = await fetch(`${API_URL}/inicios`, { next: { revalidate: 60 } });
    
    if (!res.ok) return null;
    
    const json = await res.json();
    return json.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export default async function Hero() {
  // 1. Obtenemos los datos en el servidor (paralelo a la renderización)
  const heroData = await getHeroData();

  // 2. Datos por defecto (Fallback instantáneo)
  const title = heroData?.titulo || "Cultivo de Lúpulo";
  const subtitle = heroData?.presentacion || "Productos naturales de la más alta calidad";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* 
         OPTIMIZACIÓN DE IMAGEN:
         1. priority={true}: Le dice al navegador que descargue esto PRIMERO.
         2. sizes: Crucial para performance. Dice qué tamaño bajar según la pantalla.
         3. quality={85}: 90 es muy pesado visualmente casi idéntico a 85.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fondo.png"
          alt="Cultivo de Lúpulo"
          fill
          className="object-cover"
          quality={75}
          priority={true}
          sizes="100vw"
          placeholder="empty" // Si tienes una versión pequeña base64 usa "blur"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* CONTENIDO */}
      <div className="relative z-20 max-w-4xl px-6 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-green-400 drop-shadow-lg leading-tight">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-100 drop-shadow-md font-light">
          {subtitle}
        </p>
        
        <a 
          href="#products" 
          className="inline-block bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 text-lg"
        >
          Conocer productos
        </a>
      </div>
    </section>
  );
}
