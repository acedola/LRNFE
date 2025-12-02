'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function Gallery() {
  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadGalleryData() {
      try {
        // Asegúrate de que el populate trae 'fotos'
        const apiUrl = `${STRAPI_BASE_URL}/api/galleries?populate=*`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
             console.error(`Error HTTP: ${response.status}`);
             throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setGalleryData(data);
        setError(null);
      } catch (error) {
        setError('Error: ' + error.message);
      } finally {
        console.log('🏁 Finalizando loading');
        setLoading(false);
      }
    }
    loadGalleryData();
  }, []);

  // 1. Tu JSON tiene "data" como un array: [ { id: 2, ... } ]
  // Seleccionamos el primer elemento (índice 0).
  const galleryContent = galleryData?.data?.[0];

  // 2. Extraemos las fotos. En tu JSON el campo se llama "fotos" y es un array directo.
  const galeriaFotos = galleryContent?.fotos || [];

  if (loading) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="gallery-content"><p>Cargando información...</p></div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="error-message"><p>{error}</p></div>
      </section>
    );
  }

  if (!galleryContent) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="gallery-content"><p>No se encontró información.</p></div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-background-overlay">
        <Image
          src="/images/logo-lupulos-rio-negro.png"
          alt="Lúpulos Río Negro Fondo"
          fill={true}
          style={{ objectFit: 'cover', opacity: 0.05 }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <h2>Nuestra Chacra en Imágenes</h2>
      
      {/* 3. El campo de texto en tu JSON se llama "parrafo" */}
      {galleryContent?.parrafo ? (
        <div className="gallery-text">
          {galleryContent.parrafo.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="gallery-text">
          <p>No hay descripción disponible.</p>
        </div>
      )}

      {/* Galería de fotos */}
      {galeriaFotos.length > 0 ? (
        <div className="gallery-grid"> 
          {galeriaFotos.map((image) => {
            
            // 4. Lógica de URL basada en tu JSON (las propiedades están en la raíz del objeto image)
            const imagePath = image.url; 
            
            // Concatenar URL base si es relativa (/uploads/...)
            const imageUrl = imagePath.startsWith('http') 
                ? imagePath 
                : `${STRAPI_BASE_URL}${imagePath}`;

            return (
              <div key={image.id} className="gallery-item"> 
                <Image
                  src={imageUrl}
                  alt={image.alternativeText || image.name || "Imagen de la chacra"}
                  fill
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="gallery-image"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No hay imágenes disponibles</p>
      )}

      <style jsx>{`
        .gallery-section {
          position: relative;
          background-color: #000000;
          color: #ffffff;
          overflow: hidden;
          padding: 80px 5%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .gallery-background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .gallery-section h2,
        .gallery-text,
        .gallery-grid {
          position: relative;
          z-index: 1;
        }
        
        .gallery-text {
            margin-bottom: 30px;
            max-width: 800px;
            font-size: 1.1rem;
            line-height: 1.6;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 40px;
          max-width: 1200px;
          width: 100%;
        }

        .gallery-item {
          position: relative;
          height: 300px;
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
}
