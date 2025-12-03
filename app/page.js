// app/page.js

import Hero from '../components/Hero';
import About from '../components/About';
import Varieties from '../components/Varieties';
import Products from '../components/Products';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import MapComponent from'../components/MapComponent'

// Si agregas testimonios y ubicación, impórtalos aquí

export default function HomePage() {
  return (
    <>
      
      <main>
        <Hero />
        <Varieties />
        <Products />
        <About />
        <Gallery />
        <Contact />
        <MapComponent />
      </main>
      {/* Puedes añadir un footer aquí */}
      <footer style={{
        backgroundColor: '#111',
        color: '#ccc',
        textAlign: 'center',
        padding: '20px',
        fontSize: '0.9em',
        marginTop: 'auto' // Para que el footer se quede abajo
      }}>
        <p>&copy; {new Date().getFullYear()} Lupulos Rio Negro. Todos los derechos reservados.</p>
        <p>Producido con pasión en la Patagonia Argentina.</p>
      </footer>
    </>
  );
}
