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
  { name: 'Visítanos', href: '#mapa', isButton: true }, 
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando abre menú
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] border-b border-white/10 transition-all duration-300 
        ${scrolled ? 'bg-black/95 shadow-xl h-20 md:h-28' : 'bg-black/80 backdrop-blur-md h-24 md:h-32'}
        `}
      >
        <div className="w-full h-full max-w-7xl mx-auto px-4 flex items-center justify-between relative">
          
          {/* LOGO (z-index alto para que siempre se pueda clickear) */}
          <a href="#hero" className="flex items-center gap-3 group h-full py-2 relative z-[101]">
            <div className={`relative transition-all duration-300 flex-shrink-0 ${scrolled ? 'w-14 h-14 md:w-20 md:h-20' : 'w-16 h-16 md:w-28 md:h-28'}`}>
              <Image
                src="/images/logo-lupulos-rio-negro.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-green-400 text-sm md:text-xl leading-tight">
                Lúpulos Río Negro
              </span>
            </div>
          </a>

          {/* MENÚ ESCRITORIO */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className={
                    link.isButton 
                    ? "bg-green-700 hover:bg-green-600 text-white px-5 py-2 rounded-full font-bold transition-all shadow-md"
                    : "relative text-gray-100 text-base font-medium py-2 hover:text-green-400 group transition-colors"
                  }
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* BOTÓN HAMBURGUESA (z-index extremo para asegurar click) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-100 p-2 relative z-[102] active:bg-white/10 rounded-md"
            aria-label="Abrir menú"
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

        {/* --- MENÚ MÓVIL (Overlay y Panel) --- */}
        
        {/* Fondo oscuro (Backdrop) */}
        <div 
          className={`fixed inset-0 bg-black/80 z-[90] transition-opacity duration-300 md:hidden ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Panel Lateral */}
        <div 
          className={`fixed top-0 right-0 h-screen w-[80%] bg-[#1a1a1a] z-[95] shadow-2xl transform transition-transform duration-300 ease-out md:hidden border-l border-white/10 pt-24 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
           <ul className="flex flex-col px-6 space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={`block py-4 text-lg border-b border-white/5 ${
                    link.isButton 
                    ? "text-green-400 font-bold border-green-500/50 border rounded-lg mt-4 text-center bg-green-900/20" 
                    : "text-gray-200 active:text-green-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="h-24 md:h-32 w-full" aria-hidden="true"></div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 6rem; 
        }
      `}</style>
    </>
  );
}

