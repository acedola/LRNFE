// components/Navbar.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Variedades', href: '#varieties' }, 
  { name: 'Productos', href: '#products' },
  { name: 'Chacra', href: '#about' },
  { name: 'Galería', href: '#gallery' },
  { name: 'Contacto', href: '#contact' },
  // Separamos el último para darle estilo de botón
  { name: 'Visítanos', href: '#mapa', isButton: true }, 
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para efectos visuales (opcional: achicar barra o aumentar sombra)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-all duration-300 
        ${scrolled ? 'bg-black/95 shadow-xl h-20 md:h-28' : 'bg-black/80 backdrop-blur-md h-24 md:h-32'}
        `}
      >
        <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* --- LOGO --- */}
          <a href="#hero" className="flex items-center gap-4 group h-full py-2 relative z-50">
            <div className={`relative transition-all duration-300 flex-shrink-0 ${scrolled ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-28 md:h-28'}`}>
              <Image
                src="/images/logo-lupulos-rio-negro.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className={`font-bold text-green-400 leading-tight group-hover:text-green-300 transition-all duration-300 ${scrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}`}>
                Lúpulos Río Negro
              </span>
              <span className="text-xs md:text-sm text-gray-300 font-light tracking-wide">
                Patagonia Argentina
              </span>
            </div>
          </a>

          {/* --- DESKTOP MENU --- */}
          {/* lg:gap-8 para pantallas grandes, md:gap-4 para tablets */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className={
                    link.isButton 
                    ? "bg-green-700 hover:bg-green-600 text-white px-5 py-2 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-green-500/30 transform hover:-translate-y-0.5"
                    : "relative text-gray-100 text-base lg:text-lg font-medium py-2 transition-colors hover:text-green-400 group"
                  }
                >
                  {link.name}
                  {!link.isButton && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ease-out group-hover:w-full"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* --- HAMBURGER BUTTON --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-100 focus:outline-none p-2 relative z-50 hover:text-green-400 transition-colors"
            aria-label="Menu"
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

        {/* --- MOBILE MENU OVERLAY --- */}
        {/* Fondo oscuro translúcido detrás del menú */}
        <div 
          className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)} // Click afuera cierra el menú
        />

        {/* --- MOBILE MENU PANEL --- */}
        <div 
          className={`md:hidden fixed top-0 right-0 h-full w-[75%] max-w-sm bg-[#1a1a1a] z-40 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-white/10 pt-28 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
           <ul className="flex flex-col px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`block py-3 text-xl border-b border-white/5 ${
                    link.isButton 
                    ? "text-green-400 font-bold mt-4 text-center border border-green-500 rounded-lg" 
                    : "text-gray-100 hover:text-green-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Decoración menú móvil */}
          <div className="absolute bottom-10 left-0 w-full text-center opacity-30">
            <Image 
               src="/images/logo-lupulos-rio-negro.png" 
               width={100} 
               height={100} 
               alt="Watermark" 
               className="mx-auto grayscale"
            />
          </div>
        </div>
      </nav>

      {/* SPACER (Mantiene el espacio para que no salte el contenido) */}
      {/* Altura dinámica basada en el estado inicial para evitar saltos (usamos la mayor) */}
      <div className="h-24 md:h-32 w-full" aria-hidden="true"></div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          /* Ajuste dinámico del scroll padding */
          scroll-padding-top: 7rem; 
        }
        @media (min-width: 768px) {
          html {
            scroll-padding-top: 9rem;
          }
        }
      `}</style>
    </>
  );
}
