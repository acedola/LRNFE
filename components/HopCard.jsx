// components/HopCard.jsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Radar as RadarComponent,
} from 'recharts';

const HopCard = ({ data }) => {
  const [imgError, setImgError] = useState(false);

  if (!data) return null;

  // Función para obtener la URL correcta de la imagen
  const getImageUrl = () => {
    if (imgError) return '/images/placeholder-hop.png';
    
    // Si ya tenemos una URL completa (empieza con http)
    if (data.imagen?.url?.startsWith('http')) {
      return data.imagen.url;
    }
    
    // Si tenemos formatos con URL completa
    if (data.imagen?.formats?.medium?.url?.startsWith('http')) {
      return data.imagen.formats.medium.url;
    }
    
    // Si es una ruta relativa, construir la URL completa
    const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || '';
    if (data.imagen?.url?.startsWith('/')) {
      return `${STRAPI_BASE}${data.imagen.url}`;
    }
    
    // Intentar con formatos en ruta relativa
    if (data.imagen?.formats?.medium?.url?.startsWith('/')) {
      return `${STRAPI_BASE}${data.imagen.formats.medium.url}`;
    }
    
    // Si no hay imagen, usar placeholder
    return '/images/placeholder-hop.png';
  };

  const imageUrl = getImageUrl();
  console.log('Image URL for debugging:', imageUrl); // Para debug

  const chartData = [
    { subject: 'Cítrico', A: Number(data.citrico || 0), fullMark: 10 },
    { subject: 'Frutal', A: Number(data.frutal || 0), fullMark: 10 },
    { subject: 'Floral', A: Number(data.floral || 0), fullMark: 10 },
    { subject: 'Herbal', A: Number(data.herbal || 0), fullMark: 10 },
    { subject: 'Especiado', A: Number(data.especiado || 0), fullMark: 10 },
    { subject: 'Resinoso', A: Number(data.recinoso || 0), fullMark: 10 },
    { subject: 'Dulce', A: Number(data.dulce || 0), fullMark: 10 },
    { subject: 'Otros', A: Number(data.otros || 0), fullMark: 10 },
  ];

  // Variables de color
  const darkGreen = '#143318'; 
  const midGreen = '#2F5E3D';  
  const textBlack = '#000000'; 
  const textGray = '#374151';

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FAF7F2] p-4 md:p-8 font-sans text-gray-900 rounded-sm shadow-lg border border-[#e5e0d8]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

        {/* --- COLUMNA 1: Identidad y Amargor --- */}
        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
          
          {/* Header */}
          <div className="border-b-4 border-[#2F5E3D] pb-3">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-tighter leading-none"
              style={{ color: darkGreen }}
            >
              {data.Variedad || 'SIN NOMBRE'}
            </h1>
            <h2 
              className="text-lg md:text-xl font-serif font-bold mt-2 uppercase tracking-wide"
              style={{ color: midGreen }}
            >
              {data.subtitulo || ''}
            </h2>
          </div>

          {/* Descripción */}
          <div className="text-sm md:text-base text-gray-900 text-justify leading-relaxed border-l-4 border-[#4ade80] pl-4 bg-[#fffbf5] py-2 pr-2 rounded-r">
            {data.descripcion}
          </div>

          {/* Tabla Amargor */}
          <div className="bg-white p-3 md:p-4 rounded shadow-sm border border-gray-200">
            <h3 
              className="text-base md:text-lg font-serif font-bold mb-2 border-b border-gray-200 pb-1"
              style={{ color: darkGreen }}
            >
              Componentes amargos
            </h3>
            <div className="text-xs md:text-sm">
              <Row label="Ácidos alfa" value={`${data.acidos_alfa}%`} />
              <Row label="Ácidos beta" value={`${data.acidos_beta}%`} bg="bg-[#f0fdf4]" />
              <Row label="Ratio a/β" value={data.ratio_ab} />
              <Row label="Co-humulonas" value={`${data.co_homulonas}%`} bg="bg-[#f0fdf4]" />
            </div>
          </div>
        </div>

        {/* --- COLUMNA 2: Imagen, Código y Estilos --- */}
        <div className="lg:col-span-4 flex flex-col items-center justify-between h-full gap-4">
          
          {/* Parte Superior: Imagen */}
          <div className="relative w-full h-48 md:h-56 lg:h-64 p-3 md:p-4 bg-white rounded-xl shadow-md border border-gray-100">
            <Image 
              src={imageUrl}
              alt={data.Variedad || 'Lúpulo'}
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => {
                console.error('Error loading image:', imageUrl);
                setImgError(true);
              }}
              unoptimized={true}
            />
            {imgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌿</div>
                  <p className="text-gray-600 text-sm">{data.Variedad}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Parte Inferior: Código + Estilos */}
          <div className="w-full flex flex-col gap-3 md:gap-4 flex-grow justify-end">
            
            {/* Código IHGC */}
            <div className="text-center border-b border-gray-200 pb-2">
               <h3 className="text-xs md:text-sm font-serif font-bold uppercase" style={{ color: midGreen }}>
                 Cód. IHGC
               </h3>
               <p className="text-3xl md:text-4xl font-black uppercase tracking-widest mt-1" style={{ color: textBlack }}>
                  {data.cod_ihgc}
               </p>
            </div>

            {/* CAJA ESTILOS TÍPICOS */}
            <div className="bg-[#fffbf5] p-3 md:p-4 rounded border border-gray-200 text-center shadow-sm">
              <h3 
                className="text-sm font-serif font-bold uppercase mb-2"
                style={{ color: darkGreen }}
              >
                Estilos típicos
              </h3>
              <p className="text-xs md:text-sm font-semibold leading-tight" style={{ color: textGray }}>
                {data.estilos_tipicos}
              </p>
            </div>
          </div>
        </div>

        {/* --- COLUMNA 3: Aroma, Gráfico y Estabilidad --- */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full gap-4">
          
          {/* CAJA SUPERIOR: Aroma y Gráfico */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex-grow flex flex-col">
            
            {/* Aroma */}
            <div className="mb-2 text-right border-b border-[#4ade80] pb-2">
              <h3 className="text-lg md:text-xl font-serif font-black" style={{ color: darkGreen }}>
                Descripción de aroma
              </h3>
              <p className="text-base italic font-serif mt-1 font-medium" style={{ color: textGray }}>
                {data.descripcion_aroma}
              </p>
            </div>

            {/* Gráfico */}
            <div className="flex-grow min-h-[200px] md:min-h-[250px] w-full relative mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#bbf7d0" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#14532d', fontSize: 10, fontWeight: 'bold', fontFamily: 'serif' }} 
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <RadarComponent
                    name="Perfil"
                    dataKey="A"
                    stroke="#15803d"
                    strokeWidth={3}
                    fill="#22c55e"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="text-center text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-[-10px]">
                Perfil Organoléptico
              </div>
            </div>
          </div>

          {/* CAJA INFERIOR: ESTABILIDAD */}
          <div className="bg-[#fffbf5] p-3 md:p-4 rounded border border-gray-200 text-center shadow-sm">
             <h3 
                className="text-sm font-serif font-bold uppercase mb-2"
                style={{ color: darkGreen }}
              >
               Estabilidad
             </h3>
             <p className="text-xs md:text-sm font-semibold leading-tight" style={{ color: textGray }}>
               {data.estabilidad}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fila auxiliar
const Row = ({ label, value, bg = 'bg-white' }) => (
  <div className={`flex justify-between items-center p-2 md:p-3 border-b border-gray-100 last:border-0 ${bg}`}>
    <span className="font-bold text-xs md:text-sm" style={{ color: '#374151' }}>{label}</span>
    <span className="font-mono font-bold text-xs md:text-sm" style={{ color: '#000000' }}>{value}</span>
  </div>
);

export default HopCard;