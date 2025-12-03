// components/HopCard.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const HopCard = ({ data }) => {
  const [imgError, setImgError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!data) return null;

  const getImageUrl = () => {
    if (imgError) return '/images/placeholder-hop.png';
    const img = data.imagen;
    if (!img) return '/images/placeholder-hop.png';
    const url = img.formats?.small?.url || img.formats?.medium?.url || img.url;
    if (!url) return '/images/placeholder-hop.png';
    const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || '';
    return url.startsWith('http') ? url : `${STRAPI_BASE}${url}`;
  };

  const imageUrl = getImageUrl();

  const chartData = [
    { subject: 'Cítrico', A: Number(data.citrico) || 0, fullMark: 10 },
    { subject: 'Frutal', A: Number(data.frutal) || 0, fullMark: 10 },
    { subject: 'Floral', A: Number(data.floral) || 0, fullMark: 10 },
    { subject: 'Herbal', A: Number(data.herbal) || 0, fullMark: 10 },
    { subject: 'Especia', A: Number(data.especiado) || 0, fullMark: 10 },
    { subject: 'Resina', A: Number(data.recinoso) || 0, fullMark: 10 },
    { subject: 'Dulce', A: Number(data.dulce) || 0, fullMark: 10 },
    { subject: 'Otros', A: Number(data.otros) || 0, fullMark: 10 },
  ];

  // COLORES DEFINIDOS (Más oscuros para mejor contraste)
  const darkGreen = '#143318'; // Verde casi negro
  const midGreen = '#2F5E3D';
  const textBlack = '#000000'; 

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FAF7F2] text-gray-900 rounded-sm shadow-lg border border-[#e5e0d8] overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch p-4 md:p-8">

        {/* --- COLUMNA 1 --- */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="border-b-4 border-[#2F5E3D] pb-3">
            <h1 
              className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tighter leading-none break-words"
              style={{ color: darkGreen }}
            >
              {data.Variedad || 'VARIEDAD'}
            </h1>
            <h2 
              className="text-lg font-serif font-bold mt-2 uppercase tracking-wide"
              style={{ color: midGreen }}
            >
              {data.subtitulo || 'Lúpulo Patagónico'}
            </h2>
          </div>

          <div className="text-sm text-gray-800 text-justify leading-relaxed border-l-4 border-[#4ade80] pl-4 bg-[#fffbf5] py-2 pr-2 rounded-r italic">
            {data.descripcion || "Sin descripción disponible."}
          </div>

          <div className="bg-white p-4 rounded shadow-sm border border-gray-200 mt-auto">
            <h3 
              className="text-base font-serif font-bold mb-2 border-b border-gray-200 pb-1"
              style={{ color: darkGreen }}
            >
              Análisis Químico
            </h3>
            <div className="text-xs md:text-sm space-y-1">
              <Row label="Ácidos Alfa" value={`${data.acidos_alfa || 0}%`} />
              <Row label="Ácidos Beta" value={`${data.acidos_beta || 0}%`} bg="bg-[#f0fdf4]" />
              <Row label="Ratio α/β" value={data.ratio_ab || '-'} />
              <Row label="Co-humulonas" value={`${data.co_homulonas || 0}%`} bg="bg-[#f0fdf4]" />
              <Row label="Aceites Totales" value={`${data.aceites_totales || 0} ml/100g`} />
            </div>
          </div>
        </div>

        {/* --- COLUMNA 2 --- */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden p-4">
            <Image 
              src={imageUrl}
              alt={data.Variedad || 'Lúpulo'}
              fill
              className="object-contain p-2 hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 300px"
              onError={() => setImgError(true)}
            />
            {imgError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <span className="text-4xl opacity-50">🌿</span>
              </div>
            )}
          </div>
          
          <div className="text-center border-y border-gray-200 py-3">
             <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-gray-500">
               Código Internacional
             </h3>
             <p className="text-4xl font-black uppercase tracking-widest mt-1 text-gray-900">
                {data.cod_ihgc || 'N/A'}
             </p>
          </div>

          {/* --- CORRECCIÓN 1: ESTILOS RECOMENDADOS --- */}
          <div className="bg-[#fffbf5] p-4 rounded border border-gray-200 text-center shadow-sm flex-grow flex flex-col justify-center">
            <h3 
              className="text-sm font-black uppercase mb-2"
              style={{ color: darkGreen }} 
            >
              Estilos Recomendados
            </h3>
            <p className="text-sm font-bold leading-tight text-gray-800">
              {data.estilos_tipicos || "Todos los estilos"}
            </p>
          </div>
        </div>

        {/* --- COLUMNA 3 --- */}
        <div className="lg:col-span-4 flex flex-col h-full gap-4">
          
          <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex-grow flex flex-col min-h-[300px]">
            
            {/* --- CORRECCIÓN 2: PERFIL DE AROMA --- */}
            <div className="text-center mb-1 pt-2">
               <h3 
                 className="text-sm font-black uppercase tracking-wide"
                 style={{ color: darkGreen }}
               >
                 Perfil de Aroma
               </h3>
            </div>
            
            <div className="flex-grow w-full relative">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#1f2937', fontSize: 11, fontWeight: '900' }} 
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                      name="Perfil"
                      dataKey="A"
                      stroke="#15803d"
                      strokeWidth={3}
                      fill="#4ade80"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  Cargando gráfico...
                </div>
              )}
            </div>
            
            <div className="mt-2 pt-2 border-t border-green-100 text-center">
               <p className="text-sm italic font-serif text-gray-700 font-medium">
                "{data.descripcion_aroma}"
              </p>
            </div>
          </div>

          {/* --- CORRECCIÓN 3: ESTABILIDAD --- */}
          <div className="bg-[#fffbf5] p-3 rounded border border-gray-200 text-center shadow-sm">
             <h3 
                className="text-xs font-black uppercase mb-1"
                style={{ color: darkGreen }}
             >
               Estabilidad de almacenamiento
             </h3>
             <p className="text-xs font-bold text-gray-700">
               {data.estabilidad || "Información no disponible"}
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const Row = ({ label, value, bg = 'bg-transparent' }) => (
  <div className={`flex justify-between items-center px-2 py-1.5 border-b border-gray-100 last:border-0 ${bg}`}>
    <span className="font-bold text-xs text-gray-700">{label}</span>
    <span className="font-mono font-bold text-xs text-black">{value}</span>
  </div>
);

export default HopCard;
