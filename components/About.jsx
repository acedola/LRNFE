'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const apiUrl = `${STRAPI_BASE_URL}/api/abouts?populate=*`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
           throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setAboutData(data);
        setError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        setError('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadAboutData();
  }, []);

  // --- LÓGICA DE DATOS (Strapi v4) ---
  const rawData = Array.isArray(aboutData?.data) 
    ? aboutData?.data?.[0] 
    : aboutData?.data;
    
  const aboutAttributes = rawData?.attributes || rawData; 
  const galeriaData = aboutAttributes?.imagenes?.data || aboutAttributes?.imagenes || [];

  // --- RENDERIZADO ---

  if (loading) return <div className="about-section"><p>Cargando información...</p></div>;
  if (error) return <div className="about-section"><p>{error}</p></div>;
  if (!aboutAttributes) return <div className="about-section"><p>No se encontró información.</p></div>;

  return (
    <section id="about" className="about-section">
      
      {/* Fondo */}
      <div className="about-background-overlay">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Lúpulos Río Negro Fondo"
          fill={true}
          style={{ objectFit: 'cover', opacity: 0.05 }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <h2>Sobre la Chacra</h2>
      
      {/* Texto dinámico */}
      {aboutAttributes.nosotros ? (
        <div className="about-text">
          {aboutAttributes.nosotros.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="about-text"><p>No hay contenido disponible.</p></div>
      )}

      {/* Galería */}
      {galeriaData.length > 0 ? (
        <div className="image-grid">
          {galeriaData.map((image) => {
            const imgAttrs = image.attributes || image;
            const imagePath = imgAttrs.url; 
            
            // --- INICIO DE LA CORRECCIÓN ---
            let imageUrl;

            // 1. Verificamos si Strapi ya nos dio la dirección completa
            if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
                // Si ya tiene http, la usamos tal cual (Strapi Cloud)
                imageUrl = imagePath;
            } else {
                // Si no tiene http, es una ruta local, le pegamos el dominio (Strapi Local)
                imageUrl = `${STRAPI_BASE_URL}${imagePath}`;
            }
            // --- FIN DE LA CORRECCIÓN ---

            return (
              <div key={image.id} className="image-container">
                <Image 
                  src={imageUrl}
                  alt={imgAttrs.alternativeText || imgAttrs.name || "Imagen de la chacra"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No hay imágenes disponibles</p>
      )}


      {/* ESTILOS CSS */}
      <style jsx>{`
        .about-section {
          position: relative;
          background-color: #006400;
          color: white;
          overflow: hidden;
          padding: 80px 5%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .about-background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .about-section h2,
        .about-section p,
        .image-grid {
          position: relative;
          z-index: 1;
        }

        .about-text {
          max-width: 800px;
          margin: 0 auto;
        }

        .about-text p {
          margin-bottom: 1.5em;
          line-height: 1.6;
          text-align: left;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 40px;
          width: 100%;
          max-width: 1000px;
        }

        .image-container {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          aspect-ratio: 3/2;
        }

        .image-container:hover {
          transform: translateY(-5px);
        }

        .error-message {
          color: #ff6b6b;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .image-grid {
            grid-template-columns: 1fr;
          }
          
          .about-text p {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}



     