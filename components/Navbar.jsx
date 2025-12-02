// components/Navbar.jsx
'use client'; // <-- Esta línea se mantiene porque usamos efectos hover y otros comportamientos de cliente (aunque sin useState)

import React from 'react';
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
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand">
          <Image
            src="/images/logo-lupulos-rio-negro.png"
            alt="Logo Lúpulos Río Negro"
            width={140} // Tamaño del logo para escritorio
            height={140} // Tamaño del logo para escritorio
            className="navbar-logo"
            priority={true}
          />
          <div className="brand-text-container">
            <span className="brand-text">Lúpulos Río Negro</span>
            <span className="brand-subtitle">Patagonia Argentina</span>
          </div>
        </a>

        {/* Menú de navegación principal (visible solo en escritorio) */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .navbar {
          width: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          padding: 15px 5%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between; /* Para separar el logo de los enlaces */
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
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

        /* --- Menú de escritorio --- */
        .nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex; /* Visible por defecto en escritorio */
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

        /* --- Media Queries para celulares --- */
        @media (max-width: 768px) {
          .navbar-container {
            justify-content: center; /* Centra el logo+texto en móviles */
            /* padding: 0 5%; */ /* Mantener si quieres ajustar padding */
          }

          .navbar-logo {
            margin-right: 15px; /* Menos espacio en móviles */
            width: 80px; /* Tamaño más pequeño para móviles */
            height: 80px; /* Tamaño más pequeño para móviles */
          }
          
          .brand-text {
            font-size: 1em; /* Reducir tamaño del texto en móvil */
          }
          .brand-subtitle {
            font-size: 0.6em; /* Reducir tamaño del subtítulo en móvil */
          }

          /* Ocultar el menú de navegación completo en móviles */
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
