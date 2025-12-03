
// app/layout.js
import './globals.css'; // Importa tus estilos globales
import Navbar from '../components/Navbar';
export const metadata = {
  title: 'Lupulos Rio Negro – Productores de Lúpulo Patagónico',
  description: 'Variedades premium de lúpulo, productos derivados y pasión por la calidad desde la Patagonia.',
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="es">
      
      <body> 
        <Navbar />
        {children}
      </body>
    </html>
  );
}
