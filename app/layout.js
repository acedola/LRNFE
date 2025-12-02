
// app/layout.js
import './globals.css'; // Importa tus estilos globales

export const metadata = {
  title: 'Chacra [Nombre] – Productores de Lúpulo Patagónico',
  description: 'Variedades premium de lúpulo, productos derivados y pasión por la calidad desde la Patagonia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
