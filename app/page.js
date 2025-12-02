// app/page.js
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Varieties from '../components/Varieties';
import Products from '../components/Products';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

// Si agregas testimonios y ubicación, impórtalos aquí

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Varieties />
        <Products />
        <Gallery />
        {/* Aquí irían Testimonios y Ubicación si los implementas */}
        <Contact />
        
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
