// components/Contact.jsx
'use client'; // <-- Asegurado

import React, { useState } from 'react';
import Image from 'next/image'; // Importar Image para el fondo

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', whatsapp: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      {/* Capa de fondo con el logo como marca de agua */}
      <div className="contact-background-overlay">
        <Image
          src="/images/logo-lupulos-rio-negro.png" // Tu logo aquí
          alt="Lúpulos Río Negro Fondo"
          fill={true}
          style={{ objectFit: 'cover', opacity: 0.05 }} // Cubre todo el fondo con baja opacidad
          sizes="(max-width: 768px) 100vw, 50vw" // Ayuda a Next.js a optimizar para diferentes tamaños
        />
      </div>

      {/* Contenido de la sección "Contacto" */}
      <h2>Contacto</h2>
      <p>¿Interesado en nuestros productos o quieres conocer más sobre la Chacra [Nombre]? ¡Contáctanos!</p>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Tu Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="whatsapp"
            placeholder="Tu WhatsApp (opcional)"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tu Mensaje..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn-primary">
            Enviar Mensaje
          </button>
        </form>

        <div className="social-buttons">
          <a
            href="https://wa.me/TUNUMERO"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a
            href="https://www.instagram.com/TUUSUARIO"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-instagram"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="mailto:TUEMAIL@DOMINIO.COM"
            className="btn-email"
          >
            <i className="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
      <style jsx>{`
        .contact-section {
          position: relative;
          background-color: #2C3E50; /* ¡NUEVO COLOR AZUL OSCURO! */
          color: var(--color-text-light);
          overflow: hidden;
          padding: 80px 5%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .contact-background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-section h2,
        .contact-section p,
        .contact-container {
          position: relative;
          z-index: 1;
        }

        .contact-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 50px;
          margin-top: 40px;
          max-width: 1000px;
          width: 100%;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          min-width: 300px;
          max-width: 500px;
          background-color: #2a2a2a; /* Puedes ajustar este color también si deseas */
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .contact-form input,
        .contact-form textarea {
          padding: 15px;
          border-radius: 5px;
          border: 1px solid #444;
          background-color: #333; /* Puedes ajustar este color también si deseas */
          color: var(--color-text-light);
          font-size: 1em;
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: #bbb;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: var(--color-accent-green);
          box-shadow: 0 0 0 2px rgba(139, 195, 74, 0.5);
        }

        .social-buttons {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          min-width: 250px;
          max-width: 300px;
          justify-content: center;
        }

        .social-buttons a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 25px;
          border-radius: 5px;
          font-weight: bold;
          font-size: 1.1em;
          transition: transform 0.2s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }

        .social-buttons a:hover {
          transform: translateY(-3px);
        }

        .social-buttons i {
          margin-right: 10px;
        }

        .btn-whatsapp {
          background-color: #25d366;
          color: white;
        }

        .btn-instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          color: white;
        }

        .btn-email {
          background-color: #D44638;
          color: white;
        }
      `}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </section>
  );
}
