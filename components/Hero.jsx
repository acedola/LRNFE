'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://striking-bee-a1b63d1ef8.strapiapp.com';
const API_URL = `${API_BASE_URL}/api`;

function Hero() {
  const [inicio, setInicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/inicios`);
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Failed to fetch`);
        }
        
        const data = await res.json();
        setInicio(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching hero data:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, []);

  if (loading) {
    return (
      <section className="hero-section">
        <div className="hero-content">
          <div className="loading-spinner">
            <p>Cargando...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="hero-section">
        <div className="hero-content">
          <div className="error-message">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Acceder a los datos del array
  const heroData = inicio?.data?.[0];

  // Datos por defecto en caso de que no haya datos
  const defaultTitle = "Cultivo de Lúpulo";
  const defaultSubtitle = "Productos naturales de la más alta calidad";

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background-overlay"></div>
      <Image
        src="/images/fondo.png"
        alt="Cultivo de Lúpulo"
        fill={true}
        style={{ objectFit: 'cover' }}
        quality={90}
        priority={true}
        className="hero-background-image"
      />
      <div className="hero-content">
        <h1 className="hero-title">
          {heroData?.titulo || defaultTitle}
        </h1>
        <p className="hero-subtitle">
          {heroData?.presentacion || defaultSubtitle}
        </p>
        <a href="#products" className="btn-primary">
          Conocer productos
        </a>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          color: var(--color-text-light);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-background-image {
          z-index: 1;
        }

        .hero-background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          max-width: 900px;
          padding: 20px;
        }

        .hero-title {
          font-size: 3.8em;
          margin-bottom: 20px;
          line-height: 1.1;
          font-weight: bold;
          color: var(--color-accent-green);
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
        }

        .hero-subtitle {
          font-size: 1.8em;
          margin-bottom: 40px;
          color: var(--color-text-light);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3em;
          }
          .hero-subtitle {
            font-size: 1.5em;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5em;
          }
          .hero-subtitle {
            font-size: 1.2em;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2em;
          }
          .hero-subtitle {
            font-size: 1em;
          }
          .btn-primary {
            padding: 12px 25px;
            font-size: 1em;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;