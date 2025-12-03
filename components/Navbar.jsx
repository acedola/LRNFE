// components/Navbar.jsx
'use client';

import React, { useState } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 
        NAVBAR AJUSTADO (MÁS GRANDE)
        Mobile: h-24 (96px)
        Desktop: h-32 (128px) -> Si sigue siendo chico, cambia a h-36 o h-40
      */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 h-24 md:h-32 transition-all duration-300">
        <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LOGO Y MARCA */}
          <a href="#hero" className="flex items-center gap-5 group h-full py-2">
            {/* Contenedor del Logo: Controla el tamaño real de la imagen aquí */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0">
              <Image
                src="/images/logo-lupulos-rio-negro.png"
                alt="Logo Lúpulos Río Negro"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              {/* Texto agrandado */}
              <span className="text-xl md:text-2xl font-bold text-green-400 leading-tight group-hover:text-green-300 transition-colors">
                Lúpulos Río Negro
              </span>
              <span className="text-sm md:text-base text-gray-300 font-light tracking-wide">
                Patagonia Argentina
              </span>
            </div>
          </a>

          {/* ENLACES DE ESCRITORIO */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="relative text-gray-100 text-lg font-medium py-2 transition-colors hover:text-green-400 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* MENÚ HAMBURGUESA (Móvil) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-100 focus:outline-none p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú Móvil Desplegable (Opcional pero recomendado) */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-t border-white/10">
             <ul className="flex flex-col p-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="block py-3 text-gray-100 text-lg hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* 
        ESPACIADOR (SPACER)
        Debe tener la MISMA altura que el nav de arriba:
        h-24 (mobile) y md:h-32 (desktop)
      */}
      <div className="h-24 md:h-32 w-full" aria-hidden="true"></div>

      {/* Estilos globales para el scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          /* Padding debe coincidir con las alturas: 6rem = 96px, 8rem = 128px */
          scroll-padding-top: 6rem; 
        }
        @media (min-width: 768px) {
          html {
            scroll-padding-top: 8rem;
          }
        }
      `}</style>
    </>
  );
}
