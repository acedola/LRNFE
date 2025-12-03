// components/Navbar.jsx - VERSIÓN CORREGIDA Y COMPLETA
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const navLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Chacra', href: '#about' },
  { name: 'Variedades', href: '#varieties' }, 
  { name: 'Productos', href: '#products' },
  { name: 'Galería', href: '#gallery' },
  { name: 'Contacto', href: '#contact' },
];

export default function Navbar() {
  const navbarRef = useRef(null);

  useEffect(() => {
    // SOLUCIÓN INFALIBLE
    const forcePadding = () => {
      const navbar = navbarRef.current;
      if (!navbar) return;
      
      const height = navbar.offsetHeight;
      console.log('Altura del navbar:', height);
      
      // Método 1: Directamente al body
      document.body.style.paddingTop = `${height}px`;
      
      // Método 2: Usar CSS importante
      const style = document.createElement('style');
      style.id = 'navbar-padding-fix';
      style.innerHTML = `
        body {
          padding-top: ${height}px !important;
        }
        html {
          scroll-padding-top: ${height}px !important;
        }
        main, #__next, .main-content {
          padding-top: ${height}px !important;
        }
      `;
      
      // Remover estilo anterior si existe
      const existingStyle = document.getElementById('navbar-padding-fix');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
      
      document.head.appendChild(style);
      
      // Método 3: También agregar a posibles contenedores principales
      const mainElement = document.querySelector('main') || document.querySelector('#__next') || document.body;
      mainElement.style.paddingTop = `${height}px`;
    };

    // Ejecutar inmediatamente
    forcePadding();
    
    // Ejecutar después de que todo esté renderizado
    setTimeout(forcePadding, 100);
    setTimeout(forcePadding, 500);
    
    // También ejecutar en resize
    window.addEventListener('resize', forcePadding);
    
    return () => {
      window.removeEventListener('resize', forcePadding);
      const style = document.getElementById('navbar-padding-fix');
      if (style) {
        document.head.removeChild(style);
      }
      document.body.style.paddingTop = '';
    };
  }, []);

  return (
    <>
      {/* WRAPPER para asegurar que todo funcione */}
      <div style={{ position: 'relative', zIndex: 9999 }}>
        <nav 
          ref={navbarRef}
          className="navbar"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
          }}
        >
          <div className="navbar-container">
            <a href="#hero" className="navbar-brand">
              <Image
                src="/images/logo-lupulos-rio-negro.png"
                alt="Logo Lúpulos Río Negro"
                width={140}
                height={140}
                className="navbar-logo"
                priority={true}
              />
              <div className="brand-text-container">
                <span className="brand-text">Lúpulos Río Negro</span>
                <span className="brand-subtitle">Patagonia Argentina</span>
              </div>
            </a>

            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        {/* SPACER DIV - Método infalible */}
        <div 
          id="navbar-spacer" 
          style={{
            height: '80px',
            display: 'block',
            width: '100%',
          }}
        />
      </div>

      {/* ESTILOS CON MÁXIMA PRIORIDAD */}
      <style jsx global>{`
        /* !!! ESTILOS GLOBALES CON !important !!! */
        body, html {
          padding-top: 80px !important;
          margin-top: 0 !important;
        }
        
        /* Asegurar que el primer elemento después del navbar tenga margen */
        body > *:first-child:not(.navbar):not(#navbar-spacer) {
          margin-top: 10px !important;
        }
        
        /* Estilos específicos para secciones de anclaje */
        section[id], div[id] {
          scroll-margin-top: 0px !important;
        }
        
        /* Asegurar que el navbar esté siempre encima */
        .navbar {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 9999 !important;
          background-color: rgba(0, 0, 0, 0.8) !important;
        }
        
        /* El resto de tus estilos originales */
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 15px 5%;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          color: var(--color-text-light);
          text-decoration: none;
        }

        .navbar-logo {
          margin-right: 30px;
          flex-shrink: 0;
        }

        .brand-text-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }

        .brand-text {
          font-size: 1.4em;
          color: var(--color-accent-green);
          font-weight: bold;
          white-space: nowrap;
        }

        .brand-subtitle {
          font-size: 0.8em;
          color: var(--color-text-light);
          white-space: nowrap;
        }

        .nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          color: var(--color-text-light);
          font-size: 1.1em;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-links a:hover {
          color: var(--color-accent-green);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--color-accent-green);
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          body, html {
            padding-top: 60px !important;
          }
          
          #navbar-spacer {
            height: 60px !important;
          }
          
          .navbar-container {
            justify-content: center;
            padding: 10px 5%;
          }

          .navbar-logo {
            margin-right: 15px;
            width: 80px;
            height: 80px;
          }
          
          .brand-text {
            font-size: 1em;
          }
          
          .brand-subtitle {
            font-size: 0.6em;
          }

          .nav-links {
            display: none;
          }
          
          section[id], div[id] {
            scroll-margin-top: 60px !important;
          }
        }
      `}</style>
    </>
  );
}